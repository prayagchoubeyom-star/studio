
"use client"

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getPersistentSettings, savePersistentSettings } from '@/lib/persistence';
import { ArrowLeft, Save, Wallet, QrCode, AlertCircle, Info, Upload, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function AdminSettingsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  
  const [usdtAddress, setUsdtAddress] = useState('');
  const [qrUrl, setQrUrl] = useState('');
  const [logoUrl, setLogoUrl] = useState('');

  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = localStorage.getItem('scw_admin_logged_in');
      if (!loggedIn) router.push('/login');
    };
    checkAuth();

    const loadSettings = async () => {
      const settings = await getPersistentSettings();
      setUsdtAddress(settings.usdtAddress);
      setQrUrl(settings.qrUrl);
      setLogoUrl(settings.logoUrl || '');
    };
    loadSettings();
  }, [router]);

  const handleSave = async () => {
    await savePersistentSettings({ usdtAddress, qrUrl, logoUrl });
    toast({
      title: "Settings Saved",
      description: "Logo and payment details have been updated globally.",
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, target: 'qr' | 'logo') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (target === 'qr') setQrUrl(reader.result as string);
        else setLogoUrl(reader.result as string);
        toast({
          title: "Image Loaded",
          description: "Click 'Save Changes' to apply the update.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto px-4 py-24 max-w-5xl space-y-8">
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'qr')} />
      <input type="file" ref={logoInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'logo')} />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <Link href="/admin" className="text-sm text-primary flex items-center gap-2 hover:underline mb-2">
            <ArrowLeft className="w-3 h-3" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl font-headline font-bold">Site Configuration</h1>
          <p className="text-muted-foreground">Manage your brand logo and payment methods.</p>
        </div>
        <Button onClick={handleSave} className="glow-primary h-12 px-8">
          <Save className="w-4 h-4 mr-2" /> Save Changes
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="bg-card border-white/5">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <ImageIcon className="w-5 h-5 text-primary" />
              </div>
              <CardTitle>Site Logo</CardTitle>
            </div>
            <CardDescription>Upload your brand logo for the navbar.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="aspect-video relative rounded-2xl bg-white/5 flex items-center justify-center border border-dashed border-white/10 group overflow-hidden">
              {logoUrl ? (
                <Image src={logoUrl} alt="Site Logo" fill className="object-contain p-4" unoptimized />
              ) : (
                <div className="text-center p-6">
                  <ImageIcon className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-50" />
                  <p className="text-xs text-muted-foreground">Using default SVG logo</p>
                </div>
              )}
              <div 
                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer"
                onClick={() => logoInputRef.current?.click()}
              >
                <Button variant="secondary" size="sm">
                  <Upload className="w-4 h-4 mr-2" /> {logoUrl ? 'Replace' : 'Upload'}
                </Button>
              </div>
            </div>
            {logoUrl && (
              <Button variant="outline" size="sm" className="w-full text-destructive border-destructive/20" onClick={() => setLogoUrl('')}>
                Reset to Default
              </Button>
            )}
          </CardContent>
        </Card>

        <Card className="bg-card border-white/5 lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-green-500" />
              </div>
              <CardTitle>Wallet Configuration</CardTitle>
            </div>
            <CardDescription>Set your primary USDT receiving address (BEP20).</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>USDT Deposit Address</Label>
              <Input 
                value={usdtAddress} 
                onChange={(e) => setUsdtAddress(e.target.value)}
                className="bg-white/5 border-white/10 h-12 font-mono text-sm"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6 items-start">
              <div className="space-y-4">
                <div className="p-4 bg-yellow-500/5 border border-yellow-500/10 rounded-xl flex gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-500 shrink-0" />
                  <p className="text-xs text-yellow-500/80 leading-relaxed">
                    Ensure this address is compatible with the <strong>BNB Smart Chain (BEP20)</strong> network.
                  </p>
                </div>
                <Alert className="bg-primary/5 border-primary/20">
                  <Info className="h-4 w-4" />
                  <AlertTitle className="font-bold text-xs">Checkout Info</AlertTitle>
                  <AlertDescription className="text-[10px] opacity-70">
                    This QR and address appear in the instant purchase modal.
                  </AlertDescription>
                </Alert>
              </div>

              <div className="space-y-4">
                <Label>QR Code Image</Label>
                <div className="aspect-square relative max-w-[200px] bg-white rounded-xl p-3 border-4 border-white/5 group overflow-hidden mx-auto">
                  {qrUrl && <Image src={qrUrl} alt="Payment QR" fill className="object-contain" unoptimized />}
                  <div 
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Button variant="secondary" size="xs">Change QR</Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
