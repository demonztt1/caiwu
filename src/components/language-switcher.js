import React from "react"
import { Link } from "gatsby"

const LanguageSwitcher = () => {
    // 在 SSR 阶段返回简单的占位符
    if (typeof window === "undefined") {
        return (
            <div className="language-switcher">
                <span className="text-gray-600">English</span>
            </div>
        )
    }

    // 只有在客户端才使用 window.location
    const getAlternativeLanguageLink = () => {
        const path = window.location.pathname
        if (path.startsWith('/en/') || path === '/en') {
            return path.replace('/en', '/zh') || '/'
        } else if (path.startsWith('/zh/') || path === '/zh') {
            return path.replace('/zh', '/en') || '/en'
        } else {
            return '/en'
        }
    }

    const getCurrentLanguage = () => {
        const path = window.location.pathname
        if (path.startsWith('/en/') || path === '/en') return 'en'
        return 'zh'
    }

    const currentLang = getCurrentLanguage()
    const alternativeLang = currentLang === 'zh' ? 'en' : 'zh'
    const alternativeLink = getAlternativeLanguageLink()

    return (
        <div className="language-switcher">
            <Link
                to={alternativeLink}
                className="text-gray-600 hover:text-blue-600 transition duration-300"
            >
                {alternativeLang === 'zh' ? '中文' : 'English'}
            </Link>
        </div>
    )
}

export default LanguageSwitcher
