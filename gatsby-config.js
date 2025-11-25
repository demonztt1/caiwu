// gatsby-config.js
const { languageCodes } = require('./src/config/languages')

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
    adapter: require('gatsby-adapter-netlify').default,
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
