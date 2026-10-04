"use client";

type Props = {
  code: string;
  label?: string;
  hint?: string;
};

// Port of wing-app/src/components/OrderStatusCard.tsx pickup-code block:
// bordered gold on dark, 44px gold display font.
export function PickupCodeBlock({
  code,
  label = "Your collection code",
  hint = "Show or say this at the counter.",
}: Props) {
  return (
    <div className="rounded-[16px] border-2 border-pph-gold bg-pph-surface px-4 py-4 text-center">
      <div className="font-display text-[11px] uppercase tracking-widest text-pph-muted">
        {label}
      </div>
      <div className="mt-1 font-display text-[44px] leading-none text-pph-gold">{code}</div>
      <div className="mt-1 font-body text-[12px] text-pph-muted">{hint}</div>
    </div>
  );
}
