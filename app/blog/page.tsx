import Link from 'next/link'
import type { Metadata } from 'next'
import { SectionLabel, SketchFrame } from '@/components/ui'
import { ContentBleedSection } from '@/components/layout/ContentBleed'
import { SiteShell } from '@/components/layout/SiteShell'
import { getAllPostsMeta } from '@/lib/posts'

export const metadata: Metadata = {
  title: '文章',
  description: 'MDX 书写的技术文章与笔记。',
}

export default function BlogIndexPage() {
  const posts = getAllPostsMeta()

  return (
    <SiteShell>
      <ContentBleedSection bleed='both'>
        <SectionLabel index='01'>博客</SectionLabel>
        <ContentBleedSection bleed='both' className='mt-14'>
          <h1 className='text-4xl font-semibold tracking-tight text-ink md:text-5xl'>文章</h1>
        </ContentBleedSection>
        <p className='mt-4 max-w-xl text-ink/70'>
          源文件为 MDX，构建时静态生成；支持 frontmatter 与 GitHub Flavored Markdown。
        </p>

        <ul className='mt-12 space-y-6'>
          {posts.map(post => (
            <li key={post.slug}>
              <SketchFrame as='article'>
                <Link
                  href={`/blog/${post.slug}`}
                  className='text-2xl font-semibold tracking-tight text-ink underline decoration-dotted decoration-ink/30 underline-offset-[6px] hover:decoration-accent-magenta'
                >
                  {post.title}
                </Link>
                <p className='mt-2 text-sm text-ink/50'>{post.date}</p>
                <p className='mt-2 leading-relaxed text-ink/75'>{post.description}</p>
              </SketchFrame>
            </li>
          ))}
        </ul>
      </ContentBleedSection>
    </SiteShell>
  )
}
