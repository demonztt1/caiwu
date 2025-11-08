const fs = require('fs')
const path = require('path')

const languages = ['zh', 'en', 'ja', 'ko', 'fr', 'de', 'es', 'pt', 'ru', 'ar', 'hi', 'th', 'vi']
const contentDir = path.join(__dirname, '..', 'content')

// 创建基础目录结构
languages.forEach(lang => {
    const dirs = [
        path.join(contentDir, lang, 'pages'),
        path.join(contentDir, lang, 'blog'),
        path.join(contentDir, lang, 'products')
    ]

    dirs.forEach(dir => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true })
            console.log(`Created: ${dir}`)
        }
    })

    // 创建默认首页文件
    const indexFile = path.join(contentDir, lang, 'pages', 'index.md')
    if (!fs.existsSync(indexFile)) {
        const defaultContent = getDefaultContent(lang)
        fs.writeFileSync(indexFile, defaultContent)
        console.log(`Created default index for: ${lang}`)
    }
})

function getDefaultContent(lang) {
    const defaults = {
        zh: `---
template: home
language: zh
title: "元都-逆熵 - 量化万物，共建生态"
description: "专业的国际财税咨询、税务筹划、独立站建设和AI内容生成服务"
seo_title: "元都-逆熵 | 元都-逆熵与数字化解决方案"
seo_description: "专业国际财税咨询、税务筹划、独立站建设、AI内容生成服务"
hero_title: "元都-逆熵解决方案"
hero_subtitle: "专业的国际财税咨询、税务筹划和商务服务"
hero_button: "立即咨询"
services_title: "我们的服务"
services:
  - title: "税务筹划"
    description: "专业的国际税务规划服务"
  - title: "财税合规" 
    description: "确保企业财税操作合规"
  - title: "商务咨询"
    description: "全面的商务支持服务"
---`,
        en: `---
template: home  
language: en
title: "Yuandu - Negentropy | Quantify Everything, Build Ecosystem"
description: "Professional international tax consulting, tax planning, website development and AI content generation"
seo_title: "Yuandu Negentropy | Global Tax and Digital Solutions"  
seo_description: "Professional international tax consulting, tax planning, website development, AI content generation"
hero_title: "Global Tax Solutions"
hero_subtitle: "Professional international tax consulting, tax planning and business services"  
hero_button: "Contact Us"
services_title: "Our Services"
services:
  - title: "Tax Planning"
    description: "Professional international tax planning services"
  - title: "Tax Compliance"
    description: "Ensure corporate tax operations are compliant"
  - title: "Business Consulting"
    description: "Comprehensive business support services"
---`
    }

    return defaults[lang] || defaults.en
}

console.log('Language directories created successfully!')
