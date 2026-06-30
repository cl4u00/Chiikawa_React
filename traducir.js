import axios from 'axios';
import fs from 'fs';

const DEEPL_API_KEY = 'ea5dd2bf-5070-454e-80a8-51261aeec686:fx'; 
const DEEPL_URL = 'https://api-free.deepl.com/v2/translate';

const traducirJSON = async () => {
  try {
    const rawData = fs.readFileSync('./src/locales/es.json', 'utf8');
    const esData = JSON.parse(rawData);
    const jaData = {};

    console.log('Iniciando traducción...');

    const traducirObjeto = async (obj) => {
      const nuevoObj = {};
      for (const key in obj) {
        if (typeof obj[key] === 'object') {
          nuevoObj[key] = await traducirObjeto(obj[key]);
        } else {
          // AQUÍ ESTÁ EL CAMBIO: Usamos headers en lugar de params para la auth
          const response = await axios.post(DEEPL_URL, null, {
            headers: {
              'Authorization': `DeepL-Auth-Key ${DEEPL_API_KEY}`,
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            params: {
              text: obj[key],
              target_lang: 'JA'
            }
          });
          nuevoObj[key] = response.data.translations[0].text;
        }
      }
      return nuevoObj;
    };

    const resultado = await traducirObjeto(esData);
    fs.writeFileSync('./src/locales/ja.json', JSON.stringify(resultado, null, 2));
    console.log('¡Traducción al japonés completada con éxito!');
  } catch (error) {
    if (error.response) {
      console.error('Detalle del error:', error.response.status, error.response.data);
    } else {
      console.error('Error durante la traducción:', error.message);
    }
  }
};

traducirJSON();