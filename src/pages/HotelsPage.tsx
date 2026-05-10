import { Link } from "react-router-dom";
import { MapPin, MessageCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/PageHero";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeader } from "@/components/site/SectionHeader";
import { whatsappMessageUrl } from "@/data/tourData";
import { usePublicContent } from "@/hooks/use-public-content";
import heroImg from "@/assets/dest-kendwa.jpg";

const HotelsPage = () => {
  const { hotels } = usePublicContent();

  return (
    <SiteLayout>
      <PageHero
        image={heroImg}
        title="Choose Your Hotel"
        subtitle="Select a hotel style, view photos, then send a booking request or WhatsApp us."
      />
      <section className="bg-secondary/35 py-12 md:py-16">
        <div className="container">
          <SectionHeader
            eyebrow="Hotel booking"
            title={<>Find your stay</>}
            description="Start by choosing a hotel. Each hotel page has photos, key details, booking form, and WhatsApp."
          />
          <div className="mb-6 rounded-2xl border border-border/70 bg-white p-4 shadow-card-luxury md:flex md:items-center md:justify-between md:gap-5">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-accent">Quick hotel select</div>
            </div>
            <select
              className="mt-4 h-12 w-full rounded-full border border-input bg-white px-5 text-sm font-semibold text-primary outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20 md:mt-0 md:max-w-md"
              defaultValue=""
              onChange={(event) => {
                if (event.target.value) window.location.href = `/hotels/${event.target.value}`;
              }}
            >
              <option value="">Select hotel to view photos and book</option>
              {hotels.map((hotel) => (
                <option key={hotel.id} value={hotel.id}>{hotel.name} - {hotel.location}</option>
              ))}
            </select>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {hotels.map((hotel) => (
              <article key={hotel.id} className="overflow-hidden rounded-2xl border border-border/70 bg-white shadow-card-luxury transition-all duration-300 hover:-translate-y-1 hover:shadow-luxury">
                <Link to={`/hotels/${hotel.id}`} className="block">
                  <div className="aspect-[16/11] overflow-hidden">
                    <img src={hotel.image} alt={hotel.name} className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                  </div>
                </Link>
                <div className="p-5">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-bold text-primary">{hotel.type}</span>
                    <span className="inline-flex items-center gap-1 text-sm font-bold text-primary">
                      <Star className="h-4 w-4 fill-accent text-accent" />
                      {hotel.rating}
                    </span>
                  </div>
                  <h2 className="font-display text-2xl font-semibold text-primary">{hotel.name}</h2>
                  <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-accent" />
                    {hotel.location}
                  </p>
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">{hotel.description}</p>
                  <div className="mt-4 font-bold text-accent">{hotel.price}</div>
                  <div className="mt-5 grid gap-2">
                    <Button variant="luxury" asChild>
                      <Link to={`/hotels/${hotel.id}`}>View Hotel</Link>
                    </Button>
                    <Button variant="whatsapp" className="rounded-full" asChild>
                      <a href={whatsappMessageUrl(`Hello Green Star Tour, I need help booking ${hotel.name}. Please send me details and availability.`)} target="_blank" rel="noreferrer">
                        <MessageCircle className="h-4 w-4" />
                        WhatsApp
                      </a>
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default HotelsPage;
