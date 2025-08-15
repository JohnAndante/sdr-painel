import { useState } from 'react'
import { Badge } from '../ui/badge'
import { useChartTheme, useThemeContext } from '@/contexts/ThemeContext'

interface DataPoint {
  x: number
  y: number
}

interface LineData {
  agent: string
  points: DataPoint[]
}

interface LineChartProps {
  title: string
  data: LineData[]
}

export default function LineChart({ title, data }: LineChartProps) {
  const [selectedAgents, setSelectedAgents] = useState<string[]>(
    data.map(item => item.agent)
  )

  const theme = useChartTheme()
  const { chartColors } = useThemeContext()

  const toggleAgent = (agent: string) => {
    setSelectedAgents(prev =>
      prev.includes(agent)
        ? prev.filter(a => a !== agent)
        : [...prev, agent]
    )
  }

  // Calculate chart dimensions and bounds
  const maxX = Math.max(...data.flatMap(item => item.points.map(p => p.x)))
  const maxY = Math.max(...data.flatMap(item => item.points.map(p => p.y)), 100)

  // Chart area dimensions (leaving space for labels)
  const chartWidth = 280
  const chartHeight = 160
  const leftPadding = 40
  const bottomPadding = 30
  const svgWidth = chartWidth + leftPadding
  const svgHeight = chartHeight + bottomPadding

  const generatePath = (points: DataPoint[]) => {
    if (points.length === 0) return ''

    const pathCommands = points.map((point, index) => {
      const x = leftPadding + (point.x / maxX) * chartWidth
      const y = (chartHeight - (point.y / maxY) * chartHeight)
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
    })

    return pathCommands.join(' ')
  }

  return (
    <div
      className="p-6 rounded-lg border overflow-hidden"
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

      {/* Legend with selectable chips */}
      <div className="flex flex-wrap gap-2 mb-6">
        {data.map((item, index) => {
          const isSelected = selectedAgents.includes(item.agent)
          const chipColor = chartColors.agents[index % chartColors.agents.length]

          return (
            <button
              key={item.agent}
              onClick={() => toggleAgent(item.agent)}
              className="transition-all duration-200"
              style={{ minHeight: '48px', padding: '12px 4px' }}
            >
              <Badge
                variant={isSelected ? "default" : "outline"}
                className="px-3 py-1"
                style={{
                  backgroundColor: isSelected ? chipColor : 'transparent',
                  color: isSelected ? '#FFFFFF' : theme.onSurface,
                  borderColor: chipColor,
                  borderRadius: '8px', // radius/sm
                  fontSize: '12px', // Label/Medium
                  lineHeight: '16px',
                  fontWeight: '500',
                  border: `1px solid ${chipColor}`
                }}
              >
                <div
                  className="w-2 h-2 rounded-full mr-2"
                  style={{ backgroundColor: isSelected ? '#FFFFFF' : chipColor }}
                ></div>
                {item.agent}
              </Badge>
            </button>
          )
        })}
      </div>

      {/* Chart Area */}
      <div className="relative w-full" style={{ height: `${svgHeight}px` }}>
        <svg width="100%" height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="overflow-visible">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map(value => (
            <g key={value}>
              <line
                x1={leftPadding}
                y1={chartHeight - (value / maxY) * chartHeight}
                x2={leftPadding + chartWidth}
                y2={chartHeight - (value / maxY) * chartHeight}
                stroke={theme.outline}
                strokeWidth="1"
                opacity="0.3"
              />
              <text
                x={leftPadding - 8}
                y={chartHeight - (value / maxY) * chartHeight + 4}
                textAnchor="end"
                style={{
                  fontSize: '11px',
                  fill: theme.onSurfaceVariant,
                  fontFamily: 'Poppins, sans-serif'
                }}
              >
                {value}%
              </text>
            </g>
          ))}

          {/* Lines */}
          {data.map((item, index) => {
            if (!selectedAgents.includes(item.agent)) return null

            const lineColor = chartColors.agents[index % chartColors.agents.length]
            const path = generatePath(item.points)

            return (
              <g key={item.agent}>
                <path
                  d={path}
                  fill="none"
                  stroke={lineColor}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Data points */}
                {item.points.map((point, pointIndex) => {
                  const x = leftPadding + (point.x / maxX) * chartWidth
                  const y = chartHeight - (point.y / maxY) * chartHeight

                  return (
                    <circle
                      key={pointIndex}
                      cx={x}
                      cy={y}
                      r="3"
                      fill={lineColor}
                      stroke={theme.surface}
                      strokeWidth="2"
                    />
                  )
                })}
              </g>
            )
          })}
        </svg>

        {/* X-axis labels */}
        <div
          className="absolute flex justify-between"
          style={{
            width: `${chartWidth}px`,
            left: `${leftPadding}px`,
            bottom: '0px',
            height: '20px'
          }}
        >
          {Array.from({ length: 6 }, (_, i) => {
            const day = Math.floor((maxX / 5) * i)
            return (
              <div
                key={i}
                style={{
                  fontSize: '11px', // Label/Small
                  lineHeight: '16px',
                  fontWeight: '500',
                  color: theme.onSurfaceVariant
                }}
              >
                Dia {day}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
