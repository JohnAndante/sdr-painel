'use client'

import React from 'react'

interface BarChartProps {
  title: string
  data: { hour: number; success: number; total: number }[]
  darkMode?: boolean
}

const MD3_TOKENS = {
  light: {
    'sys/surface': '#FFFFFF',
    'sys/on-surface': '#100E34',
    'sys/surface-variant': '#F5F6FB',
    'sys/on-surface-variant': '#3F4151',
    'sys/primary': '#4F48EC',
    'sys/outline': '#C7CAD6'
  },
  dark: {
    'dark/surface': '#0E0D18',
    'dark/on-surface': '#E3E5F0',
    'dark/surface-variant': '#2B2D3A',
    'dark/outline': '#8B8FA1',
    'dark/primary': '#BFC2FF'
  }
}

export default function BarChart({ title, data, darkMode = false }: BarChartProps) {
  const colors = darkMode ? MD3_TOKENS.dark : MD3_TOKENS.light
  const surfaceColor = darkMode ? colors['dark/surface'] : colors['sys/surface']
  const onSurfaceColor = darkMode ? colors['dark/on-surface'] : colors['sys/on-surface']
  const onSurfaceVariantColor = darkMode ? colors['dark/outline'] : colors['sys/on-surface-variant']
  const primaryColor = darkMode ? colors['dark/primary'] : colors['sys/primary']
  const surfaceVariantColor = darkMode ? colors['dark/surface-variant'] : colors['sys/surface-variant']
  const outlineColor = darkMode ? colors['dark/outline'] : colors['sys/outline']

  const maxValue = Math.max(...data.map(d => d.total))

  return (
    <div 
      className="p-6 rounded-lg border"
      style={{
        backgroundColor: surfaceColor,
        border: `1px solid ${outlineColor}`,
        borderRadius: '12px',
        fontFamily: 'Roboto Flex, Roboto, sans-serif'
      }}
    >
      {/* Title */}
      <div 
        className="mb-6"
        style={{
          fontSize: '16px', // Title/Medium
          lineHeight: '24px',
          fontWeight: '500',
          color: onSurfaceColor
        }}
      >
        {title}
      </div>

      {/* Legend */}
      <div className="flex gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded"
            style={{ backgroundColor: primaryColor }}
          ></div>
          <span 
            style={{
              fontSize: '12px', // Body/Small
              lineHeight: '16px',
              fontWeight: '400',
              color: onSurfaceVariantColor
            }}
          >
            Sucesso
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded"
            style={{ backgroundColor: surfaceVariantColor }}
          ></div>
          <span 
            style={{
              fontSize: '12px', // Body/Small
              lineHeight: '16px',
              fontWeight: '400',
              color: onSurfaceVariantColor
            }}
          >
            Total
          </span>
        </div>
      </div>

      {/* Chart Area */}
      <div className="relative overflow-hidden">
        <div className="flex" style={{ paddingLeft: '40px' }}>
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 flex flex-col justify-between" style={{ width: '32px', height: '160px' }}>
            {[maxValue, Math.floor(maxValue * 0.75), Math.floor(maxValue * 0.5), Math.floor(maxValue * 0.25), 0].map((value, index) => (
              <div 
                key={index}
                className="text-right"
                style={{
                  fontSize: '11px', // Label/Small
                  lineHeight: '16px',
                  fontWeight: '500',
                  color: onSurfaceVariantColor,
                  transform: 'translateY(-8px)' // Center align with bars
                }}
              >
                {value}
              </div>
            ))}
          </div>

          {/* Bars */}
          <div className="flex-1">
            <div className="flex items-end justify-between gap-1" style={{ height: '160px' }}>
              {data.map((item) => (
                <div key={item.hour} className="flex flex-col items-center flex-1">
                  {/* Bar container */}
                  <div className="relative w-full flex flex-col justify-end" style={{ height: '160px' }}>
                    {/* Total bar (background) */}
                    <div 
                      className="w-full rounded-t"
                      style={{
                        backgroundColor: surfaceVariantColor,
                        height: `${(item.total / maxValue) * 160}px`,
                        minHeight: '2px',
                        borderRadius: '4px 4px 0 0'
                      }}
                    ></div>
                    {/* Success bar (overlay) */}
                    <div 
                      className="absolute bottom-0 w-full rounded-t"
                      style={{
                        backgroundColor: primaryColor,
                        height: `${(item.success / maxValue) * 160}px`,
                        minHeight: item.success > 0 ? '2px' : '0px',
                        borderRadius: '4px 4px 0 0'
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Hour labels */}
            <div className="flex justify-between gap-1 mt-2">
              {data.map((item) => (
                <div 
                  key={item.hour}
                  className="flex-1 text-center"
                  style={{
                    fontSize: '11px', // Label/Small
                    lineHeight: '16px',
                    fontWeight: '500',
                    color: onSurfaceVariantColor
                  }}
                >
                  {item.hour}h
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}