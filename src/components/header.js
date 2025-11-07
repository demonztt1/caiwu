import React from "react"
import { Link } from "gatsby"
import LanguageSwitcher from "./language-switcher"

const Header = () => {
    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="text-xl font-bold text-blue-600">
                    全球财税解决方案
                </Link>

                <nav className="hidden md:flex items-center space-x-6">
                    <Link to="/" className="text-gray-600 hover:text-blue-600 transition duration-300">
                        首页
                    </Link>
                    <Link to="/services" className="text-gray-600 hover:text-blue-600 transition duration-300">
                        服务项目
                    </Link>
                    <Link to="/products" className="text-gray-600 hover:text-blue-600 transition duration-300">
                        产品方案
                    </Link>
                    <Link to="/blog" className="text-gray-600 hover:text-blue-600 transition duration-300">
                        知识博客
                    </Link>
                    <Link to="/about" className="text-gray-600 hover:text-blue-600 transition duration-300">
                        关于我们
                    </Link>
                    <Link to="/contact" className="text-gray-600 hover:text-blue-600 transition duration-300">
                        联系我们
                    </Link>
                </nav>

                <div className="flex items-center space-x-4">
                    <LanguageSwitcher />
                    <Link
                        to="/contact"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 text-sm"
                    >
                        免费咨询
                    </Link>
                </div>
            </div>

            {/* 移动端菜单 */}
            <div className="md:hidden bg-white border-t border-gray-200">
                <div className="container mx-auto px-4 py-2 flex justify-around">
                    <Link to="/" className="text-gray-600 hover:text-blue-600 text-sm">首页</Link>
                    <Link to="/services" className="text-gray-600 hover:text-blue-600 text-sm">服务</Link>
                    <Link to="/products" className="text-gray-600 hover:text-blue-600 text-sm">产品</Link>
                    <Link to="/blog" className="text-gray-600 hover:text-blue-600 text-sm">博客</Link>
                </div>
            </div>
        </header>
    )
}

export default Header
