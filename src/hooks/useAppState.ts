import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import {
  PageId,
  ViewMode,
  Period,
  Agent,
  AgentFormData,
  Rotina,
  RotinaFormData,
  Usuario,
  UsuarioFormData,
  RotinaDetalhes,
  LigacaoDetalhes
} from '../types';
import {
  AGENTES_DATA,
  ROTINAS_DATA,
  LIGACOES_DATA,
  USUARIOS_DATA
} from '../data/mockData';
import { buscarDetalhesRotina, buscarDetalhesLigacao } from '../data/ligacoesMockData';
import { ROUTES, VIEW_MODES, PERIODS } from '../constants/app';

interface UseAppStateReturn {
  // Navigation
  currentPage: PageId;
  navigateTo: (page: string) => void;

  // Views
  agentesView: ViewMode;
  rotinasView: ViewMode;
  usuariosView: ViewMode;
  setAgentesView: (view: ViewMode) => void;
  setRotinasView: (view: ViewMode) => void;
  setUsuariosView: (view: ViewMode) => void;

  // Data
  agentesData: Agent[];
  rotinasData: Rotina[];
  usuariosData: Usuario[];

  // Rotina details
  selectedRotinaId: number | null;
  rotinaDetalhes: RotinaDetalhes | null;
  selectedLigacaoDetalhes: LigacaoDetalhes | null;
  setSelectedRotinaId: (id: number | null) => void;

  // Form states
  selectedAgente: Agent | null;
  formDialogOpen: boolean;
  setFormDialogOpen: (open: boolean) => void;

  // Dashboard
  selectedPeriod: Period;
  setSelectedPeriod: (period: Period) => void;

  // Handlers
  handleSaveAgente: (formData: AgentFormData) => void;
  handleEditAgente: (agente: Agent) => void;
  handleSaveRotina: (formData: RotinaFormData) => void;
  handleSaveUsuario: (formData: UsuarioFormData) => void;
  handleEditUsuario: (usuario: Usuario) => void;
  handleViewUsuarioDetails: (usuario: Usuario) => void;
  handleViewRotinaDetails: (rotina: Rotina) => void;
  handleViewLigacaoDetails: (ligacaoId: number) => void;
  handleBackToRotinas: () => void;
}

export function useAppState(onLogout: () => void): UseAppStateReturn {
  // Navigation state
  const [currentPage, setCurrentPage] = useState<PageId>('dashboard');

  // View states
  const [agentesView, setAgentesView] = useState<ViewMode>('list');
  const [rotinasView, setRotinasView] = useState<ViewMode>('list');
  const [usuariosView, setUsuariosView] = useState<ViewMode>('list');

  // Data state
  const [agentesData, setAgentesData] = useState<Agent[]>(AGENTES_DATA);
  const [rotinasData, setRotinasData] = useState<Rotina[]>(ROTINAS_DATA);
  const [usuariosData, setUsuariosData] = useState<Usuario[]>(USUARIOS_DATA);

  // Rotina details state
  const [selectedRotinaId, setSelectedRotinaId] = useState<number | null>(null);
  const [rotinaDetalhes, setRotinaDetalhes] = useState<RotinaDetalhes | null>(null);
  const [selectedLigacaoDetalhes, setSelectedLigacaoDetalhes] = useState<LigacaoDetalhes | null>(null);

  // Form state
  const [selectedAgente, setSelectedAgente] = useState<Agent | null>(null);
  const [formDialogOpen, setFormDialogOpen] = useState(false);

  // Dashboard state
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('hoje');

  const navigateTo = useCallback((page: string) => {
    if (page === ROUTES.logout) {
      onLogout();
      return;
    }

    const validPage = page as PageId;
    setCurrentPage(validPage);

    // Reset views when navigating
    if (validPage === 'agentes') {
      setAgentesView('list');
    } else if (validPage === 'rotinas') {
      setRotinasView('list');
      setSelectedRotinaId(null);
      setRotinaDetalhes(null);
    } else if (validPage === 'usuarios') {
      setUsuariosView('list');
    }
  }, [onLogout]);

  const handleSaveAgente = useCallback((formData: AgentFormData) => {
    const newAgente: Agent = {
      id: agentesData.length + 1,
      agente: formData.nome,
      persona: formData.persona,
      funcao: formData.funcao,
      idioma: formData.idioma,
      rotinasAtivas: 0,
      taxaSucesso: "0%",
      ultimaAtividade: "Agora",
      status: formData.ativo ? "Ativo" : "Inativo",
    };

    setAgentesData(prev => [newAgente, ...prev]);
    setAgentesView('list');
    toast.success("Agente criado com sucesso!");
  }, [agentesData.length]);

  const handleEditAgente = useCallback((agente: Agent) => {
    setSelectedAgente(agente);
    setFormDialogOpen(true);
  }, []);

  const handleSaveRotina = useCallback((formData: RotinaFormData) => {
    const newRotina: Rotina = {
      id: rotinasData.length + 1,
      ...formData,
    };

    setRotinasData(prev => [newRotina, ...prev]);
    toast.success("Rotina criada com sucesso!");
  }, [rotinasData.length]);

  const handleSaveUsuario = useCallback((formData: UsuarioFormData) => {
    const newUsuario: Usuario = {
      id: usuariosData.length + 1,
      nome: formData.nome,
      email: formData.email,
      funcao: formData.funcao,
      departamento: formData.departamento,
      telefone: formData.telefone,
      status: formData.status,
      ultimoAcesso: "Nunca",
      dataCriacao: new Date().toISOString().split('T')[0],
      permissoes: formData.permissoes,
    };

    setUsuariosData(prev => [newUsuario, ...prev]);
    setUsuariosView('list');
    toast.success("Usuário criado com sucesso!");
  }, [usuariosData.length]);

  const handleEditUsuario = useCallback((usuario: Usuario) => {
    // TODO: Implementar edição de usuário
    toast.info("Edição de usuário em desenvolvimento");
  }, []);

  const handleViewUsuarioDetails = useCallback((usuario: Usuario) => {
    // TODO: Implementar visualização de detalhes
    toast.info("Visualização de detalhes em desenvolvimento");
  }, []);

  const handleViewRotinaDetails = useCallback((rotina: Rotina) => {
    const detalhes = buscarDetalhesRotina(rotina.id);
    if (detalhes) {
      setSelectedRotinaId(rotina.id);
      setRotinaDetalhes(detalhes);
      setCurrentPage('rotina-detalhes');
    } else {
      toast.error("Não foi possível carregar os detalhes da rotina");
    }
  }, []);

  const handleViewLigacaoDetails = useCallback((ligacaoId: number) => {
    if (selectedRotinaId) {
      const detalhes = buscarDetalhesLigacao(ligacaoId, selectedRotinaId);
      if (detalhes) {
        setSelectedLigacaoDetalhes(detalhes);
      } else {
        toast.error("Não foi possível carregar os detalhes da ligação");
      }
    }
  }, [selectedRotinaId]);

  const handleBackToRotinas = useCallback(() => {
    setCurrentPage('rotinas');
    setSelectedRotinaId(null);
    setRotinaDetalhes(null);
    setSelectedLigacaoDetalhes(null);
  }, []);

  return {
    // Navigation
    currentPage,
    navigateTo,

    // Views
    agentesView,
    rotinasView,
    usuariosView,
    setAgentesView,
    setRotinasView,
    setUsuariosView,

    // Data
    agentesData,
    rotinasData,
    usuariosData,

    // Rotina details
    selectedRotinaId,
    rotinaDetalhes,
    selectedLigacaoDetalhes,
    setSelectedRotinaId,

    // Form states
    selectedAgente,
    formDialogOpen,
    setFormDialogOpen,

    // Dashboard
    selectedPeriod,
    setSelectedPeriod,

    // Handlers
    handleSaveAgente,
    handleEditAgente,
    handleSaveRotina,
    handleSaveUsuario,
    handleEditUsuario,
    handleViewUsuarioDetails,
    handleViewRotinaDetails,
    handleViewLigacaoDetails,
    handleBackToRotinas,
  };
}
