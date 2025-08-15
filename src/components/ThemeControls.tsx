import { Button } from './ui/button';
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
    <div className="flex items-center gap-2">
      {/* Dark Mode Toggle */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onToggleDarkMode}
        className="h-9 w-9 rounded-full hover:bg-[--md-sys-color-on-surface]/8"
        title={darkMode ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
      >
        {darkMode ? (
          <Sun className="h-4 w-4 text-[--md-sys-color-on-surface-variant]" />
        ) : (
          <Moon className="h-4 w-4 text-[--md-sys-color-on-surface-variant]" />
        )}
      </Button>

      {/* Mobile Demo Toggle */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onToggleMobile}
        className="h-9 w-9 rounded-full hover:bg-[--md-sys-color-on-surface]/8"
        title={isMobile ? 'Visualizar como desktop' : 'Visualizar como mobile'}
      >
        {isMobile ? (
          <Monitor className="h-4 w-4 text-[--md-sys-color-on-surface-variant]" />
        ) : (
          <Smartphone className="h-4 w-4 text-[--md-sys-color-on-surface-variant]" />
        )}
      </Button>
    </div>
  );
}
