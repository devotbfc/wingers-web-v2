import { cn } from "@/lib/utils";
import { CategoryCard } from "./CategoryCard";

// TODO(routes): /menu/[category] pages don't exist yet — 404 expected until Phase B
const CATEGORIES = [
  {
    title: "Wings",
    href: "/menu/wings",
    imageSrc: "/brand/photos/wings/DSC01496ww.png",
    imageAlt: "Pile of buttermilk fried wings tossed in Wingers buffalo sauce with fresh chilli and chives",
    aspect: "aspect-[4/5]",
    offset: false,
  },
  {
    title: "Tenders",
    href: "/menu/tenders",
    imageSrc: "/brand/photos/tenders/DSC00293.JPG",
    imageAlt: "Golden buttermilk fried chicken tenders on a Wingers napkin",
    aspect: "aspect-square",
    offset: true,
  },
  {
    title: "Burgers",
    href: "/menu/burgers",
    imageSrc: "/brand/photos/burgers/Gemini_Generated_Image_45kpqz45kpqz45kp-4.jpg",
    imageAlt: "Wingers buffalo chicken burger with slaw, cheese and pickles on a sesame bun",
    aspect: "aspect-[3/4]",
    offset: false,
  },
] as const;

export function CategoryGrid() {
  return (
    <section className="bg-brand-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory -mx-4 px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:px-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible">
          {CATEGORIES.map((cat) => (
            <CategoryCard
              key={cat.title}
              title={cat.title}
              imageSrc={cat.imageSrc}
              imageAlt={cat.imageAlt}
              href={cat.href}
              aspect={cat.aspect}
              className={cn(
                "snap-start shrink-0 w-[78%] md:w-auto",
                cat.offset && "md:mt-12"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
