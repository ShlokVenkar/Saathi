'use client';

import React, { useState } from 'react';
import { useSaathi } from '@/context/SaathiContext';
import { 
  AlertTriangle, 
  Utensils, 
  CupSoda, 
  Pill, 
  Footprints, 
  HeartHandshake, 
  Users, 
  FileText, 
  MapPin, 
  CheckCircle2, 
  Cpu, 
  Volume2, 
  PhoneCall, 
  Activity,
  Sparkles,
  Languages
} from 'lucide-react';
import { SosModal } from './SosModal';
import { CheckInModal } from './CheckInModal';
import { SeniorRequestsModal } from './SeniorRequestsModal';
import { SeniorDeviceModal } from './SeniorDeviceModal';
import { Language, RequestType } from '@/types';
import { LANGUAGE_NAMES } from '@/lib/i18n';

interface SeniorHomeProps {
  onNavigateTab?: (tab: 'services' | 'explainer') => void;
}

export const SeniorHome: React.FC<SeniorHomeProps> = ({ onNavigateTab }) => {
  const { 
    senior, 
    seniorLang, 
    setSeniorLanguage, 
    tSenior, 
    createRequest, 
    readAloud,
    checkIn
  } = useSaathi();

  const [isSosOpen, setIsSosOpen] = useState(false);
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [isRequestsOpen, setIsRequestsOpen] = useState(false);
  const [isDeviceOpen, setIsDeviceOpen] = useState(false);
  const [lastActionToast, setLastActionToast] = useState<string | null>(null);

  // Time-of-day greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return tSenior('seniorHome.greetingMorning');
    if (hour < 17) return tSenior('seniorHome.greetingAfternoon');
    if (hour < 21) return tSenior('seniorHome.greetingEvening');
    return tSenior('seniorHome.greetingNight');
  };

  const handleQuickRequest = (type: RequestType) => {
    createRequest(type, 'APP');
    const label = tSenior(`requests.${type}`);
    const toastMsg = `${label} (${tSenior('requests.requestSentSuccess')})`;
    setLastActionToast(toastMsg);
    readAloud(toastMsg);

    setTimeout(() => {
      setLastActionToast(null);
    }, 4000);
  };

  const handleReadScreen = () => {
    const greeting = `${getGreeting()}, ${senior.name}. ${tSenior('seniorHome.quickRequestsTitle')}`;
    readAloud(greeting);
  };

  const isCheckInCompleted = checkIn.status === 'COMPLETED';

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 sm:py-6 space-y-6 pb-28">
      {/* Top Header with Senior Greeting & Language Switcher */}
      <header className="bg-white rounded-3xl p-5 sm:p-6 shadow-md border-2 border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-black uppercase tracking-wider text-blue-900 bg-blue-100 px-3 py-1 rounded-full">
              {tSenior('common.appName')}
            </span>
            {isCheckInCompleted && (
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {tSenior('checkin.familyStatusCompleted')}
              </span>
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {getGreeting()}, <span className="text-blue-900">{senior.name.split(' ')[0]}</span>
          </h1>
          <p className="text-base text-slate-600 font-medium">{senior.locationName}</p>
        </div>

        {/* Action Pills: Speech & Language */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          {/* Read Aloud Button */}
          <button
            type="button"
            onClick={handleReadScreen}
            className="p-3 bg-blue-50 text-blue-900 hover:bg-blue-100 rounded-2xl flex items-center gap-2 border border-blue-200 font-bold active:scale-95 transition-all text-sm"
            aria-label="Read Screen Aloud"
            title="Read screen text aloud"
          >
            <Volume2 className="w-5 h-5 text-blue-700" />
            <span>{tSenior('common.readAloud')}</span>
          </button>

          {/* Language Selector for Senior */}
          <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200">
            {(['mr', 'hi', 'en'] as Language[]).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setSeniorLanguage(lang)}
                className={`px-3 py-2 rounded-xl text-sm font-black transition-all ${
                  seniorLang === lang
                    ? 'bg-blue-900 text-white shadow-md'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                {LANGUAGE_NAMES[lang].native}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Action Toast Notification */}
      {lastActionToast && (
        <div className="p-4 bg-emerald-600 text-white font-black text-lg sm:text-xl rounded-2xl shadow-xl flex items-center gap-3 animate-bounce border-2 border-emerald-400">
          <CheckCircle2 className="w-7 h-7 text-emerald-200 shrink-0" />
          <span>{lastActionToast}</span>
        </div>
      )}

      {/* MOST IMPORTANT: BIG RED SOS BUTTON */}
      <section aria-label="Emergency SOS Action">
        <button
          type="button"
          onClick={() => setIsSosOpen(true)}
          className="w-full bg-red-600 hover:bg-red-700 active:scale-98 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-red-500 flex items-center justify-between gap-4 transition-all duration-200 group focus:outline-none focus:ring-4 focus:ring-red-400"
          id="senior-sos-button"
        >
          <div className="flex items-center gap-4 text-left">
            <div className="p-4 bg-red-700/80 rounded-2xl group-hover:scale-110 transition-transform shrink-0 border-2 border-red-400">
              <AlertTriangle className="w-10 h-10 sm:w-12 sm:h-12 text-white animate-pulse" />
            </div>
            <div>
              <span className="block text-2xl sm:text-4xl font-black tracking-tight drop-shadow-sm">
                {tSenior('seniorHome.sosButton')}
              </span>
              <span className="text-red-100 text-base sm:text-lg font-bold block mt-1">
                {tSenior('seniorHome.sosSubtitle')}
              </span>
            </div>
          </div>
          <span className="hidden sm:inline-block px-4 py-2 bg-red-800 rounded-2xl text-red-100 font-black text-lg shrink-0">
            EMERGENCY
          </span>
        </button>
      </section>

      {/* QUICK ASSISTANCE CARDS (Hungry, Thirsty, Medicine, Washroom, Pain, Family) */}
      <section className="space-y-3" aria-label="Quick Needs">
        <h2 className="text-xl sm:text-2xl font-black text-slate-800 px-1 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-amber-500" />
          {tSenior('seniorHome.quickRequestsTitle')}
        </h2>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {/* Hungry */}
          <button
            type="button"
            onClick={() => handleQuickRequest('HUNGRY')}
            className="p-5 sm:p-6 bg-amber-50 hover:bg-amber-100 border-3 border-amber-300 rounded-3xl text-left active:scale-95 transition-all shadow-md flex flex-col justify-between min-h-[140px] group"
          >
            <div className="p-3 bg-amber-200 rounded-2xl w-fit text-amber-900 group-hover:scale-110 transition-transform">
              <Utensils className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black text-amber-950 block">
                {tSenior('requests.HUNGRY')}
              </span>
              <span className="text-xs sm:text-sm text-amber-800 font-bold block mt-0.5">
                {tSenior('requests.HUNGRY_desc')}
              </span>
            </div>
          </button>

          {/* Thirsty */}
          <button
            type="button"
            onClick={() => handleQuickRequest('THIRSTY')}
            className="p-5 sm:p-6 bg-cyan-50 hover:bg-cyan-100 border-3 border-cyan-300 rounded-3xl text-left active:scale-95 transition-all shadow-md flex flex-col justify-between min-h-[140px] group"
          >
            <div className="p-3 bg-cyan-200 rounded-2xl w-fit text-cyan-900 group-hover:scale-110 transition-transform">
              <CupSoda className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black text-cyan-950 block">
                {tSenior('requests.THIRSTY')}
              </span>
              <span className="text-xs sm:text-sm text-cyan-800 font-bold block mt-0.5">
                {tSenior('requests.THIRSTY_desc')}
              </span>
            </div>
          </button>

          {/* Medicine */}
          <button
            type="button"
            onClick={() => handleQuickRequest('MEDICINE')}
            className="p-5 sm:p-6 bg-rose-50 hover:bg-rose-100 border-3 border-rose-300 rounded-3xl text-left active:scale-95 transition-all shadow-md flex flex-col justify-between min-h-[140px] group"
          >
            <div className="p-3 bg-rose-200 rounded-2xl w-fit text-rose-900 group-hover:scale-110 transition-transform">
              <Pill className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black text-rose-950 block">
                {tSenior('requests.MEDICINE')}
              </span>
              <span className="text-xs sm:text-sm text-rose-800 font-bold block mt-0.5">
                {tSenior('requests.MEDICINE_desc')}
              </span>
            </div>
          </button>

          {/* Toilet */}
          <button
            type="button"
            onClick={() => handleQuickRequest('TOILET')}
            className="p-5 sm:p-6 bg-indigo-50 hover:bg-indigo-100 border-3 border-indigo-300 rounded-3xl text-left active:scale-95 transition-all shadow-md flex flex-col justify-between min-h-[140px] group"
          >
            <div className="p-3 bg-indigo-200 rounded-2xl w-fit text-indigo-900 group-hover:scale-110 transition-transform">
              <Footprints className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black text-indigo-950 block">
                {tSenior('requests.TOILET')}
              </span>
              <span className="text-xs sm:text-sm text-indigo-800 font-bold block mt-0.5">
                {tSenior('requests.TOILET_desc')}
              </span>
            </div>
          </button>

          {/* Pain */}
          <button
            type="button"
            onClick={() => handleQuickRequest('PAIN')}
            className="p-5 sm:p-6 bg-orange-50 hover:bg-orange-100 border-3 border-orange-300 rounded-3xl text-left active:scale-95 transition-all shadow-md flex flex-col justify-between min-h-[140px] group"
          >
            <div className="p-3 bg-orange-200 rounded-2xl w-fit text-orange-900 group-hover:scale-110 transition-transform">
              <HeartHandshake className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black text-orange-950 block">
                {tSenior('requests.PAIN')}
              </span>
              <span className="text-xs sm:text-sm text-orange-800 font-bold block mt-0.5">
                {tSenior('requests.PAIN_desc')}
              </span>
            </div>
          </button>

          {/* Need Family Call */}
          <button
            type="button"
            onClick={() => handleQuickRequest('FAMILY')}
            className="p-5 sm:p-6 bg-emerald-50 hover:bg-emerald-100 border-3 border-emerald-300 rounded-3xl text-left active:scale-95 transition-all shadow-md flex flex-col justify-between min-h-[140px] group"
          >
            <div className="p-3 bg-emerald-200 rounded-2xl w-fit text-emerald-900 group-hover:scale-110 transition-transform">
              <Users className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black text-emerald-950 block">
                {tSenior('requests.FAMILY')}
              </span>
              <span className="text-xs sm:text-sm text-emerald-800 font-bold block mt-0.5">
                {tSenior('requests.FAMILY_desc')}
              </span>
            </div>
          </button>
        </div>
      </section>

      {/* CORE FEATURE CARDS */}
      <section className="grid gap-3 sm:gap-4" aria-label="Main Features">
        {/* Daily Check-In Card */}
        <button
          type="button"
          onClick={() => setIsCheckInOpen(true)}
          className={`w-full p-6 rounded-3xl border-3 flex items-center justify-between text-left active:scale-98 transition-all shadow-md ${
            isCheckInCompleted
              ? 'bg-emerald-50 border-emerald-400'
              : 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white border-emerald-500'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className={`p-4 rounded-2xl ${isCheckInCompleted ? 'bg-emerald-200 text-emerald-900' : 'bg-white/20 text-white'}`}>
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <div>
              <span className={`text-2xl sm:text-3xl font-black block ${isCheckInCompleted ? 'text-emerald-950' : 'text-white'}`}>
                {tSenior('seniorHome.cardCheckIn')}
              </span>
              <span className={`text-sm sm:text-base font-bold block mt-0.5 ${isCheckInCompleted ? 'text-emerald-800' : 'text-emerald-100'}`}>
                {isCheckInCompleted 
                  ? `${tSenior('checkin.completedTitle')} (${checkIn.note || '✓ Safe'})`
                  : tSenior('seniorHome.cardCheckInDesc')}
              </span>
            </div>
          </div>
          <span className={`px-4 py-2 rounded-2xl text-sm font-black shrink-0 ${
            isCheckInCompleted ? 'bg-emerald-200 text-emerald-900' : 'bg-white text-emerald-800'
          }`}>
            {isCheckInCompleted ? 'DONE' : 'CHECK IN'}
          </span>
        </button>

        {/* Explain Document Card */}
        <button
          type="button"
          onClick={() => onNavigateTab?.('explainer')}
          className="w-full p-6 bg-white hover:bg-slate-50 rounded-3xl border-3 border-purple-200 hover:border-purple-300 flex items-center justify-between text-left active:scale-98 transition-all shadow-md group"
        >
          <div className="flex items-center gap-4">
            <div className="p-4 bg-purple-100 text-purple-800 rounded-2xl group-hover:scale-105 transition-transform">
              <FileText className="w-9 h-9" />
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-slate-900 block">
                {tSenior('seniorHome.cardExplainDoc')}
              </span>
              <span className="text-sm sm:text-base text-slate-600 font-medium block mt-0.5">
                {tSenior('seniorHome.cardExplainDocDesc')}
              </span>
            </div>
          </div>
          <span className="p-3 bg-purple-50 text-purple-700 rounded-2xl font-black text-sm">
            AI
          </span>
        </button>

        {/* Nearby Services Card */}
        <button
          type="button"
          onClick={() => onNavigateTab?.('services')}
          className="w-full p-6 bg-white hover:bg-slate-50 rounded-3xl border-3 border-blue-200 hover:border-blue-300 flex items-center justify-between text-left active:scale-98 transition-all shadow-md group"
        >
          <div className="flex items-center gap-4">
            <div className="p-4 bg-blue-100 text-blue-800 rounded-2xl group-hover:scale-105 transition-transform">
              <MapPin className="w-9 h-9" />
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-slate-900 block">
                {tSenior('seniorHome.cardServices')}
              </span>
              <span className="text-sm sm:text-base text-slate-600 font-medium block mt-0.5">
                {tSenior('seniorHome.cardServicesDesc')}
              </span>
            </div>
          </div>
          <span className="p-3 bg-blue-50 text-blue-700 rounded-2xl font-black text-sm">
            GPS
          </span>
        </button>

        {/* Quick Row: My Requests & Device Status */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {/* Requests Status */}
          <button
            type="button"
            onClick={() => setIsRequestsOpen(true)}
            className="p-5 bg-white hover:bg-slate-50 border-3 border-slate-200 rounded-3xl text-left active:scale-95 transition-all shadow-md flex items-center gap-3"
          >
            <div className="p-3 bg-slate-100 text-slate-800 rounded-2xl shrink-0">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-black text-slate-900 block">
                {tSenior('seniorHome.cardRequests')}
              </span>
              <span className="text-xs text-slate-500 font-bold">
                View status
              </span>
            </div>
          </button>

          {/* SAATHI Device Status */}
          <button
            type="button"
            onClick={() => setIsDeviceOpen(true)}
            className="p-5 bg-white hover:bg-slate-50 border-3 border-purple-200 rounded-3xl text-left active:scale-95 transition-all shadow-md flex items-center gap-3"
          >
            <div className="p-3 bg-purple-100 text-purple-800 rounded-2xl shrink-0">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-black text-slate-900 block">
                {tSenior('seniorHome.cardDevice')}
              </span>
              <span className="text-xs text-purple-700 font-bold">
                🟢 Active
              </span>
            </div>
          </button>
        </div>
      </section>

      {/* Modals */}
      <SosModal isOpen={isSosOpen} onClose={() => setIsSosOpen(false)} />
      <CheckInModal isOpen={isCheckInOpen} onClose={() => setIsCheckInOpen(false)} />
      <SeniorRequestsModal isOpen={isRequestsOpen} onClose={() => setIsRequestsOpen(false)} />
      <SeniorDeviceModal isOpen={isDeviceOpen} onClose={() => setIsDeviceOpen(false)} />
    </div>
  );
};
