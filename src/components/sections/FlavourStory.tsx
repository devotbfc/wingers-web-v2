// TODO(sauces-photography): swap placeholders when sauce shoot ships.
// Real sauce imagery will replace the in-repo product photos below.

import { DoubledHeading } from "@/components/typography/DoubledHeading";
import { ImageCarousel } from "@/components/media/ImageCarousel";

const SAUCE_PLACEHOLDERS = [
  {
    src: "/brand/photos/wings/Gemini_Generated_Image_dtpw2jdtpw2jdtpw.jpg",
    alt: "Buffalo wings glistening in sauce",
  },
  {
    src: "/brand/photos/wings/Gemini_Generated_Image_r143s3r143s3r143-3.jpg",
    alt: "Wings tossed in hot honey glaze",
  },
  {
    src: "/brand/photos/tenders/DSC00358.JPG",
    alt: "Buttermilk tenders with dip",
  },
];

export function FlavourStory() {
  return (
    <section
      aria-labelledby="flavour-story-heading"
      className="bg-brand-white py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="max-w-3xl">
          <DoubledHeading
            as="h2"
            text="SAUCE IS THE STAR."
            fillColor="brand-red"
            shadowColor="brand-pink"
            offsetEm="0.06em"
            className="font-display font-extrabold uppercase leading-[0.95] tracking-tight text-[clamp(2.5rem,7vw,5rem)]"
          />
          <p className="mt-6 font-body text-lg md:text-xl leading-relaxed text-brand-black">
            Every sauce is built for the bite. Buffalo heat, hot honey warmth,
            jerk depth &mdash; pick your dip and get stuck in.
          </p>
        </div>

        <ImageCarousel
          images={SAUCE_PLACEHOLDERS}
          className="mt-10 md:mt-14 -mx-4 md:mx-0"
        />
      </div>
    </section>
  );
}
