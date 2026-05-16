import { useEffect, useMemo, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Calendar, Check, Clock, MapPin, MessageCircle, Star, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SiteLayout } from "@/components/site/SiteLayout";
import { TourCard } from "@/components/site/TourCard";
import { SEO, siteImage, siteUrl } from "@/components/site/SEO";
import { whatsappMessageUrl } from "@/data/tourData";
import { toast } from "sonner";
import { postPublicForm } from "@/lib/publicApi";
import { formatCurrency, usePublicContent } from "@/hooks/use-public-content";
import { formatReadableDate, todayDateInputValue } from "@/lib/dateFormat";

const TourDetails = () => {
  const { id } = useParams();
  const { tours: allTours, siteSettings } = usePublicContent();
  const foundTour = allTours.find((item) => item.id === id);
  const tour = foundTour || allTours[0];
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [booking, setBooking] = useState({
    name: "",
    email: "",
    whatsapp: "",
    date: "",
    adults: "1",
    children: "0",
    pickup: "",
    message: "",
  });
  const [bookingProcessing, setBookingProcessing] = useState(false);
  const [pricingMode, setPricingMode] = useState<"individual" | "group">(tour.pricingType === "group" ? "group" : "individual");
  const adultCount = Math.max(1, Number(booking.adults || 1));
  const childCount = Math.max(0, Number(booking.children || 0));
  const groupPrice = Number(tour.groupPrice || 0);
  const adultPrice = Number(tour.adultPrice || 0);
  const childPrice = Number(tour.childPrice || 0);
  const individualAvailable = adultPrice > 0 || childPrice > 0;
  const groupAvailable = groupPrice > 0;
  const showPricingSelector = individualAvailable || groupAvailable;
  const activePricingMode = pricingMode === "group" && groupAvailable ? "group" : pricingMode === "individual" && individualAvailable ? "individual" : groupAvailable ? "group" : "individual";
  const isGroupPricing = activePricingMode === "group";
  const estimatedTotal = isGroupPricing ? groupPrice : adultPrice || childPrice ? adultCount * adultPrice + childCount * childPrice : 0;

  const related = allTours.filter((item) => item.id !== tour.id && item.category === tour.category).slice(0, 3);
  const categoryGallery = useMemo(() => {
    const images = [
      tour.image,
      ...tour.gallery,
      ...allTours
        .filter((item) => item.category === tour.category)
        .flatMap((item) => [item.image, ...item.gallery]),
    ];

    return Array.from(new Set(images)).slice(0, 8);
  }, [tour]);
  const activeImage = selectedImage || categoryGallery[0] || tour.image;
  const whatsappMessage = [
    `Hello Green Star Tour, I want to book: ${tour.name}`,
    booking.name && `Name: ${booking.name}`,
    booking.email && `Email: ${booking.email}`,
    booking.whatsapp && `WhatsApp: ${booking.whatsapp}`,
    booking.date && `Travel date: ${formatReadableDate(booking.date)}`,
    `Adults: ${adultCount}`,
    `Children: ${childCount}`,
    `Pricing option: ${isGroupPricing ? "Group package" : "Individual per person"}`,
    booking.pickup && `Pickup: ${booking.pickup}`,
    estimatedTotal > 0 && `${isGroupPricing ? "Package price" : "Estimated total"}: ${formatCurrency(estimatedTotal, siteSettings.currencySymbol)}`,
    booking.message && `Message: ${booking.message}`,
  ]
    .filter(Boolean)
    .join("\n");
  const updateBooking = (field: keyof typeof booking, value: string) => {
    setBooking((current) => ({ ...current, [field]: value }));
  };

  useEffect(() => {
    setSelectedImage(null);
    setPricingMode(tour.pricingType === "group" ? "group" : "individual");
  }, [id]);

  if (!foundTour) return <Navigate to="/tours" replace />;

  return (
    <SiteLayout>
      <SEO
        title={`${tour.name} Tour`}
        description={`${tour.name} in ${tour.location}. ${tour.duration}. ${tour.description}`.slice(0, 155)}
        path={`/tours/${tour.id}`}
        image={tour.image}
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "TouristTrip",
            name: tour.name,
            description: tour.description,
            image: siteImage(tour.image),
            url: siteUrl(`/tours/${tour.id}`),
            touristType: "International tourists",
            itinerary: tour.itinerary,
            offers: {
              "@type": "Offer",
              price: tour.adultPrice || undefined,
              priceCurrency: siteSettings.currencySymbol === "$" ? "USD" : siteSettings.currencySymbol === "€" ? "EUR" : undefined,
              availability: "https://schema.org/InStock",
            },
            provider: {
              "@type": "TravelAgency",
              name: "Green Star Island Tour & Safari",
              url: siteUrl("/"),
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: siteUrl("/") },
              { "@type": "ListItem", position: 2, name: "Tours", item: siteUrl("/tours") },
              { "@type": "ListItem", position: 3, name: tour.name, item: siteUrl(`/tours/${tour.id}`) },
            ],
          },
        ]}
      />
      <section className="relative min-h-[520px] overflow-hidden bg-primary pt-36">
        <img src={tour.image} alt={tour.name} loading="eager" decoding="async" className="absolute inset-0 h-full w-full object-contain object-center md:object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/55 to-primary/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/25 via-transparent to-primary/88" />
        <div className="container relative z-10 flex min-h-[520px] items-end pb-12 text-white">
          <div className="max-w-4xl">
            <div className="mb-4 inline-flex rounded-full bg-accent px-4 py-1 text-sm font-bold text-primary">{tour.categoryLabel}</div>
            <h1 className="font-display text-4xl font-semibold leading-tight md:text-6xl">{tour.name}</h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-white/82 md:text-lg">{tour.overview}</p>
            <div className="mt-6 grid gap-3 text-sm font-semibold text-white/90 sm:grid-cols-2 lg:grid-cols-4">
              <Meta icon={MapPin} text={tour.location} />
              <Meta icon={Clock} text={tour.duration} />
              <Meta icon={Star} text={tour.reviews > 0 ? `${tour.rating} (${tour.reviews} review${tour.reviews === 1 ? "" : "s"})` : `${tour.rating}`} />
              <span className="rounded-xl bg-white/12 px-4 py-3 text-accent backdrop-blur">{tour.price}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary/30 py-12 md:py-16">
        <div className="container grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-8">
            <InfoBlock title="Overview"><p>{tour.overview}</p></InfoBlock>
            {(tour.highlights.length > 0 || tour.included.length > 0) && (
              <div className="grid gap-6 md:grid-cols-2">
                {tour.highlights.length > 0 && <ListBlock title="Highlights" icon={Star} items={tour.highlights.slice(0, 6)} />}
                {tour.included.length > 0 && <ListBlock title="Included" icon={Check} items={tour.included.slice(0, 6)} />}
              </div>
            )}
            {tour.itinerary.length > 0 && (
              <InfoBlock title="Simple plan">
                <ol className="grid gap-4 md:grid-cols-2">
                  {tour.itinerary.map((item, index) => (
                    <li key={item} className="flex gap-4 rounded-xl bg-secondary/45 p-4">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-white shadow-card-luxury">{index + 1}</span>
                      <span className="pt-1 font-medium text-primary">{item}</span>
                    </li>
                  ))}
                </ol>
              </InfoBlock>
            )}
            <InfoBlock title="Photos">
              <div className="space-y-4">
                <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-secondary">
                  <img src={activeImage} alt={`${tour.name} selected gallery`} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                  <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-primary">
                    {tour.categoryLabel}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 md:grid-cols-4">
                  {categoryGallery.map((image, index) => (
                    <button
                      key={image}
                      type="button"
                      onClick={() => setSelectedImage(image)}
                      className={`h-24 overflow-hidden rounded-xl border-2 transition-all ${
                        activeImage === image ? "border-accent shadow-gold" : "border-transparent hover:border-accent/50"
                      }`}
                    >
                      <img src={image} alt={`${tour.name} gallery ${index + 1}`} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </InfoBlock>
            {related.length > 0 && (
              <InfoBlock title="Related tours">
                <div className="grid gap-5 md:grid-cols-3">
                  {related.map((item) => <TourCard key={item.id} tour={item} />)}
                </div>
              </InfoBlock>
            )}
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <form
              onSubmit={async (event) => {
                event.preventDefault();
                setBookingProcessing(true);
                try {
                  await postPublicForm("/booking-inquiries", {
                    tour_slug: tour.id,
                    full_name: booking.name,
                    email: booking.email,
                    whatsapp_number: booking.whatsapp,
                    travel_date: booking.date || null,
                    number_of_adults: adultCount,
                    number_of_children: childCount,
                    number_of_guests: adultCount + childCount,
                    pickup_location: booking.pickup || null,
                    estimated_total: estimatedTotal || null,
                    message: [`Pricing option: ${isGroupPricing ? "Group package" : "Individual per person"}`, booking.message].filter(Boolean).join("\n"),
                  });
                  toast.success("Booking inquiry sent. We will reply on WhatsApp shortly.");
                  setBooking({ name: "", email: "", whatsapp: "", date: "", adults: "1", children: "0", pickup: "", message: "" });
                } catch (error) {
                  toast.error(error instanceof Error ? error.message : "Booking could not be sent.");
                } finally {
                  setBookingProcessing(false);
                }
              }}
              className="rounded-2xl border border-border/70 bg-white p-6 shadow-luxury"
            >
              <div className="mb-5">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Booking inquiry</div>
                <h2 className="font-display text-3xl font-semibold text-primary">{tour.price}</h2>
              </div>
              <div className="space-y-4">
                {showPricingSelector && (
                  <div className="rounded-2xl border border-border/70 bg-secondary/45 p-3">
                    <div className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">Pricing option</div>
                    <div className="grid grid-cols-2 gap-2 rounded-xl bg-white/70 p-1">
                      <button
                        type="button"
                        disabled={!individualAvailable}
                        onClick={() => setPricingMode("individual")}
                        className={`rounded-lg px-3 py-2 text-sm font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-45 ${!isGroupPricing ? "bg-primary text-white shadow-card-luxury" : "text-muted-foreground hover:text-primary"}`}
                      >
                        Individual
                      </button>
                      <button
                        type="button"
                        disabled={!groupAvailable}
                        onClick={() => setPricingMode("group")}
                        className={`rounded-lg px-3 py-2 text-sm font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-45 ${isGroupPricing ? "bg-primary text-white shadow-card-luxury" : "text-muted-foreground hover:text-primary"}`}
                      >
                        Group
                      </button>
                    </div>
                  </div>
                )}
                {isGroupPricing && groupPrice > 0 && (
                  <div className="rounded-2xl border border-accent/25 bg-secondary/45 p-4">
                    <div className="text-xs font-bold uppercase tracking-[0.16em] text-accent">Fixed group price</div>
                    <div className="mt-2 flex items-center justify-between gap-4">
                      <span className="text-sm font-semibold text-muted-foreground">Package total</span>
                      <span className="font-display text-2xl font-semibold text-primary">{formatCurrency(groupPrice, siteSettings.currencySymbol)}</span>
                    </div>
                    {tour.pricingNote ? <p className="mt-2 text-xs text-muted-foreground">{tour.pricingNote}</p> : null}
                  </div>
                )}
                {!isGroupPricing && (adultPrice > 0 || childPrice > 0) && (
                  <div className="rounded-2xl border border-accent/25 bg-secondary/45 p-4">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <PriceLine label="Adult" value={adultPrice} />
                      <PriceLine label="Child" value={childPrice} />
                    </div>
                    <div className="mt-3 flex items-center justify-between border-t border-border/70 pt-3">
                      <span className="text-sm font-semibold text-muted-foreground">Estimated total</span>
                      <span className="font-display text-2xl font-semibold text-primary">{formatCurrency(estimatedTotal, siteSettings.currencySymbol)}</span>
                    </div>
                    {tour.pricingNote ? <p className="mt-2 text-xs text-muted-foreground">{tour.pricingNote}</p> : null}
                  </div>
                )}
                <BookingField label="Full Name">
                  <Input required value={booking.name} onChange={(event) => updateBooking("name", event.target.value)} placeholder="Your name" />
                </BookingField>
                <BookingField label="Email">
                  <Input required type="email" value={booking.email} onChange={(event) => updateBooking("email", event.target.value)} placeholder="you@email.com" />
                </BookingField>
                <BookingField label="WhatsApp Number">
                  <Input required value={booking.whatsapp} onChange={(event) => updateBooking("whatsapp", event.target.value)} placeholder="+255 ..." />
                </BookingField>
                <BookingField label="Travel Date">
                  <label className="relative block">
                    <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input type="date" min={todayDateInputValue()} value={booking.date} onChange={(event) => updateBooking("date", event.target.value)} className="pl-10" />
                  </label>
                  <ReadableDate value={booking.date} />
                </BookingField>
                <div className="grid gap-4 sm:grid-cols-2">
                  <BookingField label="Adults">
                    <Input type="number" min={1} value={booking.adults} onChange={(event) => updateBooking("adults", event.target.value)} placeholder="2" />
                  </BookingField>
                  <BookingField label="Children">
                    <Input type="number" min={0} value={booking.children} onChange={(event) => updateBooking("children", event.target.value)} placeholder="0" />
                  </BookingField>
                </div>
                <BookingField label="Pickup Location">
                  <Input value={booking.pickup} onChange={(event) => updateBooking("pickup", event.target.value)} placeholder="Hotel or area name" />
                </BookingField>
                <BookingField label="Message">
                  <Textarea rows={4} value={booking.message} onChange={(event) => updateBooking("message", event.target.value)} placeholder="Hotel, pickup area, special requests..." />
                </BookingField>
                <Button disabled={bookingProcessing} type="submit" variant="luxury" size="lg" className="w-full">
                  {bookingProcessing ? "Sending..." : "Send Booking Inquiry"}
                </Button>
                <Button variant="whatsapp" size="lg" className="w-full rounded-full" asChild>
                  <a href={whatsappMessageUrl(whatsappMessage)} target="_blank" rel="noreferrer">
                    <MessageCircle className="h-4 w-4" />
                    Book via WhatsApp
                  </a>
                </Button>
              </div>
            </form>
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
};

const InfoBlock = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="rounded-2xl border border-border/70 bg-white p-6 shadow-card-luxury md:p-8">
    <h2 className="mb-4 font-display text-3xl font-semibold text-primary">{title}</h2>
    <div className="leading-relaxed text-muted-foreground">{children}</div>
  </section>
);

const Meta = ({ icon: Icon, text }: { icon: LucideIcon; text: string }) => (
  <span className="flex items-center gap-2 rounded-xl bg-white/12 px-4 py-3 backdrop-blur">
    <Icon className="h-4 w-4 text-accent" />
    {text}
  </span>
);

const BookingField = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <label className="block">
    <span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">{label}</span>
    {children}
  </label>
);

const ReadableDate = ({ value }: { value: string }) => (
  <p className="mt-2 rounded-lg bg-secondary/45 px-3 py-2 text-xs font-semibold text-primary">
    {value ? `Selected: ${formatReadableDate(value)}` : "Choose your travel date"}
  </p>
);

const PriceLine = ({ label, value }: { label: string; value: number }) => {
  const { siteSettings } = usePublicContent();

  return (
  <div className="rounded-xl bg-white px-3 py-2">
    <div className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">{label}</div>
    <div className="font-semibold text-primary">{value > 0 ? formatCurrency(value, siteSettings.currencySymbol) : "Request"}</div>
  </div>
  );
};

const ListBlock = ({ title, items, icon: Icon }: { title: string; items: string[]; icon: LucideIcon }) => (
  <InfoBlock title={title}>
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item} className="flex items-start gap-3">
          <Icon className="mt-1 h-4 w-4 shrink-0 text-accent" />
          <span>{item}</span>
        </div>
      ))}
    </div>
  </InfoBlock>
);

export default TourDetails;
