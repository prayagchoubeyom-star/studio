
"use client"

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { projects } from '@/lib/projects';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Play, 
  FileText, 
  ShoppingCart, 
  KeyRound, 
  User, 
  ShieldCheck, 
  Download, 
  LayoutDashboard,
  Copy,
  Check,
  QrCode,
  Info
} from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const project = projects.find(p => p.id === id);
  
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-32 text-center space-y-8">
        <h1 className="text-3xl md:text-4xl font-headline font-bold">Project Not Found</h1>
        <p className="text-muted-foreground">The project you're looking for doesn't exist.</p>
        <Button onClick={() => router.push('/')}>Back to Marketplace</Button>
      </div>
    );
  }

  const isMobile = project.category === 'Mobile';
  const qrCodeImage = PlaceHolderImages.find(img => img.id === 'usdt-qr');
  const usdtAddress = "0x6cdeb76a8901dfb1a90cf2bf0923e638bb3e10d7";

  const copyAddress = () => {
    navigator.clipboard.writeText(usdtAddress);
    setCopied(true);
    toast({
      title: "Address Copied",
      description: "Wallet address copied to clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="pb-12 md:pb-24">
      {/* Hero Header with Slider */}
      <section className="relative h-[60vh] md:h-[85vh] w-full overflow-hidden bg-black">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full h-full"
        >
          <CarouselContent className="h-full ml-0">
            {project.screenshots.map((shot, index) => (
              <CarouselItem key={index} className="pl-0 h-[60vh] md:h-[85vh] relative">
                <Image 
                  src={shot} 
                  alt={`${project.title} View ${index + 1}`} 
                  fill 
                  className="object-cover opacity-60"
                  priority={index === 0}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute bottom-8 right-8 z-20 flex gap-2">
            <CarouselPrevious className="static translate-y-0 bg-black/50 border-white/20 hover:bg-white/20 h-12 w-12" />
            <CarouselNext className="static translate-y-0 bg-black/50 border-white/20 hover:bg-white/20 h-12 w-12" />
          </div>
        </Carousel>

        {/* Overlay Content */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent pointer-events-none" />
        
        <div className="absolute inset-0 z-10">
          <div className="container mx-auto px-4 h-full flex flex-col justify-between py-12">
            <Link href="/" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors w-fit text-sm md:text-base bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 pointer-events-auto">
              <ArrowLeft className="w-4 h-4" /> Back to Marketplace
            </Link>

            <div className="space-y-4 md:space-y-6 pointer-events-auto">
              <div className="flex flex-wrap gap-2 md:gap-3">
                <Badge className="bg-primary/20 text-primary border-primary/30 py-1 px-3 md:px-4 text-xs md:text-sm backdrop-blur-md">{project.category}</Badge>
                <Badge variant="outline" className="text-secondary border-secondary/30 font-bold text-xs md:text-sm backdrop-blur-md bg-black/20">${project.price}</Badge>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-7xl font-headline font-bold leading-tight drop-shadow-2xl">{project.title}</h1>
              
              <div className="flex flex-wrap items-center gap-2 md:gap-4 pt-4">
                {!isMobile && project.liveUrl && (
                  <Button size="lg" className="h-10 md:h-12 px-4 md:px-8 glow-primary w-full sm:w-auto" asChild>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      <LayoutDashboard className="w-4 h-4" /> User Demo
                    </a>
                  </Button>
                )}

                {!isMobile && project.adminLiveUrl && (
                  <Button size="lg" variant="outline" className="h-10 md:h-12 px-4 md:px-8 border-primary/50 text-primary hover:bg-primary/10 w-full sm:w-auto bg-black/20 backdrop-blur-md" asChild>
                    <a href={project.adminLiveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4" /> Admin Demo
                    </a>
                  </Button>
                )}

                {isMobile && project.downloadApkUrl && (
                  <Button size="lg" className="h-10 md:h-12 px-4 md:px-8 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 w-full sm:w-auto" asChild>
                    <a href={project.downloadApkUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      <Download className="w-4 h-4" /> Download APK
                    </a>
                  </Button>
                )}

                {(project.demoUserEmail || project.demoAdminEmail) && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="lg" className="h-10 md:h-12 px-4 md:px-8 border-white/20 bg-black/20 hover:bg-white/10 w-full sm:w-auto backdrop-blur-md">
                        <KeyRound className="w-4 h-4 mr-2" /> Credentials
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[calc(100vw-2rem)] sm:w-80 p-6 bg-card border-white/10 shadow-2xl rounded-2xl mx-4">
                      <div className="space-y-4">
                        <h4 className="font-bold text-lg border-b border-white/10 pb-2">Demo Credentials</h4>
                        
                        {project.demoUserEmail && (
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-primary text-sm font-bold uppercase tracking-wider">
                              <User className="w-3 h-3" /> User Login
                            </div>
                            <div className="bg-white/5 p-3 rounded-lg text-xs md:text-sm font-mono break-all">
                              <div className="text-muted-foreground mb-1">Email: {project.demoUserEmail}</div>
                              <div className="text-muted-foreground">Pass: {project.demoUserPassword}</div>
                            </div>
                          </div>
                        )}

                        {project.demoAdminEmail && (
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-secondary text-sm font-bold uppercase tracking-wider">
                              <ShieldCheck className="w-3 h-3" /> Admin Login
                            </div>
                            <div className="bg-white/5 p-3 rounded-lg text-xs md:text-sm font-mono break-all">
                              <div className="text-muted-foreground mb-1">Email: {project.demoAdminEmail}</div>
                              <div className="text-muted-foreground">Pass: {project.demoAdminPassword}</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </PopoverContent>
                  </Popover>
                )}

                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="h-10 md:h-12 px-4 md:px-8 bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto"
                  onClick={() => setIsPaymentOpen(true)}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" /> Buy Source Code
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-8 md:gap-12 mt-12 md:mt-16">
        <div className="lg:col-span-2 space-y-8 md:space-y-12">
          
          <Tabs defaultValue="overview" className="w-full">
            <div className="overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
              <TabsList className="bg-white/5 border border-white/10 w-fit min-w-full md:w-full justify-start h-12 md:h-14 p-1 rounded-xl">
                <TabsTrigger value="overview" className="flex items-center gap-2 rounded-lg text-sm"><FileText className="w-4 h-4" /> Overview</TabsTrigger>
                <TabsTrigger value="video" className="flex items-center gap-2 rounded-lg text-sm"><Play className="w-4 h-4" /> Video</TabsTrigger>
                <TabsTrigger value="docs" className="flex items-center gap-2 rounded-lg text-sm"><FileText className="w-4 h-4" /> Docs</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="mt-6 md:mt-8 space-y-8 md:space-y-12 animate-in fade-in duration-500">
              <div className="space-y-4 md:space-y-6">
                <h2 className="text-2xl md:text-3xl font-headline font-bold">About the Project</h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {project.fullDescription}
                </p>
              </div>

              <div className="space-y-4 md:space-y-6">
                <h2 className="text-2xl md:text-3xl font-headline font-bold">Key Features</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {project.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-foreground text-sm md:text-base">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="video" className="mt-6 md:mt-8 space-y-6 animate-in fade-in duration-500">
              <h2 className="text-2xl md:text-3xl font-headline font-bold">Watch Video <span className="text-red-500">Demo</span></h2>
              <div className="aspect-video relative rounded-xl md:rounded-2xl overflow-hidden border border-white/10">
                {project.youtubeId ? (
                  <iframe 
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${project.youtubeId}`}
                    title="Project Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-white/5 text-muted-foreground">
                    Video tour coming soon
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="docs" className="mt-6 md:mt-8 space-y-6 animate-in fade-in duration-500">
              <h2 className="text-2xl md:text-3xl font-headline font-bold">Installation <span className="text-primary">Guide</span></h2>
              <div className="prose prose-invert max-w-none p-6 md:p-8 bg-white/5 rounded-xl md:rounded-2xl border border-white/10">
                <pre className="whitespace-pre-wrap font-code text-xs md:text-sm text-primary-foreground overflow-x-auto">
                  {project.documentation || 'Documentation is being prepared.'}
                </pre>
              </div>
            </TabsContent>
          </Tabs>

        </div>

        {/* Sidebar Info */}
        <div className="space-y-6 md:space-y-8">
          <Card className="bg-card border-white/10 p-6 md:p-8 space-y-6 sticky top-24">
            <div className="space-y-1 md:space-y-2">
              <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Price</div>
              <div className="text-3xl md:text-4xl font-headline font-bold text-primary">${project.price}</div>
            </div>

            <hr className="border-white/10" />

            <div className="space-y-3 md:space-y-4">
              <h3 className="text-lg md:text-xl font-headline font-bold">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="px-3 py-1 bg-white/10 text-white font-normal hover:bg-white/20 transition-colors text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <hr className="border-white/10" />

            <div className="space-y-3 md:space-y-4">
              <h3 className="text-lg md:text-xl font-headline font-bold">What's Included?</h3>
              <ul className="text-xs md:text-sm space-y-3 text-muted-foreground">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Full Source Code</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Complete Documentation</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Future Updates</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Support via Email</li>
              </ul>
            </div>

            <Button 
              className="w-full h-12 text-lg font-headline glow-primary" 
              onClick={() => setIsPaymentOpen(true)}
            >
              Get Instant Access
            </Button>
            
            <p className="text-[10px] text-center text-muted-foreground italic">
              Secure checkout. Digital products are delivered instantly.
            </p>
          </Card>
        </div>
      </div>

      {/* Payment Modal */}
      <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
        <DialogContent className="sm:max-w-[400px] bg-card border-white/10 p-0 overflow-hidden rounded-3xl">
          <DialogHeader className="p-6 pb-2">
            <DialogTitle className="text-center font-headline text-2xl font-bold">Deposit USDT</DialogTitle>
          </DialogHeader>
          
          <div className="px-6 py-4 space-y-6">
            {/* QR Code Section */}
            <div className="flex flex-col items-center justify-center gap-4 py-4">
              <div className="relative w-48 h-48 bg-white rounded-2xl p-2 shadow-2xl overflow-hidden">
                {qrCodeImage && (
                  <Image 
                    src={qrCodeImage.imageUrl} 
                    alt="Payment QR" 
                    fill 
                    className="object-contain"
                    data-ai-hint={qrCodeImage.imageHint}
                  />
                )}
                {!qrCodeImage && <QrCode className="w-full h-full text-muted" />}
              </div>
              <p className="text-sm font-medium text-muted-foreground">For USDT deposits only</p>
            </div>

            {/* Network & Address Info */}
            <div className="space-y-4">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1 uppercase tracking-widest font-bold">
                  <span>Network</span>
                </div>
                <div className="flex items-center justify-between font-bold text-sm">
                  <span>BEP20 <span className="text-muted-foreground font-normal ml-1">BNB Smart Chain(BSC)</span></span>
                </div>
              </div>

              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1 uppercase tracking-widest font-bold">
                  <span>Address</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] leading-tight break-all flex-1 text-foreground">
                    {usdtAddress}
                  </span>
                  <Button 
                    size="icon" 
                    variant="secondary" 
                    className="h-9 w-9 shrink-0 rounded-xl bg-primary/20 text-primary hover:bg-primary/30"
                    onClick={copyAddress}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-[11px] text-muted-foreground px-1">
                  <div className="flex items-center gap-1">
                    <Info className="w-3 h-3" />
                    <span>Min Deposit: 0.1 USDT</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>Deposit to: Funding</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <Button 
              className="w-full h-14 rounded-2xl font-bold glow-primary text-lg"
              asChild
            >
              <a 
                href={`https://wa.me/18252508100?text=Hello SCW, I've initiated a payment of $1,999 for ${project.title}. Please verify.`} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Confirm Payment
              </a>
            </Button>
          </div>
          <div className="h-4" />
        </DialogContent>
      </Dialog>
    </div>
  );
}
