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
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6 pb-28">
      {/* Top Bar with Back Button & Listen */}
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3.5 bg-slate-200 hover:bg-slate-300 text-slate-900 rounded-2xl font-black text-xl flex items-center gap-2 active:scale-95 transition-all shadow-sm border-2 border-slate-300"
        >
          <ArrowLeft className="w-7 h-7" />
          <span>{tSenior('common.back')}</span>
        </button>

        <button
          type="button"
          onClick={handleReadScreen}
          className="p-3.5 bg-blue-100 hover:bg-blue-200 text-blue-950 rounded-2xl font-black text-base flex items-center gap-2 active:scale-95 transition-all border-2 border-blue-300 shadow-sm"
        >
          <Volume2 className="w-6 h-6 text-blue-800" />
          <span>{tSenior('common.readAloud')}</span>
        </button>
      </div>

      {/* Screen Title */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border-3 border-slate-200 space-y-1">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
          {tSenior('familyContact.title')}
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 font-bold">
          {tSenior('familyContact.subtitle')}
        </p>
      </div>

      {/* Toast Confirmation */}
      {messageSent && (
        <div className="p-5 bg-emerald-600 text-white font-black text-xl rounded-3xl shadow-xl flex items-center gap-3 animate-bounce border-2 border-emerald-400">
          <CheckCircle2 className="w-8 h-8 text-emerald-200 shrink-0" />
          <span>{tSenior('requests.requestSentToast')}</span>
        </div>
      )}

      {/* Grid for Desktop (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Primary Caregiver Card */}
        <section className="lg:col-span-7 bg-blue-50 border-4 border-blue-300 rounded-3xl p-6 sm:p-8 shadow-md space-y-6 flex flex-col justify-between">
          <div className="flex items-center gap-4">
            <div className="p-5 bg-blue-600 text-white rounded-3xl shrink-0 shadow-md">
              <User className="w-12 h-12" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-black uppercase text-blue-800 bg-blue-200 px-3.5 py-1 rounded-full">
                {tSenior('familyContact.primaryLabel')}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-1">
                {senior.primaryCaregiverName.split('(')[0].trim()}
              </h2>
              <p className="text-lg sm:text-xl text-slate-600 font-bold">
                {tSenior('familyContact.relationship')}
              </p>
              <p className="text-base text-blue-900 font-bold mt-0.5">
                📞 {senior.primaryCaregiverPhone}
              </p>
            </div>
          </div>

          {/* TWO HUGE ACTION BUTTONS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            {/* Call Phone */}
            <a
              href={`tel:${senior.primaryCaregiverPhone}`}
              className="p-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-3xl font-black text-2xl shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all border-4 border-emerald-400 text-center"
            >
              <Phone className="w-8 h-8" />
              <span>{tSenior('familyContact.callButton')}</span>
            </a>

            {/* Send Message */}
            <button
              type="button"
              onClick={handleSendMessage}
              className="p-6 bg-blue-900 hover:bg-blue-800 text-white rounded-3xl font-black text-2xl shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all border-4 border-blue-700 text-center"
            >
              <MessageSquare className="w-8 h-8 text-blue-200" />
              <span>{tSenior('familyContact.messageButton')}</span>
            </button>
          </div>
        </section>

        {/* Emergency Helpline Section */}
        <section className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 shadow-md border-3 border-slate-200 space-y-4">
          <h3 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <ShieldAlert className="w-7 h-7 text-red-600" />
            {tSenior('familyContact.emergencyHeading')}
          </h3>

          <div className="space-y-3">
            {/* Senior Helpline */}
            <a
              href="tel:14567"
              className="p-4 bg-amber-50 hover:bg-amber-100 border-3 border-amber-300 rounded-2xl flex items-center justify-between active:scale-98 transition-all"
            >
              <div>
                <span className="font-black text-lg text-slate-900 block">
                  {tSenior('familyContact.helplineTitle')}
                </span>
                <span className="text-sm text-amber-900 font-bold">
                  {tSenior('familyContact.helplineNumber')}
                </span>
              </div>
              <span className="px-4 py-2 bg-amber-600 text-white rounded-xl font-black text-base">
                {tSenior('common.call')}
              </span>
            </a>

            {/* Ambulance 108 */}
            <a
              href="tel:108"
              className="p-4 bg-red-50 hover:bg-red-100 border-3 border-red-300 rounded-2xl flex items-center justify-between active:scale-98 transition-all"
            >
              <div>
                <span className="font-black text-lg text-slate-900 block">
                  {tSenior('familyContact.ambulanceTitle')}
                </span>
                <span className="text-sm text-red-900 font-bold">
                  {tSenior('familyContact.ambulanceNumber')}
                </span>
              </div>
              <span className="px-4 py-2 bg-red-600 text-white rounded-xl font-black text-base">
                {tSenior('common.call')}
              </span>
            </a>

            {/* Police 112 */}
            <a
              href="tel:112"
              className="p-4 bg-slate-50 hover:bg-slate-100 border-3 border-slate-300 rounded-2xl flex items-center justify-between active:scale-98 transition-all"
            >
              <div>
                <span className="font-black text-lg text-slate-900 block">
                  {tSenior('familyContact.policeTitle')}
                </span>
                <span className="text-sm text-slate-700 font-bold">
                  {tSenior('familyContact.policeNumber')}
                </span>
              </div>
              <span className="px-4 py-2 bg-slate-800 text-white rounded-xl font-black text-base">
                {tSenior('common.call')}
              </span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};
