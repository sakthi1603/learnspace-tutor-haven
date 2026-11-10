import type { ReactNode } from "react";
import chalkImg from "@/assets/chalkboard.jpg";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  subtitle: string;
  children?: ReactNode;
}

/** Shared page banner with the animated chalkboard background. */
export function PageHero({ eyebrow, title, subtitle, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pt-36 pb-16">
      <img
        src={chalkImg}
        alt=""
        aria-hidden
        width={1920}
        height={1088}
        className="absolute inset-0 h-full w-full object-cover opacity-80 animate-ken-burns"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
      <div className="relative mx-auto max-w-7xl px-6">
        <p className="animate-rise text-sm font-semibold uppercase tracking-widest text-accent">{eyebrow}</p>
        <h1 className="animate-rise mt-3 max-w-3xl text-4xl font-semibold md:text-6xl" style={{ animationDelay: "0.1s" }}>
          {title}
        </h1>
        <p className="animate-rise mt-4 max-w-xl text-muted-foreground" style={{ animationDelay: "0.2s" }}>
          {subtitle}
        </p>
        {children && (
          <div className="animate-rise mt-8" style={{ animationDelay: "0.3s" }}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
