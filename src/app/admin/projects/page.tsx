
"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getPersistentProjects, savePersistentProjects } from '@/lib/persistence';
import { Plus, Search, Edit2, Trash2, ExternalLink, ArrowLeft, Save } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

export default function AdminProjectsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const loggedIn = localStorage.getItem('scw_admin_logged_in');
    if (!loggedIn) router.push('/login');
    setProjects(getPersistentProjects());
  }, [router]);

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to remove this project?')) {
      const updated = projects.filter(p => p.id !== id);
      setProjects(updated);
      savePersistentProjects(updated);
      toast({
        title: "Project Removed",
        description: "The project has been deleted from your catalog.",
      });
    }
  };

  const handleSaveAll = () => {
    savePersistentProjects(projects);
    toast({
      title: "Projects Saved",
      description: "All changes to the project catalog are now live.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-24 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <Link href="/admin" className="text-sm text-primary flex items-center gap-2 hover:underline mb-2">
            <ArrowLeft className="w-3 h-3" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl font-headline font-bold">Manage Projects</h1>
          <p className="text-muted-foreground">Create and edit the trading projects available in your marketplace.</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" onClick={handleSaveAll}>
            <Save className="w-4 h-4 mr-2" /> Save Catalog
          </Button>
          <Button className="glow-primary">
            <Plus className="w-4 h-4 mr-2" /> Add New Project
          </Button>
        </div>
      </div>

      <Card className="bg-card border-white/5 shadow-2xl">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <CardTitle>Project Catalog</CardTitle>
              <CardDescription>Viewing {filteredProjects.length} projects.</CardDescription>
            </div>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search projects..." 
                className="pl-10 bg-white/5 border-white/10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border border-white/10 overflow-hidden">
            <Table>
              <TableHeader className="bg-white/5">
                <TableRow>
                  <TableHead>Project Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Demo Access</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.map((project) => (
                  <TableRow key={project.id} className="hover:bg-white/5 transition-colors">
                    <TableCell className="font-medium">
                      <div className="flex flex-col">
                        <span>{project.title}</span>
                        <span className="text-xs text-muted-foreground">{project.id}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={project.category === 'Web' ? 'text-primary' : 'text-secondary'}>
                        {project.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-bold">${project.price}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {project.liveUrl && <Badge variant="secondary" className="bg-green-500/10 text-green-500">User Demo</Badge>}
                        {project.adminLiveUrl && <Badge variant="secondary" className="bg-blue-500/10 text-blue-500">Admin Panel</Badge>}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" asChild>
                          <Link href={`/projects/${project.id}`} target="_blank"><ExternalLink className="w-4 h-4" /></Link>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-secondary">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => handleDelete(project.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
