import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogPage = ({ data }) => {
    const posts = data.allMarkdownRemark.nodes

    return (
        <Layout>
            <Seo title="博客文章" />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">最新文章</h1>

                <div className="grid gap-6">
                    {posts.map(post => (
                        <article key={post.id} className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold text-gray-800 mb-2 md:mb-0">
                                    <Link
                                        to={post.fields.slug}
                                        className="hover:text-blue-600 transition duration-300"
                                    >
                                        {post.frontmatter.title}
                                    </Link>
                                </h2>
                                <span className="text-sm text-gray-500">
                  {post.frontmatter.date}
                </span>
                            </div>

                            <p className="text-gray-600 mb-4">
                                {post.frontmatter.description || post.excerpt}
                            </p>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    {post.frontmatter.tags && post.frontmatter.tags.map(tag => (
                                        <span
                                            key={tag}
                                            className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                                        >
                      {tag}
                    </span>
                                    ))}
                                </div>
                                <Link
                                    to={post.fields.slug}
                                    className="text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    阅读更多 →
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>

                {/* AI内容生成服务推广 */}
                <div className="mt-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg p-8 text-white">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-2xl font-bold mb-4">需要专业内容支持？</h2>
                        <p className="mb-6 text-lg">
                            我们的AI内容生成服务可以为您自动创建高质量的博客文章、产品描述和营销内容
                        </p>
                        <div className="grid md:grid-cols-3 gap-4 mb-6">
                            <div className="bg-white bg-opacity-20 p-4 rounded">
                                <h3 className="font-semibold mb-2">快速交付</h3>
                                <p className="text-sm">24小时内完成内容创作</p>
                            </div>
                            <div className="bg-white bg-opacity-20 p-4 rounded">
                                <h3 className="font-semibold mb-2">多语言支持</h3>
                                <p className="text-sm">中英文内容生成</p>
                            </div>
                            <div className="bg-white bg-opacity-20 p-4 rounded">
                                <h3 className="font-semibold mb-2">SEO优化</h3>
                                <p className="text-sm">搜索引擎优化内容</p>
                            </div>
                        </div>
                        <Link
                            to="/products"
                            className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
                        >
                            了解AI内容服务
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { 
        frontmatter: { 
          category: { 
            nin: ["网站建设", "营销服务", "咨询服务"] 
          } 
        } 
      }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        id
        excerpt(pruneLength: 200)
        fields {
          slug
        }
        frontmatter {
          title
          date(formatString: "YYYY年MM月DD日")
          description
          tags
        }
      }
    }
  }
`

export default BlogPage
