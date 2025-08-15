export const APP_CONFIG = {
  name: 'Gerson',
  version: '1.0.0',
  description: 'Sistema de Call Center Automatizado',
} as const;

export const STORAGE_KEYS = {
  user: 'gerson_user',
} as const;

export const ROUTES = {
  dashboard: 'dashboard',
  agentes: 'agentes',
  rotinas: 'rotinas',
  'rotina-detalhes': 'rotina-detalhes',
  usuarios: 'usuarios',
  logout: 'logout',
} as const;

export const VIEW_MODES = {
  list: 'list',
  form: 'form',
  details: 'details',
} as const;

export const PERIODS = {
  hoje: 'hoje',
  sevenDays: '7d',
  thirtyDays: '30d',
} as const;

// Responsive breakpoints following mobile-first approach
export const BREAKPOINTS = {
  xs: '0px',      // Extra small devices
  sm: '640px',    // Small devices (phones)
  md: '768px',    // Medium devices (tablets)
  lg: '1024px',   // Large devices (laptops)
  xl: '1280px',   // Extra large devices (desktops)
  xxl: '1536px',  // Extra extra large devices
} as const;

export const Z_INDEX = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  overlay: 40,
  modal: 50,
  popover: 60,
  tooltip: 70,
  toast: 80,
} as const;

// Layout constants for responsive design
export const LAYOUT = {
  sideNav: {
    width: {
      expanded: '280px',
      collapsed: '80px',
      mobile: '320px',
    },
    breakpoint: '1024px', // lg breakpoint
  },
  topBar: {
    height: '64px',
  },
  content: {
    padding: {
      mobile: '16px',
      desktop: '24px',
    },
    maxWidth: '1440px',
  },
} as const;

export const MOCK_USERS = [
  {
    email: 'admin@gerson.com',
    password: '123456',
    name: 'Administrador',
    role: 'admin' as const,
  },
  {
    email: 'user@gerson.com',
    password: '123456',
    name: 'Usuário',
    role: 'user' as const,
  },
] as const;