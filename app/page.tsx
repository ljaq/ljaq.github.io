import Link from 'next/link'
import { AsciiFramePlayer, Button, GridFrame, SectionLabel, SketchFrame } from '@/components/ui'
import { BleedRule, ContentBleedSection } from '@/components/layout/ContentBleed'
import { SiteShell } from '@/components/layout/SiteShell'
import { getAllPostsMeta } from '@/lib/posts'

export default function HomePage() {
  const latest = getAllPostsMeta().slice(0, 2)

  return (
    <SiteShell>
      <ContentBleedSection bleed='both' className='mb-12 md:mb-16'>
        <GridFrame className='p-0 overflow-hidden'>
          <AsciiFramePlayer className='font-mono text-sm text-neutral-500 whitespace-pre-wrap leading-none text-center' />
        </GridFrame>
        <BleedRule />
        <h1 className='mt-10 max-w-2xl text-3xl font-semibold leading-snug tracking-tight text-ink md:text-[2.35rem] md:leading-tight'>
          Hello,
          <br />
          我是
          <span className='text-accent-magenta'>李佳棋</span>
        </h1>
        <BleedRule />
        <p className='mt-6 max-w-xl text-lg leading-relaxed text-ink/80'>
          全栈 / 产品向开发者（示例）。本站采用{' '}
          <strong className='font-semibold text-accent-red'>Next.js 预渲染</strong>
          、MDX 文章与左侧固定导航；右侧内容区略白于点阵底，标题横线全宽且在侧栏层级之下。
        </p>
        <div className='mt-8 flex flex-wrap gap-3'>
          <Button href='/about' variant='primary'>
            查看简历
          </Button>
          <Button href='/projects' variant='outline'>
            项目作品
          </Button>
          <Button href='/blog' variant='ghost'>
            阅读文章 →
          </Button>
        </div>
      </ContentBleedSection>

      <ContentBleedSection bleed='both' className='mb-16 md:mb-24'>
        <div className='grid gap-8 md:grid-cols-2'>
          <SketchFrame as='section'>
            <SectionLabel index='02'>能力</SectionLabel>
            <h2 className='mt-3 text-2xl font-semibold tracking-tight text-ink'>你能写在这里</h2>
            <ul className='mt-4 space-y-2 text-ink/80'>
              <li className='flex gap-2'>
                <span className='text-ink/40'>—</span>
                前端工程与组件化设计系统
              </li>
              <li className='flex gap-2'>
                <span className='text-ink/40'>—</span>
                Node / 边缘函数与预渲染策略
              </li>
              <li className='flex gap-2'>
                <span className='text-ink/40'>—</span>
                与设计师协作的交付节奏
              </li>
            </ul>
          </SketchFrame>
          <SketchFrame as='section'>
            <SectionLabel index='03'>最近文章</SectionLabel>
            <h2 className='mt-3 text-2xl font-semibold tracking-tight text-ink'>博客</h2>
            {latest.length === 0 ? (
              <p className='mt-4 text-ink/60'>在 content/posts 下添加 .mdx 即可。</p>
            ) : (
              <ul className='mt-4 space-y-3'>
                {latest.map(p => (
                  <li key={p.slug}>
                    <Link
                      href={`/blog/${p.slug}`}
                      className='text-ink underline decoration-dotted decoration-ink/35 underline-offset-4 hover:decoration-accent-magenta'
                    >
                      {p.title}
                    </Link>
                    <p className='text-sm text-ink/50'>{p.date}</p>
                  </li>
                ))}
              </ul>
            )}
            <div className='mt-6'>
              <Button href='/blog' variant='outline'>
                全部文章
              </Button>
            </div>
          </SketchFrame>
        </div>
      </ContentBleedSection>
    </SiteShell>
  )
}
