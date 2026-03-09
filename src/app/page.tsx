
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ThreeScene } from '@/components/ui/three-scene';
import { projects } from '@/lib/projects';
import { ArrowRight, Code, Cpu, Globe, Rocket, Check, Zap, Star, ShieldCheck } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const featuredProjects = projects.slice(0, 3);
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero-bg');

  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8 max-w-2xl">
            <Badge variant="outline" className="px-4 py-1 text-secondary border-secondary/30 bg-secondary/5 font-headline">
              Premium Source Code Marketplace
            </Badge>
            <h1 className="text-5xl md:text-7xl font-headline font-bold leading-tight">
              Launch Faster with <span className="gradient-text">Pro Source Code</span>.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Skip weeks of development. Purchase production-ready source code for AI apps, SaaS dashboards, and 3D experiences. Built with Next.js and Firebase.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="h-14 px-8 text-lg font-headline glow-primary" asChild>
                <Link href="/projects">Browse Marketplace</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-headline" asChild>
                <Link href="#pricing">View Pricing</Link>
              </Button>
            </div>
          </div>

          <div className="hidden lg:block relative h-[600px]">
            <ThreeScene className="w-full h-full" type="hero" />
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/20 blur-[100px] rounded-full animate-pulse" />
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-secondary/20 blur-[100px] rounded-full animate-pulse delay-700" />
          </div>
        </div>
        
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          {heroImg && (
            <Image 
              src={heroImg.imageUrl} 
              alt="Background" 
              fill 
              className="object-cover" 
              data-ai-hint={heroImg.imageHint}
            />
          )}
        </div>
      </section>

      {/* Featured Projects Grid */}
      <section className="container mx-auto px-4 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <h2 className="text-4xl font-headline font-bold">Latest <span className="text-primary">Source Code</span></h2>
            <p className="text-muted-foreground max-w-xl">
              Clean, documented, and ready-to-deploy templates for your next big idea.
            </p>
          </div>
          <Button variant="ghost" asChild className="group">
            <Link href="/projects" className="flex items-center gap-2">
              Explore Full Marketplace <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <Link key={project.id} href={`/projects/${project.id}`}>
              <Card className="group overflow-hidden border-white/5 bg-card hover:bg-card/80 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                <div className="aspect-video relative overflow-hidden">
                  <Image 
                    src={project.thumbnail} 
                    alt={project.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    data-ai-hint="project screenshot"
                  />
                  <div className="absolute top-4 left-4 z-10">
                     <Badge className="bg-primary/90 backdrop-blur-md">
                        ${project.price}
                      </Badge>
                  </div>
                  <Badge className="absolute top-4 right-4 bg-secondary/80 backdrop-blur-md">
                    {project.category}
                  </Badge>
                </div>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-headline font-bold group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {project.shortDescription}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container mx-auto px-4 py-24 scroll-mt-24">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-headline font-bold">Flexible <span className="text-primary">Pricing</span> Plans</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the best way to access our premium source code library and technical support.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Individual Plan */}
          <Card className="bg-card border-white/5 relative overflow-hidden flex flex-col">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-xl">Single Project</CardTitle>
              <CardDescription>Perfect for one-off builds.</CardDescription>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-bold font-headline">$49</span>
                <span className="text-muted-foreground">/start</span>
              </div>
            </CardHeader>
            <CardContent className="p-8 pt-0 flex-grow">
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li className="flex items-center gap-3"><Check className="w-4 h-4 text-primary" /> Full Source Code Access</li>
                <li className="flex items-center gap-3"><Check className="w-4 h-4 text-primary" /> Lifetime Updates</li>
                <li className="flex items-center gap-3"><Check className="w-4 h-4 text-primary" /> Email Documentation</li>
                <li className="flex items-center gap-3 opacity-30"><Check className="w-4 h-4" /> 24/7 Priority Support</li>
                <li className="flex items-center gap-3 opacity-30"><Check className="w-4 h-4" /> Custom Modifications</li>
              </ul>
            </CardContent>
            <CardFooter className="p-8">
              <Button className="w-full" variant="outline" asChild><Link href="/projects">Shop Projects</Link></Button>
            </CardFooter>
          </Card>

          {/* Bundle Plan */}
          <Card className="bg-card border-primary/50 relative overflow-hidden flex flex-col scale-105 shadow-2xl">
             <div className="absolute top-0 right-0 bg-primary px-4 py-1 text-[10px] font-bold uppercase tracking-widest rounded-bl-lg">Popular</div>
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-xl">Dev Bundle</CardTitle>
              <CardDescription>Best for freelancers and agencies.</CardDescription>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-bold font-headline">$199</span>
                <span className="text-muted-foreground">/forever</span>
              </div>
            </CardHeader>
            <CardContent className="p-8 pt-0 flex-grow">
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li className="flex items-center gap-3"><Check className="w-4 h-4 text-primary" /> 5 Premium Projects</li>
                <li className="flex items-center gap-3"><Check className="w-4 h-4 text-primary" /> Full Commercial Rights</li>
                <li className="flex items-center gap-3"><Check className="w-4 h-4 text-primary" /> Private Discord Access</li>
                <li className="flex items-center gap-3"><Check className="w-4 h-4 text-primary" /> Priority Support</li>
                <li className="flex items-center gap-3 opacity-30"><Check className="w-4 h-4" /> Custom Modifications</li>
              </ul>
            </CardContent>
            <CardFooter className="p-8">
              <Button className="w-full glow-primary" asChild><Link href="/register">Get Started</Link></Button>
            </CardFooter>
          </Card>

          {/* Custom Plan */}
          <Card className="bg-card border-white/5 relative overflow-hidden flex flex-col">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-xl">Custom Build</CardTitle>
              <CardDescription>Tailored solutions for your business.</CardDescription>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-bold font-headline">Custom</span>
              </div>
            </CardHeader>
            <CardContent className="p-8 pt-0 flex-grow">
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li className="flex items-center gap-3"><Check className="w-4 h-4 text-primary" /> White-label App Build</li>
                <li className="flex items-center gap-3"><Check className="w-4 h-4 text-primary" /> Technical Consultation</li>
                <li className="flex items-center gap-3"><Check className="w-4 h-4 text-primary" /> AWS/Firebase Deployment</li>
                <li className="flex items-center gap-3"><Check className="w-4 h-4 text-primary" /> Ongoing Maintenance</li>
                <li className="flex items-center gap-3"><Check className="w-4 h-4 text-primary" /> Custom UI/UX Design</li>
              </ul>
            </CardContent>
            <CardFooter className="p-8">
              <Button className="w-full" variant="outline" asChild><Link href="/about#contact">Contact Me</Link></Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden bg-primary/10 border border-primary/20 p-12 md:p-24 text-center">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 blur-[150px] rounded-full translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-headline font-bold">Have a Custom Project?</h2>
            <p className="text-lg text-muted-foreground">
              If our marketplace templates don't fit your exact needs, I'm available for custom full-stack development.
            </p>
            <Button size="lg" className="h-14 px-12 text-lg font-headline glow-primary" asChild>
              <Link href="/about#contact">Talk to the Developer</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
