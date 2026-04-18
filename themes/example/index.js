'use client'

import Comment from '@/components/Comment'
import replaceSearchResult from '@/components/Mark'
import NotionPage from '@/components/NotionPage'
import ShareBar from '@/components/ShareBar'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { isBrowser } from '@/lib/utils'
import { Transition } from '@headlessui/react'
import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { BlogListPage } from './components/BlogListPage'
import { BlogListScroll } from './components/BlogListScroll'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { PostLock } from './components/PostLock'
import { PostMeta } from './components/PostMeta'
import SearchInput from './components/SearchInput'
import { SideBar } from './components/SideBar'
import TitleBar from './components/TitleBar'
import CONFIG from './config'
import { Style } from './style'
import GlobalBackground from './components/GlobalBackground'
import ExampleFloatingMenu from './components/ExampleFloatingMenu'
import { LayoutArchive } from './components/LayoutArchive'
import { LayoutCategoryIndex } from './components/LayoutCategoryIndex'
import Catalog from './components/Catalog'

/**
 * 基础布局框架
 * 1.其它页面都嵌入在LayoutBase中
 * 2.采用左右两侧布局，移动端使用顶部导航栏
 * @returns {JSX.Element}
 * @constructor
 */
const LayoutBase = props => {
  const { children, post } = props
  const { onLoading, fullWidth, locale } = useGlobal()
  const [readMode, setReadMode] = useState(post ? 'paper' : 'none') // 'none' | 'paper'

  // 每当页面切换并且发现进入了文章详情页时，自动将阅读模式切换为 paper
  useEffect(() => {
    if (post) {
      setReadMode('paper')
    } else {
      setReadMode('none')
    }
  }, [post])

  // 文章详情页左右布局配置 (默认显示在右侧，若配置为竖排则降至下方)
  const LAYOUT_VERTICAL = post && siteConfig('EXAMPLE_ARTICLE_LAYOUT_VERTICAL', false, CONFIG)

  // 网站左右布局颠倒
  const LAYOUT_SIDEBAR_REVERSE = siteConfig('LAYOUT_SIDEBAR_REVERSE', false)
  const router = useRouter()
  const isHomePage = router.route === '/' || router.asPath === '/'
  // 识别归档页面
  const isArchivePage = router.asPath.includes('/archive')

  return (
    <div
      id='theme-example'
      className={`${siteConfig('FONT_STYLE')} dark:text-gray-300 scroll-smooth ${readMode === 'cyber' ? 'read-mode-cyber' : ''} ${readMode === 'paper' ? 'read-mode-paper' : ''}`}>
      <Style />
      {readMode === 'none' && <GlobalBackground />}

      {/* 原有的传统全宽顶部导航和标题栏已被废除，避免其白色或深色底色破坏全局动态雨景和玻璃拟态的沉浸观感。导航统一由 ExampleFloatingMenu 提供支持。 */}

      {/* 主体 */}
      {isHomePage ? (
        children
      ) : (
        <Transition
          show={!onLoading}
          appear={true}
          enter='transition-all ease-out duration-700 transform'
          enterFrom='opacity-0 -translate-y-20'
          enterTo='opacity-100 translate-y-0'
          leave='transition-all ease-in duration-300 transform'
          leaveFrom='opacity-100 translate-y-0'
          leaveTo='opacity-0 -translate-y-20'
          unmount={false}>
          <div id='container-inner' className={`w-full relative z-10 pt-20 pb-40 px-4 ${post ? 'min-h-screen bg-[#fafafa] !pt-4' : ''} transition-colors duration-500`}>
            <div
              id='container-wrapper'
              className={`relative mx-auto justify-center md:flex min-h-[80vh] transition-all duration-500
              ${
                !post 
                  ? // 这里是首页或归档页，保持深空毛玻璃发光效果
                    `bg-white/10 dark:bg-black/10 backdrop-blur-lg rounded-3xl py-8 px-6 ${isArchivePage ? 'border-2 border-cyan-400/50 shadow-[0_0_50px_rgba(34,211,238,0.3),inset_0_0_40px_rgba(217,70,239,0.2)]' : 'border border-white/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]'}`
                  : readMode === 'none'
                  ? // 【文章详情页】默认保留 ZEN 明亮状态
                    'bg-[#fafafa] text-gray-900 dark:bg-[#fafafa] dark:!text-gray-900 rounded-none py-12 px-2 shadow-none max-w-4xl border-none z-50'
                  : // 【阅读模式】交由全局 CSS 处理背景，仅设透明及最大宽度
                    'bg-transparent rounded-none py-12 px-2 shadow-none max-w-5xl border-none z-50'
              }
              ${LAYOUT_SIDEBAR_REVERSE ? 'flex-row-reverse' : ''} 
              ${LAYOUT_VERTICAL ? 'items-center flex-col' : 'items-start'} 
              `}>
              
              {/* 内容 */}
              <div
                className={`${fullWidth || (!post && !isHomePage) ? 'max-w-5xl' : LAYOUT_VERTICAL ? 'max-w-5xl' : 'max-w-3xl'} w-full xl:px-14 lg:px-4`}>
                {props.slotTop}
                {children}
              </div>

              {/* 侧边栏：在 PAPER 阅读模式下仅保留清爽的目录结构，非阅读模式保留原版 */}
              {!fullWidth && !!post && (
                <div
                  className={`${
                    LAYOUT_VERTICAL
                      ? 'flex space-x-0 md:space-x-2 md:flex-row flex-col w-full max-w-5xl justify-center xl:px-14 lg:px-4'
                      : 'md:w-64 sticky top-8'
                  }`}>
                  
                  {readMode === 'paper' ? (
                    post?.toc && post?.toc.length > 0 && (
                      <aside className='w-full rounded mb-6 pb-4 bg-transparent pt-20 pl-4 hidden md:block'>
                        <h3 className='text-sm text-[#5d4037] py-2 px-4 border-l-4 border-[#8d6e63]/50 font-bold tracking-widest font-serif uppercase'>
                          <i className="fas fa-list-ul mr-2"></i> {locale.COMMON.TABLE_OF_CONTENTS}
                        </h3>
                        <div className="mt-4 opacity-70 hover:opacity-100 transition-opacity font-serif">
                          <Catalog toc={post?.toc} />
                        </div>
                      </aside>
                    )
                  ) : (
                    <SideBar {...props} />
                  )}
                  
                </div>
              )}
            </div>
          </div>
        </Transition>
      )}

      {/* 下方悬浮功能被清理：为了沉浸式的视频背景，去除了原有的白边 Footer 页脚（含黑暗模式开关）以及原本干扰页面右下角的回到顶部图标 */}

      {/* 全局底部交互悬浮菜单（最高层级） */}
      <div className='fixed bottom-0 left-0 w-full z-50 pointer-events-none'>
        <div className='pointer-events-auto'>
          <ExampleFloatingMenu {...props} />
        </div>
      </div>
    </div>
  )
}

import AnimatedExampleHome from './components/AnimatedExampleHome'
/**
 * 首页
 * @param {*} props
 * @returns 全屏动画与底部菜单交互式首页
 */
const LayoutIndex = props => {
  return <AnimatedExampleHome {...props} />
}

/**
 * 文章列表
 * @param {*} props
 * @returns
 */
const LayoutPostList = props => {
  const { category, tag } = props

  return (
    <>
      {/* 分类和标签的头部横幅已被移除，将统一转移至下方终端面板的首行指令中显示 */ }

      {siteConfig('POST_LIST_STYLE') === 'page' ? (
        <BlogListPage {...props} />
      ) : (
        <BlogListScroll {...props} />
      )}
    </>
  )
}

/**
 * 文章详情页
 * @param {*} props
 * @returns
 */
const LayoutSlug = props => {
  const { post, lock, validPassword } = props
  const router = useRouter()
  const waiting404 = siteConfig('POST_WAITING_TIME_FOR_404') * 1000
  useEffect(() => {
    // 404
    if (!post) {
      setTimeout(
        () => {
          if (isBrowser) {
            const article = document.querySelector('#article-wrapper #notion-article')
            if (!article) {
              router.push('/404').then(() => {
                console.warn('找不到页面', router.asPath)
              })
            }
          }
        },
        waiting404
      )
    }
  }, [post])
  return (
    <>
      {lock ? (
        <PostLock validPassword={validPassword} />
      ) : post && (
        <div>
          <PostMeta post={post} />
          <div id='article-wrapper'>
            <NotionPage post={post} />
            <ShareBar post={post} />
          </div>
          <Comment frontMatter={post} />
        </div>
      )}
    </>
  )
}

/**
 * 404页
 * @param {*} props
 * @returns
 */
const Layout404 = props => {
  const router = useRouter()
  useEffect(() => {
    // 延时3秒如果加载失败就返回首页
    setTimeout(() => {
      const article = isBrowser && document.getElementById('article-wrapper')
      if (!article) {
        router.push('/').then(() => {
          // console.log('找不到页面', router.asPath)
        })
      }
    }, 3000)
  }, [])

  return <>
        <div className='md:-mt-20 text-black w-full h-screen text-center justify-center content-center items-center flex flex-col'>
            <div className='dark:text-gray-200'>
                <h2 className='inline-block border-r-2 border-gray-600 mr-2 px-3 py-2 align-top'><i className='mr-2 fas fa-spinner animate-spin' />404</h2>
                <div className='inline-block text-left h-32 leading-10 items-center'>
                    <h2 className='m-0 p-0'>页面无法加载，即将返回首页</h2>
                </div>
            </div>
        </div>
    </>
}

/**
 * 搜索页
 * @param {*} props
 * @returns
 */
const LayoutSearch = props => {
  const { keyword } = props
  const router = useRouter()
  useEffect(() => {
    if (isBrowser) {
      // 高亮搜索到的结果
      const container = document.getElementById('posts-wrapper')
      if (keyword && container) {
        replaceSearchResult({
          doms: container,
          search: keyword,
          target: {
            element: 'span',
            className: 'text-red-500 border-b border-dashed'
          }
        })
      }
    }
  }, [router])

  return (
    <>
      <div className='pb-12'>
        <SearchInput {...props} />
      </div>
      <LayoutPostList {...props} />
    </>
  )
}


/**
 * 标签列表
 * @param {*} props
 * @returns
 */
const LayoutTagIndex = props => {
  const { tagOptions } = props
  return (
    <>
      <div id='tags-list' className='duration-200 flex flex-wrap'>
        {tagOptions.map(tag => (
          <div key={tag.name} className='p-2'>
            <SmartLink
              key={tag}
              href={`/tag/${encodeURIComponent(tag.name)}`}
              passHref
              className={`cursor-pointer inline-block rounded hover:bg-gray-500 hover:text-white duration-200 mr-2 py-1 px-2 text-xs whitespace-nowrap dark:hover:text-white text-gray-600 hover:shadow-xl dark:border-gray-400 notion-${tag.color}_background dark:bg-gray-800`}>
              <div className='font-light dark:text-gray-400'>
                <i className='mr-1 fas fa-tag' />{' '}
                {tag.name + (tag.count ? `(${tag.count})` : '')}{' '}
              </div>
            </SmartLink>
          </div>
        ))}
      </div>
    </>
  )
}

export {
  Layout404,
  LayoutArchive,
  LayoutBase,
  LayoutCategoryIndex,
  LayoutIndex,
  LayoutPostList,
  LayoutSearch,
  LayoutSlug,
  LayoutTagIndex,
  CONFIG as THEME_CONFIG
}
