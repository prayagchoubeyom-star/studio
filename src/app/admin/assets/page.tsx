
"use client"

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowLeft, Save, Upload, Search, RefreshCcw } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

export default function AdminAssetsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [assets, setAssets] = useState(PlaceHolderImages);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeAssetId, setActiveAssetId] = useState<string | null>(null);

  useEffect(() => {
    const loggedIn = localStorage.getItem('scw_admin_logged_in');
    if (!loggedIn) router.push('/login');
  }, [router]);

  const filteredAssets = assets.filter(a => 
    a.description.toLowerCase().includes(search.toLowerCase()) ||
    a.id.toLowerCase().includes(search.toLowerCase())
  );

  const handleUpdateUrl = (id: string, newUrl: string) => {
    setAssets(prev => prev.map(a => a.id === id ? { ...a, imageUrl: newUrl } : a));
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
          title: "Photo Updated",
          description: "Preview updated successfully from your local file.",
        });
      };
      reader.readAsDataURL(file);
    }
    // Reset input
    if (e.target) e.target.value = '';
  };

  return (
    <div className="container mx-auto px-4 py-24 space-y-8">
      {/* Hidden File Input */}
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
          <p className="text-muted-foreground">Modify site-wide photos, background images, and brand elements.</p>
        </div>
        <Button className="glow-primary">
          <Save className="w-4 h-4 mr-2" /> Save All Changes
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input 
          placeholder="Search assets (e.g. hero, avatar)..." 
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
                <Label className="text-xs text-muted-foreground">Image Source</Label>
                <div className="flex gap-2">
                  <Input 
                    value={asset.imageUrl.startsWith('data:') ? 'Local File Selected' : asset.imageUrl} 
                    className="h-9 text-xs bg-white/5 border-white/10 font-mono"
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
