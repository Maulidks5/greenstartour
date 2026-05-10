import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { FinalBookingCTA } from "@/components/site/CtaSections";
import { SEO } from "@/components/site/SEO";
import { usePublicContent } from "@/hooks/use-public-content";
import heroImg from "@/assets/gallery-3.jpg";

const GalleryPage = () => {
  const { galleryImages } = usePublicContent();

  return (
    <SiteLayout>
      <SEO
        title="Zanzibar Travel Gallery"
        description="View Zanzibar beaches, tours, culture, safari moments, hotels, and Green Star travel experiences."
        path="/gallery"
        image={heroImg}
      />
      <PageHero
        image={heroImg}
        title="Gallery"
        subtitle="A quick preview of Zanzibar beaches, tours, culture, and travel moments."
      />
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((image, index) => (
              <figure key={`${image.title}-${index}`} className="group overflow-hidden rounded-2xl bg-white shadow-card-luxury">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={image.src} alt={image.title} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <figcaption className="p-4 font-medium text-primary">{image.title}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
      <FinalBookingCTA />
    </SiteLayout>
  );
};

export default GalleryPage;
