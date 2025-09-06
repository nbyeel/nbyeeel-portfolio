import type { Metadata } from 'next'
import { Inter, Space_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Navigation } from '@/components/navigation'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { Analytics } from '@/components/analytics'
import { GlobalErrorHandler } from '@/components/global-error-handler'
import { ErrorSuppressor } from '@/components/error-suppressor'

const inter = Inter({ subsets: ['latin'] })
const spaceMono = Space_Mono({ 
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono'
})

export const metadata: Metadata = {
  title: 'Muhammad Nabeel - UI/UX Designer & Web Developer',
  description: 'UI/UX Designer and Web Developer from Gojra, Pakistan. Specializing in mobile app design, web development, and creating engaging user experiences.',
  keywords: ['UI/UX Design', 'Web Development', 'Mobile App Design', 'Figma', 'React', 'Next.js'],
  authors: [{ name: 'Muhammad Nabeel' }],
  creator: 'Muhammad Nabeel',
  publisher: 'Muhammad Nabeel',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.svg',
  },
  openGraph: {
    title: 'Muhammad Nabeel - UI/UX Designer & Web Developer',
    description: 'UI/UX Designer and Web Developer from Gojra, Pakistan. Specializing in mobile app design, web development, and creating engaging user experiences.',
    url: 'http://localhost:3000',
    siteName: 'Muhammad Nabeel Portfolio',
    images: [
      {
        url: '/icon.svg',
        width: 32,
        height: 32,
        alt: 'Muhammad Nabeel - UI/UX Designer & Web Developer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Muhammad Nabeel - UI/UX Designer & Web Developer',
    description: 'UI/UX Designer and Web Developer from Gojra, Pakistan. Specializing in mobile app design, web development, and creating engaging user experiences.',
    images: ['/icon.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body 
        className={`${inter.className} ${spaceMono.variable} bg-white dark:bg-[#18181B] text-black dark:text-white`} 
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <GlobalErrorHandler />
          <ErrorSuppressor />
          <Navigation />
          {children}
          <WhatsAppButton phoneNumber="923443814208" />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
