// =============================================================================
// Agent Controller - Gerenciamento de Agentes de Voz AI
// =============================================================================

import { AgentModel } from '../models';
import type { Agent, AgentRequest, AgentPerformance } from '../types/api.types';

export default class AgentController {
  // =============================================================================
  // CRUD Operations
  // =============================================================================

  /**
   * Buscar todos os agentes
   */
  static getAgents = (): Promise<Agent[]> => {
    return new Promise((resolve, reject) => {
      AgentModel.getAgents()
        .then(resolve)
        .catch(reject);
    });
  };

  /**
   * Buscar agente por ID
   */
  static getAgent = (id: string): Promise<Agent> => {
    return new Promise((resolve, reject) => {
      AgentModel.getAgent(id)
        .then(resolve)
        .catch(reject);
    });
  };

  /**
   * Criar novo agente
   */
  static createAgent = (agentData: AgentRequest): Promise<Agent> => {
    return new Promise((resolve, reject) => {
      // Validações básicas
      if (!agentData.name || !agentData.objective) {
        reject(new Error('Nome e objetivo são obrigatórios'));
        return;
      }

      AgentModel.createAgent(agentData)
        .then(resolve)
        .catch(reject);
    });
  };

  /**
   * Atualizar agente existente
   */
  static updateAgent = (id: string, updates: Partial<AgentRequest>): Promise<Agent> => {
    return new Promise((resolve, reject) => {
      AgentModel.updateAgent(id, updates)
        .then(resolve)
        .catch(reject);
    });
  };

  /**
   * Deletar agente
   */
  static deleteAgent = (id: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      AgentModel.deleteAgent(id)
        .then(resolve)
        .catch(reject);
    });
  };

  // =============================================================================
  // Agent Status Management
  // =============================================================================

  /**
   * Ativar/Desativar agente
   */
  static toggleAgentStatus = (id: string, active: boolean): Promise<Agent> => {
    return new Promise((resolve, reject) => {
      AgentModel.toggleAgentStatus(id, active)
        .then(resolve)
        .catch(reject);
    });
  };

  // =============================================================================
  // Agent Performance & Analytics
  // =============================================================================

  /**
   * Buscar performance de um agente
   */
  static getAgentPerformance = (
    id: string,
    period: 'today' | '7d' | '30d' | '90d' = '7d'
  ): Promise<AgentPerformance> => {
    return new Promise((resolve, reject) => {
      AgentModel.getAgentPerformance(id, period)
        .then(resolve)
        .catch(reject);
    });
  };

  // =============================================================================
  // Agent Configuration Helpers
  // =============================================================================

  /**
   * Validar configuração de passos do agente
   */
  static validateAgentSteps = (steps: Array<{
    order: number;
    description: string;
    prompt: string;
  }>): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!steps || steps.length === 0) {
      errors.push('Agente deve ter pelo menos um passo');
      return { valid: false, errors };
    }

    if (steps.length > 10) {
      errors.push('Agente pode ter no máximo 10 passos');
    }

    // Verificar ordem sequencial
    const orders = steps.map(s => s.order).sort((a, b) => a - b);
    for (let i = 0; i < orders.length; i++) {
      if (orders[i] !== i + 1) {
        errors.push('Ordem dos passos deve ser sequencial começando em 1');
        break;
      }
    }

    // Validar conteúdo dos passos
    steps.forEach((step, index) => {
      if (!step.description || step.description.trim().length === 0) {
        errors.push(`Passo ${index + 1}: Descrição é obrigatória`);
      }
      
      if (!step.prompt || step.prompt.trim().length === 0) {
        errors.push(`Passo ${index + 1}: Prompt é obrigatório`);
      }

      if (step.prompt && step.prompt.length > 500) {
        errors.push(`Passo ${index + 1}: Prompt deve ter no máximo 500 caracteres`);
      }
    });

    return { valid: errors.length === 0, errors };
  };

  /**
   * Gerar configuração padrão para agente
   */
  static generateDefaultAgentConfig = (objective: string): AgentRequest => {
    return {
      name: 'Novo Agente',
      description: 'Agente de voz AI para automação de contatos',
      objective,
      personality: 'friendly',
      voice_type: 'female_1',
      active: true,
      steps: [
        {
          id: '1',
          order: 1,
          description: 'Apresentação inicial',
          prompt: 'Cumprimente o cliente de forma amigável e se apresente',
        },
        {
          id: '2',
          order: 2,
          description: 'Identificação da necessidade',
          prompt: 'Pergunte sobre as necessidades e desafios do cliente',
        },
        {
          id: '3',
          order: 3,
          description: 'Apresentação da solução',
          prompt: 'Apresente como nossa solução pode ajudar o cliente',
        },
        {
          id: '4',
          order: 4,
          description: 'Finalização',
          prompt: 'Agradeça o tempo e proponha próximos passos',
        },
      ],
    };
  };

  // =============================================================================
  // Voice & Personality Helpers
  // =============================================================================

  /**
   * Obter opções de personalidade disponíveis
   */
  static getPersonalityOptions = () => {
    return [
      {
        value: 'friendly',
        label: 'Amigável',
        description: 'Tom caloroso e acolhedor, ideal para prospecção inicial',
      },
      {
        value: 'formal',
        label: 'Formal',
        description: 'Profissional e respeitoso, adequado para contextos corporativos',
      },
      {
        value: 'persuasive',
        label: 'Persuasivo',
        description: 'Convincente e orientado a resultados, focado em conversão',
      },
      {
        value: 'supportive',
        label: 'Suporte',
        description: 'Paciente e prestativo, ideal para atendimento e suporte',
      },
    ];
  };

  /**
   * Obter opções de voz disponíveis
   */
  static getVoiceOptions = () => {
    return [
      {
        value: 'female_1',
        label: 'Feminina 1',
        description: 'Voz feminina jovem e dinâmica',
      },
      {
        value: 'female_2',
        label: 'Feminina 2',
        description: 'Voz feminina madura e confiável',
      },
      {
        value: 'male_1',
        label: 'Masculina 1',
        description: 'Voz masculina grave e autoritativa',
      },
      {
        value: 'male_2',
        label: 'Masculina 2',
        description: 'Voz masculina suave e amigável',
      },
    ];
  };
}
