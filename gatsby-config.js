// gatsby-config.js
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
