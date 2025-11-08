import React from "react"

import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { useTranslation } from "../hooks/use-translation"

const AboutPage = ({ data, pageContext }) => {
    const pageData = data.markdownRemark?.frontmatter
    const { t } = useTranslation()

    // 如果有回退情况（没有对应语言的内容），显示默认内容
    if (pageContext.fallback && !pageData) {
        return (
            <Layout>
                <Seo title={t('pages.about.title')} />
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">
                        {t('pages.about.heading')}
                    </h1>

                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <h2 className="text-2xl font-semibold text-blue-600 mb-4">
                            {t('pages.about.teamTitle')}
                        </h2>
                        <p className="text-gray-700 mb-4">
                            {t('pages.about.teamDescription')}
                        </p>

                        <div className="grid md:grid-cols-2 gap-6 mt-8">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h3 className="text-xl font-semibold text-blue-700 mb-3">
                                    {t('pages.about.mission')}
                                </h3>
                                <p className="text-gray-700">
                                    {t('pages.about.missionDescription')}
                                </p>
                            </div>

                            <div className="bg-green-50 p-4 rounded-lg">
                                <h3 className="text-xl font-semibold text-green-700 mb-3">
                                    {t('pages.about.vision')}
                                </h3>
                                <p className="text-gray-700">
                                    {t('pages.about.visionDescription')}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            {t('pages.about.advantages')}
                        </h2>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                            {t('pages.about.advantagesList', { returnObjects: true }).map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-8">
                        <Link
                            to="/contact"
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                            {t('pages.about.contactButton')}
                        </Link>
                    </div>
                </div>
            </Layout>
        )
    }

    return (
        <Layout>
            <Seo title={pageData.seo_title} />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                    {pageData.heading}
                </h1>

                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-2xl font-semibold text-blue-600 mb-4">
                        {pageData.team_title}
                    </h2>
                    <p className="text-gray-700 mb-4">
                        {pageData.team_description}
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 mt-8">
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h3 className="text-xl font-semibold text-blue-700 mb-3">
                                {pageData.mission_title}
                            </h3>
                            <p className="text-gray-700">
                                {pageData.mission_description}
                            </p>
                        </div>

                        <div className="bg-green-50 p-4 rounded-lg">
                            <h3 className="text-xl font-semibold text-green-700 mb-3">
                                {pageData.vision_title}
                            </h3>
                            <p className="text-gray-700">
                                {pageData.vision_description}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        {pageData.advantages_title}
                    </h2>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                        {pageData.advantages.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>

                <div className="mt-8">
                    <Link
                        to="/contact"
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        {pageData.contact_button}
                    </Link>
                </div>
            </div>
        </Layout>
    )
}
export const query = graphql`
  query($language: String!) {
    markdownRemark(
      frontmatter: { 
        template: { eq: "about" }
        language: { eq: $language }
      }
    ) {
      frontmatter {
        heading
        team_title
        team_description
        mission_title
        mission_description
        vision_title
        vision_description
        advantages_title
        advantages
        contact_button
        seo_title
      }
    }
  }
`

export default AboutPage
