import React from "react"
import { Link } from "gatsby"
import LanguageSwitcher from "./language-switcher"
import { useTranslation } from "../hooks/use-translation"
import { useLocalizedPath } from "../hooks/use-localized-path"

const Header = () => {
    const { t } = useTranslation()
    const { getLocalizedPath } = useLocalizedPath()

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to={getLocalizedPath("/")} className="text-xl font-bold text-blue-600">
                    元都-逆熵
                </Link>

                <nav className="hidden md:flex items-center space-x-6">
                    <Link to={getLocalizedPath("/")} className="text-gray-600 hover:text-blue-600 transition duration-300">
                        {t('header.home')}
                    </Link>
                    <Link to={getLocalizedPath("/services")} className="text-gray-600 hover:text-blue-600 transition duration-300">
                        {t('header.services')}
                    </Link>
                    <Link to={getLocalizedPath("/products")} className="text-gray-600 hover:text-blue-600 transition duration-300">
                        {t('header.products')}
                    </Link>
                    <Link to={getLocalizedPath("/blog")} className="text-gray-600 hover:text-blue-600 transition duration-300">
                        {t('header.blog')}
                    </Link>
                    <Link to={getLocalizedPath("/about")} className="text-gray-600 hover:text-blue-600 transition duration-300">
                        {t('header.about')}
                    </Link>
                    <Link to={getLocalizedPath("/contact")} className="text-gray-600 hover:text-blue-600 transition duration-300">
                        {t('header.contact')}
                    </Link>
                </nav>

                <div className="flex items-center space-x-4">
                    <LanguageSwitcher />
                    <Link
                        to={getLocalizedPath("/contact")}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 text-sm"
                    >
                        {t('header.freeConsultation')}
                    </Link>
                </div>
            </div>

            {/* 移动端菜单 */}
            <div className="md:hidden bg-white border-t border-gray-200">
                <div className="container mx-auto px-4 py-2 flex justify-around">
                    <Link to={getLocalizedPath("/")} className="text-gray-600 hover:text-blue-600 text-sm">
                        {t('header.home')}
                    </Link>
                    <Link to={getLocalizedPath("/services")} className="text-gray-600 hover:text-blue-600 text-sm">
                        {t('header.services')}
                    </Link>
                    <Link to={getLocalizedPath("/products")} className="text-gray-600 hover:text-blue-600 text-sm">
                        {t('header.products')}
                    </Link>
                    <Link to={getLocalizedPath("/blog")} className="text-gray-600 hover:text-blue-600 text-sm">
                        {t('header.blog')}
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default Header
