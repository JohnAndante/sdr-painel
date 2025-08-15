'use client'

import React, { useState } from 'react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Checkbox } from '../components/ui/checkbox'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Avatar, AvatarFallback } from '../components/ui/avatar'
import { Switch } from '../components/ui/switch'
import { Separator } from '../components/ui/separator'
import { Alert, AlertDescription } from '../components/ui/alert'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog'
import { toast } from 'sonner'
import { Eye, EyeOff, Search, Settings, CheckCircle, AlertCircle, Info } from 'lucide-react'

export default function Guidelines() {
  const [darkMode, setDarkMode] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [checkedItems, setCheckedItems] = useState({ checkbox1: false, radio1: false })
  const [switchValue, setSwitchValue] = useState(false)

  const colorTokens = {
    light: {
      'sys/primary': '#4F48EC',
      'sys/on-primary': '#FFFFFF',
      'sys/primary-container': '#E7E9FF',
      'sys/on-primary-container': '#100E34',
      'sys/secondary': '#FFBF18',
      'sys/on-secondary': '#100E34',
      'sys/secondary-container': '#FFF4D6',
      'sys/on-secondary-container': '#100E34',
      'sys/tertiary': '#100E34',
      'sys/on-tertiary': '#FFFFFF',
      'sys/surface': '#FFFFFF',
      'sys/on-surface': '#100E34',
      'sys/surface-variant': '#F5F6FB',
      'sys/on-surface-variant': '#3F4151',
      'sys/outline': '#C7CAD6',
      'sys/error': '#B3261E',
      'sys/on-error': '#FFFFFF',
      'sys/error-container': '#F9DEDC',
      'sys/on-error-container': '#410E0B'
    },
    dark: {
      'dark/surface': '#0E0D18',
      'dark/on-surface': '#E3E5F0',
      'dark/primary': '#BFC2FF',
      'dark/on-primary': '#100E34',
      'dark/secondary': '#FFD671',
      'dark/on-secondary': '#100E34',
      'dark/tertiary': '#2A2740',
      'dark/on-tertiary': '#E3E5F0',
      'dark/surface-variant': '#2B2D3A',
      'dark/outline': '#8B8FA1'
    }
  }

  const typographyTokens = [
    { name: 'type/display/large', size: '57px', lineHeight: '64px', weight: '400' },
    { name: 'type/display/medium', size: '45px', lineHeight: '52px', weight: '400' },
    { name: 'type/display/small', size: '36px', lineHeight: '44px', weight: '400' },
    { name: 'type/headline/large', size: '32px', lineHeight: '40px', weight: '400' },
    { name: 'type/headline/medium', size: '28px', lineHeight: '36px', weight: '400' },
    { name: 'type/headline/small', size: '24px', lineHeight: '32px', weight: '400' },
    { name: 'type/title/large', size: '22px', lineHeight: '28px', weight: '500' },
    { name: 'type/title/medium', size: '16px', lineHeight: '24px', weight: '500' },
    { name: 'type/title/small', size: '14px', lineHeight: '20px', weight: '500' },
    { name: 'type/label/large', size: '14px', lineHeight: '20px', weight: '500' },
    { name: 'type/label/medium', size: '12px', lineHeight: '16px', weight: '500' },
    { name: 'type/label/small', size: '11px', lineHeight: '16px', weight: '500' },
    { name: 'type/body/large', size: '16px', lineHeight: '24px', weight: '400' },
    { name: 'type/body/medium', size: '14px', lineHeight: '20px', weight: '400' },
    { name: 'type/body/small', size: '12px', lineHeight: '16px', weight: '400' }
  ]

  const spacingTokens = [4, 8, 12, 16, 20, 24, 32, 40, 48, 64]
  const radiusTokens = { xs: 4, sm: 8, md: 12, lg: 16, xl: 28, '2xl': 32 }
  const elevationTokens = ['e1', 'e2', 'e3', 'e4', 'e5']

  const buttonStates = ['default', 'hover', 'focus', 'pressed', 'disabled']
  const textFieldStates = ['default', 'focus', 'error', 'disabled']

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-[#0E0D18] text-[#E3E5F0]' : 'bg-[#FFFFFF] text-[#100E34]'}`}>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-medium mb-2" style={{ fontFamily: 'Roboto Flex, Roboto, sans-serif' }}>
              Material Design 3 Guidelines
            </h1>
            <p className="text-lg opacity-80">Sistema de design completo com tokens e componentes</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm">Modo Escuro</span>
            <Switch
              checked={darkMode}
              onCheckedChange={setDarkMode}
            />
          </div>
        </div>

        {/* 1.1 Variáveis de Cor - Light */}
        <section className="mb-12">
          <h2 className="text-2xl font-medium mb-6" style={{ fontFamily: 'Roboto Flex, Roboto, sans-serif' }}>
            1.1 Variáveis de Cor (Light)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Object.entries(colorTokens.light).map(([name, color]) => (
              <div key={name} className="border border-gray-200 rounded-lg p-4">
                <div
                  className="w-full h-16 rounded-md mb-3 border border-gray-200"
                  style={{ backgroundColor: color }}
                ></div>
                <div className="text-sm font-medium">{name}</div>
                <div className="text-xs opacity-70">{color}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 1.2 Variáveis de Cor - Dark */}
        <section className="mb-12">
          <h2 className="text-2xl font-medium mb-6" style={{ fontFamily: 'Roboto Flex, Roboto, sans-serif' }}>
            1.2 Variáveis de Cor (Dark)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Object.entries(colorTokens.dark).map(([name, color]) => (
              <div key={name} className="border border-gray-200 rounded-lg p-4">
                <div
                  className="w-full h-16 rounded-md mb-3 border border-gray-200"
                  style={{ backgroundColor: color }}
                ></div>
                <div className="text-sm font-medium">{name}</div>
                <div className="text-xs opacity-70">{color}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 1.3 Tipografia */}
        <section className="mb-12">
          <h2 className="text-2xl font-medium mb-6" style={{ fontFamily: 'Roboto Flex, Roboto, sans-serif' }}>
            1.3 Tipografia - Roboto Flex (fallback Roboto)
          </h2>
          <div className="space-y-4">
            {typographyTokens.map((token) => (
              <div key={token.name} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-medium">{token.name}</span>
                  <span className="text-xs opacity-70">
                    {token.size}/{token.lineHeight} {token.weight}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: token.size,
                    lineHeight: token.lineHeight,
                    fontWeight: token.weight,
                    fontFamily: 'Roboto Flex, Roboto, sans-serif'
                  }}
                >
                  The quick brown fox jumps over the lazy dog
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 1.4 Layout Tokens */}
        <section className="mb-12">
          <h2 className="text-2xl font-medium mb-6" style={{ fontFamily: 'Roboto Flex, Roboto, sans-serif' }}>
            1.4 Layout Tokens
          </h2>

          {/* Spacing */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Spacing</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-4">
              {spacingTokens.map((space) => (
                <div key={space} className="text-center">
                  <div
                    className="bg-blue-500 mx-auto mb-2"
                    style={{ width: `${space}px`, height: `${space}px` }}
                  ></div>
                  <div className="text-xs">space/{space}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Radius */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Radius</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {Object.entries(radiusTokens).map(([name, value]) => (
                <div key={name} className="text-center">
                  <div
                    className="w-16 h-16 bg-blue-500 mx-auto mb-2"
                    style={{ borderRadius: `${value}px` }}
                  ></div>
                  <div className="text-xs">radius/{name}={value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Elevation */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Elevation</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {elevationTokens.map((elevation, index) => (
                <div key={elevation} className="text-center">
                  <div
                    className="w-16 h-16 bg-white mx-auto mb-2 rounded-lg"
                    style={{
                      boxShadow: [
                        '0 1px 3px rgba(0,0,0,0.12)',
                        '0 2px 6px rgba(0,0,0,0.15)',
                        '0 4px 12px rgba(0,0,0,0.15)',
                        '0 8px 24px rgba(0,0,0,0.15)',
                        '0 16px 48px rgba(0,0,0,0.15)'
                      ][index]
                    }}
                  ></div>
                  <div className="text-xs">elevation/{elevation}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Breakpoints */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Breakpoints</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-gray-200 rounded-lg p-4 text-center">
                <div className="text-lg font-medium">Mobile</div>
                <div className="text-sm opacity-70">bp/mobile ≤ 600px</div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 text-center">
                <div className="text-lg font-medium">Tablet</div>
                <div className="text-sm opacity-70">bp/tablet = 600-840px</div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 text-center">
                <div className="text-lg font-medium">Desktop</div>
                <div className="text-sm opacity-70">bp/desktop ≥ 840px</div>
              </div>
            </div>
          </div>
        </section>

        {/* 1.5 Componentes MD3 */}
        <section className="mb-12">
          <h2 className="text-2xl font-medium mb-6" style={{ fontFamily: 'Roboto Flex, Roboto, sans-serif' }}>
            1.5 Componentes (biblioteca MD3)
          </h2>

          {/* Buttons */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Buttons</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <h4 className="text-sm font-medium mb-3">Filled</h4>
                <div className="space-y-2">
                  {buttonStates.map((state) => (
                    <Button
                      key={state}
                      variant="default"
                      disabled={state === 'disabled'}
                      className={`w-full transition-all ${state === 'hover' ? 'bg-[#3F37D6]' :
                          state === 'focus' ? 'ring-2 ring-[#4F48EC] ring-opacity-50' :
                            state === 'pressed' ? 'bg-[#332BCE]' : ''
                        }`}
                      style={{ backgroundColor: state === 'default' ? '#4F48EC' : undefined }}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      {state}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-3">Tonal</h4>
                <div className="space-y-2">
                  {buttonStates.map((state) => (
                    <Button
                      key={state}
                      variant="secondary"
                      disabled={state === 'disabled'}
                      className={`w-full transition-all ${state === 'hover' ? 'bg-[#D0D3F0]' :
                          state === 'focus' ? 'ring-2 ring-[#4F48EC] ring-opacity-50' :
                            state === 'pressed' ? 'bg-[#C0C5ED]' : ''
                        }`}
                      style={{
                        backgroundColor: state === 'default' ? '#E7E9FF' : undefined,
                        color: '#100E34'
                      }}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      {state}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-3">Outlined</h4>
                <div className="space-y-2">
                  {buttonStates.map((state) => (
                    <Button
                      key={state}
                      variant="outline"
                      disabled={state === 'disabled'}
                      className={`w-full transition-all ${state === 'hover' ? 'bg-[#F0F0FF]' :
                          state === 'focus' ? 'ring-2 ring-[#4F48EC] ring-opacity-50' :
                            state === 'pressed' ? 'bg-[#E7E9FF]' : ''
                        }`}
                      style={{
                        borderColor: '#4F48EC',
                        color: '#4F48EC'
                      }}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      {state}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-3">Text</h4>
                <div className="space-y-2">
                  {buttonStates.map((state) => (
                    <Button
                      key={state}
                      variant="ghost"
                      disabled={state === 'disabled'}
                      className={`w-full transition-all ${state === 'hover' ? 'bg-[#F0F0FF]' :
                          state === 'focus' ? 'ring-2 ring-[#4F48EC] ring-opacity-50' :
                            state === 'pressed' ? 'bg-[#E7E9FF]' : ''
                        }`}
                      style={{ color: '#4F48EC' }}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      {state}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Text Fields */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Text Fields</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium mb-3">Filled</h4>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Default</label>
                    <Input
                      placeholder="Texto de exemplo"
                      className="mt-1"
                      style={{ backgroundColor: '#F5F6FB' }}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Focus</label>
                    <Input
                      placeholder="Texto de exemplo"
                      className="mt-1 ring-2 ring-[#4F48EC] ring-opacity-50"
                      style={{ backgroundColor: '#F5F6FB' }}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Error</label>
                    <Input
                      placeholder="Texto de exemplo"
                      className="mt-1 border-[#B3261E]"
                      style={{ backgroundColor: '#F5F6FB' }}
                    />
                    <p className="text-xs text-[#B3261E] mt-1">Mensagem de erro</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Com ícone</label>
                    <div className="relative mt-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <Input
                        placeholder="Buscar..."
                        className="pl-10"
                        style={{ backgroundColor: '#F5F6FB' }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Senha</label>
                    <div className="relative mt-1">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Digite sua senha"
                        className="pr-10"
                        style={{ backgroundColor: '#F5F6FB' }}
                      />
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-3">Outlined</h4>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Default</label>
                    <Input
                      placeholder="Texto de exemplo"
                      className="mt-1"
                      variant="outline"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Focus</label>
                    <Input
                      placeholder="Texto de exemplo"
                      className="mt-1 ring-2 ring-[#4F48EC] ring-opacity-50"
                      variant="outline"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Error</label>
                    <Input
                      placeholder="Texto de exemplo"
                      className="mt-1 border-[#B3261E]"
                      variant="outline"
                    />
                    <p className="text-xs text-[#B3261E] mt-1">Mensagem de erro</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Disabled</label>
                    <Input
                      placeholder="Campo desabilitado"
                      className="mt-1"
                      variant="outline"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Controls */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Form Controls</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="text-sm font-medium mb-3">Checkbox</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="check1"
                      checked={checkedItems.checkbox1}
                      onCheckedChange={(checked) => setCheckedItems(prev => ({ ...prev, checkbox1: checked }))}
                    />
                    <label htmlFor="check1" className="text-sm">Opção selecionada</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="check2" />
                    <label htmlFor="check2" className="text-sm">Opção não selecionada</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="check3" disabled />
                    <label htmlFor="check3" className="text-sm opacity-50">Opção desabilitada</label>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-3">Radio Button</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="radio1"
                      name="radio-group"
                      className="w-4 h-4 text-[#4F48EC]"
                      defaultChecked
                    />
                    <label htmlFor="radio1" className="text-sm">Opção selecionada</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="radio2"
                      name="radio-group"
                      className="w-4 h-4 text-[#4F48EC]"
                    />
                    <label htmlFor="radio2" className="text-sm">Opção não selecionada</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="radio3"
                      name="radio-group"
                      className="w-4 h-4 text-[#4F48EC]"
                      disabled
                    />
                    <label htmlFor="radio3" className="text-sm opacity-50">Opção desabilitada</label>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-3">Switch</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Switch ativo</span>
                    <Switch checked={switchValue} onCheckedChange={setSwitchValue} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Switch inativo</span>
                    <Switch checked={false} />
                  </div>
                  <div className="flex items-center justify-between opacity-50">
                    <span className="text-sm">Switch desabilitado</span>
                    <Switch checked={false} disabled />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chips */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Chips</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium mb-3">Assist Chips</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="px-3 py-1">
                    <Settings className="w-3 h-3 mr-1" />
                    Configurações
                  </Badge>
                  <Badge variant="secondary" className="px-3 py-1">
                    Ajuda
                  </Badge>
                  <Badge variant="secondary" className="px-3 py-1">
                    <Info className="w-3 h-3 mr-1" />
                    Informações
                  </Badge>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-3">Filter Chips</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="default" className="px-3 py-1" style={{ backgroundColor: '#4F48EC' }}>
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Selecionado
                  </Badge>
                  <Badge variant="outline" className="px-3 py-1">
                    Categoria 1
                  </Badge>
                  <Badge variant="outline" className="px-3 py-1">
                    Categoria 2
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Outros Componentes */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Outros Componentes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <h4 className="text-sm font-medium mb-3">Avatar</h4>
                <div className="flex gap-2">
                  <Avatar>
                    <AvatarFallback>AB</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback>CD</AvatarFallback>
                  </Avatar>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-3">Divider</h4>
                <Separator className="my-2" />
                <p className="text-sm opacity-70">Separador horizontal</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-3">Tooltip</h4>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">Hover me</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Texto do tooltip</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>

          {/* Snackbars e Dialogs */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Snackbars e Dialogs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium mb-3">Snackbars</h4>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    onClick={() => toast.success('Ação realizada com sucesso!')}
                    className="w-full"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Sucesso
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => toast.error('Erro ao realizar ação')}
                    className="w-full"
                  >
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Erro
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => toast.info('Informação importante')}
                    className="w-full"
                  >
                    <Info className="w-4 h-4 mr-2" />
                    Info
                  </Button>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-3">Dialog</h4>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      Abrir Dialog
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Título do Dialog</DialogTitle>
                      <DialogDescription>
                        Este é um exemplo de dialog com formulário simples.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="name" className="text-right text-sm font-medium">
                          Nome
                        </label>
                        <Input id="name" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="email" className="text-right text-sm font-medium">
                          Email
                        </label>
                        <Input id="email" type="email" className="col-span-3" />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline">Cancelar</Button>
                      <Button>Salvar</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>

          {/* Alerts */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Alerts</h3>
            <div className="space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Este é um alerta informativo padrão.
                </AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Este é um alerta de erro com variante destrutiva.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </section>

        {/* Board Organizado */}
        <section className="mb-12">
          <h2 className="text-2xl font-medium mb-6" style={{ fontFamily: 'Roboto Flex, Roboto, sans-serif' }}>
            Board Organizado - Amostras dos Tokens
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {/* Paleta Principal */}
            <Card>
              <CardHeader>
                <CardTitle>Paleta Principal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded" style={{ backgroundColor: '#4F48EC' }}></div>
                    <span className="text-sm">Primary</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded" style={{ backgroundColor: '#FFBF18' }}></div>
                    <span className="text-sm">Secondary</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded" style={{ backgroundColor: '#100E34' }}></div>
                    <span className="text-sm">Tertiary</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tipografia Exemplo */}
            <Card>
              <CardHeader>
                <CardTitle>Hierarquia Tipográfica</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div style={{ fontSize: '24px', lineHeight: '32px', fontWeight: '400', fontFamily: 'Roboto Flex, Roboto, sans-serif' }}>
                    Headline
                  </div>
                  <div style={{ fontSize: '22px', lineHeight: '28px', fontWeight: '500', fontFamily: 'Roboto Flex, Roboto, sans-serif' }}>
                    Title Large
                  </div>
                  <div style={{ fontSize: '16px', lineHeight: '24px', fontWeight: '400', fontFamily: 'Roboto Flex, Roboto, sans-serif' }}>
                    Body Large - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </div>
                  <div style={{ fontSize: '14px', lineHeight: '20px', fontWeight: '500', fontFamily: 'Roboto Flex, Roboto, sans-serif' }}>
                    Label Medium
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Componentes Exemplo */}
            <Card>
              <CardHeader>
                <CardTitle>Componentes em Ação</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button
                    className="w-full"
                    style={{ backgroundColor: '#4F48EC' }}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Button Primário
                  </Button>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="sample" defaultChecked />
                    <label htmlFor="sample" className="text-sm">Checkbox</label>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Switch</span>
                    <Switch defaultChecked />
                  </div>
                  <Badge variant="secondary" className="px-3 py-1">
                    Chip Exemplo
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <div className="text-center text-sm opacity-70 mt-12">
          Material Design 3 - Sistema completo implementado com Roboto Flex e tokens organizados
        </div>
      </div>
    </div>
  )
}
