import React from "react"

import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { useTranslation } from "../hooks/use-translation"

const HomePage = ({ data, pageContext }) => {
    const pageData = data.markdownRemark.frontmatter
    const { t } = useTranslation()

    // 如果有回退情况（没有对应语言的内容），显示默认内容
    if (pageContext.fallback && !pageData) {
        return (
            <Layout>
                <Seo title={t('header.home')} />
                <div className="bg-blue-600 text-white py-16">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl font-bold mb-4">
                            {t('pages.home.hero_title', { defaultValue: "元都-逆熵解决方案" })}
                        </h1>
                        <p className="text-xl mb-8">
                            {t('pages.home.hero_subtitle', { defaultValue: "专业的国际财税咨询、税务筹划和商务服务" })}
                        </p>
                        <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300">
                            {t('pages.home.hero_button', { defaultValue: "免费咨询" })}
                        </button>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-12">
                    <h2 className="text-3xl font-bold text-center mb-8">
                        {t('pages.home.services_title', { defaultValue: "我们的服务" })}
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-3">
                                {t('pages.home.service1_title', { defaultValue: "税务筹划" })}
                            </h3>
                            <p className="text-gray-600">
                                {t('pages.home.service1_desc', { defaultValue: "专业的国际税务筹划服务" })}
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-3">
                                {t('pages.home.service2_title', { defaultValue: "财税合规" })}
                            </h3>
                            <p className="text-gray-600">
                                {t('pages.home.service2_desc', { defaultValue: "确保企业财税操作合规" })}
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-3">
                                {t('pages.home.service3_title', { defaultValue: "商务咨询" })}
                            </h3>
                            <p className="text-gray-600">
                                {t('pages.home.service3_desc', { defaultValue: "全面的商务支持服务" })}
                            </p>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }

    return (
        <Layout>
            <Seo
                title={pageData.seo_title}
                description={pageData.seo_description}
            />
            <div className="bg-blue-600 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold mb-4">{pageData.hero_title}</h1>
                    <p className="text-xl mb-8">{pageData.hero_subtitle}</p>
                    <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300">
                        {pageData.hero_button}
                    </button>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <h2 className="text-3xl font-bold text-center mb-8">{pageData.services_title}</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {pageData.services.map((service, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                            <p className="text-gray-600">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
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
