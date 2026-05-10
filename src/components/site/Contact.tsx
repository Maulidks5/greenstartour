import type { ReactNode } from "react";
import { Mail, Phone, MapPin, Send, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SectionHeader } from "./SectionHeader";
import { useReveal } from "@/hooks/use-reveal";
import { toast } from "sonner";
import { useState } from "react";
import { postPublicForm } from "@/lib/publicApi";
import { usePublicContent } from "@/hooks/use-public-content";

export const Contact = () => {
  const ref = useReveal<HTMLDivElement>();
  const { siteSettings } = usePublicContent();
  const [processing, setProcessing] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    whatsapp_number: "",
    travel_date: "",
    message: "",
  });
  const update = (field: keyof typeof form, value: string) => setForm((current) => ({ ...current, [field]: value }));

  return (
    <section id="contact" className="bg-secondary/40 py-16 md:py-24">
      <div className="container">
        <SectionHeader
          eyebrow="Contact"
          title={<>Plan your trip</>}
          description="Send your dates, group size, and what you need: tour, hotel, transport, safari, or full package."
        />

        <div ref={ref} className="reveal mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setProcessing(true);
              try {
                await postPublicForm("/contact-inquiries", {
                  full_name: form.full_name,
                  email: form.email,
                  whatsapp_number: form.whatsapp_number,
                  subject: form.travel_date ? `Travel date: ${form.travel_date}` : "Website inquiry",
                  message: form.message,
                });
                toast.success("Message sent. We will reply within 24h.");
                setForm({ full_name: "", email: "", whatsapp_number: "", travel_date: "", message: "" });
              } catch (error) {
                toast.error(error instanceof Error ? error.message : "Message could not be sent.");
              } finally {
                setProcessing(false);
              }
            }}
            className="space-y-5 rounded-2xl border border-border/70 bg-card p-6 shadow-card-luxury md:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full Name"><Input required value={form.full_name} onChange={(event) => update("full_name", event.target.value)} placeholder="Your name" /></Field>
              <Field label="Email"><Input required type="email" value={form.email} onChange={(event) => update("email", event.target.value)} placeholder="you@email.com" /></Field>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="WhatsApp"><Input value={form.whatsapp_number} onChange={(event) => update("whatsapp_number", event.target.value)} placeholder="+255 ..." /></Field>
              <Field label="Travel Date"><Input type="date" value={form.travel_date} onChange={(event) => update("travel_date", event.target.value)} /></Field>
            </div>
            <Field label="Message"><Textarea required rows={5} value={form.message} onChange={(event) => update("message", event.target.value)} placeholder="Tour, hotel, transport, dates, group size..." /></Field>
            <Button disabled={processing} type="submit" variant="luxury" size="lg" className="w-full">
              {processing ? "Sending..." : "Send Message"} <Send className="ml-1 h-4 w-4" />
            </Button>
          </form>

          <div className="space-y-6">
            <div className="space-y-5 rounded-2xl border border-border/70 bg-card p-6 shadow-card-luxury md:p-8">
              <ContactItem icon={Phone} label="Phone / WhatsApp" value={siteSettings.whatsappNumber} />
              <ContactItem icon={Mail} label="Email" value={siteSettings.contactEmail} />
              <ContactItem icon={MapPin} label="Office" value={siteSettings.officeLocation} />
            </div>
            <div className="aspect-[4/3] overflow-hidden rounded-2xl shadow-card-luxury">
              <iframe
                title="Zanzibar map"
                src="https://www.google.com/maps?q=Stone+Town+Zanzibar&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Field = ({ label, children }: { label: string; children: ReactNode }) => (
  <label className="block">
    <span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">{label}</span>
    {children}
  </label>
);

const ContactItem = ({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) => (
  <div className="flex items-start gap-4">
    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl gradient-ocean">
      <Icon className="h-5 w-5 text-primary-foreground" />
    </div>
    <div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="text-primary font-medium">{value}</div>
    </div>
  </div>
);
