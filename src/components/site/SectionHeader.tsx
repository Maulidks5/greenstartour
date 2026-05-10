import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

export const SectionHeader = ({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}) => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cn(
        "reveal max-w-3xl mb-14",
        align === "center" ? "mx-auto text-center" : "text-left"
      )}
    >
      <div className={cn(
        "inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] mb-4",
        light ? "text-accent" : "text-accent"
      )}>
        <span className="h-px w-8 bg-accent" />
        {eyebrow}
        <span className="h-px w-8 bg-accent" />
      </div>
      <h2 className={cn(
        "font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight",
        light ? "text-white" : "text-primary"
      )}>
        {title}
      </h2>
      {description && (
        <p className={cn(
          "mt-4 text-base md:text-lg leading-relaxed",
          light ? "text-white/70" : "text-muted-foreground"
        )}>
          {description}
        </p>
      )}
    </div>
  );
};
