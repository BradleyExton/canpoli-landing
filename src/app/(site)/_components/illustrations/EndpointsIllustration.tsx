export function EndpointsIllustration() {
  return (
    <svg viewBox="0 0 600 220" className="w-full h-auto" aria-hidden="true">
      <path
        d="M20 60 C140 10, 240 20, 340 60"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeOpacity="0.25"
      />
      <path
        d="M60 90 C180 40, 300 50, 420 90"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeOpacity="0.2"
      />
      <path
        d="M120 120 C220 90, 360 90, 500 130"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeOpacity="0.2"
      />

      <g transform="translate(130 70)">
        <rect x="0" y="70" width="300" height="50" rx="8" fill="currentColor" opacity="0.16" />
        <rect x="20" y="55" width="260" height="70" rx="10" fill="currentColor" opacity="0.24" />
        <rect x="40" y="40" width="220" height="90" rx="10" fill="currentColor" opacity="0.35" />
        <rect x="120" y="10" width="60" height="80" rx="10" fill="currentColor" opacity="0.45" />
        <rect x="135" y="-10" width="30" height="25" rx="6" fill="currentColor" opacity="0.5" />
        <circle cx="150" cy="-18" r="6" fill="currentColor" opacity="0.8" />
        <rect x="70" y="70" width="30" height="40" rx="6" fill="#FAF6F0" opacity="0.75" />
        <rect x="120" y="70" width="30" height="40" rx="6" fill="#FAF6F0" opacity="0.75" />
        <rect x="170" y="70" width="30" height="40" rx="6" fill="#FAF6F0" opacity="0.75" />
      </g>
    </svg>
  );
}
