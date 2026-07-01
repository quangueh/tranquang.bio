import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Cursor } from "@/components/cursor";

const geistSans = Geist({ variable: "--font-geist", subsets: ["latin", "latin-ext"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"], display: "swap" });

const siteUrl = "https://tranquang.bio";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Quang Tran — ERP Developer & AI Engineer",
    template: "%s · Quang Tran",
  },
  description:
    "Personal portfolio of Quang Tran — ERP Developer, AI Engineer, SQL Expert and Automation Builder. Building modern, high-performance systems.",
  keywords: ["Quang Tran", "ERP Developer", "AI Engineer", "SQL Server", "Automation", "Portfolio", ".NET", "Python"],
  authors: [{ name: "Quang Tran" }],
  creator: "Quang Tran",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    alternateLocale: "en_US",
    url: siteUrl,
    title: "Quang Tran — ERP Developer & AI Engineer",
    description: "ERP Developer, AI Engineer, SQL Expert and Automation Builder.",
    siteName: "Quang Tran",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Quang Tran" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quang Tran — ERP Developer & AI Engineer",
    description: "ERP Developer, AI Engineer, SQL Expert and Automation Builder.",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: siteUrl },
};

export const viewport: Viewport = {
  themeColor: "#050816",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='light'||(!t&&!d)){document.documentElement.classList.add('light')}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen antialiased cursor-none-fine">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Quang Tran",
              url: siteUrl,
              jobTitle: "ERP Developer & AI Engineer",
              knowsAbout: ["ERP", "SQL Server", "AI", "Automation", ".NET", "Python"],
              sameAs: ["https://github.com/", "https://linkedin.com/"],
            }),
          }}
        />
        <ThemeProvider>
          <Cursor />
          <SmoothScroll>{children}</SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
