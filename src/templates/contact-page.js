import React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { useTranslation } from "../hooks/use-translation"
import MultiLanguageContact from "../components/MultiLanguageContact"
import {graphql} from "gatsby";

const ContactPage = ({ data, pageContext }) => {
    const pageData = data.markdownRemark?.frontmatter
    const { t } = useTranslation()
    const { language } = pageContext

    // 如果有回退情况（没有对应语言的内容），显示默认内容
    if (pageContext.fallback && !pageData) {
        return (
            <Layout>
                <Seo title={t('pages.contact.title')} />

                <section className="py-16">
                    <div className="main-container">
                        <h1 className="text-3xl font-bold text-gray-800 mb-6">
                            {t('pages.contact.heading')}
                        </h1>

                        <div className="grid md:grid-cols-3 gap-8">
                            {/* 联系信息 */}
                            <div className="card p-6">
                                <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
                                    {t('pages.contact.contactInfo')}
                                </h2>

                                <div className="space-y-4">
                                    <div>
                                        <h3 className="font-semibold text-gray-700">
                                            {t('pages.contact.address')}
                                        </h3>
                                        <p className="text-gray-600">
                                            {language === 'zh' ? '北京市朝阳区金融街123号' :
                                                language === 'en' ? 'Financial Street 123, Chaoyang District, Beijing' :
                                                    '北京市朝陽区金融街123号'}
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-gray-700">
                                            {t('pages.contact.phone')}
                                        </h3>
                                        <p className="text-gray-600">+86 158 4946 7131</p>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-gray-700">
                                            {t('pages.contact.email')}
                                        </h3>
                                        <p className="text-gray-600">276852953@qq.com</p>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-gray-700">
                                            {t('pages.contact.workingHours')}
                                        </h3>
                                        <p className="text-gray-600">
                                            {t('pages.contact.hours')}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* 在线咨询 */}
                            <div className="card p-6 md:col-span-2">
                                <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
                                    {t('pages.contact.onlineConsultation')}
                                </h2>

                                <MultiLanguageContact currentLanguage={language} />
                            </div>
                        </div>

                        {/* 支付方式说明 */}
                        <div className="mt-8 bg-gray-50 rounded-lg p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                {t('pages.contact.paymentMethods')}
                            </h2>
                            <div className="grid md:grid-cols-4 gap-4 text-center">
                                {t('pages.contact.paymentOptions', { returnObjects: true }).map((payment, index) => (
                                    <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                                        <div className="text-2xl mb-2">{payment.icon}</div>
                                        <h3 className="font-semibold">{payment.name}</h3>
                                        <p className="text-sm text-gray-600">{payment.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        )
    }

    // 正常情况 - 显示 Markdown 内容 + 在线咨询
    return (
        <Layout>
            <Seo title={pageData.seo_title} />

            <section className="py-16">
                <div className="main-container">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">
                        {pageData.heading}
                    </h1>

                    {/* Markdown 内容 */}
                    <div className="card p-6 mb-8">
                        <div
                            className="prose max-w-none"
                            dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
                        />
                    </div>

                    {/* 在线咨询部分 */}
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* 联系信息 */}
                        <div className="card p-6">
                            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
                                {t('pages.contact.contactInfo')}
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold text-gray-700">
                                        {t('pages.contact.address')}
                                    </h3>
                                    <p className="text-gray-600">
                                        {language === 'zh' ? '北京市朝阳区金融街123号' :
                                            language === 'en' ? 'Financial Street 123, Chaoyang District, Beijing' :
                                                '北京市朝陽区金融街123号'}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-gray-700">
                                        {t('pages.contact.phone')}
                                    </h3>
                                    <p className="text-gray-600">+86 158 4946 7131</p>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-gray-700">
                                        {t('pages.contact.email')}
                                    </h3>
                                    <p className="text-gray-600">276852953@qq.com</p>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-gray-700">
                                        {t('pages.contact.workingHours')}
                                    </h3>
                                    <p className="text-gray-600">
                                        {t('pages.contact.hours')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* 在线咨询 */}
                        <div className="card p-6 md:col-span-2">
                            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
                                {t('pages.contact.onlineConsultation')}
                            </h2>

                            <MultiLanguageContact currentLanguage={language} />
                        </div>
                    </div>

                    {/* 支付方式说明 */}
                    <div className="mt-8 bg-gray-50 rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            {t('pages.contact.paymentMethods')}
                        </h2>
                        <div className="grid md:grid-cols-4 gap-4 text-center">
                            {t('pages.contact.paymentOptions', { returnObjects: true }).map((payment, index) => (
                                <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                                    <div className="text-2xl mb-2">{payment.icon}</div>
                                    <h3 className="font-semibold">{payment.name}</h3>
                                    <p className="text-sm text-gray-600">{payment.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default ContactPage


// 在 contact-page.js 中更新查询
export const query = graphql`
  query($language: String!) {
    markdownRemark(
      frontmatter: { 
        template: { eq: "contact" }
        language: { eq: $language }
      }
    ) {
      frontmatter {
        heading
        seo_title
      }
      html
    }
  }
`
