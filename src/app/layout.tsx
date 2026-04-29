import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { personalInfo } from "@/config/personal";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://ahmed-ali-portfolio.vercel.app"
  ),
  title: {
    default: `${personalInfo.name} — Software Engineer & Cybersecurity`,
    template: `%s | ${personalInfo.name}`,
  },
  description:
    "Ahmed Ali — Software Engineer at FAST NUCES specializing in Cybersecurity, AI/ML, and Cloud Infrastructure. Creator of DeceptiCloud, an AI-driven cyber deception platform.",
  keywords: [
    "Ahmed Ali",
    "Software Engineer",
    "Cybersecurity",
    "Machine Learning",
    "AI",
    "FAST NUCES",
    "Pakistan",
    "Portfolio",
    "DeceptiCloud",
    "Full Stack Developer",
    "DevOps",
    "Cloud",
    "Docker",
    "Kubernetes",
  ],
  authors: [{ name: personalInfo.name, url: personalInfo.social.github }],
  creator: personalInfo.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    title: `${personalInfo.name} — Software Engineer & Cybersecurity`,
    description:
      "Software Engineering student at FAST NUCES. Building AI-driven cybersecurity systems, ML pipelines, and full-stack applications.",
    siteName: `${personalInfo.name} Portfolio`,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${personalInfo.name} Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${personalInfo.name} — Software Engineer`,
    description: "Building at the intersection of AI, Cybersecurity & Cloud.",
    images: ["/og-image.png"],
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
    google: undefined,
  },
};

export const viewport: Viewport = {
  themeColor: "#03020d",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        {gaId && <GoogleAnalytics measurementId={gaId} />}
        {children}
      </body>
    </html>
  );
}
