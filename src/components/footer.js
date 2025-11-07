import React from "react"
import { Link } from "gatsby"

const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-gray-800 text-white">
            <div className="container mx-auto px-4 py-8">
                <div className="grid md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="md:col-span-2">
                        <h3 className="text-2xl font-bold text-white mb-4">全球财税解决方案</h3>
                        <p className="text-gray-300 mb-4">
                            专业的国际财税咨询、税务筹划和商务服务，为企业提供全方位的财税解决方案。
                        </p>
                        <div className="flex space-x-4">
                            <a
                                href="https://twitter.com/taxexpert"
                                className="text-gray-300 hover:text-white transition duration-300"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Twitter
                            </a>
                            <a
                                href="https://linkedin.com/company/tax-solutions"
                                className="text-gray-300 hover:text-white transition duration-300"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                LinkedIn
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">快速链接</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/services"
                                    className="text-gray-300 hover:text-white transition duration-300"
                                >
                                    服务项目
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/about"
                                    className="text-gray-300 hover:text-white transition duration-300"
                                >
                                    关于我们
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/contact"
                                    className="text-gray-300 hover:text-white transition duration-300"
                                >
                                    联系我们
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">联系我们</h4>
                        <ul className="space-y-2 text-gray-300">
                            <li>电话: +86 10 1234 5678</li>
                            <li>邮箱: contact@yourtaxwebsite.com</li>
                            <li>地址: 北京市朝阳区金融街123号</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 text-sm">
                        © {currentYear} 全球财税解决方案. 保留所有权利.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link
                            to="/privacy"
                            className="text-gray-400 hover:text-white text-sm transition duration-300"
                        >
                            隐私政策
                        </Link>
                        <Link
                            to="/terms"
                            className="text-gray-400 hover:text-white text-sm transition duration-300"
                        >
                            使用条款
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
