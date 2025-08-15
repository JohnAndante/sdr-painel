'use client'

import React, { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Switch } from './ui/switch'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import PageContainer from './PageContainer'
import { ArrowLeft, GripVertical, Edit, Trash2, Plus } from 'lucide-react'
import { MD3_TOKENS } from '../constants/tokens'
import { toast } from 'sonner'

interface NovaRotinaFormProps {
  darkMode: boolean
  isMobile: boolean
  agentesData: any[]
  onCancel: () => void
  onSave: (data: any) => void
}

// Stack padrão do processo de atendimento
const DEFAULT_STACK_ATENDIMENTO = [
  {
    id: 1,
    ordem: 1,
    titulo: 'Preparação (pré-contato)',
    descricao: 'ICP, gatilho/contexto do lead, hipótese de dor',
    conteudo: 'Analisar o perfil do lead, identificar o contexto que gerou o contato e formular hipóteses sobre possíveis dores e necessidades.',
    obrigatorio: true
  },
  {
    id: 2,
    ordem: 2,
    titulo: 'Abertura',
    descricao: 'Se apresenta + pedido de permissão ("tem 30s?")',
    conteudo: 'Olá [Nome], aqui é [Seu Nome] da [Empresa]. Você tem 30 segundos para uma conversa rápida?',
    obrigatorio: true
  },
  {
    id: 3,
    ordem: 3,
    titulo: 'Quebra de gelo/gancho',
    descricao: 'Referência contextual (evento, conteúdo, dor típica)',
    conteudo: 'Vi que você [contexto específico - participou do evento X, baixou o material Y, tem desafio Z]. Isso me chamou atenção porque...',
    obrigatorio: true
  },
  {
    id: 4,
    ordem: 4,
    titulo: 'Enquadramento',
    descricao: 'Por que estou entrando em contato + benefício em 1 frase',
    conteudo: 'Estou entrando em contato porque ajudamos empresas como a sua a [benefício principal em uma frase].',
    obrigatorio: true
  },
  {
    id: 5,
    ordem: 5,
    titulo: 'Descoberta (3–5 perguntas)',
    descricao: 'Desafios, processo atual, impacto, autoridade, prazo',
    conteudo: 'Para entender melhor sua situação: 1) Qual o maior desafio hoje em [área]? 2) Como vocês lidam com isso atualmente? 3) Qual o impacto disso no negócio? 4) Quem toma decisões sobre isso? 5) Há algum prazo específico para resolver?',
    obrigatorio: true
  },
  {
    id: 6,
    ordem: 6,
    titulo: 'Confirmação',
    descricao: 'Resume o que ouviu ("então, hoje vocês…")',
    conteudo: 'Então, se entendi bem, hoje vocês [resumir situação atual] e isso está gerando [impacto mencionado]. É isso mesmo?',
    obrigatorio: true
  },
  {
    id: 7,
    ordem: 7,
    titulo: 'Próximo passo',
    descricao: 'Agenda com AE/demo (2 opções de data/hora)',
    conteudo: 'Acredito que posso te ajudar com isso. Que tal agendar 30 minutos para te mostrar como resolvemos isso para outros clientes? Tenho terça às 14h ou quarta às 10h. Qual funciona melhor?',
    obrigatorio: true
  },
  {
    id: 8,
    ordem: 8,
    titulo: 'Confirmação/encerramento',
    descricao: 'Enviar invite + materiais; combinar follow-up',
    conteudo: 'Perfeito! Vou enviar o convite do calendário agora e alguns materiais para você dar uma olhada antes. Qualquer dúvida, me chama. Até [dia]!',
    obrigatorio: true
  },
  {
    id: 9,
    ordem: 9,
    titulo: 'Pós-contato',
    descricao: 'Registrar no CRM, status, tarefa de follow-up',
    conteudo: 'Registrar resultado da ligação, atualizar status do lead, criar tarefa de follow-up e preparar materiais para envio.',
    obrigatorio: false
  }
]

export default function NovaRotinaForm({
  darkMode,
  isMobile,
  agentesData,
  onCancel,
  onSave
}: NovaRotinaFormProps) {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    agente: '',
    dataInicio: '',
    horaInicio: '',
    dataFim: '',
    horaFim: '',
    numeros: '',
    contextoAtendimento: '',
    stackAtendimento: DEFAULT_STACK_ATENDIMENTO,
    ativo: true
  })

  const [formErrors, setFormErrors] = useState({
    nome: false,
    agente: false,
    numeros: false,
    contextoAtendimento: false
  })

  const colors = darkMode ? MD3_TOKENS.dark : MD3_TOKENS.light
  const primaryColor = colors['sys/primary'] || colors['dark/primary']
  const onPrimaryColor = colors['sys/on-primary'] || colors['dark/on-primary']
  const surfaceColor = colors['sys/surface'] || colors['dark/surface']
  const onSurfaceColor = colors['sys/on-surface'] || colors['dark/on-surface']
  const onSurfaceVariantColor = colors['sys/on-surface-variant'] || colors['dark/outline']
  const errorColor = colors['sys/error'] || colors['dark/error']

  const validateForm = () => {
    const errors = {
      nome: formData.nome.trim() === '',
      agente: formData.agente.trim() === '',
      numeros: formData.numeros.trim() === '',
      contextoAtendimento: formData.contextoAtendimento.trim() === ''
    }
    setFormErrors(errors)
    return !Object.values(errors).some(error => error)
  }

  const handleSave = () => {
    if (!validateForm()) {
      toast.error('Por favor, corrija os erros no formulário')
      return
    }

    const numerosList = formData.numeros.split('\n').filter(n => n.trim()).length
    const rotinaData = {
      ...formData,
      totalNumeros: numerosList,
      ligacoesEfetuadas: 0,
      sucessos: 0,
      falhas: 0,
      status: 'Agendada'
    }

    onSave(rotinaData)
  }

  const handleStackItemEdit = (itemId: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      stackAtendimento: prev.stackAtendimento.map(item =>
        item.id === itemId ? { ...item, [field]: value } : item
      )
    }))
  }

  const handleAddStackItem = () => {
    const newItem = {
      id: Math.max(...formData.stackAtendimento.map(item => item.id)) + 1,
      ordem: formData.stackAtendimento.length + 1,
      titulo: 'Novo passo',
      descricao: 'Descrição do novo passo',
      conteudo: 'Conteúdo do novo passo...',
      obrigatorio: false
    }
    setFormData(prev => ({
      ...prev,
      stackAtendimento: [...prev.stackAtendimento, newItem]
    }))
  }

  const handleRemoveStackItem = (itemId: number) => {
    setFormData(prev => ({
      ...prev,
      stackAtendimento: prev.stackAtendimento.filter(item => item.id !== itemId)
    }))
  }

  return (
    <PageContainer
      title="Nova Rotina"
      subtitle="Criar nova rotina de atendimento por IA"
      breadcrumb={[
        { label: 'Dashboard', href: '#' },
        { label: 'Rotinas', href: '#', onClick: onCancel },
        { label: 'Nova Rotina' }
      ]}
      darkMode={darkMode}
    >
      <div style={{ gap: '32px' }} className="flex flex-col">

        {/* Informações Básicas */}
        <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'}`}>
          {/* Nome da Rotina */}
          <div>
            <Label style={{
              fontSize: '14px',
              lineHeight: '20px',
              fontWeight: '500',
              color: onSurfaceColor,
              marginBottom: '8px',
              display: 'block'
            }}>
              Nome da Rotina *
            </Label>
            <Input
              value={formData.nome}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, nome: e.target.value }))
                if (formErrors.nome) setFormErrors(prev => ({ ...prev, nome: false }))
              }}
              style={{
                borderColor: formErrors.nome ? errorColor : colors['sys/outline'] || colors['dark/outline'],
                minHeight: '48px',
                fontSize: '16px',
                lineHeight: '24px',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.outlineColor = primaryColor}
              placeholder="Digite o nome da rotina"
            />
            {formErrors.nome && (
              <p style={{
                fontSize: '12px',
                lineHeight: '16px',
                color: errorColor,
                marginTop: '4px'
              }}>
                Nome da rotina é obrigatório
              </p>
            )}
          </div>

          {/* Agente Responsável */}
          <div>
            <Label style={{
              fontSize: '14px',
              lineHeight: '20px',
              fontWeight: '500',
              color: onSurfaceColor,
              marginBottom: '8px',
              display: 'block'
            }}>
              Agente Responsável *
            </Label>
            <Select
              value={formData.agente}
              onValueChange={(value) => {
                setFormData(prev => ({ ...prev, agente: value }))
                if (formErrors.agente) setFormErrors(prev => ({ ...prev, agente: false }))
              }}
            >
              <SelectTrigger style={{
                minHeight: '48px',
                fontSize: '16px',
                lineHeight: '24px',
                borderColor: formErrors.agente ? errorColor : colors['sys/outline'] || colors['dark/outline']
              }}>
                <SelectValue placeholder="Selecione o agente" />
              </SelectTrigger>
              <SelectContent>
                {agentesData.filter(a => a.status === 'Ativo').map(agente => (
                  <SelectItem key={agente.id} value={agente.agente}>{agente.agente}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formErrors.agente && (
              <p style={{
                fontSize: '12px',
                lineHeight: '16px',
                color: errorColor,
                marginTop: '4px'
              }}>
                Selecione um agente responsável
              </p>
            )}
          </div>

          {/* Data de Início */}
          <div>
            <Label style={{
              fontSize: '14px',
              lineHeight: '20px',
              fontWeight: '500',
              color: onSurfaceColor,
              marginBottom: '8px',
              display: 'block'
            }}>
              Data de Início
            </Label>
            <Input
              type="date"
              value={formData.dataInicio}
              onChange={(e) => setFormData(prev => ({ ...prev, dataInicio: e.target.value }))}
              style={{
                minHeight: '48px',
                fontSize: '16px',
                lineHeight: '24px',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.outlineColor = primaryColor}
            />
          </div>

          {/* Hora de Início */}
          <div>
            <Label style={{
              fontSize: '14px',
              lineHeight: '20px',
              fontWeight: '500',
              color: onSurfaceColor,
              marginBottom: '8px',
              display: 'block'
            }}>
              Hora de Início
            </Label>
            <Input
              type="time"
              value={formData.horaInicio}
              onChange={(e) => setFormData(prev => ({ ...prev, horaInicio: e.target.value }))}
              style={{
                minHeight: '48px',
                fontSize: '16px',
                lineHeight: '24px',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.outlineColor = primaryColor}
            />
          </div>

          {/* Data de Fim */}
          <div>
            <Label style={{
              fontSize: '14px',
              lineHeight: '20px',
              fontWeight: '500',
              color: onSurfaceColor,
              marginBottom: '8px',
              display: 'block'
            }}>
              Data de Fim
            </Label>
            <Input
              type="date"
              value={formData.dataFim}
              onChange={(e) => setFormData(prev => ({ ...prev, dataFim: e.target.value }))}
              style={{
                minHeight: '48px',
                fontSize: '16px',
                lineHeight: '24px',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.outlineColor = primaryColor}
            />
          </div>

          {/* Hora de Fim */}
          <div>
            <Label style={{
              fontSize: '14px',
              lineHeight: '20px',
              fontWeight: '500',
              color: onSurfaceColor,
              marginBottom: '8px',
              display: 'block'
            }}>
              Hora de Fim
            </Label>
            <Input
              type="time"
              value={formData.horaFim}
              onChange={(e) => setFormData(prev => ({ ...prev, horaFim: e.target.value }))}
              style={{
                minHeight: '48px',
                fontSize: '16px',
                lineHeight: '24px',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.outlineColor = primaryColor}
            />
          </div>
        </div>

        {/* Descrição */}
        <div>
          <Label style={{
            fontSize: '14px',
            lineHeight: '20px',
            fontWeight: '500',
            color: onSurfaceColor,
            marginBottom: '8px',
            display: 'block'
          }}>
            Descrição
          </Label>
          <Textarea
            value={formData.descricao}
            onChange={(e) => setFormData(prev => ({ ...prev, descricao: e.target.value }))}
            rows={3}
            style={{
              fontSize: '16px',
              lineHeight: '24px',
              outline: 'none'
            }}
            onFocus={(e) => e.target.style.outlineColor = primaryColor}
            placeholder="Descreva o objetivo e contexto desta rotina"
          />
        </div>

        {/* Lista de Números */}
        <div>
          <Label style={{
            fontSize: '14px',
            lineHeight: '20px',
            fontWeight: '500',
            color: onSurfaceColor,
            marginBottom: '8px',
            display: 'block'
          }}>
            Lista de Números *
          </Label>
          <Textarea
            value={formData.numeros}
            onChange={(e) => {
              setFormData(prev => ({ ...prev, numeros: e.target.value }))
              if (formErrors.numeros) setFormErrors(prev => ({ ...prev, numeros: false }))
            }}
            rows={6}
            style={{
              borderColor: formErrors.numeros ? errorColor : colors['sys/outline'] || colors['dark/outline'],
              fontSize: '16px',
              lineHeight: '24px',
              outline: 'none'
            }}
            onFocus={(e) => e.target.style.outlineColor = primaryColor}
            placeholder="Digite um número por linha:&#10;+55 11 99999-0001&#10;+55 11 99999-0002&#10;+55 11 99999-0003"
          />
          {formErrors.numeros && (
            <p style={{
              fontSize: '12px',
              lineHeight: '16px',
              color: errorColor,
              marginTop: '4px'
            }}>
              Lista de números é obrigatória
            </p>
          )}
          <p style={{
            fontSize: '12px',
            lineHeight: '16px',
            color: onSurfaceVariantColor,
            marginTop: '4px'
          }}>
            Digite um número de telefone por linha
          </p>
        </div>

        {/* Contexto do Atendimento */}
        <div>
          <Label style={{
            fontSize: '14px',
            lineHeight: '20px',
            fontWeight: '500',
            color: onSurfaceColor,
            marginBottom: '8px',
            display: 'block'
          }}>
            Contexto do Atendimento *
          </Label>
          <Textarea
            value={formData.contextoAtendimento}
            onChange={(e) => {
              setFormData(prev => ({ ...prev, contextoAtendimento: e.target.value }))
              if (formErrors.contextoAtendimento) setFormErrors(prev => ({ ...prev, contextoAtendimento: false }))
            }}
            rows={4}
            style={{
              borderColor: formErrors.contextoAtendimento ? errorColor : colors['sys/outline'] || colors['dark/outline'],
              fontSize: '16px',
              lineHeight: '24px',
              outline: 'none'
            }}
            onFocus={(e) => e.target.style.outlineColor = primaryColor}
            placeholder="Descreva o perfil do cliente, contexto do negócio, características do público-alvo e informações relevantes para personalizar o atendimento..."
          />
          {formErrors.contextoAtendimento && (
            <p style={{
              fontSize: '12px',
              lineHeight: '16px',
              color: errorColor,
              marginTop: '4px'
            }}>
              Contexto do atendimento é obrigatório
            </p>
          )}
          <p style={{
            fontSize: '12px',
            lineHeight: '16px',
            color: onSurfaceVariantColor,
            marginTop: '4px'
          }}>
            Estas informações ajudarão a IA a personalizar o atendimento para o tipo específico de cliente
          </p>
        </div>

        {/* Stack do Processo de Atendimento */}
        <div>
          <Label style={{
            fontSize: '16px',
            lineHeight: '24px',
            fontWeight: '500',
            color: onSurfaceColor,
            marginBottom: '16px',
            display: 'block'
          }}>
            Stack do Processo de Atendimento
          </Label>
          <p style={{
            fontSize: '12px',
            lineHeight: '16px',
            color: onSurfaceVariantColor,
            marginBottom: '16px'
          }}>
            Configure o fluxo de conversação que o agente seguirá durante as ligações. Você pode editar o conteúdo e reorganizar a ordem dos passos.
          </p>

          <div className="space-y-4">
            {formData.stackAtendimento.map((item, index) => (
              <Card key={item.id} style={{ backgroundColor: colors['sys/surface-variant'] || colors['dark/surface-variant'] }}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex items-center justify-center w-8 h-8 rounded-full"
                        style={{
                          backgroundColor: primaryColor,
                          color: onPrimaryColor,
                          fontSize: '12px',
                          fontWeight: '500'
                        }}
                      >
                        {item.ordem}
                      </div>
                      <div className="flex-1">
                        <input
                          value={item.titulo}
                          onChange={(e) => handleStackItemEdit(item.id, 'titulo', e.target.value)}
                          style={{
                            fontSize: '14px',
                            fontWeight: '500',
                            color: onSurfaceColor,
                            background: 'transparent',
                            border: 'none',
                            outline: 'none',
                            width: '100%'
                          }}
                        />
                        <input
                          value={item.descricao}
                          onChange={(e) => handleStackItemEdit(item.id, 'descricao', e.target.value)}
                          style={{
                            fontSize: '12px',
                            color: onSurfaceVariantColor,
                            background: 'transparent',
                            border: 'none',
                            outline: 'none',
                            width: '100%',
                            marginTop: '2px'
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <GripVertical className="w-4 h-4" style={{ color: onSurfaceVariantColor, cursor: 'grab' }} />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveStackItem(item.id)}
                        disabled={item.obrigatorio}
                        style={{ minWidth: '32px', minHeight: '32px', padding: '4px' }}
                      >
                        <Trash2 className="w-3 h-3" style={{ color: item.obrigatorio ? onSurfaceVariantColor : errorColor }} />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <Textarea
                    value={item.conteudo}
                    onChange={(e) => handleStackItemEdit(item.id, 'conteudo', e.target.value)}
                    rows={3}
                    style={{
                      fontSize: '14px',
                      lineHeight: '20px',
                      color: onSurfaceColor,
                      background: 'transparent',
                      border: `1px solid ${colors['sys/outline'] || colors['dark/outline']}`,
                      borderRadius: '8px',
                      padding: '8px',
                      width: '100%',
                      outline: 'none'
                    }}
                    onFocus={(e) => e.target.style.outlineColor = primaryColor}
                  />
                </CardContent>
              </Card>
            ))}

            <Button
              variant="outline"
              onClick={handleAddStackItem}
              style={{
                minHeight: '48px',
                borderColor: primaryColor,
                color: primaryColor,
                borderStyle: 'dashed'
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Passo
            </Button>
          </div>
        </div>

        {/* Ativo */}
        <div className="flex items-center gap-3">
          <Switch
            checked={formData.ativo}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, ativo: checked }))}
            style={{ outline: 'none' }}
            onFocus={(e) => e.target.style.outline = `2px solid ${primaryColor}`}
          />
          <Label style={{
            fontSize: '14px',
            lineHeight: '20px',
            fontWeight: '500',
            color: onSurfaceColor
          }}>
            Ativo
          </Label>
        </div>

        {/* Footer Actions */}
        <div
          className={`sticky bottom-0 flex gap-3 p-6 ${isMobile ? 'flex-col' : 'justify-end'}`}
          style={{
            backgroundColor: surfaceColor,
            borderTop: `1px solid ${colors['sys/outline'] || colors['dark/outline']}`,
            marginLeft: '-24px',
            marginRight: '-24px',
            marginBottom: '-24px'
          }}
        >
          <Button
            variant="ghost"
            onClick={onCancel}
            style={{
              color: primaryColor,
              borderRadius: '12px',
              fontSize: '16px',
              lineHeight: '24px',
              fontWeight: '500',
              minHeight: '48px',
              outline: 'none'
            }}
            onFocus={(e) => e.target.style.outline = `2px solid ${primaryColor}`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
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
            Criar Rotina
          </Button>
        </div>
      </div>
    </PageContainer>
  )
}
