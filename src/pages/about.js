import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const AboutPage = () => {
    return (
        <Layout>
            <Seo title="关于我们" />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">关于我们</h1>

                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-2xl font-semibold text-blue-600 mb-4">专业财税服务团队</h2>
                    <p className="text-gray-700 mb-4">
                        我们是一支由资深财税专家组成的专业团队，致力于为全球企业提供全方位的财税解决方案。
                        拥有超过10年的行业经验，服务客户遍布亚洲、欧洲和北美。
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 mt-8">
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h3 className="text-xl font-semibold text-blue-700 mb-3">我们的使命</h3>
                            <p className="text-gray-700">
                                为企业提供专业、高效、合规的财税服务，帮助客户在复杂的国际税务环境中实现最优的财税结构。
                            </p>
                        </div>

                        <div className="bg-green-50 p-4 rounded-lg">
                            <h3 className="text-xl font-semibold text-green-700 mb-3">我们的愿景</h3>
                            <p className="text-gray-700">
                                成为全球企业信赖的财税合作伙伴，推动国际商业的健康发展。
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">我们的优势</h2>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>多语言服务团队（中文、英文）</li>
                        <li>丰富的国际税务经验</li>
                        <li>定制化的财税解决方案</li>
                        <li>快速响应和高效执行</li>
                        <li>严格的保密制度</li>
                    </ul>
                </div>

                <div className="mt-8">
                    <Link to="/contact" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
                        联系我们
                    </Link>
                </div>
            </div>
        </Layout>
    )
}

export default AboutPage
