// src/components/MultiLanguageContact.js
import React, { useState } from 'react'
import { useTranslation } from '../hooks/use-translation'

const MultiLanguageContact = ({ currentLanguage }) => {
    const { t } = useTranslation()
    const [showWechatModal, setShowWechatModal] = useState(false)
    const [selectedService, setSelectedService] = useState('')

    // 多语言客服配置
    const customerServiceConfig = {
        zh: {
            qq: "276852953",
            wechat: "yuan-du-cs",
            phone: "+86 158 4946 7131",
            telegram: "",
            whatsapp: "",
            workingHours: "周一至周五 9:00-18:00",
            timezone: "GMT+8",
            supportLanguages: ["中文", "English"]
        },
        en: {
            qq: "",
            wechat: "yuan-du-en",
            phone: "+86 158 4946 7131",
            telegram: "@yuandu_service",
            whatsapp: "+8615849467131",
            workingHours: "Mon-Fri 9:00-18:00 (GMT+8)",
            timezone: "GMT+8",
            supportLanguages: ["English", "中文"]
        },
        ja: {
            qq: "",
            wechat: "yuan-du-ja",
            phone: "+86 158 4946 7131",
            telegram: "@yuandu_jp",
            whatsapp: "+8615849467131",
            workingHours: "月曜日～金曜日 9:00-18:00",
            timezone: "GMT+8",
            supportLanguages: ["日本語", "English", "中文"]
        }
    }

    const currentConfig = customerServiceConfig[currentLanguage] || customerServiceConfig.zh

    const getContactOptions = () => {
        const baseOptions = [
            {
                id: 'wechat',
                name: t('contact.wechat', '微信'),
                icon: '💬',
                color: 'bg-green-500 hover:bg-green-600',
                action: () => setShowWechatModal(true)
            },
            {
                id: 'phone',
                name: t('contact.phone', '电话'),
                icon: '📞',
                color: 'bg-blue-500 hover:bg-blue-600',
                action: () => window.open(`tel:${currentConfig.phone}`)
            }
        ]

        // 根据语言添加特定选项
        if (currentLanguage === 'en' && currentConfig.telegram) {
            baseOptions.push({
                id: 'telegram',
                name: 'Telegram',
                icon: '✈️',
                color: 'bg-blue-400 hover:bg-blue-500',
                action: () => window.open(`https://t.me/${currentConfig.telegram}`)
            })
        }

        if (currentLanguage === 'en' && currentConfig.whatsapp) {
            baseOptions.push({
                id: 'whatsapp',
                name: 'WhatsApp',
                icon: '💚',
                color: 'bg-green-600 hover:bg-green-700',
                action: () => window.open(`https://wa.me/${currentConfig.whatsapp}`)
            })
        }

        if (currentConfig.qq) {
            baseOptions.push({
                id: 'qq',
                name: 'QQ',
                icon: '💙',
                color: 'bg-blue-600 hover:bg-blue-700',
                action: () => window.open(`http://wpa.qq.com/msgrd?v=3&uin=${currentConfig.qq}&site=qq&menu=yes`)
            })
        }

        return baseOptions
    }

    const getServiceOptions = () => [
        {
            id: 'tax',
            name: t('services.tax', '税务筹划'),
            description: t('services.taxDesc', '国际税务优化方案')
        },
        {
            id: 'compliance',
            name: t('services.compliance', '财税合规'),
            description: t('services.complianceDesc', '确保企业合规运营')
        },
        {
            id: 'business',
            name: t('services.business', '商务咨询'),
            description: t('services.businessDesc', '全面的商务支持服务')
        },
        {
            id: 'ai',
            name: t('services.ai', 'AI内容服务'),
            description: t('services.aiDesc', '多语言内容生成')
        }
    ]

    const contactOptions = getContactOptions()
    const serviceOptions = getServiceOptions()

    return (
        <div className="space-y-6">
            {/* 服务选择 */}
            <div className="card p-6">
                <h3 className="text-xl font-semibold mb-4">
                    {t('contact.selectService', '选择咨询服务')}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                    {serviceOptions.map(service => (
                        <button
                            key={service.id}
                            onClick={() => setSelectedService(service.id)}
                            className={`p-4 border rounded-lg text-left transition ${
                                selectedService === service.id
                                    ? 'border-indigo-500 bg-indigo-50'
                                    : 'border-gray-200 hover:border-indigo-300'
                            }`}
                        >
                            <h4 className="font-semibold mb-1">{service.name}</h4>
                            <p className="text-sm text-gray-600">{service.description}</p>
                        </button>
                    ))}
                </div>
            </div>

            {/* 联系渠道 */}
            <div className="card p-6">
                <h3 className="text-xl font-semibold mb-4">
                    {t('contact.contactChannels', '联系渠道')}
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    {contactOptions.map(option => (
                        <button
                            key={option.id}
                            onClick={option.action}
                            className={`${option.color} text-white p-4 rounded-lg transition transform hover:scale-105`}
                        >
                            <div className="text-2xl mb-2">{option.icon}</div>
                            <div className="font-semibold">{option.name}</div>
                        </button>
                    ))}
                </div>

                {/* 服务信息 */}
                <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex flex-wrap justify-between text-sm text-gray-600">
                        <div>
                            <strong>{t('contact.workingHours', '工作时间')}:</strong> {currentConfig.workingHours}
                        </div>
                        <div>
                            <strong>{t('contact.timezone', '时区')}:</strong> {currentConfig.timezone}
                        </div>
                        <div>
                            <strong>{t('contact.supportLanguages', '支持语言')}:</strong> {currentConfig.supportLanguages.join(', ')}
                        </div>
                    </div>
                </div>
            </div>

            {/* 微信二维码弹窗 */}
            // 可以添加一个手动输入微信号的备选方案
            {showWechatModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg text-center max-w-sm">
                        {/* 二维码部分 */}
                        <img
                            src={`/images/wechat-${currentLanguage}.jpg`}
                            alt="WeChat QR Code"
                            className="w-48 h-48 mx-auto mb-4 border"
                            onError={(e) => {
                                e.target.src = '/images/wechat-default.jpg'
                            }}
                        />

                        {/* 手动输入备选方案 */}
                        <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                            <p className="text-sm text-gray-600 mb-2">
                                如果二维码无法扫描，请手动搜索微信号：
                            </p>
                            <div className="flex items-center justify-center">
                                <code className="bg-gray-100 px-3 py-1 rounded text-lg font-mono">
                                    {currentConfig.wechat}
                                </code>
                                <button
                                    onClick={() => navigator.clipboard.writeText(currentConfig.wechat)}
                                    className="ml-2 text-blue-500 hover:text-blue-700"
                                >
                                    复制
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={() => setShowWechatModal(false)}
                            className="btn-secondary w-full mt-4"
                        >
                            {t('common.close', '关闭')}
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MultiLanguageContact
