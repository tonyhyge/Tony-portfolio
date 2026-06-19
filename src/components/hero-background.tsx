import { cn } from "@/lib/utils";

interface HeroBackgroundProps extends React.ComponentProps<"div"> {}

export function HeroBackground({ className, ...props }: HeroBackgroundProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 -z-10",
        "bg-[oklch(0.15_0.05_240)]",
        "bg-[length:400%_400%]",
        "animate-gradient-shift",
        "motion-reduce:animate-none",
        className
      )}
      style={{
        backgroundImage:
          "linear-gradient(135deg, oklch(0.65 0.18 210), oklch(0.55 0.15 280), oklch(0.45 0.12 240))",
      }}
      aria-hidden="true"
      {...props}
    />
  );
}
