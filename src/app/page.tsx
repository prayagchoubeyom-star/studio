"use client"

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { projects } from '@/lib/projects';
import { Search, Sparkles, ArrowRight, Code2, Layers, Globe, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MarketplaceHome() {
  const [filter, setFilter] = useState<'Web' | 'Mobile'>('Web');
  const [search, setSearch] = useState('');

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesCategory = project.category === filter;
      const matchesSearch = project.title.toLowerCase().includes(search.toLowerCase()) || 
                           project.shortDescription.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [filter, search]);

  const categories = ['Web', 'Mobile'] as const;

  return (
    <div className="min-h-screen bg-background">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/10 blur-[80px] md:blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-secondary/10 blur-[80px] md:blur-[120px] rounded-full animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 md:py-24 space-y-12 md:space-y-20">
        {/* Hero Section */}
        <section className="text-center space-y-6 md:space-y-8 max-w-4xl mx-auto">
          <Badge variant="outline" className="px-4 md:px-6 py-2 text-xs md:text-sm font-headline border-primary/20 bg-primary/5 text-primary mb-2 md:mb-4 animate-in fade-in slide-in-from-top-4 duration-500">
            <Sparkles className="w-3 h-3 md:w-4 md:h-4 mr-2" /> Premium Source Code Marketplace
          </Badge>
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-headline font-bold leading-tight tracking-tighter animate-in fade-in slide-in-from-bottom-4 duration-700">
              Build Faster with <span className="gradient-text">Pro Assets</span>.
            </h1>
            <div className="flex items-center justify-center gap-2 text-xl md:text-3xl font-headline font-bold text-secondary animate-in fade-in slide-in-from-bottom-5 duration-800">
              <ShieldCheck className="w-6 h-6 md:w-8 md:h-8" />
              Pay only after website setup.
            </div>
          </div>
          <p className="text-lg md:text-2xl text-muted-foreground leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000">
            Expertly crafted source code, templates, and full-stack solutions ready for your next production launch. Zero risk, professional support.
          </p>
        </section>

        {/* Search and Filters Bar */}
        <section className="sticky top-20 md:top-24 z-30 py-4 glass-card rounded-[1.5rem] md:rounded-[2rem] px-4 md:px-8 border-white/5 shadow-2xl animate-in zoom-in-95 duration-500">
          <div className="flex flex-col lg:flex-row gap-4 md:gap-8 items-center justify-between">
            <div className="flex items-center gap-2 md:gap-3 w-full lg:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`flex-1 lg:flex-none px-4 md:px-8 py-2 md:py-3 rounded-xl md:rounded-2xl text-lg md:text-xl font-bold transition-all duration-300 ${
                    filter === cat 
                      ? 'bg-primary text-white shadow-[0_0_20px_rgba(123,103,228,0.4)] scale-105' 
                      : 'text-muted-foreground hover:text-white hover:bg-white/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            
            <div className="relative w-full lg:w-[400px] group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input 
                placeholder="Search premium code..." 
                className="pl-12 h-12 md:h-14 bg-white/5 border-white/10 rounded-xl md:rounded-2xl text-base md:text-lg focus:ring-primary focus:border-primary transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, idx) => (
              <Link key={project.id} href={`/projects/${project.id}`} className="group h-full">
                <Card className="h-full flex flex-col overflow-hidden border-white/5 bg-card/40 backdrop-blur-sm hover:bg-card/60 transition-all duration-500 hover:-translate-y-2 md:hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-t-white/10">
                  <div className="aspect-[16/10] relative overflow-hidden">
                    <Image 
                      src={project.thumbnail} 
                      alt={project.title} 
                      fill 
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      data-ai-hint="software project screenshot"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="absolute top-4 left-4 flex gap-2">
                       <Badge className="bg-primary/90 backdrop-blur-xl border-white/10 text-sm md:text-base py-1 px-3 md:px-4 font-bold shadow-xl">
                          ${project.price}
                        </Badge>
                    </div>
                    
                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 hidden md:flex">
                      <Button variant="secondary" size="sm" className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold">
                        View Details <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <CardContent className="p-6 md:p-8 flex-grow flex flex-col space-y-4 md:space-y-6">
                    <div className="space-y-2 md:space-y-3">
                      <div className="flex items-center justify-between">
                         <Badge variant="outline" className="text-[10px] uppercase tracking-[0.2em] font-bold text-secondary border-secondary/20">
                          {project.category}
                        </Badge>
                      </div>
                      <h3 className="text-xl md:text-2xl font-headline font-bold group-hover:text-primary transition-colors leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-sm md:text-base line-clamp-2 leading-relaxed font-medium">
                        {project.shortDescription}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span key={tech} className="text-[9px] md:text-[10px] font-bold text-white/40 uppercase tracking-widest bg-white/5 px-2 py-1 rounded-md">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <div className="col-span-full py-20 md:py-32 text-center space-y-4 md:space-y-6 bg-white/5 rounded-[2rem] md:rounded-[3rem] border-2 border-dashed border-white/10 mx-4">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4">
                <Search className="w-8 h-8 md:w-10 md:h-10 text-muted-foreground" />
              </div>
              <h3 className="text-2xl md:text-3xl font-headline font-bold">No assets found</h3>
              <p className="text-muted-foreground text-lg md:text-xl max-w-md mx-auto px-6">
                Try searching for something else in the {filter} category.
              </p>
            </div>
          )}
        </section>

        {/* Benefits Section */}
        <section className="grid sm:grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 pt-12 md:pt-20 border-t border-white/5">
          {[
            { icon: Code2, title: "Clean Code", desc: "Production-ready, documented, and type-safe TypeScript codebases." },
            { icon: Layers, title: "Modular Architecture", desc: "Easily scalable components built with the latest industry standards." },
            { icon: Globe, title: "Ready to Deploy", desc: "Instant access to files with detailed installation guides for your production environment." }
          ].map((item, i) => (
            <div key={i} className="space-y-3 md:space-y-4 text-center md:text-left">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto md:mx-0">
                <item.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <h4 className="text-lg md:text-xl font-headline font-bold">{item.title}</h4>
              <p className="text-sm md:text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
