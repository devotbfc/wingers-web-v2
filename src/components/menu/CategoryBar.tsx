"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface CategoryBarItem {
  slug: string;
  label: string;
  id: string; // DOM id of the group section
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

export function CategoryBar({ items }: CategoryBarProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const barWrapperRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [activeSlug, setActiveSlug] = useState<string>(items[0]?.slug ?? "");
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  // Scroll-spy. One IO observing every group section; the topmost visible
  // one wins. rootMargin's top = NavBar + sticky bar height so a section
  // only counts as active once it clears the chrome.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const navH = readNavHeightPx();
    const barH = barWrapperRef.current?.offsetHeight ?? 56;
    const topMargin = navH + barH;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );
        if (visible[0]) {
          const match = items.find((i) => i.id === visible[0].target.id);
          if (match) setActiveSlug(match.slug);
        }
      },
      { rootMargin: `-${topMargin}px 0px -55% 0px`, threshold: 0 }
    );

    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, [items]);

  // Auto-centre the active pill when it changes.
  useEffect(() => {
    const el = pillRefs.current[activeSlug];
    if (!el) return;
    el.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeSlug]);

  const updateEdges = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
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
          "pointer-events-auto absolute left-1 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-brand-white text-brand-black shadow-[0_2px_8px_rgba(0,0,0,0.12)] transition-opacity md:flex",
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
              className={cn(
                "inline-flex h-11 shrink-0 snap-start items-center whitespace-nowrap rounded-full px-4 font-display text-[13px] font-bold uppercase tracking-wide transition-colors",
                active
                  ? "bg-brand-pink text-brand-black"
                  : "bg-brand-warm-grey text-brand-black/85 hover:brightness-95"
              )}
            >
              {item.label}
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
          "pointer-events-auto absolute right-1 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-brand-white text-brand-black shadow-[0_2px_8px_rgba(0,0,0,0.12)] transition-opacity md:flex",
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
