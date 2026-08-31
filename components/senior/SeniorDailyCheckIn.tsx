'use client';

import React, { useState } from 'react';
import { useSaathi } from '@/context/SaathiContext';
import { 
  ArrowLeft, 
  CheckCircle2, 
  AlertTriangle, 
  Heart, 
  Sparkles, 
  Volume2, 
  Clock 
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface SeniorDailyCheckInProps {
  onBack: () => void;
  onTriggerSos: () => void;
}

export const SeniorDailyCheckIn: React.FC<SeniorDailyCheckInProps> = ({ onBack, onTriggerSos }) => {
  const { senior, tSenior, checkIn, submitCheckIn, readAloud } = useSaathi();
  const [justSubmitted, setJustSubmitted] = useState(false);

  const isCompleted = checkIn.status === 'COMPLETED';

  const handleImOk = () => {
    submitCheckIn('GOOD');
    setJustSubmitted(true);

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {}

    const text = `${tSenior('checkin.completedTitle')} ${tSenior('checkin.completedSub')}`;
    readAloud(text);
  };

  const handleReadScreen = () => {
    const text = `${tSenior('checkin.title')}. ${tSenior('checkin.question')}.`;
    readAloud(text);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 sm:py-6 space-y-6 pb-28">
      {/* Top Bar with Back Button & Listen */}
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-3 bg-slate-200 hover:bg-slate-300 text-slate-900 rounded-2xl font-black text-lg sm:text-xl flex items-center gap-2 active:scale-95 transition-all shadow-sm"
        >
          <ArrowLeft className="w-6 h-6" />
          <span>{tSenior('common.back')}</span>
        </button>

        <button
          type="button"
          onClick={handleReadScreen}
          className="p-3 bg-blue-100 hover:bg-blue-200 text-blue-950 rounded-2xl font-black text-sm flex items-center gap-1.5 active:scale-95 transition-all"
        >
          <Volume2 className="w-5 h-5 text-blue-800" />
          <span>{tSenior('common.readAloud')}</span>
        </button>
      </div>

      {/* Screen Title */}
      <div className="bg-white rounded-3xl p-6 shadow-md border-2 border-slate-200 space-y-1">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          {tSenior('checkin.title')}
        </h1>
        <p className="text-base sm:text-lg text-slate-600 font-medium">
          {tSenior('checkin.subtext')}
        </p>
      </div>

      {/* COMPLETED STATUS CARD (If already checked in) */}
      {(isCompleted || justSubmitted) ? (
        <section className="bg-emerald-50 border-4 border-emerald-500 rounded-3xl p-6 sm:p-8 text-center space-y-5 shadow-xl animate-scale-up">
          <div className="w-24 h-24 bg-emerald-200 text-emerald-800 rounded-full flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-14 h-14 text-emerald-700" />
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-black text-emerald-950">
              {tSenior('checkin.completedTitle')}
            </h2>
            <p className="text-xl sm:text-2xl font-bold text-emerald-800">
              {tSenior('checkin.completedSub')}
            </p>
            <p className="text-base text-slate-600 font-medium pt-1 flex items-center justify-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span>
                {tSenior('checkin.completedTime')} {new Date(checkIn.timestamp || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </p>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={onBack}
              className="w-full p-5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl font-black text-xl shadow-lg active:scale-95 transition-all"
            >
              {tSenior('common.back')}
            </button>
          </div>
        </section>
      ) : (
        /* QUESTION & 2 HUGE ACTION BUTTONS */
        <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-3 border-emerald-300 space-y-8">
          <div className="text-center space-y-3">
            <div className="p-4 bg-emerald-100 text-emerald-800 rounded-full w-fit mx-auto">
              <Heart className="w-12 h-12 fill-emerald-600 text-emerald-600" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              {tSenior('checkin.question')}
            </h2>
          </div>

          <div className="space-y-4">
            {/* HUGE GREEN BUTTON: "✓ मी ठीक आहे" */}
            <button
              type="button"
              onClick={handleImOk}
              className="w-full p-6 sm:p-8 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white rounded-3xl font-black text-2xl sm:text-3xl shadow-xl flex items-center justify-center gap-4 transition-all border-4 border-emerald-400"
            >
              <CheckCircle2 className="w-10 h-10 text-white shrink-0" />
              <span>{tSenior('checkin.imOkButton')}</span>
            </button>

            {/* HUGE RED BUTTON: "SOS / मला मदत हवी आहे" */}
            <button
              type="button"
              onClick={onTriggerSos}
              className="w-full p-6 sm:p-7 bg-red-600 hover:bg-red-700 active:scale-98 text-white rounded-3xl font-black text-xl sm:text-2xl shadow-xl flex items-center justify-center gap-3 transition-all border-4 border-red-400"
            >
              <AlertTriangle className="w-8 h-8 text-white shrink-0" />
              <span>{tSenior('checkin.needHelpButton')}</span>
            </button>
          </div>
        </section>
      )}
    </div>
  );
};
