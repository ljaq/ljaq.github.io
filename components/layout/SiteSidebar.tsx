'use client'

import { DiagonalHatch } from './DiagonalHatch'
import { SidebarMeta } from './SidebarMeta'
import { SketchDivider } from './SketchDivider'
import { SidebarNavItem } from './SidebarNavItem'
import { SiteLogo } from './SiteLogo'
import { SocialSketchGrid } from './SocialSketchGrid'
import { IconArticle, IconFolder, IconHome, IconUser } from '@/components/icons/NavIcons'
import { SidebarClock } from './SidebarClock'
import { FolderTwoTone, HomeTwoTone, IdcardTwoTone, ProfileTwoTone } from '@ant-design/icons'
import { SectionLabel } from '../ui'

export function SiteSidebar() {
  return (
    <aside
      className='z-30 hidden min-h-0 w-[260px] flex-col overflow-hidden border-x border-[color:var(--grid-border-color)] bg-[#f7f7f7] md:fixed md:top-0 md:left-4 md:flex md:h-[100dvh] md:max-h-[100dvh] md:overflow-y-auto md:overscroll-y-none lg:left-[calc(50vw-28rem)]'
      aria-label='站点侧栏'
    >
      <DiagonalHatch patternId='sidebar-hatch' />
      {/* 极轻点阵叠在斜线上 */}
      <div className='dot-grid-sidebar pointer-events-none absolute inset-0 z-[1] opacity-[0.35]' aria-hidden />
      <div className='relative z-10 flex min-h-0 flex-1 flex-col overflow-y-auto pb-2 pt-10'>
        <SiteLogo />

        <SectionLabel className='mt-16'>navigation</SectionLabel>
        <nav className='flex flex-col' aria-label='主导航'>
          <SidebarNavItem href='/' icon={<HomeTwoTone twoToneColor={['#000', '#eaeaea']} />}>
            主页
          </SidebarNavItem>
          <SidebarNavItem href='/about' icon={<IdcardTwoTone twoToneColor={['#000', '#eaeaea']} />}>
            简历
          </SidebarNavItem>
          <SidebarNavItem href='/projects' icon={<FolderTwoTone twoToneColor={['#000', '#eaeaea']} />}>
            项目作品
          </SidebarNavItem>
          <SidebarNavItem href='/blog' icon={<ProfileTwoTone twoToneColor={['#000', '#eaeaea']} />}>
            文章
          </SidebarNavItem>
        </nav>
        <div className='min-h-8 flex-1' aria-hidden />

        <SectionLabel>social</SectionLabel>
        <SocialSketchGrid />
        <SidebarClock />
      </div>
    </aside>
  )
}
