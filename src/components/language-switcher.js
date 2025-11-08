import React, { useState } from "react"
import { Link } from "gatsby"
import { languages, defaultLanguage } from "../config/languages"
import { useLocalizedPath } from "../hooks/use-localized-path"

const LanguageSwitcher = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { getLocalizedPath, currentLanguage } = useLocalizedPath()

    const getAlternativePath = (targetLang) => {
        if (typeof window === "undefined") {
            return targetLang === defaultLanguage ? '/' : `/${targetLang}`
        }

        const path = window.location.pathname
        console.log('LanguageSwitcher - current path:', path, 'targetLang:', targetLang, 'currentLanguage:', currentLanguage)

        // 清理路径：移除所有语言前缀
        let cleanPath = path
        Object.keys(languages).forEach(lang => {
            if (path.startsWith(`/${lang}/`)) {
                cleanPath = path.replace(`/${lang}`, '')
            } else if (path === `/${lang}`) {
                cleanPath = '/'
            }
        })

        console.log('LanguageSwitcher - cleaned path:', cleanPath)

        // 如果目标语言是默认语言，直接返回清理后的路径
        if (targetLang === defaultLanguage) {
            const result = cleanPath || '/'
            console.log('LanguageSwitcher - default language, returning:', result)
            return result
        } else {
            // 否则添加目标语言前缀
            const result = cleanPath === '/' ? `/${targetLang}` : `/${targetLang}${cleanPath}`
            console.log('LanguageSwitcher - non-default language, returning:', result)
            return result
        }
    }

    // 获取当前语言的配置对象
    const currentLangConfig = languages[currentLanguage] || languages[defaultLanguage]

    // 处理键盘事件
    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            setIsOpen(false)
        } else if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setIsOpen(!isOpen)
        }
    }

    const handleBackdropKeyDown = (e) => {
        if (e.key === 'Escape') {
            setIsOpen(false)
        }
    }

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                onKeyDown={handleKeyDown}
                className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-blue-600 transition duration-300"
                aria-haspopup="true"
                aria-expanded={isOpen}
                aria-label="选择语言"
            >
                <span>{currentLangConfig.flag}</span>
                <span className="text-sm">{currentLangConfig.code.toUpperCase()}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                        onKeyDown={handleBackdropKeyDown}
                        role="button"
                        tabIndex={0}
                        aria-label="关闭语言选择"
                    />
                    <div
                        className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-20 max-h-96 overflow-y-auto"
                        role="menu"
                        aria-label="语言选择菜单"
                    >
                        {Object.entries(languages).map(([code, language]) => (
                            <Link
                                key={code}
                                to={getAlternativePath(code)}
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-300"
                                onClick={() => setIsOpen(false)}
                                role="menuitem"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        setIsOpen(false)
                                    }
                                }}
                            >
                                <span className="mr-3">{language.flag}</span>
                                <span className="flex-1">{language.nativeName}</span>
                                <span className="text-gray-400 text-xs">{language.name}</span>
                            </Link>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default LanguageSwitcher
