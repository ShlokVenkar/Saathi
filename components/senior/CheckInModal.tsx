'use client';

import React, { useState } from 'react';
import { useSaathi } from '@/context/SaathiContext';
import { CheckCircle2, Heart, AlertCircle, X, Sparkles, Smile, Meh, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CheckInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckInModal: React.FC<CheckInModalProps> = ({ isOpen, onClose }) => {
  const { tSenior, checkIn, submitCheckIn, senior, readAloud } = useSaathi();
  const [selectedMood, setSelectedMood] = useState<'GOOD' | 'NEUTRAL' | 'NEED_HELP'>('GOOD');
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = () => {
    submitCheckIn(selectedMood);
    
    // Celebrate with confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {}

    const text = `${tSenior('checkin.completedTitle')} ${tSenior('checkin.completedSub')} ${senior.primaryCaregiverName}`;
    readAloud(text);
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 2200);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-4 border-emerald-500 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-700">
              <Heart className="w-8 h-8 fill-emerald-600 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                {tSenior('checkin.title')}
              </h2>
              <p className="text-sm text-slate-500">{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {showSuccess ? (
          <div className="py-10 text-center space-y-4 animate-scale-up">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-12 h-12 text-emerald-600" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-emerald-800">
              {tSenior('checkin.completedTitle')}
            </h3>
            <p className="text-slate-600 text-lg font-medium">
              {tSenior('checkin.completedSub')} {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl font-bold">
              <Sparkles className="w-5 h-5" />
              {senior.primaryCaregiverName} notified
            </div>
          </div>
        ) : (
          <>
            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-5 text-center space-y-2">
              <h3 className="text-2xl sm:text-3xl font-black text-emerald-950">
                {tSenior('checkin.question')}
              </h3>
              <p className="text-slate-600 text-base sm:text-lg">
                {tSenior('checkin.subtext')}
              </p>
            </div>

            {/* Mood / Status Selector */}
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setSelectedMood('GOOD')}
                className={`p-4 rounded-2xl flex flex-col items-center gap-2 border-3 transition-all ${
                  selectedMood === 'GOOD'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow-md font-bold'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300'
                }`}
              >
                <Smile className="w-8 h-8 text-emerald-600" />
                <span className="text-sm font-semibold">{tSenior('checkin.moodGood')}</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMood('NEUTRAL')}
                className={`p-4 rounded-2xl flex flex-col items-center gap-2 border-3 transition-all ${
                  selectedMood === 'NEUTRAL'
                    ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-md font-bold'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300'
                }`}
              >
                <Meh className="w-8 h-8 text-blue-600" />
                <span className="text-sm font-semibold">{tSenior('checkin.moodNeutral')}</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMood('NEED_HELP')}
                className={`p-4 rounded-2xl flex flex-col items-center gap-2 border-3 transition-all ${
                  selectedMood === 'NEED_HELP'
                    ? 'border-amber-600 bg-amber-50 text-amber-900 shadow-md font-bold'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300'
                }`}
              >
                <HelpCircle className="w-8 h-8 text-amber-600" />
                <span className="text-sm font-semibold">{tSenior('checkin.moodNeedHelp')}</span>
              </button>
            </div>

            {/* Big Action Button */}
            <button
              onClick={handleConfirm}
              className="w-full p-5 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white rounded-2xl font-black text-2xl shadow-xl flex items-center justify-center gap-3 transition-all border-2 border-emerald-400"
            >
              <CheckCircle2 className="w-8 h-8 text-white" />
              <span>{tSenior('checkin.imOkButton')}</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};
