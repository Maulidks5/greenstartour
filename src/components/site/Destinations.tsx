import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { useReveal } from "@/hooks/use-reveal";
import nungwi from "@/assets/tour-nungwi.jpg";
import kendwa from "@/assets/dest-kendwa.jpg";
import paje from "@/assets/dest-paje.jpg";
import stoneTown from "@/assets/tour-stone-town.jpg";
import matemwe from "@/assets/dest-matemwe.jpg";
import jambiani from "@/assets/dest-jambiani.jpg";

const destinations = [
  { name: "Nungwi", img: nungwi, tagline: "Northern sunsets", className: "md:col-span-2 md:row-span-2" },
  { name: "Kendwa", img: kendwa, tagline: "Powder beaches" },
  { name: "Paje", img: paje, tagline: "Kite paradise" },
  { name: "Stone Town", img: stoneTown, tagline: "UNESCO heritage", className: "md:col-span-2" },
  { name: "Matemwe", img: matemwe, tagline: "Quiet luxury" },
  { name: "Jambiani", img: jambiani, tagline: "Fishing village charm" },
];

export const Destinations = () => {
  return (
    <section id="destinations" className="py-24 md:py-32">
      <div className="container">
        <SectionHeader
          eyebrow="Destinations"
          title={<>Six shores. One <em className="text-gradient-gold not-italic">archipelago.</em></>}
          description="Each coast of Zanzibar tells its own story — from the historic alleys of Stone Town to the powder dunes of Kendwa."
        />

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[220px] md:auto-rows-[260px] gap-4">
          {destinations.map((d, i) => <DestCard key={d.name} {...d} delay={i * 70} />)}
        </div>
      </div>
    </section>
  );
};

const DestCard = ({
  name,
  img,
  tagline,
  className = "",
  delay,
}: {
  name: string;
  img: string;
  tagline: string;
  className?: string;
  delay: number;
}) => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal relative rounded-3xl overflow-hidden group cursor-pointer shadow-card-luxury ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <img src={img} alt={name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <div className="text-accent text-xs uppercase tracking-[0.25em] mb-1 opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-500">
          {tagline}
        </div>
        <div className="flex items-center justify-between">
          <h3 className="font-display text-3xl md:text-4xl text-white">{name}</h3>
          <div className="h-10 w-10 rounded-full glass grid place-items-center text-white translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
};
