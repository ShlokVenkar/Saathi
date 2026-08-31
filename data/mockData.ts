import { 
  SeniorProfile, 
  CaregiverProfile, 
  RequestItem, 
  CheckInRecord, 
  DeviceStatus, 
  ServiceLocation 
} from '@/types';

export const INITIAL_SENIOR: SeniorProfile = {
  id: 'senior-raj-1',
  name: 'Raj Sharma',
  age: 74,
  gender: 'Male',
  language: 'mr', // Marathi by default for senior
  locationName: 'Kothrud, Pune, Maharashtra',
  latitude: 18.5074,
  longitude: 73.8077,
  primaryCaregiverName: 'Priya Sharma (Daughter)',
  primaryCaregiverPhone: '+91 8591598630',
  medicalNotes: 'Hypertension, Mild arthritis in knees, daily blood pressure pill at 9:00 AM',
  emergencyContacts: [
    {
      id: 'ec-1',
      name: 'Priya Sharma (Daughter)',
      relationship: 'Daughter / Primary Caregiver',
      phone: '+91 8591598630',
      isPrimary: true,
      type: 'family'
    },
    {
      id: 'ec-2',
      name: 'Dr. Anant Kulkarni (Family Physician)',
      relationship: 'Physician',
      phone: '+91 98220 11223',
      isPrimary: false,
      type: 'family'
    },
    {
      id: 'ec-3',
      name: 'National Emergency Helpline',
      relationship: 'Govt Dispatch',
      phone: '112',
      isPrimary: false,
      type: 'police'
    },
    {
      id: 'ec-4',
      name: 'Emergency Medical & Ambulance',
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
  id: 'caregiver-priya-1',
  name: 'Priya Sharma',
  phone: '+91 8591598630',
  language: 'en', // English by default for caregiver
  relationship: 'Daughter',
  linkedSeniorId: 'senior-raj-1'
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
    seniorId: 'senior-raj-1',
    seniorName: 'Raj Sharma',
    type: 'HUNGRY',
    message: 'I am hungry (Morning breakfast request)',
    source: 'HARDWARE',
    timestamp: Date.now() - 1000 * 60 * 45, // 45 mins ago
    status: 'RESOLVED',
    priority: 'NORMAL',
    acknowledgedAt: Date.now() - 1000 * 60 * 42,
    acknowledgedBy: 'Priya Sharma',
    resolvedAt: Date.now() - 1000 * 60 * 25,
    resolvedBy: 'Priya Sharma'
  },
  {
    id: 'req-init-2',
    seniorId: 'senior-raj-1',
    seniorName: 'Raj Sharma',
    type: 'THIRSTY',
    message: 'I am thirsty (Water requested)',
    source: 'APP',
    timestamp: Date.now() - 1000 * 60 * 15, // 15 mins ago
    status: 'ACKNOWLEDGED',
    priority: 'NORMAL',
    acknowledgedAt: Date.now() - 1000 * 60 * 12,
    acknowledgedBy: 'Priya Sharma'
  }
];

export const INITIAL_CHECKIN: CheckInRecord = {
  id: 'checkin-today',
  seniorId: 'senior-raj-1',
  date: new Date().toISOString().split('T')[0],
  timestamp: Date.now() - 1000 * 60 * 180, // 3 hours ago
  status: 'COMPLETED',
  mood: 'GOOD',
  note: 'Checked in at 8:30 AM after morning tea.'
};

export const MOCK_SERVICES: ServiceLocation[] = [
  {
    id: 'srv-1',
    name: 'Deenanath Mangeshkar Hospital & Research Centre',
    category: 'hospitals',
    address: 'Erandwane, Near Mhatre Bridge, Pune 411004',
    phone: '+91 20 4015 1000',
    distanceKm: 1.4,
    latitude: 18.5018,
    longitude: 73.8291,
    isDemo: true,
    openHours: '24 Hours Emergency & OPD',
    rating: 4.8,
    verified: true
  },
  {
    id: 'srv-2',
    name: '108 Maharashtra Emergency Ambulance Dispatch Hub',
    category: 'ambulance',
    address: 'Kothrud Regional Emergency Depot, Pune',
    phone: '108',
    distanceKm: 0.8,
    latitude: 18.5080,
    longitude: 73.8100,
    isDemo: true,
    openHours: '24x7 Immediate Dispatch',
    rating: 4.9,
    verified: true
  },
  {
    id: 'srv-3',
    name: 'Apollo 24x7 Pharmacy & Home Medicine Delivery',
    category: 'pharmacy',
    address: 'Shop 4, Paud Road, Ideal Colony, Kothrud, Pune',
    phone: '+91 20 2544 8899',
    distanceKm: 0.5,
    latitude: 18.5092,
    longitude: 73.8135,
    isDemo: true,
    openHours: '24 Hours Open',
    rating: 4.7,
    verified: true
  },
  {
    id: 'srv-4',
    name: 'Golden Care Senior Citizen Day Centre & Activity Club',
    category: 'senior_centres',
    address: 'Karve Road, Near Dashabhuja Ganpati, Pune',
    phone: '+91 98230 45678',
    distanceKm: 1.1,
    latitude: 18.5034,
    longitude: 73.8188,
    isDemo: true,
    openHours: '8:00 AM - 7:00 PM',
    rating: 4.6,
    verified: true
  },
  {
    id: 'srv-5',
    name: 'Sahyadri Super Speciality Hospital',
    category: 'hospitals',
    address: 'Plot No. 30 C, Erandwane, Karve Road, Pune 411004',
    phone: '+91 20 6721 3000',
    distanceKm: 2.1,
    latitude: 18.5042,
    longitude: 73.8345,
    isDemo: true,
    openHours: '24 Hours Emergency & Trauma',
    rating: 4.7,
    verified: true
  },
  {
    id: 'srv-6',
    name: 'Nightingales Home Health Care Services',
    category: 'home_care',
    address: 'Mayur Colony, Kothrud, Pune',
    phone: '+91 1800 108 4433',
    distanceKm: 0.9,
    latitude: 18.5065,
    longitude: 73.8142,
    isDemo: true,
    openHours: '24x7 Attendant & Nurse Service',
    rating: 4.5,
    verified: true
  },
  {
    id: 'srv-7',
    name: 'Pune Senior Citizen Govt Welfare Office & Pension Assist',
    category: 'government_welfare',
    address: 'Prabhat Road, Deccan Gymkhana, Pune',
    phone: '14567',
    distanceKm: 2.8,
    latitude: 18.5152,
    longitude: 73.8378,
    isDemo: true,
    openHours: '10:00 AM - 5:00 PM (Mon-Fri)',
    rating: 4.3,
    verified: true
  },
  {
    id: 'srv-8',
    name: 'Accessible Wheelchair Cab & Senior Mobility Pune',
    category: 'transport',
    address: 'Serving Kothrud, Deccan & Aundh Area',
    phone: '+91 99221 55667',
    distanceKm: 1.5,
    latitude: 18.5050,
    longitude: 73.8110,
    isDemo: true,
    openHours: '6:00 AM - 11:00 PM',
    rating: 4.7,
    verified: true
  }
];
