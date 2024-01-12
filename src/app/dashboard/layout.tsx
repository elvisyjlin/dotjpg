import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import GoogleAnalytics from '@/components/googleanalytics';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Dashboard",
  description: ".jpg dashboard",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  )
}
