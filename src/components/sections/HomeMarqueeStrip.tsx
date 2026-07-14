import { BrandLogo } from "@/components/brand/BrandLogo";
import { MarqueeLockup } from "@/components/brand/MarqueeLockup";

const MARK = (
  <BrandLogo
    variant="pink"
    type="mark"
    width={48}
    height={48}
    className="h-10 w-10"
  />
);

const ITEMS = [
  "WINGERS",
  MARK,
  "BEST WINGS IN THE GAME",
  MARK,
  "GET STUCK IN",
  MARK,
  "DIP IT. BITE IT. LOVE IT.",
];

export function HomeMarqueeStrip() {
  return (
    <section className="bg-brand-white py-8 md:py-10">
      <MarqueeLockup items={ITEMS} itemClassName="text-brand-red" />
    </section>
  );
}
