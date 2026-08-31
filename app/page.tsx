'use client';

import React, { useState } from 'react';
import { useSaathi } from '@/context/SaathiContext';
import { SeniorHome } from '@/components/senior/SeniorHome';
import { SeniorDailyCheckIn } from '@/components/senior/SeniorDailyCheckIn';
import { SeniorFamilyContact } from '@/components/senior/SeniorFamilyContact';
import { SeniorAiCompanion } from '@/components/senior/SeniorAiCompanion';
import { SeniorDevotional } from '@/components/senior/SeniorDevotional';
import { SeniorRequestsView } from '@/components/senior/SeniorRequestsView';
import { NearbyServices } from '@/components/services/NearbyServices';
import { FamilyDashboard } from '@/components/family/FamilyDashboard';
import { HardwareSimulator } from '@/components/hardware/HardwareSimulator';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { DemoSwitcher } from '@/components/layout/DemoSwitcher';
import { PwaInstallBanner } from '@/components/common/PwaInstallBanner';
import { SosModal } from '@/components/senior/SosModal';
import { Smartphone } from 'lucide-react';

export type SeniorViewType = 'home' | 'checkin' | 'family' | 'companion' | 'devotional' | 'services' | 'requests';

export default function HomePage() {
  const { currentRole, setCurrentRole } = useSaathi();
  const [seniorView, setSeniorView] = useState<SeniorViewType>('home');
  const [isSosOpen, setIsSosOpen] = useState(false);

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden flex flex-col bg-slate-100 selection:bg-blue-100 selection:text-blue-900">
      {/* Top Banner when in non-Senior mode (Family / Hardware / Admin) with one-click return */}
      {currentRole !== 'senior' && (
        <div className="bg-slate-900 text-white px-4 py-2.5 flex items-center justify-between text-xs sm:text-sm font-bold border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded font-mono uppercase text-xs">
              JUDGE / DEMO MODE: {currentRole.toUpperCase()}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setCurrentRole('senior')}
            className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold flex items-center gap-1.5 active:scale-95 transition-all"
          >
            <Smartphone className="w-4 h-4" />
            <span>Switch to Senior PWA</span>
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden animate-fade-in">
        {/* SENIOR CITIZEN EXPERIENCE (Clean, Single App Feel) */}
        {currentRole === 'senior' && (
          <>
            {seniorView === 'home' && (
              <SeniorHome onNavigate={(v) => setSeniorView(v)} />
            )}

            {seniorView === 'companion' && (
              <SeniorAiCompanion 
                onBack={() => setSeniorView('home')} 
                onNavigate={(v) => setSeniorView(v)}
              />
            )}

            {seniorView === 'devotional' && (
              <SeniorDevotional onBack={() => setSeniorView('home')} />
            )}

            {seniorView === 'checkin' && (
              <SeniorDailyCheckIn 
                onBack={() => setSeniorView('home')} 
                onTriggerSos={() => setIsSosOpen(true)} 
              />
            )}

            {seniorView === 'family' && (
              <SeniorFamilyContact onBack={() => setSeniorView('home')} />
            )}

            {seniorView === 'services' && (
              <NearbyServices onBack={() => setSeniorView('home')} />
            )}

            {seniorView === 'requests' && (
              <SeniorRequestsView onBack={() => setSeniorView('home')} />
            )}

            {/* Global SOS Modal */}
            <SosModal isOpen={isSosOpen} onClose={() => setIsSosOpen(false)} />
          </>
        )}

        {/* FAMILY CAREGIVER DASHBOARD */}
        {currentRole === 'family' && <FamilyDashboard />}

        {/* HARDWARE GESTURE & SENSOR SIMULATOR (PROTECTED BHAVESH'S WORK) */}
        {currentRole === 'hardware' && <HardwareSimulator />}

        {/* ADMIN & DEVICE REGISTRY */}
        {currentRole === 'admin' && <AdminDashboard />}
      </main>

      {/* Floating Demo Mode Switcher (Discrete for Judges) */}
      <DemoSwitcher />

      {/* PWA Install Banner */}
      <PwaInstallBanner />
    </div>
  );
}
