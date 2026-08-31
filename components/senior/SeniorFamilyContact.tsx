'use client';

import React, { useState } from 'react';
import { useSaathi } from '@/context/SaathiContext';
import { 
  ArrowLeft, 
  Phone, 
  MessageSquare, 
  ShieldAlert, 
  CheckCircle2, 
  Volume2, 
  User,
  Send,
  Sparkles
} from 'lucide-react';

interface SeniorFamilyContactProps {
  onBack: () => void;
}

export const SeniorFamilyContact: React.FC<SeniorFamilyContactProps> = ({ onBack }) => {
  const { senior, tSenior, createRequest, readAloud } = useSaathi();
  const [selectedPreset, setSelectedPreset] = useState<string>('मी ठीक आहे');

  const PRIYA_PHONE = '918591598630';
  const DISPLAY_PHONE = '+91 8591598630';

  const prefilledOptions = [
    { label: '✓ मी ठीक आहे (I\'m OK)', text: 'मी ठीक आहे. काळजी करू नकोस. (I am OK. Do not worry.)' },
    { label: '🆘 मला मदत हवी आहे (I Need Help)', text: 'मला तातडीने मदत हवी आहे. कृपया मला त्वरित फोन कर. (I need help immediately. Please call me.)' },
    { label: '📞 मला फोन करा (Please Call Me)', text: 'कृपया मला वेळ मिळाल्यावर फोन कर. (Please call me when you are free.)' },
    { label: '💊 औषध किंवा जेवण हवे (Need Medicine/Food)', text: 'मला औषध / जेवणासाठी मदत हवी आहे. (Need assistance with medicine/food.)' }
  ];

  const handleOpenWhatsApp = (customText?: string) => {
    const message = customText || selectedPreset;
    createRequest('FAMILY', 'APP');
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${PRIYA_PHONE}?text=${encoded}`, '_blank');
  };

  const handleReadScreen = () => {
    const text = `कुटुंबाशी संपर्क. प्रिया शर्मा, मुलगी. फोन करा किंवा व्हॉट्सॲप मेसेज पाठवा.`;
    readAloud(text);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6 pb-28">
      {/* Top Navigation */}
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-3.5 bg-slate-200 hover:bg-slate-300 text-slate-900 rounded-2xl font-black text-lg sm:text-xl flex items-center gap-2 active:scale-95 transition-all shadow-sm border-2 border-slate-300"
        >
          <ArrowLeft className="w-6 h-6" />
          <span>{tSenior('common.back')}</span>
        </button>

        <button
          type="button"
          onClick={handleReadScreen}
          className="p-3.5 bg-blue-100 hover:bg-blue-200 text-blue-950 rounded-2xl font-black text-sm sm:text-base flex items-center gap-2 active:scale-95 transition-all border-2 border-blue-300 shadow-sm"
        >
          <Volume2 className="w-5 h-5 text-blue-800" />
          <span>{tSenior('common.readAloud')}</span>
        </button>
      </div>

      {/* Screen Title */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border-3 border-slate-200 space-y-1">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          कुटुंबाशी संपर्क (Contact Family)
        </h1>
        <p className="text-base sm:text-lg text-slate-600 font-bold">
          तुमच्या काळजीवाहू व्यक्तीशी किंवा आपत्कालीन क्रमांकाशी थेट संपर्क साधा
        </p>
      </div>

      {/* Grid: Primary Caregiver vs Emergency Helplines */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Primary Caregiver Card (Priya) */}
        <section className="lg:col-span-7 bg-blue-50 border-4 border-blue-300 rounded-3xl p-6 sm:p-8 shadow-md space-y-6 flex flex-col justify-between">
          <div className="flex items-center gap-4">
            <div className="p-5 bg-blue-600 text-white rounded-3xl shrink-0 shadow-md text-3xl">
              👩‍💼
            </div>
            <div>
              <span className="text-xs sm:text-sm font-black uppercase text-blue-900 bg-blue-200 px-3.5 py-1 rounded-full">
                मुख्य काळजीवाहू • Primary Caregiver
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-1.5">
                Priya Sharma
              </h2>
              <p className="text-lg text-slate-600 font-bold">
                मुलगी (Daughter)
              </p>
              <p className="text-base text-blue-900 font-black mt-0.5">
                📞 {DISPLAY_PHONE}
              </p>
            </div>
          </div>

          {/* TWO MAIN ACTIONS: Direct Call & WhatsApp */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {/* 1. Direct Phone Call */}
            <a
              href={`tel:${DISPLAY_PHONE}`}
              className="p-5 sm:p-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-3xl font-black text-xl sm:text-2xl shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all border-4 border-emerald-400 text-center"
            >
              <Phone className="w-8 h-8 shrink-0" />
              <span>फोन करा<br /><span className="text-sm font-bold text-emerald-100">CALL PRIYA</span></span>
            </a>

            {/* 2. Direct WhatsApp Message */}
            <button
              type="button"
              onClick={() => handleOpenWhatsApp()}
              className="p-5 sm:p-6 bg-green-600 hover:bg-green-700 text-white rounded-3xl font-black text-xl sm:text-2xl shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all border-4 border-green-400 text-center"
            >
              <MessageSquare className="w-8 h-8 shrink-0 text-green-200" />
              <span>व्हॉट्सॲप<br /><span className="text-sm font-bold text-green-100">WHATSAPP</span></span>
            </button>
          </div>

          {/* Pre-filled WhatsApp message presets */}
          <div className="space-y-3 pt-3 border-t border-blue-200">
            <span className="text-xs font-black text-blue-900 uppercase tracking-wider block">
              💬 एका क्लिकवर संदेश निवडा (Quick Messages):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {prefilledOptions.map((opt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleOpenWhatsApp(opt.text)}
                  className="p-3 bg-white hover:bg-green-50 text-slate-900 border-2 border-blue-200 hover:border-green-400 rounded-2xl text-left text-xs sm:text-sm font-bold transition-all shadow-xs active:scale-97 flex items-center justify-between"
                >
                  <span>{opt.label}</span>
                  <Send className="w-4 h-4 text-green-600 shrink-0 ml-1" />
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Emergency Helplines Section */}
        <section className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 shadow-md border-3 border-slate-200 space-y-4">
          <h3 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <ShieldAlert className="w-7 h-7 text-red-600" />
            आपत्कालीन क्रमांक
          </h3>

          <div className="space-y-3">
            {/* Senior Helpline 14567 */}
            <a
              href="tel:14567"
              className="p-4 bg-amber-50 hover:bg-amber-100 border-3 border-amber-300 rounded-2xl flex items-center justify-between active:scale-98 transition-all"
            >
              <div>
                <span className="font-black text-lg text-slate-900 block">
                  ज्येष्ठ नागरिक हेल्पलाइन
                </span>
                <span className="text-sm text-amber-900 font-bold">
                  Elderline: 14567
                </span>
              </div>
              <span className="px-4 py-2 bg-amber-600 text-white rounded-xl font-black text-sm">
                कॉल करा
              </span>
            </a>

            {/* Ambulance 108 */}
            <a
              href="tel:108"
              className="p-4 bg-red-50 hover:bg-red-100 border-3 border-red-300 rounded-2xl flex items-center justify-between active:scale-98 transition-all"
            >
              <div>
                <span className="font-black text-lg text-slate-900 block">
                  रुग्णवाहिका (Ambulance)
                </span>
                <span className="text-sm text-red-900 font-bold">
                  Emergency: 108
                </span>
              </div>
              <span className="px-4 py-2 bg-red-600 text-white rounded-xl font-black text-sm">
                कॉल करा
              </span>
            </a>

            {/* Police 112 */}
            <a
              href="tel:112"
              className="p-4 bg-slate-50 hover:bg-slate-100 border-3 border-slate-300 rounded-2xl flex items-center justify-between active:scale-98 transition-all"
            >
              <div>
                <span className="font-black text-lg text-slate-900 block">
                  पोलीस मदत (Police)
                </span>
                <span className="text-sm text-slate-700 font-bold">
                  National: 112
                </span>
              </div>
              <span className="px-4 py-2 bg-slate-800 text-white rounded-xl font-black text-sm">
                कॉल करा
              </span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};
