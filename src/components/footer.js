import React from "react"
import { Link } from "gatsby"
import { useTranslation } from "../hooks/use-translation"
import { useLocalizedPath } from "../hooks/use-localized-path"

const Footer = () => {
    const currentYear = new Date().getFullYear()
    const { t } = useTranslation()
    const { getLocalizedPath } = useLocalizedPath()

    return (
        <footer className="bg-gray-800 text-white">
            <div className="container mx-auto px-4 py-8">
                <div className="grid md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="md:col-span-2">
                        <h3 className="text-2xl font-bold text-white mb-4">
                            {t('footer.companyName')}
                        </h3>
                        <p className="text-gray-300 mb-4">
                            {t('footer.companyDescription')}
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
                        <h4 className="text-lg font-semibold mb-4">
                            {t('footer.quickLinks')}
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to={getLocalizedPath("/services")}
                                    className="text-gray-300 hover:text-white transition duration-300"
                                >
                                    {t('footer.services')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={getLocalizedPath("/about")}
                                    className="text-gray-300 hover:text-white transition duration-300"
                                >
                                    {t('footer.about')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={getLocalizedPath("/contact")}
                                    className="text-gray-300 hover:text-white transition duration-300"
                                >
                                    {t('footer.contact')}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">
                            {t('footer.contactUs')}
                        </h4>
                        <ul className="space-y-2 text-gray-300">
                            <li>{t('footer.phone')}: +86 158 4946 7131</li>
                            <li>{t('footer.email')}: 276852953@qq.com</li>
                            <li>{t('footer.address')}: 成都龙泉驿金融街123号</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 text-sm">
                        © {currentYear} {t('footer.companyName')}. {t('footer.rights')} 晋ICP备2023001542号-1
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link
                            to={getLocalizedPath("/privacy")}
                            className="text-gray-400 hover:text-white text-sm transition duration-300"
                        >
                            {t('footer.privacyPolicy')}
                        </Link>
                        <Link
                            to={getLocalizedPath("/terms")}
                            className="text-gray-400 hover:text-white text-sm transition duration-300"
                        >
                            {t('footer.terms')}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
