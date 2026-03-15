
"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Package, 
  Users, 
  DollarSign, 
  Wand2, 
  Plus, 
  ArrowUpRight, 
  Image as ImageIcon,
  Settings,
  LogOut,
  Wallet
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const loggedIn = localStorage.getItem('scw_admin_logged_in');
    if (!loggedIn) {
      router.push('/login');
    }
  }, [router]);

  if (!isMounted) return null;

  const handleLogout = () => {
    localStorage.removeItem('scw_admin_logged_in');
    router.push('/login');
  };

  const stats = [
    { label: 'Total Sales', value: '$1,240', icon: DollarSign, color: 'text-green-500' },
    { label: 'Active Projects', value: '11', icon: Package, color: 'text-blue-500' },
    { label: 'Total Users', value: '840', icon: Users, color: 'text-purple-500' },
  ];

  return (
    <div className="container mx-auto px-4 py-24 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-headline font-bold">Admin Console</h1>
          <p className="text-muted-foreground">Manage your marketplace, projects, and site settings.</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button variant="outline" onClick={handleLogout} className="border-destructive/20 text-destructive hover:bg-destructive/10">
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
          <Button className="glow-primary" asChild>
            <Link href="/admin/summarizer"><Wand2 className="w-4 h-4 mr-2" /> AI Summarizer</Link>
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="bg-card border-white/5 shadow-xl">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                <p className="text-3xl font-headline font-bold">{stat.value}</p>
              </div>
              <div className={`p-4 rounded-2xl bg-white/5 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 bg-card border-white/5">
          <CardHeader>
            <CardTitle>Core Management</CardTitle>
            <CardDescription>Update projects and website assets.</CardDescription>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-2 gap-4">
            <Link href="/admin/projects" className="group">
              <div className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-primary/50 transition-all space-y-4 h-full">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Package className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-lg group-hover:text-primary">Manage Projects</h3>
                  <p className="text-sm text-muted-foreground">Add, edit or delete trading projects and source codes.</p>
                </div>
              </div>
            </Link>

            <Link href="/admin/assets" className="group">
              <div className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-secondary/50 transition-all space-y-4 h-full">
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                  <ImageIcon className="w-6 h-6 text-secondary" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-lg group-hover:text-secondary">Website Assets</h3>
                  <p className="text-sm text-muted-foreground">Update site-wide photos, avatars, and background images.</p>
                </div>
              </div>
            </Link>

            <Link href="/admin/settings" className="group">
              <div className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-green-500/50 transition-all space-y-4 h-full">
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-green-500" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-lg group-hover:text-green-500">Payment Settings</h3>
                  <p className="text-sm text-muted-foreground">Update USDT deposit address and QR code photo.</p>
                </div>
              </div>
            </Link>

            <Link href="/admin/summarizer" className="group">
              <div className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-orange-500/50 transition-all space-y-4 h-full">
                <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center">
                  <Wand2 className="w-6 h-6 text-orange-500" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-lg group-hover:text-orange-500">AI Content Tools</h3>
                  <p className="text-sm text-muted-foreground">Generate catchy project summaries and keywords with AI.</p>
                </div>
              </div>
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-card border-white/5">
          <CardHeader>
            <CardTitle>System Overview</CardTitle>
            <CardDescription>Current site health and status.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <span className="text-sm font-medium">Server Status</span>
              <Badge className="bg-green-500/20 text-green-500 border-green-500/20">Operational</Badge>
            </div>
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <span className="text-sm font-medium">Database</span>
              <Badge variant="secondary">Connected</Badge>
            </div>
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <span className="text-sm font-medium">Pending Approvals</span>
              <Badge variant="outline">0</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
