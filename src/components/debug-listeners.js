// src/components/debug-listeners.js
import React, { useEffect, useRef } from 'react'

const DebugListeners = () => {
    const originalEmitRef = useRef(null)
    const originalOnRef = useRef(null)

    useEffect(() => {
        if (process.env.NODE_ENV === 'development') {
            const EventEmitter = require('events').EventEmitter

            // 保存原始方法
            originalEmitRef.current = EventEmitter.prototype.emit
            originalOnRef.current = EventEmitter.prototype.on

            let warningShown = false

            // 重写 emit 方法来监控监听器数量
            EventEmitter.prototype.emit = function(...args) {
                const eventName = args[0]
                const listenerCount = this.listenerCount ? this.listenerCount(eventName) : 0

                if (listenerCount > 15 && !warningShown) {
                    console.warn(`⚠️ 事件 "${eventName}" 有 ${listenerCount} 个监听器，可能存在内存泄漏`)
                    console.trace('监听器堆栈跟踪:')
                    warningShown = true

                    // 10秒后重置警告
                    setTimeout(() => {
                        warningShown = false
                    }, 10000)
                }

                return originalEmitRef.current.apply(this, args)
            }

            // 重写 on 方法来跟踪监听器添加
            EventEmitter.prototype.on = function(eventName, listener) {
                const result = originalOnRef.current.call(this, eventName, listener)

                const listenerCount = this.listenerCount ? this.listenerCount(eventName) : 0
                if (listenerCount > 10) {
                    console.log(`📢 事件 "${eventName}" 监听器数量: ${listenerCount}`)
                }

                return result
            }

            console.log('🔧 监听器调试模式已启用')

            // 清理函数
            return () => {
                if (originalEmitRef.current) {
                    EventEmitter.prototype.emit = originalEmitRef.current
                }
                if (originalOnRef.current) {
                    EventEmitter.prototype.on = originalOnRef.current
                }
                console.log('🔧 监听器调试模式已禁用')
            }
        }
    }, [])

    // 定期报告监听器状态
    useEffect(() => {
        if (process.env.NODE_ENV === 'development') {
            const interval = setInterval(() => {
                if (typeof window !== 'undefined' && window.solana) {
                    const connectCount = window.solana.listenerCount ? window.solana.listenerCount('connect') : 0
                    const disconnectCount = window.solana.listenerCount ? window.solana.listenerCount('disconnect') : 0

                    if (connectCount > 5 || disconnectCount > 5) {
                        console.log(`🔄 Phantom 钱包监听器 - connect: ${connectCount}, disconnect: ${disconnectCount}`)
                    }
                }
            }, 30000) // 每30秒检查一次

            return () => clearInterval(interval)
        }
    }, [])

    return null
}

export default DebugListeners
