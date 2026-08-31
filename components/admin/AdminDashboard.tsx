'use client';

import React from 'react';
import { useSaathi } from '@/context/SaathiContext';
import { 
  ShieldAlert, 
  Cpu, 
  Users, 
  Activity, 
  CheckCircle2, 
  Radio, 
  Server, 
  Zap, 
  MessageSquare, 
  Database,
  ArrowUpRight
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { senior, device, requests, checkIn } = useSaathi();

  const totalRequests = requests.length;
  const emergencyCount = requests.filter((r) => r.type === 'EMERGENCY').length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 sm:py-6 space-y-6 pb-28">
      {/* Header */}
      <header className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 space-y-2">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-blue-600/30 text-blue-300 rounded-full text-xs font-black uppercase tracking-wider border border-blue-500/30">
            System Administration
          </span>
          <span className="text-xs px-2.5 py-0.5 bg-emerald-900/60 text-emerald-300 rounded-full font-bold">
            99.98% Uptime
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
          SAATHI Operations & Device Registry
        </h1>
        <p className="text-sm text-slate-400 font-medium">
          Central telemetry, hardware node registry, and emergency dispatch log.
        </p>
      </header>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-5 bg-white rounded-3xl border-2 border-slate-200 shadow-sm space-y-1">
          <div className="p-2.5 bg-blue-100 text-blue-800 rounded-xl w-fit">
            <Users className="w-5 h-5" />
          </div>
          <span className="text-xs text-slate-500 font-bold block pt-1">Registered Seniors</span>
          <span className="text-2xl sm:text-3xl font-black text-slate-900 block">1 Active</span>
        </div>

        <div className="p-5 bg-white rounded-3xl border-2 border-slate-200 shadow-sm space-y-1">
          <div className="p-2.5 bg-purple-100 text-purple-800 rounded-xl w-fit">
            <Cpu className="w-5 h-5" />
          </div>
          <span className="text-xs text-slate-500 font-bold block pt-1">Hardware Nodes</span>
          <span className="text-2xl sm:text-3xl font-black text-slate-900 block">1 Online</span>
        </div>

        <div className="p-5 bg-white rounded-3xl border-2 border-slate-200 shadow-sm space-y-1">
          <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-xl w-fit">
            <Activity className="w-5 h-5" />
          </div>
          <span className="text-xs text-slate-500 font-bold block pt-1">Requests Today</span>
          <span className="text-2xl sm:text-3xl font-black text-slate-900 block">{totalRequests}</span>
        </div>

        <div className="p-5 bg-white rounded-3xl border-2 border-slate-200 shadow-sm space-y-1">
          <div className="p-2.5 bg-red-100 text-red-800 rounded-xl w-fit">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <span className="text-xs text-slate-500 font-bold block pt-1">Emergency Alarms</span>
          <span className="text-2xl sm:text-3xl font-black text-slate-900 block">{emergencyCount}</span>
        </div>
      </div>

      {/* Senior Profile & Hardware Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Senior Record */}
        <div className="bg-white rounded-3xl p-6 shadow-md border-2 border-slate-200 space-y-4">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            Registered Senior Node
          </h2>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-sm">
            <div className="flex justify-between border-b pb-1">
              <span className="text-slate-500">Name:</span>
              <span className="font-bold text-slate-900">{senior.name} (Age {senior.age})</span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span className="text-slate-500">Location:</span>
              <span className="font-bold text-slate-900">{senior.locationName}</span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span className="text-slate-500">Primary Caregiver:</span>
              <span className="font-bold text-slate-900">{senior.primaryCaregiverName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Today Check-In:</span>
              <span className="font-bold text-emerald-700">{checkIn.status}</span>
            </div>
          </div>
        </div>

        {/* Infrastructure & Gateways */}
        <div className="bg-white rounded-3xl p-6 shadow-md border-2 border-slate-200 space-y-4">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Server className="w-5 h-5 text-purple-600" />
            Integration Gateways
          </h2>

          <div className="space-y-2 text-sm">
            <div className="p-3 bg-slate-50 border rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-emerald-600" />
                <span className="font-bold text-slate-800">ESP32 BLE / WebSocket Bridge</span>
              </div>
              <span className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-bold">READY</span>
            </div>

            <div className="p-3 bg-slate-50 border rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span className="font-bold text-slate-800">WhatsApp Meta Cloud Gateway</span>
              </div>
              <span className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-bold">SIMULATED</span>
            </div>

            <div className="p-3 bg-slate-50 border rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-blue-600" />
                <span className="font-bold text-slate-800">Supabase / PostgreSQL Adapter</span>
              </div>
              <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full font-bold">PLUGGABLE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
