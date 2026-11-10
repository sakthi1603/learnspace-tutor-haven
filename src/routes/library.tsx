import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Search } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { LessonCard } from "@/components/lesson-card";
import { Reveal } from "@/components/reveal";
import { searchLessons, subjects, type Subject } from "@/lib/tutor-data";
import { cn } from "@/lib/utils";

const searchSchema = z.object({
  q: z.string().optional(),
  subject: z.enum(["All", "Mathematics", "Physics", "Chemistry", "Biology"]).optional(),
});

export const Route = createFileRoute("/library")({
  validateSearch: (search) => searchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "Video Library — TutorSphere" },
      {
        name: "description",
        content: "Browse and search tutor video lessons by topic, chapter, tutor or formula like (a+b)².",
      },
      { property: "og:title", content: "Video Library — TutorSphere" },
      { property: "og:description", content: "Search lessons by topic, tutor or the formula itself." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LibraryPage,
});

function LibraryPage() {
  const { q = "", subject = "All" } = Route.useSearch();
  const navigate = useNavigate({ from: "/library" });
  const [draft, setDraft] = useState(q);
  const results = searchLessons(q, subject);

  const update = (next: { q?: string | undefined; subject?: "All" | Subject | undefined }) =>
    navigate({ search: (prev) => ({ ...prev, ...next }), replace: true });

  return (
    <>
      <PageHero
        eyebrow="Video Library"
        title="Find the lesson that clicks."
        subtitle="Search by keyword, chapter, tutor — or type the formula itself. (a+b)², a^2+2ab+b^2 and 2ab all work."
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            update({ q: draft || undefined });
          }}
          className="flex max-w-xl items-center gap-3 rounded-full glass-card px-5 py-3"
        >
          <Search className="size-5 text-muted-foreground" />
          <input
            value={draft}
            onChange={(e) => {
              setDraft(e.target.value);
              update({ q: e.target.value || undefined });
            }}
            placeholder="Search lessons or formulas…"
            aria-label="Search lessons"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </form>
      </PageHero>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="flex flex-wrap gap-2">
          {(["All", ...subjects] as const).map((s) => (
            <button
              key={s}
              onClick={() => update({ subject: s === "All" ? undefined : s })}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition-all duration-300",
                subject === s
                  ? "border-primary bg-primary text-primary-foreground shadow-lamp"
                  : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground",
              )}
            >
              {s}
            </button>
          ))}
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          {results.length} {results.length === 1 ? "lesson" : "lessons"}
          {q && (
            <>
              {" "}for <span className="font-math text-foreground">"{q}"</span>
            </>
          )}
        </p>

        {results.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-dashed border-border p-16 text-center">
            <p className="font-math text-5xl text-primary animate-float">?</p>
            <p className="mt-4 text-muted-foreground">No lessons found. Try "algebra" or "(a+b)²".</p>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((l, i) => (
              <Reveal key={l.id} delay={(i % 3) * 80}>
                <LessonCard lesson={l} />
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
