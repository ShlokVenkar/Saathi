'use client';

import React, { useEffect, useState } from 'react';
import { Download, X } from 'lucide-react';
import { useSaathi } from '@/context/SaathiContext';

export const PwaInstallBanner: React.FC = () => {
  const { tSenior } = useSaathi();
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Register Service Worker
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          registration.update().catch(() => {});
        })
        .catch(() => {
          // SW registration failed
        });
    }

    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstallable(false);
    }
    setDeferredPrompt(null);
  };

  if (!isInstallable || isDismissed) return null;

  return (
    <aside 
      aria-label="Install SAATHI App"
      className="fixed bottom-3 left-4 right-4 z-40 max-w-lg mx-auto bg-slate-900 text-white p-4 rounded-3xl shadow-2xl border-2 border-blue-500 flex items-center justify-between gap-3 animate-slide-up"
    >
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-blue-600 rounded-2xl text-white">
          <Download className="w-5 h-5" />
        </div>
        <div>
          <span className="font-black text-sm block">Install SAATHI App</span>
          <span className="text-xs text-slate-300">Fast 1-touch access & offline safety</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleInstall}
          className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-black shadow-md active:scale-95 transition-all"
        >
          {tSenior('common.installApp')}
        </button>
        <button
          type="button"
          onClick={() => setIsDismissed(true)}
          className="p-1.5 text-slate-400 hover:text-white rounded-lg"
          aria-label="Dismiss installation banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
