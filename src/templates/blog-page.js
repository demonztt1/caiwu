import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { useTranslation } from "../hooks/use-translation"
import { defaultLanguage, getLanguageSelectorLanguages } from "../config/languages"
// 在 blog-page.js 中更新导入
import { getThemeFromTags, getThemeConfig } from "../utils/tag-mapper"

// 在 categorizePostsByTheme 函数中更新：
const categorizePostsByTheme = (posts) => {
    const themes = {};

    // 使用 THEME_CONFIG 初始化主题
    Object.keys(THEME_CONFIG).forEach(themeKey => {
        const config = getThemeConfig(themeKey);
        themes[themeKey] = {
            name: t(config.nameKey),
            description: t(config.descriptionKey),
            posts: [],
            icon: config.icon,
            color: config.color
        };
    });

    posts.forEach(post => {
        const themeKey = getThemeFromTags(post.frontmatter.tags, pageContext.language)
        if (themes[themeKey]) {
            themes[themeKey].posts.push(post)
        } else {
            themes['content-ecosystem'].posts.push(post)
        }
    })

    return themes
}
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

    // 按主题分类文章 - 使用现有翻译变量
    const categorizePostsByTheme = (posts) => {
        const themes = {
            'personal-growth': {
                name: t('pages.home.services.personal-growth.title'),
                description: t('pages.home.services.personal-growth.description'),
                posts: [],
                icon: '🚀',
                color: 'from-blue-500 to-cyan-500'
            },
            'decision-analysis': {
                name: t('pages.home.services.decision-analysis.title'),
                description: t('pages.home.services.decision-analysis.description'),
                posts: [],
                icon: '📊',
                color: 'from-green-500 to-emerald-500'
            },
            'quantitative-trading': {
                name: t('pages.home.services.quantitative-trading.title'),
                description: t('pages.home.services.quantitative-trading.description'),
                posts: [],
                icon: '📈',
                color: 'from-purple-500 to-pink-500'
            },
            'sales-finance': {
                name: t('pages.home.services.sales-finance.title'),
                description: t('pages.home.services.sales-finance.description'),
                posts: [],
                icon: '💼',
                color: 'from-orange-500 to-red-500'
            },
            'energy-solutions': {
                name: t('pages.home.services.energy-solutions.title'),
                description: t('pages.home.services.energy-solutions.description'),
                posts: [],
                icon: '🔋',
                color: 'from-yellow-500 to-amber-500'
            },
            'content-ecosystem': {
                name: t('pages.home.services.content-ecosystem.title'),
                description: t('pages.home.services.content-ecosystem.description'),
                posts: [],
                icon: '🌐',
                color: 'from-indigo-500 to-purple-500'
            }
        }

        posts.forEach(post => {
            const themeKey = getThemeFromTags(post.frontmatter.tags, pageContext.language)
            if (themes[themeKey]) {
                themes[themeKey].posts.push(post)
            } else {
                themes['content-ecosystem'].posts.push(post)
            }
        })

        return themes
    }

    const themes = categorizePostsByTheme(posts)
    const availableLanguages = getLanguageSelectorLanguages()

    // 如果有回退情况（没有对应语言的内容），显示默认内容
    if (pageContext.fallback && posts.length === 0) {
        return (
            <Layout>
                <Seo
                    title={t('pages.blog.title')}
                    description={t('pages.blog.description', {
                        defaultValue: "探索最新的量化分析见解、技术文章和行业动态"
                    })}
                />

                <section className="py-16">
                    <div className="main-container">
                        <h1 className="text-3xl font-bold text-gray-800 mb-8">
                            {t('pages.blog.heading')}
                        </h1>
                        <div className="text-center py-12">
                            <p className="text-gray-600 text-lg">
                                {t('pages.blog.preparingContent', {
                                    defaultValue: "该语言版本的博客内容正在准备中..."
                                })}
                            </p>
                        </div>
                    </div>
                </section>
            </Layout>
        )
    }

    return (
        <Layout>
            <Seo
                title={t('pages.blog.title')}
                description={t('pages.blog.description', {
                    defaultValue: "探索最新的量化分析见解、技术文章和行业动态"
                })}
            />

            <section className="py-16">
                <div className="main-container">
                    <h1 className="text-3xl font-bold text-gray-800 mb-8">
                        {t('pages.blog.heading')}
                    </h1>

                    {/* 博客目录 */}
                    <div className="mb-12 bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">
                            {t('pages.blog.categories', {
                                defaultValue: "博客主题目录"
                            })}
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Object.entries(themes).map(([key, theme]) => (
                                <div
                                    key={key}
                                    className={`bg-gradient-to-br ${theme.color} rounded-xl p-6 text-white transform transition-transform hover:scale-105 hover:shadow-lg`}
                                >
                                    <div className="flex items-start mb-4">
                                        <span className="text-3xl mr-4">{theme.icon}</span>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-lg mb-2">{theme.name}</h3>
                                            <p className="text-white text-opacity-90 text-sm leading-relaxed">
                                                {theme.description}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between pt-4 border-t border-white border-opacity-20">
                                        <span className="text-sm font-medium">
                                            {theme.posts.length} {t('pages.blog.articlesCount', {
                                            defaultValue: "篇文章"
                                        })}
                                        </span>
                                        {theme.posts.length > 0 && (
                                            <Link
                                                to={`#${key}`}
                                                className="bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                                            >
                                                {t('pages.blog.browseCategory', {
                                                    defaultValue: "浏览主题"
                                                })} →
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 按主题显示文章 */}
                    {Object.entries(themes).map(([key, theme]) => (
                        theme.posts.length > 0 && (
                            <div key={key} id={key} className="mb-16 scroll-mt-8">
                                <div className="flex items-center mb-8 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                                    <span className="text-3xl mr-4">{theme.icon}</span>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-800">{theme.name}</h2>
                                        <p className="text-gray-600 mt-1">{theme.description}</p>
                                    </div>
                                    <span className="ml-auto bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-semibold">
                                        {theme.posts.length} {t('pages.blog.articlesCount', {
                                        defaultValue: "篇文章"
                                    })}
                                    </span>
                                </div>

                                <div className="grid gap-6">
                                    {theme.posts.map(post => (
                                        <article key={post.id} className="group bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-indigo-100 transition-all">
                                            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                                                <h3 className="text-xl font-bold text-gray-800 mb-3 lg:mb-0 lg:mr-4">
                                                    <Link
                                                        to={getLocalizedPath(post.fields.slug, post.fields.language)}
                                                        className="hover:text-indigo-600 transition-colors group-hover:underline"
                                                    >
                                                        {post.frontmatter.title}
                                                    </Link>
                                                </h3>
                                                <span className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full whitespace-nowrap">
                                                    {post.frontmatter.date}
                                                </span>
                                            </div>

                                            <p className="text-gray-600 mb-4 leading-relaxed">
                                                {post.frontmatter.description || post.excerpt}
                                            </p>

                                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-gray-100">
                                                <div className="flex flex-wrap gap-2">
                                                    {post.frontmatter.tags && post.frontmatter.tags.map(tag => (
                                                        <span
                                                            key={tag}
                                                            className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium hover:bg-gray-200 transition-colors"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                                <Link
                                                    to={getLocalizedPath(post.fields.slug, post.fields.language)}
                                                    className="text-indigo-600 hover:text-indigo-700 font-semibold flex items-center group"
                                                >
                                                    {t('pages.blog.readMore')}
                                                    <span className="ml-1 transform group-hover:translate-x-1 transition-transform">→</span>
                                                </Link>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </div>
                        )
                    ))}

                    {/* 如果没有文章 */}
                    {posts.length === 0 && (
                        <div className="text-center py-16 bg-gray-50 rounded-2xl">
                            <div className="text-6xl mb-4">📝</div>
                            <p className="text-gray-600 text-lg">
                                {t('pages.blog.noPosts', {
                                    defaultValue: "暂无博客文章"
                                })}
                            </p>
                        </div>
                    )}

                    {/* AI内容生成服务推广 */}
                    <div className="mt-16 bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl p-8 text-white shadow-xl">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold mb-4">
                                {t('pages.blog.aiPromotion.title')}
                            </h2>
                            <p className="mb-8 text-lg text-purple-100 max-w-2xl mx-auto">
                                {t('pages.blog.aiPromotion.description')}
                            </p>
                            <div className="grid md:grid-cols-3 gap-6 mb-8">
                                <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-xl border border-white border-opacity-20">
                                    <h3 className="font-bold text-lg mb-3">
                                        {t('pages.blog.aiPromotion.features.fast')}
                                    </h3>
                                    <p className="text-purple-100 text-sm leading-relaxed">
                                        {t('pages.blog.aiPromotion.features.fastDesc')}
                                    </p>
                                </div>
                                <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-xl border border-white border-opacity-20">
                                    <h3 className="font-bold text-lg mb-3">
                                        {t('pages.blog.aiPromotion.features.multilingual')}
                                    </h3>
                                    <p className="text-purple-100 text-sm leading-relaxed">
                                        {t('pages.blog.aiPromotion.features.multilingualDesc')}
                                    </p>
                                </div>
                                <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-xl border border-white border-opacity-20">
                                    <h3 className="font-bold text-lg mb-3">
                                        {t('pages.blog.aiPromotion.features.seo')}
                                    </h3>
                                    <p className="text-purple-100 text-sm leading-relaxed">
                                        {t('pages.blog.aiPromotion.features.seoDesc')}
                                    </p>
                                </div>
                            </div>
                            <Link
                                to={getFixedLocalizedPath("/products")}
                                className="inline-flex items-center bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-bold text-lg transition-colors shadow-lg"
                            >
                                {t('pages.blog.aiPromotion.cta')}
                                <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

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
