// src/components/simple-payment-flow.js
import React, { useState, useEffect, useCallback } from 'react';
import { useWallet } from '../contexts/wallet-context';
import { createTransferTransaction, checkTokenBalance } from '../utils/solana-payment';
import { trackPaymentStart, trackPaymentComplete, trackButtonClick } from '../hooks/use-google-analytics'
const SimplePaymentFlow = ({ product, onPaymentSuccess }) => {
    const { publicKey, connected, connectWallet, sendTransaction } = useWallet();

    const [currentStep, setCurrentStep] = useState(1);
    const [orderData, setOrderData] = useState(null);
    const [paymentData, setPaymentData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [tokenBalance, setTokenBalance] = useState(0);

    // 使用 useCallback 包装检查余额函数
    const checkTokenBalanceCustom = useCallback(async () => {
        if (connected && publicKey && orderData) {
            try {
                // 使用订单中的代币地址检查余额
                const balance = await checkTokenBalance(publicKey, orderData.order.tokenMintAddress);
                setTokenBalance(balance);
            } catch (error) {
                console.error('检查余额失败:', error);
            }
        }
    }, [connected, publicKey, orderData]);

    // 检查代币余额
    useEffect(() => {
        if (orderData) {
            checkTokenBalanceCustom();
        }
    }, [checkTokenBalanceCustom, orderData]);

    // 1. 创建订单
    const createOrder = async () => {
        trackPaymentStart(product.title)
        trackButtonClick('payment_start-创建订单')

        if (!connected) {
            const success = await connectWallet();
            if (!success) return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:3000/api/orders/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productId: product.id,
                    userAddress: publicKey
                })
            });

            const result = await response.json();

            if (result.success) {
                setOrderData(result.data);
                setCurrentStep(2);
            } else {
                setError(result.error || '创建订单失败');
            }
        } catch (err) {
            setError('网络错误，请稍后重试');
        } finally {
            setLoading(false);
        }
    };

    // 2. 执行支付
// 在 simple-payment-flow.js 中修改 executePayment 函数

// 2. 执行支付
    const executePayment = async () => {
        setLoading(true);
        setError('');
        trackPaymentStart(product.title)
        trackButtonClick('payment_start')
        try {
            // 检查余额是否足够
            if (tokenBalance < orderData.order.amount) {
                setError(`${orderData.order.currency}余额不足，当前余额: ${tokenBalance} ${orderData.order.currency}，需要: ${orderData.order.amount} ${orderData.order.currency}`);
                setLoading(false);
                return;
            }

            // 创建转账交易（包含支付摘要）
            const transaction = await createTransferTransaction(
                publicKey, // 确保使用当前连接的地址
                orderData.order.merchantAddress,
                orderData.order.amount,
                orderData.order.tokenMintAddress,
                orderData.paymentDigest, // 支付摘要
                9
            );

            console.log('发送支付交易:', {
                from: publicKey,
                to: orderData.order.merchantAddress,
                amount: orderData.order.amount,
                digest: orderData.paymentDigest
            });

            // 发送交易
            const signature = await sendTransaction(transaction);

            if (!signature) {
                throw new Error('交易发送失败，未返回签名');
            }

            console.log('支付交易已发送，等待确认:', signature);

            // 等待一段时间让交易被确认
            await new Promise(resolve => setTimeout(resolve, 3000));

            // 验证支付 - 添加重试机制
            let verifyResult;
            let retries = 0;
            const maxRetries = 10;

            while (retries < maxRetries) {
                const verifyResponse = await fetch('http://localhost:3000/api/payments/verify', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        orderId: orderData.order.orderId,
                        transactionSignature: signature,
                        userAddress: publicKey // 确保传递当前支付地址
                    })
                });

                verifyResult = await verifyResponse.json();

                if (verifyResult.success) {
                    break;
                }

                // 如果是因为交易未确认，等待后重试
                if (verifyResult.error && verifyResult.error.includes('未确认')) {
                    retries++;
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    continue;
                }

                // 其他错误直接抛出
                throw new Error(verifyResult.error);
            }

            if (!verifyResult.success) {
                throw new Error('支付验证失败: ' + verifyResult.error);
            }

            setPaymentData(verifyResult.data);
            setCurrentStep(3);

            // 获取商品访问权限
            await grantProductAccess(verifyResult.data.orderId, verifyResult.data.accessToken);

            // 触发支付成功回调
            if (onPaymentSuccess) {
                onPaymentSuccess(verifyResult.data);
            }

        } catch (err) {
            console.error('支付失败:', err);
            setError('支付失败: ' + (err.message || '未知错误'));
        } finally {
            setLoading(false);
        }
    };

    // 3. 获取商品访问权限
    const grantProductAccess = async (orderId, accessToken) => {
        trackPaymentComplete(product.title)

        try {
            const response = await fetch('http://localhost:3000/api/products/access', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    orderId,
                    accessToken
                })
            });

            const result = await response.json();

            if (result.success) {
                setPaymentData(prev => ({ ...prev, accessInfo: result.data.accessInfo }));
                setCurrentStep(4);
            } else {
                console.error('获取商品访问权限失败:', result.error);
            }
        } catch (err) {
            console.error('获取商品访问权限失败:', err);
        }
    };

    // 重置流程
    const resetFlow = () => {
        setCurrentStep(1);
        setOrderData(null);
        setPaymentData(null);
        setError('');
    };

    // 格式化时间
    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleString();
    };

    return (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
            {/* 钱包连接状态 */}
            <div className="mb-6">
                {!connected ? (
                    <div className="text-center">
                        <p className="text-sm text-gray-600 mb-4">请先连接Phantom钱包</p>
                        <button
                            onClick={connectWallet}
                            className="btn-primary w-full"
                        >
                            连接Phantom钱包
                        </button>
                    </div>
                ) : (
                    <div className="bg-green-50 p-3 rounded">
                        <p className="text-sm text-green-700 mb-1">
                            已连接: {publicKey.slice(0, 8)}...{publicKey.slice(-8)}
                        </p>
                        <p className="text-sm text-green-700">
                            {orderData?.order?.currency || 'MY_TOKEN'}余额: {tokenBalance}
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
                            {step === 2 && '确认支付'}
                            {step === 3 && '处理中'}
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
                        <div className="bg-gray-50 p-4 rounded mb-4 text-left">
                            <p><strong>商品:</strong> {product.title}</p>
                            <p><strong>描述:</strong> {product.description}</p>
                            <p><strong>金额:</strong> {product.price} {product.currency}</p>
                            <p><strong>支付方式:</strong> Solana {product.currency}</p>
                        </div>
                        <button
                            onClick={createOrder}
                            disabled={loading || !connected}
                            className="btn-primary w-full disabled:opacity-50"
                        >
                            {loading ? '创建中...' : '创建订单'}
                        </button>
                    </div>
                )}

                {/* 步骤2: 确认支付 */}
                {currentStep === 2 && orderData && (
                    <div className="text-center">
                        <h3 className="text-lg font-semibold mb-4">确认支付</h3>
                        <div className="bg-yellow-50 p-4 rounded mb-4 text-left">
                            <p><strong>订单ID:</strong> {orderData.order.orderId}</p>
                            <p><strong>金额:</strong> {orderData.order.amount} {orderData.order.currency}</p>
                            <p><strong>收款地址:</strong> {orderData.order.merchantAddress}</p>
                            <p className="text-xs break-all mt-2">
                                <strong>支付摘要:</strong> {orderData.paymentDigest}
                            </p>
                            <p className="text-xs text-gray-600 mt-2">
                                订单将在 {formatTime(orderData.order.expiresAt)} 过期
                            </p>
                        </div>
                        <button
                            onClick={executePayment}
                            disabled={loading}
                            className="btn-primary w-full"
                        >
                            {loading ? '支付中...' : `支付 ${orderData.order.amount} ${orderData.order.currency}`}
                        </button>
                    </div>
                )}

                {/* 步骤3: 支付处理 */}
                {currentStep === 3 && (
                    <div className="text-center">
                        <h3 className="text-lg font-semibold mb-4">处理支付</h3>
                        <div className="animate-pulse text-blue-600">
                            <p>正在确认区块链交易...</p>
                            <p className="text-sm mt-2">这可能需要几秒钟时间</p>
                        </div>
                    </div>
                )}

                {/* 步骤4: 完成 */}
                {currentStep === 4 && paymentData && (
                    <div className="text-center">
                        <div className="text-green-500 text-6xl mb-4">✓</div>
                        <h3 className="text-lg font-semibold mb-2">支付成功!</h3>

                        <div className="bg-green-50 p-4 rounded mb-4 text-left">
                            <p><strong>订单ID:</strong> {paymentData.orderId}</p>
                            <p><strong>交易哈希:</strong> {paymentData.transactionSignature}</p>
                            <p><strong>支付时间:</strong> {formatTime(paymentData.paidAt)}</p>

                            {paymentData.accessInfo && (
                                <div className="mt-3 p-3 bg-white rounded border">
                                    <h4 className="font-semibold mb-2">商品访问信息:</h4>
                                    <p><strong>访问码:</strong> {paymentData.accessInfo.accessCode}</p>
                                    <p><strong>下载链接:</strong>
                                        <a href={paymentData.accessInfo.downloadLink} className="text-blue-600 underline ml-2">
                                            点击下载
                                        </a>
                                    </p>
                                    <p className="text-xs text-gray-600 mt-2">
                                        有效期至: {formatTime(paymentData.accessInfo.validUntil)}
                                    </p>
                                </div>
                            )}
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
                    <div>钱包连接: {connected ? '已连接' : '未连接'}</div>
                    <div>订单ID: {orderData?.order?.orderId}</div>
                    <div>代币地址: {orderData?.order?.tokenMintAddress}</div>
                </div>
            )}
        </div>
    );
};

export default SimplePaymentFlow;
