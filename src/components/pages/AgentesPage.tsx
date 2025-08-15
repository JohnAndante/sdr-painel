'use client'

import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import PageContainer from '../PageContainer'
import FilterBar from '../FilterBar'
import DataTable from '../DataTable'
import NovoAgenteForm from '../NovoAgenteForm'
import { Plus, Eye, Edit, Archive } from 'lucide-react'
import { MD3_TOKENS } from '../../constants/tokens'
import { toast } from 'sonner'

interface AgentesPageProps {
  darkMode: boolean
  isMobile: boolean
  agentesView: string
  agentesData: any[]
  onViewChange: (view: string) => void
  onFormSubmit: (data: any) => void
  onEditAgente: (agente: any) => void
}

export default function AgentesPage({
  darkMode,
  isMobile,
  agentesView,
  agentesData,
  onViewChange,
  onFormSubmit,
  onEditAgente
}: AgentesPageProps) {
  const colors = darkMode ? MD3_TOKENS.dark : MD3_TOKENS.light
  const primaryColor = colors['md-sys-color-primary']
  const onPrimaryColor = colors['md-sys-color-on-primary']
  const onSurfaceColor = colors['md-sys-color-on-surface']
  const onSurfaceVariantColor = colors['md-sys-color-on-surface-variant']

  if (agentesView === 'novo') {
    return (
      <NovoAgenteForm
        darkMode={darkMode}
        isMobile={isMobile}
        onCancel={() => onViewChange('list')}
        onSave={onFormSubmit}
      />
    )
  }

  const formattedData = agentesData.map(agente => ({
    ...agente,
    persona: agente.persona.length > 50 ? agente.persona.substring(0, 50) + '...' : agente.persona,
    status: (
      <Badge
        variant={agente.status === 'Ativo' ? 'default' : 'secondary'}
        style={{
          backgroundColor: agente.status === 'Ativo' ? primaryColor : colors['md-sys-color-surface-variant'],
          color: agente.status === 'Ativo' ? onPrimaryColor : onSurfaceColor,
          fontSize: '12px',
          fontWeight: '500',
          borderRadius: '8px'
        }}
      >
        {agente.status}
      </Badge>
    ),
    acoes: (
      <div className="flex gap-1">
        <button
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
          onClick={() => onEditAgente(agente)}
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
      title="Agentes"
      subtitle="Gerenciar agentes de IA para atendimento por voz"
      breadcrumb={[
        { label: 'Dashboard', href: '#' },
        { label: 'Agentes' }
      ]}
      darkMode={darkMode}
    >
      <div style={{ gap: '24px' }} className="flex flex-col">
        <div className="flex justify-end">
          <Button
            onClick={() => onViewChange('novo')}
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
            Criar Agente
          </Button>
        </div>

        <FilterBar
          searchPlaceholder="Buscar agentes..."
          onApplyFilters={() => toast.success('Filtros aplicados!')}
          darkMode={darkMode}
        />

        <DataTable
          columns={[
            { key: 'agente', label: 'Agente', sortable: true },
            { key: 'persona', label: 'Persona (resumo)', sortable: false },
            { key: 'funcao', label: 'Função', sortable: true },
            { key: 'idioma', label: 'Idioma', sortable: true },
            { key: 'rotinasAtivas', label: 'Rotinas ativas', sortable: true },
            { key: 'taxaSucesso', label: 'Taxa de sucesso (%)', sortable: true },
            { key: 'ultimaAtividade', label: 'Última atividade', sortable: true },
            { key: 'status', label: 'Status', sortable: true },
            { key: 'acoes', label: 'Ações', sortable: false }
          ]}
          data={formattedData}
        />
      </div>
    </PageContainer>
  )
}
