'use client'

import { useChartTheme } from '@/contexts/ThemeContext'

interface BarChartProps {
  title: string
  data: { hour: number; success: number; total: number }[]
}

export default function BarChart({ title, data }: BarChartProps) {
  const theme = useChartTheme()

  const maxValue = Math.max(...data.map(d => d.total))

  return (
    <div
      className="p-6 rounded-lg border"
      style={{
        backgroundColor: theme.surface,
        border: `1px solid ${theme.outline}`,
        borderRadius: '12px',
        fontFamily: 'Poppins, sans-serif'
      }}
    >
      {/* Title */}
      <div
        className="mb-6"
        style={{
          fontSize: '16px', // Title/Medium
          lineHeight: '24px',
          fontWeight: '500',
          color: theme.onSurface
        }}
      >
        {title}
      </div>

      {/* Legend */}
      <div className="flex gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded"
            style={{ backgroundColor: theme.primary }}
          ></div>
          <span
            style={{
              fontSize: '12px', // Body/Small
              lineHeight: '16px',
              fontWeight: '400',
              color: theme.onSurfaceVariant
            }}
          >
            Sucesso
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded"
            style={{ backgroundColor: theme.surfaceVariant }}
          ></div>
          <span
            style={{
              fontSize: '12px', // Body/Small
              lineHeight: '16px',
              fontWeight: '400',
              color: theme.onSurfaceVariant
            }}
          >
            Total
          </span>
        </div>
      </div>

      {/* Chart Area */}
      <div className="relative overflow-hidden" style={{ minHeight: '220px' }}>
        <div className="flex" style={{ paddingLeft: '40px' }}>
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 flex flex-col justify-between" style={{ width: '32px', height: '190px' }}>
            {[maxValue, Math.floor(maxValue * 0.75), Math.floor(maxValue * 0.5), Math.floor(maxValue * 0.25), 0].map((value, index) => (
              <div
                key={index}
                className="text-right"
                style={{
                  fontSize: '11px', // Label/Small
                  lineHeight: '16px',
                  fontWeight: '500',
                  color: theme.onSurfaceVariant,
                  transform: 'translateY(-8px)' // Center align with bars
                }}
              >
                {value}
              </div>
            ))}
          </div>

          {/* Bars */}
          <div className="flex-1">
            <div className="flex items-end justify-between gap-1" style={{ height: '190px' }}>
              {data.map((item) => (
                <div key={item.hour} className="flex flex-col items-center flex-1">
                  {/* Bar container */}
                  <div className="relative w-full flex flex-col justify-end" style={{ height: '190px' }}>
                    {/* Total bar (background) */}
                    <div
                      className="w-full rounded-t"
                      style={{
                        backgroundColor: theme.surfaceVariant,
                        height: `${(item.total / maxValue) * 190}px`,
                        minHeight: '2px',
                        borderRadius: '4px 4px 0 0'
                      }}
                    ></div>
                    {/* Success bar (overlay) */}
                    <div
                      className="absolute bottom-0 w-full rounded-t"
                      style={{
                        backgroundColor: theme.primary,
                        height: `${(item.success / maxValue) * 190}px`,
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
                    color: theme.onSurfaceVariant
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
