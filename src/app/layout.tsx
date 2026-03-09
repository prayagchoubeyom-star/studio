import type {Metadata} from 'next';
import './globals.css';
import { Navbar } from '@/components/navigation/navbar';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'SCW Portfolio | Innovating the Web',
  description: 'SourceCodeWala Portfolio - Showcasing high-quality web projects, apps, and AI solutions.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Toaster />
        <footer className="py-12 border-t border-border/40 bg-card/20 text-center">
          <div className="container mx-auto px-4">
            <p className="text-muted-foreground text-sm">
              &copy; {new Date().getFullYear()} SCW Portfolio. All rights reserved. sourcecodewala.store
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
