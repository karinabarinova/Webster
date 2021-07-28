import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import common_ru from "./locales/ru/translations.json";
import common_en from "./locales/en/translations.json";
import common_ua from "./locales/ua/translations.json";


const resources = {
	en: {
		common: common_en
	},
    ru: {
        common: common_ru
    },
    ua: {
        common: common_ua
    }
};

i18n.use(initReactI18next)
	.init({
        resources,
		lng: 'en',
		// fallbackLng: 'en',
        debug: true,
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        }
	});

export default i18n;