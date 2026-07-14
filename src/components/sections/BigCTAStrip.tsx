import { BrandButton } from "@/components/brand/BrandButton";
import { DoubledCTAStrip } from "@/components/typography/DoubledCTAStrip";
import { OrderTriggerButton } from "@/components/sections/order-panel/OrderTriggerButton";

const CTA_ITEMS = [
  {
    text: "FUTURE OF FLAVOURS",
    fillColor: "brand-pink",
    shadowColor: "brand-red",
  },
  {
    text: "DIP IT. BITE IT. LOVE IT.",
    fillColor: "brand-white",
    shadowColor: "brand-pink",
  },
];

export function BigCTAStrip() {
  return (
    <section
      aria-labelledby="big-cta-heading"
      className="section-dark py-20 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <h2 id="big-cta-heading" className="sr-only">
          Order Wingers
        </h2>
        <DoubledCTAStrip items={CTA_ITEMS} className="py-0 px-0" />
        <div className="mt-10 md:mt-14 flex flex-col gap-4 sm:flex-row sm:items-center">
          <OrderTriggerButton variant="primary" size="lg">
            Order now
          </OrderTriggerButton>
          <BrandButton variant="secondary" size="lg" href="/locations">
            Find a location
          </BrandButton>
        </div>
      </div>
    </section>
  );
}
