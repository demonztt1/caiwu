import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Bio = () => {
    const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author
          description
        }
      }
    }
  `)

    const { author, description } = data.site.siteMetadata

    return (
        <div className="bio">
            <StaticImage
                className="bio-avatar"
                layout="fixed"
                formats={["auto", "webp", "avif"]}
                src="../images/profile-pic.png"
                width={50}
                height={50}
                quality={95}
                alt="Profile picture"
            />
            <div className="bio-text">
                <strong>{author}</strong>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default Bio
