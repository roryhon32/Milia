import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import ScrollProgress from "@/components/ScrollProgress";
import GsapHoverProvider from "@/components/GsapHoverProvider";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#FBF9F5",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "LUMIÈRE — Arquitetura Contemporânea",
  description:
    "Estúdio de arquitetura contemporânea focado na harmonia entre luz, matéria e contexto. Projetos residenciais, comerciais e interiores.",
  keywords: [
    "Lumière Arquitetura",
    "arquitetura contemporânea",
    "design de interiores",
    "arquitetura residencial",
    "Bahia",
    "projetos autorais",
    "estúdio de arquitetura",
  ],
  authors: [{ name: "Lumière Arquitetura" }],
  openGraph: {
    title: "LUMIÈRE — Arquitetura Contemporânea",
    description: "Espaços que atravessam o tempo.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      data-scroll-behavior="smooth"
      className={`${playfair.variable} ${inter.variable}`}
    >
      <body className="min-h-screen bg-[#FBF9F5] text-[#1C1B19] font-sans antialiased selection:bg-[#EAE4D9] selection:text-[#181614] overflow-x-hidden">
        <ScrollProgress />
        <GsapHoverProvider>{children}</GsapHoverProvider>
      </body>
    </html>
  );
}
