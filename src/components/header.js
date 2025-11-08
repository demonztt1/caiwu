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
            {/* 使用 nav-container 限制导航宽度 */}
            <div className="nav-container py-4 flex justify-between items-center">
                <Link to={getLocalizedPath("/")} className="text-xl font-bold text-indigo-600">
                    元都-逆熵
                </Link>

                <nav className="hidden md:flex items-center space-x-6">
                    <Link
                        to={getLocalizedPath("/")}
                        className="nav-link"
                        activeClassName="active"
                    >
                        {t('header.home')}
                    </Link>
                    <Link
                        to={getLocalizedPath("/services")}
                        className="nav-link"
                        activeClassName="active"
                    >
                        {t('header.services')}
                    </Link>
                    <Link
                        to={getLocalizedPath("/products")}
                        className="nav-link"
                        activeClassName="active"
                    >
                        {t('header.products')}
                    </Link>
                    <Link
                        to={getLocalizedPath("/blog")}
                        className="nav-link"
                        activeClassName="active"
                    >
                        {t('header.blog')}
                    </Link>
                    <Link
                        to={getLocalizedPath("/about")}
                        className="nav-link"
                        activeClassName="active"
                    >
                        {t('header.about')}
                    </Link>
                    <Link
                        to={getLocalizedPath("/contact")}
                        className="nav-link"
                        activeClassName="active"
                    >
                        {t('header.contact')}
                    </Link>
                </nav>

                <div className="flex items-center space-x-4">

                    <Link
                        to={getLocalizedPath("/contact")}
                        className="btn-primary text-sm"
                    >
                        {t('header.freeConsultation')}
                    </Link>
                    <LanguageSwitcher />
                </div>
            </div>

            {/* 移动端菜单 - 同样限制宽度 */}
            <div className="md:hidden bg-white border-t border-gray-200">
                <div className="nav-container py-2 flex justify-around">
                    <Link to={getLocalizedPath("/")} className="text-gray-600 hover:text-indigo-600 text-sm">
                        {t('header.home')}
                    </Link>
                    <Link to={getLocalizedPath("/services")} className="text-gray-600 hover:text-indigo-600 text-sm">
                        {t('header.services')}
                    </Link>
                    <Link to={getLocalizedPath("/products")} className="text-gray-600 hover:text-indigo-600 text-sm">
                        {t('header.products')}
                    </Link>
                    <Link to={getLocalizedPath("/blog")} className="text-gray-600 hover:text-indigo-600 text-sm">
                        {t('header.blog')}
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default Header
