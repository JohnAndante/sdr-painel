'use client'

import { Button } from '../ui/button'
import PageContainer from '../PageContainer'
import KPI from '../KPI'
import BarChart from '../Chart/Bar'
import LineChart from '../Chart/Line'
import DataTable from '../DataTable'
import { Phone, CheckCircle, XCircle, TrendingUp, RotateCcw } from 'lucide-react'
import { Period } from '../../types'

interface DashboardPageProps {
  darkMode: boolean
  isMobile: boolean
  selectedPeriod?: Period
  onPeriodChange?: (period: Period) => void
}

export default function DashboardPage({
  darkMode,
  isMobile,
  selectedPeriod = 'hoje',
  onPeriodChange = () => { }
}: DashboardPageProps) {
  const getKPIData = () => {
    switch (selectedPeriod) {
      case '7d':
        return {
          totalRotinas: { value: '45', subinfo: '+12 esta semana' },
          ligacoesEfetuadas: { value: '1,234', subinfo: '+156 esta semana' },
          sucessos: { value: '1,098', subinfo: '89% taxa de sucesso' },
          falhas: { value: '136', subinfo: '11% taxa de falha' },
          taxaSucesso: { value: '89%', subinfo: '+2% vs semana anterior' }
        }
      case '30d':
        return {
          totalRotinas: { value: '180', subinfo: '+48 este mês' },
          ligacoesEfetuadas: { value: '5,678', subinfo: '+1,234 este mês' },
          sucessos: { value: '4,891', subinfo: '86% taxa de sucesso' },
          falhas: { value: '787', subinfo: '14% taxa de falha' },
          taxaSucesso: { value: '86%', subinfo: '-1% vs mês anterior' }
        }
      default: // hoje
        return {
          totalRotinas: { value: '8', subinfo: '+2 hoje' },
          ligacoesEfetuadas: { value: '156', subinfo: '+23 hoje' },
          sucessos: { value: '142', subinfo: '91% taxa de sucesso' },
          falhas: { value: '14', subinfo: '9% taxa de falha' },
          taxaSucesso: { value: '91%', subinfo: '+3% vs ontem' }
        }
    }
  }

  const kpiData = getKPIData()

  const barChartData = Array.from({ length: 24 }, (_, hour) => ({
    hour,
    success: Math.floor(Math.random() * 50) + 10,
    total: Math.floor(Math.random() * 30) + 50
  }))

  const lineChartData = [
    {
      agent: 'Ana Silva',
      points: Array.from({ length: 30 }, (_, day) => ({
        x: day + 1,
        y: Math.floor(Math.random() * 20) + 80
      })),
      color: '#4F48EC'
    },
    {
      agent: 'Carlos Santos',
      points: Array.from({ length: 30 }, (_, day) => ({
        x: day + 1,
        y: Math.floor(Math.random() * 25) + 75
      })),
      color: '#FFBF18'
    },
    {
      agent: 'Maria Oliveira',
      points: Array.from({ length: 30 }, (_, day) => ({
        x: day + 1,
        y: Math.floor(Math.random() * 40) + 45
      })),
      color: '#B3261E'
    }
  ]

  const topAgentsData = [
    { agente: 'Ana Silva', ligacoes: 456, sucessoPercent: '89%', sucessos: 406, falhas: 50 },
    { agente: 'Carlos Santos', ligacoes: 380, sucessoPercent: '92%', sucessos: 350, falhas: 30 },
    { agente: 'Maria Oliveira', ligacoes: 245, sucessoPercent: '76%', sucessos: 186, falhas: 59 },
    { agente: 'John Smith', ligacoes: 89, sucessoPercent: '62%', sucessos: 55, falhas: 34 }
  ]

  const rotinasRecentesData = [
    {
      nome: 'Vendas Produto A - Q1',
      agente: 'Ana Silva',
      inicio: '09:00',
      termino: '17:00',
      efetuadas: 342,
      sucessos: 156,
      falhas: 186,
      status: 'Concluída'
    },
    {
      nome: 'Follow-up Leads Quentes',
      agente: 'Carlos Santos',
      inicio: '10:00',
      termino: '16:00',
      efetuadas: 180,
      sucessos: 165,
      falhas: 15,
      status: 'Concluída'
    }
  ]

  const periodButtons = [
    { key: 'hoje', label: 'Hoje' },
    { key: '7d', label: '7 dias' },
    { key: '30d', label: '30 dias' }
  ] as const

  return (
    <PageContainer
      title="Dashboard"
      subtitle="Visão geral do desempenho do sistema de IA de atendimento"
      breadcrumb={[{ label: 'Dashboard' }]}
      darkMode={darkMode}
    >
      <div className="space-y-6">
        {/* Period Filter */}
        <div className="flex flex-wrap gap-2">
          {periodButtons.map((period) => (
            <Button
              key={period.key}
              variant={selectedPeriod === period.key ? 'default' : 'outline'}
              onClick={() => onPeriodChange(period.key)}
              className="
                h-10 px-4
                text-sm font-medium
                transition-colors
              "
            >
              {period.label}
            </Button>
          ))}
        </div>

        {/* KPIs Grid */}
        <div className="
          grid gap-4
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-5
        ">
          <KPI
            label="Total de Rotinas"
            value={kpiData.totalRotinas.value}
            subinfo={kpiData.totalRotinas.subinfo}
            icon={<RotateCcw className="w-5 h-5" />}
            state="default"
          />
          <KPI
            label="Ligações Efetuadas"
            value={kpiData.ligacoesEfetuadas.value}
            subinfo={kpiData.ligacoesEfetuadas.subinfo}
            icon={<Phone className="w-5 h-5" />}
            state="default"
          />
          <KPI
            label="Sucessos"
            value={kpiData.sucessos.value}
            subinfo={kpiData.sucessos.subinfo}
            icon={<CheckCircle className="w-5 h-5" />}
            state="good"
          />
          <KPI
            label="Falhas"
            value={kpiData.falhas.value}
            subinfo={kpiData.falhas.subinfo}
            icon={<XCircle className="w-5 h-5" />}
            state="alert"
          />
          <KPI
            label="Taxa de Sucesso"
            value={kpiData.taxaSucesso.value}
            subinfo={kpiData.taxaSucesso.subinfo}
            icon={<TrendingUp className="w-5 h-5" />}
            state="good"
          />
        </div>

        {/* Charts Grid */}
        <div className="
          grid gap-6
          grid-cols-1
          xl:grid-cols-2
        ">
          <div className="min-w-0">
            <BarChart
              title="Sucessos por horário (0-23h)"
              data={barChartData}
            />
          </div>
          <div className="min-w-0">
            <LineChart
              title="Taxa de sucesso por agente (últimos 30 dias)"
              data={lineChartData}
            />
          </div>
        </div>

        {/* Data Tables */}
        <div className="space-y-8">
          <div>
            <h3 className="mb-4 text-lg font-medium text-foreground">
              Top Agentes por Performance
            </h3>
            <div className="overflow-hidden">
              <DataTable
                columns={[
                  { key: 'agente', label: 'Agente', sortable: true },
                  { key: 'ligacoes', label: 'Ligações', sortable: true },
                  { key: 'sucessoPercent', label: 'Taxa Sucesso', sortable: true },
                  { key: 'sucessos', label: 'Sucessos', sortable: true },
                  { key: 'falhas', label: 'Falhas', sortable: true }
                ]}
                data={topAgentsData}
              />
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-medium text-foreground">
              Rotinas Recentes
            </h3>
            <div className="overflow-hidden">
              <DataTable
                columns={[
                  { key: 'nome', label: 'Rotina', sortable: true },
                  { key: 'agente', label: 'Agente', sortable: true },
                  { key: 'inicio', label: 'Início', sortable: true },
                  { key: 'termino', label: 'Término', sortable: true },
                  { key: 'efetuadas', label: 'Efetuadas', sortable: true },
                  { key: 'sucessos', label: 'Sucessos', sortable: true },
                  { key: 'falhas', label: 'Falhas', sortable: true },
                  { key: 'status', label: 'Status', sortable: true }
                ]}
                data={rotinasRecentesData}
              />
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
