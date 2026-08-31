'use client';

import React from 'react';
import { useSaathi } from '@/context/SaathiContext';
import { UserRole } from '@/types';
import { 
  HeartHandshake, 
  Users, 
  Cpu, 
  ShieldAlert, 
  Smartphone, 
  AlertTriangle,
  Download,
  CheckCircle2
} from 'lucide-react';

interface RoleSwitcherProps {
  currentView: 'home' | 'services' | 'explainer';
  onNavigateView: (view: 'home' | 'services' | 'explainer') => void;
}

export const RoleSwitcher: React.FC<RoleSwitcherProps> = ({ currentView, onNavigateView }) => {
  const { currentRole, setCurrentRole, requests, tSenior } = useSaathi();

  const hasEmergency = requests.some(
    (r) => r.type === 'EMERGENCY' && r.status !== 'RESOLVED' && r.status !== 'CANCELLED'
  );

  const roles: Array<{ id: UserRole; label: string; icon: React.ElementType }> = [
    { id: 'senior', label: 'Senior', icon: Smartphone },
    { id: 'family', label: 'Family Hub', icon: Users },
    { id: 'hardware', label: 'Hardware Sim', icon: Cpu },
    { id: 'admin', label: 'Admin', icon: ShieldAlert },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-slate-200 shadow-sm">
      {/* Critical Emergency Banner if active */}
      {hasEmergency && (
        <div className="bg-red-600 text-white px-4 py-2 text-center font-black text-sm sm:text-base flex items-center justify-center gap-2 animate-pulse">
          <AlertTriangle className="w-5 h-5 text-white" />
          <span>EMERGENCY SOS IS ACTIVE: Caregiver & Dispatch Alerted</span>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-3 sm:px-4 py-2.5 flex items-center justify-between gap-2">
        {/* Brand & Demo Mode Pill */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNavigateView('home')}
            className="flex items-center gap-2 text-left"
          >
            <div className="p-2 bg-blue-900 text-white rounded-xl shadow-sm">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <span className="font-black text-lg sm:text-xl text-blue-900 tracking-tight block leading-none">
                SAATHI
              </span>
              <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase">
                Accessible Care
              </span>
            </div>
          </button>

          <span className="hidden sm:inline-block px-2 py-0.5 bg-amber-100 text-amber-900 border border-amber-300 rounded-lg text-[11px] font-black tracking-wider">
            DEMO MODE
          </span>
        </div>

        {/* Demo Mode Role Switcher Buttons */}
        <nav className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200" aria-label="Role Switcher">
          {roles.map((r) => {
            const Icon = r.icon;
            const isActive = currentRole === r.id;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => {
                  setCurrentRole(r.id);
                  if (r.id === 'senior' && currentView !== 'home') {
                    onNavigateView('home');
                  }
                }}
                className={`px-2.5 sm:px-4 py-1.5 rounded-xl font-black text-xs sm:text-sm flex items-center gap-1.5 transition-all ${
                  isActive
                    ? 'bg-blue-900 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{r.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Sub-Navigation for Senior when in Senior mode */}
      {currentRole === 'senior' && (
        <div className="bg-slate-50 border-t border-slate-200 px-3 py-1.5 flex items-center justify-center gap-2 sm:gap-4 overflow-x-auto text-xs sm:text-sm font-bold">
          <button
            type="button"
            onClick={() => onNavigateView('home')}
            className={`px-3 py-1 rounded-xl transition-all ${
              currentView === 'home'
                ? 'bg-blue-100 text-blue-900 font-black'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🏠 {tSenior('nav.home')}
          </button>

          <button
            type="button"
            onClick={() => onNavigateView('services')}
            className={`px-3 py-1 rounded-xl transition-all ${
              currentView === 'services'
                ? 'bg-blue-100 text-blue-900 font-black'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            📍 {tSenior('nav.services')}
          </button>

          <button
            type="button"
            onClick={() => onNavigateView('explainer')}
            className={`px-3 py-1 rounded-xl transition-all ${
              currentView === 'explainer'
                ? 'bg-purple-100 text-purple-900 font-black'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            📄 {tSenior('nav.document')}
          </button>
        </div>
      )}
    </header>
  );
};
