import { Ligacao, LigacaoDetalhes, RotinaDetalhes } from '../types';

// Gerar números de telefone brasileiros aleatórios
const generatePhoneNumber = (): string => {
  const ddd = [11, 21, 31, 41, 51, 61, 71, 81, 85, 91][Math.floor(Math.random() * 10)];
  const prefix = Math.floor(Math.random() * 90000) + 10000;
  const suffix = Math.floor(Math.random() * 9000) + 1000;
  return `(${ddd}) 9${prefix}-${suffix}`;
};

// Nomes aleatórios para contatos
const nomes = [
  'Ana Silva', 'Carlos Santos', 'Maria Oliveira', 'João Costa', 'Fernanda Lima',
  'Rafael Pereira', 'Juliana Almeida', 'Lucas Rodrigues', 'Camila Ferreira', 'Pedro Martins',
  'Larissa Souza', 'Thiago Barbosa', 'Gabriela Castro', 'Marcelo Dias', 'Vanessa Rocha',
  'Felipe Cardoso', 'Patrícia Gomes', 'Ricardo Nascimento', 'Amanda Ribeiro', 'Bruno Machado'
];

const status = ['Atendida', 'Não atendida', 'Ocupado', 'Caixa postal', 'Número inválido'] as const;
const resultados = ['Sucesso', 'Falha', 'Follow-up', 'Não interessado', 'Callback'] as const;
const sentimentos = ['Positivo', 'Neutro', 'Negativo'] as const;

// Gerar transcrição mock
const gerarTranscricao = (resultado: string, nome?: string): string => {
  const cliente = nome || 'Cliente';
  
  const transcricoes = {
    'Sucesso': [
      `Agente: Olá, ${cliente}! Sou da Gerson, estou ligando para apresentar nossa solução de automação. Tem alguns minutos?\n\n${cliente}: Sim, pode falar.\n\nAgente: Perfeito! Nosso sistema pode reduzir em até 70% o tempo gasto com tarefas repetitivas. Posso agendar uma demonstração?\n\n${cliente}: Interessante, sim, vamos agendar.\n\nAgente: Ótimo! Que tal na quinta-feira às 14h?\n\n${cliente}: Perfeito, confirmo.\n\nAgente: Excelente! Enviarei os detalhes por email. Muito obrigado!`,
      
      `Agente: Boa tarde, ${cliente}! Aqui é da Gerson. Vejo que você visitou nosso site recentemente. Como posso ajudar?\n\n${cliente}: Ah sim, estava procurando soluções de IA para atendimento.\n\nAgente: Perfeito! Temos exatamente o que precisa. Nosso sistema já atendeu mais de 1 milhão de clientes. Posso mostrar como funciona?\n\n${cliente}: Claro, me interessa muito.\n\nAgente: Maravilha! Vou preparar uma apresentação personalizada para seu negócio.`
    ],
    
    'Follow-up': [
      `Agente: Olá, ${cliente}! Retornando conforme combinamos. Já teve tempo de avaliar nossa proposta?\n\n${cliente}: Olha, ainda estou analisando internamente. Preciso de mais uns 3 dias.\n\nAgente: Sem problema! Entendo que é uma decisão importante. Posso ligar na próxima semana?\n\n${cliente}: Sim, pode ser terça-feira de manhã.\n\nAgente: Perfeito, já anotei. Até terça!`,
      
      `Agente: Oi ${cliente}, como prometido, estou retornando. Conseguiu falar com sua equipe?\n\n${cliente}: Sim, eles gostaram da ideia, mas querem ver mais detalhes técnicos.\n\nAgente: Ótimo! Posso marcar uma reunião técnica com nossa equipe de engenharia?\n\n${cliente}: Isso seria ideal. Pode ser na sexta?\n\nAgente: Vou verificar a agenda e confirmo por email.`
    ],
    
    'Não interessado': [
      `Agente: Boa tarde, ${cliente}! Sou da Gerson, gostaria de apresentar nossa solução de automação.\n\n${cliente}: Olha, no momento não tenho interesse, obrigado.\n\nAgente: Sem problema! Posso deixar meu contato caso mude de ideia no futuro?\n\n${cliente}: Pode deixar, mas por enquanto não tenho demanda.\n\nAgente: Entendido, obrigado pelo seu tempo!`,
      
      `Agente: Olá, ${cliente}! Estou ligando sobre soluções de IA para empresas.\n\n${cliente}: Não, obrigado, já temos um sistema e estamos satisfeitos.\n\nAgente: Que bom! Se no futuro precisar de algo diferente, pode nos procurar.\n\n${cliente}: Certo, obrigado.`
    ],
    
    'Falha': [
      `Agente: Alô? ${cliente}?\n\n[Ruído na linha]\n\nAgente: Consegue me ouvir?\n\n[Linha cortou após 15 segundos]`,
      
      `Agente: Boa tarde, é o ${cliente}?\n\n${cliente}: Quem é?\n\nAgente: Sou da Gers...\n\n[Cliente desligou]`
    ],
    
    'Callback': [
      `Agente: Olá, ${cliente}! Sou da Gerson. É um bom momento para conversar?\n\n${cliente}: Na verdade não, estou em reunião. Pode ligar mais tarde?\n\nAgente: Claro! Que horário seria melhor?\n\n${cliente}: Depois das 16h seria ideal.\n\nAgente: Perfeito, ligo às 16h30. Obrigado!`
    ]
  };
  
  const opcoes = transcricoes[resultado as keyof typeof transcricoes] || ['Transcrição não disponível'];
  return opcoes[Math.floor(Math.random() * opcoes.length)];
};

// Gerar dados de ligações para uma rotina
export const gerarLigacoesMock = (rotinaId: number, quantidade: number): Ligacao[] => {
  const ligacoes: Ligacao[] = [];
  
  for (let i = 1; i <= quantidade; i++) {
    const statusLigacao = status[Math.floor(Math.random() * status.length)];
    const resultado = resultados[Math.floor(Math.random() * resultados.length)];
    const nome = Math.random() > 0.3 ? nomes[Math.floor(Math.random() * nomes.length)] : undefined;
    const duracao = statusLigacao === 'Atendida' 
      ? Math.floor(Math.random() * 600) + 30  // 30s a 10min
      : Math.floor(Math.random() * 30) + 5;   // 5s a 35s
    
    const ligacao: Ligacao = {
      id: i,
      numero: generatePhoneNumber(),
      nomeContato: nome,
      dataHora: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      duracao: `${Math.floor(duracao / 60)}:${(duracao % 60).toString().padStart(2, '0')}`,
      status: statusLigacao,
      resultado,
      tentativas: Math.floor(Math.random() * 3) + 1,
      observacoes: resultado === 'Follow-up' ? 'Cliente solicitou retorno em 3 dias' : undefined,
      gravacao: statusLigacao === 'Atendida',
      transcricao: statusLigacao === 'Atendida' ? gerarTranscricao(resultado, nome) : undefined,
      pontuacao: statusLigacao === 'Atendida' ? Math.floor(Math.random() * 40) + 60 : undefined,
      proximoContato: resultado === 'Callback' ? new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : undefined
    };
    
    ligacoes.push(ligacao);
  }
  
  return ligacoes.sort((a, b) => new Date(b.dataHora).getTime() - new Date(a.dataHora).getTime());
};

// Gerar detalhes completos de uma ligação
export const gerarLigacaoDetalhes = (ligacao: Ligacao, rotina: { id: number, nome: string }, agente: { nome: string, persona: string }): LigacaoDetalhes => {
  const palavrasChave = {
    'Sucesso': ['interessado', 'agenda', 'reunião', 'proposta', 'solução'],
    'Follow-up': ['avaliar', 'analisar', 'equipe', 'prazo', 'retorno'],
    'Não interessado': ['não tenho', 'satisfeito', 'sem demanda', 'não preciso'],
    'Callback': ['ocupado', 'reunião', 'mais tarde', 'horário melhor'],
    'Falha': ['ruído', 'cortou', 'desligou', 'não atendeu']
  };
  
  return {
    ...ligacao,
    rotina,
    agente,
    contextoAtendimento: 'Prospecção de novos clientes para soluções de automação empresarial',
    stackUsada: ['Apresentação da empresa', 'Identificação da necessidade', 'Demonstração de valor', 'Agendamento'],
    metricas: {
      tempoResposta: '2.3s',
      palavrasChave: palavrasChave[ligacao.resultado as keyof typeof palavrasChave] || [],
      sentimento: sentimentos[Math.floor(Math.random() * sentimentos.length)],
      confianca: Math.floor(Math.random() * 30) + 70
    }
  };
};

// Dados mock para detalhes de rotinas
export const ROTINAS_DETALHES_MOCK: Record<number, RotinaDetalhes> = {
  1: {
    id: 1,
    nome: 'Vendas Produto A - Q1',
    descricao: 'Campanha de vendas focada no produto A para o primeiro trimestre',
    agente: 'Ana Silva',
    dataInicio: '2025-01-15',
    horaInicio: '09:00',
    dataFim: '2025-01-15',
    horaFim: '17:00',
    totalNumeros: 500,
    ligacoesEfetuadas: 342,
    sucessos: 156,
    falhas: 186,
    status: 'Concluída',
    contextoAtendimento: 'Prospecção ativa para venda do Produto A, focando em pequenas e médias empresas que podem se beneficiar da automação de processos.',
    stackAtendimento: [
      'Apresentação pessoal e da empresa',
      'Identificação da necessidade do cliente',
      'Apresentação dos benefícios do Produto A',
      'Tratamento de objeções',
      'Agendamento de demonstração',
      'Fechamento ou follow-up'
    ],
    numeros: [], // Preenchido dinamicamente
    ligacoes: [], // Será preenchido com gerarLigacoesMock
    processo: {
      objetivo: 'Gerar leads qualificados e agendar demonstrações do Produto A para aumentar as vendas no Q1',
      estrategia: 'Abordagem consultiva focando na identificação de dores relacionadas à falta de automação e apresentação de casos de sucesso',
      scriptBase: 'Olá, [NOME]! Sou [AGENTE] da Gerson. Estou ligando porque vejo que sua empresa [EMPRESA] pode se beneficiar muito da nossa solução de automação. Posso apresentar como já ajudamos empresas similares à sua a economizar até 60% do tempo em processos repetitivos?'
    },
    metricas: {
      taxaSucesso: 45.6,
      duracaoMedia: '4:32',
      melhorHorario: '14:00-16:00',
      tentativasMedia: 1.8
    }
  },
  2: {
    id: 2,
    nome: 'Follow-up Leads Quentes',
    descricao: 'Retorno para leads que demonstraram interesse inicial',
    agente: 'Carlos Santos',
    dataInicio: '2025-01-16',
    horaInicio: '10:00',
    dataFim: '2025-01-16',
    horaFim: '16:00',
    totalNumeros: 200,
    ligacoesEfetuadas: 180,
    sucessos: 165,
    falhas: 15,
    status: 'Concluída',
    contextoAtendimento: 'Follow-up com leads que já manifestaram interesse, focando em agendar demonstrações e avançar no funil de vendas.',
    stackAtendimento: [
      'Retomada do contexto da conversa anterior',
      'Verificação do interesse atual',
      'Esclarecimento de dúvidas',
      'Agendamento de próximos passos',
      'Confirmação de dados para contato'
    ],
    numeros: [],
    ligacoes: [],
    processo: {
      objetivo: 'Converter leads quentes em oportunidades de negócio através de follow-up estruturado',
      estrategia: 'Abordagem de relacionamento, retomando conversas anteriores e focando em resolver objeções específicas',
      scriptBase: 'Olá, [NOME]! Aqui é [AGENTE] da Gerson. Estou retornando conforme combinamos. Já teve tempo de conversar com sua equipe sobre nossa solução?'
    },
    metricas: {
      taxaSucesso: 91.7,
      duracaoMedia: '6:15',
      melhorHorario: '10:00-12:00',
      tentativasMedia: 1.2
    }
  }
};

// Função para buscar detalhes de uma rotina
export const buscarDetalhesRotina = (id: number): RotinaDetalhes | null => {
  const detalhes = ROTINAS_DETALHES_MOCK[id];
  if (!detalhes) return null;
  
  // Gerar ligações se ainda não existem
  if (detalhes.ligacoes.length === 0) {
    detalhes.ligacoes = gerarLigacoesMock(id, detalhes.ligacoesEfetuadas);
  }
  
  return detalhes;
};

// Função para buscar detalhes de uma ligação
export const buscarDetalhesLigacao = (ligacaoId: number, rotinaId: number): LigacaoDetalhes | null => {
  const rotina = buscarDetalhesRotina(rotinaId);
  if (!rotina) return null;
  
  const ligacao = rotina.ligacoes.find(l => l.id === ligacaoId);
  if (!ligacao) return null;
  
  return gerarLigacaoDetalhes(
    ligacao,
    { id: rotina.id, nome: rotina.nome },
    { nome: rotina.agente, persona: 'Agente especializado em vendas' }
  );
};