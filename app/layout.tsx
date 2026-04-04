import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Navigation } from '@/components/navigation'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
})

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
})

export const metadata: Metadata = {
  title: 'Sucre - El Corazon Historico y Cultural de Bolivia',
  description: 'Descubre la capital del patrimonio, la gastronomia y el turismo sostenible. Explora tours, experiencias culturales y la belleza de Sucre, Bolivia.',
  keywords: ['Sucre', 'Bolivia', 'turismo', 'patrimonio', 'UNESCO', 'cultura', 'gastronomia', 'tours'],
  generator: 'v0.app',
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

export const viewport: Viewport = {
  themeColor: '#C4674A',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${playfair.variable} ${inter.variable} font-sans antialiased`}>
        <Navigation />
        {children}
      </body>
    </html>
  )
}
