const { languageCodes } = require('./src/config/languages')

// 动态创建文件系统配置
const fileSystemConfigs = [
    {
        resolve: `gatsby-source-filesystem`,
        options: {
            name: `images`,
            path: `${__dirname}/src/images`,
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
        },
    })
    fileSystemConfigs.push({
        resolve: `gatsby-source-filesystem`,
        options: {
            name: `blog-${lang}`,
            path: `${__dirname}/content/${lang}/blog`,
        },
    })
    fileSystemConfigs.push({
        resolve: `gatsby-source-filesystem`,
        options: {
            name: `products-${lang}`,
            path: `${__dirname}/content/${lang}/products`,
        },
    })
    fileSystemConfigs.push({
        resolve: `gatsby-source-filesystem`,
        options: {
            name: `services-${lang}`,
            path: `${__dirname}/content/${lang}/services`,
        },
    })
})

module.exports = {
    siteMetadata: {
        title: "元都-逆熵",
        titleTemplate: "%s · 量化万物，共建生态",
        description: "专业的国际财税咨询、税务筹划、独立站建设和AI内容生成服务，为企业提供全方位的财税和数字化解决方案",
        author: "财税专家团队",
        siteUrl: "https://yuantax.com",
        social: {
            twitter: "@taxexpert",
            linkedin: "company/tax-solutions"
        },
        languages: languageCodes,
        defaultLanguage: 'zh'
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-image`,
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
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
                        },
                    },
                    `gatsby-remark-copy-linked-files`,
                ],
            },
        },
        `gatsby-plugin-sitemap`,
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
        // 🚀 新增：推荐用于 GA4 的 gatsby-plugin-google-gtag 配置
        {
            resolve: `gatsby-plugin-google-gtag`,
            options: {
                // 将您的 GA4 测量 ID 放入 trackingIds 数组
                trackingIds: [
                    process.env.GA_TRACKING_ID || "G-SKCJ9LND8J" // 使用环境变量或默认值
                ],
                // 默认的 gtag 配置
                gtagConfig: {
                    optimize_id: process.env.GTM_TRACKING_ID || "OPT-XXXXXXX", // 如果使用 GTM/Optimize
                    anonymize_ip: true,
                    cookie_expires: 0,
                },
                // 插件配置
                pluginConfig: {
                    head: true, // 将跟踪代码放在 head 中
                    respectDNT: true, // 尊重 Do Not Track
                    exclude: ["/preview/**"], // 排除某些路径
                },
            },
        },
        // 💡 提示：原有的 gatsby-plugin-google-analytics 已被移除
        `gatsby-plugin-offline`,
    ],
}
