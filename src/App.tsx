"use client";

import React from "react";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { LoadingScreen } from "./components/LoadingScreen";
import { ThemeControls } from "./components/ThemeControls";
import { ResponsiveLayout } from "./components/ResponsiveLayout";
import AuthWrapper from "./components/AuthWrapper";
import AgenteForm from "./components/AgenteForm";
import { useAuth } from "./hooks/useAuth";
import { useTheme } from "./hooks/useTheme";
import { useAppState } from "./hooks/useAppState";

export default function App() {
  // Custom hooks for state management
  const auth = useAuth();
  const theme = useTheme();
  const appState = useAppState(auth.logout);

  // Show loading screen while checking authentication
  if (auth.isLoading) {
    return <LoadingScreen message="Verificando autenticação..." />;
  }

  // Show authentication screens if not authenticated
  if (!auth.isAuthenticated) {
    return (
      <ErrorBoundary>
        <div className="relative min-h-screen w-full">
          <ThemeControls
            darkMode={theme.darkMode}
            isMobile={theme.isMobile}
            onToggleDarkMode={theme.toggleDarkMode}
            onToggleMobile={theme.toggleMobileDemo}
          />

          <AuthWrapper
            darkMode={theme.darkMode}
            isMobile={theme.isMobile}
            onAuthSuccess={auth.login}
          />
        </div>
      </ErrorBoundary>
    );
  }

  // Show main application if authenticated
  return (
    <ErrorBoundary>
      <div className="relative min-h-screen w-full">
        <ThemeControls
          darkMode={theme.darkMode}
          isMobile={theme.isMobile}
          onToggleDarkMode={theme.toggleDarkMode}
          onToggleMobile={theme.toggleMobileDemo}
        />

        <ResponsiveLayout
          darkMode={theme.darkMode}
          isMobile={theme.isMobile}
          isTablet={theme.isTablet}
          currentPage={appState.currentPage}
          currentUser={auth.currentUser!}
          onNavigate={appState.navigateTo}
          appState={appState}
        />

        {/* Agent Form Dialog */}
        <AgenteForm
          open={appState.formDialogOpen}
          onOpenChange={appState.setFormDialogOpen}
          agente={appState.selectedAgente}
          darkMode={theme.darkMode}
        />
      </div>
    </ErrorBoundary>
  );
}