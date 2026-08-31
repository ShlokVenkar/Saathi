'use client';

import React from 'react';
import { useSaathi } from '@/context/SaathiContext';
import { 
  ArrowLeft, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Cpu, 
  Smartphone, 
  X, 
  Volume2,
  Activity
} from 'lucide-react';
import { requestService } from '@/services/requestService';

interface SeniorRequestsViewProps {
  onBack: () => void;
}

export const SeniorRequestsView: React.FC<SeniorRequestsViewProps> = ({ onBack }) => {
  const { tSenior, requests, readAloud } = useSaathi();

  const handleCancel = (id: string) => {
    requestService.cancelRequest(id);
    readAloud(tSenior('requests.statusCancelled'));
  };

  const handleReadScreen = () => {
    const text = `${tSenior('seniorHome.cardRequests')}. ${requests.length} ${tSenior('seniorHome.cardRequestsDesc')}`;
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

      {/* Title */}
      <div className="bg-white rounded-3xl p-6 shadow-md border-2 border-slate-200 space-y-1">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          {tSenior('seniorHome.cardRequests')}
        </h1>
        <p className="text-base sm:text-lg text-slate-600 font-medium">
          {tSenior('seniorHome.cardRequestsDesc')}
        </p>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {requests.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border-2 border-slate-200 text-slate-500">
            <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto mb-3" />
            <p className="text-xl font-bold text-slate-700">{tSenior('requests.noActiveRequests')}</p>
          </div>
        ) : (
          requests.map((req) => {
            const reqLabel = tSenior(`requests.${req.type}`);
            const isResolved = req.status === 'RESOLVED';
            const isAcknowledged = req.status === 'ACKNOWLEDGED';
            const isPending = req.status === 'PENDING';
            const isEmergency = req.type === 'EMERGENCY';

            return (
              <div
                key={req.id}
                className={`p-6 rounded-3xl border-3 transition-all space-y-4 shadow-md ${
                  isEmergency
                    ? 'border-red-500 bg-red-50'
                    : isResolved
                    ? 'border-slate-200 bg-slate-50'
                    : isAcknowledged
                    ? 'border-amber-400 bg-amber-50'
                    : 'border-blue-400 bg-blue-50'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <span className={`text-2xl sm:text-3xl font-black block ${isEmergency ? 'text-red-700' : 'text-slate-900'}`}>
                      {reqLabel}
                    </span>
                    <p className="text-sm sm:text-base text-slate-600 font-bold">
                      {new Date(req.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {new Date(req.timestamp).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Status Badge */}
                  <div className="self-start sm:self-auto">
                    {isResolved ? (
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-900 rounded-2xl text-base font-black border border-emerald-300">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        {tSenior('requests.statusResolved')}
                      </span>
                    ) : isAcknowledged ? (
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-900 rounded-2xl text-base font-black border border-amber-300">
                        <Clock className="w-5 h-5 text-amber-600 animate-spin" />
                        {tSenior('requests.statusAcknowledged')}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-900 rounded-2xl text-base font-black border border-blue-300">
                        <AlertCircle className="w-5 h-5 text-blue-600 animate-pulse" />
                        {tSenior('requests.statusPending')}
                      </span>
                    )}
                  </div>
                </div>

                {/* Cancel Button if Pending */}
                {isPending && (
                  <div className="pt-2 border-t border-blue-200">
                    <button
                      type="button"
                      onClick={() => handleCancel(req.id)}
                      className="px-4 py-2 bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-xl text-sm font-bold flex items-center gap-1.5 active:scale-95 transition-all"
                    >
                      <X className="w-4 h-4" />
                      <span>{tSenior('requests.cancelAccidental')}</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
