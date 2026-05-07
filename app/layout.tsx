import type { Metadata, Viewport } from "next"
import { Inter, Inter_Tight, Open_Sans, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { PageTransitionOverlay } from "@/components/manual"
import "./globals.css"
import "./recall/recall.css"

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
})

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter-tight",
})

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-open-sans",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
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
    <html lang="en" className={`${inter.variable} ${interTight.variable} ${openSans.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased min-h-screen" style={{ background: '#06060A', color: '#fff' }}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function () {
              if (typeof window === 'undefined') return;
              if (!window.location.hash || window.location.hash.indexOf('figmacapture') === -1) return;
              document.documentElement.classList.add('figma-capture-mode');

              // Inject the Figma html-to-design capture script only when this
              // page is opened with #figmacapture in the URL. Keeps the
              // third-party script off every production visit.
              var external = document.createElement('script');
              external.src = 'https://mcp.figma.com/mcp/html-to-design/capture.js';
              external.async = true;
              document.head.appendChild(external);

              function forceReveal() {
                document.querySelectorAll('[data-reveal]').forEach(function (el) {
                  el.setAttribute('data-revealed', 'true');
                });
                document.querySelectorAll('.sec').forEach(function (el) {
                  el.classList.add('vis');
                });
                document.querySelectorAll('[style*="opacity: 0"], [style*="opacity:0"]').forEach(function (el) {
                  el.style.opacity = '1';
                  el.style.transform = 'none';
                });
              }

              function autoScroll(done) {
                var step = Math.max(window.innerHeight * 0.5, 300);
                var pos = 0;
                var iv = setInterval(function () {
                  pos += step;
                  window.scrollTo(0, pos);
                  forceReveal();
                  if (pos >= document.documentElement.scrollHeight) {
                    clearInterval(iv);
                    setTimeout(function () {
                      forceReveal();
                      window.scrollTo(0, 0);
                      forceReveal();
                      if (done) done();
                    }, 300);
                  }
                }, 60);
              }

              function start() {
                forceReveal();
                setTimeout(function () {
                  forceReveal();
                  autoScroll(function () {
                    forceReveal();
                    setInterval(forceReveal, 200);
                  });
                }, 600);
              }

              if (document.readyState === 'complete') start();
              else window.addEventListener('load', start);
            })();
          `,
          }}
        />
        <div className="page-glow" aria-hidden="true" />
        <div className="noise" aria-hidden="true" />
        {children}
        <PageTransitionOverlay />
        <Analytics />
      </body>
    </html>
  )
}
