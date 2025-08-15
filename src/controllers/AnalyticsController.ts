// =============================================================================
// Analytics Controller - Dashboard e Relatórios
// =============================================================================

import { AnalyticsModel } from '../models';
import type { AgentPerformance, RoutineAnalytics } from '../types/api.types';

export default class AnalyticsController {
  // =============================================================================
  // Dashboard Metrics
  // =============================================================================

  /**
   * Buscar métricas principais do dashboard
   */
  static getDashboardMetrics = (
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
  }> => {
    return new Promise((resolve, reject) => {
      AnalyticsModel.getDashboardMetrics(period)
        .then(resolve)
        .catch(reject);
    });
  };

  // =============================================================================
  // Agent Performance
  // =============================================================================

  /**
   * Buscar performance de todos os agentes
   */
  static getAgentsPerformance = (
    period: 'today' | '7d' | '30d' | '90d' = '7d'
  ): Promise<AgentPerformance[]> => {
    return new Promise((resolve, reject) => {
      AnalyticsModel.getAgentsPerformance(period)
        .then(resolve)
        .catch(reject);
    });
  };

  // =============================================================================
  // Routine Performance
  // =============================================================================

  /**
   * Buscar performance de todas as rotinas
   */
  static getRoutinesPerformance = (
    period: 'today' | '7d' | '30d' | '90d' = '7d'
  ): Promise<RoutineAnalytics[]> => {
    return new Promise((resolve, reject) => {
      AnalyticsModel.getRoutinesPerformance(period)
        .then(resolve)
        .catch(reject);
    });
  };

  // =============================================================================
  // Call Trends
  // =============================================================================

  /**
   * Buscar tendências de ligações
   */
  static getCallTrends = (
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
  }> => {
    return new Promise((resolve, reject) => {
      AnalyticsModel.getCallTrends(period)
        .then(resolve)
        .catch(reject);
    });
  };

  // =============================================================================
  // Report Generation
  // =============================================================================

  /**
   * Gerar relatório completo de performance
   */
  static generatePerformanceReport = async (
    period: 'today' | '7d' | '30d' | '90d' = '30d'
  ): Promise<{
    dashboard: any;
    agents: AgentPerformance[];
    routines: RoutineAnalytics[];
    trends: any;
    summary: {
      total_calls: number;
      overall_success_rate: number;
      best_performing_agent: string;
      best_performing_routine: string;
      peak_hours: string[];
      recommendations: string[];
    };
  }> => {
    try {
      // Buscar todos os dados em paralelo
      const [dashboard, agents, routines, trends] = await Promise.all([
        AnalyticsController.getDashboardMetrics(period),
        AnalyticsController.getAgentsPerformance(period),
        AnalyticsController.getRoutinesPerformance(period),
        AnalyticsController.getCallTrends(period),
      ]);

      // Calcular resumo e recomendações
      const summary = AnalyticsController.generateSummary(dashboard, agents, routines, trends);

      return {
        dashboard,
        agents,
        routines,
        trends,
        summary,
      };
    } catch (error) {
      throw new Error(`Erro ao gerar relatório: ${error}`);
    }
  };

  /**
   * Gerar resumo executivo
   */
  static generateSummary = (
    dashboard: any,
    agents: AgentPerformance[],
    routines: RoutineAnalytics[],
    trends: any
  ) => {
    // Melhor agente
    const bestAgent = agents.reduce((best, agent) => 
      agent.success_rate > best.success_rate ? agent : best
    );

    // Melhor rotina
    const bestRoutine = routines.reduce((best, routine) => 
      routine.success_rate > best.success_rate ? routine : best
    );

    // Horários de pico (top 3)
    const peakHours = dashboard.calls_by_hour
      .sort((a: any, b: any) => b.count - a.count)
      .slice(0, 3)
      .map((h: any) => `${h.hour}:00`);

    // Gerar recomendações baseadas nos dados
    const recommendations = AnalyticsController.generateRecommendations(
      dashboard,
      agents,
      routines,
      trends
    );

    return {
      total_calls: dashboard.total_calls,
      overall_success_rate: dashboard.success_rate,
      best_performing_agent: bestAgent.agent_name,
      best_performing_routine: bestRoutine.routine_name,
      peak_hours: peakHours,
      recommendations,
    };
  };

  /**
   * Gerar recomendações baseadas nos analytics
   */
  static generateRecommendations = (
    dashboard: any,
    agents: AgentPerformance[],
    routines: RoutineAnalytics[],
    trends: any
  ): string[] => {
    const recommendations: string[] = [];

    // Recomendações baseadas na taxa de sucesso
    if (dashboard.success_rate < 50) {
      recommendations.push('Taxa de sucesso baixa. Considere revisar scripts e treinamento dos agentes.');
    } else if (dashboard.success_rate > 80) {
      recommendations.push('Excelente taxa de sucesso! Considere expandir operações nos horários de pico.');
    }

    // Recomendações baseadas na performance dos agentes
    const lowPerformingAgents = agents.filter(a => a.success_rate < 40);
    if (lowPerformingAgents.length > 0) {
      recommendations.push(`${lowPerformingAgents.length} agente(s) com baixa performance. Revisar configurações e personalidade.`);
    }

    // Recomendações baseadas nos horários
    const totalCallsByHour = dashboard.calls_by_hour.reduce((sum: number, h: any) => sum + h.count, 0);
    const avgCallsPerHour = totalCallsByHour / dashboard.calls_by_hour.length;
    const peakHours = dashboard.calls_by_hour.filter((h: any) => h.count > avgCallsPerHour * 1.5);
    
    if (peakHours.length > 0) {
      recommendations.push(`Concentrar esforços nos horários ${peakHours.map((h: any) => `${h.hour}:00`).join(', ')} para maximizar resultados.`);
    }

    // Recomendações baseadas no sentimento
    const negativeCallsPercent = trends.mood_distribution.find((m: any) => m.mood === 'negative')?.percentage || 0;
    if (negativeCallsPercent > 30) {
      recommendations.push('Alto índice de sentimento negativo. Revisar abordagem e scripts dos agentes.');
    }

    // Recomendações baseadas na duração
    if (dashboard.call_duration_avg < 60) {
      recommendations.push('Duração média baixa das ligações. Melhorar engagement inicial para manter clientes na linha.');
    }

    return recommendations;
  };

  // =============================================================================
  // Data Export
  // =============================================================================

  /**
   * Exportar dados para CSV
   */
  static exportToCSV = async (
    type: 'agents' | 'routines' | 'calls',
    period: 'today' | '7d' | '30d' | '90d' = '30d'
  ): Promise<Blob> => {
    let data: any[];
    let headers: string[];

    switch (type) {
      case 'agents':
        data = await AnalyticsController.getAgentsPerformance(period);
        headers = ['Agent Name', 'Total Calls', 'Success Rate', 'Avg Duration', 'Best Time'];
        break;
      case 'routines':
        data = await AnalyticsController.getRoutinesPerformance(period);
        headers = ['Routine Name', 'Total Calls', 'Success Count', 'Success Rate', 'Period'];
        break;
      default:
        throw new Error('Tipo de export não suportado');
    }

    return AnalyticsController.generateCSV(data, headers, type);
  };

  /**
   * Gerar arquivo CSV
   */
  static generateCSV = (data: any[], headers: string[], type: string): Blob => {
    let csvContent = headers.join(',') + '\n';

    data.forEach(item => {
      let row: string[];
      
      switch (type) {
        case 'agents':
          row = [
            item.agent_name,
            item.total_calls.toString(),
            `${item.success_rate}%`,
            AnalyticsController.formatDuration(item.average_duration),
            item.best_performing_time,
          ];
          break;
        case 'routines':
          row = [
            item.routine_name,
            item.total_calls.toString(),
            item.success_count.toString(),
            `${item.success_rate}%`,
            item.period,
          ];
          break;
        default:
          row = [];
      }
      
      csvContent += row.join(',') + '\n';
    });

    return new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  };

  // =============================================================================
  // Utility Functions
  // =============================================================================

  /**
   * Formatar duração em segundos para mm:ss
   */
  static formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  /**
   * Calcular variação percentual
   */
  static calculatePercentageChange = (current: number, previous: number): number => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - previous) / previous) * 100);
  };

  /**
   * Obter período anterior para comparação
   */
  static getPreviousPeriod = (period: 'today' | '7d' | '30d' | '90d'): Date => {
    const now = new Date();
    switch (period) {
      case 'today':
        return new Date(now.getTime() - 24 * 60 * 60 * 1000);
      case '7d':
        return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      case '30d':
        return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      case '90d':
        return new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
      default:
        return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    }
  };
}
