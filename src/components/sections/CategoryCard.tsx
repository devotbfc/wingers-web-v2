import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  title: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
  className?: string;
}

export function CategoryCard({
  title,
  imageSrc,
  imageAlt,
  href,
  className,
}: CategoryCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative block overflow-hidden aspect-[4/5] md:aspect-[3/4] bg-brand-black",
        className
      )}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        sizes="(min-width: 768px) 33vw, 100vw"
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-brand-black/70 via-brand-black/20 to-transparent"
      />
      <h3 className="absolute bottom-0 left-0 right-0 p-6 md:p-8 font-display font-extrabold uppercase tracking-tight leading-none text-brand-white text-[clamp(2.5rem,7vw,5rem)]">
        {title}
      </h3>
    </Link>
  );
}
