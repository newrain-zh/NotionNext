/* eslint-disable react/no-unknown-property */
/**
 * 此处样式只对当前主题生效
 * 此处不支持tailwindCSS的 @apply 语法
 * @returns
 */
import { siteConfig } from '@/lib/config'
import CONFIG from './config'

const Style = () => {
  return (
    <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&family=Noto+Sans+SC:wght@300;400;500;600;700&display=swap');

      :root {
        --gitbook-primary: ${siteConfig('GITBOOK_THEME_PRIMARY_COLOR', null, CONFIG)};
        --gitbook-card-radius: ${siteConfig('GITBOOK_THEME_CARD_RADIUS', null, CONFIG)};
        --gitbook-card-shadow: ${siteConfig('GITBOOK_THEME_CARD_SHADOW', null, CONFIG)};
        --gitbook-card-bg: ${siteConfig('GITBOOK_THEME_CARD_BG', null, CONFIG)};
        --gitbook-noise-opacity: ${siteConfig('GITBOOK_THEME_NOISE_OPACITY', null, CONFIG)};
        --gitbook-dark-noise-opacity: ${siteConfig('GITBOOK_THEME_DARK_NOISE_OPACITY', null, CONFIG)};
      }
      
      // 底色和排版基础
      .glass-card {
        background: rgba(255, 255, 255, 0.4);
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
      }
      
      body {
        font-family: 'Manrope', 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif;
        background: #f8f8fb;
      }
      
      body::before {
        content: "";
        position: fixed;
        top: 0; left: 0; width: 100vw; height: 100vh;
        pointer-events: none;
        z-index: 1000;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        opacity: var(--gitbook-noise-opacity);
      }

      .dark body {
        background: #0c0e10;
      }
      
      .dark body::before {
        opacity: var(--gitbook-dark-noise-opacity);
      }

      h1, h2, h3, h4, h5, h6 {
        font-family: 'Manrope', 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif;
        letter-spacing: -0.02em;
      }

      .bottom-button-group {
        box-shadow: 0px -3px 10px 0px rgba(0, 0, 0, 0.1);
      }

      /* Fluid Gradient CSS */
      .fluid-bg-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        background-color: #f8f8fb;
        z-index: 50; /* cover all layout elements */
        transition: background-color 0.5s ease;
      }
      
      .dark .fluid-bg-container {
        background-color: #0c0e10;
      }

      .fluid-blob {
        position: absolute;
        border-radius: 50%;
        filter: blur(80px);
        opacity: 0.6;
        animation: fluid-moving 20s infinite alternate cubic-bezier(0.4, 0, 0.2, 1);
        will-change: transform;
      }

      .fluid-blob-1 {
        width: 60vw;
        height: 60vw;
        background: #ac8eff; /* purple */
        top: -10vw;
        left: -10vw;
        animation-duration: 25s;
      }

      .fluid-blob-2 {
        width: 50vw;
        height: 50vw;
        background: #38bdf8; /* light blue */
        right: -10vw;
        bottom: -10vw;
        animation-duration: 22s;
        animation-direction: alternate-reverse;
      }

      .fluid-blob-3 {
        width: 40vw;
        height: 40vw;
        background: #f472b6; /* pink */
        top: 40vh;
        left: 30vw;
        animation-duration: 18s;
      }
      
      .dark .fluid-blob-1 { background: #3b1b6e; }
      .dark .fluid-blob-2 { background: #0369a1; }
      .dark .fluid-blob-3 { background: #be185d; }

      @keyframes fluid-moving {
        0% { transform: translate(0, 0) scale(1) rotate(0deg); }
        33% { transform: translate(15vw, 10vh) scale(1.1) rotate(90deg); }
        66% { transform: translate(-10vw, 20vh) scale(0.9) rotate(180deg); }
        100% { transform: translate(5vw, -5vh) scale(1.2) rotate(270deg); }
      }
    `}</style>
  )
}

export { Style }
