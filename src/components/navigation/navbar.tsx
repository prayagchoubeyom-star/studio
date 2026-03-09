
"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Menu, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className} 
    fill="currentColor"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.558 0 11.897-5.335 11.9-11.894a11.83 11.83 0 00-3.486-8.413z"/>
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className} 
    fill="currentColor"
  >
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.377.505 9.377.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
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
             <Button variant="ghost" size="icon" asChild className="rounded-full text-[#25D366] hover:text-[#25D366]/80 w-16 h-16 transition-all hover:bg-[#25D366]/10">
                <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="w-10 h-10" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild className="rounded-full text-[#FF0000] hover:text-[#FF0000]/80 w-16 h-16 transition-all hover:bg-[#FF0000]/10">
                <a href="https://youtube.com/@sourcecodewala" target="_blank" rel="noopener noreferrer">
                  <YoutubeIcon className="w-10 h-10" />
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
                    <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="p-6 bg-white/5 rounded-full text-[#25D366] transition-all hover:scale-110">
                      <WhatsAppIcon className="w-12 h-12" />
                    </a>
                    <a href="https://youtube.com/@sourcecodewala" target="_blank" rel="noopener noreferrer" className="p-6 bg-white/5 rounded-full text-[#FF0000] transition-all hover:scale-110">
                      <YoutubeIcon className="w-12 h-12" />
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
