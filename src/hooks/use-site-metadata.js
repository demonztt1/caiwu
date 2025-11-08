import { useStaticQuery, graphql } from "gatsby"

export const useSiteMetadata = () => {
    const { site } = useStaticQuery(
        graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            title
            titleTemplate
            description
            author
            siteUrl
            social {
              twitter
              linkedin
            }
          }
        }
      }
    `
    )
    return site.siteMetadata
}
