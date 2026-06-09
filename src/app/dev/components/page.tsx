import { BrandLogo } from "@/components/brand/BrandLogo";
import { BrandButton } from "@/components/brand/BrandButton";
import { BrandPattern } from "@/components/brand/BrandPattern";
import { MarqueeLockup } from "@/components/brand/MarqueeLockup";
import { DoubledHeading } from "@/components/typography/DoubledHeading";
import { DoubledCTAStrip } from "@/components/typography/DoubledCTAStrip";
import { VideoHero } from "@/components/media/VideoHero";
import { VideoCard } from "@/components/media/VideoCard";
import { ImageCarousel } from "@/components/media/ImageCarousel";
import { ScrollReveal } from "@/components/media/ScrollReveal";
import { HoverImage } from "@/components/media/HoverImage";
import type React from "react";

const VIDEO = "/brand/videos/hero-loop.mp4";
const POSTER = "/brand/logo/wingers-lockup-pink.svg";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="p-8 border-b border-white/10">
      <p className="text-white/40 font-body text-xs uppercase tracking-widest mb-6">{title}</p>
      {children}
    </section>
  );
}

export default function ComponentsDevPage() {
  return (
    <main className="bg-brand-black min-h-screen">

      <Section title="BrandLogo — all 8 variants">
        <div className="flex flex-wrap gap-6 items-center">
          <div className="bg-brand-black p-3"><BrandLogo variant="pink" type="lockup" /></div>
          <div className="bg-brand-black p-3"><BrandLogo variant="red" type="lockup" /></div>
          <div className="bg-brand-black p-3"><BrandLogo variant="white" type="lockup" /></div>
          <div className="bg-brand-white p-3"><BrandLogo variant="black" type="lockup" /></div>
          <div className="bg-brand-black p-3"><BrandLogo variant="pink" type="mark" /></div>
          <div className="bg-brand-black p-3"><BrandLogo variant="red" type="mark" /></div>
          <div className="bg-brand-black p-3"><BrandLogo variant="white" type="mark" /></div>
          <div className="bg-brand-white p-3"><BrandLogo variant="black" type="mark" /></div>
        </div>
      </Section>

      <Section title="BrandButton — 3 variants × 3 sizes + disabled + link">
        <div className="flex flex-wrap gap-4 items-center">
          <BrandButton variant="primary" size="sm">Order (sm)</BrandButton>
          <BrandButton variant="primary" size="md">Order (md)</BrandButton>
          <BrandButton variant="primary" size="lg">Order (lg)</BrandButton>
          <BrandButton variant="secondary" size="md">Find a Location</BrandButton>
          <BrandButton variant="ghost" size="md">Learn More</BrandButton>
          <BrandButton variant="primary" size="md" disabled>Disabled</BrandButton>
          <BrandButton variant="primary" size="md" href="/dev/components">As Link</BrandButton>
        </div>
      </Section>

      <Section title="BrandPattern — tile and banner">
        <p className="text-white/40 text-xs mb-2">banner</p>
        <BrandPattern variant="banner" className="bg-brand-pink/10 rounded" iconSize={48} />
        <p className="text-white/40 text-xs mt-6 mb-2">tile (4-row grid)</p>
        <BrandPattern variant="tile" className="bg-brand-pink/10 rounded p-4" iconSize={48} />
      </Section>

      <Section title="MarqueeLockup — 40s speed">
        <MarqueeLockup speed={40} />
      </Section>

      <Section title="DoubledHeading — fill/shadow combos">
        <DoubledHeading
          text="DIP IT. BITE IT. LOVE IT."
          as="h1"
          className="text-4xl font-display font-extrabold uppercase tracking-display"
        />
        <div className="mt-8">
          <DoubledHeading
            text="FUTURE OF FLAVOURS"
            as="h2"
            fillColor="brand-red"
            shadowColor="brand-pink"
            offsetEm="0.1em"
            className="text-3xl font-display font-extrabold uppercase tracking-display"
          />
        </div>
        <div className="mt-8">
          <DoubledHeading
            text="GET STUCK IN"
            as="h3"
            fillColor="brand-white"
            shadowColor="brand-red"
            offsetEm="0.06em"
            className="text-2xl font-display font-extrabold uppercase tracking-display"
          />
        </div>
      </Section>

      <Section title="DoubledCTAStrip — 4 items">
        <DoubledCTAStrip
          items={[
            { text: "ORDER NOW.", href: "/dev/components", fillColor: "brand-pink", shadowColor: "brand-red" },
            { text: "FIND US.", fillColor: "brand-red", shadowColor: "brand-pink" },
            { text: "TASTE IT.", fillColor: "brand-white", shadowColor: "brand-pink" },
            { text: "LOVE IT.", fillColor: "brand-pink", shadowColor: "brand-white", offsetEm: "0.12em" },
          ]}
        />
      </Section>

      <Section title="VideoHero — autoplay loop with overlay (h-96)">
        <VideoHero src={VIDEO} poster={POSTER} className="h-96 rounded overflow-hidden">
          <div className="flex flex-col items-center justify-center h-96 gap-4">
            <DoubledHeading
              text="DIP IT. BITE IT. LOVE IT."
              as="p"
              className="text-4xl font-display font-extrabold uppercase tracking-display"
            />
            <BrandButton variant="primary" size="lg">Order Now</BrandButton>
          </div>
        </VideoHero>
      </Section>

      <Section title="VideoCard — image default, video on hover">
        <div className="w-80">
          <VideoCard
            videoSrc={VIDEO}
            imageSrc={POSTER}
            imageAlt="Wingers wings"
            aspectRatio="16/9"
            className="rounded"
          />
        </div>
      </Section>

      <Section title="ImageCarousel — pure CSS scroll-snap">
        <ImageCarousel
          images={[
            { src: "/brand/logo/wingers-lockup-pink.svg", alt: "Slide 1" },
            { src: "/brand/logo/wingers-lockup-red.svg", alt: "Slide 2" },
            { src: "/brand/logo/wingers-lockup-white.svg", alt: "Slide 3" },
          ]}
          className="max-w-sm rounded"
        />
      </Section>

      <Section title="ScrollReveal — scroll down to see fade-in">
        <div className="space-y-4">
          <ScrollReveal>
            <div className="bg-brand-red p-8 text-brand-white font-display text-2xl rounded">
              I fade in on scroll.
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="bg-brand-pink p-8 text-brand-black font-display text-2xl rounded">
              I fade in with a 200ms delay.
            </div>
          </ScrollReveal>
        </div>
      </Section>

      <Section title="HoverImage — hover to crossfade">
        <HoverImage
          defaultSrc="/brand/logo/wingers-lockup-pink.svg"
          hoverSrc="/brand/logo/wingers-lockup-red.svg"
          alt="Wingers logo"
          width={300}
          height={100}
        />
      </Section>

    </main>
  );
}
