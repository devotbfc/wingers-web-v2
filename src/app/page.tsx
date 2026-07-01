import { CategoryGrid } from "@/components/sections/CategoryGrid";
import { HeroSection } from "@/components/sections/HeroSection";
import { HomeMarqueeStrip } from "@/components/sections/HomeMarqueeStrip";
import { NavBar } from "@/components/sections/NavBar";
import { OrderPanel } from "@/components/sections/order-panel/OrderPanel";
import { OrderPanelProvider } from "@/components/sections/order-panel/order-panel-context";

export default function Home() {
  return (
    <OrderPanelProvider>
      <NavBar />
      <main>
        <HeroSection />
        <HomeMarqueeStrip />
        <CategoryGrid />
        {/* TODO(homepage-chunk-3): FlavourStory */}
        {/* TODO(homepage-chunk-4): LocationsSection */}
        {/* TODO(homepage-chunk-5): LifestyleSection */}
        {/* TODO(homepage-chunk-6): LoyaltySignupSection */}
        {/* TODO(homepage-chunk-7): BigCTAStrip */}
        {/* TODO(homepage-chunk-8): Footer */}
      </main>
      <OrderPanel />
    </OrderPanelProvider>
  );
}
