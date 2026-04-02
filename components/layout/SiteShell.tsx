import { MobileBar } from "./MobileBar";
import { SiteFooter } from "./SiteFooter";
import { SiteSidebar } from "./SiteSidebar";

type SiteShellProps = {
  children: React.ReactNode;
};

/**
 * 居中外壳：`mx-2 max-w-4xl md:mx-4 md:flex-row lg:mx-auto` ——
 * 菜单+内容整体居中，两侧留白露点阵底；侧栏 z-30、主栏 z-10、独立滚动。
 */
export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="dot-grid flex h-[100dvh] min-h-0 flex-col overflow-hidden">
      <MobileBar />
      {/* 与站点 HTML 一致：居中容器包裹侧栏 + 主内容，非全宽铺满 */}
      <div className="mx-2 flex min-h-0 min-w-0 w-full max-w-4xl flex-1 flex-col md:mx-4 md:flex-row md:gap-4 lg:mx-auto">
        <SiteSidebar />
        <div className="relative z-10 flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto overscroll-y-none border-x border-[color:var(--grid-border-color)] bg-[var(--content-bg)]">
          <main className="relative z-10 flex-1 px-6 py-8 md:px-8 md:py-10 lg:px-10 lg:py-10">
            {children}
          </main>
          <SiteFooter />
        </div>
      </div>
    </div>
  );
}
