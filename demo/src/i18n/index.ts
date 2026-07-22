import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import ar from './locales/ar.json';

export const LANGS = ['en', 'ar'] as const;
export type Lang = (typeof LANGS)[number];

export const dirFor = (lang: string): 'rtl' | 'ltr' => (lang === 'ar' ? 'rtl' : 'ltr');

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

// Keep <html dir/lang> in sync with the active language (RTL support).
function applyDir(lang: string) {
  if (typeof document === 'undefined') return;
  document.documentElement.lang = lang;
  document.documentElement.dir = dirFor(lang);
}
applyDir(i18n.language);
i18n.on('languageChanged', applyDir);

export default i18n;
