
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LayoutDashboard, Package, Users, DollarSign, Wand2, Plus, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Sales', value: '$1,240', icon: DollarSign, color: 'text-green-500' },
    { label: 'Active Projects', value: '12', icon: Package, color: 'text-blue-500' },
    { label: 'Total Users', value: '840', icon: Users, color: 'text-purple-500' },
  ];

  return (
    <div className="container mx-auto px-4 py-24 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-headline font-bold">Admin Console</h1>
          <p className="text-muted-foreground">Manage your marketplace and project content.</p>
        </div>
        <div className="flex gap-4">
           <Button className="glow-primary" asChild>
            <Link href="/admin/summarizer"><Wand2 className="w-4 h-4 mr-2" /> AI Summarizer</Link>
          </Button>
          <Button variant="outline"><Plus className="w-4 h-4 mr-2" /> Add Project</Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="bg-card border-white/5">
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
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>Latest source code purchases across the platform.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { user: 'Sarah Connor', project: 'AI Companion', date: '2 mins ago', price: '$79.00' },
                { user: 'John Wick', project: 'NextGen Dash', date: '45 mins ago', price: '$49.99' },
                { user: 'Bruce Wayne', project: '3D Visualizer', date: '3 hours ago', price: '$120.00' },
              ].map((sale, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                      {sale.user[0]}
                    </div>
                    <div>
                      <div className="font-medium">{sale.user}</div>
                      <div className="text-xs text-muted-foreground">{sale.project} • {sale.date}</div>
                    </div>
                  </div>
                  <div className="font-bold text-primary">{sale.price}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-white/5">
          <CardHeader>
            <CardTitle>Developer Tools</CardTitle>
            <CardDescription>Utilities to speed up your work.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <Link href="/admin/summarizer" className="block group">
              <div className="p-4 bg-white/5 rounded-xl border border-white/5 hover:border-primary/50 transition-all flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Wand2 className="w-5 h-5 text-primary" />
                  <div className="font-medium group-hover:text-primary">AI Content Gen</div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </Link>
            <div className="p-4 bg-white/5 rounded-xl border border-white/5 opacity-50 cursor-not-allowed flex items-center justify-between">
              <div className="flex items-center gap-3">
                <LayoutDashboard className="w-5 h-5" />
                <div className="font-medium">Site Analytics</div>
              </div>
              <Badge variant="secondary">Coming Soon</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
