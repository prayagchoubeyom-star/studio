
"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Menu, Home, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    width="24" 
    height="24" 
    stroke="currentColor" 
    strokeWidth="2" 
    fill="none" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.8 8.4 8.4 0 0 1 3.8.9L21 3l-1.4 4.9Z"/>
    <path d="M15.4 12.8c-.2-.1-1.1-.6-1.3-.6-.2-.1-.3-.1-.5.1s-.6.7-.7.9-.3.2-.5.1-1-.4-1.8-1.1c-.6-.6-1-1.3-1.1-1.5-.1-.2 0-.3.1-.4.1-.1.2-.2.3-.3s.1-.2.2-.3c.1-.1 0-.3-.1-.4s-.5-1.2-.7-1.6c-.2-.4-.4-.3-.5-.3h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.8 1.1 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.1-1.3-.1-.3-.3-.4-.6-.5z"/>
  </svg>
);

const SCWLogo = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 180 60" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
  >
    <defs>
      <linearGradient id="logo-glow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#22d3ee" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
      <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <g filter="url(#neon-glow)">
      <text x="5" y="45" fontFamily="Space Grotesk, sans-serif" fontWeight="900" fontSize="50" fill="url(#logo-glow)">S</text>
      <text x="42" y="45" fontFamily="Space Grotesk, sans-serif" fontWeight="900" fontSize="50" fill="url(#logo-glow)">C</text>
      <text x="54" y="38" fontFamily="monospace" fontWeight="bold" fontSize="16" fill="white" className="animate-pulse">
        {"</>"}
      </text>
      <text x="92" y="45" fontFamily="Space Grotesk, sans-serif" fontWeight="900" fontSize="50" fill="url(#logo-glow)">W</text>
    </g>
  </svg>
);

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 flex h-28 items-center justify-between">
        <Link href="/" className="flex items-center gap-4 group">
          <div className="relative h-20 w-48 transition-transform duration-300 group-hover:scale-105">
            <SCWLogo className="w-full h-full" />
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-16">
          <div className="flex items-center gap-12">
            <Link
              href="/"
              className={cn(
                "text-4xl font-bold transition-all hover:text-primary hover:translate-y-[-2px] active:translate-y-0",
                pathname === "/" ? "text-primary scale-110" : "text-muted-foreground"
              )}
            >
              Marketplace
            </Link>
          </div>
          
          <div className="flex items-center gap-8 pl-12 border-l border-white/10">
             <Button variant="ghost" size="icon" asChild className="rounded-full hover:text-green-500 w-16 h-16 transition-all hover:bg-green-500/10">
                <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="w-10 h-10" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild className="rounded-full hover:text-red-500 w-16 h-16 transition-all hover:bg-red-500/10">
                <a href="https://youtube.com/@sourcecodewala" target="_blank" rel="noopener noreferrer">
                  <Youtube className="w-10 h-10" />
                </a>
              </Button>
          </div>
        </div>

        {/* Mobile Nav */}
        <div className="lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="w-16 h-16">
                <Menu className="w-12 h-12" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background/95 backdrop-blur-lg border-l-white/10 w-full sm:max-w-md">
              <div className="flex flex-col gap-12 mt-20">
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-6 text-4xl font-bold p-8 rounded-3xl transition-all",
                    pathname === "/" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-white/5"
                  )}
                >
                  <Home className="w-10 h-10" />
                  Marketplace
                </Link>
                
                <div className="pt-12 border-t border-white/10 flex flex-col gap-10">
                  <div className="flex gap-12 justify-center">
                    <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="p-6 bg-white/5 rounded-full hover:text-green-500 transition-all hover:scale-110">
                      <WhatsAppIcon className="w-12 h-12" />
                    </a>
                    <a href="https://youtube.com/@sourcecodewala" target="_blank" rel="noopener noreferrer" className="p-6 bg-white/5 rounded-full hover:text-red-500 transition-all hover:scale-110">
                      <Youtube className="w-12 h-12" />
                    </a>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
