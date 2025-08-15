'use client'

import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Separator } from '../ui/separator'
import { ScrollArea } from '../ui/scroll-area'
import PageContainer from '../PageContainer'
import DataTable from '../DataTable'
import KPI from '../KPI'
import { 
  ArrowLeft, 
  Phone, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Target,
  User,
  Calendar,
  TrendingUp,
  FileText,
  PlayCircle,
  Eye,
  MessageSquare
} from 'lucide-react'
import { RotinaDetalhes, Ligacao, LigacaoDetalhes } from '../../types'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface RotinaDetalhesPageProps {
  rotina: RotinaDetalhes
  darkMode: boolean
  isMobile: boolean
  onBack: () => void
  onViewLigacaoDetails: (ligacaoId: number) => void
  selectedLigacaoDetalhes: LigacaoDetalhes | null
  onCloseLigacaoDetails: () => void
}

export default function RotinaDetalhesPage({
  rotina,
  darkMode,
  isMobile,
  onBack,
  onViewLigacaoDetails,
  selectedLigacaoDetalhes,
  onCloseLigacaoDetails
}: RotinaDetalhesPageProps) {
  const [transcricaoOpen, setTranscricaoOpen] = useState(false)
  const [selectedTranscricao, setSelectedTranscricao] = useState<{ numero: string, transcricao: string } | null>(null)

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      'Concluída': 'default',
      'Em andamento': 'secondary',
      'Pausada': 'outline',
      'Cancelada': 'destructive'
    }
    return <Badge variant={variants[status] || 'outline'}>{status}</Badge>
  }

  const getResultadoBadge = (resultado: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      'Sucesso': 'default',
      'Follow-up': 'secondary',
      'Callback': 'secondary',
      'Não interessado': 'outline',
      'Falha': 'destructive'
    }
    return <Badge variant={variants[resultado] || 'outline'} className="text-xs">{resultado}</Badge>
  }

  const getStatusLigacaoBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      'Atendida': 'default',
      'Não atendida': 'destructive',
      'Ocupado': 'secondary',
      'Caixa postal': 'outline',
      'Número inválido': 'destructive'
    }
    return <Badge variant={variants[status] || 'outline'} className="text-xs">{status}</Badge>
  }

  const formatarData = (dataISO: string): string => {
    return format(new Date(dataISO), "dd/MM/yyyy HH:mm", { locale: ptBR })
  }

  const formatarDataCurta = (dataISO: string): string => {
    return format(new Date(dataISO), "dd/MM HH:mm", { locale: ptBR })
  }

  const handleViewTranscricao = (ligacao: Ligacao) => {
    if (ligacao.transcricao) {
      setSelectedTranscricao({
        numero: ligacao.numero,
        transcricao: ligacao.transcricao
      })
      setTranscricaoOpen(true)
    }
  }

  const ligacoesColumns = [
    { 
      key: 'numero', 
      label: 'Número', 
      sortable: true,
      render: (ligacao: Ligacao) => (
        <div className="space-y-1">
          <div className="font-medium">{ligacao.numero}</div>
          {ligacao.nomeContato && (
            <div className="text-sm text-muted-foreground">{ligacao.nomeContato}</div>
          )}
        </div>
      )
    },
    { 
      key: 'dataHora', 
      label: 'Data/Hora', 
      sortable: true,
      render: (ligacao: Ligacao) => formatarDataCurta(ligacao.dataHora)
    },
    { 
      key: 'duracao', 
      label: 'Duração', 
      sortable: true
    },
    { 
      key: 'status', 
      label: 'Status', 
      sortable: true,
      render: (ligacao: Ligacao) => getStatusLigacaoBadge(ligacao.status)
    },
    { 
      key: 'resultado', 
      label: 'Resultado', 
      sortable: true,
      render: (ligacao: Ligacao) => getResultadoBadge(ligacao.resultado)
    },
    { 
      key: 'tentativas', 
      label: 'Tentativas', 
      sortable: true,
      render: (ligacao: Ligacao) => (
        <span className="text-center">{ligacao.tentativas}</span>
      )
    },
    {
      key: 'acoes',
      label: 'Ações',
      render: (ligacao: Ligacao) => (
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewLigacaoDetails(ligacao.id)}
            className="h-8 w-8 p-0"
            title="Ver detalhes"
          >
            <Eye className="h-4 w-4" />
          </Button>
          {ligacao.transcricao && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleViewTranscricao(ligacao)}
              className="h-8 w-8 p-0"
              title="Ver transcrição"
            >
              <MessageSquare className="h-4 w-4" />
            </Button>
          )}
          {ligacao.gravacao && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {/* TODO: Play audio */}}
              className="h-8 w-8 p-0"
              title="Reproduzir gravação"
            >
              <PlayCircle className="h-4 w-4" />
            </Button>
          )}
        </div>
      )
    }
  ]

  return (
    <PageContainer
      title={rotina.nome}
      subtitle={rotina.descricao}
      breadcrumb={[
        { label: 'Rotinas', href: '/rotinas' },
        { label: rotina.nome }
      ]}
      darkMode={darkMode}
      actions={
        <Button onClick={onBack} variant="outline" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
      }
    >
      <div className="space-y-6">
        {/* Header da Rotina */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-3">
                  <Target className="h-5 w-5 text-primary" />
                  Informações da Rotina
                </CardTitle>
                <CardDescription>
                  Status e detalhes gerais da execução
                </CardDescription>
              </div>
              {getStatusBadge(rotina.status)}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  Agente
                </div>
                <div className="font-medium">{rotina.agente}</div>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Período
                </div>
                <div className="font-medium">
                  {formatarData(rotina.dataInicio)} - {formatarData(rotina.dataFim)}
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  Horário
                </div>
                <div className="font-medium">
                  {rotina.horaInicio} - {rotina.horaFim}
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4" />
                  Taxa de Sucesso
                </div>
                <div className="font-medium text-green-600">
                  {rotina.metricas.taxaSucesso.toFixed(1)}%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPI
            label="Total de Números"
            value={rotina.totalNumeros.toString()}
            subinfo="Base de contatos"
            icon={<Phone className="w-5 h-5" />}
            state="default"
            darkMode={darkMode}
          />
          <KPI
            label="Ligações Efetuadas"
            value={rotina.ligacoesEfetuadas.toString()}
            subinfo={`${((rotina.ligacoesEfetuadas / rotina.totalNumeros) * 100).toFixed(1)}% do total`}
            icon={<Phone className="w-5 h-5" />}
            state="default"
            darkMode={darkMode}
          />
          <KPI
            label="Sucessos"
            value={rotina.sucessos.toString()}
            subinfo={`${rotina.metricas.taxaSucesso.toFixed(1)}% de sucesso`}
            icon={<CheckCircle className="w-5 h-5" />}
            state="good"
            darkMode={darkMode}
          />
          <KPI
            label="Duração Média"
            value={rotina.metricas.duracaoMedia}
            subinfo={`${rotina.metricas.tentativasMedia} tentativas/contato`}
            icon={<Clock className="w-5 h-5" />}
            state="default"
            darkMode={darkMode}
          />
        </div>

        {/* Processo e Estratégia */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Processo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Objetivo</h4>
                <p className="text-sm text-muted-foreground">{rotina.processo.objetivo}</p>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-medium mb-2">Estratégia</h4>
                <p className="text-sm text-muted-foreground">{rotina.processo.estrategia}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Stack de Atendimento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {rotina.stackAtendimento.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">
                      {index + 1}
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Script Base */}
        <Card>
          <CardHeader>
            <CardTitle>Script Base</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm italic">{rotina.processo.scriptBase}</p>
            </div>
          </CardContent>
        </Card>

        {/* Contexto de Atendimento */}
        <Card>
          <CardHeader>
            <CardTitle>Contexto de Atendimento</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{rotina.contextoAtendimento}</p>
          </CardContent>
        </Card>

        {/* Tabela de Ligações */}
        <Card>
          <CardHeader>
            <CardTitle>Ligações Realizadas ({rotina.ligacoes.length})</CardTitle>
            <CardDescription>
              Histórico completo de todas as ligações desta rotina
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={ligacoesColumns}
              data={rotina.ligacoes}
              darkMode={darkMode}
              searchable={true}
              searchPlaceholder="Buscar por número ou nome..."
            />
          </CardContent>
        </Card>
      </div>

      {/* Modal de Detalhes da Ligação */}
      <Dialog open={!!selectedLigacaoDetalhes} onOpenChange={onCloseLigacaoDetails}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Detalhes da Ligação</DialogTitle>
          </DialogHeader>
          
          {selectedLigacaoDetalhes && (
            <ScrollArea className="max-h-[60vh]">
              <div className="space-y-6 pr-4">
                {/* Informações básicas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Número</label>
                      <p className="text-lg font-mono">{selectedLigacaoDetalhes.numero}</p>
                      {selectedLigacaoDetalhes.nomeContato && (
                        <p className="text-sm text-muted-foreground">{selectedLigacaoDetalhes.nomeContato}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Data e Hora</label>
                      <p>{formatarData(selectedLigacaoDetalhes.dataHora)}</p>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Duração</label>
                      <p>{selectedLigacaoDetalhes.duracao}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Status</label>
                      <div className="mt-1">{getStatusLigacaoBadge(selectedLigacaoDetalhes.status)}</div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Resultado</label>
                      <div className="mt-1">{getResultadoBadge(selectedLigacaoDetalhes.resultado)}</div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Tentativas</label>
                      <p>{selectedLigacaoDetalhes.tentativas}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Métricas */}
                <div>
                  <h4 className="font-medium mb-3">Métricas de Performance</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-primary">{selectedLigacaoDetalhes.metricas.confianca}%</div>
                      <div className="text-sm text-muted-foreground">Confiança</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-primary">{selectedLigacaoDetalhes.metricas.tempoResposta}</div>
                      <div className="text-sm text-muted-foreground">Tempo Resposta</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-lg font-bold text-primary">{selectedLigacaoDetalhes.metricas.sentimento}</div>
                      <div className="text-sm text-muted-foreground">Sentimento</div>
                    </div>
                  </div>
                </div>

                {/* Palavras-chave */}
                {selectedLigacaoDetalhes.metricas.palavrasChave.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-3">Palavras-chave Identificadas</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedLigacaoDetalhes.metricas.palavrasChave.map((palavra, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {palavra}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Observações */}
                {selectedLigacaoDetalhes.observacoes && (
                  <div>
                    <h4 className="font-medium mb-2">Observações</h4>
                    <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                      {selectedLigacaoDetalhes.observacoes}
                    </p>
                  </div>
                )}

                {/* Transcrição */}
                {selectedLigacaoDetalhes.transcricao && (
                  <div>
                    <h4 className="font-medium mb-2">Transcrição da Ligação</h4>
                    <div className="bg-muted p-4 rounded-lg max-h-40 overflow-y-auto">
                      <pre className="text-sm whitespace-pre-wrap font-sans">
                        {selectedLigacaoDetalhes.transcricao}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal de Transcrição */}
      <Dialog open={transcricaoOpen} onOpenChange={setTranscricaoOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              Transcrição - {selectedTranscricao?.numero}
            </DialogTitle>
          </DialogHeader>
          
          {selectedTranscricao && (
            <ScrollArea className="max-h-[60vh]">
              <div className="space-y-4 pr-4">
                <div className="bg-muted p-4 rounded-lg">
                  <pre className="text-sm whitespace-pre-wrap font-sans">
                    {selectedTranscricao.transcricao}
                  </pre>
                </div>
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </PageContainer>
  )
}