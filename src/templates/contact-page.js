import React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { useTranslation } from "../hooks/use-translation"

import { Link, graphql } from "gatsby"
const ContactPage = ({ data, pageContext }) => {
    const pageData = data.markdownRemark?.frontmatter
    const { t } = useTranslation()

    // 如果有回退情况（没有对应语言的内容），显示默认内容
    if (pageContext.fallback && !pageData) {
        return (
            <Layout>
                <Seo title={t('pages.contact.title')} />
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">
                        {t('pages.contact.heading')}
                    </h1>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* 联系信息 */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
                                {t('pages.contact.contactInfo')}
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold text-gray-700">
                                        {t('pages.contact.address')}
                                    </h3>
                                    <p className="text-gray-600">北京市朝阳区金融街123号</p>
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
                        <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2">
                            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
                                {t('pages.contact.onlineConsultation')}
                            </h2>

                            <form className="space-y-4">
                                {/* 表单内容与之前相同 */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                            {t('pages.contact.form.name')}
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                            {t('pages.contact.form.email')}
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* 其余表单字段 */}
                                <div className="flex space-x-4">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-300 font-semibold"
                                    >
                                        {t('pages.contact.form.submit')}
                                    </button>
                                    <button
                                        type="button"
                                        className="flex-1 bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition duration-300 font-semibold"
                                    >
                                        {t('pages.contact.form.payNow')}
                                    </button>
                                </div>

                                <div className="text-center text-sm text-gray-500">
                                    <p>{t('pages.contact.form.paymentNote')}</p>
                                    <p>{t('pages.contact.form.paymentNote2')}</p>
                                </div>
                            </form>
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
            </Layout>
        )
    }

    return (
        <Layout>
            <Seo title={pageData.seo_title} />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                    {pageData.heading}
                </h1>

                {/* 这里可以根据 pageData 渲染实际内容 */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
                    />
                </div>
            </div>
        </Layout>
    )
}

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

export default ContactPage
