'use client'

import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react'
import { MD3_TOKENS } from '../../constants/tokens'
import { toast } from 'sonner'

interface ForgotPasswordPageProps {
  darkMode: boolean
  isMobile: boolean
  onNavigateToLogin: () => void
}

export default function ForgotPasswordPage({
  darkMode,
  isMobile,
  onNavigateToLogin
}: ForgotPasswordPageProps) {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [emailError, setEmailError] = useState(false)

  const colors = darkMode ? MD3_TOKENS.dark : MD3_TOKENS.light
  const primaryColor = colors['sys/primary'] || colors['dark/primary']
  const onPrimaryColor = colors['sys/on-primary'] || colors['dark/on-primary']
  const surfaceColor = colors['sys/surface'] || colors['dark/surface']
  const onSurfaceColor = colors['sys/on-surface'] || colors['dark/on-surface']
  const onSurfaceVariantColor = colors['sys/on-surface-variant'] || colors['dark/outline']
  const errorColor = colors['sys/error'] || colors['dark/error']
  const successColor = colors['sys/success'] || colors['dark/success']
  const surfaceVariantColor = colors['sys/surface-variant'] || colors['dark/surface-variant']

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim() || !email.includes('@')) {
      setEmailError(true)
      toast.error('Digite um email válido')
      return
    }

    setIsLoading(true)
    setEmailError(false)

    // Simular envio de email
    setTimeout(() => {
      setIsLoading(false)
      setEmailSent(true)
      toast.success('Email de recuperação enviado!')
    }, 1500)
  }

  const handleResendEmail = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast.success('Email reenviado!')
    }, 1000)
  }

  if (emailSent) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center p-4 ${darkMode ? 'dark' : ''}`}
        style={{
          backgroundColor: surfaceColor,
          fontFamily: 'Roboto Flex, Roboto, sans-serif'
        }}
      >
        <div className={`w-full ${isMobile ? 'max-w-sm' : 'max-w-md'}`}>
          <Card style={{ backgroundColor: surfaceVariantColor }}>
            <CardHeader className="text-center pb-6">
              <div
                className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: successColor, opacity: 0.1 }}
              >
                <CheckCircle className="w-8 h-8" style={{ color: successColor }} />
              </div>
              <CardTitle style={{
                fontSize: '24px',
                lineHeight: '32px',
                fontWeight: '500',
                color: onSurfaceColor
              }}>
                Email enviado!
              </CardTitle>
              <CardDescription style={{
                fontSize: '14px',
                lineHeight: '20px',
                color: onSurfaceVariantColor
              }}>
                Enviamos um link de recuperação para
              </CardDescription>
            </CardHeader>

            <CardContent className="text-center space-y-6">
              <div
                className="p-4 rounded-lg"
                style={{ backgroundColor: colors['sys/surface'] || colors['dark/surface'] }}
              >
                <Mail className="w-6 h-6 mx-auto mb-2" style={{ color: primaryColor }} />
                <p style={{
                  fontSize: '16px',
                  lineHeight: '24px',
                  fontWeight: '500',
                  color: onSurfaceColor
                }}>
                  {email}
                </p>
              </div>

              <div className="space-y-3">
                <p style={{
                  fontSize: '14px',
                  lineHeight: '20px',
                  color: onSurfaceVariantColor
                }}>
                  Verifique sua caixa de entrada e clique no link para redefinir sua senha.
                </p>

                <p style={{
                  fontSize: '12px',
                  lineHeight: '16px',
                  color: onSurfaceVariantColor
                }}>
                  Não recebeu o email? Verifique a pasta de spam.
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleResendEmail}
                  disabled={isLoading}
                  variant="outline"
                  className="w-full"
                  style={{
                    borderColor: primaryColor,
                    color: primaryColor,
                    borderRadius: '12px',
                    fontSize: '16px',
                    lineHeight: '24px',
                    fontWeight: '500',
                    minHeight: '48px',
                    opacity: isLoading ? 0.7 : 1
                  }}
                >
                  {isLoading ? 'Reenviando...' : 'Reenviar email'}
                </Button>

                <Button
                  onClick={onNavigateToLogin}
                  variant="ghost"
                  className="w-full"
                  style={{
                    color: primaryColor,
                    borderRadius: '12px',
                    fontSize: '16px',
                    lineHeight: '24px',
                    fontWeight: '500',
                    minHeight: '48px'
                  }}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar ao login
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
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

        {/* Forgot Password Form */}
        <Card style={{ backgroundColor: surfaceVariantColor }}>
          <CardHeader className="text-center pb-6">
            <div
              className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4"
              style={{ backgroundColor: primaryColor, opacity: 0.1 }}
            >
              <Mail className="w-8 h-8" style={{ color: primaryColor }} />
            </div>
            <CardTitle style={{
              fontSize: '24px',
              lineHeight: '32px',
              fontWeight: '500',
              color: onSurfaceColor
            }}>
              Esqueceu sua senha?
            </CardTitle>
            <CardDescription style={{
              fontSize: '14px',
              lineHeight: '20px',
              color: onSurfaceVariantColor
            }}>
              Digite seu email para receber um link de recuperação
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
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
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (emailError) setEmailError(false)
                  }}
                  placeholder="seu@email.com"
                  style={{
                    borderColor: emailError ? errorColor : colors['sys/outline'] || colors['dark/outline'],
                    minHeight: '48px',
                    fontSize: '16px',
                    lineHeight: '24px',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.outlineColor = primaryColor}
                />
                {emailError && (
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

              {/* Send Button */}
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
                  opacity: isLoading ? 0.7 : 1
                }}
                onFocus={(e) => e.target.style.outline = `2px solid ${primaryColor}`}
              >
                {isLoading ? 'Enviando...' : 'Enviar link de recuperação'}
              </Button>

              {/* Help Text */}
              <div className="text-center">
                <p style={{
                  fontSize: '12px',
                  lineHeight: '16px',
                  color: onSurfaceVariantColor
                }}>
                  Lembrou da senha?{' '}
                  <button
                    type="button"
                    onClick={onNavigateToLogin}
                    style={{
                      color: primaryColor,
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      fontWeight: '500'
                    }}
                  >
                    Fazer login
                  </button>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
