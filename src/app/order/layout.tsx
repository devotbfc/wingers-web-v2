import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isPphMode } from "@/lib/pph/mode";
import { PphProviders } from "@/components/pph/PphProviders";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function OrderLayout({ children }: { children: React.ReactNode }) {
  if (!isPphMode()) notFound();
  return (
    <div className="min-h-screen bg-brand-white text-brand-black">
      <div className="mx-auto flex min-h-screen max-w-md flex-col border-x border-neutral-100">
        <PphProviders>{children}</PphProviders>
      </div>
    </div>
  );
}
