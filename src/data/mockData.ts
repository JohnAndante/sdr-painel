export const AGENTES_DATA = [
  {
    id: 1,
    agente: 'Ana Silva',
    persona: 'Agente especializada em vendas com tom amigável e persuasivo, focada em resultados e construção de relacionamento com clientes.',
    funcao: 'SDR',
    idioma: 'pt-BR',
    rotinasAtivas: 3,
    taxaSucesso: '89%',
    ultimaAtividade: '2 min atrás',
    status: 'Ativo'
  },
  {
    id: 2,
    agente: 'Carlos Santos',
    persona: 'Especialista em suporte técnico com paciência e conhecimento profundo, sempre pronto para resolver problemas complexos.',
    funcao: 'Suporte',
    idioma: 'pt-BR',
    rotinasAtivas: 2,
    taxaSucesso: '92%',
    ultimaAtividade: '5 min atrás',
    status: 'Ativo'
  },
  {
    id: 3,
    agente: 'Maria Oliveira',
    persona: 'Agente de cobrança educada mas firme nas negociações, com foco em soluções e acordos benéficos para ambas as partes.',
    funcao: 'Cobrança',
    idioma: 'pt-BR',
    rotinasAtivas: 1,
    taxaSucesso: '76%',
    ultimaAtividade: '15 min atrás',
    status: 'Ativo'
  },
  {
    id: 4,
    agente: 'John Smith',
    persona: 'Sales agent focused on English-speaking clients with a professional and results-driven approach.',
    funcao: 'Vendas',
    idioma: 'en-US',
    rotinasAtivas: 0,
    taxaSucesso: '0%',
    ultimaAtividade: '2 dias atrás',
    status: 'Inativo'
  }
]

export const ROTINAS_DATA = [
  {
    id: 1,
    nome: 'Vendas Produto A - Q1',
    descricao: 'Campanha de vendas focada no produto A para o primeiro trimestre',
    agente: 'Ana Silva',
    dataInicio: '2024-01-15',
    horaInicio: '09:00',
    dataFim: '2024-01-15',
    horaFim: '17:00',
    totalNumeros: 500,
    ligacoesEfetuadas: 342,
    sucessos: 156,
    falhas: 186,
    status: 'Concluída'
  },
  {
    id: 2,
    nome: 'Follow-up Leads Quentes',
    descricao: 'Rotina de follow-up para leads qualificados da semana anterior',
    agente: 'Carlos Santos',
    dataInicio: '2024-01-16',
    horaInicio: '10:00',
    dataFim: '2024-01-16',
    horaFim: '16:00',
    totalNumeros: 200,
    ligacoesEfetuadas: 180,
    sucessos: 165,
    falhas: 15,
    status: 'Concluída'
  },
  {
    id: 3,
    nome: 'Prospecção B2B - Setor Tech',
    descricao: 'Prospecção ativa para empresas do setor de tecnologia',
    agente: 'Ana Silva',
    dataInicio: '2024-01-17',
    horaInicio: '08:30',
    dataFim: '2024-01-17',
    horaFim: '18:00',
    totalNumeros: 750,
    ligacoesEfetuadas: 425,
    sucessos: 89,
    falhas: 336,
    status: 'Em andamento'
  }
]

export const LIGACOES_DATA = [
  {
    id: 1,
    rotina: 'Vendas Produto A - Q1',
    agente: 'Ana Silva',
    numero: '+55 11 98765-4321',
    dataHora: '2024-01-15 14:30:15',
    duracao: '00:03:45',
    status: 'Sucesso',
    transcricao: 'Olá, aqui é a Ana da empresa XYZ. Como vai? Gostaria de apresentar uma solução que pode ajudar sua empresa...'
  },
  {
    id: 2,
    rotina: 'Follow-up Leads Quentes',
    agente: 'Carlos Santos',
    numero: '+55 11 95432-1098',
    dataHora: '2024-01-16 11:15:30',
    duracao: '00:02:20',
    status: 'Sucesso',
    transcricao: 'Bom dia! É o Carlos da XYZ. Conforme combinamos, estou entrando em contato para agendar nossa reunião...'
  },
  {
    id: 3,
    rotina: 'Prospecção B2B - Setor Tech',
    agente: 'Ana Silva',
    numero: '+55 11 91234-5678',
    dataHora: '2024-01-17 09:45:00',
    duracao: '00:00:35',
    status: 'Falha',
    transcricao: 'Olá, aqui é a Ana da— [ligação encerrada]'
  }
]

export const USUARIOS_DATA = [
  {
    id: 1,
    nome: 'João Silva',
    email: 'joao.silva@empresa.com',
    funcao: 'Administrador',
    departamento: 'TI',
    telefone: '+55 11 99999-0001',
    ultimoAcesso: '2024-01-17 08:30',
    status: 'Ativo',
    dataCriacao: '2023-12-01',
    permissoes: {
      dashboard: true,
      agentes: true,
      rotinas: true,
      usuarios: true,
      configuracoes: true
    }
  },
  {
    id: 2,
    nome: 'Maria Santos',
    email: 'maria.santos@empresa.com',
    funcao: 'Gerente',
    departamento: 'Vendas',
    telefone: '+55 11 99999-0002',
    ultimoAcesso: '2024-01-17 07:45',
    status: 'Ativo',
    dataCriacao: '2023-12-05',
    permissoes: {
      dashboard: true,
      agentes: true,
      rotinas: true,
      usuarios: false,
      configuracoes: false
    }
  },
  {
    id: 3,
    nome: 'Pedro Costa',
    email: 'pedro.costa@empresa.com',
    funcao: 'Operador',
    departamento: 'Operações',
    telefone: '+55 11 99999-0003',
    ultimoAcesso: '2024-01-16 18:20',
    status: 'Ativo',
    dataCriacao: '2023-12-10',
    permissoes: {
      dashboard: true,
      agentes: false,
      rotinas: true,
      usuarios: false,
      configuracoes: false
    }
  },
  {
    id: 4,
    nome: 'Ana Rodrigues',
    email: 'ana.rodrigues@empresa.com',
    funcao: 'Analista',
    departamento: 'Marketing',
    telefone: '+55 11 99999-0004',
    ultimoAcesso: '2024-01-15 16:15',
    status: 'Ativo',
    dataCriacao: '2023-12-15',
    permissoes: {
      dashboard: true,
      agentes: false,
      rotinas: false,
      usuarios: false,
      configuracoes: false
    }
  },
  {
    id: 5,
    nome: 'Carlos Mendes',
    email: 'carlos.mendes@empresa.com',
    funcao: 'Supervisor',
    departamento: 'Atendimento',
    telefone: '+55 11 99999-0005',
    ultimoAcesso: '2024-01-10 12:30',
    status: 'Inativo',
    dataCriacao: '2023-11-20',
    permissoes: {
      dashboard: true,
      agentes: true,
      rotinas: true,
      usuarios: false,
      configuracoes: false
    }
  }
]