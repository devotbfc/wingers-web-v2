"use client";

type Props = {
  code: string;
  label?: string;
  hint?: string;
};

// Deliberate dark-ticket carve-out inside the otherwise light /order flow
// (ADR-019 amendment, 2026-10-04). Gold on white fails WCAG; the dark
// receipt-ticket keeps the 44px gold code and gold border high-contrast and
// legible across the status card, receipt, and confirm sheet.
export function PickupCodeBlock({
  code,
  label = "Your collection code",
  hint = "Show or say this at the counter.",
}: Props) {
  return (
    <div className="rounded-[16px] border-2 border-pph-gold bg-[#0A0A0A] px-4 py-4 text-center">
      <div className="font-display text-[11px] uppercase tracking-widest text-white/60">
        {label}
      </div>
      <div className="mt-1 font-display text-[44px] leading-none text-pph-gold">{code}</div>
      <div className="mt-1 font-body text-[12px] text-white/60">{hint}</div>
    </div>
  );
}
