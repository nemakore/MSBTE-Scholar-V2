import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';

export const metadata: Metadata = {
  title: 'MSBTE Scholar 2.0 | Everything a Diploma Student Needs',
  description:
    'Premier educational platform for Maharashtra State Board of Technical Education (MSBTE) diploma students. K-Scheme notes, solved practical manuals, question papers, verified jobs, and capstone projects.',
  manifest: '/manifest.json',
  icons: {
    icon: '/icons/icon-192.svg',
    apple: '/icons/icon-512.svg',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'MSBTE Scholar 2.0',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#0B3B2E',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="bg-[#FAF6EE] text-[#141414] antialiased selection:bg-[#D4AF37]/30 selection:text-[#062D24]">
        <AppProvider>{children}</AppProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js').catch(err => {
                    console.log('SW registration note:', err);
                  });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
