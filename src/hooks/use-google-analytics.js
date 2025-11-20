import { useEffect } from 'react'
import { useLocation } from '@reach/router'

export const useGoogleAnalytics = () => {
    const location = useLocation()

    useEffect(() => {
        if (typeof window === 'undefined' || !window.gtag) {
            return
        }
        // 确保在浏览器环境中
        // if (typeof window === 'undefined' || !window.gtag) {
        //     return
        // }
        //
        // // 跟踪页面浏览
        // window.gtag('config', process.env.GA_TRACKING_ID, {
        //     page_title: document.title,
        //     page_location: window.location.href,
        // })
    }, [location])
}

// 自定义事件跟踪
export const trackEvent = ({ action, category, label, value }) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
        })
    }
}

// 特定的跟踪函数
export const trackPageView = (pageTitle) => {
    trackEvent({
        action: 'page_view',
        category: 'Engagement',
        label: pageTitle,
    })
}

export const trackButtonClick = (buttonName) => {
    trackEvent({
        action: 'click',
        category: 'Button',
        label: buttonName,
    })
}

export const trackFormSubmission = (formName) => {
    trackEvent({
        action: 'form_submit',
        category: 'Form',
        label: formName,
    })
}

export const trackPaymentStart = (productName, amount) => {
    trackEvent({
        action: 'payment_start',
        category: 'Ecommerce',
        label: productName,
        value: amount,
    })
}

export const trackPaymentComplete = (productName, amount) => {
    trackEvent({
        action: 'payment_complete',
        category: 'Ecommerce',
        label: productName,
        value: amount,
    })
}
