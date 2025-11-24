// src/components/layout.js
import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"
import Footer from "./footer"
import { useTranslation } from "../hooks/use-translation"
import { useGoogleAnalytics } from "../hooks/use-google-analytics"
import DebugListeners from "./debug-listeners"

const Layout = ({ children }) => {
    const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

    useGoogleAnalytics()
    const { t } = useTranslation()

    return (
        <div className="min-h-screen flex flex-col">
            {/* 只在开发环境启用监听器调试 */}
            {process.env.NODE_ENV === 'development' && <DebugListeners />}

            <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout
