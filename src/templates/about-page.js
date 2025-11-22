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
                <Seo
                    title={t('pages.about.title')}
                    description={t('pages.about.description', {
                        defaultValue: "了解元都逆熵团队的使命、愿景和核心优势"
                    })}
                />

                {/* 使用内容容器居中 */}
                <section className="py-16">
                    <div className="main-container">
                        <h1 className="text-3xl font-bold text-gray-800 mb-6">
                            {t('pages.about.heading')}
                        </h1>

                        <div className="card p-6 mb-6">
                            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
                                {t('pages.about.teamTitle')}
                            </h2>
                            <p className="text-gray-700 mb-4">
                                {t('pages.about.teamDescription')}
                            </p>

                            <div className="grid md:grid-cols-2 gap-6 mt-8">
                                <div className="bg-indigo-50 p-4 rounded-lg">
                                    <h3 className="text-xl font-semibold text-indigo-700 mb-3">
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
                                className="btn-primary px-6 py-3"
                            >
                                {t('pages.about.contactButton')}
                            </Link>
                        </div>
                    </div>
                </section>
            </Layout>
        )
    }

    return (
        <Layout>
            <Seo
                title={pageData.seo_title || pageData.heading}
                description={pageData.seo_description || pageData.team_description}
            />

            {/* 使用内容容器居中 */}
            <section className="py-16">
                <div className="main-container">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">
                        {pageData.heading}
                    </h1>

                    <div className="card p-6 mb-6">
                        <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
                            {pageData.team_title}
                        </h2>
                        <p className="text-gray-700 mb-4">
                            {pageData.team_description}
                        </p>

                        <div className="grid md:grid-cols-2 gap-6 mt-8">
                            <div className="bg-indigo-50 p-4 rounded-lg">
                                <h3 className="text-xl font-semibold text-indigo-700 mb-3">
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
                            className="btn-primary px-6 py-3"
                        >
                            {pageData.contact_button}
                        </Link>
                    </div>
                </div>
            </section>
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
