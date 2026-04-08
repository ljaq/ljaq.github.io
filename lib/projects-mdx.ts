import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { mdxComponents } from '@/lib/mdx-components'
import { canonicalSlugFromRoute, listMdxSlugsFromDir, readMdxSource } from '@/lib/slug'

const PROJECTS_DIR = path.join(process.cwd(), 'content/projects')

export type ProjectFrontmatter = {
  title: string
  description: string
  date: string
  role?: string
  stack?: string[]
  link?: string
}

function readSource(slug: string): string {
  const src = readMdxSource(PROJECTS_DIR, slug)
  if (!src) throw new Error(`Project not found: ${slug}`)
  return src
}

export function getProjectSlugs(): string[] {
  return listMdxSlugsFromDir(PROJECTS_DIR)
}

export function hasProjectSlug(slug: string): boolean {
  const key = canonicalSlugFromRoute(slug)
  return getProjectSlugs().some(s => s === key)
}

export function getAllProjectsMeta(): (ProjectFrontmatter & { slug: string })[] {
  return getProjectSlugs()
    .map(slug => {
      const { data } = matter(readSource(slug))
      return { slug, ...(data as ProjectFrontmatter) }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getCompiledProject(slug: string) {
  const source = readSource(slug)
  return compileMDX<ProjectFrontmatter>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: { remarkPlugins: [remarkGfm] },
    },
    components: mdxComponents,
  })
}
