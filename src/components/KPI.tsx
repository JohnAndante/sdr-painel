'use client'

import React from 'react'
import { Card, CardContent } from './ui/card'
import { cn } from './ui/utils'
import { useColors } from '@/contexts/ThemeContext'

interface KPIProps {
  label: string
  value: string
  subinfo?: string
  icon?: React.ReactNode
  state: 'default' | 'good' | 'alert' | 'warning'
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
  variant = 'elevated',
  size = 'default',
  gradient = false
}: KPIProps) {

  const colors = useColors()

  // Custom color mapping based on state using centralized theme
  const getStateColors = () => {
    const stateMap = {
      default: {
        iconColor: colors.onSurfaceVariant,
        valueColor: colors.onSurface,
        labelColor: colors.onSurfaceVariant,
        subinfoColor: colors.onSurfaceVariant,
        bgColor: colors.surfaceContainer
      },
      good: {
        iconColor: colors.primary,
        valueColor: colors.primary,
        labelColor: colors.onSurfaceVariant,
        subinfoColor: colors.onSurfaceVariant,
        bgColor: colors.surfaceContainer
      },
      alert: {
        iconColor: colors.error,
        valueColor: colors.error,
        labelColor: colors.onSurfaceVariant,
        subinfoColor: colors.onSurfaceVariant,
        bgColor: colors.surfaceContainer
      },
      warning: {
        iconColor: colors.secondary,
        valueColor: colors.secondary,
        labelColor: colors.onSurfaceVariant,
        subinfoColor: colors.onSurfaceVariant,
        bgColor: colors.surfaceContainer
      }
    }
    return stateMap[state]
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

  return (
    <Card
      variant={variant}
      elevation={variant === 'elevated' ? 1 : 0}
      className={cn(
        "transition-all duration-200 hover:shadow-md group overflow-hidden",
        gradient && (state === 'good' ? 'gradient-primary' : state === 'warning' ? 'gradient-secondary' : state === 'alert' ? 'gradient-error' : 'gradient-surface')
      )}
      style={!gradient ? { backgroundColor: stateColors.bgColor } : undefined}
    >
      <CardContent className={cn("space-y-4 relative z-10", sizeClasses[size])}>
        {/* Header with icon and label */}
        <div className="flex items-center gap-3">
          {icon && (
            <div
              className="flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0"
              style={{
                backgroundColor: gradient ? 'rgba(255, 255, 255, 0.2)' : colors.surfaceVariant,
                color: gradient ? '#FFFFFF' : stateColors.iconColor
              }}
            >
              {icon}
            </div>
          )}
          <span
            className="md3-label-large font-semibold"
            style={{
              color: gradient ? '#FFFFFF' : stateColors.labelColor
            }}
          >
            {label}
          </span>
        </div>

        {/* Content aligned with label text */}
        <div className={cn("space-y-2", icon ? "ml-[52px]" : "ml-0")}>
          {/* Main value */}
          <div
            className={cn(
              "font-semibold tracking-tight leading-none",
              valueSizeClasses[size]
            )}
            style={{
              color: gradient ? '#FFFFFF' : stateColors.valueColor
            }}
          >
            {value}
          </div>

          {/* Supporting information */}
          {subinfo && (
            <div
              className="md3-body-small font-medium"
              style={{
                color: gradient ? 'rgba(255, 255, 255, 0.8)' : stateColors.subinfoColor
              }}
            >
              {subinfo}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
