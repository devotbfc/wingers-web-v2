import { Footer } from "@/components/sections/Footer";
import { LoyaltySignupSection } from "@/components/sections/LoyaltySignupSection";
import { NavBar } from "@/components/sections/NavBar";
import { OrderPanel } from "@/components/sections/order-panel/OrderPanel";
import { OrderPanelProvider } from "@/components/sections/order-panel/order-panel-context";
import { BackToTopButton } from "@/components/sections/home-v2/BackToTopButton";
import { FlavourLabTeaser } from "@/components/sections/home-v2/FlavourLabTeaser";
import { Hero } from "@/components/sections/home-v2/Hero";
import { SaucePanel } from "@/components/sections/home-v2/SaucePanel";
import { StatementPanel } from "@/components/sections/home-v2/StatementPanel";
import { TheGoods } from "@/components/sections/home-v2/TheGoods";
import { TwoSpots } from "@/components/sections/home-v2/TwoSpots";

export default function Home() {
  return (
    <OrderPanelProvider>
      <NavBar />
      <main>
        <Hero />
        <StatementPanel />
        <TheGoods />
        <SaucePanel />
        <TwoSpots />
        <FlavourLabTeaser />
        <LoyaltySignupSection source="homepage" />
      </main>
      <Footer />
      <OrderPanel />
      <BackToTopButton />
    </OrderPanelProvider>
  );
}
