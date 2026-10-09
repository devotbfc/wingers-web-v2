"use client";

interface TellMeWhenTheyDropButtonProps {
  label: string;
}

export function TellMeWhenTheyDropButton({
  label,
}: TellMeWhenTheyDropButtonProps) {
  function handleClick() {
    window.dispatchEvent(new CustomEvent("wingers:open-signup"));
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="mx-auto inline-flex min-h-11 items-center justify-center rounded-full bg-brand-white px-7 py-3 font-display text-sm font-extrabold uppercase tracking-[0.02em] text-brand-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-pink [@media(hover:hover)]:transition-colors [@media(hover:hover)]:duration-200 [@media(hover:hover)]:hover:bg-brand-pink"
    >
      {label}
    </button>
  );
}
