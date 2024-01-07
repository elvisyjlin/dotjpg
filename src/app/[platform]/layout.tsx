import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import GoogleAnalytics from '@/components/googleanalytics';
import { capitalize } from '@/utils';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

type Props = {
  params: { platform: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const platform = params.platform;
  return {
    title: capitalize(platform) + " Downloader",
    description: `Download ${capitalize(platform)} photos and videos`,
  };
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
