'use client'

import React, { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Slider } from './ui/slider'
import { Switch } from './ui/switch'
import PageContainer from './PageContainer'
import { ArrowLeft, X } from 'lucide-react'
import { MD3_TOKENS } from '../constants/tokens'
import { toast } from 'sonner'

interface NovoAgenteFormProps {
  darkMode: boolean
  isMobile: boolean
  onCancel: () => void
  onSave: (data: any) => void
}

export default function NovoAgenteForm({ darkMode, isMobile, onCancel, onSave }: NovoAgenteFormProps) {
  const [formData, setFormData] = useState({
    nome: '',
    funcao: '',
    persona: '',
    modeloVoz: '',
    idioma: '',
    tom: [50],
    velocidadeFala: [50],
    deteccaoSilencio: '',
    horaInicio: '',
    horaFim: '',
    owner: '',
    tags: [] as string[],
    ativo: true
  })

  const [formErrors, setFormErrors] = useState({
    nome: false,
    persona: false
  })

  const [currentTag, setCurrentTag] = useState('')

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
      persona: formData.persona.trim().length < 20
    }
    setFormErrors(errors)
    return !errors.nome && !errors.persona
  }

  const handleSave = () => {
    if (!validateForm()) {
      toast.error('Por favor, corrija os erros no formulário')
      return
    }
    onSave(formData)
  }

  const handleAddTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }))
      setCurrentTag('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  return (
    <PageContainer
      title="Novo Agente"
      subtitle="Criar novo agente de IA para atendimento"
      breadcrumb={[
        { label: 'Dashboard', href: '#' },
        { label: 'Agentes', href: '#', onClick: onCancel },
        { label: 'Novo Agente' }
      ]}
      darkMode={darkMode}
    >
      <div style={{ gap: '32px' }} className="flex flex-col">
        <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'}`}>
          {/* Nome */}
          <div>
            <Label style={{
              fontSize: '14px',
              lineHeight: '20px',
              fontWeight: '500',
              color: onSurfaceColor,
              marginBottom: '8px',
              display: 'block'
            }}>
              Nome *
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
              placeholder="Digite o nome do agente"
            />
            {formErrors.nome && (
              <p style={{
                fontSize: '12px',
                lineHeight: '16px',
                color: errorColor,
                marginTop: '4px'
              }}>
                Nome é obrigatório
              </p>
            )}
          </div>

          {/* Função */}
          <div>
            <Label style={{
              fontSize: '14px',
              lineHeight: '20px',
              fontWeight: '500',
              color: onSurfaceColor,
              marginBottom: '8px',
              display: 'block'
            }}>
              Função
            </Label>
            <Select value={formData.funcao} onValueChange={(value) => setFormData(prev => ({ ...prev, funcao: value }))}>
              <SelectTrigger style={{ minHeight: '48px', fontSize: '16px', lineHeight: '24px' }}>
                <SelectValue placeholder="Selecione a função" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SDR">SDR</SelectItem>
                <SelectItem value="Vendas">Vendas</SelectItem>
                <SelectItem value="Suporte">Suporte</SelectItem>
                <SelectItem value="Cobrança">Cobrança</SelectItem>
                <SelectItem value="Custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Modelo de voz */}
          <div>
            <Label style={{
              fontSize: '14px',
              lineHeight: '20px',
              fontWeight: '500',
              color: onSurfaceColor,
              marginBottom: '8px',
              display: 'block'
            }}>
              Modelo de voz
            </Label>
            <Select value={formData.modeloVoz} onValueChange={(value) => setFormData(prev => ({ ...prev, modeloVoz: value }))}>
              <SelectTrigger style={{ minHeight: '48px', fontSize: '16px', lineHeight: '24px' }}>
                <SelectValue placeholder="Selecione o modelo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nova">Nova</SelectItem>
                <SelectItem value="alloy">Alloy</SelectItem>
                <SelectItem value="echo">Echo</SelectItem>
                <SelectItem value="fable">Fable</SelectItem>
                <SelectItem value="onyx">Onyx</SelectItem>
                <SelectItem value="shimmer">Shimmer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Idioma */}
          <div>
            <Label style={{
              fontSize: '14px',
              lineHeight: '20px',
              fontWeight: '500',
              color: onSurfaceColor,
              marginBottom: '8px',
              display: 'block'
            }}>
              Idioma
            </Label>
            <Select value={formData.idioma} onValueChange={(value) => setFormData(prev => ({ ...prev, idioma: value }))}>
              <SelectTrigger style={{ minHeight: '48px', fontSize: '16px', lineHeight: '24px' }}>
                <SelectValue placeholder="Selecione o idioma" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pt-BR">Português (BR)</SelectItem>
                <SelectItem value="en-US">English (US)</SelectItem>
                <SelectItem value="es-ES">Español</SelectItem>
                <SelectItem value="fr-FR">Français</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tom */}
          <div>
            <Label style={{
              fontSize: '14px',
              lineHeight: '20px',
              fontWeight: '500',
              color: onSurfaceColor,
              marginBottom: '8px',
              display: 'block'
            }}>
              Tom: {formData.tom[0]}%
            </Label>
            <Slider
              value={formData.tom}
              onValueChange={(value) => setFormData(prev => ({ ...prev, tom: value }))}
              max={100}
              step={1}
              style={{ minHeight: '48px' }}
            />
          </div>

          {/* Velocidade de fala */}
          <div>
            <Label style={{
              fontSize: '14px',
              lineHeight: '20px',
              fontWeight: '500',
              color: onSurfaceColor,
              marginBottom: '8px',
              display: 'block'
            }}>
              Velocidade de fala: {formData.velocidadeFala[0]}%
            </Label>
            <Slider
              value={formData.velocidadeFala}
              onValueChange={(value) => setFormData(prev => ({ ...prev, velocidadeFala: value }))}
              max={100}
              step={1}
              style={{ minHeight: '48px' }}
            />
          </div>

          {/* Detecção de silêncio */}
          <div>
            <Label style={{
              fontSize: '14px',
              lineHeight: '20px',
              fontWeight: '500',
              color: onSurfaceColor,
              marginBottom: '8px',
              display: 'block'
            }}>
              Detecção de silêncio (ms)
            </Label>
            <Input
              type="number"
              value={formData.deteccaoSilencio}
              onChange={(e) => setFormData(prev => ({ ...prev, deteccaoSilencio: e.target.value }))}
              style={{
                minHeight: '48px',
                fontSize: '16px',
                lineHeight: '24px',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.outlineColor = primaryColor}
              placeholder="2000"
            />
          </div>

          {/* Owner */}
          <div>
            <Label style={{
              fontSize: '14px',
              lineHeight: '20px',
              fontWeight: '500',
              color: onSurfaceColor,
              marginBottom: '8px',
              display: 'block'
            }}>
              Owner
            </Label>
            <Select value={formData.owner} onValueChange={(value) => setFormData(prev => ({ ...prev, owner: value }))}>
              <SelectTrigger style={{ minHeight: '48px', fontSize: '16px', lineHeight: '24px' }}>
                <SelectValue placeholder="Selecione o responsável" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Administrador</SelectItem>
                <SelectItem value="user1">João Silva</SelectItem>
                <SelectItem value="user2">Maria Santos</SelectItem>
                <SelectItem value="user3">Pedro Costa</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Persona - Full width */}
        <div>
          <Label style={{
            fontSize: '14px',
            lineHeight: '20px',
            fontWeight: '500',
            color: onSurfaceColor,
            marginBottom: '8px',
            display: 'block'
          }}>
            Persona *
          </Label>
          <Textarea
            value={formData.persona}
            onChange={(e) => {
              setFormData(prev => ({ ...prev, persona: e.target.value }))
              if (formErrors.persona) setFormErrors(prev => ({ ...prev, persona: false }))
            }}
            rows={4}
            style={{
              borderColor: formErrors.persona ? errorColor : colors['sys/outline'] || colors['dark/outline'],
              fontSize: '16px',
              lineHeight: '24px',
              outline: 'none'
            }}
            onFocus={(e) => e.target.style.outlineColor = primaryColor}
            placeholder="Descreva a personalidade e comportamento do agente (mínimo 20 caracteres)"
          />
          {formErrors.persona && (
            <p style={{
              fontSize: '12px',
              lineHeight: '16px',
              color: errorColor,
              marginTop: '4px'
            }}>
              Persona deve ter pelo menos 20 caracteres
            </p>
          )}
        </div>

        {/* Janela de trabalho */}
        <div>
          <Label style={{
            fontSize: '14px',
            lineHeight: '20px',
            fontWeight: '500',
            color: onSurfaceColor,
            marginBottom: '8px',
            display: 'block'
          }}>
            Janela de trabalho
          </Label>
          <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
            <div>
              <Label style={{
                fontSize: '12px',
                lineHeight: '16px',
                fontWeight: '400',
                color: onSurfaceVariantColor,
                marginBottom: '4px',
                display: 'block'
              }}>
                Início
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
            <div>
              <Label style={{
                fontSize: '12px',
                lineHeight: '16px',
                fontWeight: '400',
                color: onSurfaceVariantColor,
                marginBottom: '4px',
                display: 'block'
              }}>
                Fim
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
        </div>

        {/* Tags */}
        <div>
          <Label style={{
            fontSize: '14px',
            lineHeight: '20px',
            fontWeight: '500',
            color: onSurfaceColor,
            marginBottom: '8px',
            display: 'block'
          }}>
            Tags
          </Label>
          <div className="flex gap-2 mb-2">
            <Input
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
              style={{
                minHeight: '48px',
                fontSize: '16px',
                lineHeight: '24px',
                outline: 'none',
                flex: 1
              }}
              onFocus={(e) => e.target.style.outlineColor = primaryColor}
              placeholder="Digite uma tag e pressione Enter"
            />
            <Button
              type="button"
              onClick={handleAddTag}
              variant="outline"
              style={{
                minHeight: '48px',
                borderColor: primaryColor,
                color: primaryColor,
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.outline = `2px solid ${primaryColor}`}
            >
              Adicionar
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag, index) => (
              <div
                key={index}
                className="flex items-center gap-1 px-3 py-1 rounded-lg"
                style={{
                  backgroundColor: colors['sys/primary-container'] || colors['dark/surface-variant'],
                  color: colors['sys/on-primary-container'] || colors['dark/on-surface'],
                  fontSize: '14px',
                  lineHeight: '20px'
                }}
              >
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="hover:opacity-70 transition-opacity"
                  style={{ minWidth: '16px', minHeight: '16px' }}
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
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
            Salvar
          </Button>
        </div>
      </div>
    </PageContainer>
  )
}
