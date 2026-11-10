import { Play, Heart, Star, Eye } from "lucide-react";
import { getTutor, formatCount, type Lesson, type Subject } from "@/lib/tutor-data";
import { cn } from "@/lib/utils";

const subjectTint: Record<Subject, string> = {
  Mathematics: "from-primary/30 via-primary/5",
  Physics: "from-chart-3/40 via-chart-3/5",
  Chemistry: "from-chart-4/35 via-chart-4/5",
  Biology: "from-accent/35 via-accent/5",
};

export function LessonCard({ lesson }: { lesson: Lesson }) {
  const tutor = getTutor(lesson.tutorId);
  return (
    <article className="group overflow-hidden rounded-2xl glass-card transition-all duration-500 hover:-translate-y-2 hover:shadow-lamp">
      <div className={cn("relative aspect-video overflow-hidden bg-gradient-to-br to-ink grain", subjectTint[lesson.subject])}>
        <span className="absolute inset-0 grid place-items-center px-4 text-center font-math text-2xl text-chalk/80 transition-transform duration-700 group-hover:scale-110">
          {lesson.formula}
        </span>
        <span className="absolute inset-0 grid place-items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lamp">
            <Play className="size-5 translate-x-0.5" />
          </span>
        </span>
        <span className="absolute left-3 top-3 rounded-full bg-background/70 px-2.5 py-1 text-[11px] backdrop-blur">
          {lesson.subject}
        </span>
        <span className="absolute bottom-3 right-3 rounded-md bg-background/80 px-2 py-0.5 text-[11px] tabular-nums backdrop-blur">
          {lesson.duration}
        </span>
      </div>
      <div className="p-5">
        <p className="text-xs text-muted-foreground">
          {lesson.chapter} · {lesson.grade}
        </p>
        <h3 className="mt-1.5 font-sans text-base font-semibold leading-snug tracking-normal">{lesson.title}</h3>
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="grid size-6 place-items-center rounded-full bg-secondary text-[10px] font-semibold text-foreground">
              {tutor?.initials}
            </span>
            {tutor?.name}
          </span>
          <span className="flex items-center gap-3">
            <span className="flex items-center gap-1"><Eye className="size-3.5" />{formatCount(lesson.views)}</span>
            <span className="flex items-center gap-1"><Heart className="size-3.5" />{formatCount(lesson.likes)}</span>
            <span className="flex items-center gap-1 text-primary"><Star className="size-3.5 fill-current" />{lesson.rating}</span>
          </span>
        </div>
      </div>
    </article>
  );
}
