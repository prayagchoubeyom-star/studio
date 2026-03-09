"use client"

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { generateProjectSummary, GenerateProjectSummaryInput, GenerateProjectSummaryOutput } from '@/ai/flows/generate-project-summary';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wand2, Loader2, Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  projectName: z.string().min(2, "Project name is required"),
  rawDescription: z.string().min(20, "Please provide a more detailed description"),
  technologiesUsed: z.string().describe("Comma separated technologies"),
  keyFeatures: z.string().describe("Comma separated features"),
  targetAudience: z.string().min(5, "Target audience is required"),
  developerNotes: z.string().optional(),
});

export default function SummarizerPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateProjectSummaryOutput | null>(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: '',
      rawDescription: '',
      technologiesUsed: '',
      keyFeatures: '',
      targetAudience: '',
      developerNotes: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const input: GenerateProjectSummaryInput = {
        ...values,
        technologiesUsed: values.technologiesUsed.split(',').map(s => s.trim()),
        keyFeatures: values.keyFeatures.split(',').map(s => s.trim()),
      };
      
      const output = await generateProjectSummary(input);
      setResult(output);
      toast({
        title: "Summary Generated!",
        description: "Your project summary is ready for use.",
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "There was an error generating your summary. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  const copyToClipboard = () => {
    if (!result) return;
    navigator.clipboard.writeText(`Summary: ${result.summary}\nKeywords: ${result.keywords.join(', ')}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Copied to clipboard",
    });
  };

  return (
    <div className="container mx-auto px-4 py-24 max-w-5xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="space-y-2">
          <h1 className="text-4xl font-headline font-bold">AI Project <span className="text-primary">Summarizer</span></h1>
          <p className="text-muted-foreground">Transform raw technical details into captivating portfolio copy using AI.</p>
        </div>
        <Badge variant="outline" className="w-fit text-secondary border-secondary/30 h-8">Dev Tool</Badge>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <Card className="bg-card border-white/10">
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
            <CardDescription>Enter your raw project info below.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="projectName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. NextGen Dash" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="rawDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Raw Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe what the project does in your own words..." 
                          className="min-h-[120px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="technologiesUsed"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Technologies</FormLabel>
                        <FormControl>
                          <Input placeholder="Next.js, TS, AI" {...field} />
                        </FormControl>
                        <FormDescription>Comma separated</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="keyFeatures"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Key Features</FormLabel>
                        <FormControl>
                          <Input placeholder="Auth, 3D, Stripe" {...field} />
                        </FormControl>
                        <FormDescription>Comma separated</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="targetAudience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Audience</FormLabel>
                      <FormControl>
                        <Input placeholder="SaaS founders, Developers" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full h-12 glow-primary" disabled={loading}>
                  {loading ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
                  ) : (
                    <><Wand2 className="mr-2 h-4 w-4" /> Generate Summary</>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="bg-white/5 border-white/10 min-h-[500px] flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div className="space-y-1">
                <CardTitle>Generated Result</CardTitle>
                <CardDescription>Your polished content will appear here.</CardDescription>
              </div>
              {result && (
                <Button variant="outline" size="icon" onClick={copyToClipboard}>
                  {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
              )}
            </CardHeader>
            <CardContent className="flex-grow flex flex-col gap-8 py-8">
              {!result && !loading && (
                <div className="flex-grow flex flex-col items-center justify-center text-center p-12 space-y-4 opacity-50">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                    <Wand2 className="w-8 h-8" />
                  </div>
                  <p>Submit the form to see AI magic.</p>
                </div>
              )}

              {loading && (
                <div className="flex-grow flex flex-col items-center justify-center text-center space-y-4">
                  <Loader2 className="w-12 h-12 animate-spin text-primary" />
                  <p className="animate-pulse">Thinking, writing, polishing...</p>
                </div>
              )}

              {result && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-primary">Captivating Summary</h3>
                    <p className="text-lg leading-relaxed">{result.summary}</p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-secondary">Optimized Keywords</h3>
                    <div className="flex flex-wrap gap-2">
                      {result.keywords.map((kw, i) => (
                        <Badge key={i} variant="secondary" className="px-3 py-1 font-normal bg-secondary/10 text-secondary-foreground">
                          {kw}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
