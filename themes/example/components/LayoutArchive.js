import React from 'react'
import SmartLink from '@/components/SmartLink'

/**
 * 归档列表
 * @param {*} props
 * @returns 赛博朋克（Cyberpunk）高亮霓虹交错时间轴
 */
export const LayoutArchive = props => {
  const { archivePosts } = props
  if (!archivePosts) return null
  const archiveGroups = Object.keys(archivePosts)

  return (
    <div className='relative w-full min-h-screen py-10 px-4 overflow-hidden'>
      {/* 独立注入流光动效 Keyframes */}
      <style>{`
        @keyframes cyberStreamer {
          0% { top: -150px; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-cyber-streamer {
          animation: cyberStreamer 12s linear infinite;
        }
      `}</style>

      {/* 贯穿垂直方向的赛博朋克发光氖管中轴线 */}
      <div className='absolute left-[4px] md:left-1/2 top-4 bottom-4 w-[2px] md:w-[3px] bg-gradient-to-b from-cyan-400/20 via-fuchsia-500/20 to-cyan-400/20 transform md:-translate-x-1/2 z-0 shadow-[0_0_15px_rgba(34,211,238,0.2)] overflow-hidden'>
         {/* 高亮流光束 */}
         <div className="absolute left-0 w-full h-[150px] bg-gradient-to-b from-transparent via-cyan-200 to-cyan-400 animate-cyber-streamer shadow-[0_0_20px_2px_rgba(34,211,238,0.9)]"></div>
         <div className="absolute left-0 w-full h-[150px] bg-gradient-to-b from-transparent via-fuchsia-200 to-fuchsia-500 animate-cyber-streamer shadow-[0_0_20px_2px_rgba(217,70,239,0.9)]" style={{ animationDelay: '6s' }}></div>
      </div>

      <div className='flex flex-col space-y-12 mt-8 max-w-5xl mx-auto relative z-10'>
        {archiveGroups.map((archiveTitle, index) => {
          const isLeft = index % 2 === 0
          
          // 模4算法赛博朋克涂装方案
          const mod = index % 4
          const isSolid = mod === 1 || mod === 2

          let cardStyle = "", dotStyle = "", titleStyle = "", textStyle = "", itemStyle = ""
          
          if (mod === 0) { // 左，空心镭射 Cyan
            cardStyle = "bg-[#050b14]/20 backdrop-blur-md border border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.5),inset_0_0_15px_rgba(34,211,238,0.3)]"
            dotStyle = "bg-[#0b1021] border-cyan-400 shadow-[0_0_25px_rgba(34,211,238,1)]"
            titleStyle = "font-orbitron text-cyan-400 font-extrabold drop-shadow-[0_0_10px_rgba(34,211,238,0.9)]"
            textStyle = "text-cyan-200"
            itemStyle = "border-cyan-500/40 bg-cyan-950/30 hover:bg-cyan-400 hover:text-[#050b14] hover:border-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.8)]"
          } else if (mod === 1) { // 右，实心高爆 Pink
            cardStyle = "bg-fuchsia-600/20 backdrop-blur-sm border border-fuchsia-300 shadow-[0_0_35px_rgba(217,70,239,0.6)]"
            dotStyle = "bg-white border-fuchsia-500 shadow-[0_0_25px_rgba(217,70,239,1),0_0_50px_rgba(217,70,239,0.8)]"
            titleStyle = "font-orbitron text-white font-extrabold drop-shadow-[0_0_12px_rgba(255,255,255,1)]"
            textStyle = "text-white"
            itemStyle = "border-white/30 bg-white/10 hover:bg-white hover:text-fuchsia-700 hover:shadow-[0_0_20px_rgba(255,255,255,0.9)]"
          } else if (mod === 2) { // 左，实心高爆 Cyan
            cardStyle = "bg-cyan-600/20 backdrop-blur-sm border border-cyan-300 shadow-[0_0_35px_rgba(34,211,238,0.6)]"
            dotStyle = "bg-white border-cyan-400 shadow-[0_0_25px_rgba(34,211,238,1),0_0_50px_rgba(34,211,238,0.8)]"
            titleStyle = "font-orbitron text-white font-extrabold drop-shadow-[0_0_12px_rgba(255,255,255,1)]"
            textStyle = "text-white"
            itemStyle = "border-white/30 bg-white/10 hover:bg-white hover:text-cyan-800 hover:shadow-[0_0_20px_rgba(255,255,255,0.9)]"
          } else if (mod === 3) { // 右，空心镭射 Pink
            cardStyle = "bg-[#140510]/20 backdrop-blur-md border border-fuchsia-500 shadow-[0_0_20px_rgba(217,70,239,0.5),inset_0_0_15px_rgba(217,70,239,0.3)]"
            dotStyle = "bg-[#180a1c] border-fuchsia-500 shadow-[0_0_25px_rgba(217,70,239,1)]"
            titleStyle = "font-orbitron text-fuchsia-400 font-extrabold drop-shadow-[0_0_10px_rgba(217,70,239,0.9)]"
            textStyle = "text-fuchsia-200"
            itemStyle = "border-fuchsia-500/40 bg-fuchsia-950/30 hover:bg-fuchsia-400 hover:text-[#140510] hover:border-fuchsia-300 hover:shadow-[0_0_20px_rgba(217,70,239,0.8)]"
          }

          const hoverScale = isSolid ? 'hover:scale-[1.04] hover:brightness-125' : 'hover:scale-[1.04] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]'
          const cardClasses = `relative w-full xl:w-[90%] p-6 md:p-8 rounded-xl shadow-2xl transition-all duration-300 block ${cardStyle} ${hoverScale}`

          return (
            <div key={archiveTitle} className='relative flex flex-col md:flex-row items-center w-full mb-8 group'>
              
               {/* 左侧区域分配 */}
               {isLeft ? (
                 <>
                   <div className='w-full md:w-[50%] pl-8 md:pl-0 md:pr-12 flex md:justify-end'>
                     <div className={cardClasses}>
                       <div className='flex items-center justify-between mb-4 border-b border-gray-400/30 pb-2'>
                         <h2 className={`text-2xl tracking-widest ${titleStyle}`}>
                           {archiveTitle}
                         </h2>
                       </div>
                       <ul className='flex flex-col gap-3 mt-6'>
                         {archivePosts[archiveTitle].map(post => (
                           <li key={post.id} className='w-full'>
                             <SmartLink 
                               href={post?.href} 
                               className={`flex justify-between items-center px-4 py-3 text-sm font-tech-mono tracking-wide rounded-md border backdrop-blur-sm transition-all duration-300 ${textStyle} ${itemStyle}`}
                             >
                               <span className='truncate flex-1 drop-shadow-md'>{post.title}</span><i className="fas fa-angle-right opacity-50 ml-2"></i>
                             </SmartLink>
                           </li>
                         ))}
                       </ul>
                     </div>
                   </div>
                   <div className="hidden md:block w-[50%]"></div>
                 </>
               ) : (
                 <>
                   <div className="hidden md:block w-[50%]"></div>
                   <div className='w-full md:w-[50%] pl-8 md:pl-12 flex md:justify-start mt-6 md:mt-0'>
                     <div className={cardClasses}>
                       <div className='flex items-center justify-between mb-4 border-b border-gray-400/30 pb-2'>
                         <h2 className={`text-2xl tracking-widest ${titleStyle}`}>
                           {archiveTitle}
                         </h2>
                       </div>
                       <ul className='flex flex-col gap-3 mt-6'>
                         {archivePosts[archiveTitle].map(post => (
                           <li key={post.id} className='w-full'>
                             <SmartLink 
                               href={post?.href} 
                               className={`flex justify-between items-center px-4 py-3 text-sm font-tech-mono tracking-wide rounded-md border backdrop-blur-sm transition-all duration-300 ${textStyle} ${itemStyle}`}
                             >
                               <span className='truncate flex-1 drop-shadow-md'>{post.title}</span><i className="fas fa-angle-right opacity-50 ml-2"></i>
                             </SmartLink>
                           </li>
                         ))}
                       </ul>
                     </div>
                   </div>
                 </>
               )}

              {/* 中轴发光锚点定位 */}
              <div className={`absolute left-[-2px] md:left-1/2 transform md:-translate-x-1/2 top-8 md:top-1/2 md:-translate-y-1/2 w-4 h-4 md:w-5 md:h-5 rounded-full border-[3px] md:border-4 z-20 transition-all duration-300 group-hover:scale-150 ${dotStyle}`}></div>

            </div>
          )
        })}
      </div>
    </div>
  )
}
