// src/components/payment-flow.js
import React, { useState } from 'react'
import { useTranslation } from '../hooks/use-translation'

const PaymentFlow = ({ product, service, amount }) => {
    const { t } = useTranslation()
    const [currentStep, setCurrentStep] = useState(1)
    const [orderData, setOrderData] = useState(null)
    const [paymentData, setPaymentData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    // 模拟用户钱包地址
    const userWalletAddress = '7x5XJ6W8kL9Mn0Op1Qr2St3Uv4Wx5Yz6Ab7Cd8Ef9Gh'

    // 1. 创建订单
    const createOrder = async () => {
        setLoading(true)
        setError('')

        try {
            const response = await fetch('http://localhost:3000/api/orders/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: amount || (product ? product.price : service.price),
                    currency: 'USDT',
                    productId: product?.id,
                    serviceId: service?.id
                })
            })

            const result = await response.json()

            if (result.success) {
                setOrderData(result.data)
                setCurrentStep(2)
            } else {
                setError(result.error || '创建订单失败')
            }
        } catch (err) {
            setError('网络错误，请稍后重试')
        } finally {
            setLoading(false)
        }
    }

    // 2. 模拟签名
    const simulateSignature = async () => {
        setLoading(true)
        setError('')

        try {
            const response = await fetch('http://localhost:3000/api/payments/simulate-sign', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    orderId: orderData.order.orderId,
                    userAddress: userWalletAddress
                })
            })

            const result = await response.json()

            if (result.success) {
                setPaymentData(result.data)
                setCurrentStep(3)
            } else {
                setError(result.error || '签名失败')
            }
        } catch (err) {
            setError('网络错误，请稍后重试')
        } finally {
            setLoading(false)
        }
    }

    // 3. 模拟USDT转账
    const simulateTransfer = async () => {
        setLoading(true)
        setError('')

        try {
            const response = await fetch('http://localhost:3000/api/payments/simulate-transfer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    paymentId: paymentData.paymentId,
                    userAddress: userWalletAddress,
                    amount: orderData.order.amount
                })
            })

            const result = await response.json()

            if (result.success) {
                setPaymentData(prev => ({ ...prev, ...result.data }))
                setCurrentStep(4)
                // 自动验证支付
                verifyPayment()
            } else {
                setError(result.error || '转账失败')
            }
        } catch (err) {
            setError('网络错误，请稍后重试')
        } finally {
            setLoading(false)
        }
    }

    // 4. 验证支付
    const verifyPayment = async () => {
        setLoading(true)

        try {
            const response = await fetch('http://localhost:3000/api/payments/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    orderId: orderData.order.orderId
                })
            })

            const result = await response.json()

            if (result.success) {
                setPaymentData(prev => ({
                    ...prev,
                    verification: result.data.verification
                }))
                setCurrentStep(5)
            }
        } catch (err) {
            console.error('验证失败:', err)
        } finally {
            setLoading(false)
        }
    }

    // 重置流程
    const resetFlow = () => {
        setCurrentStep(1)
        setOrderData(null)
        setPaymentData(null)
        setError('')
    }

    return (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
            {/* 步骤指示器 */}
            <div className="flex justify-between mb-8">
                {[1, 2, 3, 4, 5].map(step => (
                    <div key={step} className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            step === currentStep
                                ? 'bg-indigo-600 text-white'
                                : step < currentStep
                                    ? 'bg-green-500 text-white'
                                    : 'bg-gray-200 text-gray-600'
                        }`}>
                            {step}
                        </div>
                        <div className="text-xs mt-1 text-gray-600">
                            {step === 1 && '创建订单'}
                            {step === 2 && '数字签名'}
                            {step === 3 && 'USDT支付'}
                            {step === 4 && '验证支付'}
                            {step === 5 && '完成'}
                        </div>
                    </div>
                ))}
            </div>

            {/* 错误显示 */}
            {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}

            {/* 步骤内容 */}
            <div className="mb-6">
                {/* 步骤1: 创建订单 */}
                {currentStep === 1 && (
                    <div className="text-center">
                        <h3 className="text-lg font-semibold mb-4">创建支付订单</h3>
                        <div className="bg-gray-50 p-4 rounded mb-4">
                            <p><strong>商品:</strong> {product?.title || service?.title}</p>
                            <p><strong>金额:</strong> ¥{amount || (product ? product.price : service.price)}</p>
                            <p><strong>支付方式:</strong> USDT (Solana)</p>
                        </div>
                        <button
                            onClick={createOrder}
                            disabled={loading}
                            className="btn-primary w-full"
                        >
                            {loading ? '创建中...' : '创建订单'}
                        </button>
                    </div>
                )}

                {/* 步骤2: 数字签名 */}
                {currentStep === 2 && orderData && (
                    <div className="text-center">
                        <h3 className="text-lg font-semibold mb-4">数字签名验证</h3>
                        <div className="bg-yellow-50 p-4 rounded mb-4 text-left">
                            <p className="text-sm break-all">
                                <strong>订单摘要:</strong> {orderData.digest}
                            </p>
                            <p className="text-sm mt-2">
                                <strong>订单ID:</strong> {orderData.order.orderId}
                            </p>
                        </div>
                        <button
                            onClick={simulateSignature}
                            disabled={loading}
                            className="btn-primary w-full"
                        >
                            {loading ? '签名中...' : '确认签名'}
                        </button>
                    </div>
                )}

                {/* 步骤3: USDT支付 */}
                {currentStep === 3 && paymentData && (
                    <div className="text-center">
                        <h3 className="text-lg font-semibold mb-4">USDT支付</h3>
                        <div className="bg-blue-50 p-4 rounded mb-4">
                            <p><strong>支付ID:</strong> {paymentData.paymentId}</p>
                            <p><strong>金额:</strong> {orderData.order.amount} USDT</p>
                            <p><strong>收款地址:</strong> {orderData.order.merchantAddress}</p>
                        </div>
                        <button
                            onClick={simulateTransfer}
                            disabled={loading}
                            className="btn-primary w-full"
                        >
                            {loading ? '支付中...' : '确认支付'}
                        </button>
                    </div>
                )}

                {/* 步骤4: 验证支付 */}
                {currentStep === 4 && (
                    <div className="text-center">
                        <h3 className="text-lg font-semibold mb-4">验证支付</h3>
                        <div className="animate-pulse">
                            <p>正在验证区块链交易...</p>
                        </div>
                    </div>
                )}

                {/* 步骤5: 完成 */}
                {currentStep === 5 && paymentData?.verification && (
                    <div className="text-center">
                        <div className="text-green-500 text-6xl mb-4">✓</div>
                        <h3 className="text-lg font-semibold mb-2">支付成功!</h3>
                        <div className="bg-green-50 p-4 rounded mb-4">
                            <p><strong>交易哈希:</strong> {paymentData.transactionHash}</p>
                            <p><strong>订单状态:</strong> 已完成</p>
                            <p><strong>验证结果:</strong> 签名有效，金额匹配</p>
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={resetFlow}
                                className="btn-secondary flex-1"
                            >
                                新的支付
                            </button>
                            <button className="btn-primary flex-1">
                                查看订单
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* 调试信息 (开发环境) */}
            {process.env.NODE_ENV === 'development' && (
                <div className="mt-4 p-3 bg-gray-100 rounded text-xs">
                    <strong>调试信息:</strong>
                    <div>当前步骤: {currentStep}</div>
                    <div>订单ID: {orderData?.order?.orderId}</div>
                    <div>支付ID: {paymentData?.paymentId}</div>
                </div>
            )}
        </div>
    )
}

export default PaymentFlow
