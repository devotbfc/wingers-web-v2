"use client";

import Link from "next/link";
import { PphSheet, PphSheetContent } from "./PphSheet";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  message: string;
  returnTo: string;
};

export function AuthRequiredSheet({ open, onOpenChange, title, message, returnTo }: Props) {
  const to = encodeURIComponent(returnTo);
  return (
    <PphSheet open={open} onOpenChange={onOpenChange}>
      <PphSheetContent
        title={title}
        description={message}
        footer={
          <div className="space-y-2">
            <Link
              href={`/order/auth/login?returnTo=${to}`}
              className="inline-flex h-14 w-full items-center justify-center rounded-pill bg-pph-pink font-display text-[15px] uppercase text-pph-bg hover:brightness-95"
            >
              Sign in
            </Link>
            <Link
              href={`/order/auth/signup?returnTo=${to}`}
              className="block text-center font-display text-[13px] uppercase text-pph underline"
            >
              Create an account
            </Link>
          </div>
        }
      >
        <div className="pb-1 font-body text-[13px] text-pph-muted">
          Signing in syncs your points, saved details and order history across the app and the
          website.
        </div>
      </PphSheetContent>
    </PphSheet>
  );
}
