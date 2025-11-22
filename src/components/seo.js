import React from "react"
import { useLocation } from "@reach/router"
import { Helmet } from "react-helmet"
import { useSiteMetadata } from "../hooks/use-site-metadata"
import { languages, defaultLanguage } from "../config/languages"

export default function Seo({
                                title,
                                description,
                                image,
                                article,
                                lang,
                                pathname: explicitPathname
                            }) {
    const location = useLocation()
    const { siteUrl, defaultTitle, defaultDescription, defaultImage } = useSiteMetadata()

    // 使用显式传递的路径名或当前location
    const currentPathname = explicitPathname || location.pathname

    // 修复的语言检测逻辑
    const getCurrentLanguage = () => {
        // 如果显式传递了语言，优先使用
        if (lang) return lang

        if (typeof window === "undefined") return defaultLanguage

        const path = currentPathname

        // 特殊处理根路径
        if (path === '/') return defaultLanguage

        // 检测语言前缀
        for (const language of Object.keys(languages)) {
            if (path === `/${language}` || path.startsWith(`/${language}/`)) {
                return language
            }
        }
        return defaultLanguage
    }

    const currentLang = getCurrentLanguage()

    // 构建规范的 URL
    const getCanonicalUrl = () => {
        let canonicalPath = currentPathname

        // 如果是默认语言且路径包含语言前缀，移除它
        if (currentLang === defaultLanguage && currentPathname.startsWith(`/${defaultLanguage}`)) {
            canonicalPath = currentPathname.replace(`/${defaultLanguage}`, '') || '/'
        }

        return `${siteUrl}${canonicalPath}`
    }

    const seo = {
        title: title || defaultTitle,
        description: description || defaultDescription,
        image: `${siteUrl}${image || defaultImage}`,
        url: getCanonicalUrl(),
        lang: currentLang,
    }

    // 修复的 alternateLinks 生成
    const alternateLinks = Object.keys(languages).map(langCode => {
        let alternatePath = currentPathname

        // 如果当前路径有语言前缀，替换它
        const currentLangPrefix = `/${currentLang}`
        if (currentPathname.startsWith(currentLangPrefix)) {
            alternatePath = currentPathname.replace(currentLangPrefix, '') || '/'
        }

        // 为默认语言生成特殊的 alternate 链接
        if (langCode === defaultLanguage) {
            return {
                rel: 'alternate',
                hreflang: 'x-default',
                href: `${siteUrl}${alternatePath}`
            }
        }

        // 为非默认语言添加语言前缀
        const href = langCode === defaultLanguage
            ? `${siteUrl}${alternatePath}`
            : `${siteUrl}/${langCode}${alternatePath === '/' ? '' : alternatePath}`

        return {
            rel: 'alternate',
            hreflang: langCode,
            href: href
        }
    })

    // 基础 meta 标签
    const baseMeta = [
        {
            name: `description`,
            content: seo.description,
        },
        {
            property: `og:title`,
            content: seo.title,
        },
        {
            property: `og:description`,
            content: seo.description,
        },
        {
            property: `og:type`,
            content: article ? `article` : `website`,
        },
        {
            property: `og:url`,
            content: seo.url,
        },
        {
            property: `og:image`,
            content: seo.image,
        },
        {
            property: `og:locale`,
            content: currentLang,
        },
        {
            name: `twitter:card`,
            content: `summary_large_image`,
        },
        {
            name: `twitter:title`,
            content: seo.title,
        },
        {
            name: `twitter:description`,
            content: seo.description,
        },
        {
            name: `twitter:image`,
            content: seo.image,
        },
    ]

    return (
        <Helmet
            htmlAttributes={{ lang: seo.lang }}
            title={seo.title}
            titleTemplate={`%s | ${defaultTitle}`}
            meta={baseMeta}
        >
            {/* 必要的 meta 标签 */}
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#005b99" />

            {/* 多语言替代链接 */}
            {alternateLinks.map(link => (
                <link key={link.hreflang} {...link} />
            ))}

            {/* 规范链接 */}
            <link rel="canonical" href={seo.url} />

            {/* 结构化数据（可选） */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "WebSite",
                    "name": defaultTitle,
                    "description": defaultDescription,
                    "url": siteUrl,
                    "inLanguage": currentLang
                })}
            </script>
        </Helmet>
    )
}
