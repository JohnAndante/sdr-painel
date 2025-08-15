/**
 * @deprecated Use ThemeContext instead
 * These hooks are kept for backward compatibility but will be removed
 * Use the context-based hooks from src/contexts/ThemeContext.tsx
 */

import { getTheme, getChartTheme, colors, gradients, chartColors } from '@/lib/theme'

export const useThemeLegacy = (darkMode: boolean) => {
  return getTheme(darkMode)
}

export const useChartThemeLegacy = (darkMode: boolean) => {
  return getChartTheme(darkMode)
}

export const useColorsLegacy = (darkMode: boolean) => {
  return darkMode ? colors.dark : colors.light
}

export const useGradients = () => {
  return gradients
}

export const useChartColorsLegacy = () => {
  return chartColors
}
