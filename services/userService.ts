import { SeniorProfile, CaregiverProfile, CheckInRecord, EmergencyContact, Language } from '@/types';
import { INITIAL_SENIOR, INITIAL_CAREGIVER, INITIAL_CHECKIN } from '@/data/mockData';

const SENIOR_STORAGE_KEY = 'saathi_senior_profile_v1';
const CAREGIVER_STORAGE_KEY = 'saathi_caregiver_profile_v1';
const CHECKIN_STORAGE_KEY = 'saathi_checkin_records_v1';
const SENIOR_LANG_KEY = 'saathi_senior_lang_v1';
const CAREGIVER_LANG_KEY = 'saathi_caregiver_lang_v1';

class UserService {
  private senior: SeniorProfile = INITIAL_SENIOR;
  private caregiver: CaregiverProfile = INITIAL_CAREGIVER;
  private checkIn: CheckInRecord = INITIAL_CHECKIN;
  private listeners: Array<() => void> = [];

  constructor() {
    if (typeof window !== 'undefined') {
      const storedSenior = localStorage.getItem(SENIOR_STORAGE_KEY);
      if (storedSenior) {
        try { this.senior = JSON.parse(storedSenior); } catch {}
      }

      const storedCaregiver = localStorage.getItem(CAREGIVER_STORAGE_KEY);
      if (storedCaregiver) {
        try { this.caregiver = JSON.parse(storedCaregiver); } catch {}
      }

      const storedCheckIn = localStorage.getItem(CHECKIN_STORAGE_KEY);
      if (storedCheckIn) {
        try { this.checkIn = JSON.parse(storedCheckIn); } catch {}
      }

      const seniorLang = localStorage.getItem(SENIOR_LANG_KEY) as Language;
      if (seniorLang) this.senior.language = seniorLang;

      const caregiverLang = localStorage.getItem(CAREGIVER_LANG_KEY) as Language;
      if (caregiverLang) this.caregiver.language = caregiverLang;
    }
  }

  private save() {
    if (typeof window !== 'undefined') {
      localStorage.setItem(SENIOR_STORAGE_KEY, JSON.stringify(this.senior));
      localStorage.setItem(CAREGIVER_STORAGE_KEY, JSON.stringify(this.caregiver));
      localStorage.setItem(CHECKIN_STORAGE_KEY, JSON.stringify(this.checkIn));
      localStorage.setItem(SENIOR_LANG_KEY, this.senior.language);
      localStorage.setItem(CAREGIVER_LANG_KEY, this.caregiver.language);
    }
    this.notify();
  }

  private notify() {
    this.listeners.forEach((fn) => fn());
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  public getSenior(): SeniorProfile {
    return { ...this.senior };
  }

  public getCaregiver(): CaregiverProfile {
    return { ...this.caregiver };
  }

  public getCheckIn(): CheckInRecord {
    return { ...this.checkIn };
  }

  public setSeniorLanguage(lang: Language): void {
    this.senior = { ...this.senior, language: lang };
    this.save();
  }

  public setCaregiverLanguage(lang: Language): void {
    this.caregiver = { ...this.caregiver, language: lang };
    this.save();
  }

  public submitCheckIn(mood: 'GOOD' | 'NEUTRAL' | 'NEED_HELP' = 'GOOD', note?: string): CheckInRecord {
    const today = new Date().toISOString().split('T')[0];
    this.checkIn = {
      id: `chk-${Date.now()}`,
      seniorId: this.senior.id,
      date: today,
      timestamp: Date.now(),
      status: 'COMPLETED',
      mood,
      note: note || `Checked in at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    };
    this.save();
    return { ...this.checkIn };
  }

  public resetCheckInForDemo(): void {
    this.checkIn = {
      ...this.checkIn,
      status: 'PENDING',
      timestamp: 0,
      note: undefined
    };
    this.save();
  }

  public updateEmergencyContacts(contacts: EmergencyContact[]): void {
    this.senior = { ...this.senior, emergencyContacts: contacts };
    this.save();
  }

  public updateSeniorProfile(updated: Partial<SeniorProfile>): void {
    this.senior = { ...this.senior, ...updated };
    this.save();
  }
}

export const userService = new UserService();
