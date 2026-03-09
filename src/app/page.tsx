import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ThreeScene } from '@/components/ui/three-scene';
import { projects } from '@/lib/projects';
import { ArrowRight, Code, Cpu, Globe, Rocket } from 'lucide-react';
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
              Available for New Projects
            </Badge>
            <h1 className="text-5xl md:text-7xl font-headline font-bold leading-tight">
              Crafting <span className="gradient-text">Digital Experiences</span> That Scale.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I am a Full-stack Developer specializing in high-performance web applications, 
              AI integrations, and interactive 3D interfaces. Welcome to SCW — where code meets creativity.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="h-14 px-8 text-lg font-headline glow-primary" asChild>
                <Link href="/projects">View My Work</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-headline" asChild>
                <Link href="/about">About Me</Link>
              </Button>
            </div>
          </div>

          <div className="hidden lg:block relative h-[600px]">
            <ThreeScene className="w-full h-full" type="hero" />
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/20 blur-[100px] rounded-full animate-pulse" />
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-secondary/20 blur-[100px] rounded-full animate-pulse delay-700" />
          </div>
        </div>
        
        {/* Background Overlay */}
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

      {/* Skills / Stats Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Live Projects', value: '25+', icon: Globe },
            { label: 'Lines of Code', value: '100k+', icon: Code },
            { label: 'Happy Clients', value: '15+', icon: Rocket },
            { label: 'AI Models Integrated', value: '10+', icon: Cpu },
          ].map((stat, i) => (
            <div key={i} className="text-center space-y-2 p-6 glass-card rounded-2xl border border-white/5">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-headline font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Projects Grid */}
      <section className="container mx-auto px-4 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <h2 className="text-4xl font-headline font-bold">Featured <span className="text-primary">Projects</span></h2>
            <p className="text-muted-foreground max-w-xl">
              A curated selection of work ranging from enterprise web platforms to experimental AI tools.
            </p>
          </div>
          <Button variant="ghost" asChild className="group">
            <Link href="/projects" className="flex items-center gap-2">
              Explore All Projects <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-60" />
                  <Badge className="absolute top-4 right-4 bg-primary/80 backdrop-blur-md">
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
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-[10px] font-normal px-2 py-0">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden bg-primary/10 border border-primary/20 p-12 md:p-24 text-center">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 blur-[150px] rounded-full translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-headline font-bold">Have a Vision? Let's Build It.</h2>
            <p className="text-lg text-muted-foreground">
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
            </p>
            <Button size="lg" className="h-14 px-12 text-lg font-headline glow-primary" asChild>
              <Link href="/about#contact">Start a Conversation</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
