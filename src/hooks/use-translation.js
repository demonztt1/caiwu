// src/hooks/use-translation.js
import { useLocation } from "@reach/router"
import { languages, defaultLanguage } from "../config/languages"
import translations from "../i18n/translations"

export const useTranslation = () => {
    const location = useLocation()

    const getCurrentLanguage = () => {
        // 在构建阶段，location 可能为 undefined
        if (!location || !location.pathname) {
            return defaultLanguage
        }

        const path = location.pathname
        for (const lang of Object.keys(languages)) {
            if (path.startsWith(`/${lang}/`) || path === `/${lang}`) {
                return lang
            }
        }
        return defaultLanguage
    }

    const currentLang = getCurrentLanguage()

    const t = (key, options = {}) => {
        const keys = key.split('.')
        let value = translations[currentLang]

        for (const k of keys) {
            value = value?.[k]
        }

        // 如果没找到翻译，使用默认语言
        if (value === undefined) {
            value = translations[defaultLanguage]
            for (const k of keys) {
                value = value?.[k]
            }
        }

        // 如果仍然没找到，使用提供的默认值或返回键名
        if (value === undefined) {
            return options.defaultValue || key
        }

        // 处理返回对象的情况
        if (options.returnObjects && typeof value === 'object') {
            return value
        }

        return value
    }

    return {
        t,
        currentLanguage: currentLang
    }
}
