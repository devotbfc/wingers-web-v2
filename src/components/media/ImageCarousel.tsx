import Image from "next/image";
import { cn } from "@/lib/utils";

interface CarouselImage {
  src: string;
  alt: string;
}

interface ImageCarouselProps {
  images: CarouselImage[];
  className?: string;
}

export function ImageCarousel({ images, className }: ImageCarouselProps) {
  return (
    <div
      className={cn(
        "flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-4",
        "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className
      )}
      role="region"
      aria-label="Image carousel"
    >
      {images.map((img, i) => (
        <div
          key={i}
          className="snap-start shrink-0 w-full relative aspect-video"
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover rounded"
          />
        </div>
      ))}
    </div>
  );
}
