import Image from "next/image";
import Link from "next/link";

interface CrewBlockProps {
  /** Optional crew line (quote or names). Omit — do NOT ship the bracketed
   *  placeholder. When undefined the <p> is not rendered at all. */
  quote?: string;
  /** Optional override for the crew photo. */
  photo?: {
    src: string;
    alt: string;
  };
}

const DEFAULT_PHOTO = {
  // Hero poster stands in until a real crew photo lands. The data-todo marker
  // on the wrapper makes this greppable when swapping to the owed shot.
  src: "/brand/photos/hero/hero-poster.webp",
  alt: "Wingers kitchen crew at work",
};

export function CrewBlock({ quote, photo = DEFAULT_PHOTO }: CrewBlockProps = {}) {
  return (
    <section
      aria-labelledby="crew-heading"
      className="wingers-wrap pb-10 md:pb-20"
    >
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:items-center md:gap-10">
        <div
          data-todo={photo === DEFAULT_PHOTO ? "crew-photo" : undefined}
          className="relative aspect-[4/3] w-full overflow-hidden rounded-[32px] md:aspect-[5/4] md:rounded-[40px]"
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            loading="lazy"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-4 md:gap-5">
          <h2
            id="crew-heading"
            className="font-display font-bold uppercase leading-[0.95] tracking-tight text-brand-black text-[clamp(2rem,8vw,2.5rem)] md:text-[clamp(2.5rem,4.5vw,4rem)]"
          >
            Made by the crew,
            <br />
            not a factory.
          </h2>
          <p className="font-body text-base leading-relaxed text-brand-black/80 md:text-lg">
            Every piece is breaded by hand in our Milton Keynes and Northampton kitchens.
          </p>
          {quote && (
            <p className="font-body text-base leading-relaxed text-brand-black/70 md:text-lg">
              {quote}
            </p>
          )}
          <Link
            href="/about"
            className="font-body text-sm font-semibold text-brand-black underline underline-offset-4 hover:text-brand-red md:text-base"
          >
            Our story →
          </Link>
        </div>
      </div>
    </section>
  );
}
