const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // 定义博客文章模板
  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  // 定义商品页面模板
  const productPage = path.resolve(`./src/templates/product-page.js`)

  // 获取所有Markdown文件
  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { frontmatter: { date: DESC }}
        limit: 1000
      ) {
        nodes {
          id
          fields {
            slug
          }
          frontmatter {
            category
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(
        `There was an error loading your markdown files`,
        result.errors
    )
    return
  }

  const posts = result.data.allMarkdownRemark.nodes

  // 为每个markdown文件创建页面
  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

      // 根据分类决定使用哪个模板
      const isProduct = post.frontmatter.category &&
          ['网站建设', '营销服务', '咨询服务'].includes(post.frontmatter.category)

      const template = isProduct ? productPage : blogPost

      createPage({
        path: post.fields.slug,
        component: template,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      })
    })
  }
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

// 为多语言创建模式（可选）
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
    }
    type Frontmatter {
      title: String!
      description: String
      date: Date @dateformat
      category: String
      price: Int
      originalPrice: Int
      features: [String]
    }
  `)
}
