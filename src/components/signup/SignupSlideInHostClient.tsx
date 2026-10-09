"use client";

import dynamic from "next/dynamic";
import type { Flavour } from "@/lib/flavours";

const SignupSlideInHost = dynamic(
  () =>
    import("@/components/signup/SignupSlideInHost").then(
      (m) => m.SignupSlideInHost,
    ),
  { ssr: false },
);

export function SignupSlideInHostClient({
  currentLE,
}: {
  currentLE: Flavour | null;
}) {
  return <SignupSlideInHost currentLE={currentLE} />;
}
