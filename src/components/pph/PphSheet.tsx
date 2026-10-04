"use client";

import * as React from "react";
import { XIcon } from "lucide-react";
import { Dialog as SheetPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";

// Dark bottom-anchored sheet, scoped to the /order subtree. Uses the pph
// surface colour so the panel reads as part of the app theme (ADR-019).
// Rebuilt from Radix Dialog primitives because the shadcn sheet.tsx in
// this project binds to `bg-background` / `text-foreground` tokens that
// this theme does not define.
//
// Portals the content into document.body, so we add `.pph-app` to the
// portal content itself — otherwise the scoped CSS variables wouldn't
// resolve inside the portal.

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
  className?: string;
};

export function PphSheetContent({
  title,
  description,
  footer,
  children,
  className,
}: PphSheetContentProps) {
  return (
    <SheetPrimitive.Portal>
      <SheetPrimitive.Overlay
        className={cn(
          "fixed inset-0 z-50 bg-black/70",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0",
        )}
      />
      <SheetPrimitive.Content
        className={cn(
          "pph-app",
          "fixed bottom-0 left-1/2 z-50 flex w-full max-w-md -translate-x-1/2 flex-col",
          "max-h-[85vh] overflow-hidden rounded-t-[20px] bg-pph-surface text-pph shadow-2xl",
          "data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=closed]:duration-300",
          "data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom data-[state=open]:duration-300",
          className,
        )}
      >
        {/* Drag handle bar */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-2 h-1 w-10 -translate-x-1/2 rounded-pill bg-pph-muted opacity-40"
        />

        <div className="flex items-start justify-between gap-3 px-4 pb-3 pt-6">
          <div className="min-w-0 flex-1">
            <SheetPrimitive.Title className="font-display text-[20px] uppercase tracking-tight text-pph">
              {title}
            </SheetPrimitive.Title>
            {description ? (
              <SheetPrimitive.Description className="mt-0.5 font-body text-[13px] text-pph-muted">
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
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-pill bg-pph-elevated text-pph hover:opacity-80"
          >
            <XIcon className="h-5 w-5" strokeWidth={1.5} />
          </SheetPrimitive.Close>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-3">{children}</div>

        {footer ? (
          <div className="border-t border-pph-elevated bg-pph-surface px-4 pb-5 pt-3">
            {footer}
          </div>
        ) : null}
      </SheetPrimitive.Content>
    </SheetPrimitive.Portal>
  );
}
