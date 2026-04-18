import { useGlobal } from '@/lib/global'
import { useGitBookGlobal } from '@/themes/gitbook'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import NavPostList from './NavPostList'

/**
 * 悬浮抽屉 页面内导航
 * @param toc
 * @param post
 * @returns {JSX.Element}
 * @constructor
 */
const PageNavDrawer = props => {
  const { pageNavVisible, changePageNavVisible } = useGitBookGlobal()
  const { filteredNavPages } = props
  const { locale } = useGlobal()
  const router = useRouter()
  const switchVisible = () => {
    changePageNavVisible(!pageNavVisible)
  }

  useEffect(() => {
    changePageNavVisible(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  return (
    <>
      <div
        id='gitbook-left-float'
        className='fixed top-0 left-0 z-40 md:hidden'>
        {/* 侧边菜单 */}
        <div
          className={`${pageNavVisible ? 'animate__slideInLeft ' : '-ml-[120%] animate__slideOutLeft'} 
                      overflow-y-hidden shadow-2xl w-72 md:w-80 duration-300 fixed left-2 bottom-20 md:top-20 md:bottom-2 rounded-2xl md:rounded-r-3xl glass-card xl shadow-[0_12px_40px_rgba(0,0,0,0.04)] border border-slate-200/20 dark:border-slate-700/20`}>
          <div className='px-4 py-3 flex justify-between items-center border-b border-slate-200/20 dark:border-slate-700/20 font-bold'>
            <span className='text-gray-800 dark:text-gray-200'>{locale.COMMON.ARTICLE_LIST}</span>
            <i
              className='fas fa-times p-1 cursor-pointer text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors'
              onClick={() => {
                changePageNavVisible(false)
              }}></i>
          </div>
          {/* 所有文章列表 */}
          <div className='dark:text-gray-400 text-gray-600 h-96 overflow-y-scroll p-3'>
            <NavPostList filteredNavPages={filteredNavPages} />
          </div>
        </div>
      </div>

      {/* 背景蒙版 */}
      <div
        id='left-drawer-background'
        className={`${pageNavVisible ? 'block' : 'hidden'} fixed top-0 left-0 z-30 w-full h-full`}
        onClick={switchVisible}
      />
    </>
  )
}
export default PageNavDrawer
