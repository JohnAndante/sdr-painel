'use client'

import React, { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Search, Filter, X } from 'lucide-react'

interface FilterChip {
  id: string
  label: string
  selected?: boolean
}

interface FilterBarProps {
  chips?: FilterChip[]
  onChipToggle?: (chipId: string) => void
  searchPlaceholder?: string
  onSearch?: (value: string) => void
  onApplyFilters?: () => void
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
    'sys/primary-container': '#E7E9FF',
    'sys/on-primary-container': '#100E34',
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

export default function FilterBar({
  chips = [],
  onChipToggle,
  searchPlaceholder = "Buscar...",
  onSearch,
  onApplyFilters,
  darkMode = false
}: FilterBarProps) {
  const [searchValue, setSearchValue] = useState('')
  const colors = darkMode ? MD3_TOKENS.dark : MD3_TOKENS.light
  
  const surfaceVariantColor = darkMode ? colors['dark/surface-variant'] : colors['sys/surface-variant']
  const onSurfaceColor = darkMode ? colors['dark/on-surface'] : colors['sys/on-surface']
  const onSurfaceVariantColor = darkMode ? colors['dark/outline'] : colors['sys/on-surface-variant']
  const primaryColor = darkMode ? colors['dark/primary'] : colors['sys/primary']
  const onPrimaryColor = darkMode ? colors['dark/on-primary'] : colors['sys/on-primary']
  const primaryContainerColor = darkMode ? colors['dark/surface-variant'] : colors['sys/primary-container']
  const onPrimaryContainerColor = darkMode ? colors['dark/on-surface'] : colors['sys/on-primary-container']
  const outlineColor = darkMode ? colors['dark/outline'] : colors['sys/outline']

  const handleSearchChange = (value: string) => {
    setSearchValue(value)
    onSearch?.(value)
  }

  const clearSearch = () => {
    setSearchValue('')
    onSearch?.('')
  }

  return (
    <div 
      className="p-4 rounded-lg"
      style={{ 
        backgroundColor: surfaceVariantColor,
        border: `1px solid ${outlineColor}`,
        borderRadius: '12px', // radius/md
        fontFamily: 'Roboto Flex, Roboto, sans-serif'
      }}
    >
      {/* Search Field */}
      <div className="flex gap-3 mb-4">
        <div className="flex-1 relative">
          <Search 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
            style={{ color: onSurfaceVariantColor }}
          />
          <Input
            type="text"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 pr-10 h-12"
            style={{
              backgroundColor: darkMode ? colors['dark/surface'] : colors['sys/surface'],
              border: `1px solid ${outlineColor}`,
              borderRadius: '12px',
              fontSize: '16px',
              lineHeight: '24px',
              fontWeight: '400',
              color: onSurfaceColor
            }}
          />
          {searchValue && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-opacity-10 hover:bg-gray-500 transition-colors"
              style={{ minWidth: '48px', minHeight: '48px' }}
            >
              <X className="w-4 h-4" style={{ color: onSurfaceVariantColor }} />
            </button>
          )}
        </div>
        
        <Button
          onClick={onApplyFilters}
          className="h-12 px-6"
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
          <Filter className="w-4 h-4 mr-2" />
          Aplicar
        </Button>
      </div>

      {/* Filter Chips */}
      {chips.length > 0 && (
        <div>
          <div 
            className="mb-3"
            style={{
              fontSize: '14px',
              lineHeight: '20px',
              fontWeight: '500',
              color: onSurfaceColor
            }}
          >
            Filtros
          </div>
          <div className="flex flex-wrap gap-2">
            {chips.map((chip) => (
              <button
                key={chip.id}
                onClick={() => onChipToggle?.(chip.id)}
                className="transition-all duration-200 hover:shadow-sm"
                style={{ minHeight: '48px', padding: '12px 16px' }}
              >
                <Badge
                  variant={chip.selected ? "default" : "outline"}
                  className="px-3 py-1"
                  style={{
                    backgroundColor: chip.selected ? primaryColor : 'transparent',
                    color: chip.selected ? onPrimaryColor : onSurfaceColor,
                    borderColor: chip.selected ? primaryColor : outlineColor,
                    borderRadius: '8px', // radius/sm
                    fontSize: '14px',
                    lineHeight: '20px',
                    fontWeight: '500',
                    border: `1px solid ${chip.selected ? primaryColor : outlineColor}`
                  }}
                >
                  {chip.label}
                </Badge>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}