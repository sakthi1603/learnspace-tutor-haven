export type Subject = "Mathematics" | "Physics" | "Chemistry" | "Biology";

export interface Tutor {
  id: string;
  name: string;
  initials: string;
  subject: Subject;
  headline: string;
  rating: number;
  students: number;
  lessons: number;
}

export interface Lesson {
  id: string;
  title: string;
  subject: Subject;
  chapter: string;
  grade: string;
  tutorId: string;
  duration: string;
  views: number;
  likes: number;
  rating: number;
  /** Display formula on the thumbnail */
  formula: string;
  /** Searchable keywords, formulas and synonyms */
  keywords: string[];
}

export const tutors: Tutor[] = [
  {
    id: "meera",
    name: "Meera Raman",
    initials: "MR",
    subject: "Mathematics",
    headline: "Makes algebra feel like a puzzle, not a test.",
    rating: 4.9,
    students: 12840,
    lessons: 214,
  },
  {
    id: "arjun",
    name: "Arjun Patel",
    initials: "AP",
    subject: "Physics",
    headline: "Newton, waves and circuits — explained with everyday things.",
    rating: 4.8,
    students: 9620,
    lessons: 168,
  },
  {
    id: "sofia",
    name: "Sofia Lindqvist",
    initials: "SL",
    subject: "Chemistry",
    headline: "Reactions you can picture, equations you can balance.",
    rating: 4.9,
    students: 7410,
    lessons: 132,
  },
  {
    id: "kwame",
    name: "Kwame Mensah",
    initials: "KM",
    subject: "Biology",
    headline: "From cells to ecosystems, one diagram at a time.",
    rating: 4.7,
    students: 6890,
    lessons: 121,
  },
  {
    id: "lena",
    name: "Lena Okafor",
    initials: "LO",
    subject: "Mathematics",
    headline: "Calculus without the fear — limits, derivatives, integrals.",
    rating: 4.8,
    students: 10350,
    lessons: 190,
  },
  {
    id: "hiro",
    name: "Hiro Tanaka",
    initials: "HT",
    subject: "Physics",
    headline: "Energy, motion and the maths that ties them together.",
    rating: 4.8,
    students: 5530,
    lessons: 98,
  },
];

export const lessons: Lesson[] = [
  {
    id: "square-of-sum",
    title: "Square of a Sum: (a+b)² explained visually",
    subject: "Mathematics",
    chapter: "Algebraic Identities",
    grade: "Class 8",
    tutorId: "meera",
    duration: "14:32",
    views: 48210,
    likes: 3920,
    rating: 4.9,
    formula: "(a+b)² = a² + 2ab + b²",
    keywords: ["(a+b)^2", "(a+b)²", "a^2+2ab+b^2", "2ab", "square of sum", "binomial", "expansion", "algebra identity"],
  },
  {
    id: "difference-squares",
    title: "Difference of Squares in 10 minutes",
    subject: "Mathematics",
    chapter: "Algebraic Identities",
    grade: "Class 8",
    tutorId: "meera",
    duration: "10:05",
    views: 30110,
    likes: 2410,
    rating: 4.8,
    formula: "a² − b² = (a+b)(a−b)",
    keywords: ["a^2-b^2", "(a+b)(a-b)", "difference of squares", "factorisation", "algebra identity"],
  },
  {
    id: "expanding-brackets",
    title: "Expanding Brackets: where 2ab comes from",
    subject: "Mathematics",
    chapter: "Algebraic Expressions",
    grade: "Class 7",
    tutorId: "lena",
    duration: "12:48",
    views: 22870,
    likes: 1980,
    rating: 4.7,
    formula: "(a+b)(a+b)",
    keywords: ["2ab", "ab+ba", "expansion", "multiply brackets", "(a+b)^2", "binomial"],
  },
  {
    id: "integration-basics",
    title: "Integration: the area under the curve",
    subject: "Mathematics",
    chapter: "Calculus",
    grade: "Class 12",
    tutorId: "lena",
    duration: "22:16",
    views: 39400,
    likes: 3150,
    rating: 4.9,
    formula: "∫ xⁿ dx = xⁿ⁺¹⁄(n+1)",
    keywords: ["integration", "integral", "calculus", "antiderivative", "area under curve"],
  },
  {
    id: "newtons-laws",
    title: "Newton's Three Laws with real-life examples",
    subject: "Physics",
    chapter: "Laws of Motion",
    grade: "Class 9",
    tutorId: "arjun",
    duration: "18:40",
    views: 52300,
    likes: 4410,
    rating: 4.9,
    formula: "F = m·a",
    keywords: ["newton's laws", "newton", "f=ma", "force", "inertia", "motion"],
  },
  {
    id: "kinematics",
    title: "Equations of Motion made simple",
    subject: "Physics",
    chapter: "Kinematics",
    grade: "Class 9",
    tutorId: "hiro",
    duration: "16:22",
    views: 27650,
    likes: 2090,
    rating: 4.7,
    formula: "v² = u² + 2as",
    keywords: ["v=u+at", "v^2=u^2+2as", "equations of motion", "kinematics", "velocity", "acceleration"],
  },
  {
    id: "balancing-equations",
    title: "Balancing Chemical Equations step by step",
    subject: "Chemistry",
    chapter: "Chemical Reactions",
    grade: "Class 10",
    tutorId: "sofia",
    duration: "13:55",
    views: 31200,
    likes: 2600,
    rating: 4.8,
    formula: "2H₂ + O₂ → 2H₂O",
    keywords: ["balancing", "chemical equation", "2h2+o2", "water", "reaction", "stoichiometry"],
  },
  {
    id: "photosynthesis",
    title: "Photosynthesis: how plants make food",
    subject: "Biology",
    chapter: "Life Processes",
    grade: "Class 10",
    tutorId: "kwame",
    duration: "15:10",
    views: 44780,
    likes: 3700,
    rating: 4.8,
    formula: "6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂",
    keywords: ["photosynthesis", "chlorophyll", "plants", "glucose", "biology", "light reaction"],
  },
  {
    id: "cell-structure",
    title: "Inside the Cell: organelles tour",
    subject: "Biology",
    chapter: "The Cell",
    grade: "Class 9",
    tutorId: "kwame",
    duration: "11:42",
    views: 19800,
    likes: 1520,
    rating: 4.6,
    formula: "Nucleus · Mitochondria",
    keywords: ["cell", "organelles", "mitochondria", "nucleus", "biology"],
  },
];

export const subjects: Subject[] = ["Mathematics", "Physics", "Chemistry", "Biology"];

export function getTutor(id: string) {
  return tutors.find((t) => t.id === id);
}

/**
 * Normalise text and formulas so "(a + b)^2", "(a+b)²" and "(A+B)^2" match each other.
 */
export function normalizeQuery(input: string): string {
  return input
    .toLowerCase()
    .replace(/²/g, "^2")
    .replace(/³/g, "^3")
    .replace(/[−–]/g, "-")
    .replace(/[×·]/g, "*")
    .replace(/\s+/g, "")
    .replace(/[’']/g, "");
}

export function searchLessons(query: string, subject: Subject | "All" = "All"): Lesson[] {
  const q = normalizeQuery(query);
  return lessons.filter((lesson) => {
    if (subject !== "All" && lesson.subject !== subject) return false;
    if (!q) return true;
    const tutor = getTutor(lesson.tutorId);
    const haystack = [
      lesson.title,
      lesson.chapter,
      lesson.subject,
      lesson.grade,
      lesson.formula,
      tutor?.name ?? "",
      ...lesson.keywords,
    ].map(normalizeQuery);
    return haystack.some((h) => h.includes(q));
  });
}

export function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k`;
  return String(n);
}
