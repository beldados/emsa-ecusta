import type { Metadata } from 'next';
import { fontBenaiah } from './fonts';
import { Navbar, Footer } from '@/components/layout';
import './globals.css';

export const metadata: Metadata = {
  title: 'EMSA-ECUSTA | Medical Students Association',
  description:
    'Official Medical Student Body at Ethiopian Catholic University of St. Thomas Aquinas (Catholic University of Health Sciences). Cultivating Clinical Excellence. Shaping Our Medical Future.',
  keywords: ['EMSA', 'ECUSTA', 'Medical Students', 'Ethiopia', 'IFMSA', 'Health Advocacy'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${fontBenaiah.variable}`}>
      <body className="flex min-h-screen flex-col bg-canvas text-content-primary antialiased selection:bg-brand-gold/30 selection:text-brand-gold">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
