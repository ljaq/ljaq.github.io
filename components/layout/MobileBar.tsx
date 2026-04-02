'use client'

import { NavLink } from '@/components/ui'
import { SiteLogo } from './SiteLogo'

const links = [
  { href: '/', label: '主页' },
  { href: '/about', label: '简历' },
  { href: '/projects', label: '项目' },
  { href: '/blog', label: '文章' },
]

export function MobileBar() {
  return (
    <div className='sticky top-0 z-40 shrink-0 border-x border-b border-[color:var(--grid-border-color)] bg-[#f7f7f7] dot-grid md:hidden'>
      <div className='flex items-center justify-between gap-3 px-4 py-3'>
        <SiteLogo />
      </div>
      <nav
        className='flex gap-1 overflow-x-auto px-3 pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
        aria-label='主导航'
      >
        {links.map(l => (
          <NavLink key={l.href} href={l.href} className='shrink-0 rounded-md border border-transparent px-3 py-1.5'>
            {l.label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
