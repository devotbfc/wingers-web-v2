"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface CategoryBarItem {
  slug: string;
  label: string;
  id: string; // DOM id of the group section
  // Optional leading icon. Rendered before the label, aria-hidden; `filter`
  // flips the icon to black when the pill is active so a pink mark stays
  // visible on the pink active fill.
  icon?: {
    src: string;
    widthPx: number;
    heightPx: number;
  };
}

interface CategoryBarProps {
  items: readonly CategoryBarItem[];
}

// Reads --nav-h (set in globals.css, media-queried for mobile vs desktop)
// so the scroll-spy offset matches the sticky top CSS exactly — single
// source of truth for the NavBar height.
function readNavHeightPx(): number {
  if (typeof window === "undefined") return 80;
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--nav-h")
    .trim();
  if (!raw) return 80;
  if (raw.endsWith("rem")) {
    const rootFontSize =
      parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    return parseFloat(raw) * rootFontSize;
  }
  if (raw.endsWith("px")) return parseFloat(raw);
  const n = parseFloat(raw);
  return Number.isFinite(n) ? n : 80;
}

// Schedule work past the LCP measurement window. If the interactive bar
// mounted synchronously post-hydration, Chrome's LCP picker couldn't settle
// on a candidate — the bar's post-paint state churn produced NO_LCP for the
// whole /menu page (verified via /menu Lighthouse bisect). Deferring to
// idle (with a hard fallback) lets the headline paragraph above paint
// cleanly as the LCP, then the bar swaps itself in.
function scheduleEnhancement(fn: () => void): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }
  if (typeof window.requestIdleCallback === "function") {
    const id = window.requestIdleCallback(fn, { timeout: 2000 });
    return () => window.cancelIdleCallback(id);
  }
  const t = window.setTimeout(fn, 200);
  return () => window.clearTimeout(t);
}

// Shared markup helpers so the static and interactive bars render visually
// identical pills — only the semantics differ (anchor vs button).
function pillClassName(active: boolean) {
  return cn(
    "relative inline-flex h-11 shrink-0 snap-start items-center gap-1.5 whitespace-nowrap rounded-full px-4 font-display font-extrabold text-[13px] uppercase tracking-[0.02em] transition-colors",
    active
      ? "text-brand-black"
      : "bg-brand-warm-grey text-brand-black/85 hover:brightness-95"
  );
}

function PillIcon({
  icon,
  active,
}: {
  icon: NonNullable<CategoryBarItem["icon"]>;
  active: boolean;
}) {
  return (
    <Image
      src={icon.src}
      alt=""
      aria-hidden
      width={icon.widthPx}
      height={icon.heightPx}
      className={cn(
        "relative h-3.5 w-auto",
        active && "[filter:brightness(0)]"
      )}
    />
  );
}

// Static markup served during SSR + initial client paint. No hooks, no
// state, no observers — guarantees Chrome's LCP picker has nothing in the
// bar to churn against. The first pill is pre-highlighted so the active
// state reads correctly before enhancement kicks in.
function StaticCategoryBar({ items }: CategoryBarProps) {
  return (
    <div className="relative">
      <nav
        aria-label="Menu categories"
        className="flex gap-2 overflow-x-auto scroll-smooth px-4 py-2 snap-x snap-proximity [scrollbar-width:none] md:gap-3 md:px-10 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, i) => {
          const active = i === 0;
          return (
            <a key={item.slug} href={`#${item.id}`} className={pillClassName(active)}>
              {active && (
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-brand-pink"
                />
              )}
              {item.icon && <PillIcon icon={item.icon} active={active} />}
              <span className="relative">{item.label}</span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}

// Interactive bar — scroll-spy, auto-centre, edge-fade arrows, framer-motion
// pill slide. Only mounts once the LCP window has closed (via
// scheduleEnhancement in the parent), so none of its hooks or framer-motion
// internals can interfere with Chrome's LCP picker.
function InteractiveCategoryBar({ items }: CategoryBarProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const barWrapperRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [activeSlug, setActiveSlug] = useState<string>(items[0]?.slug ?? "");
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  // Reduced-motion preference, resolved locally. Importing
  // useReducedMotion from motion/react pulled framer-motion's init code
  // into the client bundle and destabilised Chrome's LCP picker on /menu.
  // matchMedia gives us the preference without the dependency. The lazy
  // useState initialiser is safe because InteractiveCategoryBar only
  // mounts on the client (the parent waits for scheduleEnhancement before
  // rendering this subtree), so there is no SSR path through here.
  const [reduced, setReduced] = useState(() =>
    typeof window === "undefined"
      ? false
      : window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  // Scroll-spy. One IO observing every group section; the topmost visible
  // one wins. rootMargin's top = NavBar + sticky bar height so a section
  // only counts as active once it clears the chrome.
  //
  // Fast scroll fires IO entries in bursts — coalesce the setter via rAF so
  // the pill update happens once per frame, not per entry batch.
  useEffect(() => {
    const navH = readNavHeightPx();
    const barH = barWrapperRef.current?.offsetHeight ?? 56;
    const topMargin = navH + barH;

    let pendingSlug: string | null = null;
    let rafId: number | null = null;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );
        if (!visible[0]) return;
        const match = items.find((i) => i.id === visible[0].target.id);
        if (!match) return;
        pendingSlug = match.slug;
        if (rafId !== null) return;
        rafId = window.requestAnimationFrame(() => {
          rafId = null;
          if (pendingSlug) setActiveSlug(pendingSlug);
          pendingSlug = null;
        });
      },
      { rootMargin: `-${topMargin}px 0px -55% 0px`, threshold: 0 }
    );

    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) io.observe(el);
    }
    return () => {
      io.disconnect();
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, [items]);

  // Auto-centre the active pill when activeSlug CHANGES. Scrolls only the
  // pill rail (rail.scrollTo) rather than the pill itself (scrollIntoView),
  // which previously propagated through the ancestor scroll chain. Skips
  // the initial mount so the default pill at scrollLeft 0 doesn't trigger
  // a layout write.
  const didCentreRef = useRef(false);
  useEffect(() => {
    if (!didCentreRef.current) {
      didCentreRef.current = true;
      return;
    }
    const rail = scrollerRef.current;
    const pill = pillRefs.current[activeSlug];
    if (!rail || !pill) return;
    const target =
      pill.offsetLeft - (rail.clientWidth - pill.offsetWidth) / 2;
    const maxScroll = rail.scrollWidth - rail.clientWidth;
    const clamped = Math.max(0, Math.min(target, maxScroll));
    if (Math.abs(rail.scrollLeft - clamped) < 2) return;
    rail.scrollTo({ left: clamped, behavior: reduced ? "auto" : "smooth" });
  }, [activeSlug, reduced]);

  const updateEdges = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const nextAtStart = el.scrollLeft <= 1;
    const nextAtEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
    setAtStart((prev) => (prev === nextAtStart ? prev : nextAtStart));
    setAtEnd((prev) => (prev === nextAtEnd ? prev : nextAtEnd));
  }, []);

  useEffect(() => {
    updateEdges();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, [updateEdges]);

  function handlePillClick(item: CategoryBarItem) {
    setActiveSlug(item.slug);
    const section = document.getElementById(item.id);
    if (section) {
      // scrollIntoView honours scroll-margin-top on the target, which is set
      // via scroll-mt-[calc(var(--nav-h)+...)] on each group section.
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function nudge(direction: 1 | -1) {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * 240, behavior: "smooth" });
  }

  return (
    <div ref={barWrapperRef} className="relative">
      {/* Left arrow — desktop only */}
      <button
        type="button"
        onClick={() => nudge(-1)}
        aria-label="Scroll categories left"
        aria-disabled={atStart}
        tabIndex={atStart ? -1 : 0}
        className={cn(
          "pointer-events-auto absolute left-1 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-brand-white text-brand-black shadow-[0_2px_8px_rgba(0,0,0,0.12)] transition-opacity md:flex",
          atStart && "pointer-events-none opacity-0"
        )}
      >
        <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5">
          <path
            fill="currentColor"
            d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"
          />
        </svg>
      </button>

      {/* Fade edges */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-brand-white to-transparent transition-opacity",
          atStart && "opacity-0"
        )}
      />
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-brand-white to-transparent transition-opacity",
          atEnd && "opacity-0"
        )}
      />

      <nav
        aria-label="Menu categories"
        ref={scrollerRef}
        className="flex gap-2 overflow-x-auto scroll-smooth px-4 py-2 snap-x snap-proximity [scrollbar-width:none] md:gap-3 md:px-10 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => {
          const active = item.slug === activeSlug;
          return (
            <button
              key={item.slug}
              ref={(el) => {
                pillRefs.current[item.slug] = el;
              }}
              type="button"
              onClick={() => handlePillClick(item)}
              aria-current={active ? "true" : undefined}
              className={pillClassName(active)}
            >
              {/* Active pill background. Framer-motion layoutId was tried
                  here (Batch J polish), but it kept destabilising Chrome's
                  LCP picker across the whole /menu page even when deferred
                  past the enhancement gate — any layout-animated element
                  mounted during the Lighthouse LCP window produced NO_LCP.
                  The transition-colors swap on the button is enough. */}
              {active && (
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-brand-pink"
                />
              )}
              {item.icon && <PillIcon icon={item.icon} active={active} />}
              <span className="relative">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Right arrow — desktop only */}
      <button
        type="button"
        onClick={() => nudge(1)}
        aria-label="Scroll categories right"
        aria-disabled={atEnd}
        tabIndex={atEnd ? -1 : 0}
        className={cn(
          "pointer-events-auto absolute right-1 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-brand-white text-brand-black shadow-[0_2px_8px_rgba(0,0,0,0.12)] transition-opacity md:flex",
          atEnd && "pointer-events-none opacity-0"
        )}
      >
        <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5">
          <path
            fill="currentColor"
            d="M8.59 16.59 10 18l6-6-6-6-1.41 1.41L13.17 12z"
          />
        </svg>
      </button>
    </div>
  );
}

export function CategoryBar(props: CategoryBarProps) {
  const [enhanced, setEnhanced] = useState(false);
  useEffect(() => scheduleEnhancement(() => setEnhanced(true)), []);
  return enhanced ? (
    <InteractiveCategoryBar {...props} />
  ) : (
    <StaticCategoryBar {...props} />
  );
}
