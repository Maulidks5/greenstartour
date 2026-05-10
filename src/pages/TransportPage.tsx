import { useMemo, useState } from "react";
import { Calendar, Car, Clock, MapPin, MessageCircle, Send, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PageHero } from "@/components/site/PageHero";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeader } from "@/components/site/SectionHeader";
import { whatsappMessageUrl } from "@/data/tourData";
import { postPublicForm } from "@/lib/publicApi";
import { formatCurrency, usePublicContent } from "@/hooks/use-public-content";
import { formatReadableDate, todayDateInputValue } from "@/lib/dateFormat";
import { toast } from "sonner";
import heroImg from "@/assets/hero-zanzibar.jpg";

const TransportPage = () => {
  const { transportServices, transportRoutes, siteSettings } = usePublicContent();
  const [selectedService, setSelectedService] = useState("");
  const [processing, setProcessing] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    whatsapp_number: "",
    pickup_location: "",
    dropoff_location: "",
    travel_date: "",
    travel_time: "",
    number_of_adults: "2",
    number_of_children: "0",
    message: "",
  });
  const activeService = selectedService || transportServices[0]?.title || "Transport Service";
  const update = (field: keyof typeof form, value: string) => setForm((current) => ({ ...current, [field]: value }));
  const pickupOptions = useMemo(() => Array.from(new Set(transportRoutes.map((route) => route.pickupLocation))), [transportRoutes]);
  const dropoffOptions = useMemo(
    () => transportRoutes.filter((route) => route.pickupLocation === form.pickup_location).map((route) => route.dropoffLocation),
    [form.pickup_location, transportRoutes]
  );
  const activeRoute = transportRoutes.find((route) => route.pickupLocation === form.pickup_location && route.dropoffLocation === form.dropoff_location);
  const adultCount = Math.max(1, Number(form.number_of_adults || 1));
  const childCount = Math.max(0, Number(form.number_of_children || 0));
  const passengerCount = adultCount + childCount;
  const estimatedTotal = Number(activeRoute?.basePrice || 0);
  const whatsappMessage = [
    "Hello Green Star Tour, I need transport.",
    `Service: ${activeService}`,
    form.pickup_location && `Pickup: ${form.pickup_location}`,
    form.dropoff_location && `Drop-off: ${form.dropoff_location}`,
    form.travel_date && `Date: ${formatReadableDate(form.travel_date)}`,
    `Adults: ${adultCount}`,
    `Children: ${childCount}`,
    estimatedTotal > 0 && `Estimated total: ${formatCurrency(estimatedTotal, siteSettings.currencySymbol)}`,
  ].filter(Boolean).join("\n");

  return (
    <SiteLayout>
      <PageHero
        image={heroImg}
        title="Transport Booking"
        subtitle="Airport pickup, hotel transfers, private drivers, and group transport across Zanzibar."
      />
      <section className="bg-secondary/35 py-14 md:py-20">
        <div className="container">
          <SectionHeader
            eyebrow="Easy movement"
            title={<>Book reliable transport</>}
            description="Choose the service, send pickup details, and we confirm vehicle options and timing by WhatsApp."
          />
          <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
            <div className="grid gap-5 md:grid-cols-2">
              {transportServices.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setSelectedService(service.title)}
                  className={`overflow-hidden rounded-2xl border bg-white text-left shadow-card-luxury transition-all duration-300 hover:-translate-y-1 hover:shadow-luxury ${
                    activeService === service.title ? "border-accent ring-2 ring-accent/20" : "border-border/70"
                  }`}
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={service.image} alt={service.title} className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl gradient-ocean">
                      <Car className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="font-display text-3xl font-semibold text-primary">{service.title}</h2>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{service.description}</p>
                  </div>
                </button>
              ))}
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <form
                onSubmit={async (event) => {
                  event.preventDefault();
                  setProcessing(true);
                  try {
                    await postPublicForm("/transport-booking-inquiries", {
                      service_type: activeService,
                      ...form,
                      number_of_adults: adultCount,
                      number_of_children: childCount,
                      number_of_passengers: passengerCount,
                      estimated_total: estimatedTotal || null,
                    });
                    toast.success("Transport request sent. We will confirm by WhatsApp.");
                    setForm({ full_name: "", email: "", whatsapp_number: "", pickup_location: "", dropoff_location: "", travel_date: "", travel_time: "", number_of_adults: "2", number_of_children: "0", message: "" });
                  } catch (error) {
                    toast.error(error instanceof Error ? error.message : "Transport request could not be sent.");
                  } finally {
                    setProcessing(false);
                  }
                }}
                className="rounded-2xl border border-border/70 bg-white p-6 shadow-luxury"
              >
                <div className="mb-5">
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Transport inquiry</div>
                  <h2 className="font-display text-3xl font-semibold text-primary">{activeService}</h2>
                </div>
                <div className="space-y-4">
                  <div className="rounded-2xl border border-accent/25 bg-secondary/45 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-muted-foreground">{activeRoute?.vehicleType || "Route price"}</span>
                      <span className="font-display text-2xl font-semibold text-primary">{estimatedTotal > 0 ? formatCurrency(estimatedTotal, siteSettings.currencySymbol) : "Select route"}</span>
                    </div>
                  </div>
                  <Field label="Full Name"><Input required value={form.full_name} onChange={(event) => update("full_name", event.target.value)} placeholder="Your name" /></Field>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Email"><Input type="email" value={form.email} onChange={(event) => update("email", event.target.value)} placeholder="you@email.com" /></Field>
                    <Field label="WhatsApp"><Input required value={form.whatsapp_number} onChange={(event) => update("whatsapp_number", event.target.value)} placeholder="+255 ..." /></Field>
                  </div>
                  <Field label="Pickup Location">
                    <select
                      required
                      value={form.pickup_location}
                      onChange={(event) => setForm((current) => ({ ...current, pickup_location: event.target.value, dropoff_location: "" }))}
                      className={selectClassName}
                    >
                      <option value="">Choose pickup</option>
                      {pickupOptions.map((location) => <option key={location} value={location}>{location}</option>)}
                    </select>
                  </Field>
                  <Field label="Drop-off Location">
                    <select
                      required
                      value={form.dropoff_location}
                      onChange={(event) => update("dropoff_location", event.target.value)}
                      disabled={!form.pickup_location}
                      className={selectClassName}
                    >
                      <option value="">Choose drop-off</option>
                      {dropoffOptions.map((location) => <option key={location} value={location}>{location}</option>)}
                    </select>
                  </Field>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <Field label="Date">
                      <Input type="date" min={todayDateInputValue()} value={form.travel_date} onChange={(event) => update("travel_date", event.target.value)} />
                      <ReadableDate value={form.travel_date} />
                    </Field>
                    <Field label="Time"><Input type="time" value={form.travel_time} onChange={(event) => update("travel_time", event.target.value)} /></Field>
                    <Field label="Adults"><Input type="number" min={1} value={form.number_of_adults} onChange={(event) => update("number_of_adults", event.target.value)} /></Field>
                  </div>
                  <Field label="Children"><Input type="number" min={0} value={form.number_of_children} onChange={(event) => update("number_of_children", event.target.value)} /></Field>
                  <div className="rounded-xl bg-secondary/50 px-4 py-3 text-sm font-semibold text-primary">
                    Total passengers: {passengerCount}
                  </div>
                  <Field label="Message"><Textarea rows={4} value={form.message} onChange={(event) => update("message", event.target.value)} placeholder="Flight number, luggage, child seat..." /></Field>
                  <Button disabled={processing} type="submit" variant="luxury" size="lg" className="w-full">
                    {processing ? "Sending..." : "Request Transport"} <Send className="h-4 w-4" />
                  </Button>
                  <Button variant="whatsapp" size="lg" className="w-full rounded-full" asChild>
                    <a href={whatsappMessageUrl(whatsappMessage)} target="_blank" rel="noreferrer">
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp Transport
                    </a>
                  </Button>
                </div>
              </form>
            </aside>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <label className="block">
    <span className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
      {label.includes("Location") ? <MapPin className="h-3.5 w-3.5" /> : label === "Date" ? <Calendar className="h-3.5 w-3.5" /> : label === "Time" ? <Clock className="h-3.5 w-3.5" /> : label === "Adults" || label === "Children" ? <Users className="h-3.5 w-3.5" /> : null}
      {label}
    </span>
    {children}
  </label>
);

const ReadableDate = ({ value }: { value: string }) => (
  <p className="mt-2 rounded-lg bg-secondary/45 px-3 py-2 text-xs font-semibold text-primary">
    {value ? formatReadableDate(value) : "Choose travel date"}
  </p>
);

const selectClassName =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-primary ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

export default TransportPage;
