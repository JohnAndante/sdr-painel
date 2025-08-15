import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { User, LoginCredentials, RegisterData } from '../types';
import { STORAGE_KEYS, MOCK_USERS } from '../constants/app';

interface UseAuthReturn {
  isAuthenticated: boolean;
  currentUser: User | null;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
}

export function useAuth(): UseAuthReturn {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for saved authentication on mount
  useEffect(() => {
    const checkSavedAuth = () => {
      try {
        const savedUser = localStorage.getItem(STORAGE_KEYS.user);
        if (savedUser) {
          const userData = JSON.parse(savedUser) as User;
          setCurrentUser(userData);
          setIsAuthenticated(true);
          toast.success(`Bem-vindo de volta, ${userData.name}!`);
        }
      } catch (error) {
        console.error('Error loading saved auth:', error);
        localStorage.removeItem(STORAGE_KEYS.user);
      } finally {
        setIsLoading(false);
      }
    };

    checkSavedAuth();
  }, []);

  const login = useCallback(async (credentials: LoginCredentials): Promise<void> => {
    try {
      // Mock authentication - check against mock users or accept any credentials
      const mockUsers = [
        ...MOCK_USERS,
        {
          email: credentials.email,
          password: credentials.password,
          name: 'Usuário Teste',
          role: 'user' as const,
        },
      ];

      const user = mockUsers.find(
        (u) => u.email === credentials.email && u.password === credentials.password
      );

      if (user) {
        const userData: User = {
          id: Date.now(),
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: null,
          lastLogin: new Date().toISOString(),
          rememberMe: credentials.rememberMe,
        };

        // Save to localStorage if "remember me" is checked
        if (credentials.rememberMe) {
          localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(userData));
        }

        setCurrentUser(userData);
        setIsAuthenticated(true);
        toast.success(`Bem-vindo, ${user.name}!`);
      } else {
        throw new Error('Email ou senha incorretos');
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao fazer login';
      toast.error(message);
      throw error;
    }
  }, []);

  const register = useCallback(async (userData: RegisterData): Promise<void> => {
    try {
      const newUser: User = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        role: 'user',
        avatar: null,
        lastLogin: new Date().toISOString(),
      };

      setCurrentUser(newUser);
      setIsAuthenticated(true);
      toast.success(`Conta criada com sucesso! Bem-vindo, ${userData.name}!`);
    } catch (error) {
      toast.error('Erro ao criar conta. Tente novamente.');
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem(STORAGE_KEYS.user);
    toast.success('Logout realizado com sucesso');
  }, []);

  return {
    isAuthenticated,
    currentUser,
    isLoading,
    login,
    register,
    logout,
  };
}
