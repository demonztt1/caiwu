import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { useTranslation } from "../hooks/use-translation"
import { languages, defaultLanguage } from "../config/languages"

const ProductsPage = ({ data, pageContext }) => {
    const products = data.allMarkdownRemark.nodes
    const { t } = useTranslation()

    // 修复的本地化路径函数
    const getLocalizedPath = (path, contentLanguage) => {
        console.log('getLocalizedPath called with:', { path, contentLanguage, pageContextLanguage: pageContext.language })

        // 如果路径已经以语言前缀开头，先清理它
        let cleanPath = path
        Object.keys(languages).forEach(lang => {
            if (path.startsWith(`/${lang}/`)) {
                cleanPath = path.replace(`/${lang}`, '')
            } else if (path === `/${lang}`) {
                cleanPath = '/'
            }
        })

        console.log('Cleaned path:', cleanPath)

        // 如果当前页面语言是默认语言，直接返回清理后的路径
        if (pageContext.language === defaultLanguage) {
            console.log('Default language, returning:', cleanPath)
            return cleanPath
        } else {
            // 否则添加当前页面语言前缀
            const result = cleanPath === '/' ? `/${pageContext.language}` : `/${pageContext.language}${cleanPath}`
            console.log('Non-default language, returning:', result)
            return result
        }
    }

    // 获取固定页面的本地化路径（如联系页面）
    const getFixedLocalizedPath = (path) => {
        console.log('getFixedLocalizedPath called with:', { path, pageContextLanguage: pageContext.language })
        if (pageContext.language === defaultLanguage) {
            console.log('Fixed path - default language, returning:', path)
            return path
        } else {
            const result = `/${pageContext.language}${path}`
            console.log('Fixed path - non-default language, returning:', result)
            return result
        }
    }

    // 临时：在页面上显示调试信息（开发环境）
    const isDevelopment = process.env.NODE_ENV === 'development'

    // 如果有回退情况（没有对应语言的内容），显示默认内容
    if (pageContext.fallback && products.length === 0) {
        return (
            <Layout>
                <Seo title={t('pages.products.title')} />
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-8">
                        {t('pages.products.heading')}
                    </h1>
                    {isDevelopment && (
                        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-4">
                            <h3 className="font-bold">调试信息 (Fallback Mode)</h3>
                            <p>pageContext.language: {pageContext.language}</p>
                            <p>defaultLanguage: {defaultLanguage}</p>
                            <p>fallback: {pageContext.fallback ? 'true' : 'false'}</p>
                        </div>
                    )}
                    <div className="text-center py-12">
                        <p className="text-gray-600 text-lg">
                            {pageContext.language === 'zh'
                                ? '该语言版本的产品内容正在准备中...'
                                : 'Product content for this language is being prepared...'}
                        </p>
                    </div>
                </div>
            </Layout>
        )
    }

    return (
        <Layout>
            <Seo title={t('pages.products.title')} />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">
                    {t('pages.products.heading')}
                </h1>

                {/* 调试信息显示 */}
                {isDevelopment && (
                    <div className="bg-blue-100 border-l-4 border-blue-500 p-4 mb-4">
                        <h3 className="font-bold">调试信息</h3>
                        <p>pageContext.language: {pageContext.language}</p>
                        <p>defaultLanguage: {defaultLanguage}</p>
                        <p>products count: {products.length}</p>
                        <div className="mt-2">
                            <h4 className="font-semibold">产品详情:</h4>
                            {products.map((product, index) => (
                                <div key={index} className="text-sm">
                                    {index + 1}. {product.frontmatter.title} -
                                    Slug: {product.fields.slug} -
                                    Language: {product.fields.language}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {products.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-600 text-lg">
                            {pageContext.language === 'zh'
                                ? '暂无产品内容'
                                : 'No products available'}
                        </p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map(product => {
                            const productPath = getLocalizedPath(product.fields.slug, product.fields.language)
                            const contactPath = getFixedLocalizedPath("/contact")



                            return (
                                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                            <Link
                                                to={productPath}
                                                className="hover:text-blue-600 transition duration-300"
                                            >
                                                {product.frontmatter.title}
                                            </Link>
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
                                                    {t('pages.products.originalPrice')}: ¥{product.frontmatter.originalPrice}
                                                </span>
                                            )}
                                        </div>

                                        <ul className="mb-4 space-y-1">
                                            {product.frontmatter.features && product.frontmatter.features.map((feature, index) => (
                                                <li key={index} className="flex items-center text-sm text-gray-600">
                                                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="flex space-x-2">
                                            <Link
                                                to={productPath}
                                                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded text-center hover:bg-blue-700 transition duration-300"
                                            >
                                                {t('pages.products.buyNow')}
                                            </Link>
                                            <Link
                                                to={contactPath}
                                                className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded text-center hover:bg-gray-300 transition duration-300"
                                            >
                                                {t('pages.products.customConsult')}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </Layout>
    )
}

export const query = graphql`
  query($language: String!) {
    allMarkdownRemark(
      filter: { 
        frontmatter: { 
          template: { eq: "product" }
        }
        fields: { 
          language: { eq: $language }
        }
      }
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
          language
        }
      }
    }
  }
`

export default ProductsPage
