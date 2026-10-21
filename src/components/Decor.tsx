/** بخار قهوة متصاعد — SVG متحرك بـ CSS */
export function Steam({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 140" fill="none" aria-hidden="true">
      <path
        className="steam-line steam-line--1"
        d="M30 132 C14 112 46 98 30 76 C16 57 44 40 34 18"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        className="steam-line steam-line--2"
        d="M62 140 C46 118 80 104 64 82 C50 62 78 44 66 20"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        className="steam-line steam-line--3"
        d="M94 130 C80 110 108 94 94 74 C82 56 104 40 96 22"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** نجمة ثمانية زخرفية مستوحاة من الفنون العربية */
export function StarEight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path
        d="M24 2 L29.5 18.5 L46 24 L29.5 29.5 L24 46 L18.5 29.5 L2 24 L18.5 18.5 Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="24" r="3.2" fill="currentColor" />
    </svg>
  );
}
