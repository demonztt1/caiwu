// gatsby-browser.js
import React from 'react'
import { Buffer } from 'buffer'
import { WalletProvider } from './src/contexts/wallet-context'
import "./src/normalize.css"
import "./src/styles/global.css"
import "prismjs/themes/prism-tomorrow.css"

// 在浏览器环境中提供全局 Buffer
if (typeof window !== 'undefined') {
    window.Buffer = Buffer
}

export const wrapRootElement = ({ element }) => {
    return (
        <WalletProvider>
            {element}
        </WalletProvider>
    )
}
