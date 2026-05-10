import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BedDouble, Car, CheckCircle2, Compass, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappUrl } from "@/data/tourData";
import { usePublicContent } from "@/hooks/use-public-content";

export const Hero = () => {
  const { heroSlides } = usePublicContent();
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = heroSlides[activeSlide];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 6000);

    return () => window.clearInterval(interval);
  }, [heroSlides.length]);

  useEffect(() => {
    if (activeSlide > heroSlides.length - 1) setActiveSlide(0);
  }, [activeSlide, heroSlides.length]);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <div className="absolute inset-0">
        {heroSlides.map((item, index) => (
          <img
            key={item.image}
            src={item.image}
            alt={item.title}
            className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ${
              index === activeSlide ? "scale-100 opacity-100" : "scale-105 opacity-0"
            }`}
            width={1920}
            height={1080}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/78 via-primary/48 to-island-deep/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/25 via-transparent to-island-deep/72" />
      </div>

      <div className="container relative z-10 pb-10 pt-36 sm:pb-16 sm:pt-40 md:pb-20 md:pt-48">
        <div className="max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur animate-fade-in sm:mb-5">
            <span className="h-2 w-2 rounded-full bg-island-green animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-white/90">{slide.label}</span>
          </div>

          <h1 className="font-display text-[2.35rem] font-semibold leading-[1.08] text-white sm:text-5xl lg:text-6xl animate-fade-in-up">
            Explore Zanzibar with Green Star Tour
          </h1>

          <p className="mt-4 max-w-xl text-base leading-7 text-white/90 sm:mt-5 sm:text-lg sm:leading-8 animate-fade-in-up [animation-delay:200ms]">
            Tours, Safari, Hotels, Transportation, and Local Experiences made simple and reliable.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row animate-fade-in-up [animation-delay:400ms]">
            <Button variant="green" size="xl" className="w-full sm:w-auto" asChild>
              <Link to="/contact">Book Now <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button variant="glass" size="xl" className="w-full sm:w-auto" asChild>
              <Link to="/tours">View Packages</Link>
            </Button>
            <Button variant="whatsapp" size="xl" className="w-full sm:w-auto" asChild>
              <a href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle className="h-4 w-4" /> WhatsApp Us</a>
            </Button>
          </div>

          <div className="mt-6 grid gap-2 text-sm font-semibold text-white/90 sm:mt-7 sm:grid-cols-3 sm:gap-3">
            {["Tours & Safari", "Hotels", "Transport"].map((badge) => (
              <span key={badge} className="inline-flex items-center gap-2 rounded-xl bg-white/12 px-3 py-3 backdrop-blur">
                <CheckCircle2 className="h-4 w-4 text-island-green" />
                {badge}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 flex gap-2">
          {heroSlides.map((item, index) => (
            <button
              key={item.label}
              type="button"
              onClick={() => setActiveSlide(index)}
              aria-label={`Show ${item.label}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === activeSlide ? "w-10 bg-island-green" : "w-5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>

        <QuickBookingCard />
      </div>
    </section>
  );
};

const QuickBookingCard = () => (
  <div className="mt-7 max-w-6xl animate-fade-in-up [animation-delay:700ms] sm:mt-8">
    <div className="grid gap-3 rounded-[1.25rem] border border-white/25 bg-white/95 p-3 shadow-luxury backdrop-blur sm:rounded-[1.5rem] sm:p-4 md:grid-cols-3 md:p-5">
      <QuickOption icon={Compass} title="Tours & Safari" text="Beach, culture, wildlife" href="/tours" />
      <QuickOption icon={BedDouble} title="Book Hotel" text="Resorts, villas, city stays" href="/hotels" />
      <QuickOption icon={Car} title="Book Transport" text="Airport, private driver, transfers" href="/transport" />
    </div>
  </div>
);

const QuickOption = ({
  icon: Icon,
  title,
  text,
  href,
}: {
  icon: typeof MapPin;
  title: string;
  text: string;
  href: string;
}) => (
  <Link to={href} className="group flex min-h-[74px] items-center gap-4 rounded-2xl border border-border bg-white px-4 py-4 transition-all hover:-translate-y-0.5 hover:border-island-green hover:shadow-card-luxury">
    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-island-green-soft text-primary">
      <Icon className="h-5 w-5" />
    </span>
    <span className="min-w-0 flex-1">
      <span className="block text-[11px] font-extrabold uppercase tracking-[0.18em] text-muted-foreground">
        {title}
      </span>
      <span className="mt-1 block text-sm font-semibold text-primary">{text}</span>
    </span>
    <ArrowRight className="h-4 w-4 text-island-green transition-transform group-hover:translate-x-1" />
  </Link>
);
