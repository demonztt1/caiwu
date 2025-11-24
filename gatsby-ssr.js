// gatsby-ssr.js
import React from 'react'
import { languages, defaultLanguage, activeLanguageCodes } from './src/config/languages'

// 简化的 onRenderBody 实现
export const onRenderBody = ({
                               setHeadComponents,
                               setHtmlAttributes,
                               pathname
                             }) => {
  // 简化的语言检测
  const pathSegments = pathname.split('/').filter(segment => segment)
  const currentLang = (pathSegments.length > 0 && activeLanguageCodes.includes(pathSegments[0]))
      ? pathSegments[0]
      : defaultLanguage

  const language = languages[currentLang] || languages[defaultLanguage]

  // 只设置必要的 HTML 属性
  setHtmlAttributes({
    lang: currentLang,
    dir: language.direction
  })

  // 只添加必要的 alternate 链接
  const alternateLinks = activeLanguageCodes.map(langCode => {
    const lang = languages[langCode]
    return (
        <link
            key={langCode}
            rel="alternate"
            hrefLang={langCode}
            href={`https://www.rd-v6.com/${langCode === defaultLanguage ? '' : langCode + '/'}`}
        />
    )
  })

  setHeadComponents(alternateLinks)
}

// 简化包装组件
export const wrapPageElement = ({ element }) => {
  return element
}

// 移除复杂的 onPreRenderHTML 和 wrapRootElement 以减少复杂度
