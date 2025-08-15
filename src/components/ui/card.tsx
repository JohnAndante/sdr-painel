import * as React from "react"
import { cn } from "./utils"

// MD3 Card Base
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "elevated" | "filled" | "outlined"
    elevation?: 0 | 1 | 2 | 3 | 4 | 5
  }
>(({ className, variant = "elevated", elevation = 1, ...props }, ref) => {
  const elevationClass = elevation > 0 ? `md3-elevation-${elevation}` : "md3-elevation-0"
  
  const variantClasses = {
    elevated: `bg-card ${elevationClass}`,
    filled: "bg-muted",
    outlined: "border border-border bg-card"
  }

  return (
    <div
      ref={ref}
      className={cn(
        // MD3 Card base styles
        "rounded-xl transition-all duration-200",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  )
})
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      // MD3 spacing follows 16dp base
      "flex flex-col space-y-1.5 p-6",
      className
    )}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      // MD3 Title Medium - using CSS class
      "md3-title-medium text-foreground leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      // MD3 Body Medium - using CSS class
      "md3-body-medium text-muted-foreground",
      className
    )}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div 
    ref={ref} 
    className={cn(
      // MD3 content padding
      "p-6 pt-0", 
      className
    )} 
    {...props} 
  />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      // MD3 footer with actions
      "flex items-center p-6 pt-0 gap-2",
      className
    )}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }