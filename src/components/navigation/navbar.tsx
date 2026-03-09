
"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Code, Menu, Home, Youtube, ShoppingCart } from 'lucide-react';
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

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 flex h-24 items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="p-3 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-all duration-300">
            <Code className="w-8 h-8 text-primary" />
          </div>
          <span className="font-headline font-bold text-3xl tracking-tight">
            SCW<span className="text-secondary">.</span>Store
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-12">
          <div className="flex items-center gap-10">
            <Link
              href="/"
              className={cn(
                "text-xl font-bold transition-all hover:text-primary hover:translate-y-[-2px] active:translate-y-0",
                pathname === "/" ? "text-primary scale-110" : "text-muted-foreground"
              )}
            >
              Marketplace
            </Link>
          </div>
          
          <div className="flex items-center gap-6 pl-10 border-l border-white/10">
             <Button variant="ghost" size="icon" asChild className="rounded-full hover:text-green-500 w-12 h-12 transition-all hover:bg-green-500/10">
                <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="w-7 h-7" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild className="rounded-full hover:text-red-500 w-12 h-12 transition-all hover:bg-red-500/10">
                <a href="https://youtube.com/@sourcecodewala" target="_blank" rel="noopener noreferrer">
                  <Youtube className="w-7 h-7" />
                </a>
              </Button>
          </div>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="w-14 h-14">
                <Menu className="w-10 h-10" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background/95 backdrop-blur-lg border-l-white/10">
              <div className="flex flex-col gap-10 mt-20">
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-4 text-2xl font-bold p-4 rounded-2xl transition-all",
                    pathname === "/" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-white/5"
                  )}
                >
                  <Home className="w-7 h-7" />
                  Marketplace
                </Link>
                
                <div className="pt-10 border-t border-white/10 flex flex-col gap-8">
                  <div className="flex gap-10 justify-center">
                    <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="p-4 bg-white/5 rounded-full hover:text-green-500 transition-all hover:scale-110">
                      <WhatsAppIcon className="w-9 h-9" />
                    </a>
                    <a href="https://youtube.com/@sourcecodewala" target="_blank" rel="noopener noreferrer" className="p-4 bg-white/5 rounded-full hover:text-red-500 transition-all hover:scale-110">
                      <Youtube className="w-9 h-9" />
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
