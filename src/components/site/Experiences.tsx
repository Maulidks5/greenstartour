import { Hotel, Plane, Waves, Fish, Leaf, Globe2, type LucideIcon } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { useReveal } from "@/hooks/use-reveal";

const experiences = [
  { icon: Hotel, title: "Luxury Hotels", desc: "Curated 5-star resorts and private villas, hand-picked." },
  { icon: Plane, title: "Airport Transfer", desc: "Private chauffeur from ZNZ, chilled drinks waiting." },
  { icon: Waves, title: "Snorkeling", desc: "Reef encounters at Mnemba's protected coral atoll." },
  { icon: Fish, title: "Dolphins Tour", desc: "Sunrise pods of bottlenose & spinner dolphins." },
  { icon: Leaf, title: "Spice Farm", desc: "Taste vanilla, clove and cardamom at the source." },
  { icon: Globe2, title: "Cultural Experience", desc: "Swahili cooking, henna, and Taarab music nights." },
];

export const Experiences = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 gradient-ocean" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsla(38_75%_55%/0.25),transparent_60%)]" />

      <div className="container relative">
        <SectionHeader
          light
          eyebrow="Experience Highlights"
          title={<>Beyond the <em className="text-gradient-gold not-italic">ordinary</em></>}
          description="From private chefs on hidden sandbars to dawn dolphin pods — every detail orchestrated."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {experiences.map((e, i) => <ExpCard key={e.title} {...e} delay={i * 80} />)}
        </div>
      </div>
    </section>
  );
};

const ExpCard = ({ icon: Icon, title, desc, delay }: { icon: LucideIcon; title: string; desc: string; delay: number }) => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="reveal glass rounded-3xl p-7 hover:bg-white/15 transition-all duration-500 hover:-translate-y-1 group"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="h-14 w-14 rounded-2xl gradient-gold grid place-items-center mb-5 shadow-gold group-hover:scale-110 transition-transform">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="font-display text-2xl text-white mb-2">{title}</h3>
      <p className="text-white/70 leading-relaxed text-sm">{desc}</p>
    </div>
  );
};
