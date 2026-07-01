import { BehindTheScenes } from "@/components/sections/BehindTheScenes";
import { BigCTAStrip } from "@/components/sections/BigCTAStrip";
import { CategoryGrid } from "@/components/sections/CategoryGrid";
import { FlavourStory } from "@/components/sections/FlavourStory";
import { Footer } from "@/components/sections/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { HomeMarqueeStrip } from "@/components/sections/HomeMarqueeStrip";
import { LifestyleSection } from "@/components/sections/LifestyleSection";
import { LocationsSection } from "@/components/sections/LocationsSection";
import { LoyaltySignupSection } from "@/components/sections/LoyaltySignupSection";
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
        <FlavourStory />
        <BehindTheScenes />
        <LocationsSection />
        <LifestyleSection />
        <LoyaltySignupSection />
        <BigCTAStrip />
      </main>
      <Footer />
      <OrderPanel />
    </OrderPanelProvider>
  );
}
