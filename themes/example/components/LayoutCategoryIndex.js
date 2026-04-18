import React from 'react'
import SmartLink from '@/components/SmartLink'

/**
 * 伪随机数生成器，规避 Next.js SSR 水合报错 (Hydration Mismatch)
 * 只要传入相同的种子，就会输出同样的 0~1 的随机值
 */
const getPseudoRandom = (seed) => {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

export const LayoutCategoryIndex = props => {
  const { categoryOptions } = props
  
  if (!categoryOptions || categoryOptions.length === 0) return null
  
  const counts = categoryOptions.map(c => c.count)
  const maxCount = Math.max(...counts)
  const minCount = Math.min(...counts)

  const colors = [
    'text-blue-500', 'text-purple-500', 'text-pink-500', 
    'text-green-500', 'text-yellow-500', 'text-red-500', 
    'text-cyan-400', 'text-fuchsia-400', 'text-green-400'
  ]

  // 为了保证雨滴稠密，我们需要将原本的分类列表多复制几次（凑够数十个水滴元素交织坠落）
  const rainDropsMultiplier = Math.max(1, Math.ceil(40 / categoryOptions.length))
  const rainDrops = Array.from({ length: rainDropsMultiplier }).flatMap(() => categoryOptions)

  return (
    <>
      <style>{`
        @keyframes categoryRain {
          0% {
            transform: translateY(-150px);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(105vh);
            opacity: 0;
          }
        }

        .category-rain-drop {
          writing-mode: vertical-rl;
          text-orientation: upright;
          letter-spacing: 0.2rem;
          animation-name: categoryRain;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        /* 鼠标悬浮时：雨滴时间静止，并浮现到最上面高亮发光，方便用户精准点击 */
        .category-rain-drop:hover {
          animation-play-state: paused;
          z-index: 50 !important;
          filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.9));
          transform: scale(1.15);
        }
      `}</style>
      
      {/* 调整高度并隐藏溢出，背景透明交给其外部的父div控制 */}
      <div id='category-list' className='relative w-full h-[80vh] overflow-hidden bg-transparent'>
        {rainDrops.map((category, index) => {
          const ratio = maxCount === minCount ? 0.5 : (category.count - minCount) / (maxCount - minCount)
          // 竖排字体大小不需要太大，维持在 14 到 28 间
          const fontSize = 14 + ratio * 14 
          const colorClass = colors[index % colors.length]
          
          // 利用安全伪随机算法，计算雨滴特定的轨道位置、下落时长和出场延迟
          const leftPos = getPseudoRandom(index) * 92 + 4; 
          const fallDuration = 10 + getPseudoRandom(index + 1000) * 15; 
          const delay = -getPseudoRandom(index + 2000) * 20; 
          
          return (
            <div 
               key={`${category.name}-${index}`}
               className={`category-rain-drop absolute top-0 z-10 cursor-pointer transition-colors duration-300 font-mono ${colorClass}`}
               style={{
                 left: `${leftPos}%`,
                 animationDuration: `${fallDuration}s`,
                 animationDelay: `${delay}s`,
                 fontSize: `${fontSize}px`,
                 opacity: 0.5 + ratio * 0.5
               }}
            >
              {/* 这里套上 Nextjs Link，保留智能预载跳转功能 */}
              <SmartLink href={`/category/${category.name}`} passHref legacyBehavior>
                <div className="flex flex-col items-center group px-4 py-2">
                  <span className="group-hover:text-white transition-colors">{category.name}</span>
                </div>
              </SmartLink>
            </div>
          )
        })}
      </div>
    </>
  )
}
