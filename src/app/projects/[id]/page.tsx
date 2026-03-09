"use client"

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ThreeScene } from '@/components/ui/three-scene';
import { projects } from '@/lib/projects';
import { Github, ExternalLink, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-32 text-center space-y-8">
        <h1 className="text-4xl font-headline font-bold">Project Not Found</h1>
        <p className="text-muted-foreground">The project you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => router.push('/projects')}>Back to Projects</Button>
      </div>
    );
  }

  return (
    <div className="pb-24">
      {/* Hero Header */}
      <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
        <Image 
          src={project.thumbnail} 
          alt={project.title} 
          fill 
          className="object-cover opacity-40 blur-sm"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        
        <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-12 relative z-10 space-y-6">
          <Link href="/projects" className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors w-fit mb-4">
            <ArrowLeft className="w-4 h-4" /> Back to Projects
          </Link>
          <div className="flex flex-wrap gap-3">
            <Badge className="bg-primary/20 text-primary border-primary/30 py-1 px-4">{project.category}</Badge>
            {project.has3D && <Badge variant="outline" className="text-secondary border-secondary/30">3D Interactive</Badge>}
          </div>
          <h1 className="text-5xl md:text-7xl font-headline font-bold leading-tight">{project.title}</h1>
          <div className="flex flex-wrap gap-4">
            {project.liveUrl && (
              <Button size="lg" className="h-12 px-8 glow-primary" asChild>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </a>
              </Button>
            )}
            {project.repoUrl && (
              <Button size="lg" variant="outline" className="h-12 px-8 border-white/20 bg-white/5" asChild>
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <Github className="w-4 h-4" /> Code Repository
                </a>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-12 mt-12">
        <div className="lg:col-span-2 space-y-12">
          {/* Main Description */}
          <div className="space-y-6">
            <h2 className="text-3xl font-headline font-bold">About the Project</h2>
            <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {project.fullDescription}
            </p>
          </div>

          {/* Key Features */}
          <div className="space-y-6">
            <h2 className="text-3xl font-headline font-bold">Key Features</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {project.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive 3D (If applicable) */}
          {project.has3D && (
            <div className="space-y-6">
              <h2 className="text-3xl font-headline font-bold">Interactive <span className="text-secondary">3D Exploration</span></h2>
              <Card className="overflow-hidden bg-white/5 border-white/10 aspect-video md:aspect-[21/9] relative group">
                <ThreeScene className="w-full h-full cursor-grab active:cursor-grabbing" type="sphere" />
                <div className="absolute bottom-4 left-4 text-xs text-muted-foreground bg-background/50 backdrop-blur-md px-3 py-1.5 rounded-full">
                  Interact to explore the model geometry
                </div>
              </Card>
            </div>
          )}

          {/* Gallery */}
          <div className="space-y-6">
            <h2 className="text-3xl font-headline font-bold">Project Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.images.map((image, i) => (
                <div key={i} className="relative aspect-video rounded-2xl overflow-hidden group border border-white/10">
                  <Image 
                    src={image} 
                    alt={`${project.title} Screenshot ${i+1}`} 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-8">
          <Card className="bg-card border-white/10 p-8 space-y-6 sticky top-24">
            <div className="space-y-4">
              <h3 className="text-xl font-headline font-bold">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="px-3 py-1 bg-white/10 text-white font-normal hover:bg-white/20 transition-colors">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <hr className="border-white/10" />

            <div className="space-y-4">
              <h3 className="text-xl font-headline font-bold">Project Timeline</h3>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Status</span>
                <span className="text-primary font-medium">Completed</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Year</span>
                <span className="text-foreground">2024</span>
              </div>
            </div>

            <hr className="border-white/10" />

            <div className="space-y-4">
              <h3 className="text-xl font-headline font-bold">Need a similar solution?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                If this project aligns with what you're looking to build, I'm available to help you realize your vision.
              </p>
              <Button className="w-full glow-primary" asChild>
                <Link href="/about#contact">Inquire Now</Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
