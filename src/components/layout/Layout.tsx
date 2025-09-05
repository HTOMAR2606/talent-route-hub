import React from 'react';
import { Header } from './Header';
import { Navigation } from './Navigation';
import { useAuth } from '@/contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        {user && <Navigation />}
        <main className={cn(
          "flex-1 p-6",
          !user && "container mx-auto max-w-md mt-8"
        )}>
          {children}
        </main>
      </div>
    </div>
  );
};

// Small utility to avoid import issues
function cn(...classes: (string | undefined | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}