import React from 'react'

export default function GlobalBackground() {
  return (
    <div className="example-fluid-bg pointer-events-none bg-transparent">
      {/* 沉浸式全局视频背景，覆盖满屏、自动循环静音播放。已去掉人为由于加深对比度而施加的暗黑透明度和半透明黑色遮罩，恢复最高亮度 */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0 pointer-events-none opacity-100"
        src="/cool.mp4"
      />
    </div>
  )
}
