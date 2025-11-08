import * as React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { useTranslation } from "../hooks/use-translation"

const NotFoundPage = ({ data, location }) => {
    const siteTitle = data.site.siteMetadata.title
    const { t } = useTranslation()

    return (
        <Layout location={location} title={siteTitle}>
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                    {t('pages.404.heading')}
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                    {t('pages.404.description')}
                </p>
                <Link
                    to="/"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    {t('pages.404.goHome')}
                </Link>
            </div>
        </Layout>
    )
}

export const Head = () => {
    const { t } = useTranslation()
    return <Seo title={t('pages.404.title')} />
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
