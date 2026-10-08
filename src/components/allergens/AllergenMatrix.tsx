"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { ALLERGENS_ORDERED, type Allergen } from "@/lib/menu";
import { ALLERGEN_SECTIONS } from "./allergen-sections";
import { AvoidChips } from "./AvoidChips";
import { MatrixTable } from "./MatrixTable";

const AVOID_SET: ReadonlySet<string> = new Set(ALLERGENS_ORDERED);

function parseAvoid(raw: string | null): Allergen[] {
  if (!raw) return [];
  const seen = new Set<Allergen>();
  const out: Allergen[] = [];
  for (const part of raw.split(",")) {
    const token = part.trim();
    if (!AVOID_SET.has(token)) continue;
    const a = token as Allergen;
    if (seen.has(a)) continue;
    seen.add(a);
    out.push(a);
  }
  return out;
}

const TOTAL_ITEMS = ALLERGEN_SECTIONS.reduce(
  (n, s) => n + s.items.length,
  0,
);

function buildSummary(avoid: readonly Allergen[], hide: boolean): string {
  if (avoid.length === 0) {
    return "Pick what you avoid and those columns move to the front.";
  }
  const avoidSet = new Set(avoid);
  const containCount = ALLERGEN_SECTIONS.reduce((n, s) => {
    return (
      n + s.items.filter((i) => i.contains.some((a) => avoidSet.has(a))).length
    );
  }, 0);
  const base = `${containCount} of ${TOTAL_ITEMS} items contain your allergens.`;
  return hide
    ? `${base} Hidden from view. Everything else may still carry traces.`
    : `${base} Scroll to find safe items; everything else may still carry traces.`;
}

export function AllergenMatrix() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const avoid = useMemo(
    () => parseAvoid(searchParams.get("avoid")),
    [searchParams],
  );
  const hide = searchParams.get("hide") === "1";

  function replaceState(nextAvoid: readonly Allergen[], nextHide: boolean) {
    const sp = new URLSearchParams();
    if (nextAvoid.length > 0) sp.set("avoid", nextAvoid.join(","));
    if (nextHide) sp.set("hide", "1");
    const query = sp.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  }

  function handleToggle(a: Allergen) {
    const next = avoid.includes(a)
      ? avoid.filter((x) => x !== a)
      : [...avoid, a];
    replaceState(next, hide);
  }

  function handleHideToggle() {
    replaceState(avoid, !hide);
  }

  function handleClear() {
    replaceState([], false);
  }

  const summary = buildSummary(avoid, hide);

  return (
    <>
      <AvoidChips
        avoid={avoid}
        onToggle={handleToggle}
        onClear={handleClear}
        hide={hide}
        onHideToggle={handleHideToggle}
      />
      <p
        aria-live="polite"
        className="mt-4 font-body text-sm leading-relaxed text-brand-black/75"
      >
        {summary}
      </p>
      <MatrixTable avoid={avoid} hide={hide} />
    </>
  );
}
