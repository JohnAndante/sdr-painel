'use client'

import React from 'react'
import { Button } from '../ui/button'
import PageContainer from '../PageContainer'
import DataTable from '../DataTable'
import EmptyState from '../EmptyState'
import { UserPlus, Users, Eye, Edit2 } from 'lucide-react'
import { MD3_TOKENS } from '../../constants/tokens'

interface UsuariosPageProps {
  darkMode: boolean
  isMobile: boolean
  usuariosView: string
  usuariosData: any[]
  onViewChange: (view: string) => void
  onFormSubmit: (formData: any) => void
  onEditUsuario?: (usuario: any) => void
  onViewDetails?: (usuario: any) => void
}

export default function UsuariosPage({
  darkMode,
  isMobile,
  usuariosView,
  usuariosData,
  onViewChange,
  onFormSubmit,
  onEditUsuario,
  onViewDetails
}: UsuariosPageProps) {
  const colors = darkMode ? MD3_TOKENS.dark : MD3_TOKENS.light
  const primaryColor = colors['sys/primary'] || colors['dark/primary']
  const onPrimaryColor = colors['sys/on-primary'] || colors['dark/on-primary']
  const onSurfaceColor = colors['sys/on-surface'] || colors['dark/on-surface']
  const onSurfaceVariantColor = colors['sys/on-surface-variant'] || colors['dark/outline']

  const handleBackToList = () => {
    onViewChange('list')
  }

  const renderActions = (usuario: any) => (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onViewDetails?.(usuario)}
        className="h-8 w-8 p-0"
        style={{
          color: onSurfaceVariantColor,
          borderRadius: '8px'
        }}
      >
        <Eye className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onEditUsuario?.(usuario)}
        className="h-8 w-8 p-0"
        style={{
          color: onSurfaceVariantColor,
          borderRadius: '8px'
        }}
      >
        <Edit2 className="h-4 w-4" />
      </Button>
    </div>
  )

  if (usuariosView === 'form') {
    return (
      <PageContainer
        title="Novo Usuário"
        subtitle="Cadastrar um novo usuário no sistema"
        breadcrumb={[
          { label: 'Usuários', onClick: handleBackToList },
          { label: 'Novo Usuário' }
        ]}
        darkMode={darkMode}
        showBackButton={true}
        onBackClick={handleBackToList}
      >
        <div className="max-w-2xl">
          <UsuarioFormContent
            darkMode={darkMode}
            onSubmit={onFormSubmit}
            onCancel={handleBackToList}
          />
        </div>
      </PageContainer>
    )
  }

  if (usuariosView === 'details') {
    // TODO: Implementar view de detalhes
    return (
      <PageContainer
        title="Detalhes do Usuário"
        subtitle="Informações detalhadas do usuário"
        breadcrumb={[
          { label: 'Usuários', onClick: handleBackToList },
          { label: 'Detalhes' }
        ]}
        darkMode={darkMode}
        showBackButton={true}
        onBackClick={handleBackToList}
      >
        <div className="text-center py-12">
          <h3 style={{ color: onSurfaceColor }}>
            View de detalhes em desenvolvimento
          </h3>
        </div>
      </PageContainer>
    )
  }

  return (
    <PageContainer
      title="Usuários"
      subtitle="Gerencie usuários do sistema de IA de atendimento"
      breadcrumb={[{ label: 'Usuários' }]}
      darkMode={darkMode}
    >
      <div style={{ gap: '24px' }} className="flex flex-col">
        {usuariosData.length === 0 ? (
          <EmptyState
            icon={<Users className="w-12 h-12" />}
            title="Nenhum usuário cadastrado"
            subtitle="Comece criando seu primeiro usuário no sistema"
            action={
              <Button
                onClick={() => onViewChange('form')}
                style={{
                  backgroundColor: primaryColor,
                  color: onPrimaryColor,
                  borderRadius: '12px',
                  minHeight: '48px'
                }}
              >
                <UserPlus className="w-5 h-5 mr-2" />
                Criar Primeiro Usuário
              </Button>
            }
            darkMode={darkMode}
          />
        ) : (
          <>
            {/* Botão Novo Usuário acima da tabela */}
            <div className="flex justify-start">
              <Button
                onClick={() => onViewChange('form')}
                style={{
                  backgroundColor: primaryColor,
                  color: onPrimaryColor,
                  borderRadius: '12px',
                  minHeight: '48px',
                  paddingLeft: '24px',
                  paddingRight: '24px'
                }}
              >
                <UserPlus className="w-5 h-5 mr-2" />
                Novo Usuário
              </Button>
            </div>

            {/* Tabela de usuários */}
            <DataTable
              columns={[
                { key: 'nome', label: 'Nome', sortable: true },
                { key: 'email', label: 'Email', sortable: true },
                { key: 'funcao', label: 'Função', sortable: true },
                { key: 'departamento', label: 'Departamento', sortable: true },
                { key: 'status', label: 'Status', sortable: true },
                { key: 'ultimoAcesso', label: 'Último Acesso', sortable: true },
                { 
                  key: 'actions', 
                  label: 'Ações', 
                  sortable: false,
                  render: renderActions
                }
              ]}
              data={usuariosData}
              darkMode={darkMode}
            />
          </>
        )}
      </div>
    </PageContainer>
  )
}

// Componente interno para o formulário
function UsuarioFormContent({ 
  darkMode, 
  onSubmit, 
  onCancel 
}: { 
  darkMode: boolean
  onSubmit: (data: any) => void
  onCancel: () => void
}) {
  const colors = darkMode ? MD3_TOKENS.dark : MD3_TOKENS.light
  const primaryColor = colors['sys/primary'] || colors['dark/primary']
  const onPrimaryColor = colors['sys/on-primary'] || colors['dark/on-primary']
  const outlineColor = colors['sys/outline'] || colors['dark/outline']
  const surfaceColor = colors['sys/surface'] || colors['dark/surface']
  const onSurfaceColor = colors['sys/on-surface'] || colors['dark/on-surface']

  const [formData, setFormData] = React.useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    funcao: '',
    departamento: '',
    telefone: '',
    status: 'Ativo',
    permissoes: {
      dashboard: true,
      agentes: false,
      rotinas: false,
      usuarios: false,
      configuracoes: false
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.senha !== formData.confirmarSenha) {
      alert('As senhas não coincidem')
      return
    }

    const newUser = {
      ...formData,
      id: Date.now(),
      ultimoAcesso: 'Nunca',
      dataCriacao: new Date().toISOString().split('T')[0]
    }
    
    onSubmit(newUser)
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handlePermissionChange = (permission: string, value: boolean) => {
    setFormData(prev => ({
      ...prev,
      permissoes: {
        ...prev.permissoes,
        [permission]: value
      }
    }))
  }

  return (
    <div 
      className="p-6 rounded-lg border"
      style={{
        backgroundColor: surfaceColor,
        border: `1px solid ${outlineColor}`,
        borderRadius: '12px'
      }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informações Pessoais */}
        <div>
          <h3 
            className="mb-4"
            style={{
              fontSize: '16px',
              lineHeight: '24px',
              fontWeight: '500',
              color: onSurfaceColor
            }}
          >
            Informações Pessoais
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label 
                htmlFor="nome"
                className="block mb-2"
                style={{
                  fontSize: '14px',
                  lineHeight: '20px',
                  fontWeight: '500',
                  color: onSurfaceColor
                }}
              >
                Nome Completo *
              </label>
              <input
                id="nome"
                type="text"
                required
                value={formData.nome}
                onChange={(e) => handleInputChange('nome', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border"
                style={{
                  border: `1px solid ${outlineColor}`,
                  backgroundColor: surfaceColor,
                  color: onSurfaceColor,
                  fontSize: '14px',
                  minHeight: '48px'
                }}
              />
            </div>

            <div>
              <label 
                htmlFor="email"
                className="block mb-2"
                style={{
                  fontSize: '14px',
                  lineHeight: '20px',
                  fontWeight: '500',
                  color: onSurfaceColor
                }}
              >
                Email *
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border"
                style={{
                  border: `1px solid ${outlineColor}`,
                  backgroundColor: surfaceColor,
                  color: onSurfaceColor,
                  fontSize: '14px',
                  minHeight: '48px'
                }}
              />
            </div>

            <div>
              <label 
                htmlFor="telefone"
                className="block mb-2"
                style={{
                  fontSize: '14px',
                  lineHeight: '20px',
                  fontWeight: '500',
                  color: onSurfaceColor
                }}
              >
                Telefone
              </label>
              <input
                id="telefone"
                type="tel"
                value={formData.telefone}
                onChange={(e) => handleInputChange('telefone', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border"
                style={{
                  border: `1px solid ${outlineColor}`,
                  backgroundColor: surfaceColor,
                  color: onSurfaceColor,
                  fontSize: '14px',
                  minHeight: '48px'
                }}
              />
            </div>

            <div>
              <label 
                htmlFor="status"
                className="block mb-2"
                style={{
                  fontSize: '14px',
                  lineHeight: '20px',
                  fontWeight: '500',
                  color: onSurfaceColor
                }}
              >
                Status
              </label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border"
                style={{
                  border: `1px solid ${outlineColor}`,
                  backgroundColor: surfaceColor,
                  color: onSurfaceColor,
                  fontSize: '14px',
                  minHeight: '48px'
                }}
              >
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
              </select>
            </div>
          </div>
        </div>

        {/* Informações Profissionais */}
        <div>
          <h3 
            className="mb-4"
            style={{
              fontSize: '16px',
              lineHeight: '24px',
              fontWeight: '500',
              color: onSurfaceColor
            }}
          >
            Informações Profissionais
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label 
                htmlFor="funcao"
                className="block mb-2"
                style={{
                  fontSize: '14px',
                  lineHeight: '20px',
                  fontWeight: '500',
                  color: onSurfaceColor
                }}
              >
                Função *
              </label>
              <select
                id="funcao"
                required
                value={formData.funcao}
                onChange={(e) => handleInputChange('funcao', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border"
                style={{
                  border: `1px solid ${outlineColor}`,
                  backgroundColor: surfaceColor,
                  color: onSurfaceColor,
                  fontSize: '14px',
                  minHeight: '48px'
                }}
              >
                <option value="">Selecionar função</option>
                <option value="Administrador">Administrador</option>
                <option value="Gerente">Gerente</option>
                <option value="Supervisor">Supervisor</option>
                <option value="Operador">Operador</option>
                <option value="Analista">Analista</option>
              </select>
            </div>

            <div>
              <label 
                htmlFor="departamento"
                className="block mb-2"
                style={{
                  fontSize: '14px',
                  lineHeight: '20px',
                  fontWeight: '500',
                  color: onSurfaceColor
                }}
              >
                Departamento *
              </label>
              <select
                id="departamento"
                required
                value={formData.departamento}
                onChange={(e) => handleInputChange('departamento', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border"
                style={{
                  border: `1px solid ${outlineColor}`,
                  backgroundColor: surfaceColor,
                  color: onSurfaceColor,
                  fontSize: '14px',
                  minHeight: '48px'
                }}
              >
                <option value="">Selecionar departamento</option>
                <option value="Vendas">Vendas</option>
                <option value="Marketing">Marketing</option>
                <option value="Atendimento">Atendimento</option>
                <option value="TI">TI</option>
                <option value="RH">RH</option>
                <option value="Financeiro">Financeiro</option>
              </select>
            </div>
          </div>
        </div>

        {/* Senha */}
        <div>
          <h3 
            className="mb-4"
            style={{
              fontSize: '16px',
              lineHeight: '24px',
              fontWeight: '500',
              color: onSurfaceColor
            }}
          >
            Senha de Acesso
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label 
                htmlFor="senha"
                className="block mb-2"
                style={{
                  fontSize: '14px',
                  lineHeight: '20px',
                  fontWeight: '500',
                  color: onSurfaceColor
                }}
              >
                Senha *
              </label>
              <input
                id="senha"
                type="password"
                required
                value={formData.senha}
                onChange={(e) => handleInputChange('senha', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border"
                style={{
                  border: `1px solid ${outlineColor}`,
                  backgroundColor: surfaceColor,
                  color: onSurfaceColor,
                  fontSize: '14px',
                  minHeight: '48px'
                }}
              />
            </div>

            <div>
              <label 
                htmlFor="confirmarSenha"
                className="block mb-2"
                style={{
                  fontSize: '14px',
                  lineHeight: '20px',
                  fontWeight: '500',
                  color: onSurfaceColor
                }}
              >
                Confirmar Senha *
              </label>
              <input
                id="confirmarSenha"
                type="password"
                required
                value={formData.confirmarSenha}
                onChange={(e) => handleInputChange('confirmarSenha', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border"
                style={{
                  border: `1px solid ${outlineColor}`,
                  backgroundColor: surfaceColor,
                  color: onSurfaceColor,
                  fontSize: '14px',
                  minHeight: '48px'
                }}
              />
            </div>
          </div>
        </div>

        {/* Permissões */}
        <div>
          <h3 
            className="mb-4"
            style={{
              fontSize: '16px',
              lineHeight: '24px',
              fontWeight: '500',
              color: onSurfaceColor
            }}
          >
            Permissões de Acesso
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(formData.permissoes).map(([key, value]) => (
              <div key={key} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id={key}
                  checked={value}
                  onChange={(e) => handlePermissionChange(key, e.target.checked)}
                  className="rounded"
                />
                <label 
                  htmlFor={key}
                  style={{
                    fontSize: '14px',
                    lineHeight: '20px',
                    fontWeight: '400',
                    color: onSurfaceColor,
                    textTransform: 'capitalize'
                  }}
                >
                  {key}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Ações */}
        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            style={{
              backgroundColor: primaryColor,
              color: onPrimaryColor,
              borderRadius: '12px',
              minHeight: '48px',
              paddingLeft: '24px',
              paddingRight: '24px'
            }}
          >
            Criar Usuário
          </Button>
          
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            style={{
              borderColor: outlineColor,
              color: onSurfaceColor,
              borderRadius: '12px',
              minHeight: '48px',
              paddingLeft: '24px',
              paddingRight: '24px'
            }}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  )
}