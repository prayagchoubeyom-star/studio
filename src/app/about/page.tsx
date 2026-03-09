"use client"

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Github, Linkedin, Mail, Twitter, Send, MapPin, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function AboutPage() {
  const { toast } = useToast();
  const avatar = PlaceHolderImages.find(img => img.id === 'avatar');

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  function onSubmit(values: z.infer<typeof contactSchema>) {
    console.log(values);
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });
    form.reset();
  }

  return (
    <div className="pb-24">
      {/* Bio Section */}
      <section className="container mx-auto px-4 py-24 grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative group">
          <div className="absolute -inset-4 bg-primary/20 blur-2xl rounded-[3rem] group-hover:bg-primary/30 transition-all duration-500" />
          <div className="relative aspect-square max-w-md mx-auto overflow-hidden rounded-[2.5rem] border border-white/10">
            {avatar && (
              <Image 
                src={avatar.imageUrl} 
                alt="Developer Profile" 
                fill 
                className="object-cover"
                data-ai-hint={avatar.imageHint}
              />
            )}
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <Badge variant="outline" className="text-primary border-primary/30">About Me</Badge>
            <h1 className="text-5xl font-headline font-bold">Designing <span className="gradient-text">Future-Proof</span> Software Solutions.</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a seasoned Full-Stack Developer with a passion for building scalable, high-performance web applications. 
              With expertise in modern frameworks and a keen eye for UX design, I bridge the gap between technical complexity and user simplicity.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-headline font-bold text-xl">Core Skills</h3>
              <div className="flex flex-wrap gap-2">
                {['Next.js', 'TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Three.js', 'Tailwind'].map(skill => (
                  <Badge key={skill} variant="secondary" className="bg-white/5 hover:bg-white/10 transition-colors font-normal">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-headline font-bold text-xl">Certifications</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• AWS Certified Solutions Architect</li>
                <li>• Google Professional Cloud Developer</li>
                <li>• Meta Front-End Specialization</li>
              </ul>
            </div>
          </div>

          <div className="flex gap-4">
            <Button size="icon" variant="outline" className="rounded-full border-white/10 hover:bg-primary/10 hover:text-primary transition-all">
              <Github className="w-5 h-5" />
            </Button>
            <Button size="icon" variant="outline" className="rounded-full border-white/10 hover:bg-primary/10 hover:text-primary transition-all">
              <Linkedin className="w-5 h-5" />
            </Button>
            <Button size="icon" variant="outline" className="rounded-full border-white/10 hover:bg-primary/10 hover:text-primary transition-all">
              <Twitter className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container mx-auto px-4 py-24 scroll-mt-24">
        <div className="max-w-6xl mx-auto glass-card rounded-[3rem] overflow-hidden grid lg:grid-cols-5 border-white/10">
          <div className="lg:col-span-2 bg-primary/10 p-12 space-y-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
            
            <div className="space-y-4 relative z-10">
              <h2 className="text-3xl font-headline font-bold text-white">Let's Connect</h2>
              <p className="text-white/70">
                Ready to start your next project or just want to say hi? Fill out the form and I'll get back to you within 24 hours.
              </p>
            </div>

            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-white/50">Email Me</div>
                  <div className="text-white font-medium">hello@scw.store</div>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-white/50">Location</div>
                  <div className="text-white font-medium">San Francisco, CA</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 p-12 bg-card">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" className="bg-white/5 border-white/10 h-12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="john@example.com" className="bg-white/5 border-white/10 h-12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="Project Inquiry" className="bg-white/5 border-white/10 h-12" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Tell me about your project..." className="bg-white/5 border-white/10 min-h-[150px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" size="lg" className="w-full h-14 glow-primary">
                  <Send className="w-4 h-4 mr-2" /> Send Message
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </section>
    </div>
  );
}
