
"use client"

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getPersistentProjects, savePersistentProjects } from '@/lib/persistence';
import { Plus, Search, Edit2, Trash2, ExternalLink, ArrowLeft, Save, X, Upload } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { Project } from '@/lib/projects';

export default function AdminProjectsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      toast({ title: "Project Removed" });
    }
  };

  const handleOpenEdit = (project: Project) => {
    setEditingProject({ ...project });
    setIsModalOpen(true);
  };

  const handleOpenAdd = () => {
    setEditingProject({
      id: `project-${Date.now()}`,
      title: '',
      price: 1999,
      category: 'Web',
      shortDescription: '',
      fullDescription: '',
      thumbnail: 'https://picsum.photos/seed/new/1200/800',
      images: [],
      screenshots: [],
      technologies: ['Next.js', 'TypeScript'],
      features: ['professional trading terminal'],
    } as Project);
    setIsModalOpen(true);
  };

  const handleSaveProject = () => {
    if (!editingProject) return;
    const exists = projects.find(p => p.id === editingProject.id);
    let updated;
    if (exists) {
      updated = projects.map(p => p.id === editingProject.id ? editingProject : p);
    } else {
      updated = [...projects, editingProject];
    }
    setProjects(updated);
    savePersistentProjects(updated);
    setIsModalOpen(false);
    toast({ title: "Project Saved Successfully" });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingProject) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingProject({ ...editingProject, thumbnail: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto px-4 py-24 space-y-8">
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <Link href="/admin" className="text-sm text-primary flex items-center gap-2 hover:underline mb-2">
            <ArrowLeft className="w-3 h-3" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl font-headline font-bold">Manage Projects</h1>
          <p className="text-muted-foreground">Add and edit projects. Changes reflect instantly to the marketplace.</p>
        </div>
        <Button className="glow-primary" onClick={handleOpenAdd}>
          <Plus className="w-4 h-4 mr-2" /> Add New Project
        </Button>
      </div>

      <Card className="bg-card border-white/5 shadow-2xl">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle>Project Catalog ({filteredProjects.length})</CardTitle>
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
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.map((project) => (
                  <TableRow key={project.id} className="hover:bg-white/5">
                    <TableCell className="font-medium">{project.title}</TableCell>
                    <TableCell><Badge variant="outline">{project.category}</Badge></TableCell>
                    <TableCell className="font-bold">${project.price}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleOpenEdit(project)}>
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(project.id)}>
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

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl bg-card border-white/10 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProject?.id.includes('project-') ? 'Add Project' : 'Edit Project'}</DialogTitle>
          </DialogHeader>
          {editingProject && (
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Project Title</Label>
                  <Input value={editingProject.title} onChange={e => setEditingProject({...editingProject, title: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Price ($)</Label>
                  <Input type="number" value={editingProject.price} onChange={e => setEditingProject({...editingProject, price: Number(e.target.value)})} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <select 
                    className="w-full h-10 bg-white/5 border border-white/10 rounded-md px-3 text-sm"
                    value={editingProject.category} 
                    onChange={e => setEditingProject({...editingProject, category: e.target.value as any})}
                  >
                    <option value="Web">Web</option>
                    <option value="Mobile">Mobile</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Demo URL</Label>
                  <Input value={editingProject.liveUrl || ''} onChange={e => setEditingProject({...editingProject, liveUrl: e.target.value})} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Short Description</Label>
                <Input value={editingProject.shortDescription} onChange={e => setEditingProject({...editingProject, shortDescription: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Full Description</Label>
                <Textarea value={editingProject.fullDescription} onChange={e => setEditingProject({...editingProject, fullDescription: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Thumbnail Image</Label>
                <div className="flex gap-4 items-center">
                  <div className="w-20 h-20 relative rounded-lg overflow-hidden border border-white/10">
                    <img src={editingProject.thumbnail} alt="Preview" className="object-cover w-full h-full" />
                  </div>
                  <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                    <Upload className="w-4 h-4 mr-2" /> Upload New
                  </Button>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button className="glow-primary" onClick={handleSaveProject}>Save Project</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
