import { MobileBar } from './MobileBar'
import { SiteFooter } from './SiteFooter'
import { SiteSidebar } from './SiteSidebar'

type SiteShellProps = {
  children: React.ReactNode
}

/**
 * 居中外壳：滚动在 document（html/body）。
 * 外层用块级堆叠，勿对整页再套 flex-col——否则主栏上 flex-1 在移动端会沿「竖轴」生效，父高为 auto 时易把高度算死、无法纵向滚动。
 * 主栏 flex-1 仅 md+（横向占满剩余宽度）；小屏单列不设 flex-1。
 */
export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className='dot-grid min-h-dvh'>
      <MobileBar />
      <div className='mx-2 w-full max-w-4xl md:mx-4 lg:mx-auto'>
        <SiteSidebar />
        <div className='relative z-10 flex min-h-[100vh] min-w-0 flex-col border-x border-[color:var(--grid-border-color)] bg-[var(--content-bg)] md:ml-[calc(260px+1rem)] md:w-[calc(100%-260px-1rem)] md:min-w-0'>
          <main
            className='relative z-10 px-4 py-8 md:px-8 md:py-10 lg:px-4 lg:py-10 [--bleed-shift:calc(0.5rem+1px+1.5rem)] md:[--bleed-shift:calc(1rem+260px+1rem+1px+2rem)] lg:[--bleed-shift:calc(50vw-28rem+260px+1rem+1px+2.5rem)]'
          >
            <div className='absolute h-dvh left-4 top-0 w-px bg-[color:var(--grid-border-color)]'></div>
            {children}
            <div className='absolute h-dvh right-4 top-0 w-px bg-[color:var(--grid-border-color)]'></div>
          </main>
          <SiteFooter />
        </div>
      </div>
    </div>
  )
}
