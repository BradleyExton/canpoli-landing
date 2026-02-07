interface IconProps {
  className?: string;
}

export function IconLookup({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <circle cx="20" cy="20" r="12" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <path d="M28.5 28.5 L38 38" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <circle cx="20" cy="20" r="4" fill="currentColor" />
    </svg>
  );
}

export function IconRepresentatives({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <circle cx="16" cy="18" r="6" fill="currentColor" />
      <circle cx="32" cy="18" r="6" fill="currentColor" opacity="0.7" />
      <path
        d="M8 38c0-6 4-10 8-10s8 4 8 10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M24 38c0-6 4-10 8-10s8 4 8 10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}

export function IconRidings({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        d="M10 12 L24 6 L38 12 L38 36 L24 42 L10 36 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M24 6 V42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M10 24 H38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconParties({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        d="M12 34 V14"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M14 14 C24 10, 28 18, 36 14 V26 C28 30, 24 22, 14 26 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="36" r="3" fill="currentColor" />
    </svg>
  );
}
