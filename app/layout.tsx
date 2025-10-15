import type React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import StructuredData from "@/components/structured-data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Landmark Technologies | DevOps E. Degree Training",
  description:
    "Transform your career with hands-on DevOps training from basic to expert level. $3,000 comprehensive program with job assistance and real-world projects.",
  keywords:
    "DevOps training, DevOps certification, AWS training, Kubernetes, Docker, Jenkins, CI/CD, DevOps bootcamp, Linux training, Cloud computing",
  authors: [{ name: "Landmark Technologies" }],
  creator: "Landmark Technologies",
  publisher: "Landmark Technologies",
  icons: {
    icon: "/landmark-tech-logo.png",
    shortcut: "/landmark-tech-logo.png",
    apple: "/landmark-tech-logo.png",
  },
  openGraph: {
    title: "Landmark Technologies | DevOps E. Degree Training",
    description:
      "Transform your career with hands-on DevOps training from basic to expert level. $3,000 comprehensive program with job assistance and real-world projects.",
    type: "website",
    locale: "en_US",
    siteName: "Landmark Technologies",
    images: [
      {
        url: "/landmark-tech-logo.png",
        width: 1200,
        height: 630,
        alt: "Landmark Technologies - DevOps Training Since 2005",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Landmark Technologies | DevOps E. Degree Training",
    description:
      "Transform your career with hands-on DevOps training from basic to expert level. $3,000 comprehensive program with job assistance.",
    images: ["/landmark-tech-logo.png"],
    creator: "@LandmarkTech",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Replace with actual code from Google Search Console
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" type="image/png" href="/landmark-tech-logo.png" />
        <link
          rel="shortcut icon"
          type="image/png"
          href="/landmark-tech-logo.png"
        />
        <link rel="apple-touch-icon" href="/landmark-tech-logo.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#667eea" />
      </head>
      <body>
        <StructuredData />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
