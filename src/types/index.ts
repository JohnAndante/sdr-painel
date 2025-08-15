// User types
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
  avatar?: string | null;
  lastLogin: string;
  rememberMe?: boolean;
}

// Agent types
export interface Agent {
  id: number;
  agente: string;
  persona: string;
  funcao: string;
  idioma: string;
  rotinasAtivas: number;
  taxaSucesso: string;
  ultimaAtividade: string;
  status: 'Ativo' | 'Inativo';
}

export interface AgentFormData {
  nome: string;
  persona: string;
  funcao: string;
  idioma: string;
  ativo: boolean;
}

// Ligacao types
export interface Ligacao {
  id: number;
  numero: string;
  nomeContato?: string;
  dataHora: string;
  duracao: string; // em segundos ou formato "mm:ss"
  status: 'Atendida' | 'Não atendida' | 'Ocupado' | 'Caixa postal' | 'Número inválido';
  resultado: 'Sucesso' | 'Falha' | 'Follow-up' | 'Não interessado' | 'Callback';
  tentativas: number;
  observacoes?: string;
  gravacao?: boolean;
  transcricao?: string;
  pontuacao?: number; // 0-100
  proximoContato?: string; // data para callback
}

export interface LigacaoDetalhes extends Ligacao {
  rotina: {
    id: number;
    nome: string;
  };
  agente: {
    nome: string;
    persona: string;
  };
  contextoAtendimento: string;
  stackUsada: string[];
  metricas: {
    tempoResposta: string;
    palavrasChave: string[];
    sentimento: 'Positivo' | 'Neutro' | 'Negativo';
    confianca: number; // 0-100
  };
}

// Rotina types
export interface Rotina {
  id: number;
  nome: string;
  descricao: string;
  agente: string;
  dataInicio: string;
  horaInicio: string;
  dataFim: string;
  horaFim: string;
  totalNumeros: number;
  ligacoesEfetuadas: number;
  sucessos: number;
  falhas: number;
  status: string;
  contextoAtendimento: string;
  stackAtendimento: string[];
  numeros: string[];
}

export interface RotinaDetalhes extends Rotina {
  ligacoes: Ligacao[];
  processo: {
    objetivo: string;
    estrategia: string;
    scriptBase: string;
  };
  metricas: {
    taxaSucesso: number;
    duracaoMedia: string;
    melhorHorario: string;
    tentativasMedia: number;
  };
}

export interface RotinaFormData {
  nome: string;
  descricao: string;
  agente: string;
  dataInicio: string;
  horaInicio: string;
  dataFim: string;
  horaFim: string;
  totalNumeros: number;
  ligacoesEfetuadas: number;
  sucessos: number;
  falhas: number;
  status: string;
  contextoAtendimento: string;
  stackAtendimento: string[];
  numeros: string[];
}

// Usuario types
export interface Usuario {
  id: number;
  nome: string;
  email: string;
  funcao: string;
  departamento: string;
  telefone: string;
  status: string;
  ultimoAcesso: string;
  dataCriacao: string;
  permissoes: string[];
}

export interface UsuarioFormData {
  nome: string;
  email: string;
  funcao: string;
  departamento: string;
  telefone: string;
  status: string;
  permissoes: string[];
}

// App state types
export type PageId = 'dashboard' | 'agentes' | 'rotinas' | 'rotina-detalhes' | 'usuarios';
export type ViewMode = 'list' | 'form' | 'details';
export type Period = 'hoje' | '7d' | '30d';

// Auth types
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  acceptTerms: boolean;
}

// Theme types
export interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

// App context types
export interface AppContextType {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  isMobile: boolean;
  setIsMobile: (mobile: boolean) => void;
}

// =============================================================================
// Re-export API types for compatibility
// =============================================================================
export type {
  // Base
  BaseEntity,
  
  // Company & Users
  Company,
  CompanyRequest,
  User as ApiUser,
  UserRequest,
  Auth,
  AuthRequest,
  LoginResponse,
  
  // Agents
  Agent as ApiAgent,
  AgentRequest,
  AgentStep,
  
  // Customers
  Customer,
  CustomerRequest,
  BulkCustomerImport,
  BulkImportResult,
  
  // Routines
  Routine as ApiRoutine,
  RoutineRequest,
  AgentHasRoutine,
  
  // Calls
  Call as ApiCall,
  CallRequest,
  BulkCallRequest,
  CallResult,
  
  // Analytics
  CallAnalytics,
  AgentPerformance,
  RoutineAnalytics,
  
  // API
  ApiResponse,
  PaginatedResponse,
  ApiError,
  
  // Filters
  CustomerFilters,
  CallFilters,
  AgentFilters,
  RoutineFilters,
  
  // Config
  Config,
  
  // Events
  CallEvent,
  AgentEvent,
} from './api.types';