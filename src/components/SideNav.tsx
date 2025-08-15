'use client'

import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Sheet, SheetContent } from './ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
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

  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
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
          // Base MD3 Navigation List Item styles
          "w-full justify-start gap-3 h-12 px-3 rounded-full md3-state-layer md3-transition-standard",
          showLabel ? "pr-4" : "w-12 px-0 justify-center",
          // Selected state using established design tokens
          isSelected
            ? "bg-secondary text-secondary-foreground hover:bg-secondary/90 md3-elevation-1"
            : "text-muted-foreground hover:bg-muted/50"
        )}
      >
        <Icon className="h-5 w-5 flex-shrink-0" />
        {showLabel && (
          <span className="md3-label-medium">
            {item.label}
          </span>
        )}
      </Button>
    )
  }

  const NavigationContent = ({ showLabels }: { showLabels: boolean }) => (
    <div className="flex flex-col h-full">
      {/* Header with Icon and Brand Name */}
      {showLabels && (
        <div className="px-4 py-4 border-b border-border">
          <div className="flex items-center gap-3">
            <Brain className="w-8 h-8 text-primary flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <h2 className="md3-title-small text-foreground">
                Gerson
              </h2>
              <p className="md3-body-small text-muted-foreground">
                Call Center IA
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Items */}
      <nav className="flex-1 p-2">
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
      <div className="border-t border-border p-2">
        {showLabels ? (
          // Expanded User Menu with Dropdown
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 h-14 px-3 rounded-lg md3-state-layer hover:bg-muted/50 focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={currentUser.avatar || undefined} />
                  <AvatarFallback className="gradient-primary text-white md3-label-medium">
                    {getUserInitials(currentUser.name)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0 text-left">
                  <p className="md3-body-small text-foreground truncate">
                    {currentUser.name}
                  </p>
                  <p className="md3-body-small text-muted-foreground truncate">
                    {currentUser.role === 'admin' ? 'Admin' : 'Usuário'}
                  </p>
                </div>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              side="right"
              className="w-56 md3-elevation-2 bg-popover border-border"
              sideOffset={8}
            >
              {/* User Info Header */}
              <div className="px-3 py-3 border-b border-border">
                <p className="md3-body-medium text-popover-foreground">
                  {currentUser.name}
                </p>
                <p className="md3-body-small text-muted-foreground">
                  {currentUser.email}
                </p>
              </div>

              {/* Profile Menu Item */}
              <DropdownMenuItem
                onClick={() => {
                  console.log('Navigate to profile');
                  if (onClose) onClose();
                }}
                className="gap-3 px-3 py-3 cursor-pointer hover:bg-muted focus:bg-muted"
              >
                <User className="h-5 w-5 text-muted-foreground" />
                <span className="md3-label-large text-popover-foreground">Perfil</span>
              </DropdownMenuItem>

              {/* Dark Mode Toggle */}
              <DropdownMenuItem
                onClick={(e) => {
                  e.preventDefault();
                  onToggleDarkMode();
                }}
                className="gap-3 px-3 py-3 cursor-pointer hover:bg-muted focus:bg-muted"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <Moon className="h-5 w-5 text-muted-foreground" />
                )}
                <span className="md3-label-large text-popover-foreground">
                  {theme === 'dark' ? 'Tema Claro' : 'Tema Escuro'}
                </span>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-border" />

              {/* Logout Menu Item */}
              <DropdownMenuItem
                onClick={() => {
                  console.log('Logout clicked');
                  if (onClose) onClose();
                }}
                className="gap-3 px-3 py-3 cursor-pointer hover:bg-destructive/10 focus:bg-destructive/10"
              >
                <LogOut className="h-5 w-5 text-destructive" />
                <span className="md3-label-large text-destructive">Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          // Collapsed User Avatar Only
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-12 h-12 p-0 rounded-full md3-state-layer hover:bg-muted/50 focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={currentUser.avatar || undefined} />
                  <AvatarFallback className="gradient-primary text-white md3-label-medium">
                    {getUserInitials(currentUser.name)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              side="right"
              className="w-56 md3-elevation-2 bg-popover border-border"
              sideOffset={8}
            >
              {/* User Info Header */}
              <div className="px-3 py-3 border-b border-border">
                <p className="md3-body-medium text-popover-foreground">
                  {currentUser.name}
                </p>
                <p className="md3-body-small text-muted-foreground">
                  {currentUser.email}
                </p>
              </div>

              {/* Profile Menu Item */}
              <DropdownMenuItem
                onClick={() => {
                  console.log('Navigate to profile');
                  if (onClose) onClose();
                }}
                className="gap-3 px-3 py-3 cursor-pointer hover:bg-muted focus:bg-muted"
              >
                <User className="h-5 w-5 text-muted-foreground" />
                <span className="md3-label-large text-popover-foreground">Perfil</span>
              </DropdownMenuItem>

              {/* Dark Mode Toggle */}
              <DropdownMenuItem
                onClick={(e) => {
                  e.preventDefault();
                  onToggleDarkMode();
                }}
                className="gap-3 px-3 py-3 cursor-pointer hover:bg-muted focus:bg-muted"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <Moon className="h-5 w-5 text-muted-foreground" />
                )}
                <span className="md3-label-large text-popover-foreground">
                  {theme === 'dark' ? 'Tema Claro' : 'Tema Escuro'}
                </span>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-border" />

              {/* Logout Menu Item */}
              <DropdownMenuItem
                onClick={() => {
                  console.log('Logout clicked');
                  if (onClose) onClose();
                }}
                className="gap-3 px-3 py-3 cursor-pointer hover:bg-destructive/10 focus:bg-destructive/10"
              >
                <LogOut className="h-5 w-5 text-destructive" />
                <span className="md3-label-large text-destructive">Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  )

  // Mobile Drawer
  if (mode === 'drawer') {
    return (
      <Sheet open={open} onOpenChange={(isOpen) => !isOpen && onClose?.()}>
        <SheetContent
          side="left"
          className="w-64 p-0 bg-background border-r border-border md3-elevation-1"
        >
          <NavigationContent showLabels={true} />
        </SheetContent>
      </Sheet>
    )
  }

  // Desktop Navigation Rail/Drawer
  return (
    <aside className={cn(
      "h-full bg-background border-r border-border md3-transition-standard md3-elevation-0",
      mode === 'expanded' ? "w-64" : "w-16"
    )}>
      <NavigationContent showLabels={mode === 'expanded'} />
    </aside>
  )
}
