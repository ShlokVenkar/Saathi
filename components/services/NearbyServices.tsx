'use client';

import React, { useState, useEffect } from 'react';
import { useSaathi } from '@/context/SaathiContext';
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  Navigation, 
  Hospital, 
  Pill, 
  Siren, 
  Shield, 
  HeartHandshake, 
  Car,
  Volume2,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { ServiceCategory, ServiceLocation } from '@/types';
import { MOCK_SERVICES } from '@/data/mockData';

interface NearbyServicesProps {
  onBack: () => void;
}

const CATEGORY_TABS: Array<{ id: ServiceCategory | 'ALL'; label: string; icon: React.ElementType; mapQuery: string }> = [
  { id: 'ALL', label: 'सर्व (All)', icon: Sparkles, mapQuery: 'emergency services near me' },
  { id: 'hospitals', label: '🏥 दवाखाने (Hospitals)', icon: Hospital, mapQuery: 'hospitals near me' },
  { id: 'pharmacy', label: '💊 औषध दुकाने (Pharmacy)', icon: Pill, mapQuery: 'pharmacy near me' },
  { id: 'ambulance', label: '🚑 रुग्णवाहिका (Ambulance)', icon: Siren, mapQuery: 'ambulance near me' },
  { id: 'senior_centres', label: '🏠 ज्येष्ठ नागरिक केंद्र (Senior Care)', icon: HeartHandshake, mapQuery: 'senior care center near me' },
  { id: 'transport', label: '🚕 वाहतूक (Transport)', icon: Car, mapQuery: 'auto taxi stand near me' },
];

export const NearbyServices: React.FC<NearbyServicesProps> = ({ onBack }) => {
  const { senior, tSenior, readAloud } = useSaathi();
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | 'ALL'>('ALL');
  const [gpsStatus, setGpsStatus] = useState<'LOCATING' | 'FOUND' | 'FALLBACK'>('LOCATING');
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number }>({
    lat: senior.latitude,
    lng: senior.longitude
  });

  // Try browser Geolocation with safe fallback
  useEffect(() => {
    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setGpsStatus('FOUND');
        },
        () => {
          // Graceful fallback to Pune mock location
          setGpsStatus('FALLBACK');
        },
        { timeout: 5000, enableHighAccuracy: false }
      );
    } else {
      setGpsStatus('FALLBACK');
    }
  }, [senior]);

  const filteredServices = activeCategory === 'ALL'
    ? MOCK_SERVICES
    : MOCK_SERVICES.filter(s => s.category === activeCategory);

  const currentTabInfo = CATEGORY_TABS.find(t => t.id === activeCategory) || CATEGORY_TABS[0];

  const handleOpenGoogleMaps = (query?: string) => {
    const q = query || currentTabInfo.mapQuery;
    const url = `https://www.google.com/maps/search/${encodeURIComponent(q)}/@${userCoords.lat},${userCoords.lng},14z`;
    window.open(url, '_blank');
  };

  const handleReadScreen = () => {
    const text = `जवळची मदत शोधा. दवाखाने, औषध दुकाने आणि आपत्कालीन सेवा. तुमचे स्थान: ${senior.locationName}.`;
    readAloud(text);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6 pb-28">
      {/* Top Header */}
      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2.5 sm:px-5 sm:py-3.5 bg-slate-200 hover:bg-slate-300 text-slate-900 rounded-2xl font-black text-base sm:text-xl flex items-center gap-2 active:scale-95 transition-all shadow-sm border-2 border-slate-300"
        >
          <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          <span>{tSenior('common.back')}</span>
        </button>

        <button
          type="button"
          onClick={handleReadScreen}
          className="px-3.5 py-2.5 sm:p-3.5 bg-blue-100 hover:bg-blue-200 text-blue-950 rounded-2xl font-black text-xs sm:text-base flex items-center gap-1.5 active:scale-95 transition-all border-2 border-blue-300 shadow-sm"
        >
          <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-800 shrink-0" />
          <span>{tSenior('common.readAloud')}</span>
        </button>
      </div>

      {/* Screen Title & GPS Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border-3 border-slate-200 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              जवळची मदत शोधा (Nearby Help)
            </h1>
            <p className="text-base text-slate-600 font-bold mt-1">
              तुमच्या परिसरातील महत्त्वाच्या आरोग्य व सुरक्षा सेवा
            </p>
          </div>

          {/* Direct Google Maps Action Button */}
          <button
            type="button"
            onClick={() => handleOpenGoogleMaps()}
            className="px-5 py-3.5 bg-blue-900 hover:bg-blue-800 text-white rounded-2xl font-black text-base flex items-center justify-center gap-2 shadow-md active:scale-95 shrink-0"
          >
            <MapPin className="w-5 h-5 text-amber-400" />
            <span>📍 Google Maps वर शोधा</span>
          </button>
        </div>

        {/* Location Status Pill */}
        <div className="p-3 bg-slate-100 rounded-2xl flex items-center justify-between text-xs sm:text-sm font-bold text-slate-700 border border-slate-200">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
            <span>स्थान: <strong>{senior.locationName}</strong></span>
          </div>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-black ${
            gpsStatus === 'FOUND' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
          }`}>
            {gpsStatus === 'FOUND' ? '🟢 Live GPS' : '📍 शहर स्थान (Default)'}
          </span>
        </div>
      </div>

      {/* Categories Horizontal Selector */}
      <div className="space-y-2">
        <span className="text-xs font-black text-slate-500 uppercase tracking-wider px-1 block">
          वर्गवारी निवडा (Select Category):
        </span>
        <div className="flex gap-2.5 overflow-x-auto pb-2 no-scrollbar">
          {CATEGORY_TABS.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-3 rounded-2xl font-black text-sm whitespace-nowrap transition-all shadow-xs active:scale-95 flex items-center gap-2 border-2 shrink-0 ${
                  isSelected
                    ? 'bg-blue-900 text-white border-blue-950 shadow-md'
                    : 'bg-white text-slate-800 border-slate-300 hover:border-slate-400'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-blue-700'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Services List Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xl font-black text-slate-900">
            उपलब्ध सेवा ({filteredServices.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredServices.map((svc) => (
            <div
              key={svc.id}
              className="bg-white rounded-3xl p-5 sm:p-6 shadow-md border-3 border-slate-200 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-900 rounded-full text-xs font-black uppercase">
                    {svc.category.replace('_', ' ')}
                  </span>
                  <span className="text-sm font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    📍 {svc.distanceKm} किमी अंतरावर
                  </span>
                </div>

                <h3 className="text-2xl font-black text-slate-900 pt-1">
                  {svc.name}
                </h3>
                <p className="text-sm text-slate-600 font-medium pt-1">
                  {svc.address}
                </p>
              </div>

              {/* Two Big Action Buttons: Call & Maps */}
              <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-slate-100">
                <a
                  href={`tel:${svc.phone}`}
                  className="p-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-base flex items-center justify-center gap-2 shadow-sm active:scale-95"
                >
                  <Phone className="w-5 h-5" />
                  <span>फोन करा</span>
                </a>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(svc.name + ' ' + svc.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black text-base flex items-center justify-center gap-2 shadow-sm active:scale-95"
                >
                  <Navigation className="w-5 h-5 text-amber-400" />
                  <span>मार्ग (Map)</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
