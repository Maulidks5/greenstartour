import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "./SectionHeader";
import { whatsappMessageUrl } from "@/data/tourData";
import { usePublicContent } from "@/hooks/use-public-content";

export const FeaturedTours = () => {
  const { featuredTours } = usePublicContent();

  return (
    <section className="bg-secondary/40 py-16 md:py-20">
      <div className="container">
        <SectionHeader
          eyebrow="Featured Packages"
          title={<>Popular packages</>}
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredTours.map((tour) => (
            <article key={tour.id} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-white shadow-card-luxury transition-all duration-300 hover:-translate-y-1 hover:shadow-luxury">
              <Link to={`/tours/${tour.id}`} className="relative block aspect-[16/9] overflow-hidden bg-secondary">
                <img src={tour.image} alt={tour.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/45 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.08em] text-primary">
                  Popular
                </span>
              </Link>
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-4">
                  <h3 className="font-display text-2xl font-semibold leading-tight text-primary">{tour.name}</h3>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">{tour.categoryLabel}</p>
                </div>
                <div className="font-display text-2xl font-semibold text-accent">{tour.price}</div>
                <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">{tour.description}</p>
                <div className="mt-5 grid gap-2 sm:grid-cols-2">
                  <Button variant="secondary" size="sm" asChild>
                    <Link to={`/tours/${tour.id}`}>View Package</Link>
                  </Button>
                  <Button variant="whatsapp" size="sm" asChild>
                    <a href={whatsappMessageUrl(`Hello Green Star Tour, I want to book ${tour.name}. Please send me details and availability.`)} target="_blank" rel="noreferrer">
                      <MessageCircle className="h-4 w-4" />
                      Book Now
                    </a>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
