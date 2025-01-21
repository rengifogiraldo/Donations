import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./Locales/en.json"; // Your English translations
import es from "./Locales/es.json"; // Your Spanish translations

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    es: {
      translation: es,
    },
  },
  fallbackLng: "en", // Fallback language if translation is missing
  lng: "en",
  interpolation: {
    escapeValue: false, // React already does escaping
  },
  debug: true,
});

export default i18n;
