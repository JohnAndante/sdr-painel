/**
 * Custom Design Tokens for Gerson Call Center System
 * Based on the provided color palette and Poppins typography
 */

// Custom Color Palette - Light Theme
const CUSTOM_LIGHT_COLORS = {
  // Primary Colors (Green)
  'md-sys-color-primary': '#38B068',
  'md-sys-color-on-primary': '#FFFFFF',
  'md-sys-color-primary-container': '#1F793D',
  'md-sys-color-on-primary-container': '#FFFFFF',

  // Secondary Colors (Blue/Teal)
  'md-sys-color-secondary': '#2407F9',
  'md-sys-color-on-secondary': '#FFFFFF',
  'md-sys-color-secondary-container': '#48C398',
  'md-sys-color-on-secondary-container': '#FFFFFF',

  // Tertiary Colors (Gray/Blue tones)
  'md-sys-color-tertiary': '#81BECD',
  'md-sys-color-on-tertiary': '#01141F',
  'md-sys-color-tertiary-container': '#658CA7',
  'md-sys-color-on-tertiary-container': '#FFFFFF',

  // Error Colors
  'md-sys-color-error': '#FF5449',
  'md-sys-color-on-error': '#FFFFFF',
  'md-sys-color-error-container': '#FFEBE9',
  'md-sys-color-on-error-container': '#410002',

  // Surface Colors
  'md-sys-color-surface': '#FFFFFF',
  'md-sys-color-on-surface': '#01141F',
  'md-sys-color-surface-variant': '#F8F9FA',
  'md-sys-color-on-surface-variant': '#465E6A',
  'md-sys-color-surface-container-highest': '#F1F3F4',
  'md-sys-color-surface-container-high': '#F8F9FA',
  'md-sys-color-surface-container': '#FAFBFB',
  'md-sys-color-surface-container-low': '#FEFEFE',
  'md-sys-color-surface-container-lowest': '#FFFFFF',

  // Outline
  'md-sys-color-outline': '#658CA7',
  'md-sys-color-outline-variant': '#81BECD',

  // Other
  'md-sys-color-background': '#FFFFFF',
  'md-sys-color-on-background': '#01141F',
  'md-sys-color-inverse-surface': '#1C2934',
  'md-sys-color-inverse-on-surface': '#FFFFFF',
  'md-sys-color-inverse-primary': '#48C398',
  'md-sys-color-scrim': '#000000',
  'md-sys-color-shadow': '#000000',
} as const;

// Custom Color Palette - Dark Theme
const CUSTOM_DARK_COLORS = {
  // Primary Colors (Teal/Green)
  'md-sys-color-primary': '#48C398',
  'md-sys-color-on-primary': '#01141F',
  'md-sys-color-primary-container': '#38B068',
  'md-sys-color-on-primary-container': '#FFFFFF',

  // Secondary Colors (Light Blue/Teal)
  'md-sys-color-secondary': '#81BECD',
  'md-sys-color-on-secondary': '#01141F',
  'md-sys-color-secondary-container': '#2407F9',
  'md-sys-color-on-secondary-container': '#FFFFFF',

  // Tertiary Colors (Gray tones)
  'md-sys-color-tertiary': '#658CA7',
  'md-sys-color-on-tertiary': '#FFFFFF',
  'md-sys-color-tertiary-container': '#465E6A',
  'md-sys-color-on-tertiary-container': '#81BECD',

  // Error Colors
  'md-sys-color-error': '#FFB4AB',
  'md-sys-color-on-error': '#690005',
  'md-sys-color-error-container': '#93000A',
  'md-sys-color-on-error-container': '#FFDAD6',

  // Surface Colors (Dark backgrounds)
  'md-sys-color-surface': '#01141F',
  'md-sys-color-on-surface': '#FFFFFF',
  'md-sys-color-surface-variant': '#1C2934',
  'md-sys-color-on-surface-variant': '#81BECD',
  'md-sys-color-surface-container-highest': '#465E6A',
  'md-sys-color-surface-container-high': '#214055',
  'md-sys-color-surface-container': '#1C2934',
  'md-sys-color-surface-container-low': '#01141F',
  'md-sys-color-surface-container-lowest': '#000000',

  // Outline
  'md-sys-color-outline': '#658CA7',
  'md-sys-color-outline-variant': '#465E6A',

  // Other
  'md-sys-color-background': '#01141F',
  'md-sys-color-on-background': '#FFFFFF',
  'md-sys-color-inverse-surface': '#FFFFFF',
  'md-sys-color-inverse-on-surface': '#01141F',
  'md-sys-color-inverse-primary': '#38B068',
  'md-sys-color-scrim': '#000000',
  'md-sys-color-shadow': '#000000',
} as const;

// Custom Gradients
const CUSTOM_GRADIENTS = {
  'gradient-primary': 'linear-gradient(135deg, #1F793D 0%, #78C318 100%)',
  'gradient-secondary': 'linear-gradient(135deg, #48C398 0%, #2407F9 100%)',
  'gradient-surface': 'linear-gradient(135deg, #214055 0%, #465E6A 100%)',
  'gradient-success': 'linear-gradient(135deg, #38B068 0%, #48C398 100%)',
  'gradient-warning': 'linear-gradient(135deg, #F59E0B 0%, #F97316 100%)',
  'gradient-error': 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
} as const;

// Poppins Typography Scale
const POPPINS_TYPOGRAPHY = {
  // Display
  'md-sys-typescale-display-large': {
    'font-family': 'Poppins',
    'font-size': '57px',
    'font-weight': 400,
    'line-height': '64px',
    'letter-spacing': '-0.25px',
  },
  'md-sys-typescale-display-medium': {
    'font-family': 'Poppins',
    'font-size': '45px',
    'font-weight': 400,
    'line-height': '52px',
    'letter-spacing': '0px',
  },
  'md-sys-typescale-display-small': {
    'font-family': 'Poppins',
    'font-size': '36px',
    'font-weight': 400,
    'line-height': '44px',
    'letter-spacing': '0px',
  },

  // Headline
  'md-sys-typescale-headline-large': {
    'font-family': 'Poppins',
    'font-size': '32px',
    'font-weight': 500,
    'line-height': '40px',
    'letter-spacing': '0px',
  },
  'md-sys-typescale-headline-medium': {
    'font-family': 'Poppins',
    'font-size': '28px',
    'font-weight': 500,
    'line-height': '36px',
    'letter-spacing': '0px',
  },
  'md-sys-typescale-headline-small': {
    'font-family': 'Poppins',
    'font-size': '24px',
    'font-weight': 500,
    'line-height': '32px',
    'letter-spacing': '0px',
  },

  // Title
  'md-sys-typescale-title-large': {
    'font-family': 'Poppins',
    'font-size': '22px',
    'font-weight': 500,
    'line-height': '28px',
    'letter-spacing': '0px',
  },
  'md-sys-typescale-title-medium': {
    'font-family': 'Poppins',
    'font-size': '16px',
    'font-weight': 600,
    'line-height': '24px',
    'letter-spacing': '0.15px',
  },
  'md-sys-typescale-title-small': {
    'font-family': 'Poppins',
    'font-size': '14px',
    'font-weight': 600,
    'line-height': '20px',
    'letter-spacing': '0.1px',
  },

  // Body
  'md-sys-typescale-body-large': {
    'font-family': 'Poppins',
    'font-size': '16px',
    'font-weight': 400,
    'line-height': '24px',
    'letter-spacing': '0.5px',
  },
  'md-sys-typescale-body-medium': {
    'font-family': 'Poppins',
    'font-size': '14px',
    'font-weight': 400,
    'line-height': '20px',
    'letter-spacing': '0.25px',
  },
  'md-sys-typescale-body-small': {
    'font-family': 'Poppins',
    'font-size': '12px',
    'font-weight': 400,
    'line-height': '16px',
    'letter-spacing': '0.4px',
  },

  // Label
  'md-sys-typescale-label-large': {
    'font-family': 'Poppins',
    'font-size': '14px',
    'font-weight': 600,
    'line-height': '20px',
    'letter-spacing': '0.1px',
  },
  'md-sys-typescale-label-medium': {
    'font-family': 'Poppins',
    'font-size': '12px',
    'font-weight': 600,
    'line-height': '16px',
    'letter-spacing': '0.5px',
  },
  'md-sys-typescale-label-small': {
    'font-family': 'Poppins',
    'font-size': '11px',
    'font-weight': 600,
    'line-height': '16px',
    'letter-spacing': '0.5px',
  },
} as const;

// MD3 Elevation (updated with custom shadow colors)
const CUSTOM_ELEVATION = {
  'md-sys-elevation-level0': {
    'box-shadow': 'none',
  },
  'md-sys-elevation-level1': {
    'box-shadow': '0px 1px 2px 0px rgba(1, 20, 31, 0.3), 0px 1px 3px 1px rgba(1, 20, 31, 0.15)',
  },
  'md-sys-elevation-level2': {
    'box-shadow': '0px 1px 2px 0px rgba(1, 20, 31, 0.3), 0px 2px 6px 2px rgba(1, 20, 31, 0.15)',
  },
  'md-sys-elevation-level3': {
    'box-shadow': '0px 1px 3px 0px rgba(1, 20, 31, 0.3), 0px 4px 8px 3px rgba(1, 20, 31, 0.15)',
  },
  'md-sys-elevation-level4': {
    'box-shadow': '0px 2px 3px 0px rgba(1, 20, 31, 0.3), 0px 6px 10px 4px rgba(1, 20, 31, 0.15)',
  },
  'md-sys-elevation-level5': {
    'box-shadow': '0px 4px 4px 0px rgba(1, 20, 31, 0.3), 0px 8px 12px 6px rgba(1, 20, 31, 0.15)',
  },
} as const;

// MD3 Shape
const MD3_SHAPE = {
  'md-sys-shape-corner-none': '0px',
  'md-sys-shape-corner-extra-small': '4px',
  'md-sys-shape-corner-small': '8px',
  'md-sys-shape-corner-medium': '12px',
  'md-sys-shape-corner-large': '16px',
  'md-sys-shape-corner-extra-large': '28px',
  'md-sys-shape-corner-full': '50%',
} as const;

// MD3 Motion
const MD3_MOTION = {
  'md-sys-motion-duration-short1': '50ms',
  'md-sys-motion-duration-short2': '100ms',
  'md-sys-motion-duration-short3': '150ms',
  'md-sys-motion-duration-short4': '200ms',
  'md-sys-motion-duration-medium1': '250ms',
  'md-sys-motion-duration-medium2': '300ms',
  'md-sys-motion-duration-medium3': '350ms',
  'md-sys-motion-duration-medium4': '400ms',
  'md-sys-motion-duration-long1': '450ms',
  'md-sys-motion-duration-long2': '500ms',
  'md-sys-motion-duration-long3': '550ms',
  'md-sys-motion-duration-long4': '600ms',
  'md-sys-motion-duration-extra-long1': '700ms',
  'md-sys-motion-duration-extra-long2': '800ms',
  'md-sys-motion-duration-extra-long3': '900ms',
  'md-sys-motion-duration-extra-long4': '1000ms',

  'md-sys-motion-easing-linear': 'cubic-bezier(0, 0, 1, 1)',
  'md-sys-motion-easing-standard': 'cubic-bezier(0.2, 0, 0, 1)',
  'md-sys-motion-easing-emphasized': 'cubic-bezier(0.2, 0, 0, 1)',
  'md-sys-motion-easing-emphasized-decelerate': 'cubic-bezier(0.05, 0.7, 0.1, 1)',
  'md-sys-motion-easing-emphasized-accelerate': 'cubic-bezier(0.3, 0, 0.8, 0.15)',
} as const;

// MD3 State Layers
const MD3_STATE_LAYERS = {
  'md-sys-state-hover-state-layer-opacity': 0.08,
  'md-sys-state-focus-state-layer-opacity': 0.12,
  'md-sys-state-pressed-state-layer-opacity': 0.12,
  'md-sys-state-dragged-state-layer-opacity': 0.16,
  'md-sys-state-disabled-content-opacity': 0.38,
  'md-sys-state-disabled-container-opacity': 0.12,
} as const;

// Component-specific tokens with custom colors
const CUSTOM_COMPONENT_TOKENS = {
  // Button
  'md-comp-filled-button-container-height': '40px',
  'md-comp-filled-button-container-shape': MD3_SHAPE['md-sys-shape-corner-full'],
  'md-comp-filled-button-label-text-size': '14px',
  'md-comp-filled-button-label-text-weight': 600,
  'md-comp-filled-button-with-icon-icon-size': '18px',

  // Card
  'md-comp-elevated-card-container-elevation': CUSTOM_ELEVATION['md-sys-elevation-level1'],
  'md-comp-elevated-card-container-shape': MD3_SHAPE['md-sys-shape-corner-medium'],
  'md-comp-outlined-card-outline-width': '1px',

  // Text Field
  'md-comp-outlined-text-field-container-shape': MD3_SHAPE['md-sys-shape-corner-extra-small'],
  'md-comp-outlined-text-field-outline-width': '1px',
  'md-comp-outlined-text-field-input-text-size': '16px',
  'md-comp-outlined-text-field-label-text-size': '16px',

  // Navigation
  'md-comp-navigation-drawer-container-width': '360px',
  'md-comp-navigation-rail-container-width': '80px',
  'md-comp-navigation-bar-container-height': '80px',

  // Top App Bar
  'md-comp-top-app-bar-container-height': '64px',
  'md-comp-top-app-bar-headline-size': '22px',
  'md-comp-top-app-bar-headline-weight': 500,

  // Dialog
  'md-comp-dialog-container-elevation': CUSTOM_ELEVATION['md-sys-elevation-level3'],
  'md-comp-dialog-container-shape': MD3_SHAPE['md-sys-shape-corner-extra-large'],
} as const;

// Export main tokens object (new format)
export const CUSTOM_TOKENS = {
  light: CUSTOM_LIGHT_COLORS,
  dark: CUSTOM_DARK_COLORS,
  gradients: CUSTOM_GRADIENTS,
  typography: POPPINS_TYPOGRAPHY,
  elevation: CUSTOM_ELEVATION,
  shape: MD3_SHAPE,
  motion: MD3_MOTION,
  state: MD3_STATE_LAYERS,
  components: CUSTOM_COMPONENT_TOKENS,
} as const;

// Legacy MD3_TOKENS export for backward compatibility
export const MD3_TOKENS = {
  // Colors
  light: CUSTOM_LIGHT_COLORS,
  dark: CUSTOM_DARK_COLORS,
  
  // Typography (Poppins)
  typography: POPPINS_TYPOGRAPHY,
  
  // Layout & Design
  elevation: CUSTOM_ELEVATION,
  shape: MD3_SHAPE,
  motion: MD3_MOTION,
  state: MD3_STATE_LAYERS,
  components: CUSTOM_COMPONENT_TOKENS,
  
  // Custom additions
  gradients: CUSTOM_GRADIENTS,
} as const;

// Helper functions for accessing tokens
export const getCustomColor = (colorKey: keyof typeof CUSTOM_LIGHT_COLORS, isDark = false) => {
  return isDark ? CUSTOM_DARK_COLORS[colorKey] : CUSTOM_LIGHT_COLORS[colorKey];
};

export const getCustomGradient = (gradientKey: keyof typeof CUSTOM_GRADIENTS) => {
  return CUSTOM_GRADIENTS[gradientKey];
};

export const getPoppinsTypography = (scaleKey: keyof typeof POPPINS_TYPOGRAPHY) => {
  return POPPINS_TYPOGRAPHY[scaleKey];
};

export const getCustomElevation = (levelKey: keyof typeof CUSTOM_ELEVATION) => {
  return CUSTOM_ELEVATION[levelKey];
};

export const getCustomShape = (shapeKey: keyof typeof MD3_SHAPE) => {
  return MD3_SHAPE[shapeKey];
};

// Color palette constants for easy reference
export const COLOR_PALETTE = {
  // Primary colors
  PRIMARY_GREEN: '#38B068',
  PRIMARY_GREEN_DARK: '#1F793D',
  PRIMARY_GRADIENT: '#78C318',
  
  // Secondary colors  
  SECONDARY_BLUE: '#2407F9',
  SECONDARY_TEAL: '#48C398',
  
  // Surface colors
  SURFACE_DARK: '#01141F',
  SURFACE_MEDIUM: '#1C2934',
  SURFACE_LIGHT: '#214055',
  SURFACE_GRAY: '#465E6A',
  
  // Text colors
  TEXT_PRIMARY: '#FFFFFF',
  TEXT_SECONDARY: '#658CA7',
  TEXT_TERTIARY: '#81BECD',
  
  // Background colors
  BG_DARK: '#01141F',
  BG_MEDIUM: '#1C2934',
  BG_LIGHT: '#FFFFFF',
} as const;

// Default export for backward compatibility
export default CUSTOM_TOKENS;