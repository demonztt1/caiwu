// gatsby-config.js
const { languageCodes } = require('./src/config/languages')
const { getSitemapLanguages, defaultLanguage } = require('./src/config/languages')

// 动态创建文件系统配置
const fileSystemConfigs = [
    {
        resolve: `gatsby-source-filesystem`,
        options: {
            name: `images`,
            path: `${__dirname}/src/images`,
            ignore: ["**/.DS_Store", "**/.*"] // 减少文件监听器
        },
    }

]

// 为所有支持的语言添加文件系统配置
languageCodes.forEach(lang => {
    fileSystemConfigs.push({
        resolve: `gatsby-source-filesystem`,
        options: {
            name: `pages-${lang}`,
            path: `${__dirname}/content/${lang}/pages`,
            ignore: ["**/.DS_Store", "**/.*"],

        },
    })
    fileSystemConfigs.push({
        resolve: `gatsby-source-filesystem`,
        options: {
            name: `blog-${lang}`,
            path: `${__dirname}/content/${lang}/blog`,
            ignore: ["**/.DS_Store", "**/.*"],
        },
    })
    fileSystemConfigs.push({
        resolve: `gatsby-source-filesystem`,
        options: {
            name: `products-${lang}`,
            path: `${__dirname}/content/${lang}/products`,
            ignore: ["**/.DS_Store", "**/.*"],
        },
    })
    fileSystemConfigs.push({
        resolve: `gatsby-source-filesystem`,
        options: {
            name: `services-${lang}`,
            path: `${__dirname}/content/${lang}/services`,
            ignore: ["**/.DS_Store", "**/.*"],
        },
    })
})

module.exports = {
    flags: {
        PRESERVE_WEBPACK_CACHE: false,
        PRESERVE_FILE_DOWNLOAD_CACHE: false,
        FAST_DEV: false,
        DEV_SSR: false
    },
    siteMetadata: {
        title: "元都-逆熵",
        titleTemplate: "%s · 量化万物，共建生态",
        description: "从个人成长到组织决策，从数字策略到实体创新的全方位量化解决方案，构建智能、高效、可持续的未来生态",
        author: "元都逆熵团队",
        siteUrl: "https://www.rd-v6.com/",
        social: {
            twitter: "@yuandu_nisentropy",
            linkedin: "company/yuandu-nisentropy"
        },
        languages: languageCodes,
        defaultLanguage: 'zh'
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-image`,
        {
            resolve: `gatsby-plugin-sharp`,
            options: {
                defaults: {
                    formats: [`auto`, `webp`],
                    placeholder: `dominantColor`,
                    quality: 70, // 降低质量以减少处理负载
                    breakpoints: [400, 750, 1080], // 减少断点数量
                },
                // 添加性能优化选项
                failOnError: false,
                stripMetadata: true,
            },
        },
        {
            resolve: `gatsby-transformer-sharp`,
            options: {
                // 限制并行处理数量
                checkSupportedExtensions: false,
            },
        },
        `gatsby-plugin-postcss`,
        ...fileSystemConfigs,
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 630,
                            quality: 70,
                            withWebp: true,
                            linkImagesToOriginal: false, // 减少链接
                            showCaptions: false, // 禁用标题以节省资源
                        },
                    },
                    `gatsby-remark-copy-linked-files`,
                ],
            },
        },
        {
            resolve: `gatsby-plugin-sitemap`,
            options: {
                output: "/",
                query: `
      {
        site {
          siteMetadata {
            siteUrl
          }
        }
        allSitePage {
          nodes {
            path
          }
        }
      }
    `,
                resolvePages: ({ allSitePage: { nodes } }) => {
                    return nodes
                },
                serialize: ({ path }) => {
                    const sitemapLanguages = getSitemapLanguages()

                    // 只为实际有内容的页面生成sitemap条目
                    const entries = []

                    sitemapLanguages.forEach(lang => {
                        let urlPath = path

                        // 处理语言前缀
                        if (lang !== defaultLanguage) {
                            // 如果路径已经是其他语言，需要替换
                            const pathSegments = path.split('/').filter(segment => segment)
                            const firstSegment = pathSegments[0]

                            // 检查第一个路径段是否是语言代码
                            const isLanguagePath = sitemapLanguages.includes(firstSegment)

                            if (isLanguagePath) {
                                // 替换语言代码
                                pathSegments[0] = lang
                                urlPath = '/' + pathSegments.join('/')
                            } else {
                                // 添加语言前缀
                                urlPath = `/${lang}${path}`
                            }
                        }

                        // 确保URL格式正确
                        if (urlPath === `/${lang}`) {
                            urlPath = `/${lang}/`
                        }

                        entries.push({
                            url: urlPath,
                            changefreq: getChangeFreq(path),
                            priority: getPriority(path),
                            links: sitemapLanguages.map(linkLang => ({
                                lang: linkLang,
                                url: getLocalizedPath(path, linkLang)
                            }))
                        })
                    })

                    return entries
                }
            }
        }
        ,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `元都-逆熵`,
                short_name: `元都逆熵`,
                start_url: `/`,
                background_color: `#ffffff`,
                theme_color: `#005b99`,
                display: `minimal-ui`,
                icon: `src/images/icon.png`,
            },
        },
        {
            resolve: `gatsby-plugin-google-gtag`,
            options: {
                trackingIds: [
                    process.env.GA_TRACKING_ID || "G-SKCJ9LND8J"
                ],
                gtagConfig: {
                    optimize_id: process.env.GTM_TRACKING_ID || "OPT-XXXXXXX",
                    anonymize_ip: true,
                    cookie_expires: 0,
                },
                pluginConfig: {
                    head: true,
                    respectDNT: true,
                    exclude: ["/preview/**"],
                },
            },
        },
        `gatsby-plugin-offline`,
    ],
}
// 辅助函数
function getChangeFreq(path) {
    if (path === '/') return 'daily'
    if (path.includes('/blog/')) return 'weekly'
    if (path.includes('/services/') || path.includes('/products/')) return 'monthly'
    return 'weekly'
}

function getPriority(path) {
    if (path === '/') return 1.0
    if (path.includes('/services/') || path.includes('/products/')) return 0.8
    if (path.includes('/blog/')) return 0.7
    return 0.6
}

function getLocalizedPath(path, lang) {
    if (lang === defaultLanguage) return path

    const pathSegments = path.split('/').filter(segment => segment)
    const sitemapLanguages = getSitemapLanguages()
    const firstSegment = pathSegments[0]

    // 如果第一个路径段是语言代码，替换它
    if (sitemapLanguages.includes(firstSegment)) {
        pathSegments[0] = lang
        return '/' + pathSegments.join('/')
    }

    // 否则添加语言前缀
    return `/${lang}${path}`
}
