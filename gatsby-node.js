// gatsby-node.js
const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const { languageCodes, defaultLanguage } = require('./src/config/languages')
const EventEmitter = require('events');

exports.onPreInit = () => {
    // 增加全局限制避免警告
    EventEmitter.defaultMaxListeners = 50;

    // 监听进程的警告事件来捕获问题
    process.on('warning', (warning) => {
        console.log('警告名称:', warning.name);
        console.log('警告信息:', warning.message);
        console.log('堆栈跟踪:', warning.stack);
    });
};

// 优化 Webpack 配置
exports.onCreateWebpackConfig = ({ stage, actions }) => {
    if (stage === 'develop') {
        actions.setWebpackConfig({
            resolve: {
                fallback: {
                    events: require.resolve('events/')
                }
            }
        })
    }
}
// 可选：创建页面时的额外配置
exports.onCreatePage = ({ page, actions }) => {
    const { createPage } = actions

    // 确保页面有默认的上下文
    if (!page.context) {
        page.context = {}
    }

    createPage(page)
}
exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions

    if (node.internal.type === `MarkdownRemark`) {
        const fileNode = getNode(node.parent)
        const relativePath = fileNode.relativePath // 例如: "zh/services/decision-analysis.md"

        // 1. 语言检测
        let detectedLanguage = defaultLanguage
        const pathParts = relativePath.split('/') // ["zh", "services", "decision-analysis.md"]

        if (pathParts.length > 0 && languageCodes.includes(pathParts[0])) {
            detectedLanguage = pathParts[0]
        }

        const finalLanguage = node.frontmatter?.language || detectedLanguage

        // 2. 自定义 Slug 生成逻辑
        // 目标：无论什么语言，Slug 字段都应该是干净的 "/category/name" 格式 (不含语言前缀)
        let slug = ''

        if (node.frontmatter?.template === 'home') {
            slug = '/'
        } else {
            // 移除文件名后缀
            const parsedPath = path.parse(relativePath)
            const fileName = parsedPath.name === 'index' ? '' : parsedPath.name

            // 移除语言文件夹，保留中间的目录结构 (如 services, products, blog)
            // pathParts[0] 是语言代码 (zh, en)，我们跳过它
            const directoryParts = pathParts.slice(1, pathParts.length - 1)

            // 重新组装路径
            // 如果 directoryParts 是 ['services']，fileName 是 'decision-analysis'
            // 结果: /services/decision-analysis
            const folderPath = directoryParts.join('/')

            slug = `/${folderPath}/${fileName}`

            // 清理多余的斜杠 (例如 index 文件可能导致结尾双斜杠)
            slug = slug.replace(/\/+/g, '/').replace(/\/$/, '')
            if (slug === '') slug = '/'
        }

        console.log(`文件: ${relativePath} -> 语言: ${finalLanguage} -> Slug: ${slug}`)

        createNodeField({
            name: `slug`,
            node,
            value: slug,
        })

        createNodeField({
            name: `language`,
            node,
            value: finalLanguage,
        })

        // 确保 frontmatter 也有语言字段
        if (!node.frontmatter.language) {
            node.frontmatter.language = finalLanguage
        }
    }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions
    console.time('createPages')

    try {
            // 模板路径
            const templates = {
                blog: path.resolve(`./src/templates/blog-post.js`),
                blogList: path.resolve(`./src/templates/blog-page.js`),
                product: path.resolve(`./src/templates/product-page.js`),
                productsList: path.resolve(`./src/templates/products-page.js`),
                service: path.resolve(`./src/templates/services-page.js`),
                servicesList: path.resolve(`./src/templates/services-list-page.js`),
                home: path.resolve(`./src/templates/home-page.js`),
                about: path.resolve(`./src/templates/about-page.js`),
                contact: path.resolve(`./src/templates/contact-page.js`),
            }

            const result = await graphql(`
            {
              allMarkdownRemark {
                nodes {
                  id
                  fields {
                    slug
                    language
                  }
                  frontmatter {
                    template
                  }
                }
              }
            }
          `)

            if (result.errors) {
                reporter.panicOnBuild(`Error loading markdown files`, result.errors)
                return
            }

            const nodes = result.data.allMarkdownRemark.nodes

            // 1. 创建内容页面
            nodes.forEach((node) => {
                const { template } = node.frontmatter
                const language = node.fields.language
                const slug = node.fields.slug

                let pagePath = ''


                if (language === defaultLanguage) {
                    pagePath = slug === '/' ? '/' : slug
                } else {
                    pagePath = slug === '/' ? `/${language}` : `/${language}${slug}`
                }

                // 特殊处理首页
                if (template === 'home' && slug === '/') {
                    pagePath = language === defaultLanguage ? '/' : `/${language}`
                }

                let component = templates.blog // 默认

                if (template === 'home') component = templates.home
                else if (template === 'service') component = templates.service
                else if (template === 'product') component = templates.product
                else if (template === 'blog') component = templates.blog
                else if (template === 'about') component = templates.about
                else if (template === 'contact') component = templates.contact

                // 博客列表页特殊处理 (如果用户创建了专门的 blog.md)
                if (template === 'blog' && (slug === '/blog' || slug === '/blog/')) {
                    component = templates.blogList
                }

        // 在 gatsby-node.js 的 createPages 函数中，添加调试日志
                console.log(`创建页面: ${pagePath} (Lang: ${language}, Tpl: ${template}, Component: ${component})`)

                createPage({
                    path: pagePath,
                    component: component,
                    context: {
                        id: node.id,
                        language: language,
                    },
                })
            })

            // 2. 创建功能性列表页面 (Services List, Products List, Blog List)
            languageCodes.forEach(lang => {
                const prefix = lang === defaultLanguage ? '' : `/${lang}`

                // Services List: /services 或 /en/services
                createPage({
                    path: `${prefix}/services`,
                    component: templates.servicesList,
                    context: { language: lang, fallback: false },
                })

                // Products List: /products 或 /en/products
                createPage({
                    path: `${prefix}/products`,
                    component: templates.productsList,
                    context: { language: lang, fallback: false },
                })

                // Blog List: /blog 或 /en/blog
                createPage({
                    path: `${prefix}/blog`,
                    component: templates.blogList,
                    context: { language: lang, fallback: false },
                })

                // Contact Page: /contact 或 /en/contact (如果Markdown没覆盖到)
                createPage({
                    path: `${prefix}/contact`,
                    component: templates.contact,
                    context: { language: lang, fallback: true },
                })
            })

    } finally {
        console.timeEnd('createPages')
    }
}

// Schema Customization 保持不变...
// 在 createSchemaCustomization 中更新
// Schema Customization - 修复 solution_areas 类型定义
// 在 gatsby-node.js 中更新 createSchemaCustomization
exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions
    createTypes(`
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }
    type Frontmatter {
      title: String
      description: String
      template: String
      language: String
      price: Int
      originalPrice: Int
      features: [String]
      hero_title: String
      hero_subtitle: String
      hero_button: String
      services_title: String
      services_subtitle: String
      solution_areas: [SolutionArea]
    seo_title: String
      seo_description: String
      process: [String]
      duration: String
      # 添加缺失的 CTA 字段
      cta_title: String
      cta_subtitle: String
      cta_button_primary: String
      cta_button_secondary: String
    }
    type SolutionArea {
      title: String
      description: String
      icon: String
    }
    type Fields {
      slug: String
      language: String
    }
  `)
}
