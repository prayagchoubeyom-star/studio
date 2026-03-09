
import { PlaceHolderImages } from './placeholder-images';

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  thumbnail: string;
  images: string[];
  technologies: string[];
  category: 'Web' | 'Mobile' | 'AI' | '3D';
  liveUrl?: string;
  repoUrl?: string;
  youtubeId?: string; // New field
  price: number; // New field
  features: string[];
  has3D?: boolean;
  documentation?: string; // New field
}

export const projects: Project[] = [
  {
    id: 'nextgen-dash',
    title: 'NextGen Dashboard',
    price: 49.99,
    youtubeId: 'dQw4w9WgXcQ', // Placeholder ID
    shortDescription: 'A high-performance analytics dashboard for SaaS companies.',
    fullDescription: 'NextGen Dashboard provides deep insights into business metrics with real-time data streaming. Built with performance and scalability in mind, it features advanced data visualization and customizable reporting tools.',
    thumbnail: PlaceHolderImages.find(img => img.id === 'project-1')?.imageUrl || '',
    images: [
      PlaceHolderImages.find(img => img.id === 'project-1')?.imageUrl || '',
      PlaceHolderImages.find(img => img.id === 'project-2')?.imageUrl || ''
    ],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Recharts'],
    category: 'Web',
    liveUrl: 'https://demo.example.com',
    repoUrl: 'https://github.com/scw/nextgen-dash',
    features: ['Real-time analytics', 'Custom widget system', 'Role-based access', 'Exportable reports'],
    has3D: false,
    documentation: '## Installation\n1. Clone the repo\n2. Run `npm install`\n3. Setup `.env`\n4. Run `npm run dev`'
  },
  {
    id: 'ai-companion',
    title: 'AI Companion',
    price: 79.00,
    youtubeId: 'dQw4w9WgXcQ',
    shortDescription: 'An intelligent personal assistant powered by LLMs.',
    fullDescription: 'AI Companion is more than just a chatbot. It integrates with your daily workflow to help summarize emails, generate code snippets, and manage your calendar using state-of-the-art AI models.',
    thumbnail: PlaceHolderImages.find(img => img.id === 'project-3')?.imageUrl || '',
    images: [
      PlaceHolderImages.find(img => img.id === 'project-3')?.imageUrl || '',
      PlaceHolderImages.find(img => img.id === 'project-1')?.imageUrl || ''
    ],
    technologies: ['OpenAI API', 'React', 'Node.js', 'Firebase'],
    category: 'AI',
    liveUrl: 'https://ai-companion.example.com',
    repoUrl: 'https://github.com/scw/ai-companion',
    features: ['Context-aware conversations', 'Multi-modal input', 'Cross-platform sync', 'Local storage for privacy'],
    has3D: false,
    documentation: '## Setup Guide\n- API Key required for OpenAI.\n- Firebase config needed for auth.'
  },
  {
    id: 'scw-3d-visualizer',
    title: '3D Product Visualizer',
    price: 120.00,
    youtubeId: 'dQw4w9WgXcQ',
    shortDescription: 'Interactive 3D engine for exploring products in the browser.',
    fullDescription: 'A cutting-edge visualizer that allows users to interact with 3D models of products. It includes lighting controls, material switching, and AR capabilities for a truly immersive shopping experience.',
    thumbnail: PlaceHolderImages.find(img => img.id === 'project-4')?.imageUrl || '',
    images: [
      PlaceHolderImages.find(img => img.id === 'project-4')?.imageUrl || '',
      PlaceHolderImages.find(img => img.id === 'project-2')?.imageUrl || ''
    ],
    technologies: ['Three.js', 'React Three Fiber', 'GLSL', 'WebXR'],
    category: '3D',
    liveUrl: 'https://3d.example.com',
    repoUrl: 'https://github.com/scw/3d-visualizer',
    features: ['PBR rendering', 'Dynamic shadows', 'AR support', 'Custom GLTF loader'],
    has3D: true,
    documentation: '## 3D Asset Management\n- Place GLB files in /public/assets\n- Adjust material properties in config.js'
  }
];
