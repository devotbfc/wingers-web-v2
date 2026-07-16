import type React from "react";

const HEADLINE_LINES = ["BEST WINGS", "IN THE GAME."] as const;

const DOUBLED_STYLE = {
  "--dh-fill": "var(--color-brand-black)",
  "--dh-shadow": "var(--color-brand-red)",
  "--dh-offset": "0.06em",
} as React.CSSProperties;

export function StatementPanel() {
  return (
    <section className="flex min-h-[100svh] w-full flex-col items-center justify-center bg-brand-pink px-5 py-20 text-brand-black sm:px-8">
      <p className="mb-6 font-body text-sm font-bold uppercase tracking-[0.2em] text-brand-red">
        Future of Flavours
      </p>

      <h2 className="text-center font-display font-extrabold leading-[0.84] tracking-tight">
        <span className="sr-only">Best wings in the game.</span>
        {HEADLINE_LINES.map((line) => (
          <span
            key={line}
            aria-hidden="true"
            data-text={line}
            className="doubled-heading block text-[clamp(3rem,18vw,11rem)]"
            style={DOUBLED_STYLE}
          >
            {line}
          </span>
        ))}
      </h2>
    </section>
  );
}
