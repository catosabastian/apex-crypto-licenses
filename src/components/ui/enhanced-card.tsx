
import * as React from "react"
import { cn } from "@/lib/utils"

const EnhancedCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "elevated" | "glass" | "gradient"
    size?: "sm" | "md" | "lg"
  }
>(({ className, variant = "default", size = "md", ...props }, ref) => {
  const variants = {
    default: "bg-card text-card-foreground border shadow-sm",
    elevated: "bg-card text-card-foreground border shadow-lg hover:shadow-xl transition-shadow",
    glass: "bg-card/80 backdrop-blur-sm text-card-foreground border border-white/20 shadow-lg",
    gradient: "bg-gradient-to-br from-card via-card/95 to-muted/50 text-card-foreground border shadow-lg"
  }
  
  const sizes = {
    sm: "p-4",
    md: "p-6", 
    lg: "p-8"
  }

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg transition-all duration-200",
        variants[variant],
        sizes[size],
        "min-h-0 flex flex-col", // Prevents content cut-off
        className
      )}
      {...props}
    />
  )
})
EnhancedCard.displayName = "EnhancedCard"

const EnhancedCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 flex-shrink-0", className)}
    {...props}
  />
))
EnhancedCardHeader.displayName = "EnhancedCardHeader"

const EnhancedCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    scrollable?: boolean
  }
>(({ className, scrollable = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex-1 min-h-0",
      scrollable && "overflow-y-auto",
      className
    )}
    {...props}
  />
))
EnhancedCardContent.displayName = "EnhancedCardContent"

const EnhancedCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center mt-auto pt-4 flex-shrink-0", className)}
    {...props}
  />
))
EnhancedCardFooter.displayName = "EnhancedCardFooter"

export { EnhancedCard, EnhancedCardHeader, EnhancedCardContent, EnhancedCardFooter }
