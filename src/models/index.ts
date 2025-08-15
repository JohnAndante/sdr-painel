// =============================================================================
// Data Models - Classes para gerenciar dados da API REST
// =============================================================================

import type {
  Company,
  CompanyRequest,
  User,
  UserRequest,
  Agent,
  AgentRequest,
  Customer,
  CustomerRequest,
  Routine,
  RoutineRequest,
  Call,
  CallRequest,
  CallAnalytics,
  AgentPerformance,
  RoutineAnalytics,
} from '../types/api.types';

// =============================================================================
// Base Model Class
// =============================================================================

export abstract class BaseModel {
  protected static baseUrl = '/api/v1';
  
  protected static async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return response.json();
  }
}

// =============================================================================
// Company Model
// =============================================================================

export class CompanyModel extends BaseModel {
  static async getCompanies(): Promise<Company[]> {
    return this.request<Company[]>('/companies');
  }

  static async getCompany(id: string): Promise<Company> {
    return this.request<Company>(`/companies/${id}`);
  }

  static async createCompany(data: CompanyRequest): Promise<Company> {
    return this.request<Company>('/companies', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  static async updateCompany(id: string, data: Partial<CompanyRequest>): Promise<Company> {
    return this.request<Company>(`/companies/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  static async deleteCompany(id: string): Promise<void> {
    return this.request<void>(`/companies/${id}`, {
      method: 'DELETE',
    });
  }

  static async uploadLogo(id: string, file: File): Promise<Company> {
    const formData = new FormData();
    formData.append('logo', file);

    return this.request<Company>(`/companies/${id}/logo`, {
      method: 'POST',
      body: formData,
      headers: {}, // Remove Content-Type to let browser set it for FormData
    });
  }
}

// =============================================================================
// User Model
// =============================================================================

export class UserModel extends BaseModel {
  static async getUsers(companyId?: string): Promise<User[]> {
    const query = companyId ? `?company_id=${companyId}` : '';
    return this.request<User[]>(`/users${query}`);
  }

  static async getUser(id: string): Promise<User> {
    return this.request<User>(`/users/${id}`);
  }

  static async createUser(data: UserRequest): Promise<User> {
    return this.request<User>('/users', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  static async updateUser(id: string, data: Partial<UserRequest>): Promise<User> {
    return this.request<User>(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  static async deleteUser(id: string): Promise<void> {
    return this.request<void>(`/users/${id}`, {
      method: 'DELETE',
    });
  }

  static async getCurrentUser(): Promise<User> {
    return this.request<User>('/users/me');
  }
}

// =============================================================================
// Agent Model
// =============================================================================

export class AgentModel extends BaseModel {
  static async getAgents(): Promise<Agent[]> {
    return this.request<Agent[]>('/agents');
  }

  static async getAgent(id: string): Promise<Agent> {
    return this.request<Agent>(`/agents/${id}`);
  }

  static async createAgent(data: AgentRequest): Promise<Agent> {
    return this.request<Agent>('/agents', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  static async updateAgent(id: string, data: Partial<AgentRequest>): Promise<Agent> {
    return this.request<Agent>(`/agents/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  static async deleteAgent(id: string): Promise<void> {
    return this.request<void>(`/agents/${id}`, {
      method: 'DELETE',
    });
  }

  static async toggleAgentStatus(id: string, active: boolean): Promise<Agent> {
    return this.request<Agent>(`/agents/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ active }),
    });
  }

  static async getAgentPerformance(
    id: string,
    period: 'today' | '7d' | '30d' | '90d' = '7d'
  ): Promise<AgentPerformance> {
    return this.request<AgentPerformance>(`/agents/${id}/performance?period=${period}`);
  }
}

// =============================================================================
// Customer Model (Subjects)
// =============================================================================

export class CustomerModel extends BaseModel {
  static async getCustomers(): Promise<Customer[]> {
    return this.request<Customer[]>('/customers');
  }

  static async getCustomer(id: string): Promise<Customer> {
    return this.request<Customer>(`/customers/${id}`);
  }

  static async createCustomer(data: CustomerRequest): Promise<Customer> {
    return this.request<Customer>('/customers', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  static async updateCustomer(id: string, data: Partial<CustomerRequest>): Promise<Customer> {
    return this.request<Customer>(`/customers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  static async deleteCustomer(id: string): Promise<void> {
    return this.request<void>(`/customers/${id}`, {
      method: 'DELETE',
    });
  }

  static async bulkImportCustomers(customers: CustomerRequest[]): Promise<{
    successful: number;
    failed: number;
    errors: Array<{ row: number; message: string }>;
  }> {
    return this.request('/customers/bulk-import', {
      method: 'POST',
      body: JSON.stringify({ customers }),
    });
  }

  static async exportCustomers(format: 'csv' | 'xlsx' = 'csv'): Promise<Blob> {
    const response = await fetch(`${this.baseUrl}/customers/export?format=${format}`, {
      method: 'GET',
    });
    
    if (!response.ok) {
      throw new Error(`Export failed: ${response.statusText}`);
    }
    
    return response.blob();
  }
}

// =============================================================================
// Routine Model
// =============================================================================

export class RoutineModel extends BaseModel {
  static async getRoutines(): Promise<Routine[]> {
    return this.request<Routine[]>('/routines');
  }

  static async getRoutine(id: string): Promise<Routine> {
    return this.request<Routine>(`/routines/${id}`);
  }

  static async createRoutine(data: RoutineRequest): Promise<Routine> {
    return this.request<Routine>('/routines', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  static async updateRoutine(id: string, data: Partial<RoutineRequest>): Promise<Routine> {
    return this.request<Routine>(`/routines/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  static async deleteRoutine(id: string): Promise<void> {
    return this.request<void>(`/routines/${id}`, {
      method: 'DELETE',
    });
  }

  static async startRoutine(id: string): Promise<Routine> {
    return this.request<Routine>(`/routines/${id}/start`, {
      method: 'POST',
    });
  }

  static async stopRoutine(id: string): Promise<Routine> {
    return this.request<Routine>(`/routines/${id}/stop`, {
      method: 'POST',
    });
  }

  static async getRoutineAnalytics(
    id: string,
    period: 'today' | '7d' | '30d' | '90d' = '7d'
  ): Promise<RoutineAnalytics> {
    return this.request<RoutineAnalytics>(`/routines/${id}/analytics?period=${period}`);
  }
}

// =============================================================================
// Call Model
// =============================================================================

export class CallModel extends BaseModel {
  static async getCalls(): Promise<Call[]> {
    return this.request<Call[]>('/calls');
  }

  static async getCall(id: string): Promise<Call> {
    return this.request<Call>(`/calls/${id}`);
  }

  static async initiateCall(data: CallRequest): Promise<{
    call_id: string;
    status: 'initiated' | 'failed';
    message?: string;
  }> {
    return this.request('/calls/initiate', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  static async bulkInitiateCalls(data: {
    agent_id: string;
    phone_numbers: string[];
    customer_ids?: string[];
  }): Promise<{
    successful: number;
    failed: number;
    call_ids: string[];
    errors: Array<{ phone: string; message: string }>;
  }> {
    return this.request('/calls/bulk-initiate', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  static async getCallTranscription(id: string): Promise<{
    transcription: string;
    confidence: number;
    language: string;
  }> {
    return this.request(`/calls/${id}/transcription`);
  }

  static async getCallAnalytics(
    period: 'today' | '7d' | '30d' | '90d' = '7d'
  ): Promise<CallAnalytics> {
    return this.request<CallAnalytics>(`/calls/analytics?period=${period}`);
  }

  static async getCallsByAgent(agentId: string): Promise<Call[]> {
    return this.request<Call[]>(`/calls?agent_id=${agentId}`);
  }

  static async getCallsByCustomer(customerId: string): Promise<Call[]> {
    return this.request<Call[]>(`/calls?customer_id=${customerId}`);
  }
}

// =============================================================================
// Analytics Model
// =============================================================================

export class AnalyticsModel extends BaseModel {
  static async getDashboardMetrics(
    period: 'today' | '7d' | '30d' | '90d' = '7d'
  ): Promise<{
    total_calls: number;
    success_rate: number;
    active_agents: number;
    active_routines: number;
    call_duration_avg: number;
    calls_by_hour: Array<{ hour: number; count: number }>;
    top_performing_agents: Array<{
      agent_id: string;
      name: string;
      success_rate: number;
    }>;
  }> {
    return this.request(`/analytics/dashboard?period=${period}`);
  }

  static async getAgentsPerformance(
    period: 'today' | '7d' | '30d' | '90d' = '7d'
  ): Promise<AgentPerformance[]> {
    return this.request<AgentPerformance[]>(`/analytics/agents?period=${period}`);
  }

  static async getRoutinesPerformance(
    period: 'today' | '7d' | '30d' | '90d' = '7d'
  ): Promise<RoutineAnalytics[]> {
    return this.request<RoutineAnalytics[]>(`/analytics/routines?period=${period}`);
  }

  static async getCallTrends(
    period: 'today' | '7d' | '30d' | '90d' = '7d'
  ): Promise<{
    timeline: Array<{
      date: string;
      total_calls: number;
      successful_calls: number;
      success_rate: number;
    }>;
    mood_distribution: Array<{
      mood: 'positive' | 'neutral' | 'negative';
      count: number;
      percentage: number;
    }>;
  }> {
    return this.request(`/analytics/calls/trends?period=${period}`);
  }
}

// =============================================================================
// Auth Model
// =============================================================================

export class AuthModel extends BaseModel {
  static async login(email: string, password: string): Promise<{
    user: User;
    token: string;
    expires_in: number;
  }> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  static async logout(): Promise<void> {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  static async refreshToken(): Promise<{
    token: string;
    expires_in: number;
  }> {
    return this.request('/auth/refresh', {
      method: 'POST',
    });
  }

  static async forgotPassword(email: string): Promise<{
    message: string;
  }> {
    return this.request('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  static async resetPassword(token: string, password: string): Promise<{
    message: string;
  }> {
    return this.request('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, password }),
    });
  }
}

// =============================================================================
// Export all models
// =============================================================================

export {
  BaseModel,
  CompanyModel,
  UserModel,
  AgentModel,
  CustomerModel,
  RoutineModel,
  CallModel,
  AnalyticsModel,
  AuthModel,
};
