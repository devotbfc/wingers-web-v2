import { LoyaltySignupForm } from "@/components/forms/LoyaltySignupForm";
import { DoubledHeading } from "@/components/typography/DoubledHeading";

interface LoyaltySignupSectionProps {
  source?: "homepage" | "loyalty_page";
}

export function LoyaltySignupSection({
  source = "homepage",
}: LoyaltySignupSectionProps) {
  return (
    <section
      aria-labelledby="loyalty-heading"
      className="bg-brand-white py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="bg-brand-pink px-6 py-14 md:px-16 md:py-20">
          <div className="max-w-4xl">
            <p className="font-body text-sm font-semibold uppercase tracking-[0.25em] text-brand-black">
              Friends with Benefits
            </p>
            <div className="mt-4">
              <DoubledHeading
                as="h2"
                text="BECOME A WINGER."
                fillColor="brand-white"
                shadowColor="brand-black"
                offsetEm="0.06em"
                className="font-display font-extrabold uppercase leading-[0.9] tracking-tight text-[clamp(3rem,9vw,6.5rem)]"
              />
            </div>
            <p className="mt-8 max-w-2xl font-body text-lg md:text-xl leading-relaxed text-brand-black">
              First dibs on drops, offers only Wingers get, and the odd free
              box. No spam, ever.
            </p>

            <LoyaltySignupForm source={source} />
          </div>
        </div>
      </div>
    </section>
  );
}
