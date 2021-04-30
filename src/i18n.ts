import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector'

i18next
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: `./locales/{{lng}}.json`
    },
    debug: process.env.NODE_ENV === 'development',
    react: {
      useSuspense: true,
      wait: true
    },
    saveMissing: true,
    fallbackLng: 'en',
    preload: ['en', 'zh-CN'],
    keySeparator: '.',
    interpolation: {
      escapeValue: false,
      formatSeparator: ','
    }
  })

export default i18next
