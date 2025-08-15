'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { cn } from './ui/utils'
import { COLOR_PALETTE } from '../constants/tokens'

interface ColorPaletteProps {
  darkMode: boolean
}

export default function ColorPalette({ darkMode }: ColorPaletteProps) {
  const colorGroups = [
    {
      title: "Primary Colors",
      description: "Cores principais do sistema baseadas na paleta personalizada",
      colors: [
        { name: "Primary Green", value: COLOR_PALETTE.PRIMARY_GREEN, class: "bg-[--md-sys-color-primary]" },
        { name: "Primary Dark", value: COLOR_PALETTE.PRIMARY_GREEN_DARK, class: "bg-[--md-sys-color-primary-container]" },
        { name: "Gradient Accent", value: COLOR_PALETTE.PRIMARY_GRADIENT, class: "gradient-primary" },
      ]
    },
    {
      title: "Secondary Colors", 
      description: "Cores secundárias para elementos de suporte",
      colors: [
        { name: "Secondary Blue", value: COLOR_PALETTE.SECONDARY_BLUE, class: "bg-[--md-sys-color-secondary]" },
        { name: "Secondary Teal", value: COLOR_PALETTE.SECONDARY_TEAL, class: "bg-[--md-sys-color-secondary-container]" },
        { name: "Gradient Secondary", value: "Gradient", class: "gradient-secondary" },
      ]
    },
    {
      title: "Surface Colors",
      description: "Cores de fundo e superfícies",
      colors: [
        { name: "Dark Background", value: COLOR_PALETTE.BG_DARK, class: "bg-[--md-sys-color-surface-container-lowest]" },
        { name: "Medium Surface", value: COLOR_PALETTE.SURFACE_MEDIUM, class: "bg-[--md-sys-color-surface-container-low]" },
        { name: "Pop-up Surface", value: COLOR_PALETTE.SURFACE_LIGHT, class: "bg-[--md-sys-color-surface-container]" },
        { name: "Dark Gray", value: COLOR_PALETTE.SURFACE_GRAY, class: "bg-[--md-sys-color-surface-container-high]" },
      ]
    },
    {
      title: "Text Colors",
      description: "Cores para textos e elementos de texto",
      colors: [
        { name: "Primary Text", value: COLOR_PALETTE.TEXT_PRIMARY, class: "bg-[--md-sys-color-on-surface]" },
        { name: "Secondary Text", value: COLOR_PALETTE.TEXT_SECONDARY, class: "bg-[--md-sys-color-on-surface-variant]" },
        { name: "Tertiary Text", value: COLOR_PALETTE.TEXT_TERTIARY, class: "bg-[--md-sys-color-outline]" },
      ]
    }
  ]

  const gradientExamples = [
    { name: "Primary Gradient", class: "gradient-primary" },
    { name: "Secondary Gradient", class: "gradient-secondary" },
    { name: "Surface Gradient", class: "gradient-surface" },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <Card variant="elevated" className="md3-elevation-2">
        <CardHeader>
          <CardTitle className="md3-headline-small">Paleta de Cores Personalizada</CardTitle>
          <CardDescription className="md3-body-large">
            Sistema de cores baseado na paleta fornecida, implementando Material Design 3 com tipografia Poppins
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Color Groups */}
      {colorGroups.map((group, groupIndex) => (
        <Card key={groupIndex} variant="outlined">
          <CardHeader>
            <CardTitle className="md3-title-medium">{group.title}</CardTitle>
            <CardDescription className="md3-body-medium">{group.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.colors.map((color, colorIndex) => (
                <div key={colorIndex} className="space-y-2">
                  <div 
                    className={cn(
                      "w-full h-20 rounded-lg border border-[--md-sys-color-outline-variant]",
                      color.class
                    )}
                  />
                  <div>
                    <p className="md3-label-large font-semibold text-[--md-sys-color-on-surface]">
                      {color.name}
                    </p>
                    <p className="md3-body-small text-[--md-sys-color-on-surface-variant] font-mono">
                      {color.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Gradient Examples */}
      <Card variant="outlined">
        <CardHeader>
          <CardTitle className="md3-title-medium">Gradientes Personalizados</CardTitle>
          <CardDescription className="md3-body-medium">
            Gradientes criados com base na paleta para botões e elementos especiais
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {gradientExamples.map((gradient, index) => (
              <div key={index} className="space-y-3">
                <div 
                  className={cn(
                    "w-full h-24 rounded-xl border border-[--md-sys-color-outline-variant]",
                    gradient.class
                  )}
                />
                <p className="md3-label-large font-semibold text-[--md-sys-color-on-surface] text-center">
                  {gradient.name}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Interactive Examples */}
      <Card variant="outlined">
        <CardHeader>
          <CardTitle className="md3-title-medium">Exemplos Interativos</CardTitle>
          <CardDescription className="md3-body-medium">
            Demonstração dos componentes usando a nova paleta de cores
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Buttons */}
            <div className="space-y-2">
              <p className="md3-label-large font-semibold">Botões</p>
              <div className="flex flex-wrap gap-3">
                <Button variant="default">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="outline">Outlined Button</Button>
                <Button variant="ghost">Text Button</Button>
              </div>
            </div>

            {/* Badges */}
            <div className="space-y-2">
              <p className="md3-label-large font-semibold">Badges</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="default">Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="tertiary">Tertiary</Badge>
                <Badge variant="destructive">Error</Badge>
              </div>
            </div>

            {/* Typography */}
            <div className="space-y-2">
              <p className="md3-label-large font-semibold">Tipografia Poppins</p>
              <div className="space-y-1">
                <h1 className="md3-headline-large">Headline Large - Poppins 32px</h1>
                <h2 className="md3-headline-medium">Headline Medium - Poppins 28px</h2>
                <h3 className="md3-title-large">Title Large - Poppins 22px</h3>
                <p className="md3-body-large">Body Large - Poppins 16px - THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG</p>
                <p className="md3-body-medium">Body Medium - Poppins 14px - The quick brown fox jumps over the lazy dog</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}