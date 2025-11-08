import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { useTranslation } from "../hooks/use-translation"
import { useLocalizedPath } from "../hooks/use-localized-path"

const ProductPage = ({ data, pageContext }) => {
    const product = data.markdownRemark
    const { t } = useTranslation()
    const { getLocalizedPath } = useLocalizedPath()

    // 获取联系页面的本地化路径
    const contactPath = getLocalizedPath("/contact")

    return (
        <Layout>
            <Seo
                title={product.frontmatter.title}
                description={product.frontmatter.description}
            />

            {/* 使用内容容器居中 */}
            <section className="py-16">
                <div className="main-container">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                        {product.frontmatter.title}
                    </h1>

                    <div className="card p-6 mb-6">
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="md:w-2/3">
                                <p className="text-gray-700 text-lg mb-6">
                                    {product.frontmatter.description}
                                </p>

                                <div className="mb-6">
                                    <h3 className="text-xl font-semibold mb-3">服务特色</h3>
                                    <ul className="space-y-2">
                                        {product.frontmatter.features && product.frontmatter.features.map((feature, index) => (
                                            <li key={index} className="flex items-center text-gray-700">
                                                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="md:w-1/3">
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <div className="text-center mb-4">
                                        <span className="text-3xl font-bold text-indigo-600">
                                            ¥{product.frontmatter.price}
                                        </span>
                                        {product.frontmatter.originalPrice && (
                                            <div className="text-sm text-gray-500 line-through">
                                                原价: ¥{product.frontmatter.originalPrice}
                                            </div>
                                        )}
                                    </div>

                                    <a
                                        href={contactPath}
                                        className="btn-primary block w-full mb-3 text-center"
                                    >
                                        立即购买
                                    </a>

                                    <a
                                        href={contactPath}
                                        className="block w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300 text-center"
                                    >
                                        联系定制
                                    </a>

                                    <div className="mt-4 text-center text-sm text-gray-600">
                                        <p>支持支付宝、微信支付</p>
                                        <p>7×24小时技术支持</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: product.html }}
                    />
                </div>
            </section>
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
      }
      fields {
        slug
        language
      }
    }
  }
`

export default ProductPage
