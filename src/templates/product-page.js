import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const ProductPage = ({ data }) => {
    const product = data.markdownRemark

    return (
        <Layout>
            <Seo
                title={product.frontmatter.title}
                description={product.frontmatter.description}
            />
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                        {product.frontmatter.title}
                    </h1>

                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="md:w-2/3">
                                <p className="text-gray-700 text-lg mb-6">
                                    {product.frontmatter.description}
                                </p>

                                <div className="mb-6">
                                    <h3 className="text-xl font-semibold mb-3">服务特色</h3>
                                    <ul className="space-y-2">
                                        {product.frontmatter.features.map((feature, index) => (
                                            <li key={index} className="flex items-center text-gray-700">
                                                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="md:w-1/3">
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <div className="text-center mb-4">
                    <span className="text-3xl font-bold text-blue-600">
                      ¥{product.frontmatter.price}
                    </span>
                                        {product.frontmatter.originalPrice && (
                                            <div className="text-sm text-gray-500 line-through">
                                                原价: ¥{product.frontmatter.originalPrice}
                                            </div>
                                        )}
                                    </div>

                                    <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 mb-3">
                                        立即购买
                                    </button>

                                    <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300">
                                        联系定制
                                    </button>

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
      }
    }
  }
`

export default ProductPage
