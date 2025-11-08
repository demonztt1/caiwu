import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { useTranslation } from "../hooks/use-translation"
import { defaultLanguage } from "../config/languages"

const BlogPage = ({ data, pageContext }) => {
    const posts = data.allMarkdownRemark.nodes
    const { t } = useTranslation()

    // 获取本地化路径
    const getLocalizedPath = (path, contentLanguage) => {
        if (pageContext.language === defaultLanguage) {
            return path
        } else {
            return `/${pageContext.language}${path}`
        }
    }

    // 获取固定页面的本地化路径
    const getFixedLocalizedPath = (path) => {
        if (pageContext.language === defaultLanguage) {
            return path
        } else {
            return `/${pageContext.language}${path}`
        }
    }

    // 如果有回退情况（没有对应语言的内容），显示默认内容
    if (pageContext.fallback && posts.length === 0) {
        return (
            <Layout>
                <Seo title={t('pages.blog.title')} />
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-8">
                        {t('pages.blog.heading')}
                    </h1>
                    <div className="text-center py-12">
                        <p className="text-gray-600 text-lg">
                            {pageContext.language === 'zh'
                                ? '该语言版本的博客内容正在准备中...'
                                : 'Blog content for this language is being prepared...'}
                        </p>
                    </div>
                </div>
            </Layout>
        )
    }

    return (
        <Layout>
            <Seo title={t('pages.blog.title')} />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">
                    {t('pages.blog.heading')}
                </h1>

                {posts.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-600 text-lg">
                            {pageContext.language === 'zh'
                                ? '暂无博客文章'
                                : 'No blog posts available'}
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {posts.map(post => (
                            <article key={post.id} className="bg-white rounded-lg shadow-md p-6">
                                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-2 md:mb-0">
                                        <Link
                                            to={getLocalizedPath(post.fields.slug, post.fields.language)}
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
                                        to={getLocalizedPath(post.fields.slug, post.fields.language)}
                                        className="text-blue-600 hover:text-blue-700 font-medium"
                                    >
                                        {t('pages.blog.readMore')}
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                )}

                {/* AI内容生成服务推广 */}
                <div className="mt-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg p-8 text-white">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-2xl font-bold mb-4">
                            {t('pages.blog.aiPromotion.title')}
                        </h2>
                        <p className="mb-6 text-lg">
                            {t('pages.blog.aiPromotion.description')}
                        </p>
                        <div className="grid md:grid-cols-3 gap-4 mb-6">
                            <div className="bg-white bg-opacity-20 p-4 rounded">
                                <h3 className="font-semibold mb-2">
                                    {t('pages.blog.aiPromotion.features.fast')}
                                </h3>
                                <p className="text-sm">
                                    {t('pages.blog.aiPromotion.features.fastDesc')}
                                </p>
                            </div>
                            <div className="bg-white bg-opacity-20 p-4 rounded">
                                <h3 className="font-semibold mb-2">
                                    {t('pages.blog.aiPromotion.features.multilingual')}
                                </h3>
                                <p className="text-sm">
                                    {t('pages.blog.aiPromotion.features.multilingualDesc')}
                                </p>
                            </div>
                            <div className="bg-white bg-opacity-20 p-4 rounded">
                                <h3 className="font-semibold mb-2">
                                    {t('pages.blog.aiPromotion.features.seo')}
                                </h3>
                                <p className="text-sm">
                                    {t('pages.blog.aiPromotion.features.seoDesc')}
                                </p>
                            </div>
                        </div>
                        <Link
                            to={getFixedLocalizedPath("/products")}
                            className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
                        >
                            {t('pages.blog.aiPromotion.cta')}
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

// 这是正确的博客列表查询，不需要 $id 参数
export const query = graphql`
  query($language: String!) {
    allMarkdownRemark(
      filter: { 
        frontmatter: { 
          template: { eq: "blog" }
        }
        fields: { 
          language: { eq: $language }
        }
      }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        id
        excerpt(pruneLength: 200)
        fields {
          slug
          language
        }
        frontmatter {
          title
          date(formatString: "MMMM DD, YYYY")
          description
          tags
        }
      }
    }
  }
`

export default BlogPage
