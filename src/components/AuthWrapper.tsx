'use client'

import React, { useState } from 'react'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import { LoginCredentials, RegisterData } from '../types'

interface AuthWrapperProps {
  darkMode: boolean
  isMobile: boolean
  onAuthSuccess: (credentials: LoginCredentials) => Promise<void>
}

type AuthView = 'login' | 'register' | 'forgot-password'

export default function AuthWrapper({
  darkMode,
  isMobile,
  onAuthSuccess
}: AuthWrapperProps) {
  const [currentView, setCurrentView] = useState<AuthView>('login')

  const handleRegister = async (userData: RegisterData) => {
    // Convert register data to login credentials format for auth hook
    const credentials: LoginCredentials = {
      email: userData.email,
      password: userData.password,
      rememberMe: false
    }
    
    await onAuthSuccess(credentials)
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'login':
        return (
          <LoginPage
            darkMode={darkMode}
            isMobile={isMobile}
            onLogin={onAuthSuccess}
            onNavigateToRegister={() => setCurrentView('register')}
            onNavigateToForgotPassword={() => setCurrentView('forgot-password')}
          />
        )
      case 'register':
        return (
          <RegisterPage
            darkMode={darkMode}
            isMobile={isMobile}
            onRegister={handleRegister}
            onNavigateToLogin={() => setCurrentView('login')}
          />
        )
      case 'forgot-password':
        return (
          <ForgotPasswordPage
            darkMode={darkMode}
            isMobile={isMobile}
            onNavigateToLogin={() => setCurrentView('login')}
          />
        )
      default:
        return null
    }
  }

  return renderCurrentView()
}