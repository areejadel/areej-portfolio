import { useTranslation } from 'react-i18next';

export function LanguageToggle() {
  const { i18n, t } = useTranslation();
  const next = i18n.language === 'ar' ? 'en' : 'ar';

  return (
    <button
      onClick={() => i18n.changeLanguage(next)}
      className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:border-accent hover:text-accent"
      aria-label="Toggle language"
    >
      {t('lang.toggle')}
    </button>
  );
}
