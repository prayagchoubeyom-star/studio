"use client"

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { projects } from '@/lib/projects';
import { Search } from 'lucide-react';

export default function ProjectsPage() {
  const [filter, setFilter] = useState<'All' | 'Web' | 'Mobile' | 'AI' | '3D'>('All');
  const [search, setSearch] = useState('');

  const filteredProjects = projects.filter(project => {
    const matchesCategory = filter === 'All' || project.category === filter;
    const matchesSearch = project.title.toLowerCase().includes(search.toLowerCase()) || 
                         project.shortDescription.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-24 space-y-12">
      <div className="space-y-4 max-w-2xl">
        <h1 className="text-5xl font-headline font-bold">My <span className="text-primary">Projects</span></h1>
        <p className="text-lg text-muted-foreground">
          A deep dive into the technical solutions and creative projects I've built. Use the filters below to browse by category.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="flex flex-wrap gap-2 p-1 bg-white/5 rounded-xl border border-white/10">
          {(['All', 'Web', 'Mobile', 'AI', '3D'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === cat 
                  ? 'bg-primary text-white shadow-lg' 
                  : 'text-muted-foreground hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search projects..." 
            className="pl-10 h-11 bg-white/5 border-white/10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <Link key={project.id} href={`/projects/${project.id}`}>
              <Card className="group overflow-hidden border-white/5 bg-card hover:bg-card/80 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                <div className="aspect-video relative overflow-hidden">
                  <Image 
                    src={project.thumbnail} 
                    alt={project.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    data-ai-hint="project preview"
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
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-[10px] font-normal px-2 py-0">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <div className="col-span-full py-24 text-center space-y-4 bg-white/5 rounded-3xl border border-dashed border-white/10">
            <p className="text-muted-foreground text-lg">No projects found matching your criteria.</p>
            <button 
              onClick={() => {setFilter('All'); setSearch('');}}
              className="text-primary hover:underline font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
