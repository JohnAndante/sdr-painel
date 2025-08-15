import { useState } from 'react'
import { ThemeProvider, useDarkMode } from '@/contexts/ThemeContext'
import AppShell from '@/components/AppShell'
import DashboardPage from '@/components/pages/DashboardPage'
import { User } from './types'

// Simulação simples de dados
const mockUser: User = {
  id: 1,
  name: 'Usuario Teste',
  email: 'teste@example.com',
  role: 'admin',
  lastLogin: new Date().toISOString()
}

// Componente interno que usa o Context
function AppContent() {
  const { darkMode, toggleDarkMode } = useDarkMode()
  const [isMobile, setIsMobile] = useState(false)
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'agentes' | 'rotinas' | 'usuarios'>('dashboard')

  return (
    <div className="App">
      <AppShell
        darkMode={darkMode}
        isMobile={isMobile}
        currentPage={currentPage}
        currentUser={mockUser}
        onNavigate={(page) => setCurrentPage(page as any)}
        onToggleDarkMode={toggleDarkMode}
      >
        <DashboardPage
          darkMode={darkMode}
          isMobile={isMobile}
        />
      </AppShell>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider initialDarkMode={false}>
      <AppContent />
    </ThemeProvider>
  )
}

export default App
