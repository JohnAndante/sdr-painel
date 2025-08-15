#!/bin/bash

# Script para rodar o projeto com mise e configurações corretas
echo "🚀 Iniciando SDR Painel..."

# Ativa o mise para este diretório
echo "📦 Verificando mise..."
mise install

# Força a limpeza de cache
echo "🧹 Limpando cache..."
rm -rf node_modules/.vite 2>/dev/null
rm -rf node_modules/.cache 2>/dev/null

# Configura variáveis de ambiente
export NODE_ENV="development"
export VITE_NODE_ENV="development"

# Verifica versões
echo "🔍 Versões ativas:"
echo "Node: $(node --version)"
echo "npm: $(npm --version)"

# Roda o projeto
echo "🔥 Rodando servidor de desenvolvimento..."
npm run dev
