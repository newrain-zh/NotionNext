import { useGlobal } from '@/lib/global'
import { useGitBookGlobal } from '..'

/**
 * 移动端底部导航
 * @param {*} param0
 * @returns
 */
export default function BottomMenuBar({ post, className }) {
  const showTocButton = post?.toc?.length > 1
  const { locale } = useGlobal()
  const { pageNavVisible, changePageNavVisible, tocVisible, changeTocVisible } =
    useGitBookGlobal()
  const togglePageNavVisible = () => {
    changePageNavVisible(!pageNavVisible)
  }

  const toggleToc = () => {
    changeTocVisible(!tocVisible)
  }

  return (
    <div className='md:hidden fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-safe'>
      <div
        className={`rounded-full border border-slate-200/20 dark:border-slate-700/20 mb-8 mx-auto w-fit bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.04)] flex items-center p-2 gap-1 max-w-lg font-medium`}>
        <button
          type='button'
          onClick={togglePageNavVisible}
          className='text-slate-600 dark:text-slate-400 px-4 py-2 flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors scale-105 transition-all duration-500 ease-out font-manrope text-xs font-medium'>
          <i className='fa-book fas w-4 h-4' />
          <span>
            {locale.COMMON.ARTICLE_LIST}
          </span>
        </button>

        {showTocButton && (
          <button
            type='button'
            onClick={toggleToc}
            className='bg-[#6a1cf6] text-white px-6 py-2 flex items-center gap-2 hover:bg-violet-700 rounded-full transition-colors scale-105 transition-all duration-500 ease-out font-manrope text-xs font-medium shadow-[0_10px_20px_rgba(106,28,246,0.3)]'>
            <i className='fa-list-ol fas w-4 h-4' />
            <span>
              {locale.COMMON.TABLE_OF_CONTENTS}
            </span>
          </button>
        )}
      </div>
    </div>
  )
}
