import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const ProductsPage = ({ data }) => {
    const products = data.allMarkdownRemark.nodes

    return (
        <Layout>
            <Seo title="我们的产品" />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">我们的产品</h1>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map(product => (
                        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                    {product.frontmatter.title}
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    {product.frontmatter.description}
                                </p>

                                <div className="mb-4">
                  <span className="text-2xl font-bold text-blue-600">
                    ¥{product.frontmatter.price}
                  </span>
                                    {product.frontmatter.originalPrice && (
                                        <span className="ml-2 text-sm text-gray-500 line-through">
                      ¥{product.frontmatter.originalPrice}
                    </span>
                                    )}
                                </div>

                                <ul className="mb-4 space-y-1">
                                    {product.frontmatter.features.map((feature, index) => (
                                        <li key={index} className="flex items-center text-sm text-gray-600">
                                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <div className="flex space-x-2">
                                    <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
                                        立即购买
                                    </button>
                                    <Link
                                        to="/contact"
                                        className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded text-center hover:bg-gray-300 transition duration-300"
                                    >
                                        定制咨询
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { frontmatter: { category: { eq: "网站建设" } } }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        id
        frontmatter {
          title
          description
          price
          originalPrice
          category
          features
        }
        fields {
          slug
        }
      }
    }
  }
`

export default ProductsPage
