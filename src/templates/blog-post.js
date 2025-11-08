import * as React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogPostTemplate = ({
                              data: { previous, next, site, markdownRemark: post },
                              location,
                          }) => {
    const siteTitle = site.siteMetadata?.title || `Title`

    return (
        <Layout location={location} title={siteTitle}>

            {/* 使用内容容器居中 */}
            <section className="py-16">
                <div className="main-container">
                    <article
                        className="blog-post"
                        itemScope
                        itemType="http://schema.org/Article"
                    >
                        <header className="mb-8">
                            <h1 className="text-4xl font-bold text-gray-900 mb-4" itemProp="headline">
                                {post.frontmatter.title}
                            </h1>
                            <p className="text-gray-600">{post.frontmatter.date}</p>
                        </header>
                        <section
                            className="prose prose-lg max-w-none"
                            dangerouslySetInnerHTML={{ __html: post.html }}
                            itemProp="articleBody"
                        />
                    </article>

                    <nav className="blog-post-nav mt-8 pt-6 border-t border-gray-200">
                        <ul className="flex justify-between list-none p-0">
                            <li>
                                {previous && (
                                    <Link
                                        to={previous.fields.slug}
                                        rel="prev"
                                        className="text-indigo-600 hover:text-indigo-700"
                                    >
                                        ← {previous.frontmatter.title}
                                    </Link>
                                )}
                            </li>
                            <li>
                                {next && (
                                    <Link
                                        to={next.fields.slug}
                                        rel="next"
                                        className="text-indigo-600 hover:text-indigo-700"
                                    >
                                        {next.frontmatter.title} →
                                    </Link>
                                )}
                            </li>
                        </ul>
                    </nav>
                </div>
            </section>
        </Layout>
    )
}

export const Head = ({ data: { markdownRemark: post } }) => {
    return (
        <Seo
            title={post.frontmatter.title}
            description={post.frontmatter.description || post.excerpt}
        />
    )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        lang
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
