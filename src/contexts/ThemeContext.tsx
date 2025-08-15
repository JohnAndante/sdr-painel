import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react'
import { getTheme, getChartTheme, colors, gradients, chartColors } from '@/lib/theme'

interface ThemeContextType {
    darkMode: boolean
    toggleDarkMode: () => void
    colors: typeof colors.light
    gradients: typeof gradients
    chartColors: typeof chartColors
    getChartTheme: () => ReturnType<typeof getChartTheme>
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
    children: ReactNode
    initialDarkMode?: boolean
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
    children,
    initialDarkMode = false
}) => {
    const [darkMode, setDarkMode] = useState(initialDarkMode)

    // Apply dark mode class on mount and changes
    React.useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode)
    }, [darkMode])

    const toggleDarkMode = useCallback(() => {
        setDarkMode(prev => !prev)
    }, [])

    const themeColors = darkMode ? colors.dark : colors.light

    const getChartThemeContext = useCallback(() => {
        return getChartTheme(darkMode)
    }, [darkMode])

    const value: ThemeContextType = {
        darkMode,
        toggleDarkMode,
        colors: themeColors,
        gradients,
        chartColors,
        getChartTheme: getChartThemeContext
    }

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useThemeContext = () => {
    const context = useContext(ThemeContext)
    if (context === undefined) {
        throw new Error('useThemeContext must be used within a ThemeProvider')
    }
    return context
}

// Convenience hooks
export const useColors = () => {
    const { colors } = useThemeContext()
    return colors
}

export const useChartTheme = () => {
    const { getChartTheme } = useThemeContext()
    return getChartTheme()
}

export const useDarkMode = () => {
    const { darkMode, toggleDarkMode } = useThemeContext()
    return { darkMode, toggleDarkMode }
}
