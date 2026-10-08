import Image from "next/image";
import Link from "next/link";
import { Plus, ArrowRight } from "lucide-react";

interface Tile {
  name: string;
  line: string;
  img: string;
  alt: string;
}

const TILES: Tile[] = [
  {
    name: "Wings",
    line: "Sauced or dry-rubbed",
    img: "/brand/photos/wings/DSC01496ww.png",
    alt: "Wingers halal buttermilk wings",
  },
  {
    name: "Tenders",
    line: "Hand-breaded strips",
    img: "/brand/photos/tenders/DSC00293.JPG",
    alt: "Chicken tenders",
  },
  {
    name: "Burgers",
    line: "Smash and chicken",
    img: "/brand/photos/burgers/ww.png",
    alt: "Wingers chicken burger",
  },
  {
    name: "Shakes",
    line: "Thick. Very thick.",
    img: "/brand/photos/lifestyle/Gemini_Generated_Image_51gnjs51gnjs51gn.jpg",
    alt: "Wingers thick shakes",
  },
];

export function TheGoods() {
  return (
    <section
      aria-labelledby="the-goods-heading"
      className="pb-10 md:pb-20"
    >
      <div className="wingers-wrap flex items-end justify-between gap-4 pb-5 md:pb-6">
        <h2
          id="the-goods-heading"
          className="font-display font-bold uppercase leading-[0.95] tracking-tight text-brand-black text-[clamp(2rem,8vw,2.5rem)] md:text-[clamp(2.5rem,4.5vw,4rem)]"
        >
          The Goods
        </h2>
        <Link
          href="/menu"
          className="font-body text-sm font-semibold text-brand-black underline underline-offset-4 hover:text-brand-red md:text-base"
        >
          Full menu →
        </Link>
      </div>

      {/* Mobile: horizontal scroll-snap rail. Desktop: 4-col grid inside wrap. */}
      <ul
        aria-label="Menu categories"
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-[var(--wrap-gutter,1rem)] pb-4 md:mx-auto md:max-w-[var(--wrap-max,80rem)] md:grid md:grid-cols-4 md:gap-5 md:overflow-visible md:px-[var(--wrap-gutter,1rem)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {TILES.map((tile) => (
          <li
            key={tile.name}
            className="shrink-0 snap-start md:shrink"
          >
            <Link
              href="/menu"
              aria-label={`${tile.name.toUpperCase()}, ${tile.line}`}
              className="group flex w-[220px] flex-col gap-3 rounded-[28px] bg-brand-white p-2.5 pb-4 md:w-auto md:gap-3.5 md:rounded-[32px] md:p-3 md:pb-5 md:transition-transform md:duration-200 md:motion-safe:hover:-translate-y-1.5"
            >
              <div className="relative aspect-square w-full overflow-hidden [border-radius:999px_999px_20px_20px] md:[border-radius:999px_999px_24px_24px]">
                <Image
                  src={tile.img}
                  alt={tile.alt}
                  fill
                  sizes="(min-width: 768px) 20rem, 220px"
                  className="object-cover"
                />
              </div>
              <div className="flex items-center justify-between gap-2 px-1.5 md:px-2">
                <div className="min-w-0">
                  <div className="font-display font-extrabold uppercase leading-none text-brand-black text-[22px] md:text-[26px]">
                    {tile.name}
                  </div>
                  <div className="mt-1 font-body text-[13px] text-brand-black/70 md:text-sm">
                    {tile.line}
                  </div>
                </div>
                {/* Mobile: pink + icon. Desktop: pink arrow circle. */}
                <span
                  aria-hidden="true"
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-pink text-brand-black md:h-12 md:w-12"
                >
                  <Plus
                    className="h-[18px] w-[18px] stroke-[2.6] md:hidden"
                    aria-hidden="true"
                  />
                  <ArrowRight
                    className="hidden h-5 w-5 stroke-[2.6] md:block"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
