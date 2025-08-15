import React from 'react';
import { APP_CONFIG } from '../constants/app';

interface LoadingScreenProps {
  message?: string;
}

export function LoadingScreen({ message = 'Carregando...' }: LoadingScreenProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-primary flex items-center justify-center mb-4">
          <span className="text-primary-foreground text-2xl font-medium">G</span>
        </div>
        <h1 className="text-3xl font-medium text-foreground mb-2">{APP_CONFIG.name}</h1>
        <p className="text-muted-foreground mb-4">{message}</p>
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
      </div>
    </div>
  );
}