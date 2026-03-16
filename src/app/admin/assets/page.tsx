
"use client"

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getPersistentAssets, savePersistentAssets, getPersistentProjects, savePersistentProjects } from '@/lib/persistence';
import { ArrowLeft, Save, Upload, Search, RefreshCcw } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

export default function AdminAssetsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [assets, setAssets] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeAssetId, setActiveAssetId] = useState<string | null>(null);

  useEffect(() => {
    const loggedIn = localStorage.getItem('scw_admin_logged_in');
    if (!loggedIn) router.push('/login');
    
    const loadAssets = async () => {
      const data = await getPersistentAssets();
      setAssets(data);
    };
    loadAssets();
  }, [router]);

  const filteredAssets = assets.filter(a => 
    a.description.toLowerCase().includes(search.toLowerCase()) ||
    a.id.toLowerCase().includes(search.toLowerCase())
  );

  const handleUpdateUrl = (id: string, newUrl: string) => {
    setAssets(prev => prev.map(a => a.id === id ? { ...a, imageUrl: newUrl } : a));
  };

  const handleSaveAll = async () => {
    // 1. Save Assets
    await savePersistentAssets(assets);
    
    // 2. Map Assets to Projects for direct sync
    const currentProjects = await getPersistentProjects();
    const assetMap = assets.reduce((acc, a) => ({ ...acc, [a.id]: a.imageUrl }), {} as any);
    
    // 3. Update Project Thumbnails if they were derived from these specific placeholder IDs
    const updatedProjects = currentProjects.map(p => {
      const mapping: Record<string, string> = {
        'forex-setup': 'project-1',
        'copytrading-setup': 'project-5',
        'funded-forex': 'project-3',
        'quotex-clone': 'project-6',
        'lp-connection': 'project-7',
        'indian-paper-trading': 'project-8',
        'forex-trading-app': 'project-1',
        'indian-market-trading-app': 'project-8',
        'binary-trading-app': 'project-6',
        'binance-app-clone': 'project-7',
        'exness-app-clone': 'project-5'
      };

      const targetAssetId = mapping[p.id];
      if (targetAssetId && assetMap[targetAssetId]) {
        return { ...p, thumbnail: assetMap[targetAssetId] };
      }
      return p;
    });

    await savePersistentProjects(updatedProjects);

    toast({
      title: "Changes Published",
      description: "Asset updates have been applied to projects and pages site-wide.",
    });
  };

  const triggerFilePicker = (id: string) => {
    setActiveAssetId(id);
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && activeAssetId) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleUpdateUrl(activeAssetId, reader.result as string);
        toast({
          title: "Photo Ready",
          description: "Click 'Save Changes' to push this update live.",
        });
      };
      reader.readAsDataURL(file);
    }
    if (e.target) e.target.value = '';
  };

  return (
    <div className="container mx-auto px-4 py-24 space-y-8">
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleFileChange}
      />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <Link href="/admin" className="text-sm text-primary flex items-center gap-2 hover:underline mb-2">
            <ArrowLeft className="w-3 h-3" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl font-headline font-bold">Website Assets</h1>
          <p className="text-muted-foreground">Modify site-wide photos. Using IndexedDB for 100MB+ storage.</p>
        </div>
        <Button className="glow-primary px-8 h-12" onClick={handleSaveAll}>
          <Save className="w-4 h-4 mr-2" /> Save Changes
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input 
          placeholder="Search assets..." 
          className="pl-10 bg-white/5 border-white/10 h-12"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssets.map((asset) => (
          <Card key={asset.id} className="bg-card border-white/5 overflow-hidden group">
            <div className="aspect-video relative overflow-hidden bg-white/5">
              <Image 
                src={asset.imageUrl} 
                alt={asset.description} 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <Button variant="secondary" size="sm" onClick={() => triggerFilePicker(asset.id)}>
                   <Upload className="w-4 h-4 mr-2" /> Change Photo
                 </Button>
              </div>
            </div>
            <CardHeader className="p-4 space-y-1">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{asset.description}</CardTitle>
                <code className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-muted-foreground uppercase">{asset.id}</code>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-4">
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Image Status</Label>
                <div className="flex gap-2">
                  <Input 
                    value={asset.imageUrl.startsWith('data:') ? 'Custom Upload (IndexedDB)' : 'External Source'} 
                    className="h-9 text-xs bg-white/5 border-white/10"
                    readOnly
                  />
                  <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0" onClick={() => triggerFilePicker(asset.id)}>
                    <RefreshCcw className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
