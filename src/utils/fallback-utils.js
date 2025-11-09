// src/utils/fallback-utils.js
import { defaultLanguage } from '../config/languages'

/**
 * 检查当前页面是否为回退情况
 */
export const isFallbackPage = (pageContext, data) => {
    // 如果明确标记为回退，直接返回 true
    if (pageContext.fallback) {
        return true
    }

    // 检查数据是否存在
    if (!data) {
        return true
    }

    // 对于列表页面，检查是否有节点
    if (data.allMarkdownRemark && data.allMarkdownRemark.nodes.length === 0) {
        return true
    }

    // 对于单个页面，检查主要数据是否存在
    if (data.markdownRemark && !data.markdownRemark.frontmatter) {
        return true
    }

    return false
}

/**
 * 获取回退内容配置
 */
export const getFallbackConfig = (language) => {
    const configs = {
        zh: {
            noContent: '暂无内容',
            beingPrepared: '内容正在准备中...'
        },
        en: {
            noContent: 'No content available',
            beingPrepared: 'Content is being prepared...'
        },
        ja: {
            noContent: 'コンテンツはありません',
            beingPrepared: 'コンテンツを準備中...'
        }
    }

    return configs[language] || configs[defaultLanguage]
}
