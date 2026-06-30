import axios from 'axios';
import fs from 'fs';

// Debes obtener tu API Key en la web de DeepL (plan gratuito)
const DEEPL_API_KEY = 'TU_API_KEY_GRATUITA_AQUI'; 
const DEEPL_URL = 'https://api-free.deepl.com/v2/translate';

const traducirJSON = async () => {
  try {
    // 1. Lee tu archivo base en español
    const rawData = fs.readFileSync('./src/locales/es.json', 'utf8');
    const esData = JSON.parse(rawData);
    const jaData = {};

    // 2. Consume la API Rest de DeepL para cada texto
    for (const key in esData) {
      const response = await axios.post(DEEPL_URL, null, {
        params: {
          auth_key: DEEPL_API_KEY,
          text: esData[key],
          target_lang: 'JA' // Prioridad idioma japonés
        }
      });
      jaData[key] = response.data.translations[0].text;
    }

    // 3. Guarda el nuevo JSON generado
    fs.writeFileSync('./src/locales/ja.json', JSON.stringify(jaData, null, 2));
    console.log('Traducción al japonés completada y guardada en ja.json');
  } catch (error) {
    console.error('Error al consumir la API de traducción:', error.message);
  }
};

traducirJSON();