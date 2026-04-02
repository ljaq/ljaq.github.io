import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Button, SectionLabel } from "@/components/ui";
import { BleedRule, ContentBleedSection } from "@/components/layout/ContentBleed";
import { SiteShell } from "@/components/layout/SiteShell";
import {
  getCompiledProject,
  getProjectSlugs,
} from "@/lib/projects-mdx";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!getProjectSlugs().includes(slug)) return {};
  const { frontmatter } = await getCompiledProject(slug);
  return {
    title: frontmatter.title,
    description: frontmatter.description,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  if (!getProjectSlugs().includes(slug)) notFound();

  const { content, frontmatter } = await getCompiledProject(slug);

  return (
    <SiteShell>
      <ContentBleedSection bleed="both">
      <header className="relative mb-12 pb-10">
        <SectionLabel index="01">项目</SectionLabel>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
          {frontmatter.title}
        </h1>
        <BleedRule className="mt-6" />
        <p className="mt-6 font-mono text-sm text-ink/45">{frontmatter.date}</p>
        {frontmatter.role ? (
          <p className="mt-2 text-ink/70">角色：{frontmatter.role}</p>
        ) : null}
        <p className="mt-4 max-w-2xl text-lg text-ink/75">
          {frontmatter.description}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {frontmatter.link ? (
            <Button href={frontmatter.link} variant="primary">
              打开链接
            </Button>
          ) : null}
          <Button href="/projects" variant="outline">
            返回列表
          </Button>
        </div>
      </header>
      <article className="article-mdx max-w-3xl">{content}</article>
      </ContentBleedSection>
    </SiteShell>
  );
}
