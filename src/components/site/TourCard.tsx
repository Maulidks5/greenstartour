import { Link } from "react-router-dom";
import { Clock, MapPin, MessageCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappMessageUrl, type Tour } from "@/data/tourData";

export const TourCard = ({ tour }: { tour: Tour }) => (
  <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-card-luxury transition-all duration-500 hover:-translate-y-1 hover:shadow-luxury">
    <Link to={`/tours/${tour.id}`} className="block">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={tour.image}
          alt={tour.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary">
          {tour.categoryLabel}
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-sm text-white">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-accent" />
            {tour.location}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-accent" />
            {tour.duration}
          </span>
        </div>
      </div>
    </Link>
    <div className="flex flex-1 flex-col p-5">
      <div className="mb-3 flex items-center justify-between gap-4">
        <h3 className="font-display text-2xl font-semibold leading-tight text-primary">{tour.name}</h3>
        <span className="flex shrink-0 items-center gap-1 text-sm font-semibold text-primary">
          <Star className="h-4 w-4 fill-accent text-accent" />
          {tour.rating}
        </span>
      </div>
      <p className="mb-5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{tour.description}</p>
      <div className="mt-auto border-t border-border pt-4">
        <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Starting price</div>
          <div className="font-display text-2xl font-semibold text-primary">{tour.price}</div>
        </div>
        <span className="text-xs font-semibold text-muted-foreground">{tour.reviews} reviews</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="secondary" size="sm" asChild>
            <Link to={`/tours/${tour.id}`}>View Details</Link>
          </Button>
          <Button variant="whatsapp" size="sm" asChild>
            <a href={whatsappMessageUrl(`Hello Green Star Tour, I want to book ${tour.name}. Please send me details and availability.`)} target="_blank" rel="noreferrer">
              <MessageCircle className="h-4 w-4" />
              Book Now
            </a>
          </Button>
        </div>
      </div>
    </div>
  </article>
);
