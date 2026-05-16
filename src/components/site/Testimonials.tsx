import { useEffect, useState } from "react";
import { Star, Quote, Send } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { useReveal } from "@/hooks/use-reveal";
import { usePublicContent } from "@/hooks/use-public-content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { postPublicForm } from "@/lib/publicApi";
import { toast } from "sonner";

export const Testimonials = () => {
  const { testimonials } = usePublicContent();
  const [active, setActive] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const canSlide = testimonials.length > visibleCount;
  const visibleTestimonials = canSlide
    ? Array.from({ length: visibleCount }, (_, index) => testimonials[(active + index) % testimonials.length])
    : testimonials;

  useEffect(() => {
    const syncVisibleCount = () => setVisibleCount(window.innerWidth < 768 ? 1 : 3);
    syncVisibleCount();
    window.addEventListener("resize", syncVisibleCount);
    return () => window.removeEventListener("resize", syncVisibleCount);
  }, []);

  useEffect(() => {
    if (!canSlide) {
      setActive(0);
      return;
    }

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % testimonials.length);
    }, 5500);

    return () => window.clearInterval(timer);
  }, [canSlide, testimonials.length]);

  return (
    <section id="testimonials" className="py-16 md:py-20">
      <div className="container">
        <SectionHeader
          eyebrow="Testimonials"
          title={<>Trusted by travellers</>}
          description="Real guest reviews. New reviews are checked by admin before they appear here."
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
          <div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {visibleTestimonials.map((r, i) => <ReviewCard key={`${r.name}-${active}-${i}`} {...r} delay={i * 120} />)}
            </div>

            {canSlide && (
              <div className="mt-6 flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => setActive((current) => (current - 1 + testimonials.length) % testimonials.length)}
                  className="grid h-9 w-9 place-items-center rounded-full border border-border bg-white text-sm font-bold text-primary shadow-card-luxury transition-colors hover:bg-island-green-soft"
                  aria-label="Previous reviews"
                >
                  ‹
                </button>
                <div className="min-w-24 rounded-full bg-island-green-soft px-4 py-2 text-center text-xs font-bold text-primary">
                  {active + 1} / {testimonials.length}
                </div>
                <button
                  type="button"
                  onClick={() => setActive((current) => (current + 1) % testimonials.length)}
                  className="grid h-9 w-9 place-items-center rounded-full border border-border bg-white text-sm font-bold text-primary shadow-card-luxury transition-colors hover:bg-island-green-soft"
                  aria-label="Next reviews"
                >
                  ›
                </button>
              </div>
            )}
          </div>

          <TestimonialForm />
        </div>
      </div>
    </section>
  );
};

const TestimonialForm = () => {
  const [processing, setProcessing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    country: "",
    rating: "5",
    review: "",
  });
  const update = (field: keyof typeof form, value: string) => setForm((current) => ({ ...current, [field]: value }));

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        setProcessing(true);
        try {
          await postPublicForm("/testimonials", {
            name: form.name,
            country: form.country,
            rating: Number(form.rating),
            review: form.review,
          });
          toast.success("Thank you. Your review is waiting for admin approval.");
          setForm({ name: "", country: "", rating: "5", review: "" });
        } catch (error) {
          toast.error(error instanceof Error ? error.message : "Review could not be sent.");
        } finally {
          setProcessing(false);
        }
      }}
      className="rounded-3xl border border-border/70 bg-white p-5 shadow-card-luxury md:p-6"
    >
      <div className="mb-5">
        <div className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Share your experience</div>
        <h3 className="mt-2 font-display text-2xl font-semibold text-primary">Leave a review</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">Your review will appear after admin approval.</p>
      </div>

      <div className="space-y-4">
        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">Name</span>
          <Input required value={form.name} onChange={(event) => update("name", event.target.value)} placeholder="Your name" />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">Country</span>
          <Input value={form.country} onChange={(event) => update("country", event.target.value)} placeholder="Country" />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">Rating</span>
          <select
            required
            value={form.rating}
            onChange={(event) => update("rating", event.target.value)}
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-base text-primary outline-none focus:ring-2 focus:ring-ring md:text-sm"
          >
            {[5, 4, 3, 2, 1].map((rating) => (
              <option key={rating} value={rating}>{rating} star{rating === 1 ? "" : "s"}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">Review</span>
          <Textarea required minLength={10} maxLength={1000} rows={4} value={form.review} onChange={(event) => update("review", event.target.value)} placeholder="Tell us about your trip..." />
        </label>
        <Button disabled={processing} type="submit" variant="green" size="lg" className="w-full">
          {processing ? "Sending..." : "Submit Review"} <Send className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};

const ReviewCard = ({
  name,
  location,
  rating,
  text,
  delay,
}: {
  name: string;
  location: string;
  rating: number;
  text: string;
  delay: number;
}) => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="reveal relative bg-card rounded-3xl p-8 shadow-card-luxury hover:shadow-luxury transition-all duration-500 hover:-translate-y-1"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <Quote className="absolute top-6 right-6 h-10 w-10 text-accent/20" />
      <div className="flex gap-1 mb-4">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-accent text-accent" />
        ))}
      </div>
      <p className="mb-8 font-display text-xl leading-relaxed text-foreground/85">"{text}"</p>
      <div className="flex items-center gap-3 border-t border-border pt-6">
        <div className="grid h-12 w-12 place-items-center rounded-full bg-secondary text-sm font-bold text-primary ring-2 ring-accent/30">
          {name.split(" ").map((part: string) => part[0]).join("").slice(0, 2)}
        </div>
        <div>
          <div className="font-medium text-primary">{name}</div>
          <div className="text-xs text-muted-foreground">{location}</div>
        </div>
      </div>
    </div>
  );
};
