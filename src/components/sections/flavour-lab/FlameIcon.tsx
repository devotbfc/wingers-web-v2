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
        d="M12 2c1.5 3 4 4.5 4 8a4 4 0 1 1-8 0c0-1.6.8-2.4 1.4-3.2C10.4 5.4 11 4 12 2Zm-1 12a2 2 0 1 0 2 2 2 2 0 0 0-2-2Z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={filled ? 0 : 1.5}
        strokeLinejoin="round"
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
          className={`${dim} ${i < heat ? "text-brand-red" : "text-brand-black/25"}`}
        />
      ))}
    </span>
  );
}
