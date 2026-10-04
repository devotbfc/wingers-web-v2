"use client";

import Link from "next/link";
import { BrandButton } from "@/components/brand/BrandButton";
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
            <BrandButton
              variant="primary"
              size="lg"
              className="w-full"
              href={`/order/auth/login?returnTo=${to}`}
            >
              Sign in
            </BrandButton>
            <Link
              href={`/order/auth/signup?returnTo=${to}`}
              className="block text-center text-sm font-bold text-brand-black underline"
            >
              Create an account
            </Link>
          </div>
        }
      >
        <div className="pb-1 text-sm text-neutral-600">
          Signing in syncs your points, saved details and order history across the app and the
          website.
        </div>
      </PphSheetContent>
    </PphSheet>
  );
}
