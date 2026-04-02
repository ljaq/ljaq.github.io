import { DiagonalHatch } from "./DiagonalHatch";
import { SidebarMeta } from "./SidebarMeta";
import { SketchDivider } from "./SketchDivider";
import { SidebarNavItem } from "./SidebarNavItem";
import { SiteLogo } from "./SiteLogo";
import { SocialSketchGrid } from "./SocialSketchGrid";
import {
  IconArticle,
  IconFolder,
  IconHome,
  IconUser,
} from "@/components/icons/NavIcons";

export function SiteSidebar() {
  return (
    <aside className="relative z-30 hidden h-full min-h-0 w-[min(100%,260px)] shrink-0 flex-col overflow-hidden border-x border-[color:var(--grid-border-color)] bg-[#f7f7f7] md:flex md:h-[100dvh] md:overflow-y-auto md:overscroll-y-none">
      <DiagonalHatch patternId="sidebar-hatch" />
      {/* 极轻点阵叠在斜线上 */}
      <div className="dot-grid-sidebar pointer-events-none absolute inset-0 z-[1] opacity-[0.35]" aria-hidden />
      <div className="relative z-10 flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-6">
        <SiteLogo />
        <SketchDivider className="my-5" />
        <nav className="flex flex-col" aria-label="主导航">
          <SidebarNavItem href="/" icon={<IconHome />}>
            主页
          </SidebarNavItem>
          <SidebarNavItem href="/about" icon={<IconUser />}>
            简历
          </SidebarNavItem>
          <SidebarNavItem href="/projects" icon={<IconFolder />}>
            项目作品
          </SidebarNavItem>
          <SidebarNavItem href="/blog" icon={<IconArticle />}>
            文章
          </SidebarNavItem>
        </nav>
        <div className="min-h-8 flex-1" aria-hidden />
        <SketchDivider className="mb-4" />
        <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">
          social
        </p>
        <SocialSketchGrid />
        <SketchDivider className="my-5" />
        <SidebarMeta />
      </div>
    </aside>
  );
}
