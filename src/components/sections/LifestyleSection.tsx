// TODO(assets): drop 8+ real lifestyle photos into
// public/brand/photos/lifestyle/ then swap each [data-todo="assets"] tile
// for a <next/image> with the real filename. Aspect ratios can vary.

import Image from "next/image";
import { DoubledHeading } from "@/components/typography/DoubledHeading";

interface PlaceholderTile {
  tone: "pink" | "black";
  pattern: string;
  aspect: string;
}

const PLACEHOLDER_TILES: readonly PlaceholderTile[] = [
  { tone: "pink", pattern: "wings", aspect: "aspect-square" },
  { tone: "black", pattern: "drumstick", aspect: "aspect-[4/5]" },
  { tone: "pink", pattern: "chilli", aspect: "aspect-square" },
  { tone: "black", pattern: "cheese", aspect: "aspect-square" },
  { tone: "pink", pattern: "burger", aspect: "aspect-[4/5]" },
  { tone: "black", pattern: "chicken", aspect: "aspect-square" },
  { tone: "pink", pattern: "wings", aspect: "aspect-square" },
  { tone: "black", pattern: "chilli", aspect: "aspect-square" },
];

export function LifestyleSection() {
  return (
    <section
      aria-labelledby="lifestyle-heading"
      className="bg-brand-white py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="max-w-3xl">
          <p className="font-body text-sm font-semibold uppercase tracking-[0.25em] text-brand-pink">
            Wingers Club
          </p>
          <div className="mt-4">
            <DoubledHeading
              as="h2"
              text="FRIENDS WITH FLAVOUR."
              fillColor="brand-red"
              shadowColor="brand-pink"
              offsetEm="0.06em"
              className="font-display font-extrabold uppercase leading-[0.95] tracking-tight text-[clamp(2.5rem,7vw,5rem)]"
            />
          </div>
          <p className="mt-6 font-body text-lg md:text-xl leading-relaxed text-brand-black">
            Friends, mates, first dates, cheat days. Wherever a Wingers box
            turns up, the room gets louder.
          </p>
        </div>

        <div className="mt-10 md:mt-14 grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-6">
          <div className="relative overflow-hidden aspect-[4/5] col-span-2 md:row-span-2 md:aspect-auto md:min-h-[520px] bg-brand-black -mx-4 sm:mx-0">
            <Image
              src="/brand/photos/lifestyle/Gemini_Generated_Image_51gnjs51gnjs51gn.jpg"
              alt="Friends sharing Wingers boxes"
              fill
              sizes="(min-width: 768px) 66vw, 100vw"
              className="object-cover"
              priority={false}
            />
          </div>

          {PLACEHOLDER_TILES.map((tile, i) => (
            <div
              key={i}
              data-todo="assets"
              className={`relative overflow-hidden ${tile.aspect} ${tile.tone === "pink" ? "bg-brand-pink" : "bg-brand-black"}`}
            >
              <div
                className="absolute inset-0 flex items-center justify-center opacity-25"
                aria-hidden="true"
              >
                <Image
                  src={`/brand/pattern/${tile.pattern}.svg`}
                  alt=""
                  width={160}
                  height={160}
                  className={`h-24 w-24 md:h-32 md:w-32 ${tile.tone === "pink" ? "invert" : ""}`}
                  unoptimized
                />
              </div>
              <span
                className={`absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-widest ${tile.tone === "pink" ? "text-brand-black/70" : "text-brand-white/70"}`}
              >
                Wingers Club · photo soon
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
