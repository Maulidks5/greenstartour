import { Link } from "react-router-dom";
import { BedDouble, Car, Compass, MessageCircle, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "./SectionHeader";
import { whatsappUrl } from "@/data/tourData";

const services = [
  {
    icon: Compass,
    title: "Zanzibar Tours",
    text: "Beach, snorkeling, Stone Town, Prison Island, spice farms, and local culture.",
    href: "/tours?category=ocean-beach",
    cta: "View Tours",
  },
  {
    icon: Compass,
    title: "Tanzania Safari",
    text: "Mikumi, Serengeti, Ngorongoro, and mainland wildlife trips from Zanzibar.",
    href: "/tours?category=safari-tours",
    cta: "View Safari",
  },
  {
    icon: BedDouble,
    title: "Hotel Booking",
    text: "Beach resorts, city hotels, villas, and simple hotel booking support.",
    href: "/hotels",
    cta: "Find Hotels",
  },
  {
    icon: Car,
    title: "Transportation",
    text: "Airport pickup, hotel transfers, private drivers, and group transport.",
    href: "/transport",
    cta: "Book Transport",
  },
  {
    icon: UtensilsCrossed,
    title: "Local Food Experience",
    text: "Cooking lessons and local food experiences for couples and small groups.",
    href: "/tours?search=cooking",
    cta: "View Experience",
  },
];

export const TravelServices = () => (
  <section className="bg-white py-14 md:py-20">
    <div className="container">
      <SectionHeader
        eyebrow="Travel made simple"
        title={<>Choose what you need</>}
        description="Simple travel services for guests who want clear prices, easy booking, and fast WhatsApp help."
      />
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
        {services.map(({ icon: Icon, title, text, href, cta }) => (
          <div key={title} className="flex h-full flex-col rounded-2xl border border-border/70 bg-secondary/35 p-5 shadow-card-luxury transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-luxury">
            <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl gradient-ocean">
              <Icon className="h-5 w-5 text-white" />
            </div>
            <h3 className="font-display text-2xl font-semibold text-primary">{title}</h3>
            <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">{text}</p>
            <Button className="mt-6 w-full" variant="outline" asChild>
              <Link to={href}>{cta}</Link>
            </Button>
          </div>
        ))}
      </div>
      <div className="mt-8 rounded-2xl bg-primary p-5 text-center text-white shadow-luxury md:flex md:items-center md:justify-between md:text-left">
        <div>
          <div className="font-display text-2xl font-semibold">Need help choosing?</div>
        </div>
        <Button className="mt-4 md:mt-0" variant="whatsapp" asChild>
          <a href={whatsappUrl} target="_blank" rel="noreferrer">
            <MessageCircle className="h-4 w-4" />
            WhatsApp Now
          </a>
        </Button>
      </div>
    </div>
  </section>
);
