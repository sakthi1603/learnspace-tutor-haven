import { describe, expect, it } from "vitest";
import { searchLessons } from "./tutor-data";

describe("formula search", () => {
  it("finds the square-of-sum lesson whether typed as (a+b)² or (a + b)^2", () => {
    const a = searchLessons("(a+b)²").map((l) => l.id);
    const b = searchLessons("(a + b)^2").map((l) => l.id);
    expect(a).toContain("square-of-sum");
    expect(b).toEqual(a);
  });

  it("finds expansion lessons for 2ab", () => {
    expect(searchLessons("2ab").map((l) => l.id)).toContain("expanding-brackets");
  });

  it("filters by subject", () => {
    expect(searchLessons("", "Biology").every((l) => l.subject === "Biology")).toBe(true);
  });
});
