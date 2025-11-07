// src/pages/test.js
import React from "react"

const TestPage = () => {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-red-500 bg-blue-100 p-4">测试 Tailwind CSS</h1>
            <p className="text-lg text-gray-700 mt-4">如果这个文本是灰色，背景是蓝色，标题是红色加粗，说明 Tailwind 工作正常。</p>
            <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                测试按钮
            </button>
        </div>
    )
}

export default TestPage
