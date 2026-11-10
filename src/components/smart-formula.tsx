import { useState } from "react";
import { Play, Image as ImageIcon, FunctionSquare, BookOpen, ArrowRight, X } from "lucide-react";
import { references, type FormulaReference } from "@/lib/smart-notes";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface TermProps {
  refId: string;
  active: boolean;
  onSelect: (id: string) => void;
  children: React.ReactNode;
}

/** An interactive piece of a formula: hover for a quick hint, click/tap for full explanation. */
export function FormulaTerm({ refId, active, onSelect, children }: TermProps) {
  const ref = references[refId];
  return (
    <span className="group relative inline-block">
      <button
        type="button"
        onClick={() => onSelect(refId)}
        className={cn(
          "font-math rounded-lg px-1.5 transition-all duration-300",
          "border-b-2 border-dashed border-accent/70 text-accent hover:bg-accent/15",
          active ? "bg-accent text-accent-foreground shadow-chalk" : "animate-glow-pulse",
        )}
        aria-label={`Explain ${ref.term}`}
      >
        {children}
      </button>
      {/* Hover tooltip (desktop) */}
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-3 hidden w-60 -translate-x-1/2 translate-y-2 rounded-xl glass-card p-3 text-left font-sans text-xs not-italic leading-relaxed text-foreground opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 md:block"
      >
        <span className="block font-semibold text-accent">{ref.term}</span>
        {ref.short}
        <span className="mt-2 block text-[10px] uppercase tracking-wider text-primary">
          Click for full explanation →
        </span>
      </span>
    </span>
  );
}

/** Area-model diagram of (a+b)² with an animated line drawing. */
export function AreaDiagram({ highlight }: { highlight?: string }) {
  const hl = (id: string) =>
    highlight === id || (highlight === "2ab" && id === "ab")
      ? "fill-primary/35 stroke-primary"
      : "fill-foreground/5 stroke-chalk/60";
  return (
    <svg viewBox="0 0 220 220" className="w-full max-w-[260px]" aria-label="Area model of (a+b) squared">
      <rect x="10" y="10" width="130" height="130" className={cn("transition-all duration-500", hl("a2"))} strokeWidth="2" />
      <rect x="140" y="10" width="70" height="130" className={cn("transition-all duration-500", hl("ab"))} strokeWidth="2" />
      <rect x="10" y="140" width="130" height="70" className={cn("transition-all duration-500", hl("ab"))} strokeWidth="2" />
      <rect x="140" y="140" width="70" height="70" className={cn("transition-all duration-500", hl("b2"))} strokeWidth="2" />
      <path d="M10 10 H210 V210 H10 Z" fill="none" className="stroke-accent animate-draw" strokeWidth="2.5" />
      <g className="fill-foreground font-math" fontSize="20" textAnchor="middle">
        <text x="75" y="82">a²</text>
        <text x="175" y="82">ab</text>
        <text x="75" y="182">ab</text>
        <text x="175" y="182">b²</text>
      </g>
    </svg>
  );
}

const kindMeta = {
  explanation: { icon: BookOpen, label: "Explanation" },
  video: { icon: Play, label: "Video" },
  diagram: { icon: ImageIcon, label: "Diagram" },
  formula: { icon: FunctionSquare, label: "Related formula" },
} as const;

interface PanelProps {
  refId: string | null;
  onSelect: (id: string) => void;
  onClose: () => void;
}

export function ExplanationPanel({ refId, onSelect, onClose }: PanelProps) {
  const [playing, setPlaying] = useState(false);
  if (!refId) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-3xl border border-dashed border-border p-10 text-center">
        <span className="font-math text-5xl text-accent animate-float">2ab</span>
        <p className="mt-6 max-w-xs text-sm text-muted-foreground">
          Hover over a highlighted part of the formula for a quick hint, or click it to open the
          tutor's full explanation here.
        </p>
      </div>
    );
  }
  const ref: FormulaReference = references[refId];

  return (
    <div key={ref.id} className="animate-rise relative rounded-3xl glass-card p-6 md:p-8">
      <button
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-foreground/10 hover:text-foreground"
        aria-label="Close explanation"
      >
        <X className="size-4" />
      </button>
      <div className="flex flex-wrap gap-2">
        {ref.kinds.map((k) => {
          const M = kindMeta[k];
          return (
            <span key={k} className="inline-flex items-center gap-1 rounded-full bg-foreground/5 px-2.5 py-1 text-[11px] text-muted-foreground">
              <M.icon className="size-3" /> {M.label}
            </span>
          );
        })}
      </div>
      <h3 className="mt-4 text-2xl font-semibold">{ref.title}</h3>

      <ol className="mt-5 space-y-2">
        {ref.steps.map((s, i) => (
          <li
            key={s + i}
            className="animate-rise flex items-center gap-3 rounded-xl bg-ink/60 px-4 py-2.5"
            style={{ animationDelay: `${150 + i * 120}ms` }}
          >
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary/20 text-xs font-semibold text-primary">
              {i + 1}
            </span>
            <span className="font-math text-lg">{s}</span>
          </li>
        ))}
      </ol>
      <p className="mt-4 rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm">
        <span className="font-semibold text-primary">Therefore: </span>
        {ref.conclusion}
      </p>

      {ref.kinds.includes("video") && (
        <button
          onClick={() => setPlaying((p) => !p)}
          className="group relative mt-6 block aspect-video w-full overflow-hidden rounded-2xl bg-ink grain"
        >
          <span className="absolute inset-0 grid place-items-center">
            <span className="font-math text-4xl text-chalk/40">(a+b)(a+b)</span>
          </span>
          <span className="absolute inset-0 grid place-items-center">
            <span className={cn("grid size-16 place-items-center rounded-full bg-primary text-primary-foreground shadow-lamp transition-transform duration-300 group-hover:scale-110", playing && "animate-glow-pulse")}>
              <Play className="size-6 translate-x-0.5" />
            </span>
          </span>
          <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-background/70 px-4 py-2 text-left text-xs backdrop-blur">
            <span>{playing ? "Playing — " : "Watch: "}{ref.videoTitle}</span>
            <span className="text-muted-foreground">{ref.videoLength}</span>
          </span>
          {playing && <span className="absolute bottom-9 left-0 h-1 w-1/3 bg-primary transition-all" />}
        </button>
      )}

      {ref.kinds.includes("diagram") && (
        <div className="mt-6 flex justify-center rounded-2xl bg-ink/60 p-4">
          <AreaDiagram highlight={ref.id} />
        </div>
      )}

      {ref.related && (
        <div className="mt-6">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Related</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {ref.related.map((r) => (
              <Button key={r} variant="chalk" size="sm" onClick={() => onSelect(r)}>
                <span className="font-math">{references[r].term}</span>
                <ArrowRight />
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
