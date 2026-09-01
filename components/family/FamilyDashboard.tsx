'use client';

import React, { useState } from 'react';
import { useSaathi } from '@/context/SaathiContext';
import { 
  HeartHandshake, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Phone, 
  Cpu, 
  Radio, 
  MessageSquare, 
  ShieldCheck, 
  User, 
  Activity, 
  Smartphone, 
  Bell, 
  Check, 
  Send,
  Languages,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { Language, RequestItem } from '@/types';
import { LANGUAGE_NAMES } from '@/lib/i18n';

export const FamilyDashboard: React.FC = () => {
  const { 
    senior, 
    caregiver, 
    caregiverLang, 
    seniorLang, 
    setCaregiverLanguage, 
    tFamily, 
    requests, 
    device, 
    checkIn, 
    acknowledgeRequest, 
    resolveRequest,
    whatsAppMsg,
    resetCheckIn
  } = useSaathi();

  const [activeTab, setActiveTab] = useState<'stream' | 'device' | 'contacts'>('stream');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Compute senior overall status
  const hasEmergency = requests.some((r) => r.type === 'EMERGENCY' && r.status !== 'RESOLVED' && r.status !== 'CANCELLED');
  const hasPending = requests.some((r) => r.status === 'PENDING');
  
  let overallStatus: 'OK' | 'ATTENTION' | 'EMERGENCY' = 'OK';
  if (hasEmergency) overallStatus = 'EMERGENCY';
  else if (hasPending) overallStatus = 'ATTENTION';

  const isCheckInCompleted = checkIn.status === 'COMPLETED';
  const isMotionDetected = device.pirStatus === 'MOTION_DETECTED';

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAcknowledge = (req: RequestItem) => {
    acknowledgeRequest(req.id);
    showToast(`Acknowledged request from ${senior.name}`);
  };

  const handleResolve = (req: RequestItem) => {
    resolveRequest(req.id);
    showToast(`Request marked as resolved.`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6 pb-28 overflow-x-hidden">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-16 right-4 z-50 p-4 bg-slate-900 text-white font-bold rounded-2xl shadow-2xl flex items-center gap-2 border border-slate-700 animate-slide-down">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner with Senior Link & Caregiver Language */}
      <header className="bg-slate-900 text-white rounded-3xl p-5 sm:p-8 shadow-xl space-y-6 border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 bg-blue-600/30 text-blue-300 rounded-full text-xs font-black uppercase tracking-wider border border-blue-500/30">
                {tFamily('familyDashboard.title')}
              </span>
              <span className="text-xs text-slate-400">
                {tFamily('familyDashboard.seniorLanguageNote')} <strong>{LANGUAGE_NAMES[seniorLang].native}</strong>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              {tFamily('familyDashboard.subtitle')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">
              {senior.locationName} • Caregiver: <strong>{caregiver.name} ({caregiver.relationship})</strong>
            </p>
          </div>

          {/* Caregiver Language Selector (Independent of Senior) */}
          <div className="flex flex-col items-start sm:items-end gap-1.5">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
              <Languages className="w-3.5 h-3.5" />
              {tFamily('familyDashboard.caregiverLanguage')}
            </span>
            <div className="flex bg-slate-800 p-1 rounded-2xl border border-slate-700">
              {(['en', 'hi', 'mr'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setCaregiverLanguage(lang)}
                  className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    caregiverLang === lang
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {LANGUAGE_NAMES[lang].native}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Status Metrics Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* Overall Health Card */}
          <div className={`p-4 rounded-2xl border-2 flex items-center gap-4 ${
            overallStatus === 'EMERGENCY'
              ? 'bg-red-950/60 border-red-500 text-red-100'
              : overallStatus === 'ATTENTION'
              ? 'bg-amber-950/50 border-amber-500 text-amber-100'
              : 'bg-emerald-950/50 border-emerald-500 text-emerald-100'
          }`}>
            <div className={`p-3 rounded-xl ${
              overallStatus === 'EMERGENCY' ? 'bg-red-600' : overallStatus === 'ATTENTION' ? 'bg-amber-600' : 'bg-emerald-600'
            }`}>
              {overallStatus === 'EMERGENCY' ? (
                <AlertTriangle className="w-6 h-6 text-white animate-bounce" />
              ) : overallStatus === 'ATTENTION' ? (
                <Clock className="w-6 h-6 text-white" />
              ) : (
                <ShieldCheck className="w-6 h-6 text-white" />
              )}
            </div>
            <div>
              <span className="text-xs uppercase font-black tracking-wider text-slate-400 block">Status</span>
              <span className="text-base sm:text-lg font-black block">
                {overallStatus === 'EMERGENCY'
                  ? tFamily('familyDashboard.statusEmergency')
                  : overallStatus === 'ATTENTION'
                  ? tFamily('familyDashboard.statusAttention')
                  : tFamily('familyDashboard.statusOk')}
              </span>
            </div>
          </div>

          {/* Daily Check-In Card */}
          <div className={`p-4 rounded-2xl border-2 flex items-center justify-between gap-3 ${
            isCheckInCompleted
              ? 'bg-slate-800/80 border-slate-700 text-slate-100'
              : 'bg-amber-950/40 border-amber-500/70 text-amber-100'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-xl ${isCheckInCompleted ? 'bg-emerald-600/30 text-emerald-400' : 'bg-amber-600/30 text-amber-400'}`}>
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs uppercase font-black tracking-wider text-slate-400 block">
                  {tFamily('familyDashboard.todayCheckIn')}
                </span>
                <span className="text-sm sm:text-base font-bold block">
                  {isCheckInCompleted ? tFamily('checkin.familyStatusCompleted') : tFamily('checkin.familyStatusPending')}
                </span>
              </div>
            </div>
            {!isCheckInCompleted && (
              <button
                type="button"
                onClick={() => showToast(`Gentle notification sent to ${senior?.name || 'Shlok'}`)}
                className="px-2.5 py-1 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-bold shrink-0"
              >
                Remind
              </button>
            )}
          </div>

          {/* Room Motion & Device Status */}
          <div className="p-4 rounded-2xl border-2 bg-slate-800/80 border-slate-700 text-slate-100 flex items-center gap-3">
            <div className="p-3 rounded-xl bg-purple-600/30 text-purple-400">
              <Radio className={`w-6 h-6 ${isMotionDetected ? 'animate-pulse' : ''}`} />
            </div>
            <div>
              <span className="text-xs uppercase font-black tracking-wider text-slate-400 block">
                {tFamily('familyDashboard.lastActivityRoom')}
              </span>
              <span className="text-xs sm:text-sm font-bold block truncate max-w-[180px]">
                {isMotionDetected ? tFamily('familyDashboard.roomMotionDetected') : tFamily('familyDashboard.noRecentMotion')}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* WHATSAPP DEMO SIMULATOR BANNER */}
      {whatsAppMsg && (
        <section className="bg-emerald-950/30 border-2 border-emerald-500/40 rounded-3xl p-4 sm:p-5 shadow-lg space-y-3" aria-label="WhatsApp Simulation">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-emerald-600 text-white rounded-xl">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-black text-emerald-900 flex items-center gap-2">
                  <span>{tFamily('familyDashboard.whatsAppDemoBadge')}</span>
                  <span className="text-[10px] px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-bold">Meta Cloud API</span>
                </h3>
                <p className="text-xs text-emerald-700 font-medium">
                  Sent to {whatsAppMsg.recipientPhone} at {whatsAppMsg.timestamp}
                </p>
              </div>
            </div>
            <a
              href="tel:+919876543210"
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95"
            >
              <Phone className="w-3.5 h-3.5" />
              {tFamily('common.call')}
            </a>
          </div>

          <div className="bg-emerald-900/10 border border-emerald-500/30 rounded-2xl p-3 sm:p-4 font-mono text-xs sm:text-sm text-slate-800 whitespace-pre-line leading-relaxed">
            {whatsAppMsg.messageText}
          </div>
        </section>
      )}

      {/* Tab Navigation */}
      <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200">
        <button
          type="button"
          onClick={() => setActiveTab('stream')}
          className={`flex-1 py-2.5 sm:py-3 rounded-xl font-black text-xs sm:text-base flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'stream' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Activity className="w-4 h-4 text-blue-600" />
          <span>{tFamily('familyDashboard.recentActivity')}</span>
          {requests.filter(r => r.status === 'PENDING').length > 0 && (
            <span className="px-1.5 py-0.5 bg-red-600 text-white rounded-full text-[10px] font-bold">
              {requests.filter(r => r.status === 'PENDING').length}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('device')}
          className={`flex-1 py-2.5 sm:py-3 rounded-xl font-black text-xs sm:text-base flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'device' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Cpu className="w-4 h-4 text-purple-600" />
          <span>{tFamily('familyDashboard.deviceHealth')}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('contacts')}
          className={`flex-1 py-2.5 sm:py-3 rounded-xl font-black text-xs sm:text-base flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'contacts' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <User className="w-4 h-4 text-emerald-600" />
          <span>{tFamily('familyDashboard.emergencyContactsList')}</span>
        </button>
      </div>

      {/* TAB 1: LIVE ACTIVITY STREAM */}
      {activeTab === 'stream' && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-black text-slate-900">
              {tFamily('familyDashboard.recentActivity')}
            </h2>
            <span className="text-xs text-slate-500 font-bold">
              {requests.length} events logged
            </span>
          </div>

          <div className="space-y-3">
            {requests.map((req) => {
              const reqText = tFamily(`requests.${req.type}`);
              const isResolved = req.status === 'RESOLVED';
              const isAcknowledged = req.status === 'ACKNOWLEDGED';
              const isEmergency = req.type === 'EMERGENCY';

              return (
                <div
                  key={req.id}
                  className={`p-4 sm:p-5 rounded-3xl border-2 transition-all space-y-4 shadow-sm ${
                    isEmergency
                      ? 'border-red-500 bg-red-50'
                      : isResolved
                      ? 'border-slate-200 bg-slate-50 opacity-80'
                      : isAcknowledged
                      ? 'border-amber-400 bg-amber-50/60'
                      : 'border-blue-400 bg-blue-50/60'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-lg sm:text-xl font-black ${isEmergency ? 'text-red-700' : 'text-slate-900'}`}>
                          {reqText}
                        </span>
                        <span className="text-xs px-2.5 py-0.5 rounded-full font-bold uppercase flex items-center gap-1 bg-white border border-slate-200 text-slate-700">
                          {req.source === 'HARDWARE' ? (
                            <>
                              <Cpu className="w-3 h-3 text-purple-600" />
                              {tFamily('requests.sourceHardwareBadge')}
                            </>
                          ) : (
                            <>
                              <Smartphone className="w-3 h-3 text-blue-600" />
                              {tFamily('requests.sourceAppBadge')}
                            </>
                          )}
                        </span>
                        <span className={`text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-black ${
                          req.priority === 'EMERGENCY' ? 'bg-red-600 text-white' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {req.priority}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 font-medium">
                        {req.seniorName} • {new Date(req.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {new Date(req.timestamp).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Actions Bar for Caregiver */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <a
                        href={`tel:${senior.primaryCaregiverPhone}`}
                        className="px-3.5 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 active:scale-95 shadow-sm"
                      >
                        <Phone className="w-4 h-4" />
                        {tFamily('requests.callSeniorAction')}
                      </a>

                      {!isResolved && (
                        <>
                          {!isAcknowledged && (
                            <button
                              type="button"
                              onClick={() => handleAcknowledge(req)}
                              className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 active:scale-95 shadow-sm"
                            >
                              <Clock className="w-4 h-4" />
                              {tFamily('requests.acknowledgeAction')}
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => handleResolve(req)}
                            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 active:scale-95 shadow-sm"
                          >
                            <Check className="w-4 h-4" />
                            {tFamily('requests.resolveAction')}
                          </button>
                        </>
                      )}

                      {isResolved && (
                        <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          Resolved by {req.resolvedBy || 'Priya'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* TAB 2: DEVICE HEALTH & TELEMETRY */}
      {activeTab === 'device' && (
        <section className="bg-white rounded-3xl p-5 sm:p-6 shadow-md border-2 border-slate-200 space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <h2 className="text-xl font-black text-slate-900">{device.name}</h2>
              <p className="text-xs text-slate-500">{device.model}</p>
            </div>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full font-bold text-xs flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              {device.connectionState}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 bg-slate-50 rounded-2xl border text-center">
              <span className="text-xs text-slate-500 font-bold block">Battery</span>
              <span className="text-2xl font-black text-slate-900">{device.batteryPercent}%</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border text-center">
              <span className="text-xs text-slate-500 font-bold block">Signal (RSSI)</span>
              <span className="text-2xl font-black text-slate-900">{device.rssiSignalStrength} dBm</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border text-center">
              <span className="text-xs text-slate-500 font-bold block">PIR Motion</span>
              <span className="text-sm font-black text-slate-900 block mt-1">
                {isMotionDetected ? '🟢 Active' : '⚪ Idle'}
              </span>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border text-center">
              <span className="text-xs text-slate-500 font-bold block">Heartbeat</span>
              <span className="text-sm font-black text-slate-900 block mt-1">12s ago</span>
            </div>
          </div>

          {/* Flex Channels Visualizer */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">4-Channel Flex Assistive Sensor Glove</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {device.flexSensors.map((s) => (
                <div key={s.sensorId} className={`p-4 rounded-2xl border-2 ${
                  s.isBent ? 'bg-purple-100 border-purple-400' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center justify-between text-xs font-bold mb-2">
                    <span>{s.name}</span>
                    <span>{s.isBent ? 'BENT' : 'REST'}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-full transition-all ${s.isBent ? 'bg-purple-600' : 'bg-slate-400'}`}
                      style={{ width: `${Math.min(100, (s.value / 1023) * 100)}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-mono text-slate-500 block mt-2 text-right">Raw: {s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TAB 3: EMERGENCY PROTOCOL CONTACTS */}
      {activeTab === 'contacts' && (
        <section className="bg-white rounded-3xl p-5 sm:p-6 shadow-md border-2 border-slate-200 space-y-4">
          <h2 className="text-xl font-black text-slate-900">
            {tFamily('familyDashboard.emergencyContactsList')}
          </h2>

          <div className="grid gap-3">
            {senior.emergencyContacts.map((contact) => (
              <div
                key={contact.id}
                className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between"
              >
                <div>
                  <span className="font-black text-slate-900 text-base block">{contact.name}</span>
                  <span className="text-xs text-slate-500 font-medium">{contact.relationship} • {contact.phone}</span>
                </div>
                <a
                  href={`tel:${contact.phone}`}
                  className="p-3 bg-blue-900 text-white rounded-xl hover:bg-blue-800 active:scale-95 transition-all"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
