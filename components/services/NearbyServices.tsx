'use client';

import React, { useState } from 'react';
import { useSaathi } from '@/context/SaathiContext';
import { 
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
  Info,
  Car
} from 'lucide-react';
import { locationService } from '@/services/locationService';
import { ServiceCategory } from '@/types';

export const NearbyServices: React.FC = () => {
  const { tSenior } = useSaathi();

  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [coords, setCoords] = useState(locationService.getCoordinates());
  const [isLocating, setIsLocating] = useState<boolean>(false);

  const services = locationService.getServices(selectedCategory, searchQuery);

  const handleGetLiveLocation = async () => {
    setIsLocating(true);
    const newCoords = await locationService.requestBrowserLocation();
    setCoords(newCoords);
    setIsLocating(false);
  };

  const categories: Array<{ id: ServiceCategory | 'all'; labelKey: string; icon: React.ElementType }> = [
    { id: 'all', labelKey: 'services.all', icon: Building2 },
    { id: 'hospitals', labelKey: 'services.hospitals', icon: Building2 },
    { id: 'ambulance', labelKey: 'services.ambulance', icon: Truck },
    { id: 'pharmacy', labelKey: 'services.pharmacy', icon: Pill },
    { id: 'senior_centres', labelKey: 'services.senior_centres', icon: Users },
    { id: 'home_care', labelKey: 'services.home_care', icon: HeartHandshake },
    { id: 'transport', labelKey: 'services.transport', icon: Car },
    { id: 'government_welfare', labelKey: 'services.government_welfare', icon: ShieldCheck },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 sm:py-6 space-y-6 pb-28">
      {/* Header */}
      <header className="bg-white rounded-3xl p-6 shadow-md border-2 border-slate-200 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-black uppercase tracking-wider">
              Essential Assistance
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {tSenior('services.title')}
            </h1>
            <p className="text-sm text-slate-600 font-medium">
              {tSenior('services.subtitle')}
            </p>
          </div>

          <button
            type="button"
            onClick={handleGetLiveLocation}
            disabled={isLocating}
            className="p-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-900 rounded-2xl flex items-center gap-2 font-bold text-xs sm:text-sm active:scale-95 transition-all self-start sm:self-auto shrink-0"
          >
            <MapPin className={`w-4 h-4 text-blue-600 ${isLocating ? 'animate-bounce' : ''}`} />
            <span>{isLocating ? 'Locating...' : `GPS: ${coords.locationName}`}</span>
          </button>
        </div>

        {/* Demo Notice */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Info className="w-4 h-4 text-blue-600 shrink-0" />
          <span>{tSenior('services.locationNotice')}</span>
        </div>
      </header>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-6 h-6 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={tSenior('services.searchPlaceholder')}
          className="w-full p-4 pl-14 bg-white border-2 border-slate-200 rounded-2xl font-medium text-slate-800 focus:outline-none focus:border-blue-600 shadow-sm"
        />
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-sm whitespace-nowrap flex items-center gap-2 transition-all active:scale-95 shrink-0 ${
                isSelected
                  ? 'bg-blue-900 text-white shadow-md'
                  : 'bg-white border-2 border-slate-200 text-slate-700 hover:border-slate-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tSenior(cat.labelKey)}</span>
            </button>
          );
        })}
      </div>

      {/* Services List */}
      <div className="space-y-4">
        {services.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border-2 border-slate-200 text-slate-500">
            <Building2 className="w-12 h-12 mx-auto mb-2 opacity-50 text-slate-400" />
            <p className="text-lg font-bold">No services found matching your query.</p>
          </div>
        ) : (
          services.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 shadow-md border-2 border-slate-200 hover:border-blue-300 transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-blue-100 text-blue-900 uppercase">
                      {item.category.replace('_', ' ')}
                    </span>
                    {item.verified && (
                      <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        {tSenior('services.verifiedBadge')}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                    {item.name}
                  </h3>
                  <p className="text-sm text-slate-600 font-medium flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{item.address}</span>
                  </p>
                </div>

                {/* Distance Badge */}
                <div className="px-3.5 py-1.5 bg-blue-50 border border-blue-200 text-blue-900 rounded-2xl font-black text-sm self-start shrink-0">
                  {item.distanceKm} {tSenior('services.distance')}
                </div>
              </div>

              {/* Timing */}
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>{item.openHours}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2 border-t">
                <a
                  href={`tel:${item.phone}`}
                  className="flex-1 p-3.5 bg-blue-900 hover:bg-blue-800 text-white rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span>{tSenior('services.callNow')}</span>
                </a>

                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${item.latitude},${item.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 border border-slate-200 active:scale-98 transition-all"
                >
                  <Navigation className="w-4 h-4" />
                  <span className="hidden sm:inline">{tSenior('services.getDirections')}</span>
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
