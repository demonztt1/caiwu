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
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: process.env.GA_TRACKING_ID || "YOUR_GA_TRACKING_ID",
            },
        },
        `gatsby-plugin-offline`,
    ],
}
