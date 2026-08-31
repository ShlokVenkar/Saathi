'use client';

import React from 'react';
import { useSaathi } from '@/context/SaathiContext';
import { X, Cpu, Wifi, BatteryCharging, Radio, CheckCircle, Hand } from 'lucide-react';

interface SeniorDeviceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SeniorDeviceModal: React.FC<SeniorDeviceModalProps> = ({ isOpen, onClose }) => {
  const { tSenior, device } = useSaathi();

  if (!isOpen) return null;

  const isConnected = device.connectionState === 'CONNECTED';
  const isMotionDetected = device.pirStatus === 'MOTION_DETECTED';

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-2 border-slate-200 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-2xl text-purple-800">
              <Cpu className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                {tSenior('seniorHome.cardDevice')}
              </h2>
              <p className="text-sm text-slate-500 font-medium">{device.name}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Status Indicators */}
        <div className="space-y-4">
          {/* Main Connection Status */}
          <div className={`p-4 rounded-2xl border-2 flex items-center justify-between ${
            isConnected ? 'bg-emerald-50 border-emerald-300' : 'bg-amber-50 border-amber-300'
          }`}>
            <div className="flex items-center gap-3">
              <Wifi className={`w-7 h-7 ${isConnected ? 'text-emerald-600' : 'text-amber-600'}`} />
              <div>
                <span className="text-lg font-black text-slate-900 block">
                  {isConnected ? tSenior('common.connected') : tSenior('common.simulation')}
                </span>
                <span className="text-xs text-slate-600">ESP32 BLE / WiFi Gateway</span>
              </div>
            </div>
            <span className="px-3 py-1 bg-emerald-600 text-white font-bold rounded-xl text-sm flex items-center gap-1">
              <CheckCircle className="w-4 h-4" /> Active
            </span>
          </div>

          {/* PIR Room Sensor Card */}
          <div className="p-4 rounded-2xl border-2 border-slate-200 bg-slate-50 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Radio className="w-6 h-6 text-indigo-600" />
                <span className="font-bold text-slate-800 text-lg">PIR Room Monitor</span>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                isMotionDetected ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
              }`}>
                {isMotionDetected ? tSenior('hardware.pirStateDetected') : tSenior('hardware.pirStateNoMotion')}
              </span>
            </div>
            <p className="text-xs text-slate-500">
              {tSenior('hardware.pirDescription')}
            </p>
          </div>

          {/* Flex Glove Status */}
          <div className="p-4 rounded-2xl border-2 border-slate-200 bg-slate-50 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Hand className="w-6 h-6 text-purple-600" />
                <span className="font-bold text-slate-800 text-lg">Flex Assistive Glove</span>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-purple-100 text-purple-800">
                4 Flex Channels Online
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2 pt-1">
              {device.flexSensors.map((s) => (
                <div key={s.sensorId} className={`p-2 rounded-xl text-center border ${
                  s.isBent ? 'bg-purple-200 border-purple-400 font-bold' : 'bg-white border-slate-200'
                }`}>
                  <span className="text-xs block text-slate-600">S{s.sensorId}</span>
                  <span className="text-xs font-mono">{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Battery & Telemetry */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-100 rounded-2xl text-sm font-medium text-slate-700">
            <div className="flex items-center gap-2">
              <BatteryCharging className="w-5 h-5 text-emerald-600" />
              <span>{tSenior('hardware.batteryLevel')}: <strong>{device.batteryPercent}%</strong></span>
            </div>
            <span>{tSenior('hardware.rssi')}: <strong>{device.rssiSignalStrength} dBm</strong></span>
          </div>
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
