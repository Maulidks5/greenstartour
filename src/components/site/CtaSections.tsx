import { Link } from "react-router-dom";
import { Handshake, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappUrl } from "@/data/tourData";

export const PartnershipCTA = () => (
  <section className="bg-secondary/45 py-16">
    <div className="container">
      <div className="grid items-center gap-8 rounded-2xl border border-border/70 bg-white p-6 shadow-card-luxury md:grid-cols-[1fr_auto] md:p-10">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            <Handshake className="h-4 w-4" />
            Partnership
          </div>
          <h2 className="font-display text-3xl font-semibold text-primary md:text-4xl">Hotels, agents, and creators can partner with us.</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">We support referrals, white-label packages, and private guest experiences across Zanzibar and Tanzania.</p>
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
