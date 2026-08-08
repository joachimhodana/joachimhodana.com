import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistPixelGrid } from "geist/font/pixel"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://joachimhodana.com"),
  title: {
    default: "Joachim Hodana - Senior Data Engineer",
    template: "%s - Joachim Hodana",
  },
  description:
    "Senior Data Engineer specializing in dbt, Airflow, Snowflake, and BigQuery. Available for collaborations and opportunities.",
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
    title: "Joachim Hodana - Senior Data Engineer",
    description:
      "Senior Data Engineer specializing in dbt, Airflow, Snowflake, and BigQuery.",
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
    title: "Joachim Hodana - Senior Data Engineer",
    description:
      "Senior Data Engineer specializing in dbt, Airflow, Snowflake, and BigQuery.",
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
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistPixelGrid.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
