import React from 'react';
import { PageId } from '../types';
import DashboardPage from './pages/DashboardPage';
import AgentesPage from './pages/AgentesPage';
import RotinasPage from './pages/RotinasPage';
import RotinaDetalhesPage from './pages/RotinaDetalhesPage';
import UsuariosPage from './pages/UsuariosPage';
import { useAppState } from '../hooks/useAppState';

interface PageRendererProps {
  currentPage: PageId;
  darkMode: boolean;
  isMobile: boolean;
  appState: ReturnType<typeof useAppState>;
}

export function PageRenderer({ 
  currentPage, 
  darkMode, 
  isMobile, 
  appState 
}: PageRendererProps) {
  switch (currentPage) {
    case 'dashboard':
      return (
        <DashboardPage
          darkMode={darkMode}
          isMobile={isMobile}
          selectedPeriod={appState.selectedPeriod}
          onPeriodChange={appState.setSelectedPeriod}
        />
      );
      
    case 'agentes':
      return (
        <AgentesPage
          darkMode={darkMode}
          isMobile={isMobile}
          agentesView={appState.agentesView}
          agentesData={appState.agentesData}
          onViewChange={appState.setAgentesView}
          onFormSubmit={appState.handleSaveAgente}
          onEditAgente={appState.handleEditAgente}
        />
      );
      
    case 'rotinas':
      return (
        <RotinasPage
          darkMode={darkMode}
          isMobile={isMobile}
          rotinasView={appState.rotinasView}
          rotinasData={appState.rotinasData}
          agentesData={appState.agentesData}
          onViewChange={appState.setRotinasView}
          onFormSubmit={appState.handleSaveRotina}
          onViewDetails={appState.handleViewRotinaDetails}
        />
      );

    case 'rotina-detalhes':
      if (!appState.rotinaDetalhes) {
        return (
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Rotina não encontrada</p>
          </div>
        );
      }
      
      return (
        <RotinaDetalhesPage
          rotina={appState.rotinaDetalhes}
          darkMode={darkMode}
          isMobile={isMobile}
          onBack={appState.handleBackToRotinas}
          onViewLigacaoDetails={appState.handleViewLigacaoDetails}
          selectedLigacaoDetalhes={appState.selectedLigacaoDetalhes}
          onCloseLigacaoDetails={() => appState.handleViewLigacaoDetails(-1)}
        />
      );
      
    case 'usuarios':
      return (
        <UsuariosPage
          darkMode={darkMode}
          isMobile={isMobile}
          usuariosView={appState.usuariosView}
          usuariosData={appState.usuariosData}
          onViewChange={appState.setUsuariosView}
          onFormSubmit={appState.handleSaveUsuario}
          onEditUsuario={appState.handleEditUsuario}
          onViewDetails={appState.handleViewUsuarioDetails}
        />
      );
      
    default:
      return (
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Página em desenvolvimento</p>
        </div>
      );
  }
}