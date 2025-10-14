import type React from "react"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Landmark Technologies | DevOps E. Degree Training",
  description:
    "Transform your career with hands-on DevOps training from basic to expert level. $3,000 comprehensive program with job assistance and real-world projects.",
  keywords: "DevOps training, DevOps certification, AWS training, Kubernetes, Docker, Jenkins, CI/CD, DevOps bootcamp",
  openGraph: {
    title: "Landmark Technologies | DevOps E. Degree Training",
    description: "Transform your career with hands-on DevOps training from basic to expert level.",
    type: "website",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
