'use client'

import { Button } from './ui/button'
import { Sheet, SheetContent } from './ui/sheet'
import {
  LayoutDashboard,
  Users,
  RotateCcw,
  Settings,
  LogOut,
  User,
  Moon,
  Sun,
  Brain
} from 'lucide-react'
import { cn } from './ui/utils'
import { User as UserType } from '../types'

interface SideNavProps {
  mode: 'expanded' | 'collapsed' | 'drawer'
  theme: 'light' | 'dark'
  selectedItem: string
  currentUser: UserType
  onItemClick: (item: string) => void
  onToggleDarkMode: () => void
  onClose?: () => void
  open?: boolean
}

export default function SideNav({
  mode,
  theme,
  selectedItem,
  currentUser,
  onItemClick,
  onToggleDarkMode,
  onClose,
  open = false
}: SideNavProps) {

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'agentes', label: 'Agentes', icon: Users },
    { id: 'rotinas', label: 'Rotinas', icon: RotateCcw },
    { id: 'usuarios', label: 'Usuários', icon: Settings },
  ]

  const handleItemClick = (itemId: string) => {
    onItemClick(itemId)
    if (mode === 'drawer' && onClose) {
      onClose()
    }
  }

  const NavigationItem = ({
    item,
    isSelected,
    showLabel
  }: {
    item: typeof menuItems[0],
    isSelected: boolean,
    showLabel: boolean
  }) => {
    const Icon = item.icon

    return (
      <Button
        variant="ghost"
        onClick={() => handleItemClick(item.id)}
        className={cn(
          "w-full justify-start gap-3 h-14 px-4 rounded-full",
          "transition-all duration-200",
          showLabel ? "pr-6" : "w-14 px-0 justify-center",
          isSelected
            ? "bg-[--md-sys-color-secondary-container] text-[--md-sys-color-on-secondary-container] hover:bg-[--md-sys-color-secondary-container]/90"
            : "text-[--md-sys-color-on-surface-variant] hover:bg-[--md-sys-color-on-surface]/8 active:bg-[--md-sys-color-on-surface]/12"
        )}
      >
        <Icon className={cn(
          "h-6 w-6 flex-shrink-0",
          isSelected ? "text-[--md-sys-color-on-secondary-container]" : "text-[--md-sys-color-on-surface-variant]"
        )} />
        {showLabel && (
          <span className={cn(
            "md3-label-large font-medium",
            isSelected ? "text-[--md-sys-color-on-secondary-container]" : "text-[--md-sys-color-on-surface-variant]"
          )}>
            {item.label}
          </span>
        )}
      </Button>
    )
  }

  const NavigationContent = ({ showLabels }: { showLabels: boolean }) => (
    <div className="flex flex-col h-full">
      {/* Header */}
      {showLabels && (
        <div className={cn(
          "w-full justify-start gap-3 h-14 px-[28px] flex items-center",
          "transition-all duration-200",
          "border-b border-[--md-sys-color-outline-variant] pr-6",
          "text-[--md-sys-color-on-surface-variant] hover:bg-[--md-sys-color-on-surface]/8 active:bg-[--md-sys-color-on-surface]/12"
        )}>
          <Brain className="h-6 w-6 flex-shrink-0" />
          <div>
            <h1 className="md3-title-large text-[--md-sys-color-on-surface] font-semibold">
              Gerson
            </h1>
            <p className="md3-body-small text-[--md-sys-color-on-surface-variant] mt-[-2px]">
              Call Center IA
            </p>
          </div>
        </div>
      )}

      {/* Navigation Items */}
      <nav className="flex-1 p-3">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <NavigationItem
              key={item.id}
              item={item}
              isSelected={selectedItem === item.id}
              showLabel={showLabels}
            />
          ))}
        </div>
      </nav>

      {/* User Section */}
      {showLabels && (
        <div className="border-t border-[--md-sys-color-outline-variant] p-3">
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-surface-variant">
            <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center">
              <User className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="md3-body-medium text-on-surface font-medium truncate">
                {currentUser.name}
              </p>
              <p className="md3-body-small text-on-surface-variant truncate">
                {currentUser.role === 'admin' ? 'Administrador' : 'Usuário'}
              </p>
            </div>
          </div>

          <div className="flex gap-2 mt-2">
            <Button
              variant="ghost"
              onClick={onToggleDarkMode}
              className={cn(
                "flex-1 justify-start gap-3 h-12 px-4 rounded-full",
                "text-on-surface-variant hover:bg-on-surface/8 active:bg-on-surface/12"
              )}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
              <span className="md3-label-large">
                {theme === 'dark' ? 'Light' : 'Dark'}
              </span>
            </Button>
          </div>

          <Button
            variant="ghost"
            onClick={() => handleItemClick('logout')}
            className={cn(
              "w-full justify-start gap-3 h-12 mt-2 px-4 rounded-full",
              "text-error hover:bg-error/8 active:bg-error/12"
            )}
          >
            <LogOut className="h-5 w-5" />
            <span className="md3-label-large">Sair</span>
          </Button>
        </div>
      )}
    </div>
  )

  // Mobile Drawer
  if (mode === 'drawer') {
    return (
      <Sheet
        open={open}
        onOpenChange={(open: boolean) => {
          if (!open && onClose) {
            onClose();
          }
        }}
      >
        <SheetContent
          side="left"
          className={cn(
            "w-80 p-0 bg-surface border-r border-[--md-sys-color-outline-variant]",
            "md3-elevation-1"
          )}
        >
          <NavigationContent showLabels={true} />
        </SheetContent>
      </Sheet>
    )
  }

  // Desktop Navigation Rail/Drawer
  return (
    <aside className={cn(
      "h-full bg-surface border-r border-[--md-sys-color-outline-variant] transition-all duration-300",
      "md3-elevation-0",
      mode === 'expanded' ? "w-80" : "w-20"
    )}>
      <NavigationContent showLabels={mode === 'expanded'} />
    </aside>
  )
}
