
"use client"

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getPersistentProjects, savePersistentProjects } from '@/lib/persistence';
import { Plus, Search, Edit2, Trash2, ArrowLeft, Save, X, Upload, Video, Image as ImageIcon, AlertTriangle } from 'lucide-react';
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
  const [uploadTarget, setUploadTarget] = useState<'thumbnail' | 'screenshot' | 'video'>('thumbnail');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = localStorage.getItem('scw_admin_logged_in');
      if (!loggedIn) router.push('/login');
    };
    checkAuth();
    
    const loadData = async () => {
      const data = await getPersistentProjects();
      setProjects(data);
    };
    loadData();
  }, [router]);

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to remove this project?')) {
      const updated = projects.filter(p => p.id !== id);
      const success = await savePersistentProjects(updated);
      if (success) {
        setProjects(updated);
        toast({ title: "Project Removed" });
      }
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
      features: ['Professional trading terminal'],
      documentation: '## Installation Guide\n1. Setup step one\n2. Setup step two',
      liveUrl: '',
      adminLiveUrl: '',
      downloadApkUrl: '',
      videoUrl: '',
    } as Project);
    setIsModalOpen(true);
  };

  const handleSaveProject = async () => {
    if (!editingProject) return;
    const exists = projects.find(p => p.id === editingProject.id);
    let updated;
    if (exists) {
      updated = projects.map(p => p.id === editingProject.id ? editingProject : p);
    } else {
      updated = [...projects, editingProject];
    }
    
    const success = await savePersistentProjects(updated);
    
    if (success) {
      setProjects(updated);
      setIsModalOpen(false);
      toast({ 
        title: "Project Saved Successfully",
        description: "Your changes are now live on the marketplace."
      });
    } else {
      toast({ 
        variant: "destructive",
        title: "Storage Error", 
        description: "There was an issue saving to IndexedDB. Please check your browser storage." 
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingProject) {
      // 100MB Limit Check
      const MB_LIMIT = 100;
      const sizeLimit = MB_LIMIT * 1024 * 1024;
      
      if (file.size > sizeLimit) {
        toast({
          variant: "destructive",
          title: "File exceeds 100MB limit",
          description: `This file is ${Math.round(file.size / 1024 / 1024)}MB. Please use a smaller file.`,
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (uploadTarget === 'thumbnail') {
          setEditingProject({ ...editingProject, thumbnail: result });
        } else if (uploadTarget === 'screenshot') {
          const newScreenshots = [...(editingProject.screenshots || []), result];
          setEditingProject({ ...editingProject, screenshots: newScreenshots });
        } else if (uploadTarget === 'video') {
          setEditingProject({ ...editingProject, videoUrl: result });
          toast({ title: "Video ready to save" });
        }
      };
      reader.readAsDataURL(file);
    }
    if (e.target) e.target.value = '';
  };

  const removeScreenshot = (index: number) => {
    if (!editingProject) return;
    const filtered = (editingProject.screenshots || []).filter((_, i) => i !== index);
    setEditingProject({ ...editingProject, screenshots: filtered });
  };

  return (
    <div className="container mx-auto px-4 py-24 space-y-8">
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
      <input type="file" ref={videoInputRef} className="hidden" accept="video/*" onChange={(e) => { setUploadTarget('video'); handleFileChange(e); }} />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <Link href="/admin" className="text-sm text-primary flex items-center gap-2 hover:underline mb-2">
            <ArrowLeft className="w-3 h-3" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl font-headline font-bold">Project Management</h1>
          <p className="text-muted-foreground">Manage trading solutions, screenshots, and APK downloads (100MB Limit).</p>
        </div>
        <Button className="glow-primary h-12 px-6" onClick={handleOpenAdd}>
          <Plus className="w-4 h-4 mr-2" /> New Project
        </Button>
      </div>

      <Card className="bg-card border-white/5 shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-xl font-bold">Catalog List</h2>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search projects..." className="pl-10 bg-white/5 border-white/10" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-white/5">
              <TableRow>
                <TableHead>Project Info</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.map((project) => (
                <TableRow key={project.id} className="hover:bg-white/5 border-white/5">
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded bg-white/10 overflow-hidden relative border border-white/10">
                        {project.thumbnail ? (
                          <img src={project.thumbnail} className="object-cover w-full h-full" alt="" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ImageIcon className="w-4 h-4 text-muted-foreground/50" />
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="font-bold">{project.title}</div>
                        <div className="text-xs text-muted-foreground">{project.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell><Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">{project.category}</Badge></TableCell>
                  <TableCell className="font-mono font-bold text-green-500">${project.price}</TableCell>
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
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl bg-card border-white/10 max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="text-2xl font-headline font-bold">{editingProject?.id.includes('project-') ? 'Create Project' : 'Edit Project Details'}</DialogTitle></DialogHeader>
          {editingProject && (
            <div className="grid gap-8 py-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Project Title</Label>
                    <Input value={editingProject.title} onChange={e => setEditingProject({...editingProject, title: e.target.value})} className="bg-white/5 border-white/10" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>Price ($)</Label><Input type="number" value={editingProject.price} onChange={e => setEditingProject({...editingProject, price: Number(e.target.value)})} className="bg-white/5 border-white/10" /></div>
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <select className="w-full h-10 bg-white/5 border border-white/10 rounded-md px-3 text-sm focus:ring-1 focus:ring-primary outline-none" value={editingProject.category} onChange={e => setEditingProject({...editingProject, category: e.target.value as any})}>
                        <option value="Web">Web Project</option>
                        <option value="Mobile">Mobile Application</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center justify-between">
                      Project Video 
                      <Badge variant="outline" className="text-[10px] bg-green-500/10 text-green-500 border-green-500/20">Browser Limit: 100MB</Badge>
                    </Label>
                    <div className="flex flex-col gap-4 p-4 border border-dashed border-white/10 rounded-xl bg-white/5">
                      {editingProject.videoUrl ? (
                         <div className="space-y-2">
                            <video key={editingProject.videoUrl} src={editingProject.videoUrl} className="w-full aspect-video rounded-lg" controls />
                            <Button variant="destructive" size="sm" className="w-full" onClick={() => setEditingProject({...editingProject, videoUrl: ''})}>Remove Video</Button>
                         </div>
                      ) : (
                        <div className="text-center space-y-2 py-4">
                           <Video className="w-8 h-8 mx-auto text-muted-foreground opacity-50" />
                           <Button variant="outline" size="sm" onClick={() => { setUploadTarget('video'); videoInputRef.current?.click(); }}>Upload Video File</Button>
                           <p className="text-[10px] text-muted-foreground flex items-center justify-center gap-1">
                             <AlertTriangle className="w-3 h-3" /> IndexedDB handles up to 100MB+ easily
                           </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <Label>Main Thumbnail</Label>
                  <div className="relative aspect-video rounded-xl border border-white/10 bg-white/5 overflow-hidden flex items-center justify-center group">
                    {editingProject.thumbnail ? (
                      <img src={editingProject.thumbnail} alt="" className="object-cover w-full h-full" />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-muted-foreground/20" />
                    )}
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="secondary" size="sm" onClick={() => { setUploadTarget('thumbnail'); fileInputRef.current?.click(); }}><Upload className="w-4 h-4 mr-2" /> Upload Image</Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="flex items-center justify-between"><span>Gallery Screenshots (Hero Slider)</span><Button variant="outline" size="sm" className="h-8 border-primary/30 text-primary" onClick={() => { setUploadTarget('screenshot'); fileInputRef.current?.click(); }}><Plus className="w-3 h-3 mr-2" /> Add Slide</Button></Label>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                  {editingProject.screenshots?.map((s, i) => (
                    <div key={i} className="relative aspect-video rounded-lg border border-white/10 bg-white/5 group overflow-hidden">
                      {s && <img src={s} className="object-cover w-full h-full" alt="" />}
                      <button onClick={() => removeScreenshot(i)} className="absolute top-1 right-1 w-6 h-6 bg-destructive text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><X className="w-3 h-3" /></button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2"><Label>User Demo Link</Label><Input value={editingProject.liveUrl || ''} onChange={e => setEditingProject({...editingProject, liveUrl: e.target.value})} className="bg-white/5 border-white/10" /></div>
                <div className="space-y-2"><Label>Admin Demo Link</Label><Input value={editingProject.adminLiveUrl || ''} onChange={e => setEditingProject({...editingProject, adminLiveUrl: e.target.value})} className="bg-white/5 border-white/10" /></div>
                <div className="space-y-2 md:col-span-2"><Label>Mobile APK Link</Label><Input value={editingProject.downloadApkUrl || ''} onChange={e => setEditingProject({...editingProject, downloadApkUrl: e.target.value})} className="bg-white/5 border-white/10" /></div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2"><Label>Demo User Email</Label><Input value={editingProject.demoUserEmail || ''} onChange={e => setEditingProject({...editingProject, demoUserEmail: e.target.value})} className="bg-white/5 border-white/10" /></div>
                <div className="space-y-2"><Label>Demo User Password</Label><Input value={editingProject.demoUserPassword || ''} onChange={e => setEditingProject({...editingProject, demoUserPassword: e.target.value})} className="bg-white/5 border-white/10" /></div>
                <div className="space-y-2"><Label>Demo Admin Email</Label><Input value={editingProject.demoAdminEmail || ''} onChange={e => setEditingProject({...editingProject, demoAdminEmail: e.target.value})} className="bg-white/5 border-white/10" /></div>
                <div className="space-y-2"><Label>Demo Admin Password</Label><Input value={editingProject.demoAdminPassword || ''} onChange={e => setEditingProject({...editingProject, demoAdminPassword: e.target.value})} className="bg-white/5 border-white/10" /></div>
              </div>

              <div className="space-y-2"><Label>Full Project Description</Label><Textarea value={editingProject.fullDescription} onChange={e => setEditingProject({...editingProject, fullDescription: e.target.value})} className="bg-white/5 border-white/10 min-h-[120px]" /></div>
              <div className="space-y-2"><Label>Technical Documentation</Label><Textarea value={editingProject.documentation || ''} onChange={e => setEditingProject({...editingProject, documentation: e.target.value})} className="bg-white/5 border-white/10 min-h-[150px] font-mono text-xs" /></div>
            </div>
          )}
          <DialogFooter className="border-t border-white/5 pt-6">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button className="glow-primary px-8" onClick={handleSaveProject}>
              <Save className="w-4 h-4 mr-2" /> Save Project Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
