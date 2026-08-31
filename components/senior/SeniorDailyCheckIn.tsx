'use client';

import React, { useState } from 'react';
import { useSaathi } from '@/context/SaathiContext';
import { 
  ArrowLeft, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  HeartHandshake, 
  Phone, 
  MessageSquare, 
  RotateCcw,
  Volume2
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface SeniorDailyCheckInProps {
  onBack: () => void;
  onTriggerSos: () => void;
}

export const SeniorDailyCheckIn: React.FC<SeniorDailyCheckInProps> = ({ onBack, onTriggerSos }) => {
  const { senior, checkIn, submitCheckIn, resetCheckIn, tSenior, readAloud } = useSaathi();
  const [justCompleted, setJustCompleted] = useState(false);

  const isCompleted = checkIn.status === 'COMPLETED' || justCompleted;
  const PRIYA_PHONE = '918591598630';

  const handleImOk = () => {
    submitCheckIn('GOOD');
    setJustCompleted(true);

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // safe fallback
    }

    const toastMsg = 'आनंदाची बातमी! तुम्ही ठीक आहात हे तुमच्या कुटुंबाला कळवले आहे.';
    readAloud(toastMsg);
  };

  const handleReadQuestion = () => {
    const text = 'दैनिक विचारपूस. आज तुम्ही ठीक आहात का? जर ठीक असाल तर हिरवे बटण दाबा. जर मदत हवी असेल तर लाल बटण दाबा.';
    readAloud(text);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-6 pb-28">
      {/* Top Header */}
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
          onClick={handleReadQuestion}
          className="p-3.5 bg-blue-100 hover:bg-blue-200 text-blue-950 rounded-2xl font-black text-sm sm:text-base flex items-center gap-2 active:scale-95 transition-all border-2 border-blue-300 shadow-sm"
        >
          <Volume2 className="w-5 h-5 text-blue-800" />
          <span>{tSenior('common.readAloud')}</span>
        </button>
      </div>

      {/* Main Question Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border-3 border-slate-200 text-center space-y-6">
        <span className="text-5xl sm:text-6xl inline-block p-4 bg-blue-100 rounded-3xl">
          ☀️
        </span>

        <div className="space-y-2">
          <span className="text-xs sm:text-sm font-black uppercase text-blue-900 tracking-wider bg-blue-100 px-4 py-1 rounded-full">
            दैनिक विचारपूस • Daily Wellbeing Check-In
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight pt-2">
            आज तुम्ही ठीक आहात का?
          </h1>
          <p className="text-base sm:text-xl text-slate-600 font-bold max-w-xl mx-auto">
            (Are you feeling fine today?)
          </p>
        </div>

        {/* ================= IF NOT COMPLETED: TWO HUGE BUTTONS ================= */}
        {!isCompleted ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 max-w-2xl mx-auto">
            {/* 1. GREEN BUTTON: I'M OK */}
            <button
              type="button"
              onClick={handleImOk}
              className="p-8 sm:p-10 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-3xl font-black text-2xl sm:text-3xl shadow-2xl flex flex-col items-center justify-center gap-3 border-4 border-emerald-400 transition-all group"
            >
              <div className="p-4 bg-emerald-700 rounded-2xl group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-12 h-12 text-white" />
              </div>
              <span>मी ठीक आहे<br /><span className="text-sm font-bold text-emerald-200">I AM OK</span></span>
            </button>

            {/* 2. RED BUTTON: I NEED HELP */}
            <button
              type="button"
              onClick={onTriggerSos}
              className="p-8 sm:p-10 bg-red-600 hover:bg-red-700 active:scale-95 text-white rounded-3xl font-black text-2xl sm:text-3xl shadow-2xl flex flex-col items-center justify-center gap-3 border-4 border-red-400 transition-all group"
            >
              <div className="p-4 bg-red-700 rounded-2xl group-hover:scale-110 transition-transform">
                <AlertTriangle className="w-12 h-12 text-white animate-pulse" />
              </div>
              <span>मला मदत हवी आहे<br /><span className="text-sm font-bold text-red-200">I NEED HELP</span></span>
            </button>
          </div>
        ) : (
          /* ================= IF COMPLETED ================= */
          <div className="space-y-6 max-w-xl mx-auto pt-2 animate-scale-up">
            <div className="p-6 bg-emerald-100 border-3 border-emerald-400 rounded-3xl space-y-2">
              <div className="flex items-center justify-center gap-2 text-emerald-800">
                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                <h2 className="text-2xl sm:text-3xl font-black">
                  ✓ आजचा Check-in पूर्ण झाला!
                </h2>
              </div>
              <p className="text-sm sm:text-base font-bold text-emerald-900">
                तुमच्या कुटुंबाला कळवले आहे की तुम्ही मजेत आणि सुरक्षित आहात.
              </p>
            </div>

            {/* Direct Options to Contact Family */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-black text-slate-500 uppercase tracking-wider block">
                कुटुंबाशी बोलण्यासाठी पर्याय:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="tel:+918591598630"
                  className="p-4 bg-blue-900 hover:bg-blue-800 text-white rounded-2xl font-black text-lg flex items-center justify-center gap-2 shadow-md active:scale-95"
                >
                  <Phone className="w-5 h-5" />
                  <span>प्रियाला फोन करा</span>
                </a>

                <a
                  href={`https://wa.me/${PRIYA_PHONE}?text=${encodeURIComponent('मी ठीक आहे. आजचा चेक-इन पूर्ण झाला. (I am OK. Daily check-in completed.)')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-black text-lg flex items-center justify-center gap-2 shadow-md active:scale-95"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>व्हॉट्सॲपवर कळवा</span>
                </a>
              </div>
            </div>

            {/* Reset button for testing/demo */}
            <div className="pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => {
                  resetCheckIn();
                  setJustCompleted(false);
                }}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 mx-auto active:scale-95"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>पुन्हा Check-in करा (Reset for Demo)</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
