import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/lib/mdx-components";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

export type PostFrontmatter = {
  title: string;
  description: string;
  date: string;
  tags?: string[];
};

function readSource(slug: string): string {
  return fs.readFileSync(path.join(POSTS_DIR, `${slug}.mdx`), "utf8");
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getAllPostsMeta(): (PostFrontmatter & { slug: string })[] {
  return getPostSlugs()
    .map((slug) => {
      const { data } = matter(readSource(slug));
      return { slug, ...(data as PostFrontmatter) };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getCompiledPost(slug: string) {
  const source = readSource(slug);
  return compileMDX<PostFrontmatter>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: { remarkPlugins: [remarkGfm] },
    },
    components: mdxComponents,
  });
}
