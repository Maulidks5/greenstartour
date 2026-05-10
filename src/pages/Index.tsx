import { SiteLayout } from "@/components/site/SiteLayout";
import { Hero } from "@/components/site/Hero";
import { FeaturedTours } from "@/components/site/FeaturedTours";
import { Gallery } from "@/components/site/Gallery";
import { Testimonials } from "@/components/site/Testimonials";
import { FinalBookingCTA } from "@/components/site/CtaSections";
import { WhyChooseUs } from "@/components/site/WhyChooseUs";
import { TravelServices } from "@/components/site/TravelServices";

const Index = () => {
  return (
    <SiteLayout>
      <Hero />
      <TravelServices />
      <FeaturedTours />
      <WhyChooseUs />
      <Gallery />
      <Testimonials />
      <FinalBookingCTA />
    </SiteLayout>
  );
};

export default Index;
