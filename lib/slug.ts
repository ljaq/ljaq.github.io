import fs from 'fs'
import path from 'path'

/**
 * 路由 slug 与文件名统一为 NFC，避免 macOS 文件名（常为 NFD）与浏览器/Next 解码的 URL（常为 NFC）不一致，
 * 导致 `generateStaticParams` 与访问路径对不上、`output: export` 报 missing param。
 */
export function normalizeSlug(s: string): string {
  return s.normalize('NFC')
}

/**
 * 将 `params.slug` 等与磁盘上的 slug 对齐：部分环境（尤其 dev）会把动态段以 percent-encoded 形式传入，
 * 若只做 NFC 会与 `listMdxSlugsFromDir` 得到的 Unicode 不一致，从而误判 `hasPostSlug` / 读不到文件。
 */
export function canonicalSlugFromRoute(s: string): string {
  let t = s.trim()
  try {
    if (/%[0-9A-Fa-f]{2}/.test(t)) {
      t = decodeURIComponent(t)
    }
  } catch {
    /* 非法转义时退回原串 */
  }
  return t.normalize('NFC')
}

/** 列出目录下 .mdx 的规范 slug（NFC） */
export function listMdxSlugsFromDir(absDir: string): string[] {
  if (!fs.existsSync(absDir)) return []
  return fs
    .readdirSync(absDir)
    .filter(f => f.endsWith('.mdx'))
    .map(f => normalizeSlug(f.replace(/\.mdx$/, '')))
}

/** 按 slug 解析实际文件名（支持 NFD/NFC 混用） */
export function readMdxSource(absDir: string, slug: string): string | null {
  const key = canonicalSlugFromRoute(slug)
  const file = fs.readdirSync(absDir).find(f => {
    if (!f.endsWith('.mdx')) return false
    return normalizeSlug(f.slice(0, -4)) === key
  })
  if (!file) return null
  return fs.readFileSync(path.join(absDir, file), 'utf8')
}
