import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const ExampleFloatingMenu = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const toggleOpen = () => setIsOpen(!isOpen)

  // 参考图片中的4个菜单项，对应NotionNext的基础路径
  const buttons = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/#me-section' },
    { name: 'Archive', path: '/#archive-section' },
    { name: 'Category', path: '/#category-section' }
  ]

  return (
    <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-[60] flex flex-col items-center">
      {buttons.map((btn, index) => {
        // 保证5个按钮（4个子按钮+1个主按钮）拥有绝对平均的中心间距
        const gap = 120 // 每个按钮之间的固定中心间距
        let offsetX = 0
        if (index === 0) offsetX = -2 * gap
        if (index === 1) offsetX = -1 * gap
        if (index === 2) offsetX = 1 * gap
        if (index === 3) offsetX = 2 * gap
        // 主按钮相当于坐在 0 的位置上
        
        // Y 轴不偏移
        const offsetY = 0
        
        return (
          <div 
             key={index} 
             title={btn.name}
             style={{ 
               transform: isOpen ? `translate(${offsetX}px, ${offsetY}px)` : 'translate(0px, 15px)',
               opacity: isOpen ? 1 : 0,
               pointerEvents: isOpen ? 'auto' : 'none',
               transitionDelay: isOpen ? `${Math.abs(index - 1.5) * 60}ms` : '0ms',
             }}
             // 使用 top-0，并移除主按钮的 mt-2，以确保和圆圈主体的顶部完美对齐，不受底部文字影响
             className="absolute top-0 transition-all duration-300 ease-out z-[50]"
          >
            <Link 
              href={btn.path}
              onClick={(e) => {
                const isHomePage = router.pathname === '/' || router.asPath.split('?')[0].split('#')[0] === '/'
                
                // 只有当我们在首页时，才需要劫持锚点滚动实现“再次点击返回顶部”的功能
                if (btn.path.startsWith('/#') && isHomePage) {
                  e.preventDefault()
                  const targetHash = btn.path.substring(1)
                  
                  if (window.location.hash === targetHash) {
                    // 点击的正是当前停泊的锚点，充当“关闭/返回”功能
                    router.push('/', undefined, { shallow: true }).then(() => {
                      window.location.hash = '' 
                      window.dispatchEvent(new Event('hashchange'))
                      setIsOpen(false)
                    })
                  } else {
                    // 正常滚动打开
                    router.push(btn.path, undefined, { shallow: true }).then(() => {
                      window.dispatchEvent(new Event('hashchange'))
                      setIsOpen(false)
                    })
                  }
                } else {
                  // 如果我们不在首页（比如在文章内或者终端列表里）
                  // 或者点击的是常规的 / 或 /about 链接
                  // 则千万不要 e.preventDefault()，直接交由 Next.js 自动加载新页面并滑动到该锚点
                  setIsOpen(false)
                }
              }}
            >
              {/* 展开菜单的子按钮：深网赛博风 HUD */}
              <div className="flex flex-col items-center justify-center w-16 h-16 bg-[#050b14]/90 backdrop-blur-md border border-cyan-500/50 text-cyan-300 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.3),inset_0_0_10px_rgba(34,211,238,0.2)] hover:scale-110 hover:bg-[#0a1a2f] hover:border-cyan-400 hover:text-cyan-100 hover:shadow-[0_0_25px_rgba(34,211,238,0.8),inset_0_0_15px_rgba(34,211,238,0.5)] transition-all cursor-pointer whitespace-nowrap text-[10px] sm:text-[11px] tracking-widest font-bold uppercase drop-shadow-[0_0_5px_rgba(34,211,238,0.6)]">
                {btn.name}
              </div>
            </Link>
          </div>
        )
      })}

      {/* Primary Bottom Button (赛博朋克主控枢纽) */}
      <div 
        onClick={toggleOpen}
        className="flex flex-col items-center justify-center cursor-pointer group z-[60]"
      >
        <div className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 border-2 z-10
          ${isOpen 
            ? 'rotate-180 bg-[#050b14] border-fuchsia-500 text-fuchsia-400 shadow-[0_0_25px_rgba(217,70,239,0.7),inset_0_0_15px_rgba(217,70,239,0.3)]' 
            : 'bg-[#050b14]/80 border-cyan-400 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.6),inset_0_0_10px_rgba(34,211,238,0.2)] hover:scale-110 hover:shadow-[0_0_35px_rgba(34,211,238,0.9),inset_0_0_20px_rgba(34,211,238,0.5)]'
          }`}>
          
          {/* 强化版深网呼吸波动大光晕 (Volumetric HUD Pulse) */}
          {!isOpen && (
            <div className="absolute -inset-2 rounded-full border-[3px] border-cyan-300 animate-pulse shadow-[0_0_50px_20px_rgba(34,211,238,0.7)] pointer-events-none blur-[2px]"></div>
          )}
          {isOpen && (
            <div className="absolute -inset-2 rounded-full border-[3px] border-fuchsia-400 animate-pulse shadow-[0_0_60px_25px_rgba(236,72,153,0.8)] pointer-events-none blur-[2px]"></div>
          )}

          {isOpen ? (
            <i className="fas fa-times text-2xl drop-shadow-[0_0_8px_rgba(217,70,239,0.9)] relative z-20"></i>
          ) : (
            <span className="font-mono font-bold text-2xl drop-shadow-[0_0_8px_rgba(34,211,238,0.9)] relative z-20">N</span>
          )}
        </div>
        <span className={`mt-3 text-[10px] font-mono tracking-[0.3em] font-bold transition-all duration-300 ${isOpen ? 'opacity-0 text-fuchsia-500 drop-shadow-[0_0_5px_rgba(217,70,239,0.8)]' : 'opacity-100 text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)] group-hover:drop-shadow-[0_0_10px_rgba(34,211,238,1)]'}`}>
          {isOpen ? 'CLOSE' : 'EXECUTE'}
        </span>
      </div>
    </div>
  )
}

export default ExampleFloatingMenu
