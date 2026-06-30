import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import esTranslation from './locales/es.json';
import jaTranslation from './locales/ja.json';

const resources = {
  es: { translation: esTranslation },
  ja: { translation: jaTranslation }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'es', // Idioma por defecto al entrar a la página
    fallbackLng: 'es', // Si falla, usa español
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;