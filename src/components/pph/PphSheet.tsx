"use client";

import * as React from "react";
import { XIcon } from "lucide-react";
import { Dialog as SheetPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";

// Bottom-anchored sheet with a solid brand-white panel. The shadcn `sheet.tsx`
// in this project binds to Tailwind tokens (`bg-background`, `text-foreground`)
// that this theme does not define, so every panel it rendered was transparent
// — every pph sheet drew on top of the page. Rebuilt here with the Radix
// Dialog primitives directly so we own the fill, the drag handle, and the
// sticky header/footer layout.

export function PphSheet({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <SheetPrimitive.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </SheetPrimitive.Root>
  );
}

type PphSheetContentProps = {
  title: string;
  description?: string;
  footer?: React.ReactNode;
  children: React.ReactNode;
  // Allow callers to override panel height (status card / full-image hero).
  className?: string;
  // When true, body gets zero top padding so a hero image can bleed under the
  // drag handle. The sticky header is still rendered absolutely over the hero.
  flushTop?: boolean;
};

export function PphSheetContent({
  title,
  description,
  footer,
  children,
  className,
  flushTop = false,
}: PphSheetContentProps) {
  return (
    <SheetPrimitive.Portal>
      <SheetPrimitive.Overlay
        className={cn(
          "fixed inset-0 z-50 bg-black/60",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0",
        )}
      />
      <SheetPrimitive.Content
        className={cn(
          "fixed bottom-0 left-1/2 z-50 flex w-full max-w-md -translate-x-1/2 flex-col",
          "max-h-[85vh] overflow-hidden rounded-t-2xl bg-brand-white text-brand-black shadow-2xl",
          "data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=closed]:duration-300",
          "data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom data-[state=open]:duration-300",
          className,
        )}
      >
        <div className="relative">
          {/* Drag handle bar */}
          <div className="pointer-events-none absolute left-1/2 top-2 h-1 w-10 -translate-x-1/2 rounded-full bg-neutral-300" />
        </div>

        <div className={cn("flex items-start justify-between gap-3 border-b border-neutral-100 px-4 pb-3 pt-5", flushTop && "border-b-0")}>
          <div className="min-w-0 flex-1">
            <SheetPrimitive.Title className="font-display text-lg font-extrabold uppercase tracking-tight text-brand-black">
              {title}
            </SheetPrimitive.Title>
            {description ? (
              <SheetPrimitive.Description className="mt-0.5 text-xs text-neutral-500">
                {description}
              </SheetPrimitive.Description>
            ) : (
              <SheetPrimitive.Description className="sr-only">
                {title}
              </SheetPrimitive.Description>
            )}
          </div>
          <SheetPrimitive.Close
            aria-label="Close"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-brand-black hover:bg-neutral-200"
          >
            <XIcon className="h-4 w-4" strokeWidth={2} />
          </SheetPrimitive.Close>
        </div>

        <div className={cn("flex-1 overflow-y-auto", flushTop ? "" : "px-4 py-3")}>
          {children}
        </div>

        {footer ? (
          <div className="border-t border-neutral-100 bg-brand-white px-4 pb-5 pt-3">
            {footer}
          </div>
        ) : null}
      </SheetPrimitive.Content>
    </SheetPrimitive.Portal>
  );
}
