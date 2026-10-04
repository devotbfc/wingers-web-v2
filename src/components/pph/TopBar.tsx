"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";

type Props = {
  title: string;
  backHref?: string;
  right?: React.ReactNode;
};

export function TopBar({ title, backHref, right }: Props) {
  return (
    <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-pph-elevated bg-pph-bg px-4 py-3">
      {backHref ? (
        <Link
          href={backHref}
          aria-label="Back"
          className="inline-flex h-10 w-10 items-center justify-center rounded-pill text-pph hover:bg-pph-elevated"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
        </Link>
      ) : (
        <span className="w-10" />
      )}
      <h1 className="flex-1 truncate font-display text-[22px] uppercase tracking-tight text-pph">
        {title}
      </h1>
      <div className="flex items-center gap-2">{right}</div>
    </header>
  );
}
