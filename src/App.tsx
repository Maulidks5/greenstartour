import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PublicContentProvider, type BackendContent } from "@/hooks/use-public-content";

const Index = lazy(() => import("./pages/Index.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const Tours = lazy(() => import("./pages/Tours.tsx"));
const TourDetails = lazy(() => import("./pages/TourDetails.tsx"));
const AboutPage = lazy(() => import("./pages/AboutPage.tsx"));
const GalleryPage = lazy(() => import("./pages/GalleryPage.tsx"));
const ContactPage = lazy(() => import("./pages/ContactPage.tsx"));
const PartnershipPage = lazy(() => import("./pages/PartnershipPage.tsx"));
const SafariPackages = lazy(() => import("./pages/SafariPackages.tsx"));
const HotelsPage = lazy(() => import("./pages/HotelsPage.tsx"));
const HotelDetails = lazy(() => import("./pages/HotelDetails.tsx"));
const TransportPage = lazy(() => import("./pages/TransportPage.tsx"));

const App = ({ publicContent }: { publicContent?: BackendContent }) => (
  <PublicContentProvider initialContent={publicContent}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<PageLoading />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/tours" element={<Tours />} />
            <Route path="/tours/:id" element={<TourDetails />} />
            <Route path="/hotels" element={<HotelsPage />} />
            <Route path="/hotels/:id" element={<HotelDetails />} />
            <Route path="/transport" element={<TransportPage />} />
            <Route path="/safari-packages" element={<SafariPackages />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/partnership" element={<PartnershipPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </PublicContentProvider>
);

const PageLoading = () => (
  <div className="grid min-h-screen place-items-center bg-secondary/35">
    <div className="rounded-2xl bg-white px-6 py-4 text-sm font-semibold text-primary shadow-card-luxury">
      Loading Green Star Island...
    </div>
  </div>
);

export default App;
