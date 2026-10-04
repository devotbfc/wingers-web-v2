"use client";

import Link from "next/link";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { BrandButton } from "@/components/brand/BrandButton";

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
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-xl pb-6">
        <SheetHeader>
          <SheetTitle className="font-display text-xl">{title}</SheetTitle>
        </SheetHeader>
        <div className="space-y-3 px-4">
          <p className="text-sm text-neutral-600">{message}</p>
          <BrandButton variant="primary" size="lg" className="w-full" href={`/order/auth/login?returnTo=${to}`}>
            Sign in
          </BrandButton>
          <Link href={`/order/auth/signup?returnTo=${to}`} className="block text-center text-sm underline">
            Create an account
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
