// Impact Analytics brand mark: two leaning triangular blades forming an abstract "A".
export function LogoMark({ size = 34, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <polygon points="19,3 4,37 18,37 26,15" fill="#2f6bff" />
      <polygon points="23,3 36,37 21,37 16,24" fill="#16235a" />
    </svg>
  )
}

// Full lockup: mark + stacked "IMPACT / ANALYTICS" wordmark, matching brand style.
export default function Logo({ markSize = 34, className = '' }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark size={markSize} />
      <span className="flex flex-col leading-none">
        <span className="text-lg font-extrabold tracking-tight text-slate-900">IMPACT</span>
        <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.32em] text-slate-500">
          Analytics
        </span>
      </span>
    </span>
  )
}
