export type ReferenceKind = "explanation" | "video" | "diagram" | "formula";

export interface FormulaReference {
  id: string;
  term: string;
  short: string;
  title: string;
  steps: string[];
  conclusion: string;
  kinds: ReferenceKind[];
  videoTitle?: string;
  videoLength?: string;
  related?: string[];
}

export const references: Record<string, FormulaReference> = {
  a2: {
    id: "a2",
    term: "a²",
    short: "a multiplied by itself — the area of a square with side a.",
    title: "Where does a² come from?",
    steps: ["(a + b)(a + b)", "Take the first term of each bracket", "a × a = a²"],
    conclusion: "a² is the big square in the top-left of the area diagram.",
    kinds: ["explanation", "diagram"],
    related: ["b2", "2ab"],
  },
  b2: {
    id: "b2",
    term: "b²",
    short: "b multiplied by itself — the area of a square with side b.",
    title: "Where does b² come from?",
    steps: ["(a + b)(a + b)", "Take the second term of each bracket", "b × b = b²"],
    conclusion: "b² is the small square in the bottom-right of the area diagram.",
    kinds: ["explanation", "diagram"],
    related: ["a2", "2ab"],
  },
  "2ab": {
    id: "2ab",
    term: "2ab",
    short: "The two 'cross' products ab and ba added together.",
    title: "Why is the middle term 2ab?",
    steps: [
      "(a + b)(a + b)",
      "a × a = a²",
      "a × b = ab",
      "b × a = ab",
      "b × b = b²",
    ],
    conclusion: "ab + ba = 2ab — that's why the middle term is doubled.",
    kinds: ["explanation", "video", "diagram", "formula"],
    videoTitle: "Expanding Brackets: where 2ab comes from",
    videoLength: "4:12",
    related: ["a2", "b2", "diff"],
  },
  diff: {
    id: "diff",
    term: "a² − b²",
    short: "Difference of squares — a close cousin of (a+b)².",
    title: "Related formula: a² − b²",
    steps: ["(a + b)(a − b)", "a × a = a²", "a × (−b) = −ab", "b × a = +ab", "b × (−b) = −b²"],
    conclusion: "−ab and +ab cancel, leaving a² − b².",
    kinds: ["explanation", "formula"],
    related: ["2ab"],
  },
};
