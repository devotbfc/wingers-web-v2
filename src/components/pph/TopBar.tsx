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
    <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-neutral-200 bg-brand-white px-4 py-3">
      {backHref ? (
        <Link href={backHref} aria-label="Back" className="rounded-md p-1 hover:bg-neutral-100">
          <ChevronLeft className="h-5 w-5" />
        </Link>
      ) : (
        <span className="w-7" />
      )}
      <h1 className="flex-1 truncate font-display text-base font-bold uppercase">{title}</h1>
      <div className="flex items-center gap-2">{right}</div>
    </header>
  );
}
