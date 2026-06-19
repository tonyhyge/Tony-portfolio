import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroCtas() {
  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex flex-wrap gap-4">
        <Button
          variant="default"
          size="lg"
          render={<a href="#experience" />}
          nativeButton={false}
        >
          View Projects
        </Button>
        <Button
          variant="outline"
          size="lg"
          render={<a href="#contact" />}
          nativeButton={false}
        >
          Contact Me
        </Button>
      </div>
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-accent focus-visible:outline-none focus-visible:underline"
      >
        <Download className="size-4 transition-transform group-hover:-translate-y-0.5 group-focus-visible:-translate-y-0.5" />
        Download CV
      </a>
    </div>
  );
}
