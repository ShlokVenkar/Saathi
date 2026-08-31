'use client';

import React, { useState } from 'react';
import { useSaathi } from '@/context/SaathiContext';
import { RoleSwitcher } from '@/components/layout/RoleSwitcher';
import { SeniorHome } from '@/components/senior/SeniorHome';
import { FamilyDashboard } from '@/components/family/FamilyDashboard';
import { HardwareSimulator } from '@/components/hardware/HardwareSimulator';
import { DocumentExplainer } from '@/components/explainer/DocumentExplainer';
import { NearbyServices } from '@/components/services/NearbyServices';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { PwaInstallBanner } from '@/components/common/PwaInstallBanner';

export default function HomePage() {
  const { currentRole } = useSaathi();
  const [seniorView, setSeniorView] = useState<'home' | 'services' | 'explainer'>('home');

  return (
    <div className="min-h-screen flex flex-col bg-slate-100/60 selection:bg-blue-100 selection:text-blue-900">
      {/* Top Header & Role Switcher */}
      <RoleSwitcher 
        currentView={seniorView} 
        onNavigateView={(view) => setSeniorView(view)} 
      />

      {/* Main Content Area based on Active Role & View */}
      <main className="flex-1 w-full animate-fade-in">
        {currentRole === 'senior' && (
          <>
            {seniorView === 'home' && (
              <SeniorHome onNavigateTab={(tab) => setSeniorView(tab)} />
            )}
            {seniorView === 'services' && <NearbyServices />}
            {seniorView === 'explainer' && <DocumentExplainer />}
          </>
        )}

        {currentRole === 'family' && <FamilyDashboard />}

        {currentRole === 'hardware' && <HardwareSimulator />}

        {currentRole === 'admin' && <AdminDashboard />}
      </main>

      {/* PWA Install Banner */}
      <PwaInstallBanner />
    </div>
  );
}
