import React from "react"
import Header from "./header"
import Footer from "./footer"
// import "./layout.css" // 如果不需要自定义CSS可以移除

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout
