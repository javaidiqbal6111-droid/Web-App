
import React from 'react';
import { View } from '../types';
import { Icons } from '../constants';

interface NavigationProps {
  currentView: View;
  onNavigate: (view: View) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, onNavigate }) => {
  const tabs: { id: View; label: string; icon: React.ReactNode }[] = [
    { id: 'today', label: 'Today', icon: <Icons.Today /> },
    { id: 'library', label: 'Library', icon: <Icons.Library /> },
    { id: 'profiles', label: 'Profiles', icon: <Icons.Profiles /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around items-center px-4 safe-area-bottom h-20 z-40">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onNavigate(tab.id)}
          className={`flex flex-col items-center justify-center space-y-1 transition-colors duration-200 ${
            currentView === tab.id ? 'text-indigo-600' : 'text-gray-400'
          }`}
        >
          {tab.icon}
          <span className="text-xs font-medium">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
};
