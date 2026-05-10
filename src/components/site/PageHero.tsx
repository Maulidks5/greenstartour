import type { ReactNode } from "react";

export const PageHero = ({
  title,
  subtitle,
  image,
  children,
}: {
  title: string;
  subtitle: string;
  image: string;
  children?: ReactNode;
}) => (
  <section className="relative flex min-h-[400px] items-end overflow-hidden pt-32 md:min-h-[460px] md:pt-36">
    <img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover" />
    <div className="absolute inset-0 bg-gradient-to-r from-primary/88 via-primary/58 to-primary/25" />
    <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-primary/86" />
    <div className="container relative z-10 pb-12 text-white md:pb-14">
      <div className="max-w-3xl">
        <div className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-accent">Green Star Island</div>
        <h1 className="font-display text-4xl font-semibold leading-tight md:text-6xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-white/82 md:text-lg">{subtitle}</p>
        {children}
      </div>
    </div>
  </section>
);
