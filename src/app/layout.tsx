import "@/app/global.css";
import "katex/dist/katex.css";
import { RootProvider } from "fumadocs-ui/provider/next";
import localFont from "next/font/local";
import { DocsLayout } from "@/components/layout/docs";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";

const inter = localFont({
  src: [
    {
      path: "../../public/Inter-VariableFont_opsz,wght.ttf",
    },
    {
      path: "../../public/Inter-Italic-VariableFont_opsz,wght.ttf",
      style: "italic",
    },
  ],
});

export default function Layout({ children }: LayoutProps<"/">) {
  const { nav, ...base } = baseOptions();
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>
          <DocsLayout
            tree={source.pageTree}
            tabMode="navbar"
            nav={{ ...nav, mode: "top" }}
            {...base}
          >
            {children}
          </DocsLayout>
        </RootProvider>
      </body>
    </html>
  );
}
