import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://joachimhodana.com"),
  title: {
    default: "Joachim Hodana — Software & Data Engineer",
    template: "%s — Joachim Hodana",
  },
  description:
    "Software and Data Engineer specializing in Python, TypeScript, React, and data pipelines. Available for collaborations and opportunities.",
  applicationName: "joachimhodana.com",
  authors: [{ name: "Joachim Hodana", url: "https://joachimhodana.com" }],
  creator: "Joachim Hodana",
  publisher: "Joachim Hodana",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: "https://joachimhodana.com/",
    title: "Joachim Hodana — Software & Data Engineer",
    description:
      "Software and Data Engineer specializing in Python, TypeScript, React, and data pipelines.",
    siteName: "joachimhodana.com",
    images: [
      {
        url: "/placeholder.jpg",
        width: 1200,
        height: 630,
        alt: "Joachim Hodana Portfolio",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@joachimhodana",
    creator: "@joachimhodana",
    title: "Joachim Hodana — Software & Data Engineer",
    description:
      "Software and Data Engineer specializing in Python, TypeScript, React, and data pipelines.",
    images: ["/placeholder.jpg"],
  },
  icons: {
    icon: "/placeholder-logo.png",
    shortcut: "/placeholder-logo.png",
    apple: "/placeholder-logo.png",
  },
  category: "technology",
  generator: "Next.js",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
