import { SectionLabel, SketchFrame } from '@/components/ui'
import { ContentBleedSection } from '@/components/layout/ContentBleed'
import { SiteShell } from '@/components/layout/SiteShell'

export default function AboutPage() {
  return (
    <SiteShell>
      <ContentBleedSection bleed='both'>
        <SectionLabel index='01'>resume</SectionLabel>
        <h1 className='mt-4 text-4xl font-semibold tracking-tight text-ink md:text-5xl'>关于我</h1>
        <p className='mt-4 max-w-2xl text-lg leading-relaxed text-ink/75'>
          在这里替换为你的经历、教育背景与联系方式。布局沿用站点统一的「手绘边框 + 点阵纸」语言。
        </p>

        <div className='mt-10 space-y-8'>
          <SketchFrame as='section'>
            <SectionLabel index='02'>experience</SectionLabel>
            <ul className='mt-4 space-y-4 text-ink/85'>
              <li>
                <p className='font-medium text-ink'>某公司名称 · 职位</p>
                <p className='text-sm text-ink/55'>2022 — 至今</p>
                <p className='mt-1 leading-relaxed'>简述职责与成果，用数字或链接支撑。</p>
              </li>
              <li>
                <p className='font-medium text-ink'>实习 / 项目</p>
                <p className='text-sm text-ink/55'>2020 — 2022</p>
                <p className='mt-1 leading-relaxed'>...</p>
              </li>
            </ul>
          </SketchFrame>

          <SketchFrame as='section'>
            <SectionLabel index='03'>contact</SectionLabel>
            <p className='mt-4 text-ink/80'>邮箱：you@example.com · GitHub · 微信（按需）</p>
          </SketchFrame>
        </div>
      </ContentBleedSection>
    </SiteShell>
  )
}
