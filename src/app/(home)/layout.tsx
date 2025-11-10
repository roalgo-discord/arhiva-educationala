import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/lib/layout.shared";

export default function Layout({ children }: LayoutProps<"/">) {
  const options = baseOptions();

  return (
    <HomeLayout
      {...options}
      links={[
        ...(options.links || []),
        { url: "/docs/usor", text: "Usor" },
        { url: "/docs/dificil", text: "Dificil" },
        { url: "/docs/avansat", text: "Avansat" },
        { url: "/docs/ai", text: "AI" },
        { url: "/docs/olimpiada", text: "Olimpiada" },
        { url: "/docs/cppintro", text: "C++ Intro" },
      ]}
    >
      {children}
    </HomeLayout>
  );
}
