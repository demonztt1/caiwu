// gatsby-ssr.js
import React from 'react'
import { languages, defaultLanguage, activeLanguageCodes } from './src/config/languages'

/**
 * Gatsby SSR (Server-Side Rendering) API 实现
 * 用于在构建时优化多语言支持和SEO
 */

// 合并后的 onRenderBody 函数
export const onRenderBody = ({
                               setHeadComponents,
                               setHtmlAttributes,
                               setBodyAttributes,
                               setPreBodyComponents,
                               setPostBodyComponents,
                               pathname
                             }) => {
  // 根据路径检测语言
  const detectLanguageFromPath = (path) => {
    const pathSegments = path.split('/').filter(segment => segment)
    if (pathSegments.length > 0 && activeLanguageCodes.includes(pathSegments[0])) {
      return pathSegments[0]
    }
    return defaultLanguage
  }

  const currentLang = detectLanguageFromPath(pathname)
  const language = languages[currentLang] || languages[defaultLanguage]

  // 设置HTML属性
  setHtmlAttributes({
    lang: currentLang,
    dir: language.direction
  })

  // 设置Body属性
  setBodyAttributes({
    className: `gatsby-ssr-loaded language-${language.direction}`
  })

  // 添加多语言alternate链接
  const alternateLinks = activeLanguageCodes.map(langCode => {
    const lang = languages[langCode]
    return (
        <link
            key={langCode}
            rel="alternate"
            hrefLang={langCode}
            href={`https://www.rd-v6.com/${langCode === defaultLanguage ? '' : langCode + '/'}`}
            title={lang.nativeName}
        />
    )
  })

  // 添加x-default链接
  const defaultLink = (
      <link
          key="x-default"
          rel="alternate"
          hrefLang="x-default"
          href="https://www.rd-v6.com/"
      />
  )

  setHeadComponents([defaultLink, ...alternateLinks])

  // 添加语言检测脚本到body前
  setPreBodyComponents([
    <script
        key="language-detection"
        dangerouslySetInnerHTML={{
          __html: `
          window.__GATSBY_LANGUAGE__ = '${currentLang}';
          window.__GATSBY_LANGUAGES__ = ${JSON.stringify(activeLanguageCodes)};
          window.__GATSBY_DEFAULT_LANGUAGE__ = '${defaultLanguage}';
        `
        }}
    />
  ])

  // 添加语言样式
  setPostBodyComponents([
    <style
        key="language-styles"
        dangerouslySetInnerHTML={{
          __html: `
          [dir="rtl"] {
            text-align: right;
          }
          [dir="ltr"] {
            text-align: left;
          }
          .language-rtl {
            direction: rtl;
          }
          .language-ltr {
            direction: ltr;
          }
        `
        }}
    />
  ])
}

// 包装页面元素
export const wrapPageElement = ({ element, props }) => {
  // 从页面上下文获取语言信息
  const { pageContext } = props
  const langCode = pageContext?.lang || defaultLanguage
  const language = languages[langCode] || languages[defaultLanguage]

  // 创建带语言上下文的包装组件
  const LanguageWrapper = ({ children }) => {
    return React.cloneElement(children, {
      // 注入语言信息到页面props
      languageContext: {
        currentLanguage: language,
        languages: languages,
        defaultLanguage: defaultLanguage
      }
    })
  }

  return <LanguageWrapper>{element}</LanguageWrapper>
}

// 预渲染HTML处理
export const onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
  const headComponents = getHeadComponents()

  // 重新排序head组件以优化SEO
  const orderedComponents = headComponents.sort((a, b) => {
    const order = [
      'title',
      'meta',
      'link',
      'style',
      'script',
      'noscript'
    ]
    return order.indexOf(a.type) - order.indexOf(b.type)
  })

  // 添加预加载链接
  const preloadLinks = activeLanguageCodes.map(langCode => (
      <link
          key={`preload-${langCode}`}
          rel="preload"
          as="document"
          href={`/${langCode === defaultLanguage ? '' : langCode + '/'}`}
          hrefLang={langCode}
      />
  ))

  replaceHeadComponents([...preloadLinks, ...orderedComponents])
}

// 错误边界处理
export const wrapRootElement = ({ element }) => {
  // 这里可以添加错误边界或Provider
  return element
}

// 注意：onCreatePage 应该在 gatsby-node.js 中定义，而不是在 gatsby-ssr.js 中
// 因此我移除了这里的 onCreatePage 函数

export default {
  onRenderBody,
  wrapPageElement,
  onPreRenderHTML,
  wrapRootElement
}
