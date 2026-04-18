/**
 * 主题配置文件
 */
const CONFIG = {
  // 菜单配置
  EXAMPLE_MENU_CATEGORY: true, // 显示分类
  EXAMPLE_MENU_TAG: true, // 显示标签
  EXAMPLE_MENU_ARCHIVE: true, // 显示归档
  EXAMPLE_MENU_SEARCH: true, // 显示搜索

  EXAMPLE_POST_LIST_COVER: true, // 列表显示文章封面

  EXAMPLE_TITLE_IMAGE: false, // 标题栏，是否背景图片

  // 文章页面布局
  EXAMPLE_ARTICLE_LAYOUT_VERTICAL: false, // 文章详情，左右布局改为上下布局
  EXAMPLE_ARTICLE_HIDDEN_NOTIFICATION: false, // 文章详情隐藏公告

  // "关于我" 跨端全屏特效页面配置
  EXAMPLE_ABOUT_AVATAR: '', // 个人头像，支持图片链接或相对路径(如 /avatar.jpg)。留空则默认使用 Notion 站点的图标。
  EXAMPLE_ABOUT_TITLE: 'newrain', // 关于我页面的大标题
  EXAMPLE_ABOUT_SUBTITLE: 'SYSTEM ARCHITECT', // 大标题下方的副标题
  EXAMPLE_ABOUT_INTRO_1: '欢迎来到我的个人博客，这里记录我的学习笔记和技术分享。', // 个人简介第一段
  EXAMPLE_ABOUT_INTRO_2: '👋  Hi, I’m @newrain-zh', // 个人简介第二段
  EXAMPLE_ABOUT_DOMAIN: '💻  alex.sh.cn', // 展示的域名
  EXAMPLE_ABOUT_EMAIL: '📧  zzqnoboy@126.com', // 展示的邮箱
  EXAMPLE_ABOUT_GITHUB: 'https://github.com/newrain-zh', // Github 链接指向

  // 赛博朋克霓虹技能栈配置
  EXAMPLE_ABOUT_SKILL_GROUPS: [
    {
      name: 'Backend',
      color: 'emerald', // 可换为 cyan, fuchsia, amber, blue 等 Tailwind 色系
      items: ['Java', 'SpringCloud', 'SpringBoot', 'MyBatis', 'Spring', 'SpringMVC', 'XXL JOB']
    },
    {
      name: 'Database & Search',
      color: 'cyan',
      items: ['MySQL', 'Redis', 'MongoDB', 'ClickHouse', 'StarRocks', 'Elasticsearch']
    },
    {
      name: 'Message Queue & Architecture',
      color: 'fuchsia',
      items: ['Kafka', 'RocketMQ']
    },
    {
      name: 'Scripting & Frontend',
      color: 'amber',
      items: ['HTML', 'Python', 'JavaScript', 'NodeJs', 'Groovy', 'Shell']
    },
    {
      name: 'DevOps & Environments',
      color: 'blue',
      items: ['IntelliJ IDEA', 'macOS', 'VS Code', 'Linux', 'CentOS', 'Docker']
    }
  ]
}
export default CONFIG
