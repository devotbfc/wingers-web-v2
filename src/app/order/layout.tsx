import type { Metadata } from "next";
import { Anton, DM_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { isPphMode } from "@/lib/pph/mode";
import { PphProviders } from "@/components/pph/PphProviders";
import "./_pph.css";

// Anton + DM Sans mirror the wing-app theme (ADR-019). Loaded only within
// /order so the main marketing site keeps Bricolage + Inter untouched.
// The variables below are rebound to --font-display / --font-body inside
// `.pph-app` by _pph.css — existing `font-display` / `font-body` Tailwind
// utilities Just Work in both subtrees.
const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function OrderLayout({ children }: { children: React.ReactNode }) {
  if (!isPphMode()) notFound();
  return (
    <div className={`pph-outer ${anton.variable} ${dmSans.variable}`}>
      <div className="pph-app mx-auto flex min-h-screen max-w-md flex-col">
        <PphProviders>{children}</PphProviders>
      </div>
    </div>
  );
}
