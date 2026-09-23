"use client";

export function CookieSettingsLink() {
  function handleClick() {
    try {
      window.localStorage.removeItem("wingers_consent");
    } catch {}
    window.location.reload();
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="cursor-pointer bg-transparent p-0 font-body text-xs text-brand-white/60 transition-colors hover:text-brand-pink"
    >
      Cookie settings
    </button>
  );
}
