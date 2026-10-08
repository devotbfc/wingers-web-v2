import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Footer } from "@/components/sections/Footer";
import { NavBar } from "@/components/sections/NavBar";
import { OrderPanelProvider } from "@/components/sections/order-panel/order-panel-context";

const OrderPanel = dynamic(() =>
  import("@/components/sections/order-panel/OrderPanel").then(
    (m) => m.OrderPanel,
  ),
);
import { BackToTopButton } from "@/components/common/BackToTopButton";
import { CrewBlock } from "@/components/sections/home-v2/CrewBlock";
import { FlavourClubStrip } from "@/components/sections/home-v2/FlavourClubStrip";
import { FlavourLabTeaser } from "@/components/sections/home-v2/FlavourLabTeaser";
import { Hero } from "@/components/sections/home-v2/Hero";
import { KatsuDrop } from "@/components/sections/home-v2/KatsuDrop";
import { Marquee } from "@/components/sections/home-v2/Marquee";
import { TheGoods } from "@/components/sections/home-v2/TheGoods";
import { TwoSpots } from "@/components/sections/home-v2/TwoSpots";
import { getCurrentLimitedEdition } from "@/lib/flavours";

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
  const le = getCurrentLimitedEdition();
  const marqueeText = le
    ? `${le.name.toUpperCase()} IS HERE / LIMITED DROP / ${le.name.toUpperCase()} IS HERE / LIMITED DROP / `
    : null;

  return (
    <OrderPanelProvider>
      <NavBar />
      {/* Nav is fixed; push main down by its height + 12px so the hero's
          "Milton Keynes & Northampton" pill clears the logo row cleanly.
          --nav-h is defined in globals.css and switches at md. */}
      <main className="bg-brand-warm-grey pt-[calc(var(--nav-h)+0.75rem)]">
        <Hero />
        {marqueeText && <Marquee text={marqueeText} />}
        <KatsuDrop />
        <TheGoods />
        <FlavourLabTeaser />
        <CrewBlock />
        <TwoSpots />
        <FlavourClubStrip />
      </main>
      <Footer />
      <OrderPanel />
      <BackToTopButton />
    </OrderPanelProvider>
  );
}
