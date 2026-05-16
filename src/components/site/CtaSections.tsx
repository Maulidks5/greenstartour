import { Link } from "react-router-dom";
import { Handshake, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappUrl } from "@/data/tourData";
import { usePublicContent } from "@/hooks/use-public-content";

export const ApprovedPartners = () => {
  const { partners } = usePublicContent();

  if (!partners.length) return null;

  const repeatCount = Math.max(2, Math.ceil(8 / partners.length));
  const marqueePartners = Array.from({ length: repeatCount % 2 === 0 ? repeatCount : repeatCount + 1 }).flatMap(() => partners);

  return (
    <section className="bg-background py-10">
      <div className="container">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.22em] text-accent">Approved Partners</div>
            <h2 className="mt-2 font-display text-3xl font-semibold text-primary md:text-4xl">Trusted partners.</h2>
          </div>
          <Button variant="secondary" asChild>
            <Link to="/partnership">Become a Partner</Link>
          </Button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border/70 bg-white py-5 shadow-card-luxury [mask-image:linear-gradient(to_right,transparent,black_9%,black_91%,transparent)]">
          <div className="partners-marquee">
            {marqueePartners.map((partner, index) => (
              <div key={`${partner.id}-${index}`} className="flex h-24 min-w-52 flex-col items-center justify-center gap-2 rounded-xl border border-border/60 bg-secondary/25 px-6">
                <img src={partner.logo} alt={`${partner.name} logo`} loading="lazy" className="max-h-14 max-w-36 object-contain" />
                <span className="max-w-40 truncate text-center text-sm font-bold text-primary">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const PartnershipCTA = () => (
  <section className="bg-secondary/45 py-14">
    <div className="container">
      <div className="grid items-center gap-6 rounded-2xl border border-border/70 bg-white p-6 shadow-card-luxury md:grid-cols-[1fr_auto] md:p-8">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            <Handshake className="h-4 w-4" />
            Partnership
          </div>
          <h2 className="font-display text-3xl font-semibold text-primary md:text-4xl">Work with Green Star.</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">For hotels, agents, and creators who need trusted local tours, referrals, and guest experiences.</p>
        </div>
        <Button variant="luxury" size="lg" asChild>
          <Link to="/partnership">Partner With Us</Link>
        </Button>
      </div>
    </div>
  </section>
);

export const FinalBookingCTA = () => (
  <section className="relative overflow-hidden gradient-ocean py-16 text-white">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsla(25_90%_65%/0.28),transparent_48%)]" />
    <div className="container relative text-center">
      <h2 className="font-display text-4xl font-semibold md:text-5xl">Ready to plan your Zanzibar trip?</h2>
      <p className="mx-auto mt-4 max-w-2xl text-white/80">Tell us if you need a tour, hotel, transport, or a full package. We reply fast on WhatsApp.</p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Button variant="luxury" size="xl" asChild>
          <Link to="/contact">Send Travel Inquiry</Link>
        </Button>
        <Button variant="whatsapp" size="xl" asChild>
          <a href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle className="h-4 w-4" /> WhatsApp Now</a>
        </Button>
      </div>
    </div>
  </section>
);
