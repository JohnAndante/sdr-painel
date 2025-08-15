// =============================================================================
// Customer Controller - Gerenciamento de Clientes/Subjects
// =============================================================================

import { CustomerModel } from '../models';
import type { Customer, CustomerRequest } from '../types/api.types';

export default class CustomerController {
  // =============================================================================
  // CRUD Operations
  // =============================================================================

  /**
   * Buscar todos os clientes
   */
  static getCustomers = (): Promise<Customer[]> => {
    return new Promise((resolve, reject) => {
      CustomerModel.getCustomers()
        .then(resolve)
        .catch(reject);
    });
  };

  /**
   * Buscar cliente por ID
   */
  static getCustomer = (id: string): Promise<Customer> => {
    return new Promise((resolve, reject) => {
      CustomerModel.getCustomer(id)
        .then(resolve)
        .catch(reject);
    });
  };

  /**
   * Criar novo cliente
   */
  static createCustomer = (customerData: CustomerRequest): Promise<Customer> => {
    return new Promise((resolve, reject) => {
      // Validações básicas
      if (!customerData.phone_number && !customerData.email) {
        reject(new Error('Telefone ou email são obrigatórios'));
        return;
      }

      // Validar formato do telefone
      if (customerData.phone_number && !CustomerController.validatePhoneNumber(customerData.phone_number)) {
        reject(new Error('Formato de telefone inválido'));
        return;
      }

      // Validar formato do email
      if (customerData.email && !CustomerController.validateEmail(customerData.email)) {
        reject(new Error('Formato de email inválido'));
        return;
      }

      CustomerModel.createCustomer(customerData)
        .then(resolve)
        .catch(reject);
    });
  };

  /**
   * Atualizar cliente existente
   */
  static updateCustomer = (id: string, updates: Partial<CustomerRequest>): Promise<Customer> => {
    return new Promise((resolve, reject) => {
      // Validações se houver atualizações de contato
      if (updates.phone_number && !CustomerController.validatePhoneNumber(updates.phone_number)) {
        reject(new Error('Formato de telefone inválido'));
        return;
      }

      if (updates.email && !CustomerController.validateEmail(updates.email)) {
        reject(new Error('Formato de email inválido'));
        return;
      }

      CustomerModel.updateCustomer(id, updates)
        .then(resolve)
        .catch(reject);
    });
  };

  /**
   * Deletar cliente
   */
  static deleteCustomer = (id: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      CustomerModel.deleteCustomer(id)
        .then(resolve)
        .catch(reject);
    });
  };

  // =============================================================================
  // Bulk Operations
  // =============================================================================

  /**
   * Importação em massa de clientes via CSV
   */
  static bulkImportCustomers = (file: File): Promise<{
    successful: number;
    failed: number;
    errors: Array<{ row: number; message: string }>;
  }> => {
    return new Promise((resolve, reject) => {
      CustomerController.parseCSVFile(file)
        .then(customers => {
          return CustomerModel.bulkImportCustomers(customers);
        })
        .then(resolve)
        .catch(reject);
    });
  };

  /**
   * Exportar clientes para CSV/Excel
   */
  static exportCustomers = (format: 'csv' | 'xlsx' = 'csv'): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      CustomerModel.exportCustomers(format)
        .then(resolve)
        .catch(reject);
    });
  };

  // =============================================================================
  // File Processing Helpers
  // =============================================================================

  /**
   * Parse CSV file para array de customers
   */
  static parseCSVFile = (file: File): Promise<CustomerRequest[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const csv = e.target?.result as string;
          const customers = CustomerController.parseCSVContent(csv);
          resolve(customers);
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = () => reject(new Error('Erro ao ler arquivo'));
      reader.readAsText(file);
    });
  };

  /**
   * Parse conteúdo CSV
   */
  static parseCSVContent = (csvContent: string): CustomerRequest[] => {
    const lines = csvContent.split('\n').filter(line => line.trim());
    
    if (lines.length === 0) {
      throw new Error('Arquivo CSV está vazio');
    }

    // Header esperado: name,email,phone_number,document_number
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    const expectedHeaders = ['name', 'email', 'phone_number', 'document_number'];
    
    // Verificar se pelo menos phone_number está presente
    if (!headers.includes('phone_number') && !headers.includes('email')) {
      throw new Error('CSV deve conter pelo menos uma coluna "phone_number" ou "email"');
    }

    const customers: CustomerRequest[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      
      if (values.length !== headers.length) {
        throw new Error(`Linha ${i + 1}: Número de colunas inconsistente`);
      }

      const customer: CustomerRequest = {
        context: {},
      };

      headers.forEach((header, index) => {
        const value = values[index] || null;
        
        switch (header) {
          case 'name':
            customer.name = value;
            break;
          case 'email':
            customer.email = value;
            break;
          case 'phone_number':
            customer.phone_number = value;
            break;
          case 'document_number':
            customer.document_number = value;
            break;
          default:
            // Campos extras vão para context
            if (value) {
              customer.context![header] = value;
            }
        }
      });

      customers.push(customer);
    }

    return customers;
  };

  // =============================================================================
  // Validation Helpers
  // =============================================================================

  /**
   * Validar formato de telefone brasileiro
   */
  static validatePhoneNumber = (phone: string): boolean => {
    // Remove todos os caracteres não numéricos
    const numbers = phone.replace(/\D/g, '');
    
    // Deve ter 10 ou 11 dígitos (com DDD)
    if (numbers.length < 10 || numbers.length > 11) {
      return false;
    }

    // Verificar DDD válido (11-99)
    const ddd = parseInt(numbers.substring(0, 2));
    if (ddd < 11 || ddd > 99) {
      return false;
    }

    // Se tem 11 dígitos, o primeiro após DDD deve ser 9 (celular)
    if (numbers.length === 11 && numbers[2] !== '9') {
      return false;
    }

    return true;
  };

  /**
   * Validar formato de email
   */
  static validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * Formatar telefone para exibição
   */
  static formatPhoneNumber = (phone: string): string => {
    const numbers = phone.replace(/\D/g, '');
    
    if (numbers.length === 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else if (numbers.length === 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    
    return phone;
  };

  /**
   * Normalizar telefone para armazenamento
   */
  static normalizePhoneNumber = (phone: string): string => {
    const numbers = phone.replace(/\D/g, '');
    return `+55${numbers}`;
  };

  // =============================================================================
  // Search & Filter Helpers
  // =============================================================================

  /**
   * Filtrar clientes por critérios
   */
  static filterCustomers = (
    customers: Customer[],
    filters: {
      search?: string;
      hasPhone?: boolean;
      hasEmail?: boolean;
    }
  ): Customer[] => {
    return customers.filter(customer => {
      // Filtro de busca por nome, email ou telefone
      if (filters.search) {
        const search = filters.search.toLowerCase();
        const matchesName = customer.name?.toLowerCase().includes(search);
        const matchesEmail = customer.email?.toLowerCase().includes(search);
        const matchesPhone = customer.phone_number?.includes(search);
        
        if (!matchesName && !matchesEmail && !matchesPhone) {
          return false;
        }
      }

      // Filtro por presença de telefone
      if (filters.hasPhone !== undefined) {
        const hasPhone = !!customer.phone_number;
        if (filters.hasPhone !== hasPhone) {
          return false;
        }
      }

      // Filtro por presença de email
      if (filters.hasEmail !== undefined) {
        const hasEmail = !!customer.email;
        if (filters.hasEmail !== hasEmail) {
          return false;
        }
      }

      return true;
    });
  };

  /**
   * Obter estatísticas dos clientes
   */
  static getCustomerStats = (customers: Customer[]) => {
    return {
      total: customers.length,
      withPhone: customers.filter(c => c.phone_number).length,
      withEmail: customers.filter(c => c.email).length,
      withBoth: customers.filter(c => c.phone_number && c.email).length,
      recentlyAdded: customers.filter(c => {
        const createdAt = new Date(c.created_at);
        const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        return createdAt > dayAgo;
      }).length,
    };
  };
}
