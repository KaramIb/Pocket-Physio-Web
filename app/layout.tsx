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
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
      {
        url: '/icon-light-32x32.svg',
        sizes: '32x32',
        type: 'image/svg+xml',
      },
    ],
    apple: '/icon.svg',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://pocketphysio.uk/#software',
      name: 'Pocket Physio',
      url: 'https://pocketphysio.uk',
      description:
        'Pocket Physio is a clinical signal intelligence platform for physiotherapy. It captures patient conversations via WhatsApp between appointments, extracts clinical data using AI, and delivers actionable intelligence to physiotherapists — who is progressing, who is at risk of dropping out, and who needs immediate attention.',
      applicationCategory: 'HealthApplication',
      operatingSystem: 'Web, WhatsApp',
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        areaServed: ['GB', 'US', 'AU'],
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'GBP',
        },
      },
      featureList: [
        'WhatsApp patient check-ins with 98% open rate',
        'AI-generated clinical briefings before appointments',
        'Real-time pain and symptom monitoring',
        'Patient dropout prediction and prevention',
        'Deterministic safety gate for red-flag symptoms',
        'Full audit trail for GDPR compliance',
        'Remote therapeutic monitoring (RTM)',
        'Home exercise program adherence tracking',
        'Clinical action queue for physiotherapists',
        'Patient engagement monitoring',
      ],
      audience: {
        '@type': 'Audience',
        audienceType: 'Physiotherapists, Physiotherapy Clinics, NHS, Private Clinics, Sports Physiotherapy',
      },
      creator: {
        '@type': 'Person',
        '@id': 'https://pocketphysio.uk/#founder',
        name: 'Karam',
        jobTitle: 'NHS Physiotherapist & Founder',
        worksFor: {
          '@type': 'Organization',
          name: 'Pocket Physio',
        },
      },
    },
    {
      '@type': 'Organization',
      '@id': 'https://pocketphysio.uk/#organization',
      name: 'Pocket Physio',
      url: 'https://pocketphysio.uk',
      email: 'karam@pocketphysio.uk',
      description:
        'Pocket Physio is the clinical signal intelligence layer for rehabilitation. Built by an NHS physiotherapist, it turns the 95% of recovery that happens outside the clinic into actionable clinical intelligence.',
      foundingDate: '2026',
      foundingLocation: {
        '@type': 'Place',
        addressCountry: 'GB',
      },
      areaServed: 'GB',
      knowsAbout: [
        'Remote patient monitoring',
        'Remote therapeutic monitoring',
        'Physiotherapy software',
        'Clinical intelligence',
        'MSK rehabilitation',
        'Digital health',
        'Patient engagement',
        'WhatsApp for healthcare',
        'Home exercise programs',
        'Exercise adherence',
      ],
      sameAs: [
        'https://linkedin.com/company/pocket-physio',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://pocketphysio.uk/#website',
      url: 'https://pocketphysio.uk',
      name: 'Pocket Physio',
      description: 'Remote patient monitoring for physiotherapy clinics via WhatsApp',
      publisher: {
        '@id': 'https://pocketphysio.uk/#organization',
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://pocketphysio.uk/?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is Pocket Physio?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Pocket Physio is a clinical signal intelligence platform that captures what happens between physiotherapy appointments. Patients receive daily WhatsApp check-ins and reply naturally. The system extracts clinical data from their responses and delivers actionable intelligence to their physiotherapist — who is progressing, who is struggling, and who needs urgent attention.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does Pocket Physio work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Patients receive a daily WhatsApp message asking about their recovery. They reply naturally — no app download, no login required. The AI engine extracts clinical signals from their responses including pain levels, exercise adherence, and safety concerns. Physiotherapists see a dashboard with every patient\'s status, AI-generated clinical briefings, and an action queue for items requiring their attention.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is Pocket Physio suitable for NHS physiotherapy services?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Pocket Physio is designed to meet NHS requirements including DTAC criteria, UK GDPR compliance, and NICE framework alignment for digital health technologies. It can support NHS waiting list management by monitoring patients remotely, identifying red-flag symptoms for fast-tracking, and digitally discharging self-resolved cases.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is remote therapeutic monitoring in physiotherapy?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Remote therapeutic monitoring (RTM) in physiotherapy means tracking patient progress, exercise adherence, pain levels, and engagement between clinic appointments. Pocket Physio delivers RTM through WhatsApp conversations, giving physiotherapists continuous clinical intelligence without requiring patients to use a separate app.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does Pocket Physio handle clinical safety?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Every patient message passes through a deterministic safety gate before any AI processing. The system monitors for 47 keywords across 9 clinical categories including neurological symptoms, cardiac signs, and severe pain. When triggered, the exercise programme pauses immediately, the patient receives guidance to contact their physiotherapist or emergency services, and the clinician receives an urgent notification with the patient\'s exact words.',
          },
        },
      ],
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-GB">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        <Toaster />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
