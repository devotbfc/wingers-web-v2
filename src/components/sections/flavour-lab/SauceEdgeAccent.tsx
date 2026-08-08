import Image from "next/image";

interface SauceEdgeAccentProps {
  className?: string;
}

// Sauce-cut motif: a diagonal sliver of the real sauce close-up over a
// pink→red gradient wash. Clip-path exposes only the top-right slice.
export function SauceEdgeAccent({ className }: SauceEdgeAccentProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none hidden sm:block ${className ?? ""}`}
      style={{
        clipPath: "polygon(28% 0, 100% 0, 100% 100%, 0 100%)",
        background:
          "linear-gradient(135deg, var(--color-brand-pink) 0%, var(--color-brand-red) 100%)",
        opacity: 0.35,
        mixBlendMode: "screen",
      }}
    >
      <Image
        src="/brand/photos/real/P08.png"
        alt=""
        fill
        sizes="50vw"
        className="object-cover"
        data-photo-slot="P08"
      />
    </div>
  );
}
