import React from "react"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import './globals.css'

const _inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Remote Patient Monitoring for Physiotherapy Clinics | Pocket Physio',
  description: 'Pocket Physio captures what happens between appointments. AI-powered WhatsApp check-ins give physiotherapists real-time clinical intelligence — who\'s progressing, who\'s dropping off, and who needs a call today.',
  metadataBase: new URL('https://pocketphysio.uk'),
  alternates: {
    canonical: '/',
  },
  authors: [{ name: 'Karam', url: 'https://pocketphysio.uk' }],
  category: 'healthcare technology',
  keywords: [
    'remote patient monitoring physiotherapy',
    'remote therapeutic monitoring',
    'RTM physiotherapy',
    'physiotherapy patient monitoring software',
    'WhatsApp patient monitoring',
    'between appointment monitoring',
    'physiotherapy practice management software UK',
    'digital physiotherapy platform',
    'patient engagement physiotherapy',
    'MSK remote monitoring UK',
    'clinical intelligence physiotherapy',
    'patient dropout prevention',
    'physiotherapy software UK',
    'exercise adherence monitoring',
    'rehabilitation remote monitoring',
    'digital MSK UK',
    'NHS physiotherapy software',
    'home exercise program monitoring',
    'HEP compliance tracking',
    'exercise prescription software',
    'exercise reminders physiotherapy',
    'PhysiTrack integration',
    'Rehab Guru integration',
    'Cliniko physiotherapy',
    'exercise delivery platform',
    'patient outcome monitoring',
    'PROM collection physiotherapy',
  ],
  openGraph: {
    type: 'website',
    url: 'https://pocketphysio.uk',
    title: 'Remote Patient Monitoring for Physiotherapy Clinics | Pocket Physio',
    description: 'AI-powered WhatsApp check-ins that turn what happens between appointments into clinical intelligence your physios can act on. Built by an NHS physiotherapist.',
    siteName: 'Pocket Physio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Pocket Physio — Clinical Intelligence for Physiotherapy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Remote Patient Monitoring for Physiotherapy Clinics | Pocket Physio',
    description: 'AI-powered WhatsApp check-ins that give physiotherapists real-time clinical intelligence between appointments.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-GB">
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        <Toaster />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
