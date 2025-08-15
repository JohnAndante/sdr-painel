# 🚀 SDR Painel - Setup Guide

## 🛠️ Setup Inicial (Execute apenas uma vez)

```bash
# 1. Instalar versões corretas com mise
mise install

# 2. Instalar dependências
npm install

# OU use o comando combinado:
npm run setup
```

## 🔥 Como rodar o projeto

### Opção 1: Script automático (recomendado)
```bash
./dev.sh
```

### Opção 2: Comando npm
```bash
npm run dev
```

### Opção 3: Se der problema de cache
```bash
npm run dev:clean
```

## 🧹 Se der pau, use:

```bash
# Limpar tudo e recomeçar
npm run clean
npm install
npm run dev
```

## 📋 Comandos disponíveis

- `npm run dev` - Servidor de desenvolvimento
- `npm run dev:clean` - Limpa cache e roda
- `npm run build` - Build de produção
- `npm run clean` - Limpa todos os caches
- `npm run setup` - Setup completo
- `./dev.sh` - Script com tudo configurado

## 🔧 Arquivos de configuração

- `.tool-versions` - Versões do mise
- `.mise.toml` - Configurações do mise
- `vite.config.ts` - Configurações do Vite
- `tsconfig.app.json` - TypeScript config

## 🎯 Acesso

- **Local:** http://localhost:3000
- **Network:** http://192.168.10.71:3000
