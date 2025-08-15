import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "./utils"

const buttonVariants = cva(
  // Base button styles with Poppins font
  "md3-state-layer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        // Primary Button with gradient
        default: "gradient-primary text-white hover:shadow-md active:shadow-sm disabled:opacity-50 border-0",

        // Secondary Button with gradient
        secondary: "gradient-secondary text-white hover:shadow-md active:shadow-sm disabled:opacity-50 border-0",

        // Outlined Button
        outline: "border border-outline-variant text-primary bg-transparent hover:bg-primary/8 active:bg-primary/12 disabled:opacity-50",

        // Text Button
        ghost: "text-primary bg-transparent hover:bg-primary/10 active:bg-primary/15 disabled:opacity-50",

        // Tonal Button
        tonal: "bg-primary-container text-on-primary-container hover:shadow-sm disabled:opacity-50",

        // Error Button
        destructive: "bg-error text-on-error hover:shadow-sm disabled:opacity-50",

        // Link style
        link: "text-primary underline-offset-4 hover:underline bg-transparent p-0 h-auto disabled:opacity-50",
      },
      size: {
        // MD3 standard button height is 40dp
        default: "h-10 px-6 py-2 text-sm font-semibold",
        sm: "h-9 px-4 py-1.5 text-xs font-semibold",
        lg: "h-12 px-8 py-3 text-sm font-semibold",
        icon: "h-10 w-10 p-0",
        "icon-sm": "h-8 w-8 p-0",
        "icon-lg": "h-12 w-12 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
  gradient?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, gradient = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    // Add gradient class if specified
    const gradientClass = gradient && variant === "default" ? "gradient-primary" :
      gradient && variant === "secondary" ? "gradient-secondary" : "";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), gradientClass, className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
