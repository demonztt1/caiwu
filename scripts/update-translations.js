// scripts/update-translations.js
const fs = require('fs');
const path = require('path');

// 需要添加的博客相关翻译字段
const BLOG_TRANSLATIONS = {
    "pages": {
        "blog": {
            "tagFilter": "",
            "clearFilter": "",
            "filteredByTag": "",
            "noPostsWithTag": "",
            "viewAllPosts": "",
            "articlesCount": "",
            "categories": "",
            "browseCategory": "",
            "preparingContent": "",
            "noPosts": "",
            "description": "",
            "heading": ""
        }
    }
};

// 根据语言代码生成对应的翻译值
function generateTranslations(langCode) {
    const translations = JSON.parse(JSON.stringify(BLOG_TRANSLATIONS));

    // 为不同语言生成对应的翻译文本
    const langTranslations = {
        'zh': {
            tagFilter: "标签",
            clearFilter: "清除筛选",
            filteredByTag: "正在查看标签",
            noPostsWithTag: "没有找到包含该标签的文章",
            viewAllPosts: "查看所有文章",
            articlesCount: "篇文章",
            categories: "博客主题目录",
            browseCategory: "浏览主题",
            preparingContent: "该语言版本的博客内容正在准备中...",
            noPosts: "暂无博客文章",
            description: "探索最新的量化分析见解、技术文章和行业动态",
            heading: "最新文章"
        },
        'en': {
            tagFilter: "Tag",
            clearFilter: "Clear filter",
            filteredByTag: "Viewing tag",
            noPostsWithTag: "No articles found with this tag",
            viewAllPosts: "View all posts",
            articlesCount: "articles",
            categories: "Blog Categories",
            browseCategory: "Browse Category",
            preparingContent: "Blog content in this language is being prepared...",
            noPosts: "No blog posts available",
            description: "Explore the latest quantitative analysis insights, technical articles and industry trends",
            heading: "Latest Articles"
        },
        'es': {
            tagFilter: "Etiqueta",
            clearFilter: "Limpiar filtro",
            filteredByTag: "Viendo etiqueta",
            noPostsWithTag: "No se encontraron artículos con esta etiqueta",
            viewAllPosts: "Ver todas las publicaciones",
            articlesCount: "artículos",
            categories: "Categorías del Blog",
            browseCategory: "Explorar Categoría",
            preparingContent: "El contenido del blog en este idioma se está preparando...",
            noPosts: "No hay publicaciones disponibles",
            description: "Explora los últimos conocimientos de análisis cuantitativo, artículos técnicos y tendencias de la industria",
            heading: "Últimos Artículos"
        }
    };

    // 获取对应语言的翻译，如果没有则使用英语
    const langData = langTranslations[langCode] || langTranslations['en'];

    // 填充翻译文本
    Object.keys(translations.pages.blog).forEach(key => {
        if (langData[key]) {
            translations.pages.blog[key] = langData[key];
        }
    });

    return translations;
}

// 更新单个翻译文件
function updateTranslationFile(filePath, langCode) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');

        // 提取现有的翻译对象
        const exportMatch = content.match(/export const \w+ = ({[\s\S]*?});/);
        if (!exportMatch) {
            console.log(`❌ 无法解析文件: ${filePath}`);
            return false;
        }

        const existingTranslations = eval(`(${exportMatch[1]})`);
        const newTranslations = generateTranslations(langCode);

        // 深度合并翻译对象
        function deepMerge(target, source) {
            for (const key in source) {
                if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                    if (!target[key]) target[key] = {};
                    deepMerge(target[key], source[key]);
                } else {
                    target[key] = source[key];
                }
            }
        }

        deepMerge(existingTranslations, newTranslations);

        // 重新生成文件内容
        const newContent = content.replace(
            /export const \w+ = {[\s\S]*?};/,
            `export const ${getLanguageConstantName(langCode)} = ${JSON.stringify(existingTranslations, null, 2).replace(/"([^"]+)":/g, '$1:')};`
        );

        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`✅ 更新完成: ${filePath}`);
        return true;
    } catch (error) {
        console.log(`❌ 更新失败 ${filePath}:`, error.message);
        return false;
    }
}

// 根据语言代码获取常量名
function getLanguageConstantName(langCode) {
    const codeMap = {
        'zh': 'ZH',
        'en': 'EN',
        'es': 'ES',
        'fr': 'FR',
        'de': 'DE',
        'ja': 'JA',
        'ko': 'KO',
        'ru': 'RU',
        'ar': 'AR',
        'pt': 'PT'
        // 可以根据需要继续添加
    };

    return codeMap[langCode] || langCode.toUpperCase();
}

// 获取语言代码从文件名
function getLangCodeFromFilename(filename) {
    const match = filename.match(/translation-(\d+)-(\w+)\.js/);
    return match ? match[2] : null;
}

// 批量更新所有翻译文件
function batchUpdateTranslations() {
    const translationsDir = path.join(__dirname, '../src/config/translations');

    try {
        const files = fs.readdirSync(translationsDir);
        let successCount = 0;
        let totalCount = 0;

        files.forEach(file => {
            if (file.startsWith('translation-') && file.endsWith('.js')) {
                const langCode = getLangCodeFromFilename(file);
                if (langCode) {
                    totalCount++;
                    const filePath = path.join(translationsDir, file);
                    if (updateTranslationFile(filePath, langCode)) {
                        successCount++;
                    }
                }
            }
        });

        console.log(`\n📊 批量更新完成: ${successCount}/${totalCount} 个文件更新成功`);

    } catch (error) {
        console.log('❌ 读取翻译目录失败:', error.message);
    }
}

// 运行批量更新
batchUpdateTranslations();
