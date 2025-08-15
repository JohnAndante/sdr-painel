import * as React from "react"
import { cn } from "./utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "outlined" | "filled"
  error?: boolean
  supportingText?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant = "outlined", error = false, supportingText, ...props }, ref) => {
    const variantClasses = {
      outlined: cn(
        // MD3 Outlined Text Field
        "border border-border bg-transparent",
        "focus:border-primary focus:border-2 focus:ring-0",
        error && "border-destructive focus:border-destructive",
        "hover:border-foreground"
      ),
      filled: cn(
        // MD3 Filled Text Field
        "border-0 border-b border-muted-foreground bg-muted",
        "focus:border-b-2 focus:border-primary focus:ring-0",
        error && "border-destructive focus:border-destructive",
        "hover:bg-muted/80"
      )
    }

    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            // MD3 Text Field base styles
            "flex h-12 w-full rounded-md px-3 py-2 text-base text-foreground",
            "placeholder:text-muted-foreground/60",
            "focus-visible:outline-none",
            "disabled:cursor-not-allowed disabled:opacity-[0.38]",
            "transition-all duration-200",
            variantClasses[variant],
            className
          )}
          ref={ref}
          {...props}
        />
        
        {/* Supporting text */}
        {supportingText && (
          <div className={cn(
            "mt-1 px-3 text-xs",
            error ? "text-destructive" : "text-muted-foreground"
          )}>
            {supportingText}
          </div>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }