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
                                lang
                            }) {
    const location = useLocation()
    const { siteUrl, defaultTitle, defaultDescription, defaultImage } = useSiteMetadata()

    // 从路径检测语言
    const getCurrentLanguage = () => {
        if (typeof window === "undefined") return defaultLanguage

        const path = location.pathname
        for (const language of Object.keys(languages)) {
            if (path.startsWith(`/${language}/`) || path === `/${language}`) {
                return language
            }
        }
        return defaultLanguage
    }

    const currentLang = getCurrentLanguage()
    const seo = {
        title: title || defaultTitle,
        description: description || defaultDescription,
        image: `${siteUrl}${image || defaultImage}`,
        url: `${siteUrl}${location.pathname}`,
        lang: currentLang,
    }

    // 生成多语言替代链接 - 修复：使用 Object.keys(languages) 而不是 languageCodes
    const alternateLinks = Object.keys(languages).map(langCode => ({
        rel: 'alternate',
        hreflang: langCode,
        href: `${siteUrl}/${langCode}${location.pathname.replace(/^\/[a-z]{2}/, '') || ''}`
    }))

    return (
        <Helmet
            htmlAttributes={{ lang: seo.lang }}
            title={seo.title}
            meta={[
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
            ]}
        >
            {alternateLinks.map(link => (
                <link key={link.hreflang} {...link} />
            ))}
            <link rel="canonical" href={seo.url} />
        </Helmet>
    )
}
