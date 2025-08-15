'use client'

import React, { useState } from 'react'
import TopBar from './TopBar'
import SideNav from './SideNav'
import { User, PageId } from '../types'

interface AppShellProps {
  children: React.ReactNode
  darkMode: boolean
  isMobile: boolean
  currentPage: PageId
  currentUser: User
  onNavigate: (page: string) => void
  onToggleDarkMode: () => void
}

export default function AppShell({
  children,
  darkMode,
  isMobile,
  currentPage,
  currentUser,
  onNavigate,
  onToggleDarkMode
}: AppShellProps) {
  const [sideNavOpen, setSideNavOpen] = useState(false)

  const handleMenuToggle = () => {
    setSideNavOpen(!sideNavOpen)
  }

  const closeSideNav = () => {
    setSideNavOpen(false)
  }

  const handleNavigation = (page: string) => {
    onNavigate(page)
    if (isMobile) {
      closeSideNav()
    }
  }

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <aside className="hidden lg:flex flex-shrink-0">
          <SideNav
            mode="expanded"
            theme={darkMode ? 'dark' : 'light'}
            selectedItem={currentPage}
            currentUser={currentUser}
            onItemClick={handleNavigation}
            onToggleDarkMode={onToggleDarkMode}
          />
        </aside>
      )}

      {/* Mobile Drawer Sidebar */}
      {isMobile && (
        <SideNav
          mode="drawer"
          theme={darkMode ? 'dark' : 'light'}
          selectedItem={currentPage}
          currentUser={currentUser}
          onItemClick={handleNavigation}
          onToggleDarkMode={onToggleDarkMode}
          onClose={closeSideNav}
          open={sideNavOpen}
        />
      )}

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-background">
          <div className="container mx-auto h-full">
            <div className="h-full px-4 py-6 lg:px-6">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
