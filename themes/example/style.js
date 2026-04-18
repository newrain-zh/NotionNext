/* eslint-disable react/no-unknown-property */
/**
 * 此处样式只对当前主题生效
 * 此处不支持tailwindCSS的 @apply 语法
 * @returns
 */
const Style = () => {
  return <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&display=swap');

    /* 赛博朋克字体拓展类 */
    .font-orbitron {
      font-family: 'Orbitron', -apple-system, sans-serif !important;
    }
    .font-tech-mono {
      font-family: 'Share Tech Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
    }

    // 底色
    .dark body{
        background-color: black;
    }

    /* 全屏动画样式扩展 */
    .example-fluid-bg {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      background-color: #1a1a2e; /* 默认深空背景 */
      z-index: -10; /* 全局最底层背景 */
    }

    .dark .example-fluid-bg {
      background-color: #0f0f1a;
    }

    .example-fluid-blob {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      opacity: 0.7;
      animation: example-fluid-moving 20s infinite alternate linear;
      will-change: transform;
    }

    .example-blob-1 {
      width: 50vw;
      height: 50vw;
      background: #e94560; /* 红色 */
      top: 10%;
      left: 10%;
      animation-duration: 15s;
    }

    .example-blob-2 {
      width: 40vw;
      height: 40vw;
      background: #0f3460; /* 蓝色 */
      right: 15%;
      bottom: 20%;
      animation-duration: 25s;
      animation-direction: alternate-reverse;
    }

    .example-blob-3 {
      width: 30vw;
      height: 30vw;
      background: #f9a826; /* 橙色 */
      top: 40%;
      left: 45%;
      animation-duration: 18s;
    }
    
    @keyframes example-fluid-moving {
      0% { transform: translate(0, 0) scale(1) rotate(0deg); }
      33% { transform: translate(10vw, -10vh) scale(1.2) rotate(45deg); }
      66% { transform: translate(-10vw, 15vh) scale(0.9) rotate(90deg); }
      100% { transform: translate(5vw, 5vh) scale(1.1) rotate(180deg); }
    }

    @keyframes example-glow {
      0% { box-shadow: 0 0 10px rgba(255, 255, 255, 0.4); }
      50% { box-shadow: 0 0 25px rgba(255, 255, 255, 0.9); }
      100% { box-shadow: 0 0 10px rgba(255, 255, 255, 0.4); }
    }
    .example-glow-pulse {
      animation: example-glow 2s infinite ease-in-out;
    }

    /* 词云流水特效 */
    @keyframes example-marquee-left {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    @keyframes example-marquee-right {
      0% { transform: translateX(-50%); }
      100% { transform: translateX(0); }
    }
    .example-marquee-content-left {
      width: max-content;
      animation: example-marquee-left 30s linear infinite;
    }
    .example-marquee-content-right {
      width: max-content;
      animation: example-marquee-right 35s linear infinite;
    }
    .example-marquee-content-left:hover, .example-marquee-content-right:hover {
      animation-play-state: paused;
    }

    /* ---------------- 深度阅读模式 (Reading Mode) 强力覆写引擎 ---------------- */
    
    /* 1. CYBER 黑客终端模式 */
    .read-mode-cyber {
      background-color: #02050a !important;
    }
    .read-mode-cyber * {
      color: #38bdf8 !important; /* Tailwind sky-400 */
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace !important;
      border-color: rgba(56, 189, 248, 0.3) !important;
    }
    .read-mode-cyber h1, .read-mode-cyber h2, .read-mode-cyber h3, .read-mode-cyber h4, .read-mode-cyber strong {
      color: #e879f9 !important; /* Tailwind fuchsia-400 */
      text-shadow: 0 0 8px rgba(232, 121, 249, 0.6) !important;
      font-weight: 800 !important;
    }
    .read-mode-cyber a {
      color: #34d399 !important; /* Tailwind emerald-400 */
      text-decoration: underline dashed !important;
      text-shadow: 0 0 5px rgba(52, 211, 153, 0.5) !important;
    }
    .read-mode-cyber code, .read-mode-cyber pre {
      background-color: #082f49 !important; /* sky-900 */
      color: #7dd3fc !important; /* sky-300 */
      box-shadow: inset 0 0 10px rgba(56, 189, 248, 0.2) !important;
    }
    .read-mode-cyber hr {
      border-top: 1px dashed rgba(232, 121, 249, 0.5) !important;
    }
    .read-mode-cyber img {
      filter: grayscale(80%) sepia(20%) hue-rotate(180deg) contrast(120%) !important;
      opacity: 0.8 !important;
    }

    /* 2. PAPER 复古羊皮纸模式 */
    .read-mode-paper {
      background-color: #f4ead5 !important;
      background-image: radial-gradient(circle at center, transparent 0%, rgba(139, 115, 85, 0.05) 100%) !important;
    }
    .read-mode-paper *:not(code):not(pre):not(code *):not(pre *) {
      color: #4e342e !important; /* 深棕/咖啡色 */
      font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif !important;
      border-color: rgba(141, 110, 99, 0.3) !important;
    }
    .read-mode-paper h1, .read-mode-paper h2, .read-mode-paper h3, .read-mode-paper h4, .read-mode-paper strong {
      color: #3e2723 !important; /* 更深的咖啡色表提亮 */
      font-weight: 800 !important;
    }
    .read-mode-paper a {
      color: #5d4037 !important;
      text-decoration: underline double !important;
    }
    .read-mode-paper hr {
      border-top: 2px solid rgba(141, 110, 99, 0.4) !important;
    }
    .read-mode-paper img {
      filter: sepia(30%) contrast(90%) brightness(95%) !important;
      border-radius: 4px !important;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1) !important;
    }

  `}</style>
}

export { Style }
