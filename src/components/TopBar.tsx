'use client'
import { Button } from './ui/button'
import { Menu } from 'lucide-react'
import { cn } from './ui/utils'

interface TopBarProps {
  isMobile: boolean
  onMenuToggle: () => void
}

export default function TopBar({
  isMobile,
  onMenuToggle
}: TopBarProps) {


  return (
    <header
      className={cn(
        // Custom Top App Bar with new colors
        "flex items-center justify-between",
        "h-16 px-4 lg:px-6", // MD3 standard height 64dp
        "bg-[--md-sys-color-surface] md3-elevation-0 border-b border-[--md-sys-color-outline-variant]",
        "flex-shrink-0 transition-all duration-200"
      )}
    >
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button - Custom styling */}
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            className={cn(
              "lg:hidden md3-state-layer",
              "h-12 w-12 rounded-full", // MD3 48dp touch target
              "text-[--md-sys-color-on-surface] hover:bg-[--md-sys-color-on-surface]/8 active:bg-[--md-sys-color-on-surface]/12"
            )}
          >
            <Menu className="h-6 w-6" />
          </Button>
        )}
      </div>
    </header>
  )
}
