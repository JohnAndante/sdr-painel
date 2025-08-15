'use client'

import React from 'react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import PageContainer from '../PageContainer'
import FilterBar from '../FilterBar'
import DataTable from '../DataTable'
import NovaRotinaForm from '../NovaRotinaForm'
import { Plus, Eye, Edit, Archive, Play, Pause, CheckCircle } from 'lucide-react'
import { MD3_TOKENS } from '../../constants/tokens'
import { toast } from 'sonner'
import { Rotina, Agent, ViewMode } from '../../types'

interface RotinasPageProps {
  darkMode: boolean
  isMobile: boolean
  rotinasView: ViewMode
  rotinasData: Rotina[]
  agentesData: Agent[]
  onViewChange?: (view: ViewMode) => void
  onFormSubmit?: (data: any) => void
  onViewDetails?: (rotina: Rotina) => void
}

export default function RotinasPage({
  darkMode,
  isMobile,
  rotinasView,
  rotinasData,
  agentesData,
  onViewChange,
  onFormSubmit,
  onViewDetails
}: RotinasPageProps) {
  const colors = darkMode ? MD3_TOKENS.dark : MD3_TOKENS.light
  const primaryColor = colors['sys/primary'] || colors['dark/primary']
  const onPrimaryColor = colors['sys/on-primary'] || colors['dark/on-primary']
  const onSurfaceColor = colors['sys/on-surface'] || colors['dark/on-surface']
  const onSurfaceVariantColor = colors['sys/on-surface-variant'] || colors['dark/outline']
  const successColor = colors['sys/success'] || colors['dark/success']
  const errorColor = colors['sys/error'] || colors['dark/error']

  // Se estiver na view de nova rotina, renderizar o formulário
  if (rotinasView === 'form') {
    return (
      <NovaRotinaForm
        darkMode={darkMode}
        isMobile={isMobile}
        agentesData={agentesData}
        onCancel={() => onViewChange?.('list')}
        onSave={(data) => {
          onFormSubmit?.(data)
          onViewChange?.('list')
        }}
      />
    )
  }

  // Format data for the table with the specific columns requested
  const formattedData = rotinasData.map(rotina => ({
    ...rotina,
    nomeRotina: rotina.nome,
    agenteResponsavel: rotina.agente,
    totalNumeros: rotina.totalNumeros,
    totalFalhas: rotina.falhas,
    totalSucessos: rotina.sucessos,
    dataInicio: rotina.dataInicio,
    dataTermino: rotina.dataFim,
    // Additional computed fields for better display
    taxaSucesso: rotina.ligacoesEfetuadas > 0 ? `${Math.round((rotina.sucessos / rotina.ligacoesEfetuadas) * 100)}%` : '0%',
    progresso: `${rotina.ligacoesEfetuadas}/${rotina.totalNumeros}`,
    status: (
      <Badge
        variant={rotina.status === 'Concluída' ? 'default' : rotina.status === 'Em andamento' ? 'secondary' : 'outline'}
        style={{
          backgroundColor: rotina.status === 'Concluída' ? successColor :
            rotina.status === 'Em andamento' ? primaryColor : 'transparent',
          color: rotina.status === 'Concluída' ? colors['sys/on-success'] || colors['dark/on-success'] :
            rotina.status === 'Em andamento' ? onPrimaryColor : onSurfaceColor,
          borderColor: rotina.status === 'Agendada' ? onSurfaceVariantColor : 'transparent',
          fontSize: '12px',
          fontWeight: '500',
          borderRadius: '8px'
        }}
      >
        {rotina.status}
      </Badge>
    ),
    acoes: (
      <div className="flex gap-1">
        <button
          onClick={() => onViewDetails?.(rotina)}
          className="p-2 rounded-full hover:bg-opacity-10 hover:bg-gray-500 transition-colors focus:ring-2 focus:ring-opacity-50"
          style={{
            minWidth: '48px',
            minHeight: '48px',
            outline: 'none'
          }}
          onFocus={(e) => e.target.style.outlineColor = primaryColor}
          title="Ver detalhes"
        >
          <Eye className="w-4 h-4" style={{ color: onSurfaceVariantColor }} />
        </button>
        <button
          onClick={() => toast.info(`Editando rotina "${rotina.nome}"`)}
          className="p-2 rounded-full hover:bg-opacity-10 hover:bg-gray-500 transition-colors focus:ring-2 focus:ring-opacity-50"
          style={{
            minWidth: '48px',
            minHeight: '48px',
            outline: 'none'
          }}
          onFocus={(e) => e.target.style.outlineColor = primaryColor}
          title="Editar"
        >
          <Edit className="w-4 h-4" style={{ color: onSurfaceVariantColor }} />
        </button>
        <button
          onClick={() => {
            if (rotina.status === 'Agendada') {
              toast.success(`Rotina "${rotina.nome}" iniciada!`)
            } else if (rotina.status === 'Em andamento') {
              toast.info(`Rotina "${rotina.nome}" pausada`)
            }
          }}
          className="p-2 rounded-full hover:bg-opacity-10 hover:bg-gray-500 transition-colors focus:ring-2 focus:ring-opacity-50"
          style={{
            minWidth: '48px',
            minHeight: '48px',
            outline: 'none'
          }}
          onFocus={(e) => e.target.style.outlineColor = primaryColor}
          title={rotina.status === 'Agendada' ? 'Iniciar' : rotina.status === 'Em andamento' ? 'Pausar' : 'Concluída'}
        >
          {rotina.status === 'Agendada' ? (
            <Play className="w-4 h-4" style={{ color: successColor }} />
          ) : rotina.status === 'Em andamento' ? (
            <Pause className="w-4 h-4" style={{ color: primaryColor }} />
          ) : (
            <CheckCircle className="w-4 h-4" style={{ color: successColor }} />
          )}
        </button>
        <button
          onClick={() => toast.info(`Rotina "${rotina.nome}" arquivada`)}
          className="p-2 rounded-full hover:bg-opacity-10 hover:bg-gray-500 transition-colors focus:ring-2 focus:ring-opacity-50"
          style={{
            minWidth: '48px',
            minHeight: '48px',
            outline: 'none'
          }}
          onFocus={(e) => e.target.style.outlineColor = primaryColor}
          title="Arquivar"
        >
          <Archive className="w-4 h-4" style={{ color: onSurfaceVariantColor }} />
        </button>
      </div>
    )
  }))

  return (
    <PageContainer
      title="Rotinas"
      subtitle="Gerenciar rotinas de atendimento por IA"
      breadcrumb={[
        { label: 'Dashboard', href: '#' },
        { label: 'Rotinas' }
      ]}
      darkMode={darkMode}
    >
      <div style={{ gap: '24px' }} className="flex flex-col">
        <div className="flex justify-end">
          <Button
            onClick={() => onViewChange?.('form')}
            style={{
              backgroundColor: primaryColor,
              color: onPrimaryColor,
              borderRadius: '12px',
              fontSize: '16px',
              lineHeight: '24px',
              fontWeight: '500',
              minHeight: '48px',
              border: 'none',
              outline: 'none'
            }}
            onFocus={(e) => e.target.style.outline = `2px solid ${primaryColor}`}
          >
            <Plus className="w-4 h-4 mr-2" />
            Nova Rotina
          </Button>
        </div>

        {/* Summary Statistics */}
        <div className="grid gap-4 lg:grid-cols-4">
          <div
            className="p-4 rounded-lg"
            style={{
              backgroundColor: colors['sys/surface-variant'] || colors['dark/surface-variant'],
              border: `1px solid ${colors['sys/outline'] || colors['dark/outline']}`
            }}
          >
            <h4 style={{ color: onSurfaceColor, marginBottom: '8px' }}>Total de Rotinas</h4>
            <p style={{
              color: primaryColor,
              fontSize: '24px',
              fontWeight: '600',
              lineHeight: '32px'
            }}>
              {rotinasData.length}
            </p>
          </div>

          <div
            className="p-4 rounded-lg"
            style={{
              backgroundColor: colors['sys/surface-variant'] || colors['dark/surface-variant'],
              border: `1px solid ${colors['sys/outline'] || colors['dark/outline']}`
            }}
          >
            <h4 style={{ color: onSurfaceColor, marginBottom: '8px' }}>Total de Ligações</h4>
            <p style={{
              color: primaryColor,
              fontSize: '24px',
              fontWeight: '600',
              lineHeight: '32px'
            }}>
              {rotinasData.reduce((acc, rotina) => acc + rotina.ligacoesEfetuadas, 0)}
            </p>
          </div>

          <div
            className="p-4 rounded-lg"
            style={{
              backgroundColor: colors['sys/surface-variant'] || colors['dark/surface-variant'],
              border: `1px solid ${colors['sys/outline'] || colors['dark/outline']}`
            }}
          >
            <h4 style={{ color: onSurfaceColor, marginBottom: '8px' }}>Total Sucessos</h4>
            <p style={{
              color: successColor,
              fontSize: '24px',
              fontWeight: '600',
              lineHeight: '32px'
            }}>
              {rotinasData.reduce((acc, rotina) => acc + rotina.sucessos, 0)}
            </p>
          </div>

          <div
            className="p-4 rounded-lg"
            style={{
              backgroundColor: colors['sys/surface-variant'] || colors['dark/surface-variant'],
              border: `1px solid ${colors['sys/outline'] || colors['dark/outline']}`
            }}
          >
            <h4 style={{ color: onSurfaceColor, marginBottom: '8px' }}>Total Falhas</h4>
            <p style={{
              color: errorColor,
              fontSize: '24px',
              fontWeight: '600',
              lineHeight: '32px'
            }}>
              {rotinasData.reduce((acc, rotina) => acc + rotina.falhas, 0)}
            </p>
          </div>
        </div>

        <FilterBar
          searchPlaceholder="Buscar rotinas..."
          onApplyFilters={() => toast.success('Filtros aplicados!')}
          darkMode={darkMode}
        />

        <DataTable
          columns={[
            { key: 'nomeRotina', label: 'Nome da Rotina', sortable: true },
            { key: 'agenteResponsavel', label: 'Agente Responsável', sortable: true },
            { key: 'totalNumeros', label: 'Total de Números', sortable: true },
            { key: 'totalSucessos', label: 'Total Sucessos', sortable: true },
            { key: 'totalFalhas', label: 'Total Falhas', sortable: true },
            { key: 'dataInicio', label: 'Data Início', sortable: true },
            { key: 'dataTermino', label: 'Data Término', sortable: true },
            { key: 'status', label: 'Status', sortable: true },
            { key: 'acoes', label: 'Ações', sortable: false }
          ]}
          data={formattedData}
          darkMode={darkMode}
        />
      </div>
    </PageContainer>
  )
}
