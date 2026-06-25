import { describe, expect, it } from "vitest";
import { addWeeks, DayOfWeek, getMondayBeforeDate } from "../../utils/planningFunction";


describe("addWeeks", () => {
  it("ajoute une semaine à une date", () => {
    const date = new Date("2026-06-23");

    const result = addWeeks(date, 1);

    expect(result.toISOString().slice(0, 10)).toBe("2026-06-30");
  });

  it("ajoute plusieurs semaines", () => {
    const date = new Date("2026-06-23");

    const result = addWeeks(date, 4);

    expect(result.toISOString().slice(0, 10)).toBe("2026-07-21");
  });

  it("ne modifie pas la date originale", () => {
    const date = new Date("2026-06-23");

    addWeeks(date, 1);

    expect(date.toISOString().slice(0, 10)).toBe("2026-06-23");
  });
});

describe("getMondayBeforeDate", () => {
  it("retourne la même date si c'est déjà lundi", () => {
    const date = new Date("2026-06-22");

    const result = getMondayBeforeDate(date);

    expect(result.toISOString().slice(0, 10)).toBe("2026-06-22");
  });

  it("retourne le lundi précédent pour un mercredi", () => {
    const date = new Date("2026-06-24");

    const result = getMondayBeforeDate(date);

    expect(result.toISOString().slice(0, 10)).toBe("2026-06-22");
  });

  it("retourne le lundi suivant pour un samedi", () => {
    const date = new Date("2026-06-27");

    const result = getMondayBeforeDate(date);

    expect(result.toISOString().slice(0, 10)).toBe("2026-06-29");
  });

  it("retourne le lundi suivant pour un dimanche", () => {
    const date = new Date("2026-06-28");

    const result = getMondayBeforeDate(date);

    expect(result.toISOString().slice(0, 10)).toBe("2026-06-29");
  });
});

describe("DayOfWeek", () => {
  it("associe Monday à 1", () => {
    expect(DayOfWeek.Monday).toBe(1);
  });

  it("associe Sunday à 0", () => {
    expect(DayOfWeek.Sunday).toBe(0);
  });
});