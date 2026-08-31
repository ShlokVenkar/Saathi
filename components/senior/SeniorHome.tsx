'use client';

import React, { useState } from 'react';
import { useSaathi } from '@/context/SaathiContext';
import { 
  AlertTriangle, 
  MapPin, 
  CheckCircle2, 
  Volume2, 
  Activity,
  Sparkles,
  X,
  ArrowRight,
  ShieldAlert,
  Users,
  FileText
} from 'lucide-react';
import { SosModal } from './SosModal';
import { Language, RequestItem, RequestType } from '@/types';
import { LANGUAGE_NAMES } from '@/lib/i18n';
import { requestService } from '@/services/requestService';

interface SeniorHomeProps {
  onNavigate: (view: 'checkin' | 'family' | 'services' | 'explainer' | 'requests') => void;
}

export const SeniorHome: React.FC<SeniorHomeProps> = ({ onNavigate }) => {
  const { 
    senior, 
    seniorLang, 
    setSeniorLanguage, 
    tSenior, 
    createRequest, 
    readAloud,
    checkIn,
    device
  } = useSaathi();

  const [isSosOpen, setIsSosOpen] = useState(false);
  const [activeConfirmationReq, setActiveConfirmationReq] = useState<RequestItem | null>(null);

  // Time-of-day greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return tSenior('seniorHome.greetingMorning');
    if (hour < 17) return tSenior('seniorHome.greetingAfternoon');
    if (hour < 21) return tSenior('seniorHome.greetingEvening');
    return tSenior('seniorHome.greetingNight');
  };

  const handleQuickRequest = (type: RequestType) => {
    const req = createRequest(type, 'APP');
    setActiveConfirmationReq(req);
    const label = tSenior(`requests.${type}`);
    const toastMsg = `${label}. ${tSenior('requests.requestSentToast')}`;
    readAloud(toastMsg);
  };

  const handleCancelAccidental = (requestId: string) => {
    requestService.cancelRequest(requestId);
    setActiveConfirmationReq(null);
    readAloud(tSenior('requests.statusCancelled'));
  };

  const handleReadScreen = () => {
    const greeting = `${getGreeting()}, ${senior.name.split(' ')[0]}. ${senior.locationName}. ${tSenior('seniorHome.quickRequestsTitle')}`;
    readAloud(greeting);
  };

  const isCheckInCompleted = checkIn.status === 'COMPLETED';

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      {/* ================= MOBILE-FIRST TOP APP BAR (Visible on Mobile & Tablet) ================= */}
      <div className="lg:hidden sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b-2 border-slate-200 px-3 py-2.5 shadow-sm">
        <div className="max-w-xl mx-auto flex items-center justify-between gap-2">
          {/* Logo */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-xl font-black text-blue-950 tracking-tight">SAATHI</span>
            <span className="text-xs">🤝</span>
          </div>

          {/* Right Actions: Speaker + Language Selector */}
          <div className="flex items-center gap-1.5">
            {/* Audio Listen */}
            <button
              type="button"
              onClick={handleReadScreen}
              className="px-2.5 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-950 rounded-xl flex items-center gap-1 font-black text-xs border border-blue-300 active:scale-95 transition-all shadow-xs"
              aria-label="Read Screen Aloud"
            >
              <Volume2 className="w-4 h-4 text-blue-800 shrink-0" />
              <span>{tSenior('common.readAloud')}</span>
            </button>

            {/* Language Selector Pills */}
            <div className="flex bg-slate-100 p-0.5 rounded-xl border border-slate-300">
              {(['mr', 'hi', 'en'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setSeniorLanguage(lang)}
                  className={`px-2 py-1 rounded-lg text-xs font-black transition-all ${
                    seniorLang === lang
                      ? 'bg-blue-900 text-white shadow-xs'
                      : 'text-slate-700'
                  }`}
                >
                  {LANGUAGE_NAMES[lang].native}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-6 space-y-5 sm:space-y-6 pb-28">
        
        {/* Accidental Tap Confirmation Toast / Modal */}
        {activeConfirmationReq && (
          <div className="bg-emerald-600 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl border-3 border-emerald-400 space-y-3 animate-scale-up max-w-2xl mx-auto">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-700 rounded-xl text-emerald-100 shrink-0">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black">
                    {tSenior(`requests.${activeConfirmationReq.type}`)}
                  </h3>
                  <p className="text-sm sm:text-base text-emerald-100 font-bold">
                    {tSenior('requests.requestSentToast')}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveConfirmationReq(null)}
                className="p-1.5 text-emerald-200 hover:text-white rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-emerald-500 gap-2">
              <button
                type="button"
                onClick={() => handleCancelAccidental(activeConfirmationReq.id)}
                className="px-3.5 py-2 bg-emerald-800 hover:bg-emerald-900 text-emerald-100 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 border border-emerald-400 active:scale-95"
              >
                <X className="w-4 h-4 text-rose-300" />
                <span>{tSenior('requests.cancelAccidental')}</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveConfirmationReq(null)}
                className="px-4 py-2 bg-white text-emerald-950 rounded-xl font-black text-xs sm:text-sm shadow active:scale-95"
              >
                {tSenior('common.close')}
              </button>
            </div>
          </div>
        )}

        {/* RESPONSIVE GRID: Desktop (lg+) 2-Column vs Mobile 1-Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start">
          
          {/* ================= DESKTOP SIDEBAR HERO (Hidden on Mobile, shown on lg+) ================= */}
          <div className="hidden lg:block lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-7 shadow-lg border-3 border-slate-200 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-3xl font-black text-blue-950 tracking-tight block">
                    {tSenior('seniorHome.title')}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                    {tSenior('seniorHome.subtitle')}
                  </span>
                </div>
                <span className="text-3xl">🤝</span>
              </div>

              {/* Greeting & Name */}
              <div className="space-y-1">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                  {getGreeting()}, <br />
                  <span className="text-blue-900">{senior.name.split(' ')[0]}</span>
                </h1>
                <p className="text-base text-slate-600 font-bold flex items-center gap-1.5 pt-1">
                  <MapPin className="w-5 h-5 text-slate-400 shrink-0" />
                  <span>{senior.locationName}</span>
                </p>
              </div>

              {/* Read Aloud Voice Button */}
              <button
                type="button"
                onClick={handleReadScreen}
                className="w-full p-4 bg-blue-100 hover:bg-blue-200 text-blue-950 rounded-2xl flex items-center justify-center gap-3 border-2 border-blue-300 font-black active:scale-95 transition-all text-lg shadow-sm"
              >
                <Volume2 className="w-7 h-7 text-blue-800 shrink-0" />
                <span>{tSenior('common.readAloud')}</span>
              </button>

              {/* Language Selector */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  भाषा निवडा (Select Language)
                </span>
                <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1.5 rounded-2xl border-2 border-slate-300">
                  {(['mr', 'hi', 'en'] as Language[]).map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => setSeniorLanguage(lang)}
                      className={`py-2.5 rounded-xl text-base font-black transition-all text-center ${
                        seniorLang === lang
                          ? 'bg-blue-900 text-white shadow-md'
                          : 'text-slate-700 hover:text-slate-950'
                      }`}
                    >
                      {LANGUAGE_NAMES[lang].native}
                    </button>
                  ))}
                </div>
              </div>

              {/* Hardware Status */}
              <div className="space-y-2 pt-2 border-t border-slate-100 text-sm">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-600">साथी डिव्हाइस (ESP32):</span>
                  <span className="font-black text-emerald-700 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                    🟢 जोडले आहे
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ================= MOBILE GREETING CARD (Shown on mobile only) ================= */}
          <div className="lg:hidden bg-white rounded-2xl p-4 shadow-sm border-2 border-slate-200 flex items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">
                {getGreeting()}, <span className="text-blue-900">{senior.name.split(' ')[0]}</span>
              </h1>
              <p className="text-xs text-slate-600 font-bold flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{senior.locationName}</span>
              </p>
            </div>
            {isCheckInCompleted && (
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-black shrink-0 border border-emerald-300">
                ✓ Check-in पूर्ण
              </span>
            )}
          </div>

          {/* ================= RIGHT MAIN ACTION AREA ================= */}
          <div className="lg:col-span-8 space-y-5 sm:space-y-6">
            
            {/* 🚨 HUGE RED EMERGENCY BUTTON (100% Mobile Safe) */}
            <section aria-label="Emergency SOS Action">
              <button
                type="button"
                onClick={() => setIsSosOpen(true)}
                className="w-full bg-red-600 hover:bg-red-700 active:scale-98 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-xl border-4 border-red-500 flex items-center justify-between gap-3 transition-all duration-200 group text-left"
                id="senior-sos-button"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="p-3 sm:p-4 bg-red-700 rounded-xl sm:rounded-2xl group-hover:scale-105 transition-transform shrink-0 border-2 border-red-400">
                    <AlertTriangle className="w-9 h-9 sm:w-12 sm:h-12 text-white animate-pulse" />
                  </div>
                  <div>
                    <span className="block text-xl sm:text-3xl font-black tracking-tight leading-tight">
                      {tSenior('seniorHome.sosButton')}
                    </span>
                    <span className="text-red-100 text-xs sm:text-base font-bold block mt-0.5 sm:mt-1">
                      {tSenior('seniorHome.sosSubtitle')}
                    </span>
                  </div>
                </div>
              </button>
            </section>

            {/* MAIN SENIOR ACTIONS (Hungry, Thirsty, Medicine, Pain, Family) */}
            <section className="space-y-3 sm:space-y-4" aria-label="Direct Assistance Requests">
              <div className="flex items-center justify-between px-1">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500 shrink-0" />
                  <span>{tSenior('seniorHome.quickRequestsTitle')}</span>
                </h2>
              </div>

              {/* Grid: 1-column thumb-friendly cards on Mobile, 2/3-cols on Desktop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {/* 1. Hungry */}
                <button
                  type="button"
                  onClick={() => handleQuickRequest('HUNGRY')}
                  className="p-4 sm:p-5 bg-amber-50 hover:bg-amber-100 border-3 border-amber-300 rounded-2xl sm:rounded-3xl text-left active:scale-97 transition-all shadow-sm flex items-center gap-3.5 group"
                >
                  <div className="p-3 bg-amber-200 text-amber-950 rounded-2xl text-3xl sm:text-4xl shrink-0 group-hover:scale-110 transition-transform">
                    🍛
                  </div>
                  <div>
                    <span className="text-xl sm:text-2xl font-black text-amber-950 block leading-tight">
                      {tSenior('requests.HUNGRY')}
                    </span>
                    <span className="text-xs sm:text-sm text-amber-900 font-bold block mt-0.5">
                      {tSenior('requests.HUNGRY_desc')}
                    </span>
                  </div>
                </button>

                {/* 2. Thirsty */}
                <button
                  type="button"
                  onClick={() => handleQuickRequest('THIRSTY')}
                  className="p-4 sm:p-5 bg-cyan-50 hover:bg-cyan-100 border-3 border-cyan-300 rounded-2xl sm:rounded-3xl text-left active:scale-97 transition-all shadow-sm flex items-center gap-3.5 group"
                >
                  <div className="p-3 bg-cyan-200 text-cyan-950 rounded-2xl text-3xl sm:text-4xl shrink-0 group-hover:scale-110 transition-transform">
                    💧
                  </div>
                  <div>
                    <span className="text-xl sm:text-2xl font-black text-cyan-950 block leading-tight">
                      {tSenior('requests.THIRSTY')}
                    </span>
                    <span className="text-xs sm:text-sm text-cyan-900 font-bold block mt-0.5">
                      {tSenior('requests.THIRSTY_desc')}
                    </span>
                  </div>
                </button>

                {/* 3. Medicine */}
                <button
                  type="button"
                  onClick={() => handleQuickRequest('MEDICINE')}
                  className="p-4 sm:p-5 bg-rose-50 hover:bg-rose-100 border-3 border-rose-300 rounded-2xl sm:rounded-3xl text-left active:scale-97 transition-all shadow-sm flex items-center gap-3.5 group"
                >
                  <div className="p-3 bg-rose-200 text-rose-950 rounded-2xl text-3xl sm:text-4xl shrink-0 group-hover:scale-110 transition-transform">
                    💊
                  </div>
                  <div>
                    <span className="text-xl sm:text-2xl font-black text-rose-950 block leading-tight">
                      {tSenior('requests.MEDICINE')}
                    </span>
                    <span className="text-xs sm:text-sm text-rose-900 font-bold block mt-0.5">
                      {tSenior('requests.MEDICINE_desc')}
                    </span>
                  </div>
                </button>

                {/* 4. Pain */}
                <button
                  type="button"
                  onClick={() => handleQuickRequest('PAIN')}
                  className="p-4 sm:p-5 bg-orange-50 hover:bg-orange-100 border-3 border-orange-300 rounded-2xl sm:rounded-3xl text-left active:scale-97 transition-all shadow-sm flex items-center gap-3.5 group"
                >
                  <div className="p-3 bg-orange-200 text-orange-950 rounded-2xl text-3xl sm:text-4xl shrink-0 group-hover:scale-110 transition-transform">
                    🩹
                  </div>
                  <div>
                    <span className="text-xl sm:text-2xl font-black text-orange-950 block leading-tight">
                      {tSenior('requests.PAIN')}
                    </span>
                    <span className="text-xs sm:text-sm text-orange-900 font-bold block mt-0.5">
                      {tSenior('requests.PAIN_desc')}
                    </span>
                  </div>
                </button>

                {/* 5. Family Call */}
                <button
                  type="button"
                  onClick={() => handleQuickRequest('FAMILY')}
                  className="p-4 sm:p-5 bg-emerald-50 hover:bg-emerald-100 border-3 border-emerald-300 rounded-2xl sm:rounded-3xl text-left active:scale-97 transition-all shadow-sm flex items-center gap-3.5 group sm:col-span-2 lg:col-span-2"
                >
                  <div className="p-3 bg-emerald-200 text-emerald-950 rounded-2xl text-3xl sm:text-4xl shrink-0 group-hover:scale-110 transition-transform">
                    👨‍👩‍👧
                  </div>
                  <div>
                    <span className="text-xl sm:text-2xl font-black text-emerald-950 block leading-tight">
                      {tSenior('requests.FAMILY')}
                    </span>
                    <span className="text-xs sm:text-sm text-emerald-900 font-bold block mt-0.5">
                      {tSenior('requests.FAMILY_desc')}
                    </span>
                  </div>
                </button>
              </div>
            </section>

            {/* MORE OPTIONS / FEATURE MODULES */}
            <section className="space-y-3 sm:space-y-4 pt-1" aria-label="Main Sections">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 px-1">
                इतर सेवा (More Options)
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {/* Daily Check-In Card */}
                <button
                  type="button"
                  onClick={() => onNavigate('checkin')}
                  className={`p-4 sm:p-5 rounded-2xl sm:rounded-3xl border-3 text-left active:scale-98 transition-all shadow-sm flex items-center justify-between ${
                    isCheckInCompleted
                      ? 'bg-emerald-50 border-emerald-400'
                      : 'bg-emerald-700 hover:bg-emerald-800 text-white border-emerald-500'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${isCheckInCompleted ? 'bg-emerald-200 text-emerald-900' : 'bg-white/20 text-white'}`}>
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <div>
                      <span className={`text-xl sm:text-2xl font-black block leading-tight ${isCheckInCompleted ? 'text-emerald-950' : 'text-white'}`}>
                        {tSenior('seniorHome.cardCheckIn')}
                      </span>
                      <span className={`text-xs sm:text-sm font-bold block mt-0.5 ${isCheckInCompleted ? 'text-emerald-800' : 'text-emerald-100'}`}>
                        {isCheckInCompleted ? '✓ आजचा Check-in पूर्ण' : tSenior('seniorHome.cardCheckInDesc')}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className={`w-6 h-6 ${isCheckInCompleted ? 'text-emerald-700' : 'text-white'}`} />
                </button>

                {/* Contact Family Card */}
                <button
                  type="button"
                  onClick={() => onNavigate('family')}
                  className="p-4 sm:p-5 bg-white hover:bg-slate-50 rounded-2xl sm:rounded-3xl border-3 border-blue-300 flex items-center justify-between text-left active:scale-98 transition-all shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-100 text-blue-900 rounded-xl">
                      <Users className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="text-xl sm:text-2xl font-black text-slate-900 block leading-tight">
                        {tSenior('seniorHome.cardFamily')}
                      </span>
                      <span className="text-xs sm:text-sm text-slate-600 font-bold block mt-0.5">
                        {tSenior('seniorHome.cardFamilyDesc')}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-6 h-6 text-blue-700" />
                </button>

                {/* Explain Document Card */}
                <button
                  type="button"
                  onClick={() => onNavigate('explainer')}
                  className="p-4 sm:p-5 bg-white hover:bg-slate-50 rounded-2xl sm:rounded-3xl border-3 border-purple-300 flex items-center justify-between text-left active:scale-98 transition-all shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-purple-100 text-purple-900 rounded-xl">
                      <FileText className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="text-xl sm:text-2xl font-black text-slate-900 block leading-tight">
                        {tSenior('seniorHome.cardExplainDoc')}
                      </span>
                      <span className="text-xs sm:text-sm text-slate-600 font-bold block mt-0.5">
                        {tSenior('seniorHome.cardExplainDocDesc')}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-6 h-6 text-purple-700" />
                </button>

                {/* Nearby Help Card */}
                <button
                  type="button"
                  onClick={() => onNavigate('services')}
                  className="p-4 sm:p-5 bg-white hover:bg-slate-50 rounded-2xl sm:rounded-3xl border-3 border-cyan-300 flex items-center justify-between text-left active:scale-98 transition-all shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-cyan-100 text-cyan-900 rounded-xl">
                      <MapPin className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="text-xl sm:text-2xl font-black text-slate-900 block leading-tight">
                        {tSenior('seniorHome.cardServices')}
                      </span>
                      <span className="text-xs sm:text-sm text-slate-600 font-bold block mt-0.5">
                        {tSenior('seniorHome.cardServicesDesc')}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-6 h-6 text-cyan-700" />
                </button>

                {/* My Requests Status Card */}
                <button
                  type="button"
                  onClick={() => onNavigate('requests')}
                  className="p-4 sm:p-5 bg-white hover:bg-slate-50 rounded-2xl sm:rounded-3xl border-3 border-slate-300 flex items-center justify-between text-left active:scale-98 transition-all shadow-sm sm:col-span-2"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-slate-100 text-slate-900 rounded-xl">
                      <Activity className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="text-xl sm:text-2xl font-black text-slate-900 block leading-tight">
                        {tSenior('seniorHome.cardRequests')}
                      </span>
                      <span className="text-xs sm:text-sm text-slate-600 font-bold block mt-0.5">
                        {tSenior('seniorHome.cardRequestsDesc')}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-6 h-6 text-slate-700" />
                </button>
              </div>
            </section>
          </div>
        </div>

        {/* SOS Modal */}
        <SosModal isOpen={isSosOpen} onClose={() => setIsSosOpen(false)} />
      </div>
    </div>
  );
};
