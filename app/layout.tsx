import type { Metadata, Viewport } from 'next';
import './globals.css';
import { SaathiProvider } from '@/context/SaathiContext';

export const metadata: Metadata = {
  title: 'SAATHI - Smart Assistance & Accessible Care Ecosystem',
  description: 'Smart Assistance & Accessible Technology for Senior Citizens, Independent Living, and Family Caregivers with ESP32 Hardware Integration',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'SAATHI',
  },
  icons: {
    icon: '/icons/icon-192x192.svg',
    apple: '/icons/icon-192x192.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#0f172a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mr" className="h-full overflow-x-hidden">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="stylesheet" href="/output.css" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className="min-h-full w-full max-w-full overflow-x-hidden flex flex-col bg-slate-100 text-slate-900">
        <SaathiProvider>
          {children}
        </SaathiProvider>
      </body>
    </html>
  );
}
