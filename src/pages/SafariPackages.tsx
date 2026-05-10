import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/PageHero";
import { SiteLayout } from "@/components/site/SiteLayout";
import { TourCard } from "@/components/site/TourCard";
import { whatsappUrl } from "@/data/tourData";
import { usePublicContent } from "@/hooks/use-public-content";
import heroImg from "@/assets/about-zanzibar.jpg";

const SafariPackages = () => {
  const { safariPackages } = usePublicContent();

  return (
    <SiteLayout>
      <PageHero
        image={heroImg}
        title="Safari Packages"
        subtitle="Choose a safari idea or send your dates for a simple custom plan."
      >
        <Button className="mt-8" variant="luxury" size="lg" asChild>
          <Link to="/contact">Request Custom Safari</Link>
        </Button>
      </PageHero>
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="mb-8 rounded-2xl bg-secondary/45 p-5 md:flex md:items-center md:justify-between">
            <div>
              <h2 className="font-display text-3xl font-semibold text-primary">Safari packages</h2>
              <p className="mt-2 text-sm text-muted-foreground">Serengeti, Ngorongoro, and Tanzania safari extensions from Zanzibar.</p>
            </div>
            <Button className="mt-4 md:mt-0" variant="whatsapp" asChild>
              <a href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle className="h-4 w-4" /> WhatsApp Safari Help</a>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {safariPackages.map((tour) => <TourCard key={tour.id} tour={tour} />)}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default SafariPackages;
