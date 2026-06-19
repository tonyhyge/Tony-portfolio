import { cn } from "@/lib/utils";

interface HexagonBadgeProps {
  /** Image source — when provided, renders an <img> clipped to hexagon instead of decorative SVG */
  src?: string;
  /** Alt text for the image (required when src is provided) */
  alt?: string;
  className?: string;
}

export function HexagonBadge({
  src,
  alt = "",
  className,
}: HexagonBadgeProps) {
  const isDecorative = !src;

  return (
    <div
      className={cn(
        "relative shrink-0 size-[64px] md:size-[120px]",
        className
      )}
      aria-hidden={isDecorative || undefined}
    >
      {/* Outer hexagon clip container */}
      <div
        className="size-full"
        style={{
          clipPath:
            "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        }}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            className="size-full object-cover"
            style={{
              clipPath:
                "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            }}
          />
        ) : (
          /* Decorative SVG hexagon with gradient stroke */
          <svg
            viewBox="0 0 120 120"
            className="size-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Glow filter */}
            <defs>
              <filter id="hex-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="hex-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--accent)" />
                <stop offset="100%" stopColor="var(--accent-secondary)" />
              </linearGradient>
            </defs>
            {/* Subtle fill for visibility on dark bg */}
            <polygon
              points="60,5 115,32.5 115,87.5 60,115 5,87.5 5,32.5"
              fill="var(--color-card)"
              fillOpacity="0.6"
              stroke="url(#hex-stroke)"
              strokeWidth="2.5"
              filter="url(#hex-glow)"
            />
          </svg>
        )}
      </div>
    </div>
  );
}
