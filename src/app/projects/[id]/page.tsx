"use client"

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { projects } from '@/lib/projects';
import { Github, ExternalLink, ArrowLeft, CheckCircle2, Play, FileText, ShoppingCart, Lock, KeyRound, User, ShieldCheck, Download, Smartphone, LayoutDashboard, Globe } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const project = projects.find(p => p.id === id);
  const [isPurchased, setIsPurchased] = useState(false);

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
  
  // Logic to determine project positions for custom notes
  const projectIndex = projects.findIndex(p => p.id === project.id);
  const isFirstProject = projectIndex === 0;
  const isSecondProject = projectIndex === 1;

  return (
    <div className="pb-12 md:pb-24">
      {/* Hero Header */}
      <section className="relative h-[50vh] md:h-[70vh] w-full overflow-hidden">
        <Image 
          src={project.thumbnail} 
          alt={project.title} 
          fill 
          className="object-cover opacity-40 blur-sm"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        
        <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-8 md:pb-12 relative z-10 space-y-4 md:space-y-6">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors w-fit mb-2 md:mb-4 text-sm md:text-base">
            <ArrowLeft className="w-4 h-4" /> Back to Marketplace
          </Link>
          <div className="flex flex-wrap gap-2 md:gap-3">
            <Badge className="bg-primary/20 text-primary border-primary/30 py-1 px-3 md:px-4 text-xs md:text-sm">{project.category}</Badge>
            <Badge variant="outline" className="text-secondary border-secondary/30 font-bold text-xs md:text-sm">${project.price}</Badge>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-headline font-bold leading-tight">{project.title}</h1>
          
          <div className="flex flex-wrap items-center gap-2 md:gap-4 pt-4">
            {!isMobile && project.liveUrl && (
              <Button size="lg" className="h-10 md:h-12 px-4 md:px-8 glow-primary w-full sm:w-auto" asChild>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" /> User Demo
                </a>
              </Button>
            )}

            {!isMobile && project.adminLiveUrl && (
              <Button size="lg" variant="outline" className="h-10 md:h-12 px-4 md:px-8 border-primary/50 text-primary hover:bg-primary/10 w-full sm:w-auto" asChild>
                <a href={project.adminLiveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <LayoutDashboard className="w-4 h-4" /> Admin Demo
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
                  <Button variant="outline" size="lg" className="h-10 md:h-12 px-4 md:px-8 border-white/20 bg-white/5 hover:bg-white/10 w-full sm:w-auto">
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

                    <p className="text-[10px] text-muted-foreground italic mt-2">
                      * Use these to log in on the {isMobile ? 'mobile application' : 'live demo sites'}.
                    </p>
                  </div>
                </PopoverContent>
              </Popover>
            )}

            <Button size="lg" variant="secondary" className="h-10 md:h-12 px-4 md:px-8 bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto" onClick={() => setIsPurchased(true)}>
              <ShoppingCart className="w-4 h-4 mr-2" /> Buy Source Code
            </Button>
          </div>

          {/* Happy Clients Note */}
          {(isFirstProject || isSecondProject) && (
            <div className="mt-8 p-6 bg-primary/10 border border-primary/20 rounded-3xl max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
               <div className="flex items-center gap-3 mb-3">
                 <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                   <Globe className="w-4 h-4 text-primary" />
                 </div>
                 <h3 className="font-headline font-bold text-lg">Trusted by Happy Clients</h3>
               </div>
               <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                 {isFirstProject 
                   ? "If the demo links above are undergoing maintenance, feel free to browse these live production sites built for our clients to verify the quality of our work:"
                   : "Check out this live production site built for our client to verify the quality of our work:"}
               </p>
               <div className="flex flex-wrap gap-4">
                 {isFirstProject && (
                   <>
                     <a href="https://setupfx24.com/" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-primary hover:text-white transition-colors bg-white/5 px-3 py-2 rounded-lg border border-white/10 hover:border-primary/50">setupfx24.com</a>
                     <a href="https://pipxcapital.com/" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-primary hover:text-white transition-colors bg-white/5 px-3 py-2 rounded-lg border border-white/10 hover:border-primary/50">pipxcapital.com</a>
                     <a href="https://bluestoneexchange.com/" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-primary hover:text-white transition-colors bg-white/5 px-3 py-2 rounded-lg border border-white/10 hover:border-primary/50">bluestoneexchange.com</a>
                   </>
                 )}
                 {isSecondProject && (
                   <a href="https://www.thefx.live/" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-primary hover:text-white transition-colors bg-white/5 px-3 py-2 rounded-lg border border-white/10 hover:border-primary/50">thefx.live</a>
                 )}
               </div>
            </div>
          )}
        </div>
      </section>

      {/* Content Grid */}
      <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-8 md:gap-12 mt-8 md:mt-12">
        <div className="lg:col-span-2 space-y-8 md:space-y-12">
          
          <Tabs defaultValue="overview" className="w-full">
            <div className="overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
              <TabsList className="bg-white/5 border border-white/10 w-fit min-w-full md:w-full justify-start h-12 md:h-14 p-1 rounded-xl">
                <TabsTrigger value="overview" className="flex items-center gap-2 rounded-lg text-sm"><FileText className="w-4 h-4" /> Overview</TabsTrigger>
                {isMobile && project.screenshots && (
                   <TabsTrigger value="screenshots" className="flex items-center gap-2 rounded-lg text-sm"><Smartphone className="w-4 h-4" /> Screenshots</TabsTrigger>
                )}
                <TabsTrigger value="video" className="flex items-center gap-2 rounded-lg text-sm"><Play className="w-4 h-4" /> Video</TabsTrigger>
                <TabsTrigger value="docs" className="flex items-center gap-2 rounded-lg text-sm"><Lock className="w-4 h-4" /> Docs</TabsTrigger>
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

            {isMobile && project.screenshots && (
              <TabsContent value="screenshots" className="mt-6 md:mt-8 space-y-6 animate-in fade-in duration-500">
                <h2 className="text-2xl md:text-3xl font-headline font-bold">App <span className="text-primary">Screenshots</span></h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  {project.screenshots.map((shot, i) => (
                    <div key={i} className="relative aspect-[9/19] rounded-xl md:rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                      <Image src={shot} alt={`Screenshot ${i + 1}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </TabsContent>
            )}

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
              {isPurchased ? (
                <div className="prose prose-invert max-w-none p-6 md:p-8 bg-white/5 rounded-xl md:rounded-2xl border border-white/10">
                  <pre className="whitespace-pre-wrap font-code text-xs md:text-sm text-primary-foreground overflow-x-auto">
                    {project.documentation || 'Documentation is being prepared.'}
                  </pre>
                </div>
              ) : (
                <Card className="bg-red-500/10 border-red-500/20 p-8 md:p-12 text-center flex flex-col items-center gap-6">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-red-500/20 flex items-center justify-center">
                    <Lock className="w-6 h-6 md:w-8 md:h-8 text-red-500" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg md:text-xl font-bold">Access Restricted</h3>
                    <p className="text-sm text-muted-foreground">Purchase the source code to unlock the detailed installation documentation and repository access.</p>
                  </div>
                </Card>
              )}
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
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Full Source Code ({isMobile ? 'React Native/Flutter' : 'TypeScript'})</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Complete Documentation</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Future Updates</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Support via Email</li>
              </ul>
            </div>

            <Button className="w-full h-12 text-lg font-headline glow-primary" onClick={() => setIsPurchased(true)}>
              Get Instant Access
            </Button>
            
            <p className="text-[10px] text-center text-muted-foreground italic">
              Secure checkout. Digital products are delivered instantly.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
