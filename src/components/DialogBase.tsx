'use client'

import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { X } from 'lucide-react'

interface DialogBaseProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  children: React.ReactNode
  actions?: React.ReactNode
  maxWidth?: string
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

export default function DialogBase({
  open,
  onOpenChange,
  title,
  description,
  children,
  actions,
  maxWidth = '500px',
  darkMode = false
}: DialogBaseProps) {
  const colors = darkMode ? MD3_TOKENS.dark : MD3_TOKENS.light
  const surfaceColor = darkMode ? colors['dark/surface'] : colors['sys/surface']
  const onSurfaceColor = darkMode ? colors['dark/on-surface'] : colors['sys/on-surface']
  const onSurfaceVariantColor = darkMode ? colors['dark/outline'] : colors['sys/on-surface-variant']
  const outlineColor = darkMode ? colors['dark/outline'] : colors['sys/outline']

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="p-0 gap-0"
        style={{
          backgroundColor: surfaceColor,
          border: `1px solid ${outlineColor}`,
          borderRadius: '28px', // radius/xl
          maxWidth: maxWidth,
          fontFamily: 'Roboto Flex, Roboto, sans-serif',
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)' // elevation/e4
        }}
      >
        {/* Header */}
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle 
                style={{
                  fontSize: '22px',
                  lineHeight: '28px',
                  fontWeight: '500',
                  color: onSurfaceColor,
                  marginBottom: description ? '8px' : '0'
                }}
              >
                {title}
              </DialogTitle>
              {description && (
                <DialogDescription 
                  style={{
                    fontSize: '16px',
                    lineHeight: '24px',
                    fontWeight: '400',
                    color: onSurfaceVariantColor
                  }}
                >
                  {description}
                </DialogDescription>
              )}
            </div>
            
            <button
              onClick={() => onOpenChange(false)}
              className="p-2 rounded-full hover:bg-opacity-10 hover:bg-gray-500 transition-colors"
              style={{ minWidth: '48px', minHeight: '48px' }}
            >
              <X className="w-5 h-5" style={{ color: onSurfaceVariantColor }} />
            </button>
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="px-6 py-4">
          {children}
        </div>

        {/* Actions */}
        {actions && (
          <div className="px-6 pb-6 pt-2">
            <div className="flex justify-end gap-3">
              {actions}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}