import React, { useState } from 'react'
import Link from 'next/link'

const FloatingActionNavigation = (props) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  // 定义4个功能菜单项目
  const buttons = [
    { name: '关于', icon: 'fas fa-user', path: '/about' },
    { name: '文章', icon: 'fas fa-archive', path: '/archive' },
    { name: '书架', icon: 'fas fa-book', path: '/category' },
    { name: '联系', icon: 'fas fa-envelope', path: '/contact' }
  ]

  return (
    <div className="fixed bottom-10 right-10 z-[60] flex flex-col items-center">
      {buttons.map((btn, index) => {
        // 利用索引计算自下而上距离
        const distance = (buttons.length - index) * 64
        
        return (
          <div 
             key={index} 
             title={btn.name}
             style={{ 
               transform: isOpen ? `translateY(-${distance}px)` : 'translateY(10px)',
               opacity: isOpen ? 1 : 0,
               pointerEvents: isOpen ? 'auto' : 'none',
               transitionDelay: isOpen ? `${(buttons.length - index) * 40}ms` : '0ms',
             }}
             className="absolute bottom-1 right-1 transition-all duration-300 ease-out"
          >
            <Link href={btn.path}>
              <div className="flex items-center justify-center w-12 h-12 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-full shadow-lg hover:scale-110 hover:bg-blue-500 hover:text-white transition-all cursor-pointer">
                <i className={btn.icon}></i>
              </div>
            </Link>
          </div>
        )
      })}

      {/* 主悬浮控制按钮 */}
      <div 
        onClick={toggleOpen}
        className={`w-14 h-14 text-white rounded-full flex items-center justify-center shadow-2xl cursor-pointer hover:scale-105 transition-all duration-300 z-10 ${isOpen ? 'rotate-135 bg-red-500' : 'rotate-0 bg-blue-600'}`}
        style={!isOpen ? { backgroundColor: 'var(--gitbook-primary, #3b82f6)' } : {}}
      >
        <i className={`fas fa-plus text-xl transition-all ${isOpen ? 'transform rotate-45' : ''}`}></i>
      </div>
    </div>
  )
}

export default FloatingActionNavigation
