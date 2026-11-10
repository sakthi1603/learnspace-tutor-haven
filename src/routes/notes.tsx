import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Bookmark, Share2, MessageCircle, Star } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { FormulaTerm, ExplanationPanel } from "@/components/smart-formula";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/notes")({
  head: () => ({
    meta: [
      { title: "Smart Notes: (a+b)² explained — TutorSphere" },
      {
        name: "description",
        content: "An interactive smart note: hover or tap each part of (a+b)² = a² + b² + 2ab to see the steps, diagram and video.",
      },
      { property: "og:title", content: "Smart Notes: (a+b)² explained — TutorSphere" },
      { property: "og:description", content: "Tap any part of the formula to see where it comes from." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NotesPage,
});

function NotesPage() {
  const [active, setActive] = useState<string | null>(null);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [myNote, setMyNote] = useState("");

  const term = (id: string, label: string) => (
    <FormulaTerm refId={id} active={active === id} onSelect={setActive}>
      {label}
    </FormulaTerm>
  );

  return (
    <>
      <PageHero
        eyebrow="Smart Notes · Algebra"
        title={<>Square of a sum, <span className="font-math text-accent">explained</span>.</>}
        subtitle="By Meera Raman · Class 8 · Algebraic Identities. Glowing terms have tutor references attached."
      />

      <section className="mx-auto grid max-w-7xl gap-8 px-6 pb-24 lg:grid-cols-[1.1fr_1fr]">
        <article className="space-y-8">
          <div className="rounded-3xl glass-card p-8 md:p-10">
            <h2 className="text-2xl font-semibold">Important formula</h2>
            <p className="mt-8 flex flex-wrap items-baseline gap-x-2 gap-y-4 font-math text-3xl md:text-5xl">
              <span>(a + b)² =</span>
              {term("a2", "a²")}
              <span>+</span>
              {term("b2", "b²")}
              <span>+</span>
              {term("2ab", "2ab")}
            </p>
            <p className="mt-8 leading-relaxed text-muted-foreground">
              To square a sum, we multiply the bracket by itself:{" "}
              <span className="font-math text-foreground">(a + b)(a + b)</span>. Each term in the
              first bracket multiplies each term in the second, giving four pieces. Two of them are
              the same — that's where the {term("2ab", "2ab")} comes from.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Compare this with the {term("diff", "difference of squares")}, where the middle terms
              cancel out instead of adding up.
            </p>
            <p className="mt-6 text-xs text-muted-foreground">
              Tip: on a phone, tap a term instead of hovering.
            </p>
          </div>

          {/* Student interactions */}
          <div className="flex flex-wrap gap-3">
            <Button variant={liked ? "hero" : "glass"} onClick={() => setLiked((v) => !v)}>
              <Heart className={cn(liked && "fill-current")} /> {liked ? "Liked" : "Like"} · {liked ? 1241 : 1240}
            </Button>
            <Button variant={saved ? "chalk" : "glass"} onClick={() => setSaved((v) => !v)}>
              <Bookmark className={cn(saved && "fill-current")} /> {saved ? "Saved" : "Bookmark"}
            </Button>
            <Button variant="glass">
              <Share2 /> Share
            </Button>
            <span className="ml-auto flex items-center gap-1 text-sm text-primary">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
              <span className="ml-1 text-muted-foreground">4.9 (382)</span>
            </span>
          </div>

          <div className="rounded-3xl glass-card p-8">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <MessageCircle className="size-5 text-accent" /> My private notes
            </h3>
            <textarea
              value={myNote}
              onChange={(e) => setMyNote(e.target.value)}
              placeholder="Write something to remember — only you can see this."
              className="mt-4 min-h-28 w-full resize-y rounded-xl border border-input bg-ink/60 p-4 text-sm outline-none transition-colors focus:border-primary"
            />
          </div>
        </article>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <ExplanationPanel refId={active} onSelect={setActive} onClose={() => setActive(null)} />
        </aside>
      </section>
    </>
  );
}
