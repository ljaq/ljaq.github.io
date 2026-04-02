import type { Metadata } from "next";
import { fontBody, fontMono } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "你的名字 · 简历与作品",
    template: "%s · 你的名字",
  },
  description: "手绘线条风格的个人网站：简历、项目与 MDX 文章。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${fontBody.variable} ${fontMono.variable} min-h-dvh overflow-x-hidden font-sans antialiased md:h-screen md:overflow-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
