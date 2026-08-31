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
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mr" className="h-full">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="stylesheet" href="/output.css" />
        <meta name="theme-color" content="#0f172a" />
      </head>
      <body className="min-h-full flex flex-col bg-slate-100 text-slate-900 overflow-x-hidden">
        <SaathiProvider>
          {children}
        </SaathiProvider>
      </body>
    </html>
  );
}
