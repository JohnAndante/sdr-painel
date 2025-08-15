'use client'

import React, { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Slider } from './ui/slider'
import { Switch } from './ui/switch'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import DialogBase from './DialogBase'
import { X } from 'lucide-react'
import { toast } from 'sonner'

interface AgenteFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  agente?: any
  darkMode?: boolean
}

const MD3_TOKENS = {
  light: {
    'sys/surface': '#FFFFFF',
    'sys/on-surface': '#100E34',
    'sys/surface-variant': '#F5F6FB',
    'sys/on-surface-variant': '#3F4151',
    'sys/primary': '#4F48EC',
    'sys/on-primary': '#FFFFFF',
    'sys/primary-container': '#E7E9FF',
    'sys/on-primary-container': '#100E34',
    'sys/outline': '#C7CAD6',
    'sys/error': '#B3261E',
    'sys/on-error': '#FFFFFF',
    'sys/error-container': '#F9DEDC',
    'sys/on-error-container': '#410E0B'
  },
  dark: {
    'dark/surface': '#0E0D18',
    'dark/on-surface': '#E3E5F0',
    'dark/surface-variant': '#2B2D3A',
    'dark/outline': '#8B8FA1',
    'dark/primary': '#BFC2FF',
    'dark/on-primary': '#100E34'
  }
}

export default function AgenteForm({ open, onOpenChange, agente, darkMode = false }: AgenteFormProps) {
  const colors = darkMode ? MD3_TOKENS.dark : MD3_TOKENS.light
  const [formData, setFormData] = useState({
    nome: agente?.nome || '',
    funcao: agente?.funcao || '',
    persona: agente?.persona || '',
    modeloVoz: agente?.modeloVoz || '',
    idioma: agente?.idioma || 'pt-BR',
    tom: agente?.tom || [50],
    velocidadeFala: agente?.velocidadeFala || [50],
    deteccaoSilencio: agente?.deteccaoSilencio || '3000',
    inicioJanela: agente?.inicioJanela || '09:00',
    fimJanela: agente?.fimJanela || '18:00',
    owner: agente?.owner || '',
    tags: agente?.tags || [],
    ativo: agente?.ativo || true
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [newTag, setNewTag] = useState('')

  const surfaceColor = darkMode ? colors['dark/surface'] : colors['sys/surface']
  const onSurfaceColor = darkMode ? colors['dark/on-surface'] : colors['sys/on-surface']
  const onSurfaceVariantColor = darkMode ? colors['dark/outline'] : colors['sys/on-surface-variant']
  const primaryColor = darkMode ? colors['dark/primary'] : colors['sys/primary']
  const onPrimaryColor = darkMode ? colors['dark/on-primary'] : colors['sys/on-primary']
  const surfaceVariantColor = darkMode ? colors['dark/surface-variant'] : colors['sys/surface-variant']
  const outlineColor = darkMode ? colors['dark/outline'] : colors['sys/outline']
  const errorColor = darkMode ? colors['dark/outline'] : colors['sys/error']

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((tag: string) => tag !== tagToRemove)
    }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório'
    }

    if (formData.persona.length < 20) {
      newErrors.persona = 'Persona deve ter pelo menos 20 caracteres'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (!validateForm()) return

    toast.success(agente ? 'Agente atualizado com sucesso!' : 'Agente criado com sucesso!')
    onOpenChange(false)
  }

  const handleCancel = () => {
    onOpenChange(false)
  }

  return (
    <DialogBase
      open={open}
      onOpenChange={onOpenChange}
      title={agente ? 'Editar Agente' : 'Criar Agente'}
      description="Configure as propriedades e comportamento do agente"
      maxWidth="600px"
      darkMode={darkMode}
      actions={
        <>
          <Button
            variant="ghost"
            onClick={handleCancel}
            style={{
              color: primaryColor,
              borderRadius: '12px',
              fontSize: '16px',
              lineHeight: '24px',
              fontWeight: '500',
              minHeight: '48px'
            }}
          >
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
              minHeight: '48px'
            }}
          >
            Salvar
          </Button>
        </>
      }
    >
      <div className="space-y-6" style={{ fontFamily: 'Roboto Flex, Roboto, sans-serif' }}>
        {/* Nome */}
        <div>
          <Label
            htmlFor="nome"
            style={{
              fontSize: '14px',
              lineHeight: '20px',
              fontWeight: '500',
              color: onSurfaceColor
            }}
          >
            Nome *
          </Label>
          <Input
            id="nome"
            value={formData.nome}
            onChange={(e) => handleInputChange('nome', e.target.value)}
            placeholder="Nome do agente"
            className="mt-2"
            style={{
              backgroundColor: surfaceVariantColor,
              border: errors.nome ? `1px solid ${errorColor}` : `1px solid ${outlineColor}`,
              borderRadius: '12px',
              fontSize: '16px',
              color: onSurfaceColor,
              minHeight: '48px'
            }}
          />
          {errors.nome && (
            <p style={{ color: errorColor, fontSize: '12px', marginTop: '4px' }}>
              {errors.nome}
            </p>
          )}
        </div>

        {/* Função */}
        <div>
          <Label
            style={{
              fontSize: '14px',
              lineHeight: '20px',
              fontWeight: '500',
              color: onSurfaceColor
            }}
          >
            Função
          </Label>
          <Select value={formData.funcao} onValueChange={(value) => handleInputChange('funcao', value)}>
            <SelectTrigger
              className="mt-2"
              style={{
                backgroundColor: surfaceVariantColor,
                border: `1px solid ${outlineColor}`,
                borderRadius: '12px',
                fontSize: '16px',
                color: onSurfaceColor,
                minHeight: '48px'
              }}
            >
              <SelectValue placeholder="Selecione a função" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sdr">SDR</SelectItem>
              <SelectItem value="vendas">Vendas</SelectItem>
              <SelectItem value="suporte">Suporte</SelectItem>
              <SelectItem value="cobranca">Cobrança</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Persona */}
        <div>
          <Label
            htmlFor="persona"
            style={{
              fontSize: '14px',
              lineHeight: '20px',
              fontWeight: '500',
              color: onSurfaceColor
            }}
          >
            Persona * (mín. 20 caracteres)
          </Label>
          <Textarea
            id="persona"
            value={formData.persona}
            onChange={(e) => handleInputChange('persona', e.target.value)}
            placeholder="Descreva a personalidade e comportamento do agente..."
            rows={4}
            className="mt-2 resize-none"
            style={{
              backgroundColor: surfaceVariantColor,
              border: errors.persona ? `1px solid ${errorColor}` : `1px solid ${outlineColor}`,
              borderRadius: '12px',
              fontSize: '16px',
              color: onSurfaceColor
            }}
          />
          <div className="flex justify-between mt-1">
            {errors.persona && (
              <p style={{ color: errorColor, fontSize: '12px' }}>
                {errors.persona}
              </p>
            )}
            <p style={{ color: onSurfaceVariantColor, fontSize: '12px' }}>
              {formData.persona.length}/200
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Modelo de Voz */}
          <div>
            <Label
              style={{
                fontSize: '14px',
                lineHeight: '20px',
                fontWeight: '500',
                color: onSurfaceColor
              }}
            >
              Modelo de Voz
            </Label>
            <Select value={formData.modeloVoz} onValueChange={(value) => handleInputChange('modeloVoz', value)}>
              <SelectTrigger
                className="mt-2"
                style={{
                  backgroundColor: surfaceVariantColor,
                  border: `1px solid ${outlineColor}`,
                  borderRadius: '12px',
                  fontSize: '16px',
                  color: onSurfaceColor,
                  minHeight: '48px'
                }}
              >
                <SelectValue placeholder="Selecione o modelo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="feminino-1">Feminino 1</SelectItem>
                <SelectItem value="feminino-2">Feminino 2</SelectItem>
                <SelectItem value="masculino-1">Masculino 1</SelectItem>
                <SelectItem value="masculino-2">Masculino 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Idioma */}
          <div>
            <Label
              style={{
                fontSize: '14px',
                lineHeight: '20px',
                fontWeight: '500',
                color: onSurfaceColor
              }}
            >
              Idioma
            </Label>
            <Select value={formData.idioma} onValueChange={(value) => handleInputChange('idioma', value)}>
              <SelectTrigger
                className="mt-2"
                style={{
                  backgroundColor: surfaceVariantColor,
                  border: `1px solid ${outlineColor}`,
                  borderRadius: '12px',
                  fontSize: '16px',
                  color: onSurfaceColor,
                  minHeight: '48px'
                }}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pt-BR">Português (BR)</SelectItem>
                <SelectItem value="en-US">English (US)</SelectItem>
                <SelectItem value="es-ES">Español</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tom e Velocidade */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label
              style={{
                fontSize: '14px',
                lineHeight: '20px',
                fontWeight: '500',
                color: onSurfaceColor
              }}
            >
              Tom ({formData.tom[0]}/100)
            </Label>
            <Slider
              value={formData.tom}
              onValueChange={(value) => handleInputChange('tom', value)}
              max={100}
              min={0}
              step={1}
              className="mt-3"
            />
          </div>
          <div>
            <Label
              style={{
                fontSize: '14px',
                lineHeight: '20px',
                fontWeight: '500',
                color: onSurfaceColor
              }}
            >
              Velocidade de fala ({formData.velocidadeFala[0]}/100)
            </Label>
            <Slider
              value={formData.velocidadeFala}
              onValueChange={(value) => handleInputChange('velocidadeFala', value)}
              max={100}
              min={0}
              step={1}
              className="mt-3"
            />
          </div>
        </div>

        {/* Detecção de silêncio */}
        <div>
          <Label
            htmlFor="deteccaoSilencio"
            style={{
              fontSize: '14px',
              lineHeight: '20px',
              fontWeight: '500',
              color: onSurfaceColor
            }}
          >
            Detecção de silêncio (ms)
          </Label>
          <Input
            id="deteccaoSilencio"
            type="number"
            value={formData.deteccaoSilencio}
            onChange={(e) => handleInputChange('deteccaoSilencio', e.target.value)}
            placeholder="3000"
            className="mt-2"
            style={{
              backgroundColor: surfaceVariantColor,
              border: `1px solid ${outlineColor}`,
              borderRadius: '12px',
              fontSize: '16px',
              color: onSurfaceColor,
              minHeight: '48px'
            }}
          />
        </div>

        {/* Janela de trabalho */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label
              htmlFor="inicioJanela"
              style={{
                fontSize: '14px',
                lineHeight: '20px',
                fontWeight: '500',
                color: onSurfaceColor
              }}
            >
              Início da janela
            </Label>
            <Input
              id="inicioJanela"
              type="time"
              value={formData.inicioJanela}
              onChange={(e) => handleInputChange('inicioJanela', e.target.value)}
              className="mt-2"
              style={{
                backgroundColor: surfaceVariantColor,
                border: `1px solid ${outlineColor}`,
                borderRadius: '12px',
                fontSize: '16px',
                color: onSurfaceColor,
                minHeight: '48px'
              }}
            />
          </div>
          <div>
            <Label
              htmlFor="fimJanela"
              style={{
                fontSize: '14px',
                lineHeight: '20px',
                fontWeight: '500',
                color: onSurfaceColor
              }}
            >
              Fim da janela
            </Label>
            <Input
              id="fimJanela"
              type="time"
              value={formData.fimJanela}
              onChange={(e) => handleInputChange('fimJanela', e.target.value)}
              className="mt-2"
              style={{
                backgroundColor: surfaceVariantColor,
                border: `1px solid ${outlineColor}`,
                borderRadius: '12px',
                fontSize: '16px',
                color: onSurfaceColor,
                minHeight: '48px'
              }}
            />
          </div>
        </div>

        {/* Owner */}
        <div>
          <Label
            style={{
              fontSize: '14px',
              lineHeight: '20px',
              fontWeight: '500',
              color: onSurfaceColor
            }}
          >
            Owner
          </Label>
          <Select value={formData.owner} onValueChange={(value) => handleInputChange('owner', value)}>
            <SelectTrigger
              className="mt-2"
              style={{
                backgroundColor: surfaceVariantColor,
                border: `1px solid ${outlineColor}`,
                borderRadius: '12px',
                fontSize: '16px',
                color: onSurfaceColor,
                minHeight: '48px'
              }}
            >
              <SelectValue placeholder="Selecione o responsável" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Administrador</SelectItem>
              <SelectItem value="joao">João Silva</SelectItem>
              <SelectItem value="maria">Maria Santos</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tags */}
        <div>
          <Label
            style={{
              fontSize: '14px',
              lineHeight: '20px',
              fontWeight: '500',
              color: onSurfaceColor
            }}
          >
            Tags
          </Label>
          <div className="flex gap-2 mt-2">
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Digite uma tag"
              onKeyPress={(e) => e.key === 'Enter' && addTag()}
              className="flex-1"
              style={{
                backgroundColor: surfaceVariantColor,
                border: `1px solid ${outlineColor}`,
                borderRadius: '12px',
                fontSize: '16px',
                color: onSurfaceColor,
                minHeight: '48px'
              }}
            />
            <Button
              type="button"
              onClick={addTag}
              variant="outline"
              style={{
                borderColor: outlineColor,
                color: onSurfaceColor,
                borderRadius: '12px',
                minHeight: '48px'
              }}
            >
              Adicionar
            </Button>
          </div>
          {formData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {formData.tags.map((tag: string) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="px-3 py-1 flex items-center gap-2"
                  style={{
                    backgroundColor: surfaceVariantColor,
                    color: onSurfaceColor,
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                >
                  {tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="ml-1 hover:bg-opacity-20 hover:bg-gray-500 rounded"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Ativo */}
        <div className="flex items-center justify-between">
          <Label
            style={{
              fontSize: '14px',
              lineHeight: '20px',
              fontWeight: '500',
              color: onSurfaceColor
            }}
          >
            Agente Ativo
          </Label>
          <Switch
            checked={formData.ativo}
            onCheckedChange={(checked) => handleInputChange('ativo', checked)}
          />
        </div>
      </div>
    </DialogBase>
  )
}
