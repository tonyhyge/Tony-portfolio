import { cn } from "@/lib/utils";
import { Container } from "./container";

interface SectionProps extends React.ComponentProps<"section"> {
  id: string;
  title?: string;
  subtitle?: string;
}

export function Section({ id, title, subtitle, className, children, ...props }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("py-16 md:py-24", className)}
      aria-labelledby={title ? `${id}-heading` : undefined}
      {...props}
    >
      <Container>
        {title && (
          <div className="mb-10 md:mb-14">
            <h2
              id={`${id}-heading`}
              className="font-heading text-3xl font-semibold tracking-tight md:text-4xl"
            >
              {title}
            </h2>
            {subtitle && (
              <p className="mt-2 text-base text-muted-foreground">{subtitle}</p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
