
"use client"

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { getPersistentProjects } from '@/lib/persistence';
import { Search, Sparkles, ShieldCheck, Users, ExternalLink } from 'lucide-react';
import { Project } from '@/lib/projects';

export default function MarketplaceHome() {
  const [filter, setFilter] = useState<'Web' | 'Mobile'>('Web');
  const [search, setSearch] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);

  const loadData = async () => {
    const data = await getPersistentProjects();
    setProjects(data);
  };

  useEffect(() => {
    loadData();
    window.addEventListener('storage_update', loadData);
    return () => window.removeEventListener('storage_update', loadData);
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesCategory = project.category === filter;
      const matchesSearch = project.title.toLowerCase().includes(search.toLowerCase()) || 
                           project.shortDescription.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [filter, search, projects]);

  const categories = ['Web', 'Mobile'] as const;

  const happyClients = [
    { name: 'Bluestone Exchange', url: 'https://bluestoneexchange.com/' },
    { name: 'Vediex', url: 'https://vediex.com/' },
    { name: 'ProfitVisionFX', url: 'https://profitvisionfx.com/' },
    { name: 'SetupFX24', url: 'https://setupfx24.com/' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/10 blur-[80px] md:blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-secondary/10 blur-[80px] md:blur-[120px] rounded-full animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 md:py-24 space-y-12 md:space-y-20">
        <section className="text-center space-y-6 md:space-y-8 max-w-4xl mx-auto">
          <Badge variant="outline" className="px-4 md:px-6 py-2 text-xs md:text-sm font-headline border-primary/20 bg-primary/5 text-primary mb-2 md:mb-4">
            <Sparkles className="w-3 h-3 md:w-4 md:h-4 mr-2" /> Premium Source Code Marketplace
          </Badge>
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-headline font-bold leading-tight tracking-tighter">
              Build Faster with <span className="gradient-text">Pro Assets</span>.
            </h1>
            <div className="flex items-center justify-center gap-2 text-xl md:text-3xl font-headline font-bold text-secondary">
              <ShieldCheck className="w-6 h-6 md:w-8 md:h-8" />
              Pay only after website setup.
            </div>
          </div>
          <p className="text-lg md:text-2xl text-muted-foreground leading-relaxed">
            Expertly crafted source code, templates, and full-stack solutions ready for your next production launch. Zero risk, professional support.
          </p>
        </section>

        {/* Happy Clients Section */}
        <section className="py-12 glass-card rounded-[2rem] border-white/5 bg-card/20 backdrop-blur-md">
          <div className="text-center space-y-8">
            <div className="flex items-center justify-center gap-2 text-primary font-headline font-bold text-xl uppercase tracking-widest">
              <Users className="w-6 h-6" />
              Our Happy Clients
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 px-6">
              {happyClients.map((client) => (
                <a
                  key={client.name}
                  href={client.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-lg md:text-xl font-headline font-bold text-muted-foreground hover:text-white transition-all hover:scale-105"
                >
                  {client.name}
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="sticky top-20 md:top-24 z-30 py-4 glass-card rounded-[1.5rem] md:rounded-[2rem] px-4 md:px-8 border-white/5 shadow-2xl">
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

        <section className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <Link key={project.id} href={`/projects/${project.id}`} className="group h-full">
                <Card className="h-full flex flex-col overflow-hidden border-white/5 bg-card/40 backdrop-blur-sm hover:bg-card/60 transition-all duration-500 hover:-translate-y-2 md:hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-t-white/10">
                  <div className="aspect-[16/10] relative overflow-hidden">
                    <Image 
                      src={project.thumbnail} 
                      alt={project.title} 
                      fill 
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      unoptimized
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                       <Badge className="bg-primary/90 backdrop-blur-xl border-white/10 text-sm md:text-base py-1 px-3 md:px-4 font-bold shadow-xl">
                          ${project.price}
                        </Badge>
                    </div>
                  </div>

                  <CardContent className="p-6 md:p-8 flex-grow flex flex-col space-y-4 md:space-y-6">
                    <div className="space-y-2 md:space-y-3">
                      <Badge variant="outline" className="text-[10px] uppercase tracking-[0.2em] font-bold text-secondary border-secondary/20">
                        {project.category}
                      </Badge>
                      <h3 className="text-xl md:text-2xl font-headline font-bold group-hover:text-primary transition-colors leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-sm md:text-base line-clamp-2 leading-relaxed font-medium">
                        {project.shortDescription}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex flex-wrap gap-2">
                      {project.technologies?.slice(0, 4).map((tech: string) => (
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
              <Search className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-2xl md:text-3xl font-headline font-bold">No assets found</h3>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
