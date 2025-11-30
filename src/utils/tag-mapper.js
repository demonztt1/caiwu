// src/utils/tag-mapper.js

// 标签映射工具 - 优化版本
export const TAG_MAPPINGS = {
    // 中文标签映射
    zh: {
        // 个人成长
        '个人成长': 'personal-growth',
        '个人发展': 'personal-growth',
        '成长路径': 'personal-growth',
        '能力评估': 'personal-growth',
        '职业发展': 'personal-growth',
        '技能提升': 'personal-growth',

        // 决策分析
        '决策分析': 'decision-analysis',
        '数据分析': 'decision-analysis',
        '数据可视化': 'decision-analysis',
        '状态空间': 'decision-analysis',
        '决策树': 'decision-analysis',
        '风险评估': 'decision-analysis',

        // 量化交易
        '量化交易': 'quantitative-trading',
        '策略验证': 'quantitative-trading',
        '回测': 'quantitative-trading',
        '风险控制': 'quantitative-trading',
        '绩效分析': 'quantitative-trading',
        '模型优化': 'quantitative-trading',

        // 销售数据
        '销售数据': 'sales-finance',
        '数据洞察': 'sales-finance',
        '销售系统': 'sales-finance',
        '数据管理': 'sales-finance',
        '业务追踪': 'sales-finance',

        // 能源方案
        '能源方案': 'energy-solutions',
        '能源解决': 'energy-solutions',
        '热力系统': 'energy-solutions',
        '可持续': 'energy-solutions',
        '生态': 'energy-solutions',

        // 内容生态
        '内容生态': 'content-ecosystem',
        '独立站': 'content-ecosystem',
        '内容策略': 'content-ecosystem',
        'AI': 'content-ecosystem',
        '人工智能': 'content-ecosystem',
        '内容生成': 'content-ecosystem',
        'SEO': 'content-ecosystem'
    },

    // 英文标签映射
    en: {
        // personal growth
        'personal-growth': 'personal-growth',
        'personal growth': 'personal-growth',
        'personal development': 'personal-growth',
        'growth path': 'personal-growth',
        'skill assessment': 'personal-growth',
        'career development': 'personal-growth',
        'skill improvement': 'personal-growth',

        // decision analysis
        'decision-analysis': 'decision-analysis',
        'decision analysis': 'decision-analysis',
        'data analysis': 'decision-analysis',
        'data visualization': 'decision-analysis',
        'state space': 'decision-analysis',
        'decision tree': 'decision-analysis',
        'risk assessment': 'decision-analysis',

        // quantitative trading
        'quantitative-trading': 'quantitative-trading',
        'quantitative trading': 'quantitative-trading',
        'strategy validation': 'quantitative-trading',
        'backtesting': 'quantitative-trading',
        'risk control': 'quantitative-trading',
        'performance analysis': 'quantitative-trading',
        'model optimization': 'quantitative-trading',

        // sales finance
        'sales-finance': 'sales-finance',
        'sales finance': 'sales-finance',
        'sales data': 'sales-finance',
        'data insights': 'sales-finance',
        'sales system': 'sales-finance',
        'data management': 'sales-finance',
        'business tracking': 'sales-finance',

        // energy solutions
        'energy-solutions': 'energy-solutions',
        'energy solutions': 'energy-solutions',
        'thermal system': 'energy-solutions',
        'sustainable': 'energy-solutions',
        'ecological': 'energy-solutions',

        // content ecosystem
        'content-ecosystem': 'content-ecosystem',
        'content ecosystem': 'content-ecosystem',
        'independent sites': 'content-ecosystem',
        'content strategy': 'content-ecosystem',
        'AI': 'content-ecosystem',
        'artificial intelligence': 'content-ecosystem',
        'content generation': 'content-ecosystem',
        'SEO': 'content-ecosystem'
    },

    // 西班牙语标签映射
    es: {
        'crecimiento-personal': 'personal-growth',
        'desarrollo-personal': 'personal-growth',
        'análisis-decisiones': 'decision-analysis',
        'análisis-datos': 'decision-analysis',
        'trading-cuantitativo': 'quantitative-trading',
        'estrategias-cuantitativas': 'quantitative-trading',
        'ventas-datos': 'sales-finance',
        'soluciones-energía': 'energy-solutions',
        'sitios-independientes': 'content-ecosystem',
        'contenido-IA': 'content-ecosystem'
    },

    // 法语标签映射
    fr: {
        'croissance-personnelle': 'personal-growth',
        'développement-personnel': 'personal-growth',
        'analyse-décisions': 'decision-analysis',
        'analyse-données': 'decision-analysis',
        'trading-quantitatif': 'quantitative-trading',
        'stratégies-quantitatives': 'quantitative-trading',
        'ventes-données': 'sales-finance',
        'solutions-énergie': 'energy-solutions',
        'sites-indépendants': 'content-ecosystem',
        'contenu-IA': 'content-ecosystem'
    },

    // 德语标签映射
    de: {
        'persönliches-wachstum': 'personal-growth',
        'persönliche-entwicklung': 'personal-growth',
        'entscheidungsanalyse': 'decision-analysis',
        'datenanalyse': 'decision-analysis',
        'quantitatives-trading': 'quantitative-trading',
        'quantitative-strategien': 'quantitative-trading',
        'verkaufsdaten': 'sales-finance',
        'energielösungen': 'energy-solutions',
        'unabhängige-seiten': 'content-ecosystem',
        'KI-inhalt': 'content-ecosystem'
    }
};

// 主题配置
export const THEME_CONFIG = {
    'personal-growth': {
        nameKey: 'pages.home.services.personal-growth.title',
        descriptionKey: 'pages.home.services.personal-growth.description',
        icon: '🚀',
        color: 'from-blue-500 to-cyan-500',
        borderColor: 'border-l-blue-500',
        bgColor: 'bg-blue-50'
    },
    'decision-analysis': {
        nameKey: 'pages.home.services.decision-analysis.title',
        descriptionKey: 'pages.home.services.decision-analysis.description',
        icon: '📊',
        color: 'from-green-500 to-emerald-500',
        borderColor: 'border-l-green-500',
        bgColor: 'bg-green-50'
    },
    'quantitative-trading': {
        nameKey: 'pages.home.services.quantitative-trading.title',
        descriptionKey: 'pages.home.services.quantitative-trading.description',
        icon: '📈',
        color: 'from-purple-500 to-pink-500',
        borderColor: 'border-l-purple-500',
        bgColor: 'bg-purple-50'
    },
    'sales-finance': {
        nameKey: 'pages.home.services.sales-finance.title',
        descriptionKey: 'pages.home.services.sales-finance.description',
        icon: '💼',
        color: 'from-orange-500 to-red-500',
        borderColor: 'border-l-orange-500',
        bgColor: 'bg-orange-50'
    },
    'energy-solutions': {
        nameKey: 'pages.home.services.energy-solutions.title',
        descriptionKey: 'pages.home.services.energy-solutions.description',
        icon: '🔋',
        color: 'from-yellow-500 to-amber-500',
        borderColor: 'border-l-yellow-500',
        bgColor: 'bg-yellow-50'
    },
    'content-ecosystem': {
        nameKey: 'pages.home.services.content-ecosystem.title',
        descriptionKey: 'pages.home.services.content-ecosystem.description',
        icon: '🌐',
        color: 'from-indigo-500 to-purple-500',
        borderColor: 'border-l-indigo-500',
        bgColor: 'bg-indigo-50'
    }
};

// 获取主题从标签
export const getThemeFromTags = (tags, language = 'zh') => {
    if (!tags || !Array.isArray(tags)) return 'content-ecosystem';

    const mapping = TAG_MAPPINGS[language] || TAG_MAPPINGS.zh;

    // 首先尝试精确匹配
    for (const tag of tags) {
        const normalizedTag = tag.toLowerCase().trim();

        // 精确匹配
        if (mapping[normalizedTag]) {
            return mapping[normalizedTag];
        }

        // 包含匹配
        for (const [key, value] of Object.entries(mapping)) {
            if (normalizedTag.includes(key.toLowerCase()) ||
                key.toLowerCase().includes(normalizedTag)) {
                return value;
            }
        }
    }

    // 如果没有匹配，根据语言返回默认主题
    const defaultThemes = {
        'zh': 'content-ecosystem',
        'en': 'content-ecosystem',
        'es': 'content-ecosystem',
        'fr': 'content-ecosystem',
        'de': 'content-ecosystem',
        'ja': 'content-ecosystem',
        'ko': 'content-ecosystem'
    };

    return defaultThemes[language] || 'content-ecosystem';
};

// 获取主题配置
export const getThemeConfig = (themeKey) => {
    return THEME_CONFIG[themeKey] || THEME_CONFIG['content-ecosystem'];
};

// 获取所有主题键
export const getAllThemeKeys = () => {
    return Object.keys(THEME_CONFIG);
};

// 根据主题获取相关标签建议
export const getSuggestedTagsByTheme = (theme, language = 'zh') => {
    const mapping = TAG_MAPPINGS[language] || TAG_MAPPINGS.zh;
    const suggestedTags = [];

    for (const [tag, themeKey] of Object.entries(mapping)) {
        if (themeKey === theme && !tag.includes('-')) {
            suggestedTags.push(tag);
        }
    }

    return suggestedTags.slice(0, 5); // 返回前5个建议标签
};

export default getThemeFromTags;
