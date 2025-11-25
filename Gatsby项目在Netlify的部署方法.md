在 Netlify 上部署 Gatsby 项目有几种方式，以下是详细的操作步骤：

## 方法一：通过 Git 仓库自动部署（推荐）

### 1. 准备工作
```bash
# 确保 Gatsby 项目配置正确
# 在项目根目录创建 netlify.toml 配置文件
```

### 2. netlify.toml 配置示例
```toml
[build]
  command = "npm run build"
  publish = "public"

[build.environment]
  NODE_VERSION = "18"

# 重定向配置
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 3. 操作步骤
1. 将代码推送到 GitHub、GitLab 或 Bitbucket
2. 登录 [Netlify](https://netlify.com)
3. 点击 "New site from Git"
4. 选择你的代码仓库
5. 配置构建设置：
    - Build command: `npm run build`
    - Publish directory: `public`
6. 点击 "Deploy site"

## 方法二：使用 Netlify CLI 部署

### 1. 安装 Netlify CLI
```bash
npm install -g netlify-cli
```

### 2. 登录 Netlify
```bash
netlify login
```

### 3. 在项目中初始化
```bash
# 在 Gatsby 项目根目录执行
netlify init
```

### 4. 构建并部署
```bash
# 方式一：直接部署
npm run build
netlify deploy --prod --dir=public

# 方式二：使用 CLI 构建和部署
netlify build
netlify deploy --prod
```

## 方法三：拖拽部署

### 操作步骤
1. 本地构建项目：
```bash
npm run build
```

2. 将生成的 `public` 文件夹直接拖拽到 Netlify 的部署区域

## 环境变量配置

### 在 Netlify 后台设置环境变量
1. 进入 Site settings > Build & deploy > Environment
2. 添加环境变量：
    - `GATSBY_API_URL`: your-api-url
    - `GATSBY_ANALYTICS_ID`: your-tracking-id

### 在 netlify.toml 中配置
```toml
[build]
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"
  GATSBY_API_URL = "your-api-url"
```

## 部署脚本示例

### package.json 配置
```json
{
  "scripts": {
    "build": "gatsby build",
    "deploy": "npm run build && netlify deploy --prod --dir=public"
  }
}
```

## 注意事项

1. **Node.js 版本**：确保 Netlify 使用兼容的 Node.js 版本
2. **缓存配置**：优化构建速度
```toml
[build.environment]
  NODE_VERSION = "18"

[[plugins]]
  package = "@netlify/plugin-gatsby"
```

3. **构建时间**：Netlify 免费版有构建时间限制
4. **文件大小**：注意部署文件大小限制

## 故障排除

### 常见问题解决
```bash
# 清理缓存
netlify unlink
netlify login
netlify init

# 查看部署日志
netlify logs
```

### 检查构建配置
确保 `gatsby-config.js` 中的 `pathPrefix` 配置正确（如果需要）。

推荐使用第一种方法（Git 仓库自动部署），这样可以实现持续集成，每次推送代码到仓库时自动部署。
