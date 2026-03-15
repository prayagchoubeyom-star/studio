
"use client"

import React, { useState, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getPersistentProjects, getPersistentSettings } from '@/lib/persistence';
import { 
  ArrowLeft, 
  CheckCircle2, 
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
  Info,
  PlayCircle
} from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { toast } = useToast();
  
  const [project, setProject] = useState<any>(null);
  const [settings, setSettings] = useState<any>(null);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  const autoplayPlugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));

  useEffect(() => {
    const allProjects = getPersistentProjects();
    const found = allProjects.find(p => p.id === id);
    setProject(found || null);
    setSettings(getPersistentSettings());
    setLoading(false);
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-32 text-center space-y-8">
        <h1 className="text-3xl md:text-4xl font-headline font-bold">Project Not Found</h1>
        <Button onClick={() => router.push('/')}>Back to Marketplace</Button>
      </div>
    );
  }

  const isMobile = project.category === 'Mobile';
  const usdtAddress = settings?.usdtAddress || "0x6cdeb76a8901dfb1a90cf2bf0923e638bb3e10d7";
  const qrCodeImage = settings?.qrUrl;

  const copyAddress = () => {
    navigator.clipboard.writeText(usdtAddress);
    setCopied(true);
    toast({ title: "Address Copied" });
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="pb-12 md:pb-24">
      <section className="relative h-[60vh] md:h-[85vh] w-full overflow-hidden bg-black">
        <Carousel plugins={[autoplayPlugin.current]} opts={{ align: "start", loop: true }} className="w-full h-full">
          <CarouselContent className="h-full ml-0">
            {(project.screenshots?.length > 0 ? project.screenshots : [project.thumbnail]).map((shot: string, index: number) => (
              <CarouselItem key={index} className="pl-0 h-[60vh] md:h-[85vh] relative">
                <Image src={shot} alt={`${project.title} View ${index + 1}`} fill className="object-cover opacity-60" priority={index === 0} unoptimized />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute bottom-8 right-8 z-20 flex gap-2">
            <CarouselPrevious className="static translate-y-0 bg-black/50 border-white/20 hover:bg-white/20 h-12 w-12" />
            <CarouselNext className="static translate-y-0 bg-black/50 border-white/20 hover:bg-white/20 h-12 w-12" />
          </div>
        </Carousel>

        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent pointer-events-none" />
        
        <div className="absolute inset-0 z-10">
          <div className="container mx-auto px-4 h-full flex flex-col justify-between py-12">
            <Link href="/" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors w-fit text-sm bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 pointer-events-auto">
              <ArrowLeft className="w-4 h-4" /> Back to Marketplace
            </Link>

            <div className="space-y-4 md:space-y-6 pointer-events-auto">
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-primary/20 text-primary border-primary/30 py-1 px-3 text-xs backdrop-blur-md">{project.category}</Badge>
                <Badge variant="outline" className="text-secondary border-secondary/30 font-bold text-xs backdrop-blur-md bg-black/20">${project.price}</Badge>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-7xl font-headline font-bold leading-tight drop-shadow-2xl">{project.title}</h1>
              
              <div className="flex flex-wrap items-center gap-2 md:gap-4 pt-4">
                {!isMobile && project.liveUrl && (
                  <Button size="lg" className="h-10 md:h-12 px-4 md:px-8 glow-primary w-full sm:w-auto" asChild>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"><LayoutDashboard className="w-4 h-4" /> User Demo</a>
                  </Button>
                )}
                {!isMobile && project.adminLiveUrl && (
                  <Button size="lg" variant="outline" className="h-10 md:h-12 px-4 md:px-8 border-primary/50 text-primary hover:bg-primary/10 w-full sm:w-auto bg-black/20 backdrop-blur-md" asChild>
                    <a href={project.adminLiveUrl} target="_blank" rel="noopener noreferrer"><ShieldCheck className="w-4 h-4" /> Admin Demo</a>
                  </Button>
                )}
                {isMobile && project.downloadApkUrl && (
                  <Button size="lg" className="h-10 md:h-12 px-4 md:px-8 bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto" asChild>
                    <a href={project.downloadApkUrl} target="_blank" rel="noopener noreferrer"><Download className="w-4 h-4" /> Download APK</a>
                  </Button>
                )}
                {(project.demoUserEmail || project.demoAdminEmail) && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="lg" className="h-10 md:h-12 px-4 md:px-8 border-white/20 bg-black/20 hover:bg-white/10 w-full sm:w-auto backdrop-blur-md"><KeyRound className="w-4 h-4 mr-2" /> Credentials</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[calc(100vw-2rem)] sm:w-80 p-6 bg-card border-white/10 shadow-2xl rounded-2xl mx-4">
                      <div className="space-y-4">
                        <h4 className="font-bold text-lg border-b border-white/10 pb-2">Demo Credentials</h4>
                        {project.demoUserEmail && (
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase"><User className="w-3 h-3" /> User Login</div>
                            <div className="bg-white/5 p-3 rounded-lg text-xs font-mono break-all text-muted-foreground">Email: {project.demoUserEmail}<br/>Pass: {project.demoUserPassword}</div>
                          </div>
                        )}
                      </div>
                    </PopoverContent>
                  </Popover>
                )}
                <Button size="lg" variant="secondary" className="h-10 md:h-12 px-4 md:px-8 bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto" onClick={() => setIsPaymentOpen(true)}><ShoppingCart className="w-4 h-4 mr-2" /> Buy Source Code</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-8 md:gap-12 mt-12">
        <div className="lg:col-span-2 space-y-8">
          <Tabs defaultValue="overview" className="w-full">
            <div className="overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
              <TabsList className="bg-white/5 border border-white/10 w-fit min-w-full md:w-full justify-start h-12 p-1 rounded-xl">
                <TabsTrigger value="overview" className="flex items-center gap-2 rounded-lg text-sm"><FileText className="w-4 h-4" /> Overview</TabsTrigger>
                {project.youtubeId && <TabsTrigger value="video" className="flex items-center gap-2 rounded-lg text-sm"><PlayCircle className="w-4 h-4" /> Video Demo</TabsTrigger>}
                <TabsTrigger value="docs" className="flex items-center gap-2 rounded-lg text-sm"><FileText className="w-4 h-4" /> Docs</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="mt-8 space-y-12 animate-in fade-in duration-500">
              <div className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-headline font-bold">About the Project</h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">{project.fullDescription}</p>
              </div>
              <div className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-headline font-bold">Key Features</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {project.features?.map((feature: string, i: number) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" /><span className="text-foreground text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {project.youtubeId && (
              <TabsContent value="video" className="mt-8 space-y-6 animate-in fade-in duration-500">
                <h2 className="text-2xl md:text-3xl font-headline font-bold">Watch <span className="text-primary">Demo</span></h2>
                <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${project.youtubeId}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
              </TabsContent>
            )}

            <TabsContent value="docs" className="mt-8 space-y-6 animate-in fade-in duration-500">
              <h2 className="text-2xl md:text-3xl font-headline font-bold">Installation <span className="text-primary">Guide</span></h2>
              <div className="prose prose-invert max-w-none p-6 md:p-8 bg-white/5 rounded-xl md:rounded-2xl border border-white/10">
                <pre className="whitespace-pre-wrap font-code text-xs md:text-sm text-primary-foreground overflow-x-auto">{project.documentation || 'Documentation is being prepared.'}</pre>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-8">
          <Card className="bg-card border-white/10 p-6 md:p-8 space-y-6 sticky top-24">
            <div className="space-y-2"><div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Price</div><div className="text-3xl md:text-4xl font-headline font-bold text-primary">${project.price}</div></div>
            <hr className="border-white/10" />
            <div className="space-y-4">
              <h3 className="text-lg md:text-xl font-headline font-bold">Technologies</h3>
              <div className="flex flex-wrap gap-2">{project.technologies?.map((tech: string) => (<Badge key={tech} variant="secondary" className="px-3 py-1 bg-white/10 text-white font-normal text-xs">{tech}</Badge>))}</div>
            </div>
            <hr className="border-white/10" />
            <div className="space-y-4">
              <h3 className="text-lg md:text-xl font-headline font-bold">What's Included?</h3>
              <ul className="text-xs md:text-sm space-y-3 text-muted-foreground">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Full Source Code</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Complete Documentation</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Future Updates</li>
              </ul>
            </div>
            <Button className="w-full h-12 text-lg font-headline glow-primary" onClick={() => setIsPaymentOpen(true)}>Get Instant Access</Button>
          </Card>
        </div>
      </div>

      <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
        <DialogContent className="sm:max-w-[400px] bg-card border-white/10 p-0 overflow-hidden rounded-3xl">
          <DialogHeader className="p-6 pb-2"><DialogTitle className="text-center font-headline text-2xl font-bold">Deposit USDT</DialogTitle></DialogHeader>
          <div className="px-6 py-4 space-y-6">
            <div className="flex flex-col items-center justify-center gap-4 py-4">
              <div className="relative w-48 h-48 bg-white rounded-2xl p-2 shadow-2xl overflow-hidden">{qrCodeImage && <Image src={qrCodeImage} alt="Payment QR" fill className="object-contain" unoptimized />}</div>
              <p className="text-sm font-medium text-muted-foreground">For USDT BEP20 deposits only</p>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <div className="text-xs text-muted-foreground mb-1 uppercase tracking-widest font-bold">Address</div>
                <div className="flex items-center gap-3"><span className="font-mono text-[11px] leading-tight break-all flex-1 text-foreground">{usdtAddress}</span><Button size="icon" variant="secondary" className="h-9 w-9 shrink-0 rounded-xl bg-primary/20 text-primary" onClick={copyAddress}>{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}</Button></div>
              </div>
            </div>
            <Button className="w-full h-14 rounded-2xl font-bold glow-primary text-lg" asChild><a href={`https://wa.me/18252508100?text=Hello SCW, I've initiated a payment of $${project.price} for ${project.title}. Please verify.`} target="_blank" rel="noopener noreferrer">Confirm Payment</a></Button>
          </div>
          <div className="h-4" />
        </DialogContent>
      </Dialog>
    </div>
  );
}
