// src/components/real-payment-flow.js
import React, { useState, useCallback } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { PublicKey, Transaction, SystemProgram , TransactionInstruction } from '@solana/web3.js'
import { useTranslation } from '../hooks/use-translation'
const MEMO_PROGRAM_ID = new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr");
const RealPaymentFlow = ({ product, service, amount }) => {
    const { publicKey, signMessage, sendTransaction } = useWallet()
    const { t } = useTranslation()

    const [currentStep, setCurrentStep] = useState(1)
    const [orderData, setOrderData] = useState(null)
    const [paymentData, setPaymentData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [userSignature, setUserSignature] = useState(null)

    // 1. 创建订单
    const createOrder = async () => {
        if (!publicKey) {
            setError('请先连接钱包')
            return
        }

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
                    userAddress: publicKey.toString(),
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

    // 2. 用户签名（使用Phantom钱包）
    const handleUserSignature = async () => {
        if (!publicKey || !signMessage) {
            setError('钱包不支持消息签名')
            return
        }

        setLoading(true)
        setError('')

        try {
            // 将订单摘要转换为Uint8Array
            const message = new TextEncoder().encode(orderData.digest)

            // 使用Phantom钱包进行签名
            const signature = await signMessage(message)

            // 将签名转换为hex字符串便于传输
            const signatureHex = Buffer.from(signature).toString('hex')
            setUserSignature(signatureHex)

            // 将签名发送到后端验证
            const response = await fetch('http://localhost:3000/api/payments/verify-signature', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    orderId: orderData.order.orderId,
                    signature: signatureHex,
                    userAddress: publicKey.toString(),
                    message: orderData.digest
                })
            })

            const result = await response.json()

            if (result.success) {
                setPaymentData(result.data)
                setCurrentStep(3)
            } else {
                setError('签名验证失败: ' + (result.error || '未知错误'))
            }
        } catch (err) {
            console.error('签名失败:', err)
            setError('用户取消了签名或签名失败')
        } finally {
            setLoading(false)
        }
    }

    // 3. 模拟USDT转账（真实Solana交易）
    // const simulateSolanaTransfer = async () => {
    //     if (!publicKey || !sendTransaction) {
    //         setError('钱包不支持交易')
    //         return
    //     }
    //
    //     setLoading(true)
    //     setError('')
    //
    //     try {
    //         // 创建Solana交易（模拟向商户地址转账）
    //         const transaction = new Transaction()
    //
    //         // 添加转账指令（这里使用SOL转账作为示例，实际应该是USDT）
    //         const transferInstruction = SystemProgram.transfer({
    //             fromPubkey: publicKey,
    //             toPubkey: new PublicKey('MERCHANT_WALLET_ADDRESS_HERE'), // 替换为真实商户地址
    //             lamports: 1000000, // 0.001 SOL
    //         })
    //
    //         transaction.add(transferInstruction)
    //
    //         // 发送交易
    //         const signature = await sendTransaction(transaction, connection)
    //
    //         // 等待交易确认
    //         const confirmation = await connection.confirmTransaction(signature, 'confirmed')
    //
    //         if (confirmation.value.err) {
    //             throw new Error('交易失败')
    //         }
    //
    //         // 更新支付数据
    //         setPaymentData(prev => ({
    //             ...prev,
    //             transactionHash: signature,
    //             status: 'completed'
    //         }))
    //
    //         setCurrentStep(4)
    //
    //         // 通知后端交易完成
    //         await notifyPaymentCompletion(signature)
    //
    //     } catch (err) {
    //         console.error('交易失败:', err)
    //         setError('交易失败: ' + err.message)
    //     } finally {
    //         setLoading(false)
    //     }
    // }

    const simulateSolanaTransfer = async () => {
        if (!publicKey || !sendTransaction) {
            setError("钱包不支持交易");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const transaction = new Transaction();

            // 1. SOL 转账（demo）
            const transferInstruction = SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: new PublicKey(orderData.order.merchantAddress),
                lamports: 1000000, // 0.001 sol
            });

            // 2. Memo：携带摘要 digest
            const memoInstruction = new TransactionInstruction({
                programId: MEMO_PROGRAM_ID,
                keys: [],
                data: Buffer.from(orderData.digest, "utf8"),
            });

            // 添加两条指令
            transaction.add(transferInstruction, memoInstruction);

            // 发送交易
            const signature = await sendTransaction(transaction, connection);

            await connection.confirmTransaction(signature, "confirmed");

            setPaymentData({
                ...paymentData,
                transactionHash: signature,
                status: "completed",
            });

            setCurrentStep(4);

            // 通知后端
            await notifyPaymentCompletion(signature);

        } catch (err) {
            console.error("支付失败:", err);
            setError("支付失败：" + err.message);
        } finally {
            setLoading(false);
        }
    };
    // 通知后端支付完成
    const notifyPaymentCompletion = async (transactionHash) => {
        try {
            const response = await fetch('http://localhost:3000/api/payments/complete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    orderId: orderData.order.orderId,
                    transactionHash,
                    userAddress: publicKey.toString(),
                    signature: userSignature
                })
            })

            const result = await response.json()
            if (!result.success) {
                console.error('支付完成通知失败:', result.error)
            }
        } catch (err) {
            console.error('支付完成通知失败:', err)
        }
    }

    // 重置流程
    const resetFlow = () => {
        setCurrentStep(1)
        setOrderData(null)
        setPaymentData(null)
        setUserSignature(null)
        setError('')
    }

    return (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
            {/* 钱包连接状态 */}
            <div className="mb-6">
                {!publicKey ? (
                    <div className="text-center">
                        <p className="text-sm text-gray-600 mb-4">请先连接Phantom钱包</p>
                        <WalletMultiButton className="wallet-adapter-button-trigger" />
                    </div>
                ) : (
                    <div className="bg-green-50 p-3 rounded text-center">
                        <p className="text-sm text-green-700">
                            已连接: {publicKey.toString().slice(0, 8)}...{publicKey.toString().slice(-8)}
                        </p>
                    </div>
                )}
            </div>

            {/* 步骤指示器 */}
            <div className="flex justify-between mb-8">
                {[1, 2, 3, 4].map(step => (
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
                        <div className="text-xs mt-1 text-gray-600 text-center">
                            {step === 1 && '创建订单'}
                            {step === 2 && '钱包签名'}
                            {step === 3 && '链上支付'}
                            {step === 4 && '完成'}
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
                            <p><strong>支付方式:</strong> Solana USDT</p>
                        </div>
                        <button
                            onClick={createOrder}
                            disabled={loading || !publicKey}
                            className="btn-primary w-full disabled:opacity-50"
                        >
                            {loading ? '创建中...' : '创建订单'}
                        </button>
                    </div>
                )}

                {/* 步骤2: 钱包签名 */}
                {currentStep === 2 && orderData && (
                    <div className="text-center">
                        <h3 className="text-lg font-semibold mb-4">钱包签名验证</h3>
                        <div className="bg-yellow-50 p-4 rounded mb-4 text-left">
                            <p className="text-sm break-all mb-2">
                                <strong>订单摘要:</strong>
                                <br />
                                {orderData.digest}
                            </p>
                            <p className="text-sm">
                                <strong>请在弹出的Phantom窗口中确认签名</strong>
                            </p>
                        </div>
                        <button
                            onClick={handleUserSignature}
                            disabled={loading}
                            className="btn-primary w-full"
                        >
                            {loading ? '等待签名...' : '确认签名'}
                        </button>
                    </div>
                )}

                {/* 步骤3: 链上支付 */}
                {currentStep === 3 && paymentData && (
                    <div className="text-center">
                        <h3 className="text-lg font-semibold mb-4">Solana链上支付</h3>
                        <div className="bg-blue-50 p-4 rounded mb-4">
                            <p><strong>订单ID:</strong> {orderData.order.orderId}</p>
                            <p><strong>金额:</strong> {orderData.order.amount} USDT</p>
                            <p><strong>请确认Phantom钱包中的交易</strong></p>
                        </div>
                        <button
                            onClick={simulateSolanaTransfer}
                            disabled={loading}
                            className="btn-primary w-full"
                        >
                            {loading ? '处理中...' : '确认支付'}
                        </button>
                    </div>
                )}

                {/* 步骤4: 完成 */}
                {currentStep === 4 && paymentData?.transactionHash && (
                    <div className="text-center">
                        <div className="text-green-500 text-6xl mb-4">✓</div>
                        <h3 className="text-lg font-semibold mb-2">支付成功!</h3>
                        <div className="bg-green-50 p-4 rounded mb-4">
                            <p className="break-all text-sm">
                                <strong>交易哈希:</strong>
                                <br />
                                {paymentData.transactionHash}
                            </p>
                            <p><strong>状态:</strong> 区块链已确认</p>
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

            {/* 调试信息 */}
            {process.env.NODE_ENV === 'development' && (
                <div className="mt-4 p-3 bg-gray-100 rounded text-xs">
                    <strong>调试信息:</strong>
                    <div>当前步骤: {currentStep}</div>
                    <div>钱包连接: {publicKey ? '已连接' : '未连接'}</div>
                    <div>订单ID: {orderData?.order?.orderId}</div>
                    {userSignature && (
                        <div>签名: {userSignature.slice(0, 20)}...</div>
                    )}
                </div>
            )}
        </div>
    )
}

export default RealPaymentFlow
