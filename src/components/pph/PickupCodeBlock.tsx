"use client";

type Props = {
  code: string;
  label?: string;
  hint?: string;
};

export function PickupCodeBlock({
  code,
  label = "Your collection code",
  hint = "Show or say this at the counter.",
}: Props) {
  return (
    <div className="rounded-md border border-yellow-400 bg-brand-black p-4 text-center text-brand-white">
      <div className="text-xs uppercase tracking-wider text-yellow-300">{label}</div>
      <div className="my-1 font-display text-[44px] font-extrabold leading-none tracking-tight text-yellow-300">
        {code}
      </div>
      <div className="text-xs text-white/70">{hint}</div>
    </div>
  );
}
