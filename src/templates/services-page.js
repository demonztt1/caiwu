// src/templates/services-page.js
import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { useTranslation } from "../hooks/use-translation"
import { useLocalizedPath } from "../hooks/use-localized-path"
import LanguageSwitcher from "../components/language-switcher"
import SimplePaymentFlow from '../components/simple-payment-flow'
import { defaultLanguage } from "../config/languages"

const ServicePage = ({ data, pageContext }) => {
    const service = data.markdownRemark
    const { t } = useTranslation()
    const { getLocalizedPath } = useLocalizedPath()
    const [showPayment, setShowPayment] = useState(false)

    // 修复的路径生成函数
    const getFixedLocalizedPath = (path) => {
        if (pageContext.language === defaultLanguage) {
            return path
        } else {
            return `/${pageContext.language}${path}`
        }
    }

    const contactPath = getFixedLocalizedPath("/contact")
    const servicesPath = getFixedLocalizedPath("/services")

    // 结构化数据
    const serviceStructuredData = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": service.frontmatter.title,
        "description": service.frontmatter.description,
        "provider": {
            "@type": "Organization",
            "name": "元都-逆熵"
        },
        "areaServed": "CN",
        "offers": {
            "@type": "Offer",
            "price": service.frontmatter.price,
            "priceCurrency": "CNY"
        }
    }

    // 修复支付流程渲染 - 与 product-page.js 保持一致
    if (showPayment) {
        return (
            <Layout>
                <Seo
                    title={`${t('payment.title', { defaultValue: "支付" })} - ${service.frontmatter.title}`}
                    lang={pageContext.language}
                />
                <section className="py-16">
                    <div className="main-container">
                        <button
                            onClick={() => setShowPayment(false)}
                            className="mb-6 btn-secondary"
                        >
                            ← {t('common.back', { defaultValue: "返回" })}
                        </button>
                        <SimplePaymentFlow
                            product={service.frontmatter}
                            amount={service.frontmatter.price}
                            type="service"
                        />
                    </div>
                </section>
            </Layout>
        )
    }

    return (
        <Layout>
            <Seo
                title={service.frontmatter.title}
                description={service.frontmatter.description}
                lang={pageContext.language}
            />

            {/* 结构化数据 */}
            <script type="application/ld+json">
                {JSON.stringify(serviceStructuredData)}
            </script>

            <section className="py-16">
                <div className="main-container">
                    {/* 面包屑导航 */}
                    <nav className="flex justify-between items-center mb-6">
                        <div className="text-sm text-gray-600">
                            <Link to={getFixedLocalizedPath("/")} className="hover:text-indigo-600">
                                {t('common.home', { defaultValue: "首页" })}
                            </Link>
                            <span className="mx-2">/</span>
                            <Link to={servicesPath} className="hover:text-indigo-600">
                                {t('common.services', { defaultValue: "服务" })}
                            </Link>
                            <span className="mx-2">/</span>
                            <span>{service.frontmatter.title}</span>
                        </div>
                        <LanguageSwitcher currentLanguage={pageContext.language} />
                    </nav>

                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                        {service.frontmatter.title}
                    </h1>

                    <div className="card p-6 mb-6">
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="md:w-2/3">
                                <p className="text-gray-700 text-lg mb-6">
                                    {service.frontmatter.description}
                                </p>

                                <div className="mb-6">
                                    <h3 className="text-xl font-semibold mb-3">
                                        {t('services.features_title', { defaultValue: "服务内容" })}
                                    </h3>
                                    <ul className="space-y-2">
                                        {service.frontmatter.features && service.frontmatter.features.map((feature, index) => (
                                            <li key={index} className="flex items-center text-gray-700">
                                                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {service.frontmatter.process && (
                                    <div className="mb-6">
                                        <h3 className="text-xl font-semibold mb-3">
                                            {t('services.process_title', { defaultValue: "服务流程" })}
                                        </h3>
                                        <ol className="space-y-2 list-decimal list-inside">
                                            {service.frontmatter.process.map((step, index) => (
                                                <li key={index} className="text-gray-700">
                                                    {step}
                                                </li>
                                            ))}
                                        </ol>
                                    </div>
                                )}
                            </div>

                            <div className="md:w-1/3">
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <div className="text-center mb-4">
                                        <span className="text-3xl font-bold text-green-600">
                                            {/* 统一货币符号 */}
                                            {t('common.currency', { defaultValue: "¥" })}{service.frontmatter.price}
                                        </span>
                                        {service.frontmatter.originalPrice && (
                                            <div className="text-sm text-gray-500 line-through">
                                                {t('services.original_price', { defaultValue: "原价" })}: {t('common.currency', { defaultValue: "¥" })}{service.frontmatter.originalPrice}
                                            </div>
                                        )}
                                        {service.frontmatter.duration && (
                                            <div className="text-sm text-gray-600 mt-2">
                                                {t('services.duration', { defaultValue: "服务周期" })}: {service.frontmatter.duration}
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        onClick={() => setShowPayment(true)}
                                        className="btn-primary block w-full mb-3 text-center"
                                    >
                                        {t('payment.usdt_payment', { defaultValue: "USDT立即支付" })}
                                    </button>

                                    <Link
                                        to={contactPath}
                                        className="block w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300 text-center"
                                    >
                                        {t('services.custom_solution', { defaultValue: "定制方案" })}
                                    </Link>

                                    <div className="mt-4 text-center text-sm text-gray-600">
                                        <p>{t('payment.solana_support', { defaultValue: "支持Solana USDT支付" })}</p>
                                        <p>{t('payment.contract_support', { defaultValue: "签订正式服务合同" })}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: service.html }}
                    />
                </div>
            </section>
        </Layout>
    )
}

export const query = graphql`
  query($id: String!, $language: String!) {
    markdownRemark(
      id: { eq: $id }
      fields: { language: { eq: $language } }
    ) {
      id
      html
      frontmatter {
        title
        description
        price
        originalPrice
        features
        category
        duration
        process
      }
      fields {
        slug
        language
      }
    }
  }
`

export default ServicePage
