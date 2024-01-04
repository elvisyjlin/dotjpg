import type { Metadata, ResolvingMetadata } from 'next';
import { Inter } from 'next/font/google';
import { capitalize } from '@/utils';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

type Props = {
  params: { platform: string }
  searchParams: { [key: string]: string | string[] | undefined }
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
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
      <body className={inter.className}>{children}</body>
    </html>
  )
}
