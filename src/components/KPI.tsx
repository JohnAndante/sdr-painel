'use client'

import React from 'react'
import { Card, CardContent } from './ui/card'
import { cn } from './ui/utils'

interface KPIProps {
  label: string
  value: string
  subinfo?: string
  icon?: React.ReactNode
  state: 'default' | 'good' | 'alert' | 'warning'
  darkMode: boolean
  variant?: 'elevated' | 'filled' | 'outlined'
  size?: 'default' | 'compact' | 'large'
  gradient?: boolean
}

export default function KPI({ 
  label, 
  value, 
  subinfo, 
  icon, 
  state = 'default', 
  darkMode,
  variant = 'elevated',
  size = 'default',
  gradient = false
}: KPIProps) {
  
  // Custom color mapping based on state using new palette
  const getStateColors = () => {
    const colors = {
      default: {
        icon: 'text-[--md-sys-color-on-surface-variant]',
        value: 'text-[--md-sys-color-on-surface]',
        label: 'text-[--md-sys-color-on-surface-variant]',
        subinfo: 'text-[--md-sys-color-on-surface-variant]',
        bg: gradient ? 'gradient-surface' : 'bg-[--md-sys-color-surface-container]'
      },
      good: {
        icon: 'text-[--md-sys-color-primary]',
        value: 'text-[--md-sys-color-primary]',
        label: 'text-[--md-sys-color-on-surface-variant]',
        subinfo: 'text-[--md-sys-color-primary]/70',
        bg: gradient ? 'gradient-primary' : 'bg-[--md-sys-color-primary-container]'
      },
      alert: {
        icon: 'text-[--md-sys-color-error]',
        value: 'text-[--md-sys-color-error]',
        label: 'text-[--md-sys-color-on-surface-variant]',
        subinfo: 'text-[--md-sys-color-error]/70',
        bg: gradient ? 'gradient-error' : 'bg-[--md-sys-color-error-container]'
      },
      warning: {
        icon: 'text-[--md-sys-color-secondary]',
        value: 'text-[--md-sys-color-secondary]',
        label: 'text-[--md-sys-color-on-surface-variant]',
        subinfo: 'text-[--md-sys-color-secondary]/70',
        bg: gradient ? 'gradient-secondary' : 'bg-[--md-sys-color-secondary-container]'
      }
    }
    return colors[state]
  }

  const stateColors = getStateColors()
  
  const sizeClasses = {
    compact: 'p-4',
    default: 'p-6',
    large: 'p-8'
  }

  const valueSizeClasses = {
    compact: 'md3-title-large',
    default: 'md3-headline-small',
    large: 'md3-headline-medium'
  }

  // Adjust text colors for gradient backgrounds
  const textColorOverride = gradient && (state === 'good' || state === 'warning') ? 'text-white' : '';

  return (
    <Card 
      variant={variant}
      elevation={variant === 'elevated' ? 1 : 0}
      className={cn(
        "transition-all duration-200 hover:shadow-md group overflow-hidden",
        "md3-state-layer",
        gradient && stateColors.bg
      )}
    >
      <CardContent className={cn("space-y-3 relative z-10", sizeClasses[size])}>
        {/* Header with icon and label */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {icon && (
              <div className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full",
                gradient ? "bg-white/20" : "bg-[--md-sys-color-surface-variant]",
                textColorOverride || stateColors.icon
              )}>
                {icon}
              </div>
            )}
            <span className={cn(
              "md3-label-large font-semibold",
              textColorOverride || stateColors.label
            )}>
              {label}
            </span>
          </div>
        </div>

        {/* Main value */}
        <div className={cn(
          "font-semibold tracking-tight",
          valueSizeClasses[size],
          textColorOverride || stateColors.value
        )}>
          {value}
        </div>

        {/* Supporting information */}
        {subinfo && (
          <div className={cn(
            "md3-body-small font-medium",
            textColorOverride ? 'text-white/80' : stateColors.subinfo
          )}>
            {subinfo}
          </div>
        )}
      </CardContent>
    </Card>
  )
}