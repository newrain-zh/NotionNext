import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import throttle from 'lodash.throttle'
import { useCallback, useEffect, useRef, useState } from 'react'
import CONFIG from '../config'
import BlogItem from './BlogItem'
/**
 * 使用滚动无限加载的博客列表
 * @param {*} props
 * @returns
 */
export const BlogListScroll = props => {
  const { posts, category, tag } = props
  const { locale, NOTION_CONFIG } = useGlobal()
  const [page, updatePage] = useState(1)
  const POSTS_PER_PAGE = siteConfig('POSTS_PER_PAGE', null, NOTION_CONFIG)

  let hasMore = false
  const postsToShow = posts
    ? Object.assign(posts).slice(0, POSTS_PER_PAGE * page)
    : []

  if (posts) {
    const totalCount = posts.length
    hasMore = page * POSTS_PER_PAGE < totalCount
  }
  const handleGetMore = () => {
    if (!hasMore) return
    updatePage(page + 1)
  }

  const targetRef = useRef(null)

  // 监听滚动自动分页加载
  const scrollTrigger = useCallback(
    throttle(() => {
      const scrollS = window.scrollY + window.outerHeight
      const clientHeight = targetRef
        ? targetRef.current
          ? targetRef.current.clientHeight
          : 0
        : 0
      if (scrollS > clientHeight + 100) {
        handleGetMore()
      }
    }, 500)
  )
  const showPageCover = siteConfig('EXAMPLE_POST_LIST_COVER', null, CONFIG)

  useEffect(() => {
    window.addEventListener('scroll', scrollTrigger)

    return () => {
      window.removeEventListener('scroll', scrollTrigger)
    }
  })

  return (
    <div
      id='posts-wrapper'
      className={`w-full ${showPageCover ? 'md:pr-2' : 'md:pr-12'} mb-12`}
      ref={targetRef}>

      {/* 整合在一块的深网终端视窗界面（高透玻璃态） */}
      <div className="w-full rounded-xl shadow-[0_0_30px_rgba(34,211,238,0.15),inset_0_0_30px_rgba(34,211,238,0.1)] bg-[#050b14]/30 border border-cyan-500/30 overflow-hidden backdrop-blur-xl font-mono relative">
        
        {/* 跨平台兼容仿真顶栏 */}
        <div className="flex items-center px-4 py-3 bg-black/40 border-b border-cyan-500/20 backdrop-blur-md">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.6)]"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_8px_rgba(234,179,8,0.6)]"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
          </div>
          <div className="mx-auto text-cyan-600/70 text-[10px] sm:text-xs font-bold tracking-widest uppercase">
            root@cyber-node: /var/log/archives_stream
          </div>
        </div>

        {/* 内部控制台区域 */}
        <div className="p-4 sm:p-6 text-sm md:text-base selection:bg-fuchsia-500/40 min-h-[50vh]">
          {/* 模拟输入指令 ls -la */}
          <div className="flex flex-wrap items-center mb-6 text-cyan-300">
            <span className="text-fuchsia-500 font-bold mr-2">root@system</span>
            <span className="text-gray-500 mr-2">~</span>
            <span className="text-white font-bold mr-2">$</span>
            <span className="text-cyan-100 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
              {category ? `cd /category/${category} && ` : tag ? `cd /tag/${tag} && ` : ''}ls -lhaC --color=auto && tail -f
            </span>
          </div>

          <div className="mb-4 text-gray-500/80 tracking-widest text-xs">
            stream initializing...
          </div>

          {/* 所有文章作为 `ll`行 */}
          <div className="flex flex-col space-y-[2px]">
            {postsToShow?.map(post => (
              <BlogItem key={post.id} post={post} />
            ))}
          </div>

          {/* 无限滚动加载交互按钮 */}
          <div
            onClick={handleGetMore}
            className={`w-full mt-6 py-3 text-center transition-all ${hasMore ? 'cursor-pointer text-cyan-400 hover:text-cyan-200 hover:bg-cyan-500/20 border border-cyan-500/30' : 'cursor-default text-gray-600 border border-gray-800'}`}>
            {' '}
            {hasMore ? `[ EXECUTE_PULL_MORE ]` : `[ EOF_REACHED ]`}
          </div>

          {/* 提示符挂起：等待下一条指令 */}
          <div className="mt-8 flex items-center text-cyan-400">
            <span className="text-green-500 mr-2 font-bold">root@system</span>
            <span className="text-gray-500 mr-2">~</span>
            <span className="text-white mr-2 font-bold">$</span>
            <span className="w-2.5 h-5 bg-cyan-400 animate-[pulse_1s_ease-in-out_infinite] shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
          </div>
        </div>
      </div>
    </div>
  )
}
