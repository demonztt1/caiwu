// src/contexts/wallet-context.js
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const WalletContext = createContext();

export const useWallet = () => {
    const context = useContext(WalletContext);
    if (!context) {
        throw new Error('useWallet must be used within a WalletProvider');
    }
    return context;
};

export const WalletProvider = ({ children }) => {
    const [publicKey, setPublicKey] = useState(null);
    const [connected, setConnected] = useState(false);
    const [loading, setLoading] = useState(false);

    // 检查 Phantom 钱包是否安装
    const isPhantomInstalled = useCallback(() => {
        return window.solana && window.solana.isPhantom;
    }, []);

    // 获取 Phantom 提供者
    const getProvider = useCallback(() => {
        if (isPhantomInstalled()) {
            return window.solana;
        }
        return null;
    }, [isPhantomInstalled]);

    // 连接钱包
    const connectWallet = async () => {
        setLoading(true);
        try {
            const provider = getProvider();
            if (!provider) {
                alert('请安装 Phantom 钱包');
                return false;
            }

            const response = await provider.connect();
            setPublicKey(response.publicKey.toString());
            setConnected(true);
            return true;
        } catch (error) {
            console.error('连接钱包失败:', error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    // 断开钱包连接
    const disconnectWallet = async () => {
        try {
            const provider = getProvider();
            if (provider) {
                await provider.disconnect();
            }
            setPublicKey(null);
            setConnected(false);
        } catch (error) {
            console.error('断开钱包连接失败:', error);
        }
    };

    // 签名消息
    const signMessage = async (message) => {
        try {
            const provider = getProvider();
            if (!provider) {
                throw new Error('Phantom 钱包未安装');
            }

            const messageBytes = new TextEncoder().encode(message);
            const signedMessage = await provider.signMessage(messageBytes, 'utf8');
            return signedMessage.signature;
        } catch (error) {
            console.error('签名失败:', error);
            throw error;
        }
    };

    // 发送交易
    const sendTransaction = async (transaction) => {
        try {
            const provider = getProvider();
            if (!provider) {
                throw new Error('Phantom 钱包未安装');
            }

            const signature = await provider.signAndSendTransaction(transaction);
            return signature;
        } catch (error) {
            console.error('发送交易失败:', error);
            throw error;
        }
    };

    // 监听钱包连接状态变化
    useEffect(() => {
        const provider = getProvider();
        if (provider) {
            const handleConnect = () => {
                setPublicKey(provider.publicKey.toString());
                setConnected(true);
            };

            const handleDisconnect = () => {
                setPublicKey(null);
                setConnected(false);
            };

            provider.on('connect', handleConnect);
            provider.on('disconnect', handleDisconnect);

            // 检查是否已连接
            if (provider.isConnected) {
                setPublicKey(provider.publicKey.toString());
                setConnected(true);
            }

            return () => {
                if (provider.removeListener) {
                    provider.removeListener('connect', handleConnect);
                    provider.removeListener('disconnect', handleDisconnect);
                }
            };
        }
    }, [getProvider]);

    const value = {
        publicKey,
        connected,
        loading,
        connectWallet,
        disconnectWallet,
        signMessage,
        sendTransaction,
        isPhantomInstalled
    };

    return (
        <WalletContext.Provider value={value}>
            {children}
        </WalletContext.Provider>
    );
};
