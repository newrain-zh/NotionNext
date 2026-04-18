import Badge from '@/components/Badge'
import NotionIcon from '@/components/NotionIcon'
import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'

const BlogPostCard = ({ post, className }) => {
  const router = useRouter()
  const currentSelected =
    decodeURIComponent(router.asPath.split('?')[0]) === post?.href

  return (
    <SmartLink href={post?.href} passHref>
      <div
        key={post.id}
        className={`${className} glass-card rounded-xl overflow-hidden relative cursor-pointer px-4 py-3 h-full border border-slate-200/20 dark:border-slate-700/20 shadow-[0_12px_40px_rgba(0,0,0,0.02)] transition-all duration-500 hover:shadow-[0_20px_60px_rgba(106,28,246,0.08)]
                    ${currentSelected ? 'bg-[#6a1cf6] text-white font-bold shadow-[0_20px_60px_rgba(106,28,246,0.4)] border-transparent' : 'text-slate-700 dark:text-slate-200'}`}>
        <div className='w-full select-none'>
          {siteConfig('POST_TITLE_ICON') && (
            <NotionIcon icon={post?.pageIcon} />
          )}{' '}
          {post.title}
        </div>
        {/* 最新文章加个红点 */}
        {post?.isLatest && siteConfig('GITBOOK_LATEST_POST_RED_BADGE') && (
          <Badge />
        )}
      </div>
    </SmartLink>
  )
}

export default BlogPostCard
