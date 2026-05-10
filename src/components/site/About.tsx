import { useEffect, useRef, useState } from "react";
import { Award, ShieldCheck, Sparkles } from "lucide-react";
import aboutImg from "@/assets/about-zanzibar.jpg";
import { useReveal } from "@/hooks/use-reveal";

const stats = [
  { value: 12000, suffix: "+", label: "Happy Clients" },
  { value: 850, suffix: "+", label: "Tours Completed" },
  { value: 14, suffix: "", label: "Years Experience" },
];

const Counter = ({ to, suffix }: { to: number; suffix: string }) => {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const start = performance.now();
        const dur = 1800;
        const tick = (t: number) => {
          const p = Math.min((t - start) / dur, 1);
          setN(Math.floor(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      }
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);
  return <div ref={ref} className="font-display text-5xl md:text-6xl text-primary">{n.toLocaleString()}{suffix}</div>;
};

export const About = () => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="about" className="py-24 md:py-32 bg-secondary/40">
      <div className="container grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div ref={ref} className="reveal relative">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-luxury">
            <img src={aboutImg} alt="Luxury Zanzibar overwater retreat" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div className="absolute -bottom-6 -right-6 glass-card rounded-2xl p-5 shadow-luxury max-w-[220px] hidden md:block">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl gradient-gold grid place-items-center">
                <Award className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Awarded</div>
                <div className="font-medium text-primary text-sm">Best Luxury Tour 2025</div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="text-accent text-xs uppercase tracking-[0.3em] mb-4">About Green Star Island</div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary leading-tight mb-6">
            Crafting <em className="text-gradient-gold not-italic">refined journeys</em><br />since 2011.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            Born on the shores of the Spice Island, Green Star Island Tour & Safari is a boutique tour team dedicated to
            discerning travellers. We weave together heritage, hospitality and untouched nature into
            seamless private itineraries.
          </p>

          <div className="space-y-3 mb-10">
            {[
              { icon: ShieldCheck, text: "Fully licensed & insured operator" },
              { icon: Sparkles, text: "Hand-picked guides & 5-star partners" },
              { icon: Award, text: "Concierge support 24/7" },
            ].map((f) => (
              <div key={f.text} className="flex items-center gap-3 text-foreground/80">
                <div className="h-9 w-9 rounded-full bg-accent/15 grid place-items-center">
                  <f.icon className="h-4 w-4 text-accent" />
                </div>
                {f.text}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
            {stats.map((s) => (
              <div key={s.label}>
                <Counter to={s.value} suffix={s.suffix} />
                <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
