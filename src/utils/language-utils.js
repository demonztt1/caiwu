// src/utils/language-utils.js

import { languages } from '../config/languages';

// 获取语言显示名称
export const getLanguageDisplayName = (code, currentLanguage = 'zh') => {
    const lang = languages[code];
    if (!lang) return code;

    // 如果当前语言是中文，显示中文名称，否则显示英文名称
    return currentLanguage === 'zh' ? lang.name : lang.nativeName;
};

// 获取语言标志
export const getLanguageFlag = (code) => {
    const lang = languages[code];
    return lang ? lang.flag : '🏳️';
};

// 检查语言是否激活
export const isLanguageActive = (code) => {
    const lang = languages[code];
    return lang ? lang.isActive : false;
};

// 获取激活的语言列表
export const getActiveLanguagesList = () => {
    return Object.values(languages).filter(lang => lang.isActive);
};

// 获取语言方向
export const getLanguageDirection = (code) => {
    const lang = languages[code];
    return lang ? lang.direction : 'ltr';
};

// 语言分组（用于显示）
export const groupLanguagesByRegion = () => {
    const regions = {
        '东亚': ['zh', 'ja', 'ko'],
        '东南亚': ['vi', 'th', 'id', 'ms', 'fil'],
        '南亚': ['hi', 'bn', 'ur', 'ta', 'te'],
        '欧洲': ['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'nl', 'pl', 'sv', 'da', 'no', 'fi'],
        '中东': ['ar', 'fa', 'he', 'tr'],
        '非洲': ['sw', 'am', 'ha', 'yo', 'zu'],
        '其他': ['el', 'hu', 'cs', 'ro', 'sk', 'bg', 'hr', 'sr', 'uk']
    };

    const result = {};

    Object.entries(regions).forEach(([region, langCodes]) => {
        const regionLangs = langCodes
            .map(code => languages[code])
            .filter(lang => lang && lang.isActive);

        if (regionLangs.length > 0) {
            result[region] = regionLangs;
        }
    });

    return result;
};

export default {
    getLanguageDisplayName,
    getLanguageFlag,
    isLanguageActive,
    getActiveLanguagesList,
    getLanguageDirection,
    groupLanguagesByRegion
};
