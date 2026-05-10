import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "./SectionHeader";
import { useReveal } from "@/hooks/use-reveal";
import { usePublicContent } from "@/hooks/use-public-content";

const heights = ["h-80", "h-96", "h-72", "h-64", "h-96", "h-72", "h-80", "h-72"];

export const Gallery = () => {
  const { galleryImages } = usePublicContent();

  return (
    <section id="gallery" className="bg-secondary/30 py-16 md:py-20">
      <div className="container">
        <SectionHeader
          eyebrow="Gallery"
          title={<>Moments from paradise</>}
          description="A quick preview of beaches, ocean days, culture, and safari moods."
        />

        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 [column-fill:_balance]">
          {galleryImages.slice(0, 6).map((img, i) => <GalleryItem key={`${img.title}-${i}`} src={img.src} h={heights[i % heights.length]} delay={i * 50} />)}
        </div>
        <div className="mt-10 text-center">
          <Button variant="luxury" size="lg" asChild>
            <Link to="/gallery">View Full Gallery <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

const GalleryItem = ({ src, h, delay }: { src: string; h: string; delay: number }) => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal mb-4 break-inside-avoid rounded-2xl overflow-hidden shadow-card-luxury group cursor-pointer ${h}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <img src={src} alt="Zanzibar travel gallery" loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
    </div>
  );
};
