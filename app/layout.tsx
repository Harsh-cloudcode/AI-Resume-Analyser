import { Analytics } from "@vercel/analytics/next"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ variable: "--font-geist-sans", subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ResumeAI - AI Resume Analyzer",
  description: "AI-powered resume analysis and candidate evaluation platform",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-background">{children}</body>
    </html>
  )
}
