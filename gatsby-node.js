const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const { languageCodes, defaultLanguage } = require('./src/config/languages')
// 在 createPages 函数中添加联系页面创建
exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions

    // 定义模板
    const blogPost = path.resolve(`./src/templates/blog-post.js`)
    const productPage = path.resolve(`./src/templates/product-page.js`)
    const homePage = path.resolve(`./src/templates/home-page.js`)
    const servicesListPage = path.resolve(`./src/templates/services-list-page.js`)
    const servicesPage = path.resolve(`./src/templates/services-page.js`)
    const productsPage = path.resolve(`./src/templates/products-page.js`)
    const aboutPage = path.resolve(`./src/templates/about-page.js`)
    const contactPage = path.resolve(`./src/templates/contact-page.js`)
    const blogPage = path.resolve(`./src/templates/blog-page.js`)

    // 获取所有页面内容
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
            language
            category
            title
          }
        }
      }
    }
  `)

    if (result.errors) {
        reporter.panicOnBuild(
            `There was an error loading markdown files`,
            result.errors
        )
        return
    }

    const nodes = result.data.allMarkdownRemark.nodes

    console.log(`找到 ${nodes.length} 个 Markdown 节点`)

    // 为每个内容创建页面
    nodes.forEach((node) => {
        const { template } = node.frontmatter
        const nodeLanguage = node.fields.language || defaultLanguage
        let templateComponent
        let path = node.fields.slug

        console.log(`处理节点: ${node.frontmatter.title}, 语言: ${nodeLanguage}, slug: ${path}, 模板: ${template}`)

        // 修复路径生成逻辑
        if (nodeLanguage !== defaultLanguage) {
            // 对于非默认语言，确保路径包含语言前缀
            if (path === '/') {
                path = `/${nodeLanguage}`
            } else if (!path.startsWith(`/${nodeLanguage}`)) {
                path = `/${nodeLanguage}${path}`
            }
        } else {
            // 对于默认语言，确保路径不包含语言前缀
            if (path.startsWith(`/${defaultLanguage}`)) {
                path = path.replace(`/${defaultLanguage}`, '') || '/'
            }
        }

        // 根据模板选择组件
        if (template === 'home') {
            templateComponent = homePage
            // 首页特殊处理
            path = nodeLanguage === defaultLanguage ? '/' : `/${nodeLanguage}`
        } else if (template === 'service') {
            templateComponent = servicesPage
        } else if (template === 'services') {
            templateComponent = servicesListPage
        } else if (template === 'product') {
            templateComponent = productPage
        } else if (template === 'products') {
            templateComponent = productsPage
        } else if (template === 'blog') {
            // 区分博客列表页和博客文章
            const isBlogList = path.endsWith('/blog/') || path === '/blog' || path === `/${nodeLanguage}/blog` || path === `/${nodeLanguage}/blog/`
            templateComponent = isBlogList ? blogPage : blogPost
        } else if (template === 'about') {
            templateComponent = aboutPage
        } else if (template === 'contact') {
            templateComponent = contactPage
        } else {
            // 默认使用博客文章模板
            templateComponent = blogPost
        }

        console.log(`创建页面: ${path}, 语言: ${nodeLanguage}, 模板: ${template}`)

        createPage({
            path: path,
            component: templateComponent,
            context: {
                id: node.id,
                language: nodeLanguage,
                // 为博客文章添加上下文
                ...(template === 'blog' && !path.includes('/blog/') && {
                    previousPostId: null, // 这里需要根据实际情况设置
                    nextPostId: null
                })
            },
        })
    })

    // 为每种语言创建列表页面
    languageCodes.forEach(lang => {
        console.log(`为语言 ${lang} 创建列表页面`)

        // 服务列表页面
        const servicesPath = lang === defaultLanguage ? '/services' : `/${lang}/services`
        createPage({
            path: servicesPath,
            component: servicesListPage,
            context: {
                language: lang,
                fallback: false // 明确设置回退标志
            },
        })
        console.log(`创建服务列表页: ${servicesPath}`)

        // 产品列表页面
        const productsPath = lang === defaultLanguage ? '/products' : `/${lang}/products`
        createPage({
            path: productsPath,
            component: productsPage,
            context: {
                language: lang,
                fallback: false
            },
        })
        console.log(`创建产品列表页: ${productsPath}`)

        // 博客列表页面
        const blogPath = lang === defaultLanguage ? '/blog' : `/${lang}/blog`
        createPage({
            path: blogPath,
            component: blogPage,
            context: {
                language: lang,
                fallback: false
            },
        })
        console.log(`创建博客列表页: ${blogPath}`)

        // 联系页面 - 新增：为每种语言创建联系页面
        const contactPath = lang === defaultLanguage ? '/contact' : `/${lang}/contact`
        createPage({
            path: contactPath,
            component: contactPage,
            context: {
                language: lang,
                fallback: true // 设置为 true 以便在没有 Markdown 内容时显示默认内容
            },
        })
        console.log(`创建联系页面: ${contactPath}`)
    })

    console.log('页面创建完成')
}

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions

    if (node.internal.type === `MarkdownRemark`) {
        const fileNode = getNode(node.parent)
        const relativePath = fileNode.relativePath

        console.log(`处理文件: ${relativePath}`)

        // 动态语言检测 - 从文件路径推断
        let detectedLanguage = defaultLanguage

        // 从文件路径中提取语言代码
        const pathParts = relativePath.split('/')
        if (pathParts.length > 0) {
            const possibleLang = pathParts[0]
            // 检查是否是支持的语言代码
            if (languageCodes.includes(possibleLang)) {
                detectedLanguage = possibleLang
            }
        }

        // 优先使用 frontmatter 中指定的语言，但如果 frontmatter 中语言为空，则使用检测到的语言
        const finalLanguage = node.frontmatter?.language || detectedLanguage

        // 生成基本 slug（不包含语言前缀）
        let slug = createFilePath({ node, getNode })

        // 对于首页，slug 应该是根路径
        if (node.frontmatter?.template === 'home') {
            slug = '/'
        }

        console.log(`文件: ${relativePath}, 检测语言: ${detectedLanguage}, 最终语言: ${finalLanguage}, slug: ${slug}`)

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

        // 同时将语言保存到 frontmatter 中，确保查询一致性
        if (!node.frontmatter.language) {
            node.frontmatter.language = finalLanguage
        }
    }
}

exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions

    createTypes(`
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }
    type Frontmatter {
      title: String!
      description: String
      date: Date @dateformat
      template: String
      language: String
      category: String
      price: Int
      originalPrice: Int
      features: [String]
      hero_title: String
      hero_subtitle: String
      hero_button: String
      services_title: String
      services: [Service]
      seo_title: String
      seo_description: String
      # 服务页面字段
      heading: String
      cta_title: String
      cta_description: String
      cta_button: String
      # 关于页面字段
      team_title: String
      team_description: String
      mission_title: String
      mission_description: String
      vision_title: String
      vision_description: String
      advantages_title: String
      advantages: [String]
      contact_button: String
      # 服务详情页字段
      icon: String
      duration: String
      process: [String]
    }
    type Service {
      title: String
      description: String
      features: [String]
      icon: String
    }
    type Fields {
      slug: String
      language: String
    }
  `)
}
