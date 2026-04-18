import NotionIcon from '@/components/NotionIcon'
import TwikooCommentCount from '@/components/TwikooCommentCount'
import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import React from 'react'
import CONFIG from '../config'

/**
 * 博客列表的单个卡片 - Unix 终端 `ls -l` 行列输出风格
 * @param {*} param0
 * @returns
 */
const BlogItem = ({ post }) => {
  const date = post.date?.start_date || post.createdTime || '1970-01-01'
  const author = siteConfig('AUTHOR') || 'root'
  const category = post.category || 'sys'

  return (
    <div className='group flex flex-col md:flex-row md:items-center justify-between hover:bg-cyan-900/40 text-[10px] sm:text-xs md:text-sm py-2 px-3 border-b border-cyan-900/30 transition-colors font-mono'>
      
      {/* 核心焦点放在最前面：链接主体与脚本执行名 */}
      <div className='flex-1 min-w-0 flex items-center mb-1 md:mb-0 mr-4'>
        <SmartLink
          href={post?.href}
          className='text-cyan-50 group-hover:text-cyan-300 drop-shadow-[0_0_2px_rgba(255,255,255,0.4)] group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] truncate flex items-center transition-all text-base'
        >
          {siteConfig('POST_TITLE_ICON') && (
            <NotionIcon icon={post.pageIcon} className="mr-2 opacity-80" />
          )}
          <span className="group-hover:underline mr-1 font-bold">{'>'}</span>
          <span className="group-hover:underline">{post?.title?.replace(/\s+/g, '_')}.sh</span>
          {post.results && <span className="ml-2 text-fuchsia-500 bg-fuchsia-900/30 px-1 text-[10px]">*MATCH*</span>}
        </SmartLink>
      </div>

      {/* 附属状态元数据列 (靠右流式对齐) */}
      <div className='flex flex-wrap md:flex-nowrap items-center md:space-x-4 shrink-0 text-right opacity-80 group-hover:opacity-100 transition-opacity'>
        
        {/* 属主与属组 (作者与分类) */}
        <div className='text-fuchsia-400 w-14 shrink-0 truncate text-left md:text-right'>{author}</div>
        <div className='text-cyan-400 w-16 md:w-20 shrink-0 truncate text-left md:text-right'>{category}</div>
        
        {/* 模拟体积 (评论数) */}
        <div className='text-yellow-500/90 w-10 shrink-0 hidden md:flex justify-end'>
          <TwikooCommentCount post={post} className='text-yellow-500/90' />
          {!post.commentCount && '4096'} 
        </div>
        
        {/* 时间戳 */}
        <div className='text-green-500/90 w-24 shrink-0 text-left md:text-right'>{date}</div>
      </div>
    </div>
  )
}

export default BlogItem
