// src/utils/event-utils.js

/**
 * 安全地添加事件监听器
 */
export const addSafeEventListener = (element, event, handler, options = {}) => {
    if (!element || !handler) return () => {}

    element.addEventListener(event, handler, options)

    // 返回清理函数
    return () => {
        element.removeEventListener(event, handler, options)
    }
}

/**
 * 创建防抖的事件处理器
 */
export const createDebouncedHandler = (handler, delay = 300) => {
    let timeoutId
    return (...args) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => handler(...args), delay)
    }
}

/**
 * 检查事件发射器的监听器状态
 */
export const checkEmitterListeners = (emitter, maxWarn = 10) => {
    if (!emitter || !emitter.eventNames) return

    const events = emitter.eventNames()
    events.forEach(eventName => {
        const count = emitter.listenerCount(eventName)
        if (count > maxWarn) {
            console.warn(`事件 "${String(eventName)}" 有 ${count} 个监听器`)
        }
    })
}
