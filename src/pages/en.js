import React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"

const EnglishPage = () => {
    return (
        <Layout>
            <Seo title="Home" />
            <div className="bg-blue-600 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold mb-4">Global Tax Solutions</h1>
                    <p className="text-xl mb-8">Professional international tax consulting, tax planning and business services</p>
                    <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300">
                        Contact Us
                    </button>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-3">Tax Planning</h3>
                        <p className="text-gray-600">Professional international tax planning services</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-3">Tax Compliance</h3>
                        <p className="text-gray-600">Ensure corporate tax operations are compliant</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-3">Business Consulting</h3>
                        <p className="text-gray-600">Comprehensive business support services</p>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default EnglishPage
