'use client';

import React from 'react';
import { useSaathi } from '@/context/SaathiContext';
import { 
  AlertTriangle, 
  Phone, 
  X, 
  Siren, 
  ShieldAlert, 
  HeartHandshake, 
  MessageSquare,
  Volume2
} from 'lucide-react';

interface SosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SosModal: React.FC<SosModalProps> = ({ isOpen, onClose }) => {
  const { senior, createRequest, tSenior, readAloud } = useSaathi();

  if (!isOpen) return null;

  const SON_PHONE = '919619560729';

  const handleTriggerEmergency = (type: string) => {
    createRequest('EMERGENCY', 'APP');
    const msg = `आपत्कालीन संदेश पाठवला आहे. मुलाला आणि काळजीवाहू व्यक्तीला त्वरित सतर्क करण्यात आले आहे.`;
    readAloud(msg);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-red-950/80 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-4 border-red-500 space-y-6 animate-scale-up">
        {/* Header */}
        <div className="flex items-start justify-between border-b-2 border-red-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-600 text-white rounded-2xl animate-pulse">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-red-600">
                आपत्कालीन मदत (SOS)
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-bold">
                तुम्हाला लगेच मदत हवी आहे का?
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-full"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Big Action Buttons */}
        <div className="space-y-3">
          {/* 1. Call Son (Family) */}
          <a
            href="tel:+919619560729"
            onClick={() => handleTriggerEmergency('FAMILY_CALL')}
            className="w-full p-4 sm:p-5 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-black text-xl sm:text-2xl flex items-center justify-between shadow-lg active:scale-97 transition-all border-2 border-red-500"
          >
            <div className="flex items-center gap-3">
              <Phone className="w-7 h-7 shrink-0" />
              <div className="text-left">
                <span className="block">मुलाला फोन करा (Call Son)</span>
                <span className="text-xs font-bold text-red-100 block">+91 96195 60729</span>
              </div>
            </div>
            <span className="text-sm font-black bg-red-800 px-3 py-1 rounded-xl">कॉल</span>
          </a>

          {/* 2. WhatsApp Family */}
          <a
            href={`https://wa.me/${SON_PHONE}?text=${encodeURIComponent('🚨 तातडीने मदत हवी आहे (EMERGENCY)! मला त्वरित फोन कर.')}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleTriggerEmergency('WHATSAPP')}
            className="w-full p-4 sm:p-5 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-black text-xl sm:text-2xl flex items-center justify-between shadow-lg active:scale-97 transition-all border-2 border-green-500"
          >
            <div className="flex items-center gap-3">
              <MessageSquare className="w-7 h-7 shrink-0 text-green-200" />
              <div className="text-left">
                <span className="block">व्हॉट्सॲपवर SOS पाठवा</span>
                <span className="text-xs font-bold text-green-100 block">WhatsApp Emergency</span>
              </div>
            </div>
            <span className="text-sm font-black bg-green-800 px-3 py-1 rounded-xl">मेसेज</span>
          </a>

          {/* 3. Ambulance 108 */}
          <a
            href="tel:108"
            onClick={() => handleTriggerEmergency('AMBULANCE')}
            className="w-full p-4 bg-rose-50 hover:bg-rose-100 text-rose-950 rounded-2xl font-black text-lg sm:text-xl flex items-center justify-between border-2 border-rose-300 active:scale-97 transition-all"
          >
            <div className="flex items-center gap-3">
              <Siren className="w-6 h-6 text-rose-600 shrink-0" />
              <span>रुग्णवाहिका (Ambulance - 108)</span>
            </div>
            <span className="text-xs font-bold bg-rose-200 px-3 py-1 rounded-xl text-rose-900">कॉल</span>
          </a>

          {/* 4. Police 112 */}
          <a
            href="tel:112"
            onClick={() => handleTriggerEmergency('POLICE')}
            className="w-full p-4 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-2xl font-black text-lg sm:text-xl flex items-center justify-between border-2 border-slate-300 active:scale-97 transition-all"
          >
            <div className="flex items-center gap-3">
              <ShieldAlert className="w-6 h-6 text-slate-700 shrink-0" />
              <span>पोलीस मदत (Police - 112)</span>
            </div>
            <span className="text-xs font-bold bg-slate-300 px-3 py-1 rounded-xl text-slate-800">कॉल</span>
          </a>
        </div>

        {/* Dismiss Button */}
        <button
          type="button"
          onClick={onClose}
          className="w-full py-3.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-black rounded-2xl text-base active:scale-95 transition-all"
        >
          रद्द करा / मागे जा (Cancel)
        </button>
      </div>
    </div>
  );
};
