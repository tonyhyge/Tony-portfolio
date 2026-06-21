import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        secondary:
          "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
        destructive:
          "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
        outline:
          "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        ghost:
          "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      statusColor: {
        "in-progress":
          "bg-[oklch(0.72_0.15_72/0.15)] text-[oklch(0.5_0.15_72)] dark:bg-[oklch(0.72_0.12_72/0.2)] dark:text-[oklch(0.82_0.14_72)]",
        submitted:
          "bg-[oklch(0.55_0.14_250/0.15)] text-[oklch(0.38_0.14_250)] dark:bg-[oklch(0.6_0.12_250/0.2)] dark:text-[oklch(0.78_0.12_250)]",
        published:
          "bg-[oklch(0.58_0.17_145/0.15)] text-[oklch(0.38_0.17_145)] dark:bg-[oklch(0.62_0.14_145/0.2)] dark:text-[oklch(0.78_0.14_145)]",
        accepted:
          "bg-[oklch(0.52_0.16_290/0.15)] text-[oklch(0.38_0.16_290)] dark:bg-[oklch(0.58_0.14_290/0.2)] dark:text-[oklch(0.78_0.14_290)]",
      },
      skillColor: {
        cyan: "bg-[oklch(0.78_0.12_200/0.12)] text-[oklch(0.55_0.15_200)] dark:bg-[oklch(0.78_0.12_200/0.18)] dark:text-[oklch(0.72_0.14_200)]",
        violet:
          "bg-[oklch(0.82_0.12_290/0.12)] text-[oklch(0.55_0.18_290)] dark:bg-[oklch(0.82_0.12_290/0.18)] dark:text-[oklch(0.68_0.16_290)]",
        amber:
          "bg-[oklch(0.85_0.14_80/0.12)] text-[oklch(0.65_0.18_80)] dark:bg-[oklch(0.85_0.14_80/0.18)] dark:text-[oklch(0.78_0.16_80)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  statusColor,
  skillColor,
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(
          badgeVariants({ variant, statusColor, skillColor }),
          className
        ),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
