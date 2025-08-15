// =============================================================================
// API Types - Baseado no Schema Prisma
// =============================================================================

// Base types for common fields
export interface BaseEntity {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

// =============================================================================
// Company & User Management
// =============================================================================

export interface Company extends BaseEntity {
  name: string;
  document_number: string;
  logo_url?: string | null;
  active: boolean;
  users: User[];
}

export interface CompanyRequest {
  name: string;
  document_number: string;
  logo_url?: string | null;
  active?: boolean;
}

export interface User extends BaseEntity {
  company_id: string;
  name: string;
  email: string;
  document_number: string;
  user_type: 'admin' | 'operator' | 'viewer';
  auth?: Auth | null;
  company: Company;
}

export interface UserRequest {
  company_id: string;
  name: string;
  email: string;
  document_number: string;
  user_type: 'admin' | 'operator' | 'viewer';
}

export interface Auth extends BaseEntity {
  user_id: string;
  email: string;
  password: string;
  active: boolean;
  user: User;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  expires_in: number;
}

// =============================================================================
// Voice AI Agents
// =============================================================================

export interface AgentStep {
  id: string;
  order: number;
  description: string;
  prompt: string;
  expected_response?: string;
  next_step_conditions?: Record<string, string>;
}

export interface Agent extends BaseEntity {
  name: string;
  description: string;
  objective: string;
  personality: 'friendly' | 'formal' | 'persuasive' | 'supportive';
  voice_type: 'male_1' | 'male_2' | 'female_1' | 'female_2';
  active: boolean;
  steps: AgentStep[];
  routines: AgentHasRoutine[];
  calls: Call[];
}

export interface AgentRequest {
  name: string;
  description: string;
  objective: string;
  personality: 'friendly' | 'formal' | 'persuasive' | 'supportive';
  voice_type: 'male_1' | 'male_2' | 'female_1' | 'female_2';
  active?: boolean;
  steps?: AgentStep[];
}

// =============================================================================
// Customers (Subjects)
// =============================================================================

export interface Customer extends BaseEntity {
  name?: string | null;
  email?: string | null;
  phone_number?: string | null;
  document_number?: string | null;
  personality?: string | null;
  context: Record<string, any>;
  calls: Call[];
}

export interface CustomerRequest {
  name?: string | null;
  email?: string | null;
  phone_number?: string | null;
  document_number?: string | null;
  personality?: string | null;
  context?: Record<string, any>;
}

export interface BulkCustomerImport {
  customers: CustomerRequest[];
}

export interface BulkImportResult {
  successful: number;
  failed: number;
  errors: Array<{
    row: number;
    customer: CustomerRequest;
    message: string;
  }>;
}

// =============================================================================
// Routines (Campaigns)
// =============================================================================

export interface Routine extends BaseEntity {
  name: string;
  active: boolean;
  success_count: number;
  fail_count: number;
  status?: string | null;
  start_time: string;
  end_time?: string | null;
  agents: AgentHasRoutine[];
}

export interface RoutineRequest {
  name: string;
  active?: boolean;
  status?: string | null;
  start_time: string;
  end_time?: string | null;
  agent_ids: string[];
}

export interface AgentHasRoutine {
  agent_id: string;
  routine_id: string;
  agent: Agent;
  routine: Routine;
}

// =============================================================================
// Calls & Analytics
// =============================================================================

export interface Call extends BaseEntity {
  agent_id: string;
  customer_id?: string | null;
  phone_called: string;
  success: number; // 0 = failed, 1 = success, 2 = partial
  transcription?: string | null;
  mood?: 'positive' | 'neutral' | 'negative' | null;
  extra_context: Record<string, any>;
  duration_secs: number;
  agent: Agent;
  customer?: Customer | null;
}

export interface CallRequest {
  agent_id: string;
  customer_id?: string | null;
  phone_called: string;
}

export interface BulkCallRequest {
  agent_id: string;
  phone_numbers: string[];
  customer_ids?: string[];
  schedule_time?: string; // ISO string for scheduling
}

export interface CallResult {
  call_id: string;
  status: 'initiated' | 'completed' | 'failed' | 'scheduled';
  message?: string;
}

// =============================================================================
// Analytics & Reporting
// =============================================================================

export interface CallAnalytics {
  period: 'today' | '7d' | '30d' | '90d';
  total_calls: number;
  successful_calls: number;
  failed_calls: number;
  success_rate: number;
  average_duration: number;
  total_duration: number;
  calls_by_hour: Array<{
    hour: number;
    count: number;
    success_rate: number;
  }>;
  calls_by_mood: Array<{
    mood: 'positive' | 'neutral' | 'negative';
    count: number;
    percentage: number;
  }>;
  top_agents: Array<{
    agent_id: string;
    agent_name: string;
    total_calls: number;
    success_rate: number;
  }>;
}

export interface AgentPerformance {
  agent_id: string;
  agent_name: string;
  period: 'today' | '7d' | '30d' | '90d';
  total_calls: number;
  successful_calls: number;
  success_rate: number;
  average_duration: number;
  best_performing_time: string;
  mood_distribution: Array<{
    mood: 'positive' | 'neutral' | 'negative';
    count: number;
  }>;
  recent_calls: Call[];
}

export interface RoutineAnalytics {
  routine_id: string;
  routine_name: string;
  period: 'today' | '7d' | '30d' | '90d';
  total_calls: number;
  success_count: number;
  fail_count: number;
  success_rate: number;
  agents_performance: Array<{
    agent_id: string;
    agent_name: string;
    calls_made: number;
    success_rate: number;
  }>;
  timeline: Array<{
    date: string;
    calls: number;
    successes: number;
  }>;
}

// =============================================================================
// API Response Wrappers
// =============================================================================

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: 'success' | 'error';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  message?: string;
  status: 'success' | 'error';
}

export interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, any>;
  status: 'error';
}

// =============================================================================
// Filters & Query Parameters
// =============================================================================

export interface CustomerFilters {
  search?: string;
  has_phone?: boolean;
  has_email?: boolean;
  personality?: string;
  created_after?: string;
  created_before?: string;
}

export interface CallFilters {
  agent_id?: string;
  customer_id?: string;
  success?: number;
  mood?: 'positive' | 'neutral' | 'negative';
  duration_min?: number;
  duration_max?: number;
  created_after?: string;
  created_before?: string;
}

export interface AgentFilters {
  active?: boolean;
  personality?: 'friendly' | 'formal' | 'persuasive' | 'supportive';
  voice_type?: 'male_1' | 'male_2' | 'female_1' | 'female_2';
  has_routines?: boolean;
}

export interface RoutineFilters {
  active?: boolean;
  status?: string;
  agent_id?: string;
  start_after?: string;
  start_before?: string;
}

// =============================================================================
// Configuration
// =============================================================================

export interface Config extends BaseEntity {
  // Empty for now, but ready for future configurations
}

// =============================================================================
// Webhook & Real-time Events
// =============================================================================

export interface CallEvent {
  type: 'call_started' | 'call_completed' | 'call_failed';
  call_id: string;
  agent_id: string;
  phone_number: string;
  timestamp: string;
  data?: Record<string, any>;
}

export interface AgentEvent {
  type: 'agent_busy' | 'agent_available' | 'agent_error';
  agent_id: string;
  timestamp: string;
  data?: Record<string, any>;
}

// =============================================================================
// Export all types
// =============================================================================

export type {
  // Base
  BaseEntity,
  
  // Company & Users
  Company,
  CompanyRequest,
  User,
  UserRequest,
  Auth,
  AuthRequest,
  LoginResponse,
  
  // Agents
  Agent,
  AgentRequest,
  AgentStep,
  
  // Customers
  Customer,
  CustomerRequest,
  BulkCustomerImport,
  BulkImportResult,
  
  // Routines
  Routine,
  RoutineRequest,
  AgentHasRoutine,
  
  // Calls
  Call,
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
};
