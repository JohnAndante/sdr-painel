// =============================================================================
// Call Controller - Gerenciamento de Ligações e Operações de Voz
// =============================================================================

import { CallModel } from '../models';
import type { Call, CallRequest, CallAnalytics } from '../types/api.types';

export default class CallController {
  // =============================================================================
  // Call Management
  // =============================================================================

  /**
   * Buscar todas as ligações
   */
  static getCalls = (): Promise<Call[]> => {
    return new Promise((resolve, reject) => {
      CallModel.getCalls()
        .then(resolve)
        .catch(reject);
    });
  };

  /**
   * Buscar ligação por ID
   */
  static getCall = (id: string): Promise<Call> => {
    return new Promise((resolve, reject) => {
      CallModel.getCall(id)
        .then(resolve)
        .catch(reject);
    });
  };

  /**
   * Iniciar ligação individual
   */
  static initiateCall = (callData: CallRequest): Promise<{
    call_id: string;
    status: 'initiated' | 'failed';
    message?: string;
  }> => {
    return new Promise((resolve, reject) => {
      // Validações básicas
      if (!callData.agent_id || !callData.phone_called) {
        reject(new Error('Agent ID e telefone são obrigatórios'));
        return;
      }

      CallModel.initiateCall(callData)
        .then(resolve)
        .catch(reject);
    });
  };

  /**
   * Iniciar múltiplas ligações em lote
   */
  static bulkInitiateCalls = (data: {
    agent_id: string;
    phone_numbers: string[];
    customer_ids?: string[];
  }): Promise<{
    successful: number;
    failed: number;
    call_ids: string[];
    errors: Array<{ phone: string; message: string }>;
  }> => {
    return new Promise((resolve, reject) => {
      // Validações
      if (!data.agent_id || !data.phone_numbers || data.phone_numbers.length === 0) {
        reject(new Error('Agent ID e lista de telefones são obrigatórios'));
        return;
      }

      if (data.phone_numbers.length > 1000) {
        reject(new Error('Máximo de 1000 ligações por lote'));
        return;
      }

      CallModel.bulkInitiateCalls(data)
        .then(resolve)
        .catch(reject);
    });
  };

  // =============================================================================
  // Call Analytics
  // =============================================================================

  /**
   * Buscar analytics de ligações
   */
  static getCallAnalytics = (
    period: 'today' | '7d' | '30d' | '90d' = '7d'
  ): Promise<CallAnalytics> => {
    return new Promise((resolve, reject) => {
      CallModel.getCallAnalytics(period)
        .then(resolve)
        .catch(reject);
    });
  };

  /**
   * Buscar ligações por agente
   */
  static getCallsByAgent = (agentId: string): Promise<Call[]> => {
    return new Promise((resolve, reject) => {
      CallModel.getCallsByAgent(agentId)
        .then(resolve)
        .catch(reject);
    });
  };

  /**
   * Buscar ligações por cliente
   */
  static getCallsByCustomer = (customerId: string): Promise<Call[]> => {
    return new Promise((resolve, reject) => {
      CallModel.getCallsByCustomer(customerId)
        .then(resolve)
        .catch(reject);
    });
  };

  // =============================================================================
  // Transcription & Analysis
  // =============================================================================

  /**
   * Buscar transcrição de uma ligação
   */
  static getCallTranscription = (id: string): Promise<{
    transcription: string;
    confidence: number;
    language: string;
  }> => {
    return new Promise((resolve, reject) => {
      CallModel.getCallTranscription(id)
        .then(resolve)
        .catch(reject);
    });
  };

  // =============================================================================
  // Call Status Helpers
  // =============================================================================

  /**
   * Mapear status da ligação para texto legível
   */
  static getCallStatusText = (success: number): string => {
    switch (success) {
      case 0:
        return 'Falha';
      case 1:
        return 'Sucesso';
      case 2:
        return 'Parcial';
      default:
        return 'Desconhecido';
    }
  };

  /**
   * Mapear mood para texto legível
   */
  static getMoodText = (mood: string | null): string => {
    switch (mood) {
      case 'positive':
        return 'Positivo';
      case 'neutral':
        return 'Neutro';
      case 'negative':
        return 'Negativo';
      default:
        return 'Não analisado';
    }
  };

  /**
   * Formatar duração da ligação
   */
  static formatDuration = (durationSecs: number): string => {
    const hours = Math.floor(durationSecs / 3600);
    const minutes = Math.floor((durationSecs % 3600) / 60);
    const seconds = durationSecs % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
  };

  // =============================================================================
  // Call Statistics
  // =============================================================================

  /**
   * Calcular estatísticas de ligações
   */
  static calculateCallStats = (calls: Call[]) => {
    const total = calls.length;
    const successful = calls.filter(c => c.success === 1).length;
    const failed = calls.filter(c => c.success === 0).length;
    const partial = calls.filter(c => c.success === 2).length;
    
    const totalDuration = calls.reduce((sum, call) => sum + call.duration_secs, 0);
    const avgDuration = total > 0 ? Math.round(totalDuration / total) : 0;
    
    const successRate = total > 0 ? Math.round((successful / total) * 100) : 0;

    // Distribuição por mood
    const moodStats = {
      positive: calls.filter(c => c.mood === 'positive').length,
      neutral: calls.filter(c => c.mood === 'neutral').length,
      negative: calls.filter(c => c.mood === 'negative').length,
      unknown: calls.filter(c => !c.mood).length,
    };

    return {
      total,
      successful,
      failed,
      partial,
      successRate,
      totalDuration,
      avgDuration,
      moodStats,
    };
  };

  /**
   * Agrupar ligações por período
   */
  static groupCallsByPeriod = (
    calls: Call[],
    period: 'hour' | 'day' | 'week' | 'month'
  ): Record<string, Call[]> => {
    const groups: Record<string, Call[]> = {};

    calls.forEach(call => {
      const date = new Date(call.created_at);
      let key: string;

      switch (period) {
        case 'hour':
          key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}`;
          break;
        case 'day':
          key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
          break;
        case 'week':
          const weekStart = new Date(date);
          weekStart.setDate(date.getDate() - date.getDay());
          key = `${weekStart.getFullYear()}-${weekStart.getMonth()}-${weekStart.getDate()}`;
          break;
        case 'month':
          key = `${date.getFullYear()}-${date.getMonth()}`;
          break;
        default:
          key = date.toISOString().split('T')[0];
      }

      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(call);
    });

    return groups;
  };

  // =============================================================================
  // Real-time Call Monitoring
  // =============================================================================

  /**
   * Obter status em tempo real de ligações ativas
   */
  static getActiveCalls = (): Promise<Array<{
    call_id: string;
    agent_id: string;
    phone_number: string;
    status: 'dialing' | 'connected' | 'talking' | 'ending';
    duration: number;
    started_at: string;
  }>> => {
    return new Promise((resolve, reject) => {
      // Implementação específica para websockets ou polling
      fetch('/api/v1/calls/active')
        .then(response => response.json())
        .then(resolve)
        .catch(reject);
    });
  };

  /**
   * Pausar/Retomar operações de ligação
   */
  static pauseCallOperations = (agentId?: string): Promise<{ message: string }> => {
    return new Promise((resolve, reject) => {
      const endpoint = agentId 
        ? `/api/v1/calls/pause?agent_id=${agentId}`
        : '/api/v1/calls/pause';
        
      fetch(endpoint, { method: 'POST' })
        .then(response => response.json())
        .then(resolve)
        .catch(reject);
    });
  };

  /**
   * Retomar operações de ligação
   */
  static resumeCallOperations = (agentId?: string): Promise<{ message: string }> => {
    return new Promise((resolve, reject) => {
      const endpoint = agentId 
        ? `/api/v1/calls/resume?agent_id=${agentId}`
        : '/api/v1/calls/resume';
        
      fetch(endpoint, { method: 'POST' })
        .then(response => response.json())
        .then(resolve)
        .catch(reject);
    });
  };
}
