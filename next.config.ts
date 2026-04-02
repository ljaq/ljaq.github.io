import type { NextConfig } from 'next'

/**
 * GitHub Pages 项目站地址为 https://<user>.github.io/<repo>/
 * 必须设置与仓库名一致的 basePath，否则 CSS/JS 会请求到站点根路径，导航也会跳到错误 URL。
 * 若仓库改名，请同步修改此处（或通过环境变量 PAGES_BASE_PATH 覆盖）。
 */
const basePath = process.env.PAGES_BASE_PATH ?? '/note'

const nextConfig: NextConfig = {
  output: 'export',
  /** 静态导出目录；中间构建仍写入项目根下的 `.next` */
  distDir: 'docs',
  basePath,
  /** 勿与 GitHub Pages 子路径同时使用 `./` 的 assetPrefix，否则资源路径会错乱 */
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

export default nextConfig
