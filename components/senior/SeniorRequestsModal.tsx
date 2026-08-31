'use client';

import React from 'react';
import { useSaathi } from '@/context/SaathiContext';
import { X, Clock, CheckCircle2, AlertCircle, Cpu, Smartphone, Activity } from 'lucide-react';

interface SeniorRequestsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SeniorRequestsModal: React.FC<SeniorRequestsModalProps> = ({ isOpen, onClose }) => {
  const { tSenior, requests, seniorLang } = useSaathi();

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border-2 border-slate-200 space-y-6 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-2xl text-blue-800">
              <Activity className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                {tSenior('seniorHome.cardRequests')}
              </h2>
              <p className="text-sm text-slate-500 font-medium">{tSenior('seniorHome.cardRequestsDesc')}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Requests List */}
        <div className="overflow-y-auto space-y-3 flex-1 pr-1">
          {requests.length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-2 opacity-50" />
              <p className="text-lg font-bold">{tSenior('requests.noActiveRequests')}</p>
            </div>
          ) : (
            requests.map((req) => {
              const reqText = tSenior(`requests.${req.type}`);
              const isResolved = req.status === 'RESOLVED';
              const isAcknowledged = req.status === 'ACKNOWLEDGED';
              const isEmergency = req.type === 'EMERGENCY';

              return (
                <div
                  key={req.id}
                  className={`p-4 rounded-2xl border-2 transition-all space-y-2 ${
                    isEmergency
                      ? 'border-red-500 bg-red-50/70'
                      : isResolved
                      ? 'border-slate-200 bg-slate-50 opacity-80'
                      : isAcknowledged
                      ? 'border-amber-400 bg-amber-50/70'
                      : 'border-blue-300 bg-blue-50/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-xl font-black ${isEmergency ? 'text-red-700' : 'text-slate-900'}`}>
                          {reqText}
                        </span>
                        <span className="text-xs px-2.5 py-0.5 rounded-full font-bold uppercase flex items-center gap-1 bg-white border border-slate-200 text-slate-700">
                          {req.source === 'HARDWARE' ? (
                            <>
                              <Cpu className="w-3 h-3 text-purple-600" />
                              {tSenior('requests.sourceHardwareBadge')}
                            </>
                          ) : (
                            <>
                              <Smartphone className="w-3 h-3 text-blue-600" />
                              {tSenior('requests.sourceAppBadge')}
                            </>
                          )}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 font-medium">
                        {new Date(req.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {new Date(req.timestamp).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Status Badge */}
                    <div className="shrink-0">
                      {isResolved ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-xl text-sm font-bold">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          {tSenior('requests.statusResolved')}
                        </span>
                      ) : isAcknowledged ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-800 rounded-xl text-sm font-bold">
                          <Clock className="w-4 h-4 text-amber-600 animate-spin" />
                          {tSenior('requests.statusAcknowledged')}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-800 rounded-xl text-sm font-bold">
                          <AlertCircle className="w-4 h-4 text-blue-600 animate-pulse" />
                          {tSenior('requests.statusPending')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <button
          onClick={onClose}
          className="w-full p-4 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-slate-800"
        >
          {tSenior('common.close')}
        </button>
      </div>
    </div>
  );
};
