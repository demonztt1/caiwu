// src/components/content-fallback.js
import React from "react"
import { Link } from "gatsby"
import { useTranslation } from "../hooks/use-translation"

const ContentFallback = ({ contentType, currentLanguage, defaultLanguage }) => {
    const { t } = useTranslation()

    const getContentTypeText = () => {
        switch(contentType) {
            case 'product':
                return currentLanguage === 'zh' ? '产品' : 'product'
            case 'service':
                return currentLanguage === 'zh' ? '服务' : 'service'
            case 'blog':
                return currentLanguage === 'zh' ? '博客文章' : 'blog post'
            default:
                return currentLanguage === 'zh' ? '内容' : 'content'
        }
    }

    return (
        <div className="container mx-auto px-4 py-16 text-center">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                    {currentLanguage === 'zh'
                        ? `${getContentTypeText()}内容正在准备中...`
                        : `${getContentTypeText.charAt(0).toUpperCase() + getContentTypeText.slice(1)} content is being prepared...`
                    }
                </h1>
                <p className="text-gray-600 mb-8 text-lg">
                    {currentLanguage === 'zh'
                        ? `我们正在准备该${getContentTypeText()}的${currentLanguage === 'zh' ? '中文' : '英文'}版本内容，敬请期待。`
                        : `We are preparing the ${currentLanguage} version of this ${getContentTypeText()}. Please check back soon.`
                    }
                </p>

                {/* 提供其他语言的链接（如果有） */}
                <div className="mb-8">
                    <p className="text-gray-700 mb-4">
                        {currentLanguage === 'zh'
                            ? '您也可以查看其他语言版本：'
                            : 'You can also view in other languages:'
                        }
                    </p>
                    <div className="flex justify-center space-x-4">
                        {currentLanguage !== 'zh' && (
                            <Link
                                to={window.location.pathname.replace(`/${currentLanguage}`, '')}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
                            >
                                中文版本
                            </Link>
                        )}
                        {currentLanguage !== 'en' && (
                            <Link
                                to={`/en${window.location.pathname.replace(`/${currentLanguage}`, '')}`}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
                            >
                                English Version
                            </Link>
                        )}
                    </div>
                </div>

                <div className="flex justify-center space-x-4">
                    <Link
                        to={currentLanguage === defaultLanguage ? '/' : `/${currentLanguage}`}
                        className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition duration-300"
                    >
                        {t('pages.404.goHome')}
                    </Link>
                    <Link
                        to={currentLanguage === defaultLanguage ? '/contact' : `/${currentLanguage}/contact`}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        {t('header.contact')}
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ContentFallback
