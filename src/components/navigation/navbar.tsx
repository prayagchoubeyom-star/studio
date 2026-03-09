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

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Marketplace', href: '/projects', icon: ShoppingCart },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-2 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <Code className="w-7 h-7 text-primary" />
          </div>
          <span className="font-headline font-bold text-2xl tracking-tight">
            SCW<span className="text-secondary">.</span>Store
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-lg font-semibold transition-colors hover:text-primary flex items-center gap-2",
                  pathname === link.href ? "text-primary" : "text-muted-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          <div className="flex items-center gap-4 pl-8 border-l border-white/10">
             <Button variant="ghost" size="icon" asChild className="rounded-full hover:text-green-500 w-11 h-11">
                <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="w-6 h-6" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild className="rounded-full hover:text-red-500 w-11 h-11">
                <a href="https://youtube.com/@sourcecodewala" target="_blank" rel="noopener noreferrer">
                  <Youtube className="w-6 h-6" />
                </a>
              </Button>
          </div>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="w-12 h-12">
                <Menu className="w-8 h-8" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background/95 backdrop-blur-lg">
              <div className="flex flex-col gap-8 mt-16">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-4 text-xl font-bold p-3 rounded-xl transition-colors",
                      pathname === link.href ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-white/5"
                    )}
                  >
                    <link.icon className="w-6 h-6" />
                    {link.name}
                  </Link>
                ))}
                
                <div className="pt-8 border-t border-white/10 flex flex-col gap-6">
                  <div className="flex gap-6 justify-center">
                    <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:text-green-500 transition-colors">
                      <WhatsAppIcon className="w-8 h-8" />
                    </a>
                    <a href="https://youtube.com/@sourcecodewala" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:text-red-500 transition-colors">
                      <Youtube className="w-8 h-8" />
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
