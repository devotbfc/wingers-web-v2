import Image from "next/image";

interface SauceEdgeAccentProps {
  className?: string;
}

// Placeholder sauce-cut motif — swap background-image for a real /brand/photos/sauces/*.jpg
// close-up once available; keep clip-path + data-todo hook so it's greppable.
export function SauceEdgeAccent({ className }: SauceEdgeAccentProps) {
  return (
    <div
      aria-hidden="true"
      data-todo="assets"
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
        src="/brand/photos/placeholders/P08.png"
        alt=""
        fill
        sizes="50vw"
        className="object-cover"
        data-photo-slot="P08"
      />
    </div>
  );
}
