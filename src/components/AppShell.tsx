'use client'

import React, { useState } from 'react'
import SideNav from './SideNav'
import MobileMenuButton from './MobileMenuButton'
import { User, PageId } from '../types'
import { cn } from './ui/utils'

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
      {/* Mobile Menu Button */}
      {isMobile && (
        <MobileMenuButton onClick={handleMenuToggle} />
      )}

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

      {/* Main Content Area - Full height without TopBar */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Page Content - Full area with mobile padding adjustment */}
        <main className="flex-1 overflow-auto bg-background">
          <div className="container mx-auto h-full">
            <div className={cn(
              "h-full px-4 py-6 lg:px-6",
              // Add top padding on mobile to avoid floating button
              isMobile && "pt-20"
            )}>
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
