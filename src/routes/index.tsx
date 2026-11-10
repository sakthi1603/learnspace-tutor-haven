import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Search,
  PlayCircle,
  MousePointerClick,
  Sparkles,
  Bookmark,
  MessageCircle,
  Upload,
  PenLine,
  ArrowRight,
  Star,
} from "lucide-react";
import heroImg from "@/assets/hero-study.jpg";
import chalkImg from "@/assets/chalkboard.jpg";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { LessonCard } from "@/components/lesson-card";
import { FormulaTerm, ExplanationPanel } from "@/components/smart-formula";
import { lessons } from "@/lib/tutor-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TutorSphere — Learn with videos & interactive smart notes" },
      {
        name: "description",
        content:
          "Watch tutor videos, search by formula, and click any expression in smart notes to see the explanation, diagram or video behind it.",
      },
      { property: "og:title", content: "TutorSphere — Learn with videos & interactive smart notes" },
      {
        property: "og:description",
        content: "Search by formula, watch tutor videos, and click any expression to see how it works.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const floating = [
  { t: "∫ f(x) dx", cls: "left-[8%] top-[22%] text-3xl", d: "0s" },
  { t: "E = mc²", cls: "right-[12%] top-[18%] text-2xl", d: "1.5s" },
  { t: "π", cls: "left-[45%] top-[12%] text-5xl", d: "3s" },
  { t: "√2", cls: "right-[30%] bottom-[22%] text-3xl", d: "2s" },
  { t: "Σ", cls: "left-[5%] bottom-[18%] text-5xl", d: "4s" },
  { t: "F = ma", cls: "right-[6%] bottom-[35%] text-xl", d: "0.8s" },
];

const subjectsMarquee = [
  "(a+b)²",
  "Algebra",
  "Newton's Laws",
  "Photosynthesis",
  "Integration",
  "Trigonometry",
  "Chemical Bonds",
  "Kinematics",
  "Cell Biology",
  "Probability",
  "Quadratic Equations",
  "Optics",
];

const features = [
  {
    icon: Search,
    title: "Search by formula",
    body: "Type (a+b)² or 2ab and get the exact lessons that explain it — not just keyword matches.",
  },
  {
    icon: MousePointerClick,
    title: "Notes that explain themselves",
    body: "Hover any highlighted expression for a hint. Click it for steps, diagrams and the tutor's video.",
  },
  {
    icon: PlayCircle,
    title: "Unlimited video lessons",
    body: "Tutors upload full-length lessons organised by subject, chapter and topic.",
  },
  {
    icon: Bookmark,
    title: "Bookmarks & private notes",
    body: "Save lessons, jot your own notes and pick up exactly where you left off.",
  },
  {
    icon: MessageCircle,
    title: "Ask, like & review",
    body: "Comment on a lesson, rate your tutor and share a link with your study group.",
  },
  {
    icon: Sparkles,
    title: "Track your progress",
    body: "See which chapters you've mastered and what to watch next.",
  },
];

function Index() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeRef, setActiveRef] = useState<string | null>("2ab");

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/library", search: { q: query || undefined } });
  };

  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden">
        <img
          src={heroImg}
          alt="Student learning online at night by lamplight"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover object-right animate-ken-burns"
        />
        <div className="absolute inset-0 bg-hero-veil" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-fade-bottom" />

        {floating.map((f) => (
          <span
            key={f.t}
            aria-hidden
            className={`pointer-events-none absolute hidden font-math text-chalk/25 md:block animate-float-slow ${f.cls}`}
            style={{ animationDelay: f.d }}
          >
            {f.t}
          </span>
        ))}

        <div className="relative mx-auto w-full max-w-7xl px-6 pt-28 pb-20">
          <div className="max-w-2xl">
            <p
              className="animate-rise inline-flex items-center gap-2 rounded-full border border-border bg-foreground/5 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur"
              style={{ animationDelay: "0.1s" }}
            >
              <span className="size-1.5 rounded-full bg-accent animate-glow-pulse" />
              1,200+ tutors · 18,000 interactive lessons
            </p>
            <h1
              className="animate-rise mt-6 text-5xl font-semibold leading-[1.05] md:text-7xl"
              style={{ animationDelay: "0.25s" }}
            >
              Every formula
              <br />
              has a <em className="text-gradient-lamp">story</em>.
            </h1>
            <p
              className="animate-rise mt-6 max-w-lg text-lg text-muted-foreground"
              style={{ animationDelay: "0.4s" }}
            >
              Learn from real tutors with video lessons and smart notes — click any part of an
              equation to see exactly where it comes from.
            </p>

            <form
              onSubmit={onSearch}
              className="animate-rise mt-8 flex max-w-xl items-center gap-2 rounded-full glass-card p-2 pl-5"
              style={{ animationDelay: "0.55s" }}
            >
              <Search className="size-5 shrink-0 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Try (a+b)², photosynthesis, Newton's laws…"
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                aria-label="Search lessons"
              />
              <Button type="submit" variant="hero" className="h-11 px-6">
                Search
              </Button>
            </form>

            <div
              className="animate-rise mt-6 flex flex-wrap gap-2 text-xs"
              style={{ animationDelay: "0.7s" }}
            >
              {["(a+b)²", "2ab", "Integration", "Photosynthesis"].map((s) => (
                <Link
                  key={s}
                  to="/library"
                  search={{ q: s }}
                  className="rounded-full border border-border px-3 py-1 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  {s}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="border-y border-border bg-ink py-5 overflow-hidden">
        <div className="flex w-max animate-marquee gap-10">
          {[...subjectsMarquee, ...subjectsMarquee].map((s, i) => (
            <span key={i} className="flex items-center gap-10 whitespace-nowrap font-display text-xl text-muted-foreground">
              {s}
              <Sparkles className="size-4 text-primary" />
            </span>
          ))}
        </div>
      </section>

      {/* INTERACTIVE DEMO */}
      <section className="relative overflow-hidden py-28">
        <img
          src={chalkImg}
          alt=""
          aria-hidden
          loading="lazy"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/40 to-background" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">Smart Notes</p>
            <h2 className="mt-3 text-4xl font-semibold md:text-5xl">
              Click the <span className="font-math text-accent">2ab</span>. See why.
            </h2>
            <p className="mt-5 max-w-md text-muted-foreground">
              Tutors attach explanations, diagrams and videos to any part of their notes. Try it —
              hover or tap a glowing term below.
            </p>

            <div className="mt-10 rounded-3xl glass-card p-8">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                Algebra · Important formula
              </p>
              <p className="mt-6 flex flex-wrap items-baseline gap-x-2 gap-y-4 font-math text-3xl md:text-4xl">
                <span>(a + b)² =</span>
                <FormulaTerm refId="a2" active={activeRef === "a2"} onSelect={setActiveRef}>a²</FormulaTerm>
                <span>+</span>
                <FormulaTerm refId="b2" active={activeRef === "b2"} onSelect={setActiveRef}>b²</FormulaTerm>
                <span>+</span>
                <FormulaTerm refId="2ab" active={activeRef === "2ab"} onSelect={setActiveRef}>2ab</FormulaTerm>
              </p>
            </div>

            <Button asChild variant="glass" size="xl" className="mt-8">
              <Link to="/notes">
                Open full smart note <ArrowRight />
              </Link>
            </Button>
          </Reveal>

          <Reveal delay={150}>
            <ExplanationPanel refId={activeRef} onSelect={setActiveRef} onClose={() => setActiveRef(null)} />
          </Reveal>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Why TutorSphere</p>
          <h2 className="mt-3 text-4xl font-semibold md:text-5xl">Built for the moment you get stuck.</h2>
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 90}>
              <div className="group h-full rounded-2xl glass-card p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/40">
                <span className="grid size-12 place-items-center rounded-xl bg-primary/15 text-primary transition-all duration-500 group-hover:rotate-6 group-hover:bg-primary group-hover:text-primary-foreground">
                  <f.icon className="size-6" />
                </span>
                <h3 className="mt-5 text-xl font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* POPULAR LESSONS */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">Trending now</p>
            <h2 className="mt-3 text-4xl font-semibold">Popular lessons</h2>
          </div>
          <Button asChild variant="chalk">
            <Link to="/library">
              Browse library <ArrowRight />
            </Link>
          </Button>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {lessons.slice(0, 6).map((l, i) => (
            <Reveal key={l.id} delay={i * 80}>
              <LessonCard lesson={l} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* FOR TUTORS / STUDENTS */}
      <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-24 md:grid-cols-2">
        <Reveal>
          <div className="relative h-full overflow-hidden rounded-3xl glass-card p-10">
            <span className="absolute -right-10 -top-10 size-48 rounded-full bg-primary/20 blur-3xl animate-float" />
            <Upload className="size-8 text-primary" />
            <h3 className="mt-5 text-3xl font-semibold">For tutors</h3>
            <ul className="mt-5 space-y-3 text-muted-foreground">
              <li className="flex gap-3"><PenLine className="mt-0.5 size-4 shrink-0 text-primary" />Write notes with formulas and highlight any expression.</li>
              <li className="flex gap-3"><PenLine className="mt-0.5 size-4 shrink-0 text-primary" />Attach a video, diagram, PDF or explanation to it.</li>
              <li className="flex gap-3"><PenLine className="mt-0.5 size-4 shrink-0 text-primary" />Upload lessons and organise them into courses.</li>
            </ul>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="relative h-full overflow-hidden rounded-3xl glass-card p-10">
            <span className="absolute -right-10 -top-10 size-48 rounded-full bg-accent/20 blur-3xl animate-float-slow" />
            <Star className="size-8 text-accent" />
            <h3 className="mt-5 text-3xl font-semibold">For students</h3>
            <ul className="mt-5 space-y-3 text-muted-foreground">
              <li className="flex gap-3"><PenLine className="mt-0.5 size-4 shrink-0 text-accent" />Search by topic, tutor, chapter — or by the formula itself.</li>
              <li className="flex gap-3"><PenLine className="mt-0.5 size-4 shrink-0 text-accent" />Tap any glowing term to see the steps behind it.</li>
              <li className="flex gap-3"><PenLine className="mt-0.5 size-4 shrink-0 text-accent" />Like, comment, review and bookmark your favourite lessons.</li>
            </ul>
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <Reveal>
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] p-12 text-center md:p-20">
            <img
              src={heroImg}
              alt=""
              aria-hidden
              loading="lazy"
              width={1920}
              height={1088}
              className="absolute inset-0 h-full w-full object-cover animate-ken-burns"
            />
            <div className="absolute inset-0 bg-background/75" />
            <div className="relative">
              <h2 className="text-4xl font-semibold md:text-6xl">
                Stop memorising. <em className="text-gradient-lamp">Start understanding.</em>
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-muted-foreground">
                Join thousands of students learning with tutors who show their working.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button asChild variant="hero" size="xl">
                  <Link to="/library">Start learning free</Link>
                </Button>
                <Button asChild variant="glass" size="xl">
                  <Link to="/tutors">Meet the tutors</Link>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
