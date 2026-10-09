import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/next";
import { ConsentProvider } from "@/components/consent/ConsentProvider";
import { ConsentBanner } from "@/components/consent/ConsentBanner";
import { MetaPixel } from "@/components/analytics/MetaPixel";
import { PixelPageView } from "@/components/analytics/PixelPageView";
// Sonner's <Toaster> only renders toasts that fire from user interactions, and
// SignupSlideInHost waits 20s/50%-scroll before showing anything. Both go
// through tiny client-side dynamic wrappers so their deps (sonner, motion,
// react-hook-form, zod) leave the main-app chunk that ships on every route.
import { ToasterClient } from "@/components/common/ToasterClient";
import { SignupSlideInHostClient } from "@/components/signup/SignupSlideInHostClient";
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

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "Wingers — Buttermilk Halal Fried Chicken",
  description:
    "Wingers serves buttermilk halal fried chicken in Milton Keynes & Northampton. Order for collection or delivery via the apps.",
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "light",
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
      className={`${bricolage.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ConsentProvider pixelId={process.env.NEXT_PUBLIC_META_PIXEL_ID ?? ""}>
          {children}
          <SignupSlideInHostClient currentLE={currentLE} />
          <ConsentBanner />
          <MetaPixel />
          {/* Suspense is required: useSearchParams inside PixelPageView would
              otherwise force the whole root into client rendering / dynamic bailout. */}
          <Suspense fallback={null}>
            <PixelPageView />
          </Suspense>
        </ConsentProvider>
        <Analytics />
        <ToasterClient />
      </body>
    </html>
  );
}
