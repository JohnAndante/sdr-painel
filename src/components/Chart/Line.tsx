import React, { useState } from 'react'
import { Badge } from '../ui/badge'

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
  darkMode?: boolean
}

const AGENT_COLORS = [
  '#4F48EC', // Primary
  '#28A745', // Success
  '#FD7E14', // Warning
  '#DC3545', // Danger
  '#6F42C1', // Purple
  '#20C997', // Teal
]

const MD3_TOKENS = {
  light: {
    'sys/surface': '#FFFFFF',
    'sys/on-surface': '#100E34',
    'sys/surface-variant': '#F5F6FB',
    'sys/on-surface-variant': '#3F4151',
    'sys/outline': '#C7CAD6'
  },
  dark: {
    'dark/surface': '#0E0D18',
    'dark/on-surface': '#E3E5F0',
    'dark/surface-variant': '#2B2D3A',
    'dark/outline': '#8B8FA1'
  }
}

export default function LineChart({ title, data, darkMode = false }: LineChartProps) {
  const [selectedAgents, setSelectedAgents] = useState<string[]>(
    data.map(item => item.agent)
  )

  const colors = darkMode ? MD3_TOKENS.dark : MD3_TOKENS.light
  const surfaceColor = darkMode ? colors['dark/surface'] : colors['sys/surface']
  const onSurfaceColor = darkMode ? colors['dark/on-surface'] : colors['sys/on-surface']
  const onSurfaceVariantColor = darkMode ? colors['dark/outline'] : colors['sys/on-surface-variant']
  const outlineColor = darkMode ? colors['dark/outline'] : colors['sys/outline']

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

      {/* Legend with selectable chips */}
      <div className="flex flex-wrap gap-2 mb-6">
        {data.map((item, index) => {
          const isSelected = selectedAgents.includes(item.agent)
          const chipColor = AGENT_COLORS[index % AGENT_COLORS.length]
          
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
                  color: isSelected ? '#FFFFFF' : onSurfaceColor,
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
                stroke={outlineColor}
                strokeWidth="1"
                opacity="0.3"
              />
              <text
                x={leftPadding - 8}
                y={chartHeight - (value / maxY) * chartHeight + 4}
                textAnchor="end"
                style={{
                  fontSize: '11px',
                  fill: onSurfaceVariantColor,
                  fontFamily: 'Roboto Flex, Roboto, sans-serif'
                }}
              >
                {value}%
              </text>
            </g>
          ))}

          {/* Lines */}
          {data.map((item, index) => {
            if (!selectedAgents.includes(item.agent)) return null
            
            const lineColor = AGENT_COLORS[index % AGENT_COLORS.length]
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
                      stroke={surfaceColor}
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
                  color: onSurfaceVariantColor
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