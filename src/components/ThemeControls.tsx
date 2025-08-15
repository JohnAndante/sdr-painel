import { Button } from './ui/button';
import { Moon, Sun } from 'lucide-react';

interface ThemeControlsProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export function ThemeControls({
  darkMode,
  onToggleDarkMode,
}: ThemeControlsProps) {
  return (
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
  );
}
