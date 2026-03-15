
"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowLeft, Save, Wallet, QrCode, AlertCircle, Info } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function AdminSettingsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [usdtAddress, setUsdtAddress] = useState('0x6cdeb76a8901dfb1a90cf2bf0923e638bb3e10d7');
  const qrAsset = PlaceHolderImages.find(img => img.id === 'usdt-qr');
  const [qrUrl, setQrUrl] = useState(qrAsset?.imageUrl || '');

  useEffect(() => {
    const loggedIn = localStorage.getItem('scw_admin_logged_in');
    if (!loggedIn) router.push('/login');
  }, [router]);

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Payment details have been updated globally.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <Link href="/admin" className="text-sm text-primary flex items-center gap-2 hover:underline mb-2">
            <ArrowLeft className="w-3 h-3" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl font-headline font-bold">Payment Settings</h1>
          <p className="text-muted-foreground">Configure how customers pay for your source code products.</p>
        </div>
        <Button onClick={handleSave} className="glow-primary h-12 px-8">
          <Save className="w-4 h-4 mr-2" /> Save Changes
        </Button>
      </div>

      <Alert className="bg-primary/5 border-primary/20 text-primary-foreground">
        <Info className="h-4 w-4 text-primary" />
        <AlertTitle className="text-primary font-bold">Heads up!</AlertTitle>
        <AlertDescription className="text-primary/80">
          Updating these settings will change the deposit details shown in the "Buy Source Code" modal for all projects across the site.
        </AlertDescription>
      </Alert>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="bg-card border-white/5 h-fit">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-green-500" />
              </div>
              <CardTitle>Wallet Configuration</CardTitle>
            </div>
            <CardDescription>Set your primary USDT receiving address.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>USDT Deposit Address (BEP20)</Label>
              <Input 
                value={usdtAddress} 
                onChange={(e) => setUsdtAddress(e.target.value)}
                className="bg-white/5 border-white/10 h-12 font-mono text-sm"
              />
            </div>
            <div className="p-4 bg-yellow-500/5 border border-yellow-500/10 rounded-xl flex gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-500 shrink-0" />
              <p className="text-xs text-yellow-500/80 leading-relaxed">
                Ensure this address is compatible with the <strong>BNB Smart Chain (BEP20)</strong> network. Using the wrong network will result in permanent loss of funds.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-white/5">
          <CardHeader>
             <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <QrCode className="w-5 h-5 text-blue-500" />
              </div>
              <CardTitle>QR Code Photo</CardTitle>
            </div>
            <CardDescription>Upload or link your payment QR code.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="aspect-square relative max-w-[240px] mx-auto bg-white rounded-2xl p-4 shadow-inner overflow-hidden">
               <Image 
                src={qrUrl} 
                alt="Payment QR" 
                fill 
                className="object-contain p-4"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                <Button variant="secondary" size="sm">Update Photo</Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>QR Photo URL</Label>
              <Input 
                value={qrUrl} 
                onChange={(e) => setQrUrl(e.target.value)}
                className="bg-white/5 border-white/10 h-12 text-sm"
                placeholder="https://example.com/qr.png"
              />
            </div>
          </CardContent>
          <CardFooter className="bg-white/5 border-t border-white/5 p-4">
             <p className="text-xs text-muted-foreground text-center w-full">
               Photo will be used in the checkout modal.
             </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
