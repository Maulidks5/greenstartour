import { Briefcase, Handshake, Hotel, Megaphone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { SEO } from "@/components/site/SEO";
import heroImg from "@/assets/dest-kendwa.jpg";
import { useState } from "react";
import { toast } from "sonner";
import { postPublicForm } from "@/lib/publicApi";

const partners = [
  { icon: Hotel, title: "Hotels & Villas", text: "Offer trusted tours and private guest experiences." },
  { icon: Briefcase, title: "Travel Agents", text: "Build Zanzibar and Tanzania packages with local support." },
  { icon: Megaphone, title: "Creators", text: "Create premium island content with curated experiences." },
];

const PartnershipPage = () => {
  const [processing, setProcessing] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    company_name: "",
    email: "",
    whatsapp_number: "",
    partnership_type: "",
    message: "",
  });
  const update = (field: keyof typeof form, value: string) => setForm((current) => ({ ...current, [field]: value }));

  return (
    <SiteLayout>
      <SEO
        title="Partnership"
        description="Partner with Green Star Island Tour & Safari for hotels, travel agents, creators, referrals, and guest experiences in Zanzibar."
        path="/partnership"
        image={heroImg}
      />
      <PageHero
        image={heroImg}
        title="Partnership"
      subtitle="For hotels, agents, and creators who want local travel support in Zanzibar."
      />
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid gap-5 md:grid-cols-3">
            {partners.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-border/70 bg-white p-6 shadow-card-luxury transition-all duration-500 hover:-translate-y-1 hover:shadow-luxury">
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl gradient-ocean">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <h2 className="font-display text-3xl font-semibold text-primary">{title}</h2>
                <p className="mt-3 text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-6 rounded-2xl bg-secondary/55 p-6 md:grid-cols-[1fr_420px] md:p-8">
            <div>
              <Handshake className="mb-4 h-10 w-10 text-accent" />
              <h2 className="font-display text-4xl font-semibold text-primary">Partner with Green Star.</h2>
            </div>
            <form
              onSubmit={async (event) => {
                event.preventDefault();
                setProcessing(true);
                try {
                  await postPublicForm("/partnership-inquiries", form);
                  toast.success("Partnership inquiry sent. We will contact you soon.");
                  setForm({ full_name: "", company_name: "", email: "", whatsapp_number: "", partnership_type: "", message: "" });
                } catch (error) {
                  toast.error(error instanceof Error ? error.message : "Partnership inquiry could not be sent.");
                } finally {
                  setProcessing(false);
                }
              }}
              className="space-y-4 rounded-2xl border border-border/70 bg-white p-5 shadow-card-luxury"
            >
              <Input required value={form.full_name} onChange={(event) => update("full_name", event.target.value)} placeholder="Full Name" />
              <Input value={form.company_name} onChange={(event) => update("company_name", event.target.value)} placeholder="Company name" />
              <Input required type="email" value={form.email} onChange={(event) => update("email", event.target.value)} placeholder="Email address" />
              <Input value={form.whatsapp_number} onChange={(event) => update("whatsapp_number", event.target.value)} placeholder="WhatsApp number" />
              <Input required value={form.partnership_type} onChange={(event) => update("partnership_type", event.target.value)} placeholder="Partnership type" />
              <Textarea rows={4} value={form.message} onChange={(event) => update("message", event.target.value)} placeholder="Tell us what you want to build..." />
              <Button disabled={processing} type="submit" variant="luxury" size="lg" className="w-full">
                {processing ? "Sending..." : "Send Partnership Inquiry"} <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default PartnershipPage;
