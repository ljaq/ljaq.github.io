import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { SectionLabel } from '@/components/ui'
import { BleedRule, ContentBleedSection } from '@/components/layout/ContentBleed'
import { SiteShell } from '@/components/layout/SiteShell'
import { getCompiledPost, getPostSlugs, hasPostSlug } from '@/lib/posts'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getPostSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  if (!hasPostSlug(slug)) return {}
  const { frontmatter } = await getCompiledPost(slug)
  return {
    title: frontmatter.title,
    description: frontmatter.description,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  if (!hasPostSlug(slug)) notFound()

  const { content, frontmatter } = await getCompiledPost(slug)

  return (
    <SiteShell>
      <ContentBleedSection bleed='both'>
        <header className='relative mb-12 pb-10'>
          <SectionLabel index='01'>文章</SectionLabel>
          <h1 className='mt-4 break-words text-4xl font-semibold leading-tight tracking-tight text-ink md:text-5xl'>
            {frontmatter.title}
          </h1>
          <BleedRule className='mt-6' />
          <p className='mt-6 font-mono text-sm text-ink/45'>{frontmatter.date}</p>
          <p className='mt-4 max-w-2xl text-lg text-ink/70'>{frontmatter.description}</p>
          {frontmatter.tags && frontmatter.tags.length > 0 ? (
            <ul className='mt-6 flex flex-wrap gap-2'>
              {frontmatter.tags.map(tag => (
                <li
                  key={tag}
                  className='rounded-full border border-dashed border-ink/25 px-3 py-1 font-mono text-xs text-ink/60'
                >
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}
        </header>
        <article className='article-mdx max-w-3xl'>{content}</article>
      </ContentBleedSection>
    </SiteShell>
  )
}
