import { Language } from '@/types';
import en from '@/locales/en.json';
import hi from '@/locales/hi.json';
import mr from '@/locales/mr.json';

export const translations: Record<Language, typeof en> = {
  en,
  hi: hi as unknown as typeof en,
  mr: mr as unknown as typeof en,
};

export const LANGUAGE_NAMES: Record<Language, { native: string; english: string; flag: string }> = {
  en: { native: 'English', english: 'English', flag: '🇬🇧' },
  hi: { native: 'हिंदी', english: 'Hindi', flag: '🇮🇳' },
  mr: { native: 'मराठी', english: 'Marathi', flag: '🇮🇳' },
};

/**
 * Nested key lookup with interpolation support
 * e.g., getTranslation('seniorHome.greetingMorning', 'mr')
 */
export function getTranslation(
  keyPath: string,
  lang: Language = 'en',
  params?: Record<string, string | number>
): string {
  const keys = keyPath.split('.');
  const localeData = translations[lang] || translations.en;
  
  let current: unknown = localeData;
  for (const k of keys) {
    if (current && typeof current === 'object' && k in current) {
      current = (current as Record<string, unknown>)[k];
    } else {
      // Fallback to English
      let fallbackCurrent: unknown = translations.en;
      for (const fk of keys) {
        if (fallbackCurrent && typeof fallbackCurrent === 'object' && fk in fallbackCurrent) {
          fallbackCurrent = (fallbackCurrent as Record<string, unknown>)[fk];
        } else {
          return keyPath;
        }
      }
      current = fallbackCurrent;
      break;
    }
  }

  if (typeof current !== 'string') {
    return keyPath;
  }

  let result = current;
  if (params) {
    Object.entries(params).forEach(([pKey, pVal]) => {
      result = result.replace(new RegExp(`{${pKey}}`, 'g'), String(pVal));
    });
  }

  return result;
}
