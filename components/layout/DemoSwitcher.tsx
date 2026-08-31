'use client';

import React, { useState } from 'react';
import { useSaathi } from '@/context/SaathiContext';
import { UserRole } from '@/types';
import { 
  Users, 
  Cpu, 
  ShieldAlert, 
  Smartphone, 
  X, 
  Sparkles, 
  RotateCcw,
  SlidersHorizontal,
  ChevronUp
} from 'lucide-react';

export const DemoSwitcher: React.FC = () => {
  const { currentRole, setCurrentRole, resetCheckIn } = useSaathi();
  const [isOpen, setIsOpen] = useState(false);

  const roles: Array<{ id: UserRole; title: string; desc: string; icon: React.ElementType; badge?: string }> = [
    { id: 'senior', title: 'Senior Citizen PWA', desc: 'Main elderly companion interface', icon: Smartphone },
    { id: 'family', title: 'Family Caregiver Hub', desc: 'Caregiver live stream & WhatsApp preview', icon: Users, badge: 'Live Sync' },
    { id: 'hardware', title: 'ESP32 Hardware Simulator', desc: 'Flex sensors, PIR & gesture calibration', icon: Cpu, badge: 'Judges Demo' },
    { id: 'admin', title: 'Admin & Device Registry', desc: 'System telemetry & gateway status', icon: ShieldAlert },
  ];

  return (
    <>
      {/* Floating Discrete Pill */}
      <div className="fixed bottom-4 right-4 z-40">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2.5 bg-slate-900/90 hover:bg-slate-900 text-white rounded-full text-xs font-black shadow-2xl flex items-center gap-2 border border-slate-700 backdrop-blur-md active:scale-95 transition-all"
          aria-label="Toggle Demo Controls"
        >
          <SlidersHorizontal className="w-4 h-4 text-amber-400" />
          <span>Demo: <strong>{currentRole.toUpperCase()}</strong></span>
          <ChevronUp className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Demo Modal Drawer */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-slate-900 text-white rounded-3xl max-w-md w-full p-6 shadow-2xl border-2 border-slate-700 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-amber-500/20 text-amber-400 rounded-xl">
                  <Sparkles className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-black text-lg">Hackathon Demo Switcher</h3>
                  <p className="text-xs text-slate-400">Switch role for judges evaluation</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Role List */}
            <div className="space-y-2.5">
              {roles.map((r) => {
                const Icon = r.icon;
                const isActive = currentRole === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => {
                      setCurrentRole(r.id);
                      setIsOpen(false);
                    }}
                    className={`w-full p-3.5 rounded-2xl border-2 text-left flex items-center justify-between transition-all ${
                      isActive
                        ? 'border-blue-500 bg-blue-950/60 text-white font-bold'
                        : 'border-slate-800 bg-slate-800/60 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl ${isActive ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-sm font-black block">{r.title}</span>
                        <span className="text-xs text-slate-400 font-medium">{r.desc}</span>
                      </div>
                    </div>

                    {r.badge && (
                      <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded-full text-[10px] font-black uppercase">
                        {r.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Reset Demo Data Button */}
            <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
              <span className="text-slate-400">Demo State Actions:</span>
              <button
                type="button"
                onClick={() => {
                  resetCheckIn();
                  setIsOpen(false);
                }}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold flex items-center gap-1.5 active:scale-95"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Check-in
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
