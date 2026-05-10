import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { usePublicContent } from "@/hooks/use-public-content";

export const TourCategories = () => {
  const { categories } = usePublicContent();

  return (
    <section className="bg-background py-16 md:py-20">
      <div className="container">
        <SectionHeader
          eyebrow="Tour Categories"
          title={<>Choose your travel style</>}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.key}
              to={`/tours?category=${category.key}`}
              className="group relative min-h-[220px] overflow-hidden rounded-2xl shadow-card-luxury"
            >
              <img src={category.image} alt={category.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/35 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 backdrop-blur transition-transform group-hover:translate-x-1">
                  <ArrowUpRight className="h-5 w-5" />
                </div>
                <h3 className="font-display text-2xl font-semibold">{category.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/75">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
