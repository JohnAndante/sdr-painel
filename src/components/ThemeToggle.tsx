import React from 'react'
import { Button } from './ui/button'
import { Moon, Sun } from 'lucide-react'
import { useDarkMode } from '@/contexts/ThemeContext'

const ThemeToggle: React.FC = () => {
    const { darkMode, toggleDarkMode } = useDarkMode()

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            {darkMode ? (
                <Sun className="h-5 w-5" />
            ) : (
                <Moon className="h-5 w-5" />
            )}
        </Button>
    )
}

export default ThemeToggle
