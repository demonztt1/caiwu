// src/config/api.js
export const API_CONFIG = {
    baseURL: process.env.GATSBY_API_URL || 'http://localhost:3000',
    endpoints: {
        createOrder: '/api/orders/create',
        simulateSign: '/api/payments/simulate-sign',
        simulateTransfer: '/api/payments/simulate-transfer',
        verifyPayment: '/api/payments/verify'
    }
}

// 在 .env.development 和 .env.production 中配置
// GATSBY_API_URL=http://localhost:3000
// GATSBY_API_URL=https://your-production-api.com
