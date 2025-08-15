import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "./utils"

const badgeVariants = cva(
  // MD3 Chip/Badge base styles using standard Tailwind classes
  "inline-flex items-center gap-1 rounded-lg border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        // MD3 Assist Chip (default)
        default: "border-border bg-transparent text-foreground hover:bg-foreground/8",
        
        // MD3 Suggestion Chip
        secondary: "border-border bg-secondary text-secondary-foreground hover:bg-secondary-foreground/8",
        
        // MD3 Filter Chip (selected state)
        tertiary: "border-border bg-accent text-accent-foreground hover:bg-accent-foreground/8",
        
        // MD3 Input Chip
        outline: "border-border bg-transparent text-foreground hover:bg-foreground/8",
        
        // MD3 Error state
        destructive: "border-destructive bg-destructive/10 text-destructive hover:bg-destructive/20",
        
        // Filled variants
        filled: "border-transparent bg-primary text-primary-foreground hover:bg-primary/90",
        "filled-secondary": "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/90",
        "filled-tertiary": "border-transparent bg-accent text-accent-foreground hover:bg-accent/90",
      },
      size: {
        default: "h-6 text-xs",
        sm: "h-5 text-xs px-2",
        lg: "h-8 text-sm px-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div 
      className={cn(badgeVariants({ variant, size }), className)} 
      {...props} 
    />
  )
}

export { Badge, badgeVariants }