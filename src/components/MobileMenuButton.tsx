'use client'

import React from 'react'
import { Button } from './ui/button'
import { Menu } from 'lucide-react'
import { cn } from './ui/utils'

interface MobileMenuButtonProps {
    onClick: () => void
    className?: string
}

export default function MobileMenuButton({ onClick, className }: MobileMenuButtonProps) {
    return (
        <Button
            variant="default"
            size="icon"
            onClick={onClick}
            className={cn(
                // Fixed position floating button with better positioning
                "fixed top-6 left-6 z-50 lg:hidden",
                "h-14 w-14 rounded-full shadow-lg md3-elevation-3",
                "bg-primary text-on-primary hover:bg-primary/90 active:bg-primary/80",
                "transition-all duration-200 md3-state-layer",
                // Ensure it's accessible and has proper focus
                "focus-visible:ring-2 focus-visible:ring-primary-container focus-visible:ring-offset-2",
                className
            )}
            aria-label="Abrir menu de navegação"
            title="Abrir menu"
        >
            <Menu className="h-6 w-6" />
        </Button>
    )
}
