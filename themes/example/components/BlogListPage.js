import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'
import CONFIG from '../config'
import BlogItem from './BlogItem'
/**
 * 使用分页插件的博客列表
 * @param {*} props
 * @returns
 */
export const BlogListPage = props => {
  const { page = 1, posts, postCount, category, tag } = props
  const { locale, NOTION_CONFIG } = useGlobal()
  const router = useRouter()
  const totalPage = Math.ceil(
    postCount / siteConfig('POSTS_PER_PAGE', null, NOTION_CONFIG)
  )
  const currentPage = +page

  const showPrev = currentPage > 1
  const showNext = page < totalPage
  const pagePrefix = router.asPath
    .split('?')[0]
    .replace(/\/page\/[1-9]\d*/, '')
    .replace(/\/$/, '')
    .replace('.html', '')

  const showPageCover = siteConfig('EXAMPLE_POST_LIST_COVER', null, CONFIG)

  return (
    <div className={`w-full ${showPageCover ? 'md:pr-2' : 'md:pr-12'} mb-12`}>
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
            root@cyber-node: /var/log/archives
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
              {category ? `cd /category/${category} && ` : tag ? `cd /tag/${tag} && ` : ''}ls -lhaC --color=auto
            </span>
          </div>

          <div className="mb-4 text-gray-500/80 tracking-widest text-xs">
            total {postCount}
          </div>

          {/* 文章列表载体（所有文章作为 `ll`行） */}
          <div id='posts-wrapper' className="flex flex-col space-y-[2px]">
            {posts?.map(post => (
              <BlogItem key={post.id} post={post} />
            ))}
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

      {/* 终端风格外部分页控制 */}
      <div className='flex justify-between items-center text-xs md:text-sm font-mono mt-6 px-2 tracking-widest'>
        <SmartLink
          href={{
            pathname:
              currentPage - 1 === 1
                ? `${pagePrefix}/`
                : `${pagePrefix}/page/${currentPage - 1}`,
            query: router.query.s ? { s: router.query.s } : {}
          }}
          className={`${showPrev ? 'text-cyan-400 hover:text-white hover:drop-shadow-[0_0_8px_rgba(34,211,238,1)] transition-all' : 'text-gray-800 pointer-events-none'}`}>
          {'<- ./PREV.sh'}
        </SmartLink>
        
        <div className="text-fuchsia-500/60 hidden sm:block">
          PAGE [{currentPage}/{totalPage}]
        </div>

        <SmartLink
          href={{
            pathname: `${pagePrefix}/page/${currentPage + 1}`,
            query: router.query.s ? { s: router.query.s } : {}
          }}
          className={`${showNext ? 'text-cyan-400 hover:text-white hover:drop-shadow-[0_0_8px_rgba(34,211,238,1)] transition-all' : 'text-gray-800 pointer-events-none'}`}>
          {'./NEXT.sh ->'}
        </SmartLink>
      </div>
    </div>
  )
}
