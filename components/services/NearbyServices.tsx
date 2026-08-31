'use client';

import React, { useState } from 'react';
import { useSaathi } from '@/context/SaathiContext';
import { 
  ArrowLeft,
  MapPin, 
  Search, 
  Phone, 
  Navigation, 
  Building2, 
  Truck, 
  ShieldCheck, 
  Pill, 
  HeartHandshake, 
  Users, 
  Clock,
  Car,
  Volume2
} from 'lucide-react';
import { locationService } from '@/services/locationService';
import { ServiceCategory } from '@/types';

interface NearbyServicesProps {
  onBack?: () => void;
}

export const NearbyServices: React.FC<NearbyServicesProps> = ({ onBack }) => {
  const { tSenior, readAloud } = useSaathi();

  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [coords, setCoords] = useState(locationService.getCoordinates());

  const services = locationService.getServices(selectedCategory, searchQuery);

  const categories: Array<{ id: ServiceCategory | 'all'; labelKey: string; icon: string }> = [
    { id: 'all', labelKey: 'services.all', icon: '🏢' },
    { id: 'hospitals', labelKey: 'services.hospitals', icon: '🏥' },
    { id: 'ambulance', labelKey: 'services.ambulance', icon: '🚑' },
    { id: 'pharmacy', labelKey: 'services.pharmacy', icon: '💊' },
    { id: 'senior_centres', labelKey: 'services.senior_centres', icon: '👴' },
    { id: 'home_care', labelKey: 'services.home_care', icon: '🩺' },
    { id: 'transport', labelKey: 'services.transport', icon: '🚖' },
  ];

  const handleReadScreen = () => {
    const text = `${tSenior('services.title')}. ${services.length} ${tSenior('services.subtitle')}`;
    readAloud(text);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 sm:py-6 space-y-6 pb-28">
      {/* Top Bar with Back Button & Listen */}
      <div className="flex items-center justify-between gap-3">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="px-5 py-3 bg-slate-200 hover:bg-slate-300 text-slate-900 rounded-2xl font-black text-lg sm:text-xl flex items-center gap-2 active:scale-95 transition-all shadow-sm"
          >
            <ArrowLeft className="w-6 h-6" />
            <span>{tSenior('common.back')}</span>
          </button>
        )}

        <button
          type="button"
          onClick={handleReadScreen}
          className="p-3 bg-blue-100 hover:bg-blue-200 text-blue-950 rounded-2xl font-black text-sm flex items-center gap-1.5 active:scale-95 transition-all ml-auto"
        >
          <Volume2 className="w-5 h-5 text-blue-800" />
          <span>{tSenior('common.readAloud')}</span>
        </button>
      </div>

      {/* Screen Header */}
      <header className="bg-white rounded-3xl p-6 shadow-md border-3 border-cyan-200 space-y-1">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          {tSenior('services.title')}
        </h1>
        <p className="text-base sm:text-lg text-slate-600 font-medium">
          {tSenior('services.subtitle')}
        </p>
      </header>

      {/* Large Category Buttons */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-3 rounded-2xl font-black text-base whitespace-nowrap flex items-center gap-2 transition-all active:scale-95 shrink-0 ${
                isSelected
                  ? 'bg-blue-900 text-white shadow-lg scale-105 border-2 border-blue-700'
                  : 'bg-white border-3 border-slate-200 text-slate-800 hover:border-slate-400'
              }`}
            >
              <span className="text-xl">{cat.icon}</span>
              <span>{tSenior(cat.labelKey)}</span>
            </button>
          );
        })}
      </div>

      {/* Services List */}
      <div className="space-y-4">
        {services.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl p-6 shadow-md border-3 border-slate-200 space-y-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                  {item.name}
                </h3>
                <p className="text-base text-slate-600 font-bold flex items-center gap-1.5 pt-1">
                  <MapPin className="w-5 h-5 text-slate-400 shrink-0" />
                  <span>{item.address}</span>
                </p>
              </div>

              {/* Distance Badge */}
              <div className="px-3.5 py-2 bg-blue-100 text-blue-950 rounded-2xl font-black text-base shrink-0 border border-blue-300">
                {item.distanceKm} {tSenior('services.distance')}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
              <a
                href={`tel:${item.phone}`}
                className="flex-1 p-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-xl flex items-center justify-center gap-3 shadow-lg active:scale-98 transition-all border-2 border-emerald-400"
              >
                <Phone className="w-6 h-6" />
                <span>{tSenior('services.callNow')}</span>
              </a>

              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${item.latitude},${item.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-2xl font-bold text-base flex items-center justify-center gap-2 border border-slate-300 active:scale-98 transition-all"
              >
                <Navigation className="w-5 h-5" />
                <span>{tSenior('services.getDirections')}</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
