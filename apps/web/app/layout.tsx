import type { Metadata } from 'next';
import { headingFont, bodyFont } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Rettoria SGT',
  description: '%s | Rettoria SGT',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body className={`${headingFont.variable} ${bodyFont.variable} antialiased`}>{children}</body>
    </html>
  );
}
