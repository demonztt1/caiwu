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
            {/* Hero 区域 - 使用统一的容器 */}
            <section className="hero-section-elegant text-white py-20">
                <div className="main-container text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">{pageData.hero_title}</h1>
                    <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">{pageData.hero_subtitle}</p>
                    <button className="btn-primary text-lg px-8 py-3 bg-white text-indigo-600 hover:bg-gray-100">
                        {pageData.hero_button}
                    </button>
                </div>
            </section>

            {/* 服务区域 - 使用统一的容器 */}
            <section className="py-16">
                <div className="main-container">
                    <h2 className="text-3xl font-bold text-center mb-12">{pageData.services_title}</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {pageData.services.map((service, index) => (
                            <div key={index} className="card text-center p-8 hover:shadow-lg transition-shadow duration-300">
                                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-3 text-gray-800">{service.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
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
