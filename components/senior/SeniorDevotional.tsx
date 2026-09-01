'use client';

import React, { useState } from 'react';
import { useSaathi } from '@/context/SaathiContext';
import { ArrowLeft, Play, Pause, Volume2, Music, ExternalLink, Sparkles } from 'lucide-react';

interface DevotionalTrack {
  id: string;
  category: string;
  deity: string;
  title: string;
  subtitle: string;
  youtubeId: string;
  icon: string;
}

const DEVOTIONAL_TRACKS: DevotionalTrack[] = [
  {
    id: 'ganpati',
    category: 'गणपती',
    deity: 'Lord Ganesha',
    title: 'सुखकर्ता दुखहर्ता (Sukh Karta Dukh Harta)',
    subtitle: 'गणपती आरती • Ganpati Aarti',
    youtubeId: 'b_7h1b306b4', // Ganpati Aarti
    icon: '🙏'
  },
  {
    id: 'shiv',
    category: 'शिव',
    deity: 'Lord Shiva',
    title: 'ॐ नमः शिवाय (Om Namah Shivaya Dhun)',
    subtitle: 'शांत शिव धून • Peaceful Shiva Chant',
    youtubeId: 'Dmgv_K2Gj-Q',
    icon: '🕉️'
  },
  {
    id: 'krishna',
    category: 'कृष्ण',
    deity: 'Lord Krishna',
    title: 'अच्युतम केशवम (Achyutam Keshavam)',
    subtitle: 'कृष्ण भजन • Krishna Bhajan',
    youtubeId: 'pQZtA_M40v8',
    icon: '🌸'
  },
  {
    id: 'ram',
    category: 'राम',
    deity: 'Lord Rama',
    title: 'श्री रामचंद्र कृपालु भजमन',
    subtitle: 'राम स्तुती • Shri Ram Stuti',
    youtubeId: 'wR6f1X58x5Q',
    icon: '🪔'
  },
  {
    id: 'hanuman',
    category: 'हनुमान',
    deity: 'Lord Hanuman',
    title: 'हनुमान चालीसा (Hanuman Chalisa)',
    subtitle: 'संकट मोचन • Hanuman Chalisa',
    youtubeId: 'AETFvQonfV8',
    icon: '❤️'
  },
  {
    id: 'abhang',
    category: 'मराठी अभंग',
    deity: 'Sant Tukaram',
    title: 'विठू माऊली तू (Vithu Mauli Tu)',
    subtitle: 'मराठी भक्तीगीत • Vithoba Abhang',
    youtubeId: 'Z6K5uX7g254',
    icon: '🎵'
  }
];

interface SeniorDevotionalProps {
  onBack: () => void;
}

export const SeniorDevotional: React.FC<SeniorDevotionalProps> = ({ onBack }) => {
  const { tSenior, readAloud } = useSaathi();
  const [selectedTrack, setSelectedTrack] = useState<DevotionalTrack>(DEVOTIONAL_TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSelectTrack = (track: DevotionalTrack) => {
    setSelectedTrack(track);
    setIsPlaying(true);
    readAloud(`${track.title}. ${track.subtitle}`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6 pb-28">
      {/* Top Header with Back Button */}
      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2.5 sm:px-5 sm:py-3.5 bg-slate-200 hover:bg-slate-300 text-slate-900 rounded-2xl font-black text-base sm:text-xl flex items-center gap-2 active:scale-95 transition-all shadow-sm border-2 border-slate-300"
        >
          <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          <span>{tSenior('common.back')}</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 bg-amber-100 text-amber-900 border border-amber-300 rounded-xl font-black text-xs sm:text-sm flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>भक्ती संगीत</span>
          </span>
        </div>
      </div>

      {/* Title Card */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-3xl p-6 sm:p-8 shadow-lg space-y-1">
        <div className="flex items-center gap-3">
          <span className="text-4xl">🎵</span>
          <div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              भक्तीची गाणी (Devotional Music)
            </h1>
            <p className="text-amber-100 text-base sm:text-lg font-bold">
              शांत, मधुर आणि भक्तीमय गाणी ऐका
            </p>
          </div>
        </div>
      </div>

      {/* Active Music Player / YouTube Embed */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-md border-3 border-amber-200 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3.5">
            <span className="text-4xl sm:text-5xl p-3 bg-amber-100 rounded-2xl shrink-0">
              {selectedTrack.icon}
            </span>
            <div>
              <span className="text-xs font-black text-amber-800 uppercase tracking-wider bg-amber-100 px-2.5 py-0.5 rounded-full">
                {selectedTrack.category}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                {selectedTrack.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 font-bold">
                {selectedTrack.subtitle}
              </p>
            </div>
          </div>

          <a
            href={`https://www.youtube.com/watch?v=${selectedTrack.youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-black text-sm flex items-center justify-center gap-2 shadow-sm active:scale-95 w-fit"
          >
            <ExternalLink className="w-4 h-4" />
            <span>YouTube वर उघडा</span>
          </a>
        </div>

        {/* Video / Audio Embed */}
        <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-inner bg-slate-900 border-2 border-slate-800">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${selectedTrack.youtubeId}?autoplay=${isPlaying ? 1 : 0}&rel=0`}
            title={selectedTrack.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* List of Devotional Categories / Tracks */}
      <div className="space-y-3">
        <h3 className="text-2xl font-black text-slate-900 px-1">
          इतर गाणी निवडा (Choose Another Song)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {DEVOTIONAL_TRACKS.map((track) => {
            const isSelected = selectedTrack.id === track.id;
            return (
              <button
                key={track.id}
                type="button"
                onClick={() => handleSelectTrack(track)}
                className={`p-5 rounded-3xl border-3 text-left transition-all active:scale-97 shadow-sm flex items-center gap-4 ${
                  isSelected
                    ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-400'
                    : 'bg-white hover:bg-slate-50 border-slate-200'
                }`}
              >
                <span className="text-3xl p-3 bg-amber-100 rounded-2xl shrink-0">
                  {track.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-black text-amber-800 uppercase block">
                    {track.category}
                  </span>
                  <span className="text-lg font-black text-slate-900 block truncate">
                    {track.title}
                  </span>
                  <span className="text-xs text-slate-600 font-bold block truncate mt-0.5">
                    {track.subtitle}
                  </span>
                </div>
                <div className={`p-2.5 rounded-full shrink-0 ${isSelected ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-700'}`}>
                  <Play className="w-5 h-5 fill-current" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
