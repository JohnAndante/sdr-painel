
import AppShell from './AppShell';
import { PageRenderer } from './PageRenderer';
import { User, PageId } from '../types';
import { useAppState } from '../hooks/useAppState';

interface ResponsiveLayoutProps {
  darkMode: boolean;
  isMobile: boolean;
  isTablet: boolean;
  currentPage: PageId;
  currentUser: User;
  onNavigate: (page: string) => void;
  appState: ReturnType<typeof useAppState>;
  onToggleDarkMode: () => void;
  onToggleMobile: () => void;
}

export function ResponsiveLayout({
  darkMode,
  isMobile,
  currentPage,
  currentUser,
  onNavigate,
  appState,
  onToggleDarkMode,
  onToggleMobile,
}: ResponsiveLayoutProps) {
  return (
    <div
      className={`
        min-h-screen w-full bg-background
        ${darkMode ? 'dark' : ''}
      `}
      style={{
        fontFamily: "Roboto Flex, Roboto, sans-serif",
      }}
    >
      {/* Debug info - remove in production */}
      {/* <div className="fixed top-4 left-4 z-50 bg-black/80 text-white px-3 py-2 rounded text-xs no-print">
        {isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop'} | {darkMode ? 'Dark' : 'Light'} | {currentUser.name}
      </div> */}

      <AppShell
        darkMode={darkMode}
        isMobile={isMobile}
        currentPage={currentPage}
        currentUser={currentUser}
        onNavigate={onNavigate}
        onToggleDarkMode={onToggleDarkMode}
        onToggleMobile={onToggleMobile}
      >
        <PageRenderer
          currentPage={currentPage}
          darkMode={darkMode}
          isMobile={isMobile}
          appState={appState}
        />
      </AppShell>
    </div>
  );
}
