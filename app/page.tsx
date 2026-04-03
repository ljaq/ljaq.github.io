import Link from 'next/link'
import { AsciiFramePlayer, Button, GridFrame, SectionLabel, SketchFrame } from '@/components/ui'
import { BleedRule, ContentBleedSection } from '@/components/layout/ContentBleed'
import { SiteShell } from '@/components/layout/SiteShell'
import { getAllPostsMeta } from '@/lib/posts'
import TextType from '@/components/ui/TextType'

export default function HomePage() {
  const latest = getAllPostsMeta().slice(0, 2)

  return (
    <SiteShell>
      <SectionLabel index='01'>home</SectionLabel>
      <ContentBleedSection bleed='both' className='mb-12 md:mb-16'>
        <GridFrame className='p-0 overflow-hidden border-0'>
          <AsciiFramePlayer className='font-mono text-sm text-neutral-500 whitespace-pre-wrap leading-none text-center' />
        </GridFrame>
        <BleedRule />
        <h1 className='mt-10 px-1 max-w-2xl text-3xl font-semibold leading-snug tracking-tight text-ink md:text-[2.35rem] md:leading-tight'>
          {/* Hello,
          <br />
          我是
          <span className='text-accent-magenta'>李佳棋</span> */}
          <TextType
            loop={true}
            showCursor
            cursorCharacter='_'
            text={['Hello,', '我是', '李佳棋']}
            textColors={['#000000', '#000000', '#e01e5a']}
          />
        </h1>
        <BleedRule />
        <p className='mt-4 px-1 max-w-xl text-lg text-ink/80 text-justify'>
          多年前端/全栈开发经验，具备独立负责大型项目、进行技术选型和架构设计的能力。
        </p>
        <div className='mt-8 flex flex-wrap gap-3 transform translate-y-px'>
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
            <SectionLabel index='02'>ability</SectionLabel>
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
            <SectionLabel index='03'>recent</SectionLabel>
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
