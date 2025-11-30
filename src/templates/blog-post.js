import * as React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { getThemeFromTags } from "../utils/tag-mapper"
import { defaultLanguage } from "../config/languages"

const BlogPostTemplate = ({
                              data: { previous, next, site, markdownRemark: post },
                              location,
                          }) => {
    const siteTitle = site.siteMetadata?.title || `Title`

    // 生成带语言参数的标签链接
    const getTagLink = (tag) => {
        const basePath = post.fields.language === defaultLanguage ? '/blog' : `/${post.fields.language}/blog`
        return `${basePath}?tag=${encodeURIComponent(tag)}`
    }

    // 生成文章目录
    const TableOfContents = ({ html }) => {
        const [headings, setHeadings] = React.useState([])

        React.useEffect(() => {
            if (!html) return

            // 解析 HTML 提取标题
            const tempDiv = document.createElement('div')
            tempDiv.innerHTML = html

            const headingElements = tempDiv.querySelectorAll('h2, h3')
            const headingsArray = Array.from(headingElements).map((heading, index) => {
                const id = `heading-${index}`
                // 确保标题元素有 ID
                if (!heading.id) {
                    heading.id = id
                }
                return {
                    id: heading.id,
                    text: heading.textContent,
                    level: heading.tagName.toLowerCase()
                }
            })

            setHeadings(headingsArray)

            // 为实际文章内容中的标题添加 ID
            const articleHeadings = document.querySelectorAll('.article-content h2, .article-content h3')
            articleHeadings.forEach((heading, index) => {
                if (!heading.id) {
                    heading.id = `heading-${index}`
                }
            })
        }, [html])

        if (headings.length === 0) return null

        const scrollToHeading = (id, event) => {
            event.preventDefault()
            const target = document.getElementById(id)
            if (target) {
                const offset = 100 // 调整滚动偏移量
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                })

                // 更新 URL hash（可选）
                window.history.pushState(null, null, `#${id}`)
            }
        }

        return (
            <nav className="toc mb-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <span className="mr-2">📑</span>
                    {post.fields.language === 'zh' ? '文章目录' : 'Table of Contents'}
                </h3>
                <ul className="space-y-2">
                    {headings.map((heading, index) => (
                        <li
                            key={index}
                            className={heading.level === 'h3' ? 'ml-4' : ''}
                        >
                            <a
                                href={`#${heading.id}`}
                                className="text-gray-600 hover:text-indigo-600 text-sm transition-colors flex items-start group"
                                onClick={(e) => scrollToHeading(heading.id, e)}
                            >
                                <span className="mr-2 opacity-60 group-hover:opacity-100">•</span>
                                <span className="flex-1">{heading.text}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        )
    }

    // 获取文章主题
    const postTheme = getThemeFromTags(post.frontmatter.tags, post.fields.language)
    const themeColors = {
        'personal-growth': 'border-l-blue-500 bg-blue-50',
        'decision-analysis': 'border-l-green-500 bg-green-50',
        'quantitative-trading': 'border-l-purple-500 bg-purple-50',
        'sales-finance': 'border-l-orange-500 bg-orange-50',
        'energy-solutions': 'border-l-yellow-500 bg-yellow-50',
        'content-ecosystem': 'border-l-indigo-500 bg-indigo-50'
    }
    const themeColorClass = themeColors[postTheme] || 'border-l-gray-500 bg-gray-50'

    return (
        <Layout location={location} title={siteTitle}>
            <section className="py-16">
                <div className="main-container">
                    <article
                        className="blog-post"
                        itemScope
                        itemType="http://schema.org/Article"
                    >
                        <header className="mb-8">
                            {/* 主题标签 */}
                            {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                                <div className={`mb-4 p-4 rounded-lg border-l-4 ${themeColorClass}`}>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="text-sm font-medium text-gray-600">
                                            {post.fields.language === 'zh' ? '主题分类:' : 'Category:'}
                                        </span>
                                        {post.frontmatter.tags.map(tag => (
                                            <Link
                                                key={tag}
                                                to={getTagLink(tag)}
                                                className="bg-white bg-opacity-80 text-gray-700 hover:bg-white px-3 py-1 rounded-full text-sm font-medium transition-colors shadow-sm"
                                            >
                                                {tag}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight" itemProp="headline">
                                {post.frontmatter.title}
                            </h1>

                            <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-t border-b border-gray-200">
                                <div className="flex items-center space-x-4">
                                    <span className="text-gray-600 flex items-center">
                                        <span className="mr-1">📅</span>
                                        {post.frontmatter.date}
                                    </span>
                                    {post.frontmatter.readTime && (
                                        <span className="text-gray-600 flex items-center">
                                            <span className="mr-1">⏱️</span>
                                            {post.frontmatter.readTime}
                                        </span>
                                    )}
                                </div>

                                {/* 分享按钮 */}
                                <div className="flex items-center space-x-2">
                                    <span className="text-gray-600 text-sm">
                                        {post.fields.language === 'zh' ? '分享:' : 'Share:'}
                                    </span>
                                    <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                                        <span className="text-lg">📱</span>
                                    </button>
                                    <button className="p-2 text-gray-400 hover:text-green-500 transition-colors">
                                        <span className="text-lg">💬</span>
                                    </button>
                                    <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                                        <span className="text-lg">❤️</span>
                                    </button>
                                </div>
                            </div>
                        </header>

                        {/* 文章目录 */}
                        {typeof window !== 'undefined' && <TableOfContents html={post.html} />}

                        {/* 文章内容 */}
                        <section
                            className="prose prose-lg max-w-none article-content
                                     prose-headings:text-gray-800
                                     prose-p:text-gray-600
                                     prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline
                                     prose-strong:text-gray-800
                                     prose-blockquote:border-indigo-300 prose-blockquote:bg-indigo-50
                                     prose-ul:text-gray-600 prose-ol:text-gray-600
                                     prose-li:text-gray-600
                                     prose-code:text-gray-700 prose-code:bg-gray-100
                                     prose-pre:bg-gray-800
                                     prose-img:rounded-xl prose-img:shadow-md
                                     prose-table:text-gray-600
                                     prose-th:bg-gray-100
                                     prose-hr:border-gray-200"
                            dangerouslySetInnerHTML={{ __html: post.html }}
                            itemProp="articleBody"
                        />

                        {/* 文章标签 */}
                        {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                            <div className="mt-12 pt-8 border-t border-gray-200">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                    <span className="text-gray-700 font-semibold text-lg">
                                        {post.fields.language === 'zh' ? '文章标签:' : 'Article Tags:'}
                                    </span>
                                    <div className="flex flex-wrap gap-3">
                                        {post.frontmatter.tags.map(tag => (
                                            <Link
                                                key={tag}
                                                to={getTagLink(tag)}
                                                className="bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 hover:from-indigo-100 hover:to-purple-100 hover:text-indigo-700 px-4 py-2 rounded-full text-sm font-medium transition-all shadow-sm hover:shadow-md border border-gray-200"
                                            >
                                                #{tag}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </article>

                    {/* 上一篇/下一篇导航 */}
                    <nav className="blog-post-nav mt-12 pt-8 border-t border-gray-200">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                {previous && (
                                    <Link
                                        to={previous.fields.slug}
                                        rel="prev"
                                        className="group p-6 bg-gray-50 hover:bg-white rounded-xl border border-gray-200 hover:border-indigo-200 hover:shadow-md transition-all block"
                                    >
                                        <div className="text-sm text-gray-500 mb-2 flex items-center">
                                            <span className="mr-2">←</span>
                                            {post.fields.language === 'zh' ? '上一篇' : 'Previous'}
                                        </div>
                                        <div className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                                            {previous.frontmatter.title}
                                        </div>
                                    </Link>
                                )}
                            </div>
                            <div>
                                {next && (
                                    <Link
                                        to={next.fields.slug}
                                        rel="next"
                                        className="group p-6 bg-gray-50 hover:bg-white rounded-xl border border-gray-200 hover:border-indigo-200 hover:shadow-md transition-all block text-right"
                                    >
                                        <div className="text-sm text-gray-500 mb-2 flex items-center justify-end">
                                            {post.fields.language === 'zh' ? '下一篇' : 'Next'}
                                            <span className="ml-2">→</span>
                                        </div>
                                        <div className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                                            {next.frontmatter.title}
                                        </div>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </nav>

                    {/* 相关文章推荐 */}
                    {(previous || next) && (
                        <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">
                                {post.fields.language === 'zh' ? '更多精彩内容' : 'More Articles'}
                            </h3>
                            <p className="text-gray-600 mb-4">
                                {post.fields.language === 'zh'
                                    ? '探索更多关于量化分析、AI技术和商业策略的深度内容'
                                    : 'Explore more in-depth content about quantitative analysis, AI technology and business strategies'}
                            </p>
                            <Link
                                to={post.fields.language === defaultLanguage ? '/blog' : `/${post.fields.language}/blog`}
                                className="inline-flex items-center bg-white text-indigo-600 hover:bg-gray-50 px-6 py-3 rounded-lg font-semibold transition-colors shadow-sm"
                            >
                                {post.fields.language === 'zh' ? '浏览所有文章' : 'Browse All Articles'}
                                <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </Layout>
    )
}

export const Head = ({ data: { markdownRemark: post } }) => {
    return (
        <Seo
            title={post.frontmatter.title}
            description={post.frontmatter.description || post.excerpt}
        />
    )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        lang
        tags
        readTime
      }
      fields {
        language
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
