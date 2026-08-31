'use client';

import React, { useState } from 'react';
import { useSaathi } from '@/context/SaathiContext';
import { 
  Cpu, 
  Radio, 
  Hand, 
  Sliders, 
  Zap, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  Activity,
  AlertTriangle,
  Utensils,
  CupSoda,
  Pill,
  Users
} from 'lucide-react';
import { GESTURE_MAPPINGS } from '@/data/gestures';

export const HardwareSimulator: React.FC = () => {
  const { 
    device, 
    updateFlexSensor, 
    togglePIR, 
    simulateHardwareGesture, 
    resetSensors, 
    tFamily 
  } = useSaathi();

  const [lastTriggered, setLastTriggered] = useState<string | null>(null);

  const handleSimulate = (gestureId: string, name: string) => {
    simulateHardwareGesture(gestureId);
    setLastTriggered(name);
    setTimeout(() => setLastTriggered(null), 4000);
  };

  const isMotion = device.pirStatus === 'MOTION_DETECTED';

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 sm:py-6 space-y-6 pb-28">
      {/* Top Banner */}
      <header className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-purple-600/30 text-purple-300 rounded-full text-xs font-black uppercase tracking-wider border border-purple-500/30 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" />
                Hardware Node Simulator
              </span>
              <span className="text-xs px-2.5 py-0.5 bg-emerald-900/60 text-emerald-300 rounded-full font-bold">
                ESP32 Online
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              ESP32 + Flex Sensors + PIR Simulator
            </h1>
            <p className="text-sm text-slate-400 font-medium">
              Interactive test bench for hackathon judges to evaluate physical assistive glove & room presence signals.
            </p>
          </div>

          <button
            type="button"
            onClick={resetSensors}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 border border-slate-700 active:scale-95 shrink-0"
          >
            <RotateCcw className="w-4 h-4" />
            Reset All Sensors
          </button>
        </div>

        {lastTriggered && (
          <div className="p-3.5 bg-purple-900/60 border border-purple-400 rounded-2xl flex items-center gap-2.5 text-purple-100 font-bold text-sm animate-pulse">
            <Sparkles className="w-5 h-5 text-purple-300 shrink-0" />
            <span>Hardware Gesture Event Dispatched: <strong>{lastTriggered}</strong></span>
          </div>
        )}
      </header>

      {/* QUICK PRESET TRIGGER BUTTONS FOR JUDGES */}
      <section className="bg-gradient-to-br from-purple-900 to-indigo-950 text-white rounded-3xl p-6 shadow-xl border-2 border-purple-500/40 space-y-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black flex items-center gap-2">
            <Zap className="w-6 h-6 text-amber-400" />
            1-Click Gesture Simulators (Judge Demo)
          </h2>
          <p className="text-xs sm:text-sm text-purple-200 font-medium mt-0.5">
            Click any button below to simulate finger bending patterns. Observe instant sync on Senior & Family dashboards.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {/* Hungry */}
          <button
            type="button"
            onClick={() => handleSimulate('gesture-hungry', 'I AM HUNGRY')}
            className="p-4 bg-purple-800/60 hover:bg-purple-700/80 active:scale-98 border border-purple-400/40 rounded-2xl text-left flex items-center gap-3 transition-all shadow-md"
          >
            <div className="p-3 bg-amber-500 text-slate-900 rounded-xl shrink-0 font-bold">
              <Utensils className="w-6 h-6" />
            </div>
            <div>
              <span className="font-black text-base block">Simulate: I Am Hungry</span>
              <span className="text-xs text-purple-200">Index + Middle Bent</span>
            </div>
          </button>

          {/* Thirsty */}
          <button
            type="button"
            onClick={() => handleSimulate('gesture-thirsty', 'I AM THIRSTY')}
            className="p-4 bg-purple-800/60 hover:bg-purple-700/80 active:scale-98 border border-purple-400/40 rounded-2xl text-left flex items-center gap-3 transition-all shadow-md"
          >
            <div className="p-3 bg-cyan-500 text-slate-900 rounded-xl shrink-0 font-bold">
              <CupSoda className="w-6 h-6" />
            </div>
            <div>
              <span className="font-black text-base block">Simulate: I Am Thirsty</span>
              <span className="text-xs text-purple-200">Index Finger Bent</span>
            </div>
          </button>

          {/* Medicine */}
          <button
            type="button"
            onClick={() => handleSimulate('gesture-medicine', 'MEDICINE TIME')}
            className="p-4 bg-purple-800/60 hover:bg-purple-700/80 active:scale-98 border border-purple-400/40 rounded-2xl text-left flex items-center gap-3 transition-all shadow-md"
          >
            <div className="p-3 bg-rose-500 text-white rounded-xl shrink-0 font-bold">
              <Pill className="w-6 h-6" />
            </div>
            <div>
              <span className="font-black text-base block">Simulate: Medicine</span>
              <span className="text-xs text-purple-200">Index + Thumb Pinch</span>
            </div>
          </button>

          {/* Family */}
          <button
            type="button"
            onClick={() => handleSimulate('gesture-family', 'CALL FAMILY')}
            className="p-4 bg-purple-800/60 hover:bg-purple-700/80 active:scale-98 border border-purple-400/40 rounded-2xl text-left flex items-center gap-3 transition-all shadow-md"
          >
            <div className="p-3 bg-emerald-500 text-slate-900 rounded-xl shrink-0 font-bold">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <span className="font-black text-base block">Simulate: Call Family</span>
              <span className="text-xs text-purple-200">Open Palm Hold</span>
            </div>
          </button>

          {/* Emergency SOS */}
          <button
            type="button"
            onClick={() => handleSimulate('gesture-sos', 'EMERGENCY SOS')}
            className="p-4 bg-red-900/70 hover:bg-red-800/80 active:scale-98 border-2 border-red-500 rounded-2xl text-left flex items-center gap-3 transition-all shadow-lg sm:col-span-2 lg:col-span-2"
          >
            <div className="p-3 bg-red-600 text-white rounded-xl shrink-0 font-bold">
              <AlertTriangle className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="font-black text-base block text-red-200">Simulate: Emergency SOS</span>
              <span className="text-xs text-red-300">All 4 Flex Sensors Bent (Fist Clench)</span>
            </div>
          </button>
        </div>
      </section>

      {/* VISUAL ESP32 BOARD & INTERACTIVE SLIDERS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ESP32 Hardware Schematic Card */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-md border-2 border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-lg flex items-center gap-2">
              <Cpu className="w-5 h-5 text-purple-400" />
              ESP32-WROOM-32
            </h3>
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></span>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs space-y-2 text-slate-300">
            <div className="flex justify-between border-b border-slate-800 pb-1">
              <span>Firmware:</span>
              <span className="text-emerald-400">v2.4 (BLE+WiFi)</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-1">
              <span>Baud Rate:</span>
              <span className="text-blue-400">115200 bps</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-1">
              <span>ADC Resolution:</span>
              <span className="text-amber-400">12-bit (0-4095)</span>
            </div>
            <div className="flex justify-between">
              <span>Battery Rail:</span>
              <span className="text-emerald-400">3.7V LiPo (88%)</span>
            </div>
          </div>

          {/* PIR Motion Toggle Card */}
          <div className="bg-slate-800 p-4 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Radio className={`w-5 h-5 ${isMotion ? 'text-emerald-400 animate-pulse' : 'text-slate-400'}`} />
                <span className="font-bold text-sm">HC-SR501 PIR Sensor</span>
              </div>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                isMotion ? 'bg-emerald-900 text-emerald-300' : 'bg-slate-700 text-slate-400'
              }`}>
                {isMotion ? 'Motion Active' : 'Idle'}
              </span>
            </div>

            <p className="text-xs text-slate-400">
              Simulates room motion / ambient presence without camera invasion.
            </p>

            <button
              type="button"
              onClick={togglePIR}
              className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                isMotion 
                  ? 'bg-amber-600 hover:bg-amber-500 text-white' 
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white'
              }`}
            >
              <Radio className="w-4 h-4" />
              {isMotion ? 'Simulate No Movement (Idle)' : 'Simulate Motion Detected'}
            </button>
          </div>
        </div>

        {/* 4 Flex Sensor Interactive Sliders */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-md border-2 border-slate-200 space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <h3 className="font-black text-xl text-slate-900 flex items-center gap-2">
                <Sliders className="w-5 h-5 text-blue-600" />
                Live Flex Sensor Sliders
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Drag the sliders to test custom finger bend angles and dynamic gesture triggers.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {device.flexSensors.map((sensor) => {
              return (
                <div 
                  key={sensor.sensorId}
                  className={`p-4 rounded-2xl border-2 transition-all space-y-2 ${
                    sensor.isBent ? 'bg-purple-50 border-purple-400' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-sm font-bold">
                    <span className="text-slate-800 flex items-center gap-2">
                      <Hand className="w-4 h-4 text-purple-600" />
                      {sensor.name}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-black ${
                      sensor.isBent ? 'bg-purple-600 text-white' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {sensor.isBent ? 'BENT (Triggered)' : 'STRAIGHT (Rest)'}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="0"
                      max="1023"
                      value={sensor.value}
                      onChange={(e) => updateFlexSensor(sensor.sensorId, parseInt(e.target.value))}
                      className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                    />
                    <span className="font-mono text-sm font-bold text-slate-700 w-12 text-right">
                      {sensor.value}
                    </span>
                  </div>

                  <div className="flex justify-between text-xs text-slate-400 font-medium">
                    <span>Rest (0)</span>
                    <span>Threshold: {sensor.threshold}</span>
                    <span>Max Bend (1023)</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
