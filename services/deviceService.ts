import { DeviceStatus, PIRStatus, SensorReading } from '@/types';
import { INITIAL_DEVICE } from '@/data/mockData';
import { GESTURE_MAPPINGS, matchGesture } from '@/data/gestures';
import { requestService } from './requestService';

const STORAGE_KEY = 'saathi_device_status_v1';

class DeviceService {
  private device: DeviceStatus = INITIAL_DEVICE;
  private listeners: Array<(device: DeviceStatus) => void> = [];

  constructor() {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          this.device = JSON.parse(stored);
        } catch {
          this.device = { ...INITIAL_DEVICE };
        }
      } else {
        this.device = { ...INITIAL_DEVICE };
        this.save();
      }
    }
  }

  private save() {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.device));
    }
    this.notify();
  }

  private notify() {
    this.listeners.forEach((fn) => fn({ ...this.device }));
  }

  public subscribe(listener: (device: DeviceStatus) => void): () => void {
    this.listeners.push(listener);
    listener({ ...this.device });
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  public getStatus(): DeviceStatus {
    return { ...this.device };
  }

  public setConnectionState(state: 'CONNECTED' | 'DISCONNECTED' | 'SIMULATION'): void {
    this.device = {
      ...this.device,
      connectionState: state,
      lastHeartbeat: Date.now()
    };
    this.save();
  }

  public updateFlexSensor(sensorId: number, rawValue: number): void {
    const updatedFlex = this.device.flexSensors.map((s) => {
      if (s.sensorId === sensorId) {
        return {
          ...s,
          value: rawValue,
          isBent: rawValue >= s.threshold
        };
      }
      return s;
    });

    this.device = {
      ...this.device,
      flexSensors: updatedFlex,
      lastHeartbeat: Date.now()
    };

    this.save();
    this.evaluateCurrentPattern();
  }

  public togglePIRMotion(motionDetected?: boolean): void {
    const isMotion = motionDetected !== undefined 
      ? motionDetected 
      : this.device.pirStatus !== 'MOTION_DETECTED';

    const newStatus: PIRStatus = isMotion ? 'MOTION_DETECTED' : 'NO_RECENT_MOTION';

    this.device = {
      ...this.device,
      pirStatus: newStatus,
      pirLastMotionTimestamp: isMotion ? Date.now() : this.device.pirLastMotionTimestamp,
      lastHeartbeat: Date.now()
    };
    this.save();
  }

  public triggerPresetGesture(gestureId: string): void {
    const gesture = GESTURE_MAPPINGS.find((g) => g.id === gestureId);
    if (!gesture) return;

    // Set flex sensor values corresponding to pattern
    const updatedFlex: SensorReading[] = this.device.flexSensors.map((s, idx) => {
      const isBent = gesture.flexPattern[idx];
      return {
        ...s,
        value: isBent ? 850 : 120,
        isBent
      };
    });

    this.device = {
      ...this.device,
      flexSensors: updatedFlex,
      lastHeartbeat: Date.now()
    };
    this.save();

    // Trigger request via hardware source
    requestService.createRequest(
      gesture.requestType,
      'HARDWARE',
      'Raj Sharma',
      `Triggered by ESP32 Flex Glove Gesture: ${gesture.requestType}`
    );
  }

  private evaluateCurrentPattern(): void {
    const pattern: [boolean, boolean, boolean, boolean] = [
      this.device.flexSensors[0]?.isBent ?? false,
      this.device.flexSensors[1]?.isBent ?? false,
      this.device.flexSensors[2]?.isBent ?? false,
      this.device.flexSensors[3]?.isBent ?? false
    ];

    const matched = matchGesture(pattern);
    if (matched) {
      // Auto-dispatch if all bent or distinct gesture
      // Rate limit / check
      requestService.createRequest(
        matched.requestType,
        'HARDWARE',
        'Raj Sharma',
        `Recognized ESP32 Gesture: ${matched.requestType}`
      );
    }
  }

  public resetAllSensors(): void {
    const resetFlex = this.device.flexSensors.map((s) => ({
      ...s,
      value: 100,
      isBent: false
    }));

    this.device = {
      ...this.device,
      flexSensors: resetFlex,
      lastHeartbeat: Date.now()
    };
    this.save();
  }
}

export const deviceService = new DeviceService();
