import React from 'react'
import FloatingActionNavigation from './FloatingActionNavigation'

const AnimatedHomeBackground = (props) => {
  return (
    <div className="fluid-bg-container">
      {/* 流体色块 */}
      <div className="fluid-blob fluid-blob-1"></div>
      <div className="fluid-blob fluid-blob-2"></div>
      <div className="fluid-blob fluid-blob-3"></div>
      
      {/* 搭载扇形悬浮菜单 */}
      <FloatingActionNavigation {...props} />
    </div>
  )
}

export default AnimatedHomeBackground
