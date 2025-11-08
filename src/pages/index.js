import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = ({ data }) => {
    const pageData = data.markdownRemark.frontmatter

    return (
        <Layout>
            <Seo
                title={pageData.seo_title}
                description={pageData.seo_description}
            />
            <div className="bg-blue-600 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold mb-4">{pageData.hero_title}</h1>
                    <p className="text-xl mb-8">{pageData.hero_subtitle}</p>
                    <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300">
                        {pageData.hero_button}
                    </button>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <h2 className="text-3xl font-bold text-center mb-8">{pageData.services_title}</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {pageData.services.map((service, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                            <p className="text-gray-600">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export const query = graphql`
  query {
    markdownRemark(
      frontmatter: { 
        template: { eq: "home" }
        language: { eq: "zh" }
      }
    ) {
      frontmatter {
        hero_title
        hero_subtitle
        hero_button
        services_title
        services {
          title
          description
        }
        seo_title
        seo_description
      }
    }
  }
`

export default IndexPage
