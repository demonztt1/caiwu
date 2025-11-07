import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Seo = ({ title, description, lang = "zh", children }) => {
    const { site } = useStaticQuery(
        graphql`
      query {
        site {
          siteMetadata {
            title
            titleTemplate
            description
            author
            siteUrl
            social {
              twitter
            }
          }
        }
      }
    `
    )

    const metaDescription = description || site.siteMetadata.description
    const defaultTitle = site.siteMetadata.title
    const titleTemplate = site.siteMetadata.titleTemplate

    return (
        <>
            <title>
                {title ? titleTemplate.replace("%s", title) : defaultTitle}
            </title>
            <html lang={lang} />
            <meta name="description" content={metaDescription} />
            <meta name="author" content={site.siteMetadata.author} />

            {/* Open Graph */}
            <meta property="og:title" content={title || defaultTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={site.siteMetadata.siteUrl} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:creator" content={site.siteMetadata.social.twitter} />
            <meta name="twitter:title" content={title || defaultTitle} />
            <meta name="twitter:description" content={metaDescription} />

            {children}
        </>
    )
}

export default Seo
