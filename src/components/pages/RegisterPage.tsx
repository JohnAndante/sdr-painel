'use client'

import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Checkbox } from '../ui/checkbox'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Eye, EyeOff, ArrowLeft } from 'lucide-react'
import { MD3_TOKENS } from '../../constants/tokens'
import { toast } from 'sonner'

interface RegisterPageProps {
  darkMode: boolean
  isMobile: boolean
  onRegister: (userData: {
    name: string
    email: string
    password: string
    acceptTerms: boolean
  }) => void
  onNavigateToLogin: () => void
}

export default function RegisterPage({
  darkMode,
  isMobile,
  onRegister,
  onNavigateToLogin
}: RegisterPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
    acceptTerms: false
  })

  const colors = darkMode ? MD3_TOKENS.dark : MD3_TOKENS.light
  const primaryColor = colors['sys/primary'] || colors['dark/primary']
  const onPrimaryColor = colors['sys/on-primary'] || colors['dark/on-primary']
  const surfaceColor = colors['sys/surface'] || colors['dark/surface']
  const onSurfaceColor = colors['sys/on-surface'] || colors['dark/on-surface']
  const onSurfaceVariantColor = colors['sys/on-surface-variant'] || colors['dark/outline']
  const errorColor = colors['sys/error'] || colors['dark/error']
  const surfaceVariantColor = colors['sys/surface-variant'] || colors['dark/surface-variant']

  const validateForm = () => {
    const errors = {
      name: formData.name.trim().length < 2,
      email: formData.email.trim() === '' || !formData.email.includes('@'),
      password: formData.password.length < 6,
      confirmPassword: formData.password !== formData.confirmPassword,
      acceptTerms: !formData.acceptTerms
    }
    setFormErrors(errors)
    return !Object.values(errors).some(error => error)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast.error('Por favor, corrija os erros no formulário')
      return
    }

    setIsLoading(true)

    // Simular delay de registro
    setTimeout(() => {
      setIsLoading(false)
      onRegister({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        acceptTerms: formData.acceptTerms
      })
    }, 1000)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (formErrors[field as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [field]: false }))
    }
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 ${darkMode ? 'dark' : ''}`}
      style={{
        backgroundColor: surfaceColor,
        fontFamily: 'Roboto Flex, Roboto, sans-serif'
      }}
    >
      <div className={`w-full ${isMobile ? 'max-w-sm' : 'max-w-md'}`}>
        {/* Back Button */}
        <button
          onClick={onNavigateToLogin}
          className="flex items-center mb-6 p-2 rounded-full hover:bg-opacity-10 hover:bg-gray-500 transition-colors"
          style={{
            color: onSurfaceVariantColor,
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span style={{ fontSize: '14px', lineHeight: '20px' }}>Voltar</span>
        </button>

        {/* Register Form */}
        <Card style={{ backgroundColor: surfaceVariantColor }}>
          <CardHeader className="text-center pb-6">
            <CardTitle style={{
              fontSize: '24px',
              lineHeight: '32px',
              fontWeight: '500',
              color: onSurfaceColor
            }}>
              Criar conta
            </CardTitle>
            <CardDescription style={{
              fontSize: '14px',
              lineHeight: '20px',
              color: onSurfaceVariantColor
            }}>
              Preencha os dados para criar sua conta
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <Label style={{
                  fontSize: '14px',
                  lineHeight: '20px',
                  fontWeight: '500',
                  color: onSurfaceColor,
                  marginBottom: '8px',
                  display: 'block'
                }}>
                  Nome completo
                </Label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Digite seu nome completo"
                  style={{
                    borderColor: formErrors.name ? errorColor : colors['sys/outline'] || colors['dark/outline'],
                    minHeight: '48px',
                    fontSize: '16px',
                    lineHeight: '24px',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.outlineColor = primaryColor}
                />
                {formErrors.name && (
                  <p style={{
                    fontSize: '12px',
                    lineHeight: '16px',
                    color: errorColor,
                    marginTop: '4px'
                  }}>
                    Nome deve ter pelo menos 2 caracteres
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <Label style={{
                  fontSize: '14px',
                  lineHeight: '20px',
                  fontWeight: '500',
                  color: onSurfaceColor,
                  marginBottom: '8px',
                  display: 'block'
                }}>
                  Email
                </Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="seu@email.com"
                  style={{
                    borderColor: formErrors.email ? errorColor : colors['sys/outline'] || colors['dark/outline'],
                    minHeight: '48px',
                    fontSize: '16px',
                    lineHeight: '24px',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.outlineColor = primaryColor}
                />
                {formErrors.email && (
                  <p style={{
                    fontSize: '12px',
                    lineHeight: '16px',
                    color: errorColor,
                    marginTop: '4px'
                  }}>
                    Digite um email válido
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <Label style={{
                  fontSize: '14px',
                  lineHeight: '20px',
                  fontWeight: '500',
                  color: onSurfaceColor,
                  marginBottom: '8px',
                  display: 'block'
                }}>
                  Senha
                </Label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Mínimo 6 caracteres"
                    style={{
                      borderColor: formErrors.password ? errorColor : colors['sys/outline'] || colors['dark/outline'],
                      minHeight: '48px',
                      fontSize: '16px',
                      lineHeight: '24px',
                      outline: 'none',
                      paddingRight: '48px'
                    }}
                    onFocus={(e) => e.target.style.outlineColor = primaryColor}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-opacity-10 hover:bg-gray-500 transition-colors"
                    style={{ minWidth: '40px', minHeight: '40px' }}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" style={{ color: onSurfaceVariantColor }} />
                    ) : (
                      <Eye className="w-5 h-5" style={{ color: onSurfaceVariantColor }} />
                    )}
                  </button>
                </div>
                {formErrors.password && (
                  <p style={{
                    fontSize: '12px',
                    lineHeight: '16px',
                    color: errorColor,
                    marginTop: '4px'
                  }}>
                    A senha deve ter pelo menos 6 caracteres
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <Label style={{
                  fontSize: '14px',
                  lineHeight: '20px',
                  fontWeight: '500',
                  color: onSurfaceColor,
                  marginBottom: '8px',
                  display: 'block'
                }}>
                  Confirmar senha
                </Label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    placeholder="Digite a senha novamente"
                    style={{
                      borderColor: formErrors.confirmPassword ? errorColor : colors['sys/outline'] || colors['dark/outline'],
                      minHeight: '48px',
                      fontSize: '16px',
                      lineHeight: '24px',
                      outline: 'none',
                      paddingRight: '48px'
                    }}
                    onFocus={(e) => e.target.style.outlineColor = primaryColor}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-opacity-10 hover:bg-gray-500 transition-colors"
                    style={{ minWidth: '40px', minHeight: '40px' }}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" style={{ color: onSurfaceVariantColor }} />
                    ) : (
                      <Eye className="w-5 h-5" style={{ color: onSurfaceVariantColor }} />
                    )}
                  </button>
                </div>
                {formErrors.confirmPassword && (
                  <p style={{
                    fontSize: '12px',
                    lineHeight: '16px',
                    color: errorColor,
                    marginTop: '4px'
                  }}>
                    As senhas não coincidem
                  </p>
                )}
              </div>

              {/* Accept Terms */}
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="terms"
                  checked={formData.acceptTerms}
                  onCheckedChange={(checked) => handleInputChange('acceptTerms', checked as boolean)}
                  style={{
                    marginTop: '2px',
                    borderColor: formErrors.acceptTerms ? errorColor : colors['sys/outline'] || colors['dark/outline']
                  }}
                />
                <div>
                  <Label
                    htmlFor="terms"
                    style={{
                      fontSize: '14px',
                      lineHeight: '20px',
                      color: onSurfaceColor,
                      cursor: 'pointer'
                    }}
                  >
                    Aceito os{' '}
                    <span style={{ color: primaryColor, textDecoration: 'underline' }}>
                      termos de uso
                    </span>
                    {' '}e a{' '}
                    <span style={{ color: primaryColor, textDecoration: 'underline' }}>
                      política de privacidade
                    </span>
                  </Label>
                  {formErrors.acceptTerms && (
                    <p style={{
                      fontSize: '12px',
                      lineHeight: '16px',
                      color: errorColor,
                      marginTop: '4px'
                    }}>
                      Você deve aceitar os termos para continuar
                    </p>
                  )}
                </div>
              </div>

              {/* Register Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full"
                style={{
                  backgroundColor: primaryColor,
                  color: onPrimaryColor,
                  borderRadius: '12px',
                  fontSize: '16px',
                  lineHeight: '24px',
                  fontWeight: '500',
                  minHeight: '48px',
                  border: 'none',
                  outline: 'none',
                  opacity: isLoading ? 0.7 : 1,
                  marginTop: '24px'
                }}
                onFocus={(e) => e.target.style.outline = `2px solid ${primaryColor}`}
              >
                {isLoading ? 'Criando conta...' : 'Criar conta'}
              </Button>

              {/* Login Link */}
              <div className="text-center pt-4">
                <span style={{
                  fontSize: '14px',
                  lineHeight: '20px',
                  color: onSurfaceVariantColor
                }}>
                  Já tem uma conta?{' '}
                </span>
                <button
                  type="button"
                  onClick={onNavigateToLogin}
                  style={{
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: primaryColor,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    fontWeight: '500'
                  }}
                  onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
                  onMouseOut={(e) => e.target.style.textDecoration = 'none'}
                >
                  Fazer login
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
