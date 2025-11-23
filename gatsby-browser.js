// gatsby-browser.js
import React from 'react'
import { WalletProvider } from './src/contexts/wallet-context'
import "./src/normalize.css"
import "./src/styles/global.css"
import "prismjs/themes/prism-tomorrow.css"



export const wrapRootElement = ({ element }) => {
    return (
        <WalletProvider>
            {element}
        </WalletProvider>
    )
}
