import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'
import { useState } from 'react'

export const MenuItemDrop = ({ link }) => {
  const [show, changeShow] = useState(false)
  const router = useRouter()

  if (!link || !link.show) {
    return null
  }
  const hasSubMenu = link?.subMenus?.length > 0
  const selected = router.pathname === link.href || router.asPath === link.href
  return (
    <li
      className='cursor-pointer list-none items-center flex mx-2 font-semibold'
      onMouseOver={() => changeShow(true)}
      onMouseOut={() => changeShow(false)}>
      {!hasSubMenu && (
        <div
          className={
            'px-2 h-full whitespace-nowrap duration-300 text-sm justify-between dark:text-gray-300 cursor-pointer flex flex-nowrap items-center ' +
            (selected
              ? 'bg-gitbook-primary text-white hover:text-white'
              : 'hover:text-gitbook-primary')
          }>
          <SmartLink href={link?.href} target={link?.target}>
            {link?.icon && <i className={link?.icon} />} {link?.name}
          </SmartLink>
        </div>
      )}

      {/* 包含子菜单 */}
      {hasSubMenu && (
        <>
          <div
            className={
              'hover:text-white hover:bg-gitbook-primary whitespace-nowrap tracking-widest transition-all duration-200 text-sm flex justify-between items-center p-2 ' +
              (selected
                ? 'bg-gitbook-primary text-white hover:text-white'
                : 'dark:text-gray-200 text-gray-700')
            }>
            <div className='flex items-center flex-nowrap'>
              {link?.icon && <i className={link?.icon} />} {link?.name}
              {hasSubMenu && (
                <i
                  className={`px-2 fas fa-chevron-down duration-500 transition-all ${show ? ' rotate-180' : ''}`}></i>
              )}
            </div>
          </div>
          {/* 下拉菜单内容 */}
          <ul
            className={`${show ? 'visible opacity-100 top-12 ' : 'invisible opacity-0 top-10 '} border border-slate-200/20 dark:border-slate-700/20 glass-card rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.04)] overflow-hidden transition-all duration-300 z-20 absolute block`}>
            {link?.subMenus?.map((sLink, index) => {
              return (
                <li
                  key={index}
                  className='text-gray-700 dark:text-gray-200 hover:bg-white/40 dark:hover:bg-white/10 tracking-widest transition-all duration-200 py-3 pr-6 pl-3'>
                  <SmartLink href={sLink.href} target={link?.target}>
                    <span className='text-xs'>
                      {link?.icon && <i className={sLink?.icon}> &nbsp; </i>}
                      {sLink.title}
                    </span>
                  </SmartLink>
                </li>
              )
            })}
          </ul>
        </>
      )}
    </li>
  )
}
