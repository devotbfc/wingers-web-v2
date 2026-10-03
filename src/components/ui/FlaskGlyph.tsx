export function FlaskGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M15 5h10v2h-1v9.5l7.5 13A3.5 3.5 0 0 1 28.4 35H11.6a3.5 3.5 0 0 1-3.1-5.5L16 16.5V7h-1V5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinejoin="round"
      />
      <circle cx="17" cy="26" r="1.5" fill="currentColor" />
      <circle cx="23" cy="29" r="1" fill="currentColor" />
    </svg>
  );
}
