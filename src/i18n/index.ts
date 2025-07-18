import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Import các file ngôn ngữ
import vi from './locales/vi.json'
import en from './locales/en.json'
import ar from './locales/ar.json'
import th from './locales/th.json'
import ms from './locales/ms.json'
import it from './locales/it.json'
import ja from './locales/ja.json'
import ko from './locales/ko.json'
import zh from './locales/zh.json'
import es from './locales/es.json'
import pt from './locales/pt.json'
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'vi',
    debug: import.meta.env.DEV,
    resources: {
      ar: { translation: ar },
      en: { translation: en },
      es: { translation: es },
      pt: { translation: pt },
      vi: { translation: vi },
      th: { translation: th },
      ms: { translation: ms },
      it: { translation: it },
      ja: { translation: ja },
      ko: { translation: ko },
      zh: { translation: zh }
    },
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
