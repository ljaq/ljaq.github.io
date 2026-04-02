import { Button } from "@/components/ui";
import { ContentBleedSection } from "@/components/layout/ContentBleed";
import { SiteShell } from "@/components/layout/SiteShell";

export default function NotFound() {
  return (
    <SiteShell>
      <ContentBleedSection bleed="both">
      <h1 className="text-4xl font-semibold tracking-tight text-ink">404</h1>
      <p className="mt-4 text-ink/70">这一页还没有被画出来。</p>
      <div className="mt-8">
        <Button href="/" variant="primary">
          回首页
        </Button>
      </div>
      </ContentBleedSection>
    </SiteShell>
  );
}
