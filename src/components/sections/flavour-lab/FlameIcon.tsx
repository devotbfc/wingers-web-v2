interface FlameIconProps {
  filled?: boolean;
  className?: string;
}

export function FlameIcon({ filled = true, className }: FlameIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M12 2.5c-.6 1.7-1.9 3-3 4.4-1.4 1.9-2.5 3.9-2.5 6.2 0 .9.5 1.6 1.2 1.9-.1-.6.1-1.3.6-1.9.9-1.1 1.5-1.7 1.7-2.9.4.9.8 1.8 1.6 2.5 1 .9 2.2 1.6 3.1 2.7.9 1.2 1.3 2.5 1.3 3.9 0 2.7-2.4 4.7-5 4.7s-5-2-5-4.7c0-1.6.6-3 1.4-4.3-1.1-1-1.9-2.4-1.9-4C5.5 8.5 8.8 5.6 12 2.5Z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={filled ? 0 : 1.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

interface HeatFlamesProps {
  heat: number;
  className?: string;
  size?: "sm" | "md";
}

export function HeatFlames({ heat, className, size = "sm" }: HeatFlamesProps) {
  const dim = size === "sm" ? "h-3.5 w-3.5" : "h-5 w-5";
  return (
    <span
      className={`inline-flex items-center gap-0.5 text-brand-red ${className ?? ""}`}
      aria-label={heat === 0 ? "No heat" : `Heat ${heat} of 5`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <FlameIcon
          key={i}
          filled={i < heat}
          className={`${dim} ${
            i < heat
              ? "text-brand-red drop-shadow-[0_0_4px_rgba(255,45,45,0.7)]"
              : "text-brand-white/25"
          }`}
        />
      ))}
    </span>
  );
}
