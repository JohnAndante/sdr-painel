import { useState, useEffect, useCallback } from 'react';
import { BREAKPOINTS } from '../constants/app';

interface UseThemeReturn {
  darkMode: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  screenSize: 'mobile' | 'tablet' | 'desktop';
  toggleDarkMode: () => void;
  // Keep manual toggle for demo purposes
  toggleMobileDemo: () => void;
}

export function useTheme(): UseThemeReturn {
  const [darkMode, setDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [mobileDemo, setMobileDemo] = useState(false);

  // Auto-detect screen size based on viewport
  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      
      // Use actual viewport for responsive behavior
      const mobile = width < parseInt(BREAKPOINTS.md); // < 768px
      const tablet = width >= parseInt(BREAKPOINTS.md) && width < parseInt(BREAKPOINTS.lg); // 768px - 1024px
      const desktop = width >= parseInt(BREAKPOINTS.lg); // >= 1024px
      
      setIsMobile(mobile || mobileDemo);
      setIsTablet(tablet && !mobileDemo);
      setIsDesktop(desktop && !mobileDemo);
    };

    // Initial check
    updateScreenSize();

    // Listen for viewport changes
    const mediaQuery = window.matchMedia(`(max-width: ${BREAKPOINTS.lg})`);
    const handleChange = () => updateScreenSize();
    
    mediaQuery.addEventListener('change', handleChange);
    window.addEventListener('resize', updateScreenSize);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      window.removeEventListener('resize', updateScreenSize);
    };
  }, [mobileDemo]);

  const getScreenSize = (): 'mobile' | 'tablet' | 'desktop' => {
    if (isMobile) return 'mobile';
    if (isTablet) return 'tablet';
    return 'desktop';
  };

  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => !prev);
  }, []);

  const toggleMobileDemo = useCallback(() => {
    setMobileDemo(prev => !prev);
  }, []);

  return {
    darkMode,
    isMobile,
    isTablet,
    isDesktop,
    screenSize: getScreenSize(),
    toggleDarkMode,
    toggleMobileDemo,
  };
}