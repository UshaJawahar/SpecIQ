import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SpecIQ - AI-Powered Knowledge Management Dashboard',
  description: 'Enterprise AI-powered Sales Inquiry and Knowledge Management Portal',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1a1a1a',
              color: '#ffffff',
              border: '1px solid #333333',
            },
            success: {
              iconTheme: {
                primary: '#00ff88',
                secondary: '#1a1a1a',
              },
            },
            error: {
              iconTheme: {
                primary: '#ff6b35',
                secondary: '#1a1a1a',
              },
            },
          }}
        />
      </body>
    </html>
  )
} 