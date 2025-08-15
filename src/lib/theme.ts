/**
 * Centralized Theme System
 * Single source of truth for all colors and design tokens
 */

// Core color palette
export const colors = {
    light: {
        // Primary colors
        primary: '#2497F9',
        onPrimary: '#FFFFFF',
        primaryContainer: '#147B9D',
        onPrimaryContainer: '#FFFFFF',

        // Secondary colors
        secondary: '#29B9D8',
        onSecondary: '#FFFFFF',
        secondaryContainer: '#214055',
        onSecondaryContainer: '#FFFFFF',

        // Tertiary colors
        tertiary: '#2BC398',
        onTertiary: '#FFFFFF',
        tertiaryContainer: '#296D98',
        onTertiaryContainer: '#FFFFFF',

        // Surface colors
        surface: '#FFFFFF',
        onSurface: '#0B1F30',
        surfaceVariant: '#F1F5F9',
        onSurfaceVariant: '#46668A',
        surfaceContainerLowest: '#FFFFFF',
        surfaceContainerLow: '#FCFCFD',
        surfaceContainer: '#F8FAFC',
        surfaceContainerHigh: '#F1F5F9',
        surfaceContainerHighest: '#E2E8F0',

        // Error colors
        error: '#B3261E',
        onError: '#FFFFFF',
        errorContainer: '#F9DEDC',
        onErrorContainer: '#410E0B',

        // Outline colors
        outline: '#658CA7',
        outlineVariant: '#9FB8CD',

        // Background
        background: '#FFFFFF',
        onBackground: '#0B1F30'
    },
    dark: {
        // Primary colors
        primary: '#2497F9',
        onPrimary: '#FFFFFF',
        primaryContainer: '#147B9D',
        onPrimaryContainer: '#FFFFFF',

        // Secondary colors
        secondary: '#29B9D8',
        onSecondary: '#FFFFFF',
        secondaryContainer: '#214055',
        onSecondaryContainer: '#FFFFFF',

        // Tertiary colors
        tertiary: '#2BC398',
        onTertiary: '#FFFFFF',
        tertiaryContainer: '#296D98',
        onTertiaryContainer: '#FFFFFF',

        // Surface colors
        surface: '#0B1F30',
        onSurface: '#FFFFFF',
        surfaceVariant: '#15293A',
        onSurfaceVariant: '#9FB8CD',
        surfaceContainerLowest: '#05121B',
        surfaceContainerLow: '#15293A',
        surfaceContainer: '#1F3545',
        surfaceContainerHigh: '#294050',
        surfaceContainerHighest: '#334A5A',

        // Error colors
        error: '#F2B8B5',
        onError: '#601410',
        errorContainer: '#8C1D18',
        onErrorContainer: '#F9DEDC',

        // Outline colors
        outline: '#658CA7',
        outlineVariant: '#405F75',

        // Background
        background: '#0B1F30',
        onBackground: '#FFFFFF'
    }
} as const

// Gradients
export const gradients = {
    primary: 'linear-gradient(135deg, #147B9D 0%, #2497F9 100%)',
    secondary: 'linear-gradient(135deg, #29B9D8 0%, #2BC398 100%)',
    surface: 'linear-gradient(135deg, #214055 0%, #46668A 100%)',
    tertiary: 'linear-gradient(135deg, #296D98 0%, #2BC398 100%)'
} as const

// Chart-specific colors
export const chartColors = {
    agents: [
        '#4F48EC',
        '#28A745',
        '#FD7E14',
        '#DC3545',
        '#6F42C1',
        '#20C997'
    ]
} as const

// Theme utility functions
export const getTheme = (darkMode: boolean) => ({
    colors: darkMode ? colors.dark : colors.light,
    gradients,
    chartColors
})

// Chart theme helper
export const getChartTheme = (darkMode: boolean) => {
    const theme = darkMode ? colors.dark : colors.light
    return {
        surface: theme.surfaceContainer,
        onSurface: theme.onSurface,
        surfaceVariant: theme.surfaceVariant,
        onSurfaceVariant: theme.onSurfaceVariant,
        primary: theme.primary,
        outline: theme.outlineVariant
    }
}

// Export individual theme objects for convenience
export const lightTheme = colors.light
export const darkTheme = colors.dark
