import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { useTranslation } from "../hooks/use-translation"
import {defaultLanguage, languages} from "../config/languages"

const ServicesListPage = ({ data, pageContext }) => {
    const services = data.allMarkdownRemark.nodes
    const { t } = useTranslation()
    const { language } = pageContext

    // 修复的本地化路径函数
    const getLocalizedPath = (path, contentLanguage) => {
        // 如果路径已经以语言前缀开头，先清理它
        let cleanPath = path
        Object.keys(languages).forEach(lang => {
            if (path.startsWith(`/${lang}/`)) {
                cleanPath = path.replace(`/${lang}`, '')
            } else if (path === `/${lang}`) {
                cleanPath = '/'
            }
        })

        // 如果当前页面语言是默认语言，直接返回清理后的路径
        if (pageContext.language === defaultLanguage) {
            return cleanPath
        } else {
            // 否则添加当前页面语言前缀
            return cleanPath === '/' ? `/${pageContext.language}` : `/${pageContext.language}${cleanPath}`
        }
    }

    // 获取固定页面的本地化路径
    const getFixedLocalizedPath = (path) => {
        if (pageContext.language === defaultLanguage) {
            return path
        } else {
            return `/${pageContext.language}${path}`
        }
    }

    // 如果有回退情况（没有对应语言的内容），显示默认内容
    if (pageContext.fallback && services.length === 0) {
        return (
            <Layout>
                <Seo title={t('pages.services.title')} />

                {/* 使用内容容器居中 */}
                <section className="py-16">
                    <div className="main-container">
                        <h1 className="text-3xl font-bold text-gray-800 mb-6">
                            {t('pages.services.heading')}
                        </h1>

                        <div className="card p-6 mb-8">
                            <p className="text-gray-700 text-lg mb-6">
                                {t('pages.services.description')}
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            {t('pages.services.serviceList', { returnObjects: true }).map((service, index) => (
                                <div key={index} className="card p-6 border-l-4 border-indigo-500">
                                    <div className="flex items-start mb-4">
                                        <span className="text-3xl mr-4">{service.icon}</span>
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
                                            <p className="text-gray-600 mb-4">{service.description}</p>
                                        </div>
                                    </div>

                                    <ul className="space-y-2">
                                        {service.features.map((feature, featureIndex) => (
                                            <li key={featureIndex} className="flex items-center text-gray-700">
                                                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        <div className="bg-indigo-50 rounded-lg p-6 text-center">
                            <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
                                {t('pages.services.cta.title')}
                            </h2>
                            <p className="text-gray-700 mb-4">{t('pages.services.cta.description')}</p>
                            <Link to={getFixedLocalizedPath("/contact")} className="btn-primary">
                                {t('pages.services.cta.button')}
                            </Link>
                        </div>
                    </div>
                </section>
            </Layout>
        )
    }

    return (
        <Layout>
            <Seo title={t('pages.services.title')} />

            {/* 使用内容容器居中 */}
            <section className="py-16">
                <div className="main-container">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">
                        {t('pages.services.heading')}
                    </h1>

                    {services.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-600 text-lg">
                                {pageContext.language === 'zh'
                                    ? '暂无服务内容'
                                    : 'No services available'}
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="card p-6 mb-8">
                                <p className="text-gray-700 text-lg mb-6">
                                    {t('pages.services.description')}
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 mb-8">
                                {services.map((service, index) => (
                                    <div key={index} className="card p-6 border-l-4 border-indigo-500">
                                        <div className="flex items-start mb-4">
                                            <span className="text-3xl mr-4">{service.frontmatter.icon || '📊'}</span>
                                            <div>
                                                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                                    <Link
                                                        to={getLocalizedPath(service.fields.slug, service.fields.language)}
                                                        className="hover:text-indigo-600 transition duration-300"
                                                    >
                                                        {service.frontmatter.title}
                                                    </Link>
                                                </h3>
                                                <p className="text-gray-600 mb-4">{service.frontmatter.description}</p>
                                            </div>
                                        </div>

                                        <ul className="space-y-2">
                                            {service.frontmatter.features && service.frontmatter.features.map((feature, featureIndex) => (
                                                <li key={featureIndex} className="flex items-center text-gray-700">
                                                    <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-indigo-50 rounded-lg p-6 text-center">
                                <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
                                    {t('pages.services.cta.title')}
                                </h2>
                                <p className="text-gray-700 mb-4">{t('pages.services.cta.description')}</p>
                                <Link to={getFixedLocalizedPath("/contact")} className="btn-primary">
                                    {t('pages.services.cta.button')}
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </section>
        </Layout>
    )
}

export const query = graphql`
  query($language: String!) {
    allMarkdownRemark(
      filter: { 
        frontmatter: { 
          template: { eq: "service" }
        }
        fields: { 
          language: { eq: $language }
        }
      }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        id
        fields {
          slug
          language
        }
        frontmatter {
          title
          description
          features
          icon
          price
          originalPrice
        }
      }
    }
  }
`

export default ServicesListPage
