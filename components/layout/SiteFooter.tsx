import { BleedRule, ContentBleedSection } from './ContentBleed'
import { SketchDivider } from './SketchDivider'

export function SiteFooter() {
  return (
    <ContentBleedSection bleed='top'>
      <footer className='mt-auto px-6 py-2 md:px-8 lg:px-10'>
        <div className='flex max-w-3xl flex-col gap-3 text-xs text-ink/45 md:flex-row md:items-center md:justify-between'>
          <p className='font-mono tracking-wider'>© {new Date().getFullYear()} 李佳棋 · Next.js SSG / MDX</p>
        </div>
      </footer>
    </ContentBleedSection>
  )
}
