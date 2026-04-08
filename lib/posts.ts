import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { mdxComponents } from '@/lib/mdx-components'
import { canonicalSlugFromRoute, listMdxSlugsFromDir, readMdxSource } from '@/lib/slug'

const POSTS_DIR = path.join(process.cwd(), 'content/posts')

export type PostFrontmatter = {
  title: string
  description: string
  date: string
  tags?: string[]
}

function readSource(slug: string): string {
  const src = readMdxSource(POSTS_DIR, slug)
  if (!src) throw new Error(`Post not found: ${slug}`)
  return src
}

export function getPostSlugs(): string[] {
  return listMdxSlugsFromDir(POSTS_DIR)
}

/** 是否存在该文章（slug 与磁盘 NFC 对齐，含 URL 编码与 NFC） */
export function hasPostSlug(slug: string): boolean {
  const key = canonicalSlugFromRoute(slug)
  return getPostSlugs().some(s => s === key)
}

export function getAllPostsMeta(): (PostFrontmatter & { slug: string })[] {
  return getPostSlugs()
    .map(slug => {
      const { data } = matter(readSource(slug))
      return { slug, ...(data as PostFrontmatter) }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getCompiledPost(slug: string) {
  const source = readSource(slug)
  return compileMDX<PostFrontmatter>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: { remarkPlugins: [remarkGfm] },
    },
    components: mdxComponents,
  })
}
