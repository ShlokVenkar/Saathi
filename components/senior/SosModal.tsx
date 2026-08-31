'use client';

import React from 'react';
import { useSaathi } from '@/context/SaathiContext';
import { Phone, AlertTriangle, X, ShieldAlert, HeartHandshake } from 'lucide-react';

interface SosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SosModal: React.FC<SosModalProps> = ({ isOpen, onClose }) => {
  const { tSenior, senior } = useSaathi();

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="sos-title"
    >
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border-4 border-red-600 space-y-6">
        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="p-4 bg-red-100 rounded-2xl text-red-600 shrink-0">
            <AlertTriangle className="w-10 h-10 animate-bounce" />
          </div>
          <div>
            <h2 id="sos-title" className="text-2xl sm:text-3xl font-black text-red-600 tracking-tight">
              {tSenior('sos.modalTitle')}
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mt-1 font-medium">
              {tSenior('sos.modalSubtitle')}
            </p>
          </div>
        </div>

        {/* Emergency Dispatch Notice */}
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 flex items-center gap-3">
          <ShieldAlert className="w-6 h-6 text-red-600 shrink-0" />
          <p className="text-red-900 font-bold text-base sm:text-lg">
            {tSenior('sos.sosDispatched')}
          </p>
        </div>

        {/* Call Buttons (High Contrast & Big Touch Targets) */}
        <div className="grid gap-3 sm:gap-4">
          {/* Call Family */}
          <a
            href="tel:+919876543210"
            className="flex items-center justify-between p-5 bg-blue-900 text-white rounded-2xl hover:bg-blue-800 transition-all font-bold text-xl sm:text-2xl shadow-md active:scale-98 border-2 border-blue-700"
          >
            <div className="flex items-center gap-4">
              <HeartHandshake className="w-8 h-8 text-blue-300 shrink-0" />
              <div className="text-left">
                <span className="block">{tSenior('sos.callPrimaryCaregiver')}</span>
                <span className="text-xs sm:text-sm text-blue-200 font-normal">{senior.primaryCaregiverPhone}</span>
              </div>
            </div>
            <Phone className="w-7 h-7 text-emerald-300" />
          </a>

          {/* Call Ambulance */}
          <a
            href="tel:108"
            className="flex items-center justify-between p-5 bg-red-600 text-white rounded-2xl hover:bg-red-700 transition-all font-bold text-xl sm:text-2xl shadow-md active:scale-98 border-2 border-red-500"
          >
            <div className="flex items-center gap-4">
              <AlertTriangle className="w-8 h-8 text-yellow-300 shrink-0" />
              <span>{tSenior('sos.callAmbulance')}</span>
            </div>
            <Phone className="w-7 h-7 text-yellow-300" />
          </a>

          {/* Call Senior Helpline */}
          <a
            href="tel:14567"
            className="flex items-center justify-between p-5 bg-amber-600 text-white rounded-2xl hover:bg-amber-700 transition-all font-bold text-xl sm:text-2xl shadow-md active:scale-98 border-2 border-amber-500"
          >
            <div className="flex items-center gap-4">
              <Phone className="w-8 h-8 text-amber-200 shrink-0" />
              <span>{tSenior('sos.callSeniorHelpline')}</span>
            </div>
            <span className="text-lg bg-amber-800/60 px-3 py-1 rounded-xl">14567</span>
          </a>

          {/* Call Police */}
          <a
            href="tel:112"
            className="flex items-center justify-between p-4 bg-slate-800 text-white rounded-2xl hover:bg-slate-700 transition-all font-bold text-lg sm:text-xl shadow-md active:scale-98"
          >
            <div className="flex items-center gap-3">
              <ShieldAlert className="w-7 h-7 text-slate-300 shrink-0" />
              <span>{tSenior('sos.callPolice')}</span>
            </div>
            <span className="text-base bg-slate-700 px-3 py-1 rounded-xl">112</span>
          </a>
        </div>

        {/* Cancel Button */}
        <button
          onClick={onClose}
          className="w-full p-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-bold text-lg sm:text-xl flex items-center justify-center gap-2 border-2 border-slate-300 active:scale-98"
        >
          <X className="w-6 h-6" />
          {tSenior('sos.cancelSos')}
        </button>
      </div>
    </div>
  );
};
