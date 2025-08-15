import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Moon, Sun, Smartphone, Monitor } from 'lucide-react';

interface ThemeControlsProps {
  darkMode: boolean;
  isMobile: boolean;
  onToggleDarkMode: () => void;
  onToggleMobile: () => void;
}

export function ThemeControls({
  darkMode,
  isMobile,
  onToggleDarkMode,
  onToggleMobile,
}: ThemeControlsProps) {
  return (
    <div className="
      fixed top-4 right-4 z-[100] 
      flex flex-col sm:flex-row gap-2
      no-print
    ">
      {/* Dark Mode Toggle */}
      <Card className="flex items-center gap-2 px-2 py-1 sm:px-3 sm:py-2 shadow-lg">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleDarkMode}
          className="h-8 w-8 p-0 hover:bg-accent"
          title={darkMode ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
        >
          {darkMode ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>
        <span className="text-xs font-medium hidden sm:inline">
          {darkMode ? 'Light' : 'Dark'}
        </span>
      </Card>
      
      {/* Mobile Demo Toggle */}
      <Card className="flex items-center gap-2 px-2 py-1 sm:px-3 sm:py-2 shadow-lg">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleMobile}
          className="h-8 w-8 p-0 hover:bg-accent"
          title={isMobile ? 'Visualizar como desktop' : 'Visualizar como mobile'}
        >
          {isMobile ? (
            <Monitor className="h-4 w-4" />
          ) : (
            <Smartphone className="h-4 w-4" />
          )}
        </Button>
        <span className="text-xs font-medium hidden sm:inline">
          {isMobile ? 'Desktop' : 'Mobile'}
        </span>
      </Card>
    </div>
  );
}