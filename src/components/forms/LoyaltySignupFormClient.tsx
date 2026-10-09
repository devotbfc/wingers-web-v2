"use client";

import dynamic from "next/dynamic";

// Client-only wrapper so FlavourClubStrip (a Server Component) can defer the
// loyalty form. The form pulls in react-hook-form, Zod + its locale pack,
// sonner, and the ui/form radix wrappers; ssr:false keeps all of that out of
// the home client manifest. The form is below the fold, so hydrating it
// client-side only has no visible cost. The placeholder reserves the exact
// rendered height so CLS stays at 0 when the real form mounts.
const LoyaltySignupForm = dynamic(
  () =>
    import("@/components/forms/LoyaltySignupForm").then(
      (m) => m.LoyaltySignupForm,
    ),
  { ssr: false, loading: LoyaltyFormPlaceholder },
);

// Mirrors LoyaltySignupForm's outer layout — mt-8, flex-col gap-4; email+name
// row (grid-cols-2 on md); consent line; submit button. Blank boxes with no
// borders, no labels, no shimmer. Height matches the live form within font
// metrics so CLS stays at 0 when the real form replaces it.
function LoyaltyFormPlaceholder() {
  return (
    <div aria-hidden="true" className="mt-8 flex flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <div className="h-5" />
          <div className="h-12" />
        </div>
        <div className="grid gap-2">
          <div className="h-5" />
          <div className="h-12" />
        </div>
      </div>
      <div className="h-10 md:h-5" />
      <div className="h-12 md:w-[146px]" />
    </div>
  );
}

interface LoyaltySignupFormClientProps {
  source?: "homepage" | "loyalty_page";
}

export function LoyaltySignupFormClient({
  source,
}: LoyaltySignupFormClientProps) {
  return <LoyaltySignupForm source={source} />;
}
