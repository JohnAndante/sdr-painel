# 📚 Documentação & Demonstrações

Esta pasta contém documentação e componentes de demonstração do projeto SDR Painel.

## 📋 Arquivos

### `DesignSystem.tsx`
- **Propósito**: Demonstração completa do Material Design 3 implementado
- **Conteúdo**: 
  - Paleta de cores (light/dark)
  - Escala tipográfica com Poppins
  - Todos os componentes UI em ação
  - Tokens de design (spacing, elevation, etc.)
- **Uso**: Referência visual para desenvolvimento e design review

## 🎯 Como usar

### Para visualizar o Design System:
```typescript
// Em desenvolvimento, você pode importar e renderizar:
import DesignSystem from './docs/DesignSystem';

// Renderize em uma rota /design-system ou similar
<DesignSystem />
```

### Para referência de componentes:
- Use este arquivo como guia visual dos componentes disponíveis
- Copie padrões de uso dos componentes
- Referência para estados (hover, focus, disabled, etc.)
- Exemplos de formulários e layouts

## ⚠️ Importante

- **Não use em produção**: Estes são componentes de demonstração
- **Para produção**: Use os componentes organizados em `src/components/`
- **Estrutura**: Mantenha esta pasta separada do código de produção

## 🔗 Estrutura do Projeto

```
src/
├── components/          # Componentes de produção ✅
│   ├── ui/             # Componentes base
│   ├── pages/          # Páginas da aplicação  
│   └── layout/         # Layouts e shells
├── docs/               # Documentação & demos ℹ️
│   ├── DesignSystem.tsx
│   └── README.md
└── ...
```
