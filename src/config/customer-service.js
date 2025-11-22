// config/customer-service.js
export const customerServiceConfig = {
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
        telegram: "@8615849467131",
        whatsapp: "+8615849467131",
        workingHours: "月曜日～金曜日 9:00-18:00",
        timezone: "GMT+8",
        supportLanguages: ["日本語", "English", "中文"]
    }
}
// src/config/translations.js
export const translations = {
    zh: {
        common: {
            back: "返回",
            services: "服务",
            learn_more: "了解更多"
        },
        services: {
            features_title: "服务内容",
            process_title: "服务流程",
            original_price: "原价",
            duration: "服务周期",
            custom_solution: "定制方案"
        },
        payment: {
            title: "支付",
            usdt_payment: "USDT立即支付",
            solana_support: "支持Solana USDT支付",
            contract_support: "签订正式服务合同"
        }
    },
    en: {
        common: {
            back: "Back",
            services: "Services",
            learn_more: "Learn More"
        },
        services: {
            features_title: "Service Features",
            process_title: "Service Process",
            original_price: "Original Price",
            duration: "Service Duration",
            custom_solution: "Custom Solution"
        },
        payment: {
            title: "Payment",
            usdt_payment: "Pay with USDT Now",
            solana_support: "Supports Solana USDT Payments",
            contract_support: "Formal Service Contract"
        }
    }
}
