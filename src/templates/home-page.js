// src/templates/home-page.js
import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { useTranslation } from "../hooks/use-translation"
import { useLocalizedPath } from "../hooks/use-localized-path"

// 1. 定义服务配置映射 (包含图标、路径以及默认文本用于Fallback)
const SERVICE_CONFIG = [
    {
        key: "personal-growth",
        icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
        path: "/personal-growth",
        defaultTitle: "Personal Growth Analytics",
        defaultDesc: "Clear quantitative models for personal development from technical skills to management capabilities."
    },
    {
        key: "decision-analysis",
        icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
        path: "/decision-analysis",
        defaultTitle: "Decision Analysis & Visualization",
        defaultDesc: "Transform complex ideas into intuitive visual charts and state spaces for better decision-making."
    },
    {
        key: "quantitative-trading",
        icon: "M13 10V3L4 14h7v7l9-11h-7z",
        path: "/quantitative-trading",
        defaultTitle: "Quantitative Trading & Strategy Validation",
        defaultDesc: "Backtest and optimize strategies in real market environments."
    },
    {
        key: "sales-finance",
        icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
        path: "/sales-finance",
        defaultTitle: "Sales & Financial Insights",
        defaultDesc: "Establish transparent sales and financial management systems."
    },
    {
        key: "energy-solutions",
        icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
        path: "/energy-solutions",
        defaultTitle: "Innovative Energy Solutions",
        defaultDesc: "Compact automated thermal systems transforming waste into sustainable energy."
    },
    {
        key: "content-ecosystem",
        icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9",
        path: "/content-ecosystem",
        defaultTitle: "Independent Sites & Content Ecosystem",
        defaultDesc: "Professional independent sites and content strategies connecting global partners."
    }
]

const getFallbackData = (language) => {
    const fallbackData = {
        en: {
            hero_title: "Quantify Everything, Build Ecosystem",
            hero_subtitle: "Comprehensive quantitative solutions from personal growth to organizational innovation",
            hero_button: "Explore Solutions",
            services_title: "Six Solution Areas",
            services_subtitle: "From individuals to organizations, from digital to physical, building a complete ecosystem"
        },
        zh: {
            hero_title: "量化万物，共建生态",
            hero_subtitle: "从个人成长到组织决策，从数字策略到实体创新，全方位量化解决方案",
            hero_button: "探索解决方案",
            services_title: "六大解决方案板块",
            services_subtitle: "由内而外，由个人到组织，由数字到实体，构建完整的生态系统"
        }
    }
    return fallbackData[language] || fallbackData.en
}

const HomePage = ({ data, pageContext }) => {
    const pageData = data?.markdownRemark?.frontmatter || getFallbackData(pageContext.language)
    const { t } = useTranslation()
    const { getLocalizedPath } = useLocalizedPath()

    // 结构化数据
    const websiteStructuredData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "元都-逆熵",
        "description": pageData.seo_description || t('pages.home.hero_subtitle', {
            defaultValue: "从个人成长到组织决策，从数字策略到实体创新的全方位量化解决方案"
        }),
        "url": "https://www.rd-v6.com/",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.rd-v6.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
        },
        "inLanguage": pageContext.language
    }

    const organizationStructuredData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "元都-逆熵",
        "description": pageData.seo_description || t('pages.home.hero_subtitle', {
            defaultValue: "从个人成长到组织决策，从数字策略到实体创新的全方位量化解决方案"
        }),
        "url": "https://www.rd-v6.com/",
        "logo": "https://www.rd-v6.com/icons/icon-512x512.png",
        "sameAs": [
            "https://twitter.com/yuandu_nisentropy",
            "https://linkedin.com/company/yuandu-nisentropy"
        ]
    }

    // --- 场景 A: 回退情况 (Markdown 数据缺失或加载失败时) ---
    if (pageContext.fallback || !pageData) {
        return (
            <Layout>
                <Seo
                    title={pageData.seo_title || t('pages.home.hero_title', { defaultValue: "量化万物，共建生态" })}
                    description={pageData.seo_description || t('pages.home.hero_subtitle', {
                        defaultValue: "从个人成长到组织决策，从数字策略到实体创新的全方位量化解决方案"
                    })}
                    lang={pageContext.language}
                />

                {/* 结构化数据 */}
                <script type="application/ld+json">
                    {JSON.stringify(websiteStructuredData)}
                </script>
                <script type="application/ld+json">
                    {JSON.stringify(organizationStructuredData)}
                </script>

                {/* Hero 区域 (Fallback) */}
                <section className="hero-section-elegant text-white py-24">
                    <div className="main-container text-center">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                            {t('pages.home.hero_title', { defaultValue: "Quantify Everything, Build Ecosystem" })}
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
                            {t('pages.home.hero_subtitle', {
                                defaultValue: "Comprehensive quantitative solutions from personal growth to organizational decision-making."
                            })}
                        </p>
                        <Link
                            to={getLocalizedPath("/contact")}
                            className="btn-primary text-lg px-8 py-4 bg-white text-indigo-600 hover:bg-gray-100 font-semibold transition-all duration-300 transform hover:scale-105 inline-block"
                        >
                            {t('pages.home.hero_button', { defaultValue: "Explore Solutions" })}
                        </Link>
                    </div>
                </section>

                {/* 六大解决方案板块 (Fallback) */}
                <section className="py-20 bg-gray-50">
                    <div className="main-container">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">
                                {t('pages.home.services_title', { defaultValue: "Solution Areas" })}
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                {t('pages.home.services_subtitle', {
                                    defaultValue: "Building a complete ecosystem from digital to physical."
                                })}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {SERVICE_CONFIG.map((config) => (
                                <Link
                                    key={config.key}
                                    to={getLocalizedPath(config.path)}
                                    className="card text-center p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white block"
                                >
                                    <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={config.icon} />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 text-gray-800">
                                        {t(`pages.home.services.${config.key}.title`, {
                                            defaultValue: config.defaultTitle
                                        })}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {t(`pages.home.services.${config.key}.description`, {
                                            defaultValue: config.defaultDesc
                                        })}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </Layout>
        )
    }

    // --- 场景 B: 正常情况 (读取到了 Markdown 数据) ---
    return (
        <Layout>
            <Seo
                title={pageData.seo_title || t('pages.home.hero_title', { defaultValue: "量化万物，共建生态" })}
                description={pageData.seo_description || t('pages.home.hero_subtitle', {
                    defaultValue: "从个人成长到组织决策，从数字策略到实体创新的全方位量化解决方案"
                })}
                lang={pageContext.language}
            />

            {/* 结构化数据 */}
            <script type="application/ld+json">
                {JSON.stringify(websiteStructuredData)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify(organizationStructuredData)}
            </script>

            <section className="hero-section-elegant text-white py-24">
                <div className="main-container text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                        {pageData.hero_title}
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
                        {pageData.hero_subtitle}
                    </p>
                    <Link
                        to={getLocalizedPath("/contact")}
                        className="btn-primary text-lg px-8 py-4 bg-white text-indigo-600 hover:bg-gray-100 font-semibold transition-all duration-300 transform hover:scale-105 inline-block"
                    >
                        {pageData.hero_button}
                    </Link>
                </div>
            </section>

            <section className="py-20 bg-gray-50">
                <div className="main-container">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            {pageData.services_title}
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            {pageData.services_subtitle}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {pageData.solution_areas?.map((service, index) => {
                            const config = SERVICE_CONFIG[index] || SERVICE_CONFIG[0]

                            return (
                                <Link
                                    key={index}
                                    to={getLocalizedPath(config.path)}
                                    className="card text-center p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white block"
                                >
                                    <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={config.icon} />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 text-gray-800">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {service.description}
                                    </p>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export const query = graphql`
  query HomePageQuery($language: String!) {
    markdownRemark(
      frontmatter: { 
        template: { eq: "home" }
        language: { eq: $language }
      }
    ) {
      frontmatter {
        hero_title
        hero_subtitle
        hero_button
        services_title
        services_subtitle
        solution_areas {
          title
          description
        }
        seo_title
        seo_description
      }
    }
  }
`

export default HomePage
