import { Headphones, Map, ShieldCheck, Sparkles } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const reasons = [
  { icon: Map, title: "Local Expert Planning", text: "Routes and timing are planned by people who know Zanzibar daily." },
  { icon: ShieldCheck, title: "Licensed & Reliable", text: "Professional guides, clear communication, and organized pickup details." },
  { icon: Headphones, title: "Fast WhatsApp Support", text: "Quick answers before booking and during travel." },
  { icon: Sparkles, title: "Custom Luxury Touches", text: "Private upgrades, romantic setups, and flexible package options." },
];

export const WhyChooseUs = () => (
  <section className="py-16 md:py-20">
    <div className="container">
      <SectionHeader
        eyebrow="Why Choose Us"
        title={<>Easy booking. Reliable local team.</>}
      />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {reasons.map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-2xl bg-card p-6 shadow-card-luxury transition-all duration-500 hover:-translate-y-1 hover:shadow-luxury">
            <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl gradient-ocean">
              <Icon className="h-5 w-5 text-primary-foreground" />
            </div>
            <h3 className="mb-2 font-display text-2xl font-semibold text-primary">{title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
