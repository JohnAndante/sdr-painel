'use client'

import React from 'react'
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Menu, LogOut, User } from 'lucide-react'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { User as UserType } from '../types'
import { cn } from './ui/utils'

interface TopBarProps {
  darkMode: boolean
  isMobile: boolean
  currentUser: UserType
  onMenuToggle: () => void
  onNavigate: (page: string) => void
}

export default function TopBar({
  darkMode,
  isMobile,
  currentUser,
  onMenuToggle,
  onNavigate
}: TopBarProps) {
  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <header 
      className={cn(
        // Custom Top App Bar with new colors
        "flex items-center justify-between",
        "h-16 px-4 lg:px-6", // MD3 standard height 64dp
        "bg-[--md-sys-color-surface] md3-elevation-0 border-b border-[--md-sys-color-outline-variant]",
        "flex-shrink-0 transition-all duration-200"
      )}
    >
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button - Custom styling */}
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            className={cn(
              "lg:hidden md3-state-layer",
              "h-12 w-12 rounded-full", // MD3 48dp touch target
              "text-[--md-sys-color-on-surface] hover:bg-[--md-sys-color-on-surface]/8 active:bg-[--md-sys-color-on-surface]/12"
            )}
          >
            <Menu className="h-6 w-6" />
          </Button>
        )}

        {/* App Title - Poppins Typography */}
        <div className="hidden sm:block">
          <h1 className="md3-title-large text-[--md-sys-color-on-surface] font-semibold">
            Gerson
          </h1>
          <p className="md3-body-small text-[--md-sys-color-on-surface-variant] mt-[-2px]">
            Call Center IA
          </p>
        </div>
      </div>

      {/* Right Section - User Menu */}
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className={cn(
                "relative h-12 w-auto px-3 md3-state-layer",
                "hover:bg-[--md-sys-color-on-surface]/8 active:bg-[--md-sys-color-on-surface]/12",
                "focus-visible:ring-2 focus-visible:ring-[--md-sys-color-primary]",
                "rounded-full"
              )}
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={currentUser.avatar || undefined} />
                  <AvatarFallback className={cn(
                    "gradient-primary text-white text-sm font-semibold"
                  )}>
                    {getUserInitials(currentUser.name)}
                  </AvatarFallback>
                </Avatar>
                
                {/* User name - Hidden on small screens */}
                <div className="hidden md:flex flex-col items-start text-left">
                  <span className="md3-label-large text-[--md-sys-color-on-surface] font-semibold">
                    {currentUser.name}
                  </span>
                  <span className="md3-body-small text-[--md-sys-color-on-surface-variant]">
                    {currentUser.role === 'admin' ? 'Administrador' : 'Usuário'}
                  </span>
                </div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent 
            align="end" 
            className={cn(
              "w-56 md3-elevation-2",
              "bg-[--md-sys-color-surface-container] rounded-xl",
              "border border-[--md-sys-color-outline-variant]"
            )}
            sideOffset={8}
          >
            {/* User Info - MD3 List Item */}
            <div className="px-3 py-3 md:hidden border-b border-[--md-sys-color-outline-variant]">
              <p className="md3-body-medium text-[--md-sys-color-on-surface] font-semibold">
                {currentUser.name}
              </p>
              <p className="md3-body-small text-[--md-sys-color-on-surface-variant]">
                {currentUser.email}
              </p>
            </div>
            
            {/* Menu Items - Custom styling */}
            <DropdownMenuItem 
              onClick={() => onNavigate('profile')}
              className={cn(
                "gap-3 px-3 py-3 cursor-pointer",
                "hover:bg-[--md-sys-color-on-surface]/8 active:bg-[--md-sys-color-on-surface]/12",
                "focus:bg-[--md-sys-color-on-surface]/12"
              )}
            >
              <User className="h-5 w-5 text-[--md-sys-color-on-surface-variant]" />
              <span className="md3-label-large text-[--md-sys-color-on-surface] font-semibold">Perfil</span>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator className="bg-[--md-sys-color-outline-variant]" />
            
            <DropdownMenuItem 
              onClick={() => onNavigate('logout')}
              className={cn(
                "gap-3 px-3 py-3 cursor-pointer",
                "hover:bg-[--md-sys-color-error]/8 active:bg-[--md-sys-color-error]/12",
                "focus:bg-[--md-sys-color-error]/12"
              )}
            >
              <LogOut className="h-5 w-5 text-[--md-sys-color-error]" />
              <span className="md3-label-large text-[--md-sys-color-error] font-semibold">Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}