import React, { useEffect, useRef } from 'react'

const MatrixRain = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let width = window.innerWidth
    let height = window.innerHeight
    canvas.width = width
    canvas.height = height

    // 使用混杂 ASCII 与日文假名以还原最经典的电影效果
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*)*&^%+-~_=[]{}|;:",.<>/?あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん'.split('')

    const fontSize = 16
    let columns = width / fontSize
    let drops = []
    
    // 初始化水滴高度
    for (let x = 0; x < columns; x++) {
      drops[x] = Math.random() * -100 // 负值保证一载入时文字是在上方屏幕外，随即错落砸下
    }

    const draw = () => {
      // 涂抹一层半透明纯黑背景覆盖上一帧，实现拖尾效果
      // 色值采用深邃黑，完全贴合您的暗黑极简风格
      ctx.fillStyle = 'rgba(5, 11, 20, 0.08)'
      ctx.fillRect(0, 0, width, height)

      // 字体设置为经典的黑客矩阵绿 + 中青色 的融合调优版
      ctx.fillStyle = '#0f0' 
      ctx.font = fontSize + 'px "Courier New", Courier, monospace'

      for (let i = 0; i < drops.length; i++) {
        // 由于有渐变蓝紫和黑客绿两套体系，给这些文字做个随机发光效果也是极好的
        const char = letters[Math.floor(Math.random() * letters.length)]
        
        ctx.fillStyle = Math.random() > 0.95 ? '#fff' : (Math.random() > 0.8 ? '#22d3ee' : '#22c55e') // 偶尔夹带一点白字或者赛博青色，其余为黑客绿
        
        ctx.fillText(char, i * fontSize, drops[i] * fontSize)

        // 当触及底部且符合随机概率时，把水滴送回顶部，保证雨滴随机刷新连绵不绝
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0
        }
        
        // 每个帧往下坠落一个身位
        drops[i]++
      }
    }

    // 设置高帧率刷新
    const intervalId = setInterval(draw, 33)

    // 缩放重置监听
    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
      columns = width / fontSize
      drops = []
      for (let x = 0; x < columns; x++) {
        drops[x] = Math.random() * -100
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      clearInterval(intervalId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full z-0 block pointer-events-none opacity-40 mix-blend-screen"
    />
  )
}

export default MatrixRain
