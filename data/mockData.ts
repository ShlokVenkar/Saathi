import { 
  SeniorProfile, 
  CaregiverProfile, 
  RequestItem, 
  CheckInRecord, 
  DeviceStatus, 
  ServiceLocation 
} from '@/types';

export const INITIAL_SENIOR: SeniorProfile = {
  id: 'senior-shlok-1',
  name: 'Shlok',
  age: 74,
  gender: 'Male',
  language: 'mr', // Marathi by default for senior
  locationName: 'Vidyalankar Campus, Wadala East, Antop Hill, Mumbai',
  latitude: 19.0222,
  longitude: 72.8711,
  primaryCaregiverName: 'Son (Primary Caregiver)',
  primaryCaregiverPhone: '+91 96195 60729',
  medicalNotes: 'Hypertension, Mild arthritis in knees, daily blood pressure pill at 9:00 AM',
  emergencyContacts: [
    {
      id: 'ec-1',
      name: 'Son (Primary Caregiver)',
      relationship: 'Son / Primary Caregiver',
      phone: '+91 96195 60729',
      isPrimary: true,
      type: 'family'
    },
    {
      id: 'ec-2',
      name: 'Dr. Suresh Mehta (Family Physician)',
      relationship: 'Physician',
      phone: '+91 98201 22334',
      isPrimary: false,
      type: 'family'
    },
    {
      id: 'ec-3',
      name: 'Antop Hill Police Station & Dispatch',
      relationship: 'Govt Police Dispatch',
      phone: '112',
      isPrimary: false,
      type: 'police'
    },
    {
      id: 'ec-4',
      name: 'Emergency Medical & Ambulance Service',
      relationship: 'Ambulance Service',
      phone: '108',
      isPrimary: false,
      type: 'ambulance'
    },
    {
      id: 'ec-5',
      name: 'Elderline National Senior Helpline',
      relationship: 'Govt Senior Support',
      phone: '14567',
      isPrimary: false,
      type: 'helpline'
    }
  ]
};

export const INITIAL_CAREGIVER: CaregiverProfile = {
  id: 'caregiver-son-1',
  name: 'Son (Caregiver)',
  phone: '+91 96195 60729',
  language: 'en', // English by default for caregiver
  relationship: 'Son',
  linkedSeniorId: 'senior-shlok-1'
};

export const INITIAL_DEVICE: DeviceStatus = {
  id: 'saathi-esp32-node-01',
  name: 'SAATHI Assistive Node #01',
  model: 'ESP32-WROOM-32D / BLE 5.0 + WiFi',
  connectionState: 'CONNECTED',
  pirStatus: 'MOTION_DETECTED',
  pirLastMotionTimestamp: Date.now() - 1000 * 60 * 4, // 4 mins ago
  batteryPercent: 88,
  lastHeartbeat: Date.now() - 1000 * 12, // 12 seconds ago
  rssiSignalStrength: -48,
  flexSensors: [
    { sensorId: 1, name: 'Sensor 1 (Index)', value: 120, threshold: 500, isBent: false },
    { sensorId: 2, name: 'Sensor 2 (Middle)', value: 95, threshold: 500, isBent: false },
    { sensorId: 3, name: 'Sensor 3 (Ring)', value: 110, threshold: 500, isBent: false },
    { sensorId: 4, name: 'Sensor 4 (Thumb/Palm)', value: 80, threshold: 500, isBent: false }
  ]
};

export const INITIAL_REQUESTS: RequestItem[] = [
  {
    id: 'req-init-1',
    seniorId: 'senior-shlok-1',
    seniorName: 'Shlok',
    type: 'HUNGRY',
    message: 'I am hungry (Morning breakfast request)',
    source: 'HARDWARE',
    timestamp: Date.now() - 1000 * 60 * 45, // 45 mins ago
    status: 'RESOLVED',
    priority: 'NORMAL',
    acknowledgedAt: Date.now() - 1000 * 60 * 42,
    acknowledgedBy: 'Son (Caregiver)',
    resolvedAt: Date.now() - 1000 * 60 * 25,
    resolvedBy: 'Son (Caregiver)'
  },
  {
    id: 'req-init-2',
    seniorId: 'senior-shlok-1',
    seniorName: 'Shlok',
    type: 'THIRSTY',
    message: 'I am thirsty (Water requested)',
    source: 'APP',
    timestamp: Date.now() - 1000 * 60 * 15, // 15 mins ago
    status: 'ACKNOWLEDGED',
    priority: 'NORMAL',
    acknowledgedAt: Date.now() - 1000 * 60 * 12,
    acknowledgedBy: 'Son (Caregiver)'
  }
];

export const INITIAL_CHECKIN: CheckInRecord = {
  id: 'checkin-today',
  seniorId: 'senior-shlok-1',
  date: new Date().toISOString().split('T')[0],
  timestamp: Date.now() - 1000 * 60 * 180, // 3 hours ago
  status: 'COMPLETED',
  mood: 'GOOD',
  note: 'Checked in at 8:30 AM after morning tea.'
};

export const MOCK_SERVICES: ServiceLocation[] = [
  {
    id: 'srv-1',
    name: 'Lokmanya Tilak Municipal General Hospital (Sion Hospital)',
    category: 'hospitals',
    address: 'Sion West, Near Sion Railway Station, Mumbai 400022',
    phone: '+91 22 2407 6381',
    distanceKm: 1.8,
    latitude: 19.0356,
    longitude: 72.8601,
    isDemo: true,
    openHours: '24 Hours Emergency & Trauma Care',
    rating: 4.8,
    verified: true
  },
  {
    id: 'srv-2',
    name: '108 Maharashtra Emergency Ambulance Dispatch - Antop Hill Hub',
    category: 'ambulance',
    address: 'Antop Hill Emergency Response Hub, Wadala East, Mumbai',
    phone: '108',
    distanceKm: 0.6,
    latitude: 19.0235,
    longitude: 72.8725,
    isDemo: true,
    openHours: '24x7 Immediate Ambulance Dispatch',
    rating: 4.9,
    verified: true
  },
  {
    id: 'srv-3',
    name: 'Apollo 24x7 Pharmacy & Home Delivery (Wadala East)',
    category: 'pharmacy',
    address: 'Near Vidyalankar Gate, Sangam Nagar, Antop Hill, Mumbai 400037',
    phone: '+91 22 2411 5566',
    distanceKm: 0.4,
    latitude: 19.0210,
    longitude: 72.8700,
    isDemo: true,
    openHours: '24 Hours Open',
    rating: 4.7,
    verified: true
  },
  {
    id: 'srv-4',
    name: 'Antop Hill Senior Citizen Welfare & Activity Centre',
    category: 'senior_centres',
    address: 'Sector 7, CGS Colony, Antop Hill, Wadala East, Mumbai',
    phone: '+91 98200 45678',
    distanceKm: 0.8,
    latitude: 19.0240,
    longitude: 72.8740,
    isDemo: true,
    openHours: '8:00 AM - 7:00 PM',
    rating: 4.6,
    verified: true
  },
  {
    id: 'srv-5',
    name: 'Mumbai Port Trust (MbPT) Hospital',
    category: 'hospitals',
    address: 'Nadkarni Park, Wadala East, Mumbai 400037',
    phone: '+91 22 6656 7000',
    distanceKm: 1.1,
    latitude: 19.0180,
    longitude: 72.8680,
    isDemo: true,
    openHours: '24 Hours Emergency & OPD',
    rating: 4.7,
    verified: true
  },
  {
    id: 'srv-6',
    name: 'Nightingales Senior Home Healthcare Services',
    category: 'home_care',
    address: 'Wadala & Sion Hub, Mumbai',
    phone: '+91 1800 108 4433',
    distanceKm: 1.2,
    latitude: 19.0250,
    longitude: 72.8690,
    isDemo: true,
    openHours: '24x7 Attendant & Nurse Service',
    rating: 4.5,
    verified: true
  },
  {
    id: 'srv-7',
    name: 'Mumbai City Senior Citizen Welfare Office & Pension Assist',
    category: 'government_welfare',
    address: 'Wadala Central Division, Mumbai',
    phone: '14567',
    distanceKm: 2.2,
    latitude: 19.0190,
    longitude: 72.8550,
    isDemo: true,
    openHours: '10:00 AM - 5:00 PM (Mon-Fri)',
    rating: 4.3,
    verified: true
  },
  {
    id: 'srv-8',
    name: 'Accessible Wheelchair Cab & Senior Mobility Mumbai',
    category: 'transport',
    address: 'Serving Vidyalankar Campus, Wadala East, Sion & Dadar Area',
    phone: '+91 99221 55667',
    distanceKm: 0.9,
    latitude: 19.0220,
    longitude: 72.8710,
    isDemo: true,
    openHours: '6:00 AM - 11:00 PM',
    rating: 4.7,
    verified: true
  }
];
