import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  title: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
  aspect?: string;
  className?: string;
}

export function CategoryCard({
  title,
  imageSrc,
  imageAlt,
  href,
  aspect = "aspect-[4/5]",
  className,
}: CategoryCardProps) {
  return (
    <Link href={href} className={cn("group block", className)}>
      <div className={cn("relative overflow-hidden bg-brand-black", aspect)}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(min-width: 768px) 33vw, 78vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>
      <h3 className="bg-brand-black px-6 py-4 md:px-8 md:py-5 font-display font-extrabold uppercase leading-none tracking-tight text-brand-white text-[clamp(1.5rem,4vw,2.5rem)]">
        {title}
      </h3>
    </Link>
  );
}
