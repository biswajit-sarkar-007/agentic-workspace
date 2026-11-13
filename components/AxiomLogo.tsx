import React from "react";

/**
 * AxiomGlyph - Precision geometric monogram forming an angular "A" with
 * 1px hairline edges and the signature Linear lavender-blue accent (#5e6ad2).
 */
export function AxiomGlyph({
  className = "size-5",
  accentColor = "#5e6ad2",
}: {
  className?: string;
  accentColor?: string;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect
        width="32"
        height="32"
        rx="8"
        fill="#08090a"
        stroke="#23252a"
        strokeWidth="1"
      />
      {/* Outer precision triangle frame */}
      <path
        d="M16 6.5L25.5 24H6.5L16 6.5Z"
        stroke="#31353d"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      {/* Inner geometric core */}
      <path
        d="M16 11.5L21.5 21.5H10.5L16 11.5Z"
        fill="#121316"
        stroke="#23252a"
        strokeWidth="1"
      />
      {/* Signature Linear Lavender accent cross-axis */}
      <path
        d="M11 19.5H21"
        stroke={accentColor}
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      {/* Precision apex indicator */}
      <circle cx="16" cy="7" r="1.2" fill={accentColor} />
    </svg>
  );
}

/**
 * AxiomLogo - Wordmark pairing the precision glyph with crisp, tracking-wide display typography.
 */
export function AxiomLogo({
  className = "h-7 w-auto",
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <AxiomGlyph className="size-6 shrink-0" />
      {showWordmark && (
        <span className="text-[15px] font-semibold tracking-[0.14em] uppercase text-[#f7f8f8]">
          Axiom
        </span>
      )}
    </div>
  );
}

