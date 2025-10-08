import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { Providers } from '@/components/providers'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata = {
  title: 'POWERGRID IDP Intelligence - AI-Powered Individual Development Plans',
  description: 'Comprehensive Individual Development Plan system with AI recommendations, mental wellness features, and gamified learning for POWERGRID Corporation employees.',
  keywords: 'IDP, Individual Development Plan, POWERGRID, AI recommendations, employee development, mental wellness, gamified learning',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        inter.className
      )}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}