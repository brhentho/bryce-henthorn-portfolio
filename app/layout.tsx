import type { Metadata, Viewport } from "next"
import { Poppins, Open_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-open-sans",
})

export const metadata: Metadata = {
  title: "Bryce Henthorn — Senior UX/Product Designer",
  description:
    "Designing human-AI systems at enterprise scale in Windows. Senior UX/Product Designer focused on interaction architecture, ambient agents, and scalable system design.",
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0B0B0D",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${openSans.variable} bg-background`}>
      <body className="font-sans antialiased bg-background text-foreground min-h-screen">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
