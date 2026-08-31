'use client';

import React, { useState } from 'react';
import { useSaathi } from '@/context/SaathiContext';
import { 
  AlertTriangle, 
  Utensils, 
  CupSoda, 
  Pill, 
  HeartHandshake, 
  Users, 
  FileText, 
  MapPin, 
  CheckCircle2, 
  Volume2, 
  Activity,
  Sparkles,
  X,
  ArrowRight,
  ShieldAlert
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
    checkIn
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
    <div className="max-w-2xl mx-auto px-4 py-4 sm:py-6 space-y-6 pb-28">
      {/* Top Header: Brand, Greeting, Language Selector, and Speaker */}
      <header className="bg-white rounded-3xl p-5 sm:p-7 shadow-md border-3 border-slate-200 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl sm:text-3xl font-black text-blue-950 tracking-tight block">
              {tSenior('seniorHome.title')}
            </span>
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-700">
              {tSenior('seniorHome.subtitle')}
            </span>
          </div>

          {/* Large Speaker / "ऐका" Button */}
          <button
            type="button"
            onClick={handleReadScreen}
            className="px-4 py-3 bg-blue-100 hover:bg-blue-200 text-blue-950 rounded-2xl flex items-center gap-2 border-2 border-blue-300 font-black active:scale-95 transition-all text-base shadow-sm"
            aria-label="Read Screen Aloud"
          >
            <Volume2 className="w-6 h-6 text-blue-800" />
            <span>{tSenior('common.readAloud')}</span>
          </button>
        </div>

        {/* Greeting & Location */}
        <div className="pt-1 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {getGreeting()}, <span className="text-blue-900">{senior.name.split(' ')[0]}</span>
            </h1>
            <p className="text-lg text-slate-600 font-bold mt-0.5">
              📍 {senior.locationName}
            </p>
          </div>

          {/* Obvious Language Selector */}
          <div className="flex bg-slate-100 p-1.5 rounded-2xl border-2 border-slate-300 self-start sm:self-auto">
            {(['mr', 'hi', 'en'] as Language[]).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setSeniorLanguage(lang)}
                className={`px-3.5 py-2 rounded-xl text-base font-black transition-all ${
                  seniorLang === lang
                    ? 'bg-blue-900 text-white shadow-md scale-105'
                    : 'text-slate-700 hover:text-slate-950'
                }`}
              >
                {LANGUAGE_NAMES[lang].native}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Confirmation Modal if Request Triggered (Avoid accidental taps) */}
      {activeConfirmationReq && (
        <div className="bg-emerald-600 text-white rounded-3xl p-6 sm:p-7 shadow-2xl border-4 border-emerald-400 space-y-4 animate-scale-up">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-700 rounded-2xl text-emerald-100">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-black">
                  {tSenior(`requests.${activeConfirmationReq.type}`)}
                </h3>
                <p className="text-base sm:text-lg text-emerald-100 font-bold">
                  {tSenior('requests.requestSentToast')}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setActiveConfirmationReq(null)}
              className="p-2 text-emerald-200 hover:text-white rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-emerald-500">
            <button
              type="button"
              onClick={() => handleCancelAccidental(activeConfirmationReq.id)}
              className="px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-emerald-100 rounded-xl font-bold text-sm sm:text-base flex items-center gap-2 border border-emerald-400 active:scale-95"
            >
              <X className="w-5 h-5 text-rose-300" />
              <span>{tSenior('requests.cancelAccidental')}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveConfirmationReq(null)}
              className="px-5 py-2.5 bg-white text-emerald-950 rounded-xl font-black text-sm sm:text-base shadow active:scale-95"
            >
              {tSenior('common.close')}
            </button>
          </div>
        </div>
      )}

      {/* MOST IMPORTANT: HUGE RED EMERGENCY BUTTON */}
      <section aria-label="Emergency SOS Action">
        <button
          type="button"
          onClick={() => setIsSosOpen(true)}
          className="w-full bg-red-600 hover:bg-red-700 active:scale-98 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-red-500 flex items-center justify-between gap-4 transition-all duration-200 group focus:outline-none focus:ring-4 focus:ring-red-400"
          id="senior-sos-button"
        >
          <div className="flex items-center gap-4 text-left">
            <div className="p-4 bg-red-700 rounded-2xl group-hover:scale-110 transition-transform shrink-0 border-2 border-red-400">
              <AlertTriangle className="w-11 h-11 sm:w-14 sm:h-14 text-white animate-pulse" />
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
        </button>
      </section>

      {/* MAIN SENIOR ACTIONS (Hungry, Thirsty, Medicine, Pain, Family) */}
      <section className="space-y-4" aria-label="Direct Assistance Requests">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 px-1 flex items-center gap-2">
          <Sparkles className="w-7 h-7 text-amber-500" />
          {tSenior('seniorHome.quickRequestsTitle')}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* 1. Hungry */}
          <button
            type="button"
            onClick={() => handleQuickRequest('HUNGRY')}
            className="p-6 bg-amber-50 hover:bg-amber-100 border-4 border-amber-300 rounded-3xl text-left active:scale-95 transition-all shadow-md flex items-center gap-4 group"
          >
            <div className="p-4 bg-amber-200 text-amber-950 rounded-2xl text-4xl group-hover:scale-110 transition-transform shrink-0">
              🍛
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-amber-950 block">
                {tSenior('requests.HUNGRY')}
              </span>
              <span className="text-base text-amber-900 font-bold block mt-1">
                {tSenior('requests.HUNGRY_desc')}
              </span>
            </div>
          </button>

          {/* 2. Thirsty */}
          <button
            type="button"
            onClick={() => handleQuickRequest('THIRSTY')}
            className="p-6 bg-cyan-50 hover:bg-cyan-100 border-4 border-cyan-300 rounded-3xl text-left active:scale-95 transition-all shadow-md flex items-center gap-4 group"
          >
            <div className="p-4 bg-cyan-200 text-cyan-950 rounded-2xl text-4xl group-hover:scale-110 transition-transform shrink-0">
              💧
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-cyan-950 block">
                {tSenior('requests.THIRSTY')}
              </span>
              <span className="text-base text-cyan-900 font-bold block mt-1">
                {tSenior('requests.THIRSTY_desc')}
              </span>
            </div>
          </button>

          {/* 3. Medicine */}
          <button
            type="button"
            onClick={() => handleQuickRequest('MEDICINE')}
            className="p-6 bg-rose-50 hover:bg-rose-100 border-4 border-rose-300 rounded-3xl text-left active:scale-95 transition-all shadow-md flex items-center gap-4 group"
          >
            <div className="p-4 bg-rose-200 text-rose-950 rounded-2xl text-4xl group-hover:scale-110 transition-transform shrink-0">
              💊
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-rose-950 block">
                {tSenior('requests.MEDICINE')}
              </span>
              <span className="text-base text-rose-900 font-bold block mt-1">
                {tSenior('requests.MEDICINE_desc')}
              </span>
            </div>
          </button>

          {/* 4. Pain */}
          <button
            type="button"
            onClick={() => handleQuickRequest('PAIN')}
            className="p-6 bg-orange-50 hover:bg-orange-100 border-4 border-orange-300 rounded-3xl text-left active:scale-95 transition-all shadow-md flex items-center gap-4 group"
          >
            <div className="p-4 bg-orange-200 text-orange-950 rounded-2xl text-4xl group-hover:scale-110 transition-transform shrink-0">
              🩹
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-orange-950 block">
                {tSenior('requests.PAIN')}
              </span>
              <span className="text-base text-orange-900 font-bold block mt-1">
                {tSenior('requests.PAIN_desc')}
              </span>
            </div>
          </button>

          {/* 5. Family Call Request */}
          <button
            type="button"
            onClick={() => handleQuickRequest('FAMILY')}
            className="p-6 bg-emerald-50 hover:bg-emerald-100 border-4 border-emerald-300 rounded-3xl text-left active:scale-95 transition-all shadow-md flex items-center gap-4 group sm:col-span-2"
          >
            <div className="p-4 bg-emerald-200 text-emerald-950 rounded-2xl text-4xl group-hover:scale-110 transition-transform shrink-0">
              👨‍👩‍👧
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-emerald-950 block">
                {tSenior('requests.FAMILY')}
              </span>
              <span className="text-base text-emerald-900 font-bold block mt-1">
                {tSenior('requests.FAMILY_desc')}
              </span>
            </div>
          </button>
        </div>
      </section>

      {/* CORE NAVIGATION SECTIONS */}
      <section className="space-y-4 pt-2" aria-label="Main Sections">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 px-1">
          इतर सेवा (More Options)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Daily Check-In Card */}
          <button
            type="button"
            onClick={() => onNavigate('checkin')}
            className={`p-6 rounded-3xl border-4 text-left active:scale-98 transition-all shadow-md flex items-center justify-between ${
              isCheckInCompleted
                ? 'bg-emerald-50 border-emerald-400'
                : 'bg-emerald-700 hover:bg-emerald-800 text-white border-emerald-500'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-3.5 rounded-2xl ${isCheckInCompleted ? 'bg-emerald-200 text-emerald-900' : 'bg-white/20 text-white'}`}>
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div>
                <span className={`text-2xl sm:text-3xl font-black block ${isCheckInCompleted ? 'text-emerald-950' : 'text-white'}`}>
                  {tSenior('seniorHome.cardCheckIn')}
                </span>
                <span className={`text-base font-bold block mt-0.5 ${isCheckInCompleted ? 'text-emerald-800' : 'text-emerald-100'}`}>
                  {isCheckInCompleted ? '✓ आजचा Check-in पूर्ण' : tSenior('seniorHome.cardCheckInDesc')}
                </span>
              </div>
            </div>
            <ArrowRight className={`w-7 h-7 ${isCheckInCompleted ? 'text-emerald-700' : 'text-white'}`} />
          </button>

          {/* Contact Family Card */}
          <button
            type="button"
            onClick={() => onNavigate('family')}
            className="p-6 bg-white hover:bg-slate-50 rounded-3xl border-4 border-blue-300 flex items-center justify-between text-left active:scale-98 transition-all shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="p-3.5 bg-blue-100 text-blue-900 rounded-2xl">
                <Users className="w-9 h-9" />
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-slate-900 block">
                  {tSenior('seniorHome.cardFamily')}
                </span>
                <span className="text-base text-slate-600 font-bold block mt-0.5">
                  {tSenior('seniorHome.cardFamilyDesc')}
                </span>
              </div>
            </div>
            <ArrowRight className="w-7 h-7 text-blue-700" />
          </button>

          {/* Explain Document Card */}
          <button
            type="button"
            onClick={() => onNavigate('explainer')}
            className="p-6 bg-white hover:bg-slate-50 rounded-3xl border-4 border-purple-300 flex items-center justify-between text-left active:scale-98 transition-all shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="p-3.5 bg-purple-100 text-purple-900 rounded-2xl">
                <FileText className="w-9 h-9" />
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-slate-900 block">
                  {tSenior('seniorHome.cardExplainDoc')}
                </span>
                <span className="text-base text-slate-600 font-bold block mt-0.5">
                  {tSenior('seniorHome.cardExplainDocDesc')}
                </span>
              </div>
            </div>
            <ArrowRight className="w-7 h-7 text-purple-700" />
          </button>

          {/* Nearby Help Card */}
          <button
            type="button"
            onClick={() => onNavigate('services')}
            className="p-6 bg-white hover:bg-slate-50 rounded-3xl border-4 border-cyan-300 flex items-center justify-between text-left active:scale-98 transition-all shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="p-3.5 bg-cyan-100 text-cyan-900 rounded-2xl">
                <MapPin className="w-9 h-9" />
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-slate-900 block">
                  {tSenior('seniorHome.cardServices')}
                </span>
                <span className="text-base text-slate-600 font-bold block mt-0.5">
                  {tSenior('seniorHome.cardServicesDesc')}
                </span>
              </div>
            </div>
            <ArrowRight className="w-7 h-7 text-cyan-700" />
          </button>

          {/* My Requests Status Card */}
          <button
            type="button"
            onClick={() => onNavigate('requests')}
            className="p-6 bg-white hover:bg-slate-50 rounded-3xl border-4 border-slate-300 flex items-center justify-between text-left active:scale-98 transition-all shadow-md sm:col-span-2"
          >
            <div className="flex items-center gap-4">
              <div className="p-3.5 bg-slate-100 text-slate-900 rounded-2xl">
                <Activity className="w-9 h-9" />
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-slate-900 block">
                  {tSenior('seniorHome.cardRequests')}
                </span>
                <span className="text-base text-slate-600 font-bold block mt-0.5">
                  {tSenior('seniorHome.cardRequestsDesc')}
                </span>
              </div>
            </div>
            <ArrowRight className="w-7 h-7 text-slate-700" />
          </button>
        </div>
      </section>

      {/* SOS Modal */}
      <SosModal isOpen={isSosOpen} onClose={() => setIsSosOpen(false)} />
    </div>
  );
};
