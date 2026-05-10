import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MessageCircle, Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { TourCard } from "@/components/site/TourCard";
import { SEO, siteUrl } from "@/components/site/SEO";
import { whatsappUrl } from "@/data/tourData";
import { usePublicContent } from "@/hooks/use-public-content";
import heroZanzibar from "@/assets/hero-zanzibar.jpg";

const Tours = () => {
  const { tours: allTours, categories } = usePublicContent();
  const [params] = useSearchParams();
  const initialCategory = params.get("category") || "all";
  const initialSearch = params.get("search") || "";
  const [category, setCategory] = useState(initialCategory);
  const [query, setQuery] = useState(initialSearch);
  const tabs = useMemo(() => [{ label: "All Tours", value: "all" }, ...categories.map((item) => ({ label: item.title.replace(/\s+Tours$/i, ""), value: item.key }))], [categories]);

  const tours = useMemo(() => {
    return allTours.filter((tour) => {
      const matchesCategory = category === "all" || tour.category === category;
      const searchable = `${tour.name} ${tour.location} ${tour.description} ${tour.categoryLabel}`.toLowerCase();
      return matchesCategory && searchable.includes(query.toLowerCase());
    });
  }, [category, query]);

  return (
    <SiteLayout>
      <SEO
        title="Zanzibar Tours & Experiences"
        description="Explore Zanzibar beach tours, cultural tours, wildlife experiences, and local packages with easy booking support."
        path="/tours"
        image={heroZanzibar}
        schema={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Zanzibar Tours & Experiences",
          url: siteUrl("/tours"),
          itemListElement: allTours.slice(0, 12).map((tour, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: tour.name,
            url: siteUrl(`/tours/${tour.id}`),
          })),
        }}
      />
      <PageHero
        image={heroZanzibar}
        title="Tours & Experiences"
        subtitle="Choose a tour, view details, or message us for a custom plan."
      />
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="mb-8 rounded-2xl border border-border/70 bg-white p-4 shadow-card-luxury md:p-5">
            <div className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-accent">
              <SlidersHorizontal className="h-4 w-4" />
              Choose your tour
            </div>
            <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
              <div className="flex gap-2 overflow-x-auto pb-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.value}
                    onClick={() => setCategory(tab.value)}
                    className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                      category === tab.value ? "bg-primary text-white" : "bg-secondary text-primary hover:bg-accent/25"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <label className="relative block">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search tours..." className="pl-10" />
              </label>
            </div>
          </div>
          <div className="mb-6 flex flex-col justify-between gap-2 text-sm text-muted-foreground sm:flex-row">
            Showing {tours.length} option{tours.length === 1 ? "" : "s"}.
            {(query || category !== "all") && (
              <button onClick={() => { setQuery(""); setCategory("all"); }} className="font-semibold text-primary hover:text-accent">
                Clear filters
              </button>
            )}
          </div>
          {tours.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {tours.map((tour) => <TourCard key={tour.id} tour={tour} />)}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-secondary/45 p-10 text-center">
              <h2 className="font-display text-3xl font-semibold text-primary">No tours found</h2>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <button onClick={() => { setQuery(""); setCategory("all"); }} className="rounded-full bg-primary px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-primary/90">
                  Show all tours
                </button>
                <Button variant="whatsapp" asChild>
                  <a href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle className="h-4 w-4" /> WhatsApp Help</a>
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
};

export default Tours;
