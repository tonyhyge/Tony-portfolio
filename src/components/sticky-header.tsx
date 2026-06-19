import { cn } from "@/lib/utils";

interface StickyHeaderProps extends React.ComponentProps<"header"> {}

export function StickyHeader({ className, children, ...props }: StickyHeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full",
        "bg-background/80 backdrop-blur-md",
        "border-b border-border/50",
        className
      )}
      {...props}
    >
      {children}
    </header>
  );
}
