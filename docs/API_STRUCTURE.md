# 🚀 SDR Painel - Estrutura da API

## 📋 Visão Geral

Este documento mapeia a estrutura da API baseada no schema Prisma do backend, mostrando como os dados mockados serão substituídos por chamadas REST reais.

## 🗄️ Mapeamento Schema → API

### 🏢 **Companies (Empresas)**
```typescript
// Schema Prisma → API Types
Company {
  id: string (UUID)
  name: string
  document_number: string
  logo_url?: string
  active: boolean
  users: User[]
}
```

**Endpoints:**
- `GET /api/v1/companies` - Listar empresas
- `POST /api/v1/companies` - Criar empresa
- `PUT /api/v1/companies/:id` - Atualizar empresa
- `POST /api/v1/companies/:id/logo` - Upload de logo

### 👥 **Users (Usuários)**
```typescript
// Schema Prisma → API Types
User {
  id: string (UUID)
  company_id: string
  name: string
  email: string
  document_number: string
  user_type: 'admin' | 'operator' | 'viewer'
  auth?: Auth
}
```

**Endpoints:**
- `GET /api/v1/users` - Listar usuários
- `POST /api/v1/users` - Criar usuário
- `GET /api/v1/users/me` - Usuário atual
- `PUT /api/v1/users/:id` - Atualizar usuário

### 🤖 **Agents (Agentes de Voz)**
```typescript
// Schema Prisma → API Types
Agent {
  id: string (UUID)
  name: string
  description: string
  objective: string
  personality: 'friendly' | 'formal' | 'persuasive' | 'supportive'
  voice_type: 'male_1' | 'male_2' | 'female_1' | 'female_2'
  active: boolean
  steps: AgentStep[] // JSON field
}
```

**Endpoints:**
- `GET /api/v1/agents` - Listar agentes
- `POST /api/v1/agents` - Criar agente
- `PUT /api/v1/agents/:id` - Atualizar agente
- `PATCH /api/v1/agents/:id/status` - Ativar/desativar
- `GET /api/v1/agents/:id/performance` - Performance do agente

### 📞 **Customers (Clientes/Subjects)**
```typescript
// Schema Prisma → API Types
Customer {
  id: string (UUID)
  name?: string
  email?: string
  phone_number?: string
  document_number?: string
  personality?: string
  context: Record<string, any> // JSON field
}
```

**Endpoints:**
- `GET /api/v1/customers` - Listar clientes
- `POST /api/v1/customers` - Criar cliente
- `POST /api/v1/customers/bulk-import` - Importação em massa
- `GET /api/v1/customers/export` - Exportar CSV/Excel

### 🔄 **Routines (Rotinas/Campanhas)**
```typescript
// Schema Prisma → API Types
Routine {
  id: string (UUID)
  name: string
  active: boolean
  success_count: number
  fail_count: number
  status?: string
  start_time: DateTime
  end_time?: DateTime
  agents: AgentHasRoutine[]
}
```

**Endpoints:**
- `GET /api/v1/routines` - Listar rotinas
- `POST /api/v1/routines` - Criar rotina
- `POST /api/v1/routines/:id/start` - Iniciar rotina
- `POST /api/v1/routines/:id/stop` - Parar rotina
- `GET /api/v1/routines/:id/analytics` - Analytics da rotina

### 📱 **Calls (Ligações)**
```typescript
// Schema Prisma → API Types
Call {
  id: string (UUID)
  agent_id: string
  customer_id?: string
  phone_called: string
  success: number // 0=failed, 1=success, 2=partial
  transcription?: string
  mood?: 'positive' | 'neutral' | 'negative'
  extra_context: Record<string, any> // JSON field
  duration_secs: number
}
```

**Endpoints:**
- `GET /api/v1/calls` - Listar ligações
- `POST /api/v1/calls/initiate` - Iniciar ligação
- `POST /api/v1/calls/bulk-initiate` - Ligações em massa
- `GET /api/v1/calls/:id/transcription` - Transcrição
- `GET /api/v1/calls/analytics` - Analytics de ligações

## 🔧 Controllers Atualizados

### 📁 Estrutura dos Controllers

```
src/controllers/
├── AgentController.ts       # Gerenciamento de agentes de voz
├── CustomerController.ts    # Gerenciamento de clientes (subjects)
├── CallController.ts        # Operações de ligações
├── AnalyticsController.ts   # Dashboard e relatórios
├── AuthController.ts        # Autenticação (legacy)
└── index.ts                 # Exports
```

### 🎯 **AgentController.ts**
- ✅ CRUD completo de agentes
- ✅ Validação de steps (1-10 passos)
- ✅ Toggle de status (ativo/inativo)
- ✅ Performance e analytics
- ✅ Helpers para personalidade e voz

### 👥 **CustomerController.ts**
- ✅ CRUD completo de clientes
- ✅ Importação em massa via CSV
- ✅ Validação de telefone e email brasileiros
- ✅ Filtros e busca avançada
- ✅ Exportação CSV/Excel
- ✅ Formatação de telefones

### 📞 **CallController.ts**
- ✅ Iniciar ligações individuais
- ✅ Ligações em massa (bulk)
- ✅ Monitoramento em tempo real
- ✅ Transcrições e análise de sentimento
- ✅ Estatísticas e agrupamentos
- ✅ Controle de operações (pausar/retomar)

### 📊 **AnalyticsController.ts**
- ✅ Métricas do dashboard
- ✅ Performance de agentes
- ✅ Analytics de rotinas
- ✅ Tendências temporais
- ✅ Geração de relatórios
- ✅ Exportação de dados
- ✅ Recomendações automáticas

## 📦 Models para API REST

### 📁 Estrutura dos Models

```
src/models/
├── index.ts                 # Classes para comunicação REST
├── BaseModel.ts             # Classe base com fetch
├── CompanyModel.ts          # API de empresas
├── UserModel.ts             # API de usuários
├── AgentModel.ts            # API de agentes
├── CustomerModel.ts         # API de clientes
├── RoutineModel.ts          # API de rotinas
├── CallModel.ts             # API de ligações
└── AnalyticsModel.ts        # API de analytics
```

### 🚀 **BaseModel.ts**
```typescript
abstract class BaseModel {
  protected static baseUrl = '/api/v1';
  
  protected static async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T>
}
```

### 🤖 **AgentModel.ts**
```typescript
export class AgentModel extends BaseModel {
  static async getAgents(): Promise<Agent[]>
  static async createAgent(data: AgentRequest): Promise<Agent>
  static async updateAgent(id: string, data: Partial<AgentRequest>): Promise<Agent>
  static async toggleAgentStatus(id: string, active: boolean): Promise<Agent>
  static async getAgentPerformance(id: string, period: string): Promise<AgentPerformance>
}
```

## 🔄 Migração dos Dados Mock

### 📊 **Dados Atuais (Mock)**
```
src/data/
├── mockData.ts              # AGENTES_DATA, ROTINAS_DATA, etc.
└── ligacoesMockData.ts      # Ligações e transcrições mock
```

### 🎯 **Nova Estrutura (API)**
```
src/types/
├── index.ts                 # Tipos legados (compatibilidade)
└── api.types.ts             # ✅ Tipos baseados no Prisma

src/models/
└── index.ts                 # ✅ Classes para API REST

src/controllers/
├── AgentController.ts       # ✅ Usa AgentModel + api.types
├── CustomerController.ts    # ✅ Usa CustomerModel + api.types
├── CallController.ts        # ✅ Usa CallModel + api.types
└── AnalyticsController.ts   # ✅ Usa AnalyticsModel + api.types
```

## 🚀 Como Usar

### 1. **Importar os novos tipos:**
```typescript
import type { Agent, Customer, Call } from '@/types/api.types';
```

### 2. **Usar os controllers atualizados:**
```typescript
import AgentController from '@/controllers/AgentController';

// Criar agente
const agent = await AgentController.createAgent({
  name: 'Ana Virtual',
  objective: 'Prospecção de vendas',
  personality: 'friendly',
  voice_type: 'female_1'
});

// Buscar performance
const performance = await AgentController.getAgentPerformance(agent.id, '7d');
```

### 3. **Operações de clientes:**
```typescript
import CustomerController from '@/controllers/CustomerController';

// Importação em massa
const result = await CustomerController.bulkImportCustomers(csvFile);

// Buscar clientes
const customers = await CustomerController.getCustomers();
```

### 4. **Gerenciar ligações:**
```typescript
import CallController from '@/controllers/CallController';

// Iniciar ligação
const call = await CallController.initiateCall({
  agent_id: 'uuid-agente',
  phone_called: '+5511999999999'
});

// Ligações em massa
const bulk = await CallController.bulkInitiateCalls({
  agent_id: 'uuid-agente',
  phone_numbers: ['+5511999999999', '+5511888888888']
});
```

## 🎯 Próximos Passos

1. **✅ Estrutura completa criada**
2. **🔄 Substituir hooks para usar novos controllers**
3. **🔄 Atualizar componentes para novos tipos**
4. **🔄 Implementar autenticação JWT**
5. **🔄 Configurar interceptors para tokens**
6. **🔄 Adicionar tratamento de erros**
7. **🔄 Implementar cache local**
8. **🔄 WebSockets para tempo real**

## 🔑 Diferenças Importantes

### **Mock → API**
- **IDs**: `number` → `string (UUID)`
- **Datas**: `string` → `ISO DateTime`
- **Relacionamentos**: `string` → `Object` completo
- **Validações**: Frontend → Backend + Frontend
- **Paginação**: Array completo → Paginado
- **Filtros**: JavaScript → Query parameters
- **Bulk operations**: Simulado → REST endpoints

### **Estrutura de Resposta**
```typescript
// Mock (antes)
const agentes = AGENTES_DATA;

// API (agora)
const response = await AgentController.getAgents();
// ou
const paginatedResponse = await AgentModel.getAgents();
```

## 🛡️ Segurança

- **Autenticação**: JWT tokens
- **Autorização**: Role-based (admin/operator/viewer)
- **Validação**: Backend + Frontend
- **Rate limiting**: Por usuário/empresa
- **Sanitização**: Inputs e outputs
- **HTTPS**: Obrigatório em produção

---

**🎉 Estrutura pronta para conectar com o backend real!**
