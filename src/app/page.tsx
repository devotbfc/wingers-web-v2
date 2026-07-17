import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title:
    "Wingers — Halal Buttermilk Fried Chicken · Milton Keynes & Northampton",
  description:
    "Wingers is a halal buttermilk fried chicken shop in Milton Keynes and Northampton. 24-hour buttermilk brine, hand-dredged, fried to order. Wings, tenders, burgers and loaded fries — order online for delivery or collection.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Wingers — Halal Buttermilk Fried Chicken",
    description:
      "Halal buttermilk fried chicken in Milton Keynes and Northampton. Dip it. Bite it. Love it.",
    url: "/",
    type: "website",
    images: [{ url: "/og/home.png", width: 1200, height: 630 }],
  },
};

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
