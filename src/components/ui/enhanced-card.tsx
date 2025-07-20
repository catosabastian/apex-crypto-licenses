
import * as React from "react"
import { cn } from "@/lib/utils"

const EnhancedCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: 'default' | 'glass' | 'gradient' | 'elevated'
    hover?: boolean
  }
>(({ className, variant = 'default', hover = true, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow-sm transition-all duration-300",
      "overflow-visible", // Ensure content is never cut off
      "h-full flex flex-col", // Ensure full height and flex layout
      {
        'default': "border-border",
        'glass': "glass-card border-border/50 backdrop-blur-sm",
        'gradient': "bg-gradient-to-br from-card via-card to-accent/5 border-primary/20",
        'elevated': "shadow-lg border-border/50"
      }[variant],
      hover && "hover:shadow-xl hover:scale-[1.02] hover:border-primary/30",
      className
    )}
    {...props}
  />
))
EnhancedCard.displayName = "EnhancedCard"

const EnhancedCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col space-y-1.5 p-6 pb-4",
      "flex-shrink-0", // Prevent header from shrinking
      "overflow-visible", // Ensure header content is visible
      className
    )}
    {...props}
  />
))
EnhancedCardHeader.displayName = "EnhancedCardHeader"

const EnhancedCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement> & {
    gradient?: boolean
  }
>(({ className, gradient = false, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-semibold leading-none tracking-tight",
      "text-lg sm:text-xl", // Responsive text sizing
      "break-words hyphens-auto overflow-visible", // Prevent text overflow
      "min-h-fit", // Allow natural height
      gradient ? "gradient-text bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent" : "",
      className
    )}
    {...props}
  />
))
EnhancedCardTitle.displayName = "EnhancedCardTitle"

const EnhancedCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-sm text-muted-foreground leading-relaxed",
      "break-words hyphens-auto overflow-visible", // Prevent text overflow
      "min-h-fit", // Allow natural height
      className
    )}
    {...props}
  />
))
EnhancedCardDescription.displayName = "EnhancedCardDescription"

const EnhancedCardContent = React.forwardRef<
  HTMLDivContainer,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "p-6 pt-0 space-y-4",
      "flex-1 flex flex-col", // Take remaining space and use flex
      "overflow-visible", // Ensure content is never clipped
      "min-h-0", // Allow content to shrink if needed
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
    className={cn(
      "flex items-center p-6 pt-0",
      "mt-auto flex-shrink-0", // Push to bottom and prevent shrinking
      "overflow-visible", // Ensure footer content is visible
      className
    )}
    {...props}
  />
))
EnhancedCardFooter.displayName = "EnhancedCardFooter"

export { 
  EnhancedCard, 
  EnhancedCardHeader, 
  EnhancedCardFooter, 
  EnhancedCardTitle, 
  EnhancedCardDescription, 
  EnhancedCardContent 
}
