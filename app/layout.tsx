import type { Metadata, Viewport } from "next"
import { Inter, Inter_Tight } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
})

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter-tight",
})

export const metadata: Metadata = {
  title: "Bryce Henthorn | Senior UX/Product Designer",
  description:
    "Designing human-AI systems at enterprise scale in Windows. Senior UX/Product Designer focused on interaction architecture, ambient agents, and scalable system design.",
  icons: {
    icon: [
      { url: "/images/projects/favicons/Favicon-Light.png", media: "(prefers-color-scheme: light)" },
      { url: "/images/projects/favicons/Favicon-Dark.png", media: "(prefers-color-scheme: dark)" },
    ],
    apple: "/images/projects/favicons/Favicon-Light.png",
  },
  openGraph: {
    title: "Bryce Henthorn | Senior UX/Product Designer",
    description:
      "Designing human-AI systems at enterprise scale in Windows. Senior UX/Product Designer focused on interaction architecture, ambient agents, and scalable system design.",
    type: "website",
    url: "https://bhenthorn.com",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B0B0D",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable}`}>
      <body className="antialiased min-h-screen" style={{ background: '#06060A', color: '#fff' }}>
        <div className="noise" aria-hidden="true" />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
