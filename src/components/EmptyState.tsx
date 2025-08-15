'use client'

import React from 'react'
import { Button } from './ui/button'
import { FileX, Plus } from 'lucide-react'

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  darkMode?: boolean
}

const MD3_TOKENS = {
  light: {
    'sys/surface': '#FFFFFF',
    'sys/on-surface': '#100E34',
    'sys/surface-variant': '#F5F6FB',
    'sys/on-surface-variant': '#3F4151',
    'sys/primary': '#4F48EC',
    'sys/on-primary': '#FFFFFF',
    'sys/outline': '#C7CAD6'
  },
  dark: {
    'dark/surface': '#0E0D18',
    'dark/on-surface': '#E3E5F0',
    'dark/surface-variant': '#2B2D3A',
    'dark/outline': '#8B8FA1',
    'dark/primary': '#BFC2FF',
    'dark/on-primary': '#100E34'
  }
}

export default function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  darkMode = false
}: EmptyStateProps) {
  const colors = darkMode ? MD3_TOKENS.dark : MD3_TOKENS.light
  const surfaceColor = darkMode ? colors['dark/surface'] : colors['sys/surface']
  const onSurfaceColor = darkMode ? colors['dark/on-surface'] : colors['sys/on-surface']
  const onSurfaceVariantColor = darkMode ? colors['dark/outline'] : colors['sys/on-surface-variant']
  const primaryColor = darkMode ? colors['dark/primary'] : colors['sys/primary']
  const onPrimaryColor = darkMode ? colors['dark/on-primary'] : colors['sys/on-primary']
  const outlineColor = darkMode ? colors['dark/outline'] : colors['sys/outline']

  const defaultIcon = (
    <FileX 
      className="w-12 h-12"
      style={{ color: onSurfaceVariantColor }}
    />
  )

  return (
    <div 
      className="flex flex-col items-center justify-center text-center p-12 rounded-lg border"
      style={{
        backgroundColor: surfaceColor,
        border: `1px solid ${outlineColor}`,
        borderRadius: '12px',
        fontFamily: 'Roboto Flex, Roboto, sans-serif',
        minHeight: '300px'
      }}
    >
      {/* Icon */}
      <div className="mb-6">
        {icon || defaultIcon}
      </div>

      {/* Title */}
      <h3 
        className="mb-3"
        style={{
          fontSize: '22px',
          lineHeight: '28px',
          fontWeight: '500',
          color: onSurfaceColor
        }}
      >
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p 
          className="mb-6 max-w-md"
          style={{
            fontSize: '16px',
            lineHeight: '24px',
            fontWeight: '400',
            color: onSurfaceVariantColor
          }}
        >
          {description}
        </p>
      )}

      {/* Action Button */}
      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          className="px-6 py-3"
          style={{
            backgroundColor: primaryColor,
            color: onPrimaryColor,
            borderRadius: '12px',
            fontSize: '16px',
            lineHeight: '24px',
            fontWeight: '500',
            minHeight: '48px',
            border: 'none'
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          {actionLabel}
        </Button>
      )}
    </div>
  )
}