import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { useTranslation } from "../hooks/use-translation"

const HomePage = ({ data, pageContext }) => {
    const pageData = data.markdownRemark?.frontmatter
    const { t } = useTranslation()

    // 如果有回退情况（没有对应语言的内容），显示默认内容
    if (pageContext.fallback && !pageData) {
        return (
            <Layout>
                <Seo title={t('header.home')} />

                {/* Hero 区域 - 使用新的渐变背景，限制宽度 */}
                <section className="hero-section-elegant text-white py-20">
                    <div className="hero-container text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            {t('pages.home.hero_title', { defaultValue: "元都-逆熵解决方案" })}
                        </h1>
                        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                            {t('pages.home.hero_subtitle', { defaultValue: "专业的国际财税咨询、税务筹划和商务服务" })}
                        </p>
                        <button className="btn-primary text-lg px-8 py-3">
                            {t('pages.home.hero_button', { defaultValue: "免费咨询" })}
                        </button>
                    </div>
                </section>

                {/* 主要内容区域 - 使用内容容器居中 */}
                <section className="py-16">
                    <div className="main-container">
                        <h2 className="text-3xl font-bold text-center mb-12">
                            {t('pages.home.services_title', { defaultValue: "我们的服务" })}
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="card text-center p-8">
                                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-3">
                                    {t('pages.home.service1_title', { defaultValue: "税务筹划" })}
                                </h3>
                                <p className="text-gray-600">
                                    {t('pages.home.service1_desc', { defaultValue: "专业的国际税务筹划服务" })}
                                </p>
                            </div>
                            <div className="card text-center p-8">
                                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-3">
                                    {t('pages.home.service2_title', { defaultValue: "财税合规" })}
                                </h3>
                                <p className="text-gray-600">
                                    {t('pages.home.service2_desc', { defaultValue: "确保企业财税操作合规" })}
                                </p>
                            </div>
                            <div className="card text-center p-8">
                                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-3">
                                    {t('pages.home.service3_title', { defaultValue: "商务咨询" })}
                                </h3>
                                <p className="text-gray-600">
                                    {t('pages.home.service3_desc', { defaultValue: "全面的商务支持服务" })}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        )
    }

    return (
        <Layout>
            <Seo
                title={pageData.seo_title}
                description={pageData.seo_description}
            />

            {/* Hero 区域 - 关键修改：移除硬编码的蓝色背景，使用新的渐变背景 */}
            <section className="hero-section-elegant text-white py-20">
                <div className="hero-container text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">{pageData.hero_title}</h1>
                    <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">{pageData.hero_subtitle}</p>
                    <button className="btn-primary text-lg px-8 py-3">
                        {pageData.hero_button}
                    </button>
                </div>
            </section>

            {/* 主要内容区域 - 使用内容容器居中 */}
            <section className="py-16">
                <div className="main-container">
                    <h2 className="text-3xl font-bold text-center mb-12">{pageData.services_title}</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {pageData.services?.map((service, index) => (
                            <div key={index} className="card text-center p-8">
                                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                                <p className="text-gray-600">{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export const query = graphql`
  query($language: String!) {
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
        services {
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
