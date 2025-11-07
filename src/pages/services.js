import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const ServicesPage = () => {
    const services = [
        {
            title: "国际税务筹划",
            description: "为跨国企业提供最优的税务结构设计，合理降低税务成本",
            features: ["跨境税务优化", "转让定价规划", "税收协定应用", "税务风险控制"],
            icon: "📊"
        },
        {
            title: "财税合规服务",
            description: "确保企业财税操作符合各国法律法规要求",
            features: ["财务报表编制", "税务申报", "审计支持", "合规咨询"],
            icon: "📝"
        },
        {
            title: "商务咨询服务",
            description: "为企业国际化发展提供全面的商务支持",
            features: ["公司注册", "银行开户", "法律咨询", "人力资源"],
            icon: "💼"
        },
        {
            title: "跨境投资咨询",
            description: "协助企业进行海外投资和业务拓展",
            features: ["投资环境分析", "项目评估", "风险控制", "后续管理"],
            icon: "🌍"
        }
    ]

    return (
        <Layout>
            <Seo title="我们的服务" />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">我们的服务</h1>

                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <p className="text-gray-700 text-lg mb-6">
                        我们提供全方位的国际财税和商务服务，帮助企业应对复杂的全球税务环境，实现可持续发展。
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {services.map((service, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
                            <div className="flex items-start mb-4">
                                <span className="text-3xl mr-4">{service.icon}</span>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
                                    <p className="text-gray-600 mb-4">{service.description}</p>
                                </div>
                            </div>

                            <ul className="space-y-2">
                                {service.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-center text-gray-700">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="bg-blue-50 rounded-lg p-6 text-center">
                    <h2 className="text-2xl font-semibold text-blue-700 mb-4">需要专业财税服务？</h2>
                    <p className="text-gray-700 mb-4">我们的专家团队随时为您提供咨询和解决方案</p>
                    <Link to="/contact" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
                        立即咨询
                    </Link>
                </div>
            </div>
        </Layout>
    )
}

export default ServicesPage
