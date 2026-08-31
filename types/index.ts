export type Language = 'en' | 'hi' | 'mr';

export type UserRole = 'senior' | 'family' | 'admin' | 'hardware';

export type RequestType = 
  | 'HUNGRY' 
  | 'THIRSTY' 
  | 'MEDICINE' 
  | 'TOILET' 
  | 'PAIN' 
  | 'FAMILY' 
  | 'EMERGENCY' 
  | 'HELP' 
  | 'OTHER';

export type RequestSource = 'APP' | 'HARDWARE' | 'SYSTEM';

export type RequestStatus = 'PENDING' | 'ACKNOWLEDGED' | 'RESOLVED' | 'CANCELLED';

export type RequestPriority = 'LOW' | 'NORMAL' | 'HIGH' | 'EMERGENCY';

export interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  isPrimary: boolean;
  type: 'family' | 'ambulance' | 'police' | 'helpline';
}

export interface SeniorProfile {
  id: string;
  name: string;
  age: number;
  gender: string;
  language: Language;
  locationName: string;
  latitude: number;
  longitude: number;
  emergencyContacts: EmergencyContact[];
  medicalNotes?: string;
  primaryCaregiverName: string;
  primaryCaregiverPhone: string;
}

export interface CaregiverProfile {
  id: string;
  name: string;
  phone: string;
  language: Language;
  relationship: string;
  linkedSeniorId: string;
}

export interface RequestItem {
  id: string;
  seniorId: string;
  seniorName: string;
  type: RequestType;
  message?: string;
  source: RequestSource;
  timestamp: number;
  status: RequestStatus;
  priority: RequestPriority;
  acknowledgedAt?: number;
  acknowledgedBy?: string;
  resolvedAt?: number;
  resolvedBy?: string;
}

export interface CheckInRecord {
  id: string;
  seniorId: string;
  date: string; // YYYY-MM-DD
  timestamp: number;
  status: 'COMPLETED' | 'MISSED' | 'PENDING';
  mood?: 'GOOD' | 'NEUTRAL' | 'NEED_HELP';
  note?: string;
}

export interface SensorReading {
  sensorId: number;
  name: string;
  value: number; // 0 - 1023 or bend angle
  threshold: number;
  isBent: boolean;
}

export type PIRStatus = 'MOTION_DETECTED' | 'NO_RECENT_MOTION' | 'DEVICE_INACTIVE';

export interface DeviceStatus {
  id: string;
  name: string;
  model: string;
  connectionState: 'CONNECTED' | 'DISCONNECTED' | 'SIMULATION';
  pirStatus: PIRStatus;
  pirLastMotionTimestamp: number;
  flexSensors: SensorReading[];
  batteryPercent: number;
  lastHeartbeat: number;
  rssiSignalStrength: number; // -30 to -90 dBm
}

export interface GestureMapping {
  id: string;
  nameKey: string;
  requestType: RequestType;
  descriptionKey: string;
  flexPattern: [boolean, boolean, boolean, boolean]; // 4 flex sensors
  iconName: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  source: RequestSource;
  timestamp: number;
  read: boolean;
  requestType: RequestType;
  seniorName: string;
  priority: RequestPriority;
  whatsAppSimulated?: boolean;
}

export type ServiceCategory = 
  | 'hospitals'
  | 'ambulance'
  | 'senior_centres'
  | 'transport'
  | 'home_care'
  | 'government_welfare'
  | 'pharmacy'
  | 'clinics';

export interface ServiceLocation {
  id: string;
  name: string;
  category: ServiceCategory;
  address: string;
  phone: string;
  distanceKm: number;
  latitude: number;
  longitude: number;
  isDemo: boolean;
  openHours: string;
  rating?: number;
  verified?: boolean;
}

export interface DocumentAnalysisResult {
  id: string;
  fileName: string;
  documentType: string;
  summary: string;
  keyPoints: string[];
  actionRequired: string[];
  importantDates: string[];
  warnings: string[];
  language: Language;
  analyzedAt: number;
  confidenceScore: number;
}
