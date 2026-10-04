type BucketIconProps = {
  width?: number;
  height?: number;
  className?: string;
  "aria-label": string;
};

// Multi-coloured bucket-of-chicken basket mark used in the /order NavBar.
// Fills and strokes are intentionally hardcoded: white body + eyeball
// highlights, #FF6FB5 vertical pink stripes, #E8A13F drumstick ellipses,
// #0A0A0A outlines. Do NOT swap for `currentColor` — the icon is multi-
// coloured by design and must read as a bucket regardless of surrounding
// text colour.
export function BucketIcon({
  width = 30,
  height = 30,
  className,
  "aria-label": ariaLabel,
}: BucketIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={width}
      height={height}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label={ariaLabel}
      className={className}
    >
      <g transform="rotate(-24 11 8)">
        <path d="M11 3.5v6" stroke="#0A0A0A" strokeWidth="1.6" />
        <circle cx="10" cy="2.6" r="1.4" fill="#fff" stroke="#0A0A0A" strokeWidth="1.3" />
        <circle cx="12" cy="2.6" r="1.4" fill="#fff" stroke="#0A0A0A" strokeWidth="1.3" />
        <ellipse cx="11" cy="10" rx="3.6" ry="4.2" fill="#E8A13F" stroke="#0A0A0A" strokeWidth="1.8" />
      </g>
      <g transform="rotate(22 21 8)">
        <path d="M21 3.5v6" stroke="#0A0A0A" strokeWidth="1.6" />
        <circle cx="20" cy="2.6" r="1.4" fill="#fff" stroke="#0A0A0A" strokeWidth="1.3" />
        <circle cx="22" cy="2.6" r="1.4" fill="#fff" stroke="#0A0A0A" strokeWidth="1.3" />
        <ellipse cx="21" cy="10" rx="3.6" ry="4.2" fill="#E8A13F" stroke="#0A0A0A" strokeWidth="1.8" />
      </g>
      <path
        d="M5.5 12.5h21l-2 15a1.6 1.6 0 0 1-1.6 1.4H9.1a1.6 1.6 0 0 1-1.6-1.4z"
        fill="#fff"
      />
      <path
        d="M11.5 13.5v14.6M20.5 13.5v14.6"
        stroke="#FF6FB5"
        strokeWidth="3"
        strokeLinecap="butt"
      />
      <path
        d="M5.5 12.5h21l-2 15a1.6 1.6 0 0 1-1.6 1.4H9.1a1.6 1.6 0 0 1-1.6-1.4z"
        stroke="#0A0A0A"
        strokeWidth="2.2"
      />
    </svg>
  );
}
