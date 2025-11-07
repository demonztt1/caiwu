import React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = () => {
    return (
        <Layout>
            <Seo title="首页" />
            <div className="bg-blue-600 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold mb-4">全球财税解决方案</h1>
                    <p className="text-xl mb-8">专业的国际财税咨询、税务筹划和商务服务</p>
                    <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300">
                        立即咨询
                    </button>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <h2 className="text-3xl font-bold text-center mb-8">我们的服务</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-3">税务筹划</h3>
                        <p className="text-gray-600">专业的国际税务规划服务</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-3">财税合规</h3>
                        <p className="text-gray-600">确保企业财税操作合规</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-3">商务咨询</h3>
                        <p className="text-gray-600">全面的商务支持服务</p>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default IndexPage
