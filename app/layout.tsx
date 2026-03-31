import { LenisScroll } from "@/components/global";
import { siteConfig } from "@/data/site.config";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Outfit, Syne } from "next/font/google";
import "./globals.css";
import { Footer, Navbar } from "@/components/layout";
import FABGroup from "@/components/global/FABGroup";
import NavbarTwo from "@/components/layout/NavbarTwo";

const fontSans = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const fontSerif = Syne({
  subsets: ["latin"],
  variable: "--font-serif",
});

const fontCode = Syne({
  subsets: ["latin"],
  variable: "--font-code",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable} ${fontInter.variable} ${fontCode.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LenisScroll />
        <NavbarTwo/>
        {children}
        <Footer />
        <FABGroup />
      </body>
    </html>
  );
}
