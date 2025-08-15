'use client'

import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Checkbox } from '../ui/checkbox'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'
import { LoginCredentials } from '../../types'
import { APP_CONFIG } from '../../constants/app'

interface LoginPageProps {
  darkMode: boolean
  isMobile: boolean
  onLogin: (credentials: LoginCredentials) => Promise<void>
  onNavigateToRegister: () => void
  onNavigateToForgotPassword: () => void
}

export default function LoginPage({
  darkMode,
  isMobile,
  onLogin,
  onNavigateToRegister,
  onNavigateToForgotPassword
}: LoginPageProps) {
  const [formData, setFormData] = useState<LoginCredentials>({
    email: '',
    password: '',
    rememberMe: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formErrors, setFormErrors] = useState({
    email: false,
    password: false
  })

  const validateForm = (): boolean => {
    const errors = {
      email: formData.email.trim() === '' || !formData.email.includes('@'),
      password: formData.password.length < 6
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

    try {
      await onLogin(formData)
    } catch (error) {
      // Error is already handled in the auth hook
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: keyof LoginCredentials, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (formErrors[field as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [field]: false }))
    }
  }

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${darkMode ? 'dark' : ''} bg-background`}>
      <div className={`w-full ${isMobile ? 'max-w-sm' : 'max-w-md'}`}>
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-primary flex items-center justify-center mb-4">
            <span className="text-primary-foreground text-2xl font-medium">G</span>
          </div>
          <h1 className="text-3xl font-medium text-foreground mb-2">{APP_CONFIG.name}</h1>
          <p className="text-muted-foreground">{APP_CONFIG.description}</p>
        </div>

        {/* Login Form */}
        <Card>
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-medium">Entrar na sua conta</CardTitle>
            <CardDescription>Digite suas credenciais para acessar o sistema</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <Label htmlFor="email" className="text-sm font-medium mb-2 block">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="seu@email.com"
                  className={`h-12 ${formErrors.email ? 'border-destructive' : ''}`}
                />
                {formErrors.email && (
                  <p className="text-destructive text-xs mt-1">
                    Digite um email válido
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="password" className="text-sm font-medium mb-2 block">
                  Senha
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Digite sua senha"
                    className={`h-12 pr-12 ${formErrors.password ? 'border-destructive' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-muted transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <Eye className="w-5 h-5 text-muted-foreground" />
                    )}
                  </button>
                </div>
                {formErrors.password && (
                  <p className="text-destructive text-xs mt-1">
                    A senha deve ter pelo menos 6 caracteres
                  </p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) => handleInputChange('rememberMe', checked as boolean)}
                  />
                  <Label htmlFor="remember" className="text-sm cursor-pointer">
                    Lembrar de mim
                  </Label>
                </div>
                <button
                  type="button"
                  onClick={onNavigateToForgotPassword}
                  className="text-sm text-primary hover:underline bg-transparent border-none cursor-pointer"
                >
                  Esqueceu a senha?
                </button>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 text-base font-medium"
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>

              {/* Register Link */}
              <div className="text-center pt-4">
                <span className="text-sm text-muted-foreground">
                  Não tem uma conta?{' '}
                </span>
                <button
                  type="button"
                  onClick={onNavigateToRegister}
                  className="text-sm text-primary font-medium hover:underline bg-transparent border-none cursor-pointer"
                >
                  Criar conta
                </button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center mt-8 text-xs text-muted-foreground">
          © 2025 {APP_CONFIG.name}. Todos os direitos reservados.
        </p>
      </div>
    </div>
  )
}
