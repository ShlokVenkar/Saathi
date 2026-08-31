'use client';

import React, { useState } from 'react';
import { useSaathi } from '@/context/SaathiContext';
import { 
  ArrowLeft, 
  Phone, 
  MessageSquare, 
  ShieldAlert, 
  HeartHandshake, 
  CheckCircle2, 
  Volume2, 
  AlertTriangle,
  User
} from 'lucide-react';

interface SeniorFamilyContactProps {
  onBack: () => void;
}

export const SeniorFamilyContact: React.FC<SeniorFamilyContactProps> = ({ onBack }) => {
  const { senior, tSenior, createRequest, readAloud } = useSaathi();
  const [messageSent, setMessageSent] = useState(false);

  const handleSendMessage = () => {
    createRequest('FAMILY', 'APP');
    setMessageSent(true);
    const text = tSenior('requests.requestSentToast');
    readAloud(text);
    setTimeout(() => setMessageSent(false), 4000);
  };

  const handleReadScreen = () => {
    const text = `${tSenior('familyContact.title')}. ${senior.primaryCaregiverName}. ${tSenior('familyContact.relationship')}.`;
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
          {tSenior('familyContact.title')}
        </h1>
        <p className="text-base sm:text-lg text-slate-600 font-medium">
          {tSenior('familyContact.subtitle')}
        </p>
      </div>

      {/* Toast Confirmation */}
      {messageSent && (
        <div className="p-5 bg-emerald-600 text-white font-black text-lg sm:text-xl rounded-3xl shadow-xl flex items-center gap-3 animate-bounce border-2 border-emerald-400">
          <CheckCircle2 className="w-8 h-8 text-emerald-200 shrink-0" />
          <span>{tSenior('requests.requestSentToast')}</span>
        </div>
      )}

      {/* Primary Caregiver Card */}
      <section className="bg-blue-50 border-3 border-blue-300 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-blue-600 text-white rounded-2xl shrink-0 shadow-md">
            <User className="w-10 h-10" />
          </div>
          <div>
            <span className="text-xs font-black uppercase text-blue-800 bg-blue-200 px-3 py-1 rounded-full">
              {tSenior('familyContact.primaryLabel')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              {senior.primaryCaregiverName.split('(')[0].trim()}
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-bold">
              {tSenior('familyContact.relationship')}
            </p>
          </div>
        </div>

        {/* TWO HUGE ACTION BUTTONS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Call Phone */}
          <a
            href={`tel:${senior.primaryCaregiverPhone}`}
            className="p-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-3xl font-black text-2xl shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all border-2 border-emerald-400"
          >
            <Phone className="w-8 h-8" />
            <span>{tSenior('familyContact.callButton')}</span>
          </a>

          {/* Send Message */}
          <button
            type="button"
            onClick={handleSendMessage}
            className="p-6 bg-blue-900 hover:bg-blue-800 text-white rounded-3xl font-black text-2xl shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all border-2 border-blue-700"
          >
            <MessageSquare className="w-8 h-8 text-blue-200" />
            <span>{tSenior('familyContact.messageButton')}</span>
          </button>
        </div>
      </section>

      {/* Emergency Helpline Section */}
      <section className="bg-white rounded-3xl p-6 shadow-md border-2 border-slate-200 space-y-4">
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
          <ShieldAlert className="w-6 h-6 text-red-600" />
          {tSenior('familyContact.emergencyHeading')}
        </h3>

        <div className="space-y-3">
          {/* Senior Helpline */}
          <a
            href="tel:14567"
            className="p-4 bg-amber-50 hover:bg-amber-100 border-2 border-amber-300 rounded-2xl flex items-center justify-between active:scale-98 transition-all"
          >
            <div>
              <span className="font-black text-lg text-slate-900 block">
                {tSenior('familyContact.helplineTitle')}
              </span>
              <span className="text-sm text-amber-900 font-bold">
                {tSenior('familyContact.helplineNumber')}
              </span>
            </div>
            <span className="p-3 bg-amber-600 text-white rounded-xl font-black text-sm">
              {tSenior('common.call')}
            </span>
          </a>

          {/* Ambulance 108 */}
          <a
            href="tel:108"
            className="p-4 bg-red-50 hover:bg-red-100 border-2 border-red-300 rounded-2xl flex items-center justify-between active:scale-98 transition-all"
          >
            <div>
              <span className="font-black text-lg text-slate-900 block">
                {tSenior('familyContact.ambulanceTitle')}
              </span>
              <span className="text-sm text-red-900 font-bold">
                {tSenior('familyContact.ambulanceNumber')}
              </span>
            </div>
            <span className="p-3 bg-red-600 text-white rounded-xl font-black text-sm">
              {tSenior('common.call')}
            </span>
          </a>

          {/* Police 112 */}
          <a
            href="tel:112"
            className="p-4 bg-slate-50 hover:bg-slate-100 border-2 border-slate-300 rounded-2xl flex items-center justify-between active:scale-98 transition-all"
          >
            <div>
              <span className="font-black text-lg text-slate-900 block">
                {tSenior('familyContact.policeTitle')}
              </span>
              <span className="text-sm text-slate-700 font-bold">
                {tSenior('familyContact.policeNumber')}
              </span>
            </div>
            <span className="p-3 bg-slate-800 text-white rounded-xl font-black text-sm">
              {tSenior('common.call')}
            </span>
          </a>
        </div>
      </section>
    </div>
  );
};
