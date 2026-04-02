import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/lib/mdx-components";

const PROJECTS_DIR = path.join(process.cwd(), "content/projects");

export type ProjectFrontmatter = {
  title: string;
  description: string;
  date: string;
  role?: string;
  stack?: string[];
  link?: string;
};

function readSource(slug: string): string {
  return fs.readFileSync(path.join(PROJECTS_DIR, `${slug}.mdx`), "utf8");
}

export function getProjectSlugs(): string[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getAllProjectsMeta(): (ProjectFrontmatter & { slug: string })[] {
  return getProjectSlugs()
    .map((slug) => {
      const { data } = matter(readSource(slug));
      return { slug, ...(data as ProjectFrontmatter) };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getCompiledProject(slug: string) {
  const source = readSource(slug);
  return compileMDX<ProjectFrontmatter>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: { remarkPlugins: [remarkGfm] },
    },
    components: mdxComponents,
  });
}
