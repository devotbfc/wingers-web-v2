import type { Metadata } from "next";
import { Anton, Bricolage_Grotesque, Inter } from "next/font/google";
import { Suspense } from "react";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next";
import { ConsentProvider } from "@/components/consent/ConsentProvider";
import { ConsentBanner } from "@/components/consent/ConsentBanner";
import { MetaPixel } from "@/components/analytics/MetaPixel";
import { PixelPageView } from "@/components/analytics/PixelPageView";
import { SignupSlideInHost } from "@/components/signup/SignupSlideInHost";
import { getCurrentLimitedEdition } from "@/lib/flavours/current-le";
import { getSiteUrl } from "@/lib/site-url";
import "@/styles/globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

// Anton — condensed uppercase display. Scoped to UI chrome (buttons, pills,
// menu section headings, MenuCard item name + price). Headlines and body
// stay on Bricolage / Inter. One weight only (400).
const anton = Anton({
  variable: "--font-ui",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "Wingers — Buttermilk Fried Chicken",
  description:
    "Wingers serves buttermilk fried chicken in Milton Keynes and Northampton. Order online for delivery or collection.",
  openGraph: {
    siteName: "Wingers",
    locale: "en_GB",
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
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Computed in the Server Component root so FLAVOURS stays out of the global
  // client bundle. The slide-in only ever needs the one record.
  const currentLE = getCurrentLimitedEdition();

  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${inter.variable} ${anton.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ConsentProvider pixelId={process.env.NEXT_PUBLIC_META_PIXEL_ID ?? ""}>
          {children}
          <SignupSlideInHost currentLE={currentLE} />
          <ConsentBanner />
          <MetaPixel />
          {/* Suspense is required: useSearchParams inside PixelPageView would
              otherwise force the whole root into client rendering / dynamic bailout. */}
          <Suspense fallback={null}>
            <PixelPageView />
          </Suspense>
        </ConsentProvider>
        <Analytics />
        <Toaster richColors position="bottom-center" />
      </body>
    </html>
  );
}
