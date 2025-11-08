import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { useTranslation } from "../hooks/use-translation"
import { useLocalizedPath } from "../hooks/use-localized-path"

const ServicePage = ({ data }) => {
    const service = data.markdownRemark
    const { t } = useTranslation()
    const { getLocalizedPath } = useLocalizedPath()

    // 获取联系页面的本地化路径
    const contactPath = getLocalizedPath("/contact")

    return (
        <Layout>
            <Seo
                title={service.frontmatter.title}
                description={service.frontmatter.description}
            />
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                        {service.frontmatter.title}
                    </h1>

                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="md:w-2/3">
                                <p className="text-gray-700 text-lg mb-6">
                                    {service.frontmatter.description}
                                </p>

                                <div className="mb-6">
                                    <h3 className="text-xl font-semibold mb-3">服务内容</h3>
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
                                        <h3 className="text-xl font-semibold mb-3">服务流程</h3>
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
                                            ¥{service.frontmatter.price}
                                        </span>
                                        {service.frontmatter.originalPrice && (
                                            <div className="text-sm text-gray-500 line-through">
                                                原价: ¥{service.frontmatter.originalPrice}
                                            </div>
                                        )}
                                        {service.frontmatter.duration && (
                                            <div className="text-sm text-gray-600 mt-2">
                                                服务周期: {service.frontmatter.duration}
                                            </div>
                                        )}
                                    </div>

                                    <a
                                        href={contactPath}
                                        className="block w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300 mb-3 text-center"
                                    >
                                        立即咨询
                                    </a>

                                    <a
                                        href={contactPath}
                                        className="block w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 text-center"
                                    >
                                        定制方案
                                    </a>

                                    <div className="mt-4 text-center text-sm text-gray-600">
                                        <p>专业顾问1对1服务</p>
                                        <p>签订正式服务合同</p>
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
            </div>
        </Layout>
    )
}

export const query = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
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
