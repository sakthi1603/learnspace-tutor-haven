import { createFileRoute, Link } from "@tanstack/react-router";
import { Star, Users, PlayCircle } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { tutors, formatCount } from "@/lib/tutor-data";

export const Route = createFileRoute("/tutors")({
  head: () => ({
    meta: [
      { title: "Meet the Tutors — TutorSphere" },
      {
        name: "description",
        content: "Find expert tutors in mathematics, physics, chemistry and biology who teach with videos and smart notes.",
      },
      { property: "og:title", content: "Meet the Tutors — TutorSphere" },
      { property: "og:description", content: "Expert tutors in maths, physics, chemistry and biology." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TutorsPage,
});

function TutorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Tutors"
        title="Teachers who show their working."
        subtitle="Every tutor builds video lessons and interactive notes, so you can see the why behind each step."
      />
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tutors.map((t, i) => (
            <Reveal key={t.id} delay={(i % 3) * 100}>
              <div className="group relative h-full overflow-hidden rounded-3xl glass-card p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-lamp">
                <span className="absolute -right-12 -top-12 size-40 rounded-full bg-primary/10 blur-2xl transition-all duration-700 group-hover:scale-150 group-hover:bg-primary/25" />
                <div className="relative flex items-center gap-4">
                  <span className="grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent font-display text-xl font-semibold text-primary-foreground transition-transform duration-500 group-hover:rotate-6">
                    {t.initials}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold">{t.name}</h3>
                    <p className="text-sm text-accent">{t.subject}</p>
                  </div>
                </div>
                <p className="relative mt-5 text-muted-foreground">{t.headline}</p>
                <div className="relative mt-6 grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="rounded-xl bg-ink/60 py-3">
                    <Star className="mx-auto size-4 fill-current text-primary" />
                    <p className="mt-1 font-semibold text-foreground">{t.rating}</p>
                  </div>
                  <div className="rounded-xl bg-ink/60 py-3">
                    <Users className="mx-auto size-4 text-accent" />
                    <p className="mt-1 font-semibold text-foreground">{formatCount(t.students)}</p>
                  </div>
                  <div className="rounded-xl bg-ink/60 py-3">
                    <PlayCircle className="mx-auto size-4 text-chalk" />
                    <p className="mt-1 font-semibold text-foreground">{t.lessons}</p>
                  </div>
                </div>
                <Button asChild variant="chalk" className="relative mt-6 w-full">
                  <Link to="/library" search={{ q: t.name }}>
                    View lessons
                  </Link>
                </Button>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
