'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { 
  UserRole, 
  Language, 
  SeniorProfile, 
  CaregiverProfile, 
  RequestItem, 
  CheckInRecord, 
  DeviceStatus, 
  NotificationItem, 
  RequestType, 
  RequestSource 
} from '@/types';
import { userService } from '@/services/userService';
import { requestService } from '@/services/requestService';
import { deviceService } from '@/services/deviceService';
import { notificationService, WhatsAppSimulationMessage } from '@/services/notificationService';
import { getTranslation } from '@/lib/i18n';

interface SaathiContextType {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  senior: SeniorProfile;
  caregiver: CaregiverProfile;
  seniorLang: Language;
  caregiverLang: Language;
  setSeniorLanguage: (lang: Language) => void;
  setCaregiverLanguage: (lang: Language) => void;
  requests: RequestItem[];
  device: DeviceStatus;
  checkIn: CheckInRecord;
  notifications: NotificationItem[];
  whatsAppMsg: WhatsAppSimulationMessage | null;
  createRequest: (type: RequestType, source?: RequestSource, message?: string) => RequestItem;
  acknowledgeRequest: (id: string) => void;
  resolveRequest: (id: string) => void;
  submitCheckIn: (mood?: 'GOOD' | 'NEUTRAL' | 'NEED_HELP') => void;
  resetCheckIn: () => void;
  simulateHardwareGesture: (gestureId: string) => void;
  updateFlexSensor: (sensorId: number, val: number) => void;
  togglePIR: () => void;
  resetSensors: () => void;
  readAloud: (text: string, lang?: Language) => void;
  tSenior: (key: string, params?: Record<string, string | number>) => string;
  tFamily: (key: string, params?: Record<string, string | number>) => string;
}

const SaathiContext = createContext<SaathiContextType | undefined>(undefined);

export const SaathiProvider = ({ children }: { children: ReactNode }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('senior');
  const [senior, setSenior] = useState<SeniorProfile>(userService.getSenior());
  const [caregiver, setCaregiver] = useState<CaregiverProfile>(userService.getCaregiver());
  const [seniorLang, setSeniorLangState] = useState<Language>(senior.language || 'mr');
  const [caregiverLang, setCaregiverLangState] = useState<Language>(caregiver.language || 'en');
  const [requests, setRequests] = useState<RequestItem[]>(requestService.getRequests());
  const [device, setDevice] = useState<DeviceStatus>(deviceService.getStatus());
  const [checkIn, setCheckIn] = useState<CheckInRecord>(userService.getCheckIn());
  const [notifications, setNotifications] = useState<NotificationItem[]>(notificationService.getNotifications());
  const [whatsAppMsg, setWhatsAppMsg] = useState<WhatsAppSimulationMessage | null>(notificationService.getLastWhatsAppMessage());

  // Subscribe to service changes
  useEffect(() => {
    const unsubUser = userService.subscribe(() => {
      const s = userService.getSenior();
      const c = userService.getCaregiver();
      setSenior(s);
      setCaregiver(c);
      setSeniorLangState(s.language);
      setCaregiverLangState(c.language);
      setCheckIn(userService.getCheckIn());
    });

    const unsubRequests = requestService.subscribe((reqs) => {
      setRequests(reqs);
    });

    const unsubDevice = deviceService.subscribe((dev) => {
      setDevice(dev);
    });

    const unsubNotifs = notificationService.subscribe((notifs) => {
      setNotifications(notifs);
    });

    const unsubWA = notificationService.subscribeWhatsApp((msg) => {
      setWhatsAppMsg(msg);
    });

    return () => {
      unsubUser();
      unsubRequests();
      unsubDevice();
      unsubNotifs();
      unsubWA();
    };
  }, []);

  const setSeniorLanguage = useCallback((lang: Language) => {
    userService.setSeniorLanguage(lang);
    setSeniorLangState(lang);
  }, []);

  const setCaregiverLanguage = useCallback((lang: Language) => {
    userService.setCaregiverLanguage(lang);
    setCaregiverLangState(lang);
  }, []);

  const createRequest = useCallback((type: RequestType, source: RequestSource = 'APP', message?: string) => {
    const req = requestService.createRequest(type, source, senior.name, message);
    notificationService.notifyFromRequest(req);
    return req;
  }, [senior.name]);

  const acknowledgeRequest = useCallback((id: string) => {
    requestService.acknowledgeRequest(id, caregiver.name);
  }, [caregiver.name]);

  const resolveRequest = useCallback((id: string) => {
    requestService.resolveRequest(id, caregiver.name);
  }, [caregiver.name]);

  const submitCheckIn = useCallback((mood: 'GOOD' | 'NEUTRAL' | 'NEED_HELP' = 'GOOD') => {
    userService.submitCheckIn(mood);
  }, []);

  const resetCheckIn = useCallback(() => {
    userService.resetCheckInForDemo();
  }, []);

  const simulateHardwareGesture = useCallback((gestureId: string) => {
    deviceService.triggerPresetGesture(gestureId);
  }, []);

  const updateFlexSensor = useCallback((sensorId: number, val: number) => {
    deviceService.updateFlexSensor(sensorId, val);
  }, []);

  const togglePIR = useCallback(() => {
    deviceService.togglePIRMotion();
  }, []);

  const resetSensors = useCallback(() => {
    deviceService.resetAllSensors();
  }, []);

  // Web Speech API Voice Feedback
  const readAloud = useCallback((text: string, lang?: Language) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      const targetLang = lang || seniorLang;
      if (targetLang === 'mr') utterance.lang = 'mr-IN';
      else if (targetLang === 'hi') utterance.lang = 'hi-IN';
      else utterance.lang = 'en-IN';
      utterance.rate = 0.9; // slightly slower for clarity
      window.speechSynthesis.speak(utterance);
    } catch {
      // Audio speech synthesis not available or blocked
    }
  }, [seniorLang]);

  const tSenior = useCallback((key: string, params?: Record<string, string | number>) => {
    return getTranslation(key, seniorLang, params);
  }, [seniorLang]);

  const tFamily = useCallback((key: string, params?: Record<string, string | number>) => {
    return getTranslation(key, caregiverLang, params);
  }, [caregiverLang]);

  return (
    <SaathiContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        senior,
        caregiver,
        seniorLang,
        caregiverLang,
        setSeniorLanguage,
        setCaregiverLanguage,
        requests,
        device,
        checkIn,
        notifications,
        whatsAppMsg,
        createRequest,
        acknowledgeRequest,
        resolveRequest,
        submitCheckIn,
        resetCheckIn,
        simulateHardwareGesture,
        updateFlexSensor,
        togglePIR,
        resetSensors,
        readAloud,
        tSenior,
        tFamily
      }}
    >
      {children}
    </SaathiContext.Provider>
  );
};

export const useSaathi = (): SaathiContextType => {
  const context = useContext(SaathiContext);
  if (!context) {
    throw new Error('useSaathi must be used within a SaathiProvider');
  }
  return context;
};
