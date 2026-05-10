import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { BedDouble, Calendar, Check, MapPin, MessageCircle, Star, Users, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SEO, siteImage, siteUrl } from "@/components/site/SEO";
import { whatsappMessageUrl } from "@/data/tourData";
import { postPublicForm } from "@/lib/publicApi";
import { toast } from "sonner";
import { formatCurrency, usePublicContent } from "@/hooks/use-public-content";
import { formatReadableDate, todayDateInputValue } from "@/lib/dateFormat";

const HotelDetails = () => {
  const { id } = useParams();
  const { hotels, siteSettings } = usePublicContent();
  const hotel = hotels.find((item) => item.id === id);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    whatsapp_number: "",
    check_in: "",
    check_out: "",
    number_of_adults: "2",
    number_of_children: "0",
    room_type: "",
    message: "",
  });

  useEffect(() => {
    setActiveImage(null);
  }, [id]);

  if (!hotel) return <Navigate to="/hotels" replace />;

  const selectedImage = activeImage || hotel.image;
  const update = (field: keyof typeof form, value: string) => setForm((current) => ({ ...current, [field]: value }));
  const adultCount = Math.max(1, Number(form.number_of_adults || 1));
  const childCount = Math.max(0, Number(form.number_of_children || 0));
  const nights = getNights(form.check_in, form.check_out);
  const pricePerNight = Number(hotel.pricePerNight || 0);
  const estimatedTotal = pricePerNight && nights ? pricePerNight * nights : 0;
  const whatsappMessage = [
    `Hello Green Star Tour, I want hotel booking help: ${hotel.name}`,
    form.full_name && `Name: ${form.full_name}`,
    form.check_in && `Check-in: ${formatReadableDate(form.check_in)}`,
    form.check_out && `Check-out: ${formatReadableDate(form.check_out)}`,
    `Adults: ${adultCount}`,
    `Children: ${childCount}`,
    nights > 0 && `Nights: ${nights}`,
    estimatedTotal > 0 && `Estimated total: ${formatCurrency(estimatedTotal, siteSettings.currencySymbol)}`,
    form.room_type && `Room: ${form.room_type}`,
    form.message && `Message: ${form.message}`,
  ].filter(Boolean).join("\n");

  return (
    <SiteLayout>
      <SEO
        title={`${hotel.name} Hotel Booking`}
        description={`${hotel.name} in ${hotel.location}. ${hotel.description}`.slice(0, 155)}
        path={`/hotels/${hotel.id}`}
        image={hotel.image}
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "Hotel",
            name: hotel.name,
            description: hotel.description,
            image: siteImage(hotel.image),
            url: siteUrl(`/hotels/${hotel.id}`),
            address: {
              "@type": "PostalAddress",
              addressLocality: hotel.location,
              addressCountry: "TZ",
            },
            starRating: {
              "@type": "Rating",
              ratingValue: hotel.rating,
            },
            priceRange: hotel.price,
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: siteUrl("/") },
              { "@type": "ListItem", position: 2, name: "Hotels", item: siteUrl("/hotels") },
              { "@type": "ListItem", position: 3, name: hotel.name, item: siteUrl(`/hotels/${hotel.id}`) },
            ],
          },
        ]}
      />
      <section className="relative min-h-[500px] overflow-hidden bg-primary pt-36">
        <img src={hotel.image} alt={hotel.name} loading="eager" decoding="async" className="absolute inset-0 h-full w-full object-contain object-center md:object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/92 via-primary/58 to-primary/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-primary/85" />
        <div className="container relative z-10 flex min-h-[500px] items-end pb-12 text-white">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex rounded-full bg-accent px-4 py-1 text-sm font-bold text-primary">{hotel.type}</div>
            <h1 className="font-display text-4xl font-semibold leading-tight md:text-6xl">{hotel.name}</h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-white/85 md:text-lg">{hotel.description}</p>
            <div className="mt-6 grid gap-3 text-sm font-semibold text-white/90 sm:grid-cols-2 lg:grid-cols-4">
              <Meta icon={MapPin} text={hotel.location} />
              <Meta icon={BedDouble} text={hotel.type} />
              <Meta icon={Star} text={`${hotel.rating} rating`} />
              <span className="rounded-xl bg-white/12 px-4 py-3 text-accent backdrop-blur">{hotel.price}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary/30 py-12 md:py-16">
        <div className="container grid gap-8 lg:grid-cols-[1fr_390px]">
          <div className="space-y-8">
            <InfoBlock title="Hotel overview">
              <p>{hotel.description}</p>
            </InfoBlock>

            <InfoBlock title="Good to know">
              <div className="grid gap-3 sm:grid-cols-2">
                {hotel.amenities.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-accent" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </InfoBlock>

            <InfoBlock title="Photos">
              <div className="space-y-4">
                <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-secondary">
                  <img src={selectedImage} alt={`${hotel.name} selected`} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                </div>
                <div className="grid grid-cols-3 gap-3 md:grid-cols-4">
                  {hotel.gallery.map((image, index) => (
                    <button
                      key={`${image}-${index}`}
                      type="button"
                      onClick={() => setActiveImage(image)}
                      className={`h-24 overflow-hidden rounded-xl border-2 transition-all ${
                        selectedImage === image ? "border-accent shadow-gold" : "border-transparent hover:border-accent/50"
                      }`}
                    >
                      <img src={image} alt={`${hotel.name} gallery ${index + 1}`} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </InfoBlock>

            <div className="rounded-2xl bg-primary p-6 text-white shadow-luxury md:flex md:items-center md:justify-between">
              <div>
                <h2 className="font-display text-3xl font-semibold">Need another hotel style?</h2>
                <p className="mt-2 text-sm text-white/75">You can go back and choose another stay.</p>
              </div>
              <Button className="mt-4 md:mt-0" variant="luxury" asChild>
                <Link to="/hotels">View Hotels</Link>
              </Button>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <form
              onSubmit={async (event) => {
                event.preventDefault();
                setProcessing(true);
                try {
                  await postPublicForm("/hotel-booking-inquiries", {
                    hotel_slug: hotel.id,
                    ...form,
                    number_of_adults: adultCount,
                    number_of_children: childCount,
                    number_of_guests: adultCount + childCount,
                    estimated_total: estimatedTotal || null,
                  });
                  toast.success("Hotel request sent. We will reply with availability.");
                  setForm({ full_name: "", email: "", whatsapp_number: "", check_in: "", check_out: "", number_of_adults: "2", number_of_children: "0", room_type: "", message: "" });
                } catch (error) {
                  toast.error(error instanceof Error ? error.message : "Hotel request could not be sent.");
                } finally {
                  setProcessing(false);
                }
              }}
              className="rounded-2xl border border-border/70 bg-white p-6 shadow-luxury"
            >
              <div className="mb-5">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Hotel booking</div>
                <h2 className="font-display text-3xl font-semibold text-primary">{hotel.price}</h2>
              </div>
              <div className="space-y-4">
                {pricePerNight > 0 && (
                  <div className="rounded-2xl border border-accent/25 bg-secondary/45 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-muted-foreground">Per night</span>
                      <span className="font-display text-2xl font-semibold text-primary">{formatCurrency(pricePerNight, siteSettings.currencySymbol)}</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between border-t border-border/70 pt-3">
                      <span className="text-sm font-semibold text-muted-foreground">{nights || 1} night{(nights || 1) === 1 ? "" : "s"} estimate</span>
                      <span className="font-bold text-accent">{estimatedTotal > 0 ? formatCurrency(estimatedTotal, siteSettings.currencySymbol) : "Choose dates"}</span>
                    </div>
                    {hotel.childPolicy ? <p className="mt-2 text-xs text-muted-foreground">{hotel.childPolicy}</p> : null}
                  </div>
                )}
                <Field label="Full Name"><Input required value={form.full_name} onChange={(event) => update("full_name", event.target.value)} placeholder="Your name" /></Field>
                <Field label="Email"><Input required type="email" value={form.email} onChange={(event) => update("email", event.target.value)} placeholder="you@email.com" /></Field>
                <Field label="WhatsApp Number"><Input required value={form.whatsapp_number} onChange={(event) => update("whatsapp_number", event.target.value)} placeholder="+255 ..." /></Field>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Check-in">
                    <Input type="date" min={todayDateInputValue()} value={form.check_in} onChange={(event) => update("check_in", event.target.value)} />
                    <ReadableDate value={form.check_in} emptyText="Choose check-in date" />
                  </Field>
                  <Field label="Check-out">
                    <Input type="date" min={form.check_in || todayDateInputValue()} value={form.check_out} onChange={(event) => update("check_out", event.target.value)} />
                    <ReadableDate value={form.check_out} emptyText="Choose check-out date" />
                  </Field>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Adults"><Input type="number" min={1} value={form.number_of_adults} onChange={(event) => update("number_of_adults", event.target.value)} /></Field>
                  <Field label="Children"><Input type="number" min={0} value={form.number_of_children} onChange={(event) => update("number_of_children", event.target.value)} /></Field>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Room Type"><Input value={form.room_type} onChange={(event) => update("room_type", event.target.value)} placeholder="Double, family..." /></Field>
                </div>
                <Field label="Message"><Textarea rows={4} value={form.message} onChange={(event) => update("message", event.target.value)} placeholder="Budget, area, special request..." /></Field>
                <Button disabled={processing} type="submit" variant="luxury" size="lg" className="w-full">
                  {processing ? "Sending..." : "Request Hotel Booking"}
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

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <label className="block">
    <span className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
      {label === "Check-in" || label === "Check-out" ? <Calendar className="h-3.5 w-3.5" /> : label === "Adults" || label === "Children" ? <Users className="h-3.5 w-3.5" /> : label === "Room Type" ? <BedDouble className="h-3.5 w-3.5" /> : null}
      {label}
    </span>
    {children}
  </label>
);

const ReadableDate = ({ value, emptyText }: { value: string; emptyText: string }) => (
  <p className="mt-2 rounded-lg bg-secondary/45 px-3 py-2 text-xs font-semibold text-primary">
    {value ? formatReadableDate(value) : emptyText}
  </p>
);

const getNights = (checkIn: string, checkOut: string) => {
  if (!checkIn || !checkOut) return 0;
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diff = end.getTime() - start.getTime();
  if (Number.isNaN(diff) || diff <= 0) return 0;
  return Math.ceil(diff / 86400000);
};

export default HotelDetails;
