import React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"

const ContactPage = () => {
    return (
        <Layout>
            <Seo title="联系我们" />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">联系我们</h1>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* 联系信息 */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-semibold text-blue-600 mb-4">联系信息</h2>

                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold text-gray-700">地址</h3>
                                <p className="text-gray-600">北京市朝阳区金融街123号</p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-gray-700">电话</h3>
                                <p className="text-gray-600">+86 10 1234 5678</p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-gray-700">邮箱</h3>
                                <p className="text-gray-600">contact@yourtaxwebsite.com</p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-gray-700">工作时间</h3>
                                <p className="text-gray-600">周一至周五 9:00-18:00</p>
                            </div>
                        </div>
                    </div>

                    {/* 在线咨询 */}
                    <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2">
                        <h2 className="text-2xl font-semibold text-blue-600 mb-4">在线咨询</h2>

                        <form className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                        姓名 *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        邮箱 *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                        电话
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                                        咨询业务
                                    </label>
                                    <select
                                        id="service"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">请选择业务类型</option>
                                        <option value="tax">税务筹划</option>
                                        <option value="website">独立站建设</option>
                                        <option value="ai">AI内容生成</option>
                                        <option value="consulting">财税咨询</option>
                                        <option value="other">其他</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                                    预算范围
                                </label>
                                <select
                                    id="budget"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">请选择预算</option>
                                    <option value="1-5k">1,000 - 5,000元</option>
                                    <option value="5-10k">5,000 - 10,000元</option>
                                    <option value="10-20k">10,000 - 20,000元</option>
                                    <option value="20k+">20,000元以上</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                    详细需求 *
                                </label>
                                <textarea
                                    id="message"
                                    rows="4"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="请详细描述您的需求，我们将为您提供定制化方案..."
                                    required
                                ></textarea>
                            </div>

                            <div className="flex space-x-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-300 font-semibold"
                                >
                                    提交咨询
                                </button>
                                <button
                                    type="button"
                                    className="flex-1 bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition duration-300 font-semibold"
                                >
                                    立即支付
                                </button>
                            </div>

                            <div className="text-center text-sm text-gray-500">
                                <p>支持支付宝、微信支付、银行转账</p>
                                <p>付款后我们将立即为您安排服务</p>
                            </div>
                        </form>
                    </div>
                </div>

                {/* 支付方式说明 */}
                <div className="mt-8 bg-gray-50 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">支付方式</h2>
                    <div className="grid md:grid-cols-4 gap-4 text-center">
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                            <div className="text-2xl mb-2">💳</div>
                            <h3 className="font-semibold">在线支付</h3>
                            <p className="text-sm text-gray-600">支付宝/微信</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                            <div className="text-2xl mb-2">🏦</div>
                            <h3 className="font-semibold">银行转账</h3>
                            <p className="text-sm text-gray-600">对公账户</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                            <div className="text-2xl mb-2">📝</div>
                            <h3 className="font-semibold">合同签订</h3>
                            <p className="text-sm text-gray-600">正式发票</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                            <div className="text-2xl mb-2">🛡️</div>
                            <h3 className="font-semibold">安全保障</h3>
                            <p className="text-sm text-gray-600">资金监管</p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ContactPage
