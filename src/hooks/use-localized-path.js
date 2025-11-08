// src/hooks/use-localized-path.js
import { useLocation } from "@reach/router"
import { languages, defaultLanguage } from "../config/languages"

export const useLocalizedPath = () => {
    const location = useLocation()

    const getCurrentLanguage = () => {
        // 在服务器端渲染时，返回默认语言
        if (typeof window === "undefined") {
            return defaultLanguage
        }

        const path = location.pathname
        console.log('useLocalizedPath - current path:', path)

        for (const lang of Object.keys(languages)) {
            if (path.startsWith(`/${lang}/`) || path === `/${lang}`) {
                console.log('useLocalizedPath - detected language:', lang)
                return lang
            }
        }
        console.log('useLocalizedPath - using default language:', defaultLanguage)
        return defaultLanguage
    }

    const getLocalizedPath = (path) => {
        const currentLang = getCurrentLanguage()
        console.log('useLocalizedPath - getLocalizedPath called with:', { path, currentLang, defaultLanguage })

        // 清理路径：移除所有语言前缀
        let cleanPath = path
        Object.keys(languages).forEach(lang => {
            if (path.startsWith(`/${lang}/`)) {
                cleanPath = path.replace(`/${lang}`, '')
            } else if (path === `/${lang}`) {
                cleanPath = '/'
            }
        })

        console.log('useLocalizedPath - cleaned path:', cleanPath)

        // 如果当前语言是默认语言，直接返回清理后的路径
        if (currentLang === defaultLanguage) {
            console.log('useLocalizedPath - default language, returning:', cleanPath)
            return cleanPath
        } else {
            // 否则添加当前语言前缀
            const result = cleanPath === '/' ? `/${currentLang}` : `/${currentLang}${cleanPath}`
            console.log('useLocalizedPath - non-default language, returning:', result)
            return result
        }
    }

    return { getLocalizedPath, currentLanguage: getCurrentLanguage() }
}
