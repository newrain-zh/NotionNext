import React, { useState, useEffect } from 'react'
import { LayoutArchive } from './LayoutArchive'
import { LayoutCategoryIndex } from './LayoutCategoryIndex'
import { useRouter } from 'next/router'
import { siteConfig } from '@/lib/config'
import CONFIG from '../config'

export default function AnimatedExampleHome(props) {
  const router = useRouter()
  const [activeSubPage, setActiveSubPage] = useState('home')

  // 赛博朋克启动动画状态
  const [isBooting, setIsBooting] = useState(false)
  const [bootLog, setBootLog] = useState([])
  const [fadeBoot, setFadeBoot] = useState(false)

  useEffect(() => {
    // 启动动画逻辑
    const hasBooted = sessionStorage.getItem('cyber_booted')
    if (hasBooted) {
      setIsBooting(false)
    } else {
      setIsBooting(true)
      const logs = [
        "LOADING KERNEL MODULES... [OK]",
        "MOUNTING VIRTUAL FILE SYSTEMS... [OK]",
        "INITIALIZING NEURAL INTERFACE... [OK]",
        "WARNING: UNAUTHORIZED ACCESS DETECTED",
        "BYPASSING SECURITY PROTOCOLS... [OK]",
        "ESTABLISHING SECURE CONNECTION... [OK]",
        "DECRYPTING ARCHIVES... [OK]",
        "SYSTEM ACCESS GRANTED. WELCOME TO THE GRID."
      ]
      let currentStep = 0
      const interval = setInterval(() => {
        if (logs[currentStep]) {
          setBootLog(prev => [...prev, logs[currentStep]])
        }
        currentStep++

        if (currentStep >= logs.length) {
          clearInterval(interval)
          // 留够时间展示最后一条信息，然后开始淡出
          setTimeout(() => {
            setFadeBoot(true)
            // 等待淡出动画结束（1000ms）后彻底移除 DOM
            setTimeout(() => {
              setIsBooting(false)
              sessionStorage.setItem('cyber_booted', 'true')
            }, 1000)
          }, 800)
        }
      }, 300) // 每行代码敲落的间隔时间

      return () => clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    // 监听哈希改变，由哈希决定我们向上提拉到哪一屏
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash === '#category-section') {
        setActiveSubPage('category')
      } else if (hash === '#archive-section') {
        setActiveSubPage('archive')
      } else if (hash === '#me-section') {
        setActiveSubPage('me')
      } else {
        setActiveSubPage('home')
      }
    }

    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [router.asPath])

  return (
    // 外层容器死死锁住 100vh 并掐断原生纵向滚动，彻底屏蔽“鼠标滑滚”到下页的行为
    <div className="w-full h-screen overflow-hidden text-white relative">

      {/* ================= 赛博开机启动屏 (BOOT SCREEN) ================= */}
      {isBooting && (
        <div className={`fixed inset-0 z-[100] bg-[#02050a] flex flex-col justify-center items-start px-8 md:px-20 font-tech-mono text-cyan-400 transition-opacity duration-1000 ${fadeBoot ? 'opacity-0' : 'opacity-100'}`}>
          <div className="max-w-3xl w-full">
            <div className="text-fuchsia-500 font-bold mb-8 text-lg sm:text-xl md:text-2xl tracking-widest drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]">
              &gt; SYSTEM_OS v4.0.0 INITIALIZING_
            </div>
            {bootLog.map((log, index) => (
              <div key={index} className="mb-3 text-xs sm:text-sm md:text-base drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
                <span className="text-gray-500 mr-3">[{String(index * 342 + 1024).padStart(6, '0')}]</span>
                <span className={(log && (log.includes('WARNING') || log.includes('GRANTED'))) ? 'text-fuchsia-400 font-bold' : 'text-cyan-300'}>{log}</span>
              </div>
            ))}
            <div className="animate-[pulse_0.8s_ease-in-out_infinite] w-3 h-5 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] mt-4"></div>
          </div>

          {/* 屏幕扫描纹路遮罩效果 (CRT Scanlines) */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-[110] opacity-40"></div>
        </div>
      )}
      {/* ==================================================================== */}

      {/* 核心轨道：控制整个页面的纵向幻灯片式滑动（平滑过渡 700ms） */}
      <div
        className="w-full relative transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ transform: activeSubPage === 'home' ? 'translateY(0)' : 'translateY(-100vh)' }}
      >

        {/* 第一屏：纯净的主视觉区（0 级轨道） */}
        <div className="w-full h-screen relative flex items-center justify-center"></div>

        {/* 第二屏：动态加载具体内容（-100vh 级轨道）。自身具备局部溢出滚动能力，以便阅读长文章和分类 */}
        <div className="w-full h-screen overflow-y-auto overflow-x-hidden relative pb-32">

          {activeSubPage === 'category' && props.categoryOptions && props.categoryOptions.length > 0 && (
            <div className="w-full min-h-screen relative z-10 bg-[#050b14]/80 backdrop-blur-md pt-20 pb-12 border-t border-cyan-400/30">
              <h2 className="text-center text-3xl font-orbitron font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 tracking-widest drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] mb-8">
                CATEGORIES
              </h2>
              <LayoutCategoryIndex {...props} />
            </div>
          )}

          {activeSubPage === 'archive' && props.archivePosts && Object.keys(props.archivePosts).length > 0 && (
            <div className="w-full min-h-screen relative z-10 bg-[#050b14]/50 backdrop-blur-xl border-t border-cyan-400/30 shadow-[0_-10px_40px_rgba(34,211,238,0.15)] pt-20 pb-40">
              <LayoutArchive {...props} />
            </div>
          )}

          {activeSubPage === 'me' && (
            <div className="w-full min-h-screen relative z-10 bg-[#050b14]/80 backdrop-blur-md pt-20 pb-12 border-t border-cyan-400/30">
              <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 xl:gap-16 px-4 md:px-8">

                {/* 左侧：3D全息投影/特工身份牌区域 */}
                <div className="w-full md:w-1/3 flex flex-col items-center">
                  <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full p-2 bg-[#050b14]/50 border-2 border-cyan-500/30 shadow-[0_0_40px_rgba(34,211,238,0.2)] backdrop-blur-xl">

                    {/* 外圈旋转定位仪扫面动画 */}
                    <div className="absolute inset-0 rounded-full border border-cyan-400 border-dashed animate-[spin_10s_linear_infinite] opacity-50"></div>
                    <div className="absolute -inset-4 rounded-full border border-fuchsia-500/30 animate-[spin_15s_linear_infinite_reverse]"></div>

                    {/* 核心头像槽位 */}
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-[#0a1931] to-black border-4 border-cyan-400 overflow-hidden flex items-center justify-center shadow-[inset_0_0_30px_rgba(34,211,238,0.5)] relative group cursor-crosshair">
                      {(() => {
                        const avatarUrl = siteConfig('EXAMPLE_ABOUT_AVATAR', null, CONFIG) || props?.siteInfo?.icon;
                        if (avatarUrl) {
                          return (
                            <img 
                              src={avatarUrl} 
                              alt="Profile Avatar" 
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                            />
                          );
                        }
                        return <i className="fas fa-user-secret text-6xl text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,1)] group-hover:scale-110 transition-transform duration-500"></i>;
                      })()}
                      <div className="absolute inset-0 bg-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>

                  {/* 机密标签序列 */}
                  <div className="mt-8 flex flex-col items-center">
                    <div className="bg-fuchsia-600 text-white font-tech-mono text-xs font-bold px-3 py-1 tracking-[0.2em] animate-pulse">CLASSIFIED // LEVEL 9</div>
                    <h1 className="mt-4 font-orbitron text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-cyan-600 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
                      {siteConfig('EXAMPLE_ABOUT_TITLE', 'newrain', CONFIG)}
                    </h1>
                    <p className="text-cyan-500/60 text-sm mt-1 tracking-widest font-bold">{siteConfig('EXAMPLE_ABOUT_SUBTITLE', 'SYSTEM ARCHITECT', CONFIG)}</p>
                  </div>
                </div>

                {/* 右侧：高压数据终端口 (Data Terminal) */}
                <div className="w-full md:w-2/3 h-full max-h-[600px] flex flex-col bg-black/60 border border-cyan-500/30 rounded-xl shadow-[0_0_30px_rgba(34,211,238,0.1),inset_0_0_20px_rgba(34,211,238,0.05)] overflow-hidden font-tech-mono">

                  {/* 仿真终端顶栏 */}
                  <div className="border-b border-cyan-500/30 bg-black/50 px-4 py-2 flex items-center justify-between">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-fuchsia-500 rounded-sm"></div>
                      <div className="w-3 h-3 bg-cyan-400 rounded-sm"></div>
                      <div className="w-3 h-3 bg-cyan-400/30 rounded-sm"></div>
                    </div>
                    <div className="text-[10px] text-cyan-600 font-bold uppercase tracking-widest">
                      bio_metadata.json
                    </div>
                  </div>

                  {/* 数据打印区 */}
                  <div className="p-6 md:p-8 overflow-y-auto w-full text-sm leading-relaxed space-y-6">

                    {/* JSON 格式数据域 */}
                    <div>
                      <span className="text-fuchsia-400">&gt;</span> <span className="text-white font-bold">cat</span> <span className="text-cyan-300">profile.md</span>
                      <p className="mt-4 text-gray-400 text-justify">
                        {siteConfig('EXAMPLE_ABOUT_INTRO_1', '欢迎来到我的个人博客，这里记录我的学习笔记和技术分享。', CONFIG)}
                      </p>
                      <p className="mt-4 text-gray-400 text-justify">
                        {siteConfig('EXAMPLE_ABOUT_INTRO_2', '👋 Hi, I’m @newrain-zh', CONFIG)}
                      </p>   <p className="mt-4 text-gray-400 text-justify">
                        {siteConfig('EXAMPLE_ABOUT_DOMAIN', '💻 alex.sh.cn', CONFIG)}
                      </p>
                      <p className="mt-4 text-gray-400 text-justify">
                        {siteConfig('EXAMPLE_ABOUT_EMAIL', '📧 zzqnoboy@126.com', CONFIG)}
                      </p>

                    </div>

                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>

                    {/* 联系方式终端区块 */}
                    <div>
                      <span className="text-fuchsia-400 animate-pulse">_</span> <span className="text-cyan-500">AWAITING_CONNECTION...</span>
                      <div className="mt-4 flex space-x-4">
                        <a href={siteConfig('EXAMPLE_ABOUT_GITHUB', 'https://github.com', CONFIG)} target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-cyan-500/10 border border-cyan-500/50 hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_15px_rgba(34,211,238,0.8)] transition-all">
                          <i className="fab fa-github"></i>
                        </a>
                      </div>
                    </div>

                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>

                    {/* 神经接口连线/技能表 */}
                    <div className="pt-4">
                      <span className="text-fuchsia-400">&gt;</span> <span className="text-white font-bold">netstat</span> <span className="text-cyan-300">-skills</span>

                      <div className="mt-6 flex flex-col gap-4">
                        {siteConfig('EXAMPLE_ABOUT_SKILL_GROUPS', [], CONFIG).map((group, index) => (
                          <div key={index} className="flex flex-wrap gap-2">
                            {group.items.map(skill => (
                              <span 
                                key={skill} 
                                className={`px-2.5 py-1 text-xs font-tech-mono font-bold uppercase tracking-wider rounded border transition-all cursor-crosshair
                                  border-${group.color}-500 text-${group.color}-400 bg-${group.color}-950/30 
                                  shadow-[0_0_8px_rgba(var(--neon-${group.color}),0.4),inset_0_0_2px_rgba(var(--neon-${group.color}),0.3)] 
                                  hover:bg-${group.color}-500 hover:text-${group.color === 'emerald' || group.color === 'fuchsia' || group.color === 'blue' ? 'white' : 'black'} 
                                  hover:shadow-[0_0_15px_rgba(var(--neon-${group.color}),0.8)]`}
                                style={{
                                  /* Dynamically inject RGB variables for shadows since Tailwind arbitary arbitrary values don't interpolate well with strictly dynamic variables */
                                  '--neon-emerald': '16,185,129',
                                  '--neon-cyan': '6,182,212',
                                  '--neon-fuchsia': '217,70,239',
                                  '--neon-amber': '245,158,11',
                                  '--neon-blue': '59,130,246'
                                }}
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
