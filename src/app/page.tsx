import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Footer } from "@/components/sections/Footer";
import { LoyaltySignupSection } from "@/components/sections/LoyaltySignupSection";
import { NavBar } from "@/components/sections/NavBar";
import { OrderPanelProvider } from "@/components/sections/order-panel/order-panel-context";

const OrderPanel = dynamic(() =>
  import("@/components/sections/order-panel/OrderPanel").then(
    (m) => m.OrderPanel,
  ),
);
import { BackToTopButton } from "@/components/common/BackToTopButton";
import { FlavourLabTeaser } from "@/components/sections/home-v2/FlavourLabTeaser";
import { Hero } from "@/components/sections/home-v2/Hero";
import { SaucePanel } from "@/components/sections/home-v2/SaucePanel";
import { StatementPanel } from "@/components/sections/home-v2/StatementPanel";
import { TheGoods } from "@/components/sections/home-v2/TheGoods";
import { TwoSpots } from "@/components/sections/home-v2/TwoSpots";

export const metadata: Metadata = {
  title:
    "Wingers · Buttermilk Halal Fried Chicken · MK & Northampton",
  description:
    "Wingers · buttermilk halal fried chicken in Milton Keynes & Northampton. 24-hr brined, hand-dredged. Collection online, delivery via the apps.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Wingers · Buttermilk Halal Fried Chicken",
    description:
      "Buttermilk halal fried chicken in Milton Keynes & Northampton. Dip it. Bite it. Love it.",
    url: "/",
    type: "website",
    images: [
      {
        url: "/og/home.jpg",
        width: 1200,
        height: 630,
        alt: "Wingers mac & cheese",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/home.jpg"],
  },
};

export default function Home() {
  return (
    <OrderPanelProvider>
      <NavBar onDark />
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
