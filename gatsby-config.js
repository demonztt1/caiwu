module.exports = {
  siteMetadata: {
    title: "元都-逆熵",
    titleTemplate: "%s · 量化万物，共建生态",
    description: "专业的国际财税咨询、税务筹划、独立站建设和AI内容生成服务，为企业提供全方位的财税和数字化解决方案",
    author: "财税专家团队",
    siteUrl: "https://yourtaxwebsite.com",
    social: {
      twitter: "@taxexpert",
      linkedin: "company/tax-solutions"
    }
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/content/blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `products`,
        path: `${__dirname}/content/products`,
      },
    },
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
        name: `全球财税解决方案`,
        short_name: `财税专家`,
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
