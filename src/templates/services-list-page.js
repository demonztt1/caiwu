import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { useTranslation } from "../hooks/use-translation"
import { useLocalizedPath } from "../hooks/use-localized-path"

const ServicesListPage = ({ data, pageContext }) => {
    const services = data.allMarkdownRemark.nodes
    const { t } = useTranslation()
    const { getLocalizedPath } = useLocalizedPath()

    // 获取服务路径
    const getServicePath = (slug) => {
        return getLocalizedPath(slug)
    }

    // 回退情况 - 当没有对应语言的服务时显示默认内容
    if (services.length === 0) {
        // 使用翻译系统中的服务列表
        const serviceList = t('services.serviceList', {
            returnObjects: true,
            defaultValue: []
        })

        // 如果翻译系统中也没有服务列表，使用备用默认内容
        const currentLangServices = serviceList.length > 0 ? serviceList : [
            {
                title: t('services.personal-growth.title', { defaultValue: "Personal Growth Analytics" }),
                description: t('services.personal-growth.description', { defaultValue: "Clear quantitative models for personal development" }),
                features: t('services.personal-growth.features', {
                    returnObjects: true,
                    defaultValue: ["Skills assessment", "Growth path planning", "Performance metrics", "Career development strategies"]
                })
            },
            {
                title: t('services.decision-analysis.title', { defaultValue: "Decision Analysis & Visualization" }),
                description: t('services.decision-analysis.description', { defaultValue: "Transform complex ideas into intuitive visual charts" }),
                features: t('services.decision-analysis.features', {
                    returnObjects: true,
                    defaultValue: ["Data visualization", "State space analysis", "Decision modeling", "Real-time scenario simulation"]
                })
            }
        ]

        return (
            <Layout>
                <Seo title={t('pages.services.title', { defaultValue: "Our Services" })} />

                <section className="py-16">
                    <div className="main-container">
                        <h1 className="text-3xl font-bold text-gray-800 mb-6">
                            {t('pages.services.heading', { defaultValue: "Our Services" })}
                        </h1>

                        <div className="card p-6 mb-8">
                            <p className="text-gray-700 text-lg mb-6">
                                {t('pages.services.description', {
                                    defaultValue: "We provide comprehensive quantitative solutions to support personal growth and business innovation."
                                })}
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            {currentLangServices.map((service, index) => (
                                <div key={index} className="card p-6 border-l-4 border-indigo-500">
                                    <div className="mb-4">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                            {service.title}
                                        </h3>
                                        <p className="text-gray-600 mb-4">{service.description}</p>
                                    </div>

                                    <ul className="space-y-2">
                                        {service.features && service.features.map((feature, featureIndex) => (
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
                                {t('pages.services.cta.title', { defaultValue: "Ready to Get Started?" })}
                            </h2>
                            <p className="text-gray-700 mb-4">
                                {t('pages.services.cta.description', { defaultValue: "Contact us for personalized solutions" })}
                            </p>
                            <Link to={getLocalizedPath("/contact")} className="btn-primary">
                                {t('pages.services.cta.button', { defaultValue: "Consult Now" })}
                            </Link>
                        </div>
                    </div>
                </section>
            </Layout>
        )
    }

    // 正常情况 - 有服务数据时
    return (
        <Layout>
            <Seo title={t('pages.services.title', { defaultValue: "Our Services" })} />

            <section className="py-16">
                <div className="main-container">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">
                        {t('pages.services.heading', { defaultValue: "Our Services" })}
                    </h1>

                    <div className="card p-6 mb-8">
                        <p className="text-gray-700 text-lg mb-6">
                            {t('pages.services.description', {
                                defaultValue: "We provide comprehensive quantitative solutions to support personal growth and business innovation."
                            })}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        {services.map((service, index) => (
                            <Link
                                key={index}
                                to={getServicePath(service.fields.slug)}
                                className="card p-6 border-l-4 border-indigo-500 hover:shadow-lg transition-all duration-300 block"
                            >
                                <div className="mb-4">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                        {service.frontmatter.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4">{service.frontmatter.description}</p>
                                </div>

                                <ul className="space-y-2">
                                    {service.frontmatter.features && service.frontmatter.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-center text-gray-700">
                                            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </Link>
                        ))}
                    </div>

                    <div className="bg-indigo-50 rounded-lg p-6 text-center">
                        <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
                            {t('pages.services.cta.title', { defaultValue: "Ready to Get Started?" })}
                        </h2>
                        <p className="text-gray-700 mb-4">
                            {t('pages.services.cta.description', { defaultValue: "Contact us for personalized solutions" })}
                        </p>
                        <Link to={getLocalizedPath("/contact")} className="btn-primary">
                            {t('pages.services.cta.button', { defaultValue: "Consult Now" })}
                        </Link>
                    </div>
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
          price
          originalPrice
        }
      }
    }
  }
`

export default ServicesListPage
