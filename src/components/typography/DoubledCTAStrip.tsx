import { cn } from "@/lib/utils";
import { DoubledHeading } from "@/components/typography/DoubledHeading";

interface CTAItem {
  text: string;
  href?: string;
  fillColor?: string;
  shadowColor?: string;
  offsetEm?: string;
}

interface DoubledCTAStripProps {
  items: CTAItem[];
  className?: string;
}

export function DoubledCTAStrip({ items, className }: DoubledCTAStripProps) {
  return (
    <section className={cn("py-12 px-4 space-y-6 overflow-hidden", className)}>
      {items.map((item, i) => {
        const heading = (
          <DoubledHeading
            text={item.text}
            as="p"
            fillColor={item.fillColor}
            shadowColor={item.shadowColor}
            offsetEm={item.offsetEm}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold uppercase tracking-display leading-none"
          />
        );

        if (item.href) {
          return (
            <a
              key={i}
              href={item.href}
              className="block hover:opacity-80 transition-opacity"
            >
              {heading}
            </a>
          );
        }

        return <div key={i}>{heading}</div>;
      })}
    </section>
  );
}
