
"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code, ShieldCheck, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPass, setAdminPass] = useState('');

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Default credentials as requested
    if (adminEmail === 'test@admin.com' && adminPass === 'admin') {
      localStorage.setItem('scw_admin_logged_in', 'true');
      toast({
        title: "Login Successful",
        description: "Welcome back, Administrator.",
      });
      router.push('/admin');
    } else {
      toast({
        variant: "destructive",
        title: "Invalid Credentials",
        description: "Please check your admin email and password.",
      });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 blur-[150px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <Card className="w-full max-w-md bg-card/50 backdrop-blur-xl border-white/10 relative z-10 shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-2">
            <Code className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-3xl font-headline font-bold">Welcome Back</CardTitle>
          <CardDescription>Access your source code library or manage projects.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="admin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/5">
              <TabsTrigger value="user">Buyer Login</TabsTrigger>
              <TabsTrigger value="admin">Admin Portal</TabsTrigger>
            </TabsList>
            
            <TabsContent value="user" className="space-y-6">
              <div className="grid gap-4">
                <Button variant="outline" className="h-12 border-white/10 bg-white/5 hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Continue with Google
                </Button>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/10"></span></div>
                  <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">Or with email</span></div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" className="bg-white/5 border-white/10 h-12" />
                </div>
                <Button className="w-full h-12 glow-primary">Sign In</Button>
              </div>
            </TabsContent>

            <TabsContent value="admin" className="space-y-6">
               <div className="flex items-center gap-3 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl mb-4">
                <ShieldCheck className="w-5 h-5 text-yellow-500" />
                <span className="text-xs text-yellow-500 font-medium">Authorized staff only. IP addresses are logged.</span>
              </div>
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-id">Admin Email</Label>
                  <Input 
                    id="admin-id" 
                    type="email" 
                    placeholder="test@admin.com" 
                    className="bg-white/5 border-white/10 h-12"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-pass">Access Key</Label>
                  <Input 
                    id="admin-pass" 
                    type="password" 
                    placeholder="admin" 
                    className="bg-white/5 border-white/10 h-12"
                    value={adminPass}
                    onChange={(e) => setAdminPass(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 text-white" disabled={loading}>
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Login to Console"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <p className="text-xs text-center text-muted-foreground">
            Don't have an account? <Link href="/register" className="text-primary hover:underline">Create one</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
