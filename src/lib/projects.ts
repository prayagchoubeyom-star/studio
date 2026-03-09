
import { PlaceHolderImages } from './placeholder-images';

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  thumbnail: string;
  images: string[];
  screenshots?: string[];
  technologies: string[];
  category: 'Web' | 'Mobile';
  liveUrl?: string;
  adminLiveUrl?: string;
  repoUrl?: string;
  downloadApkUrl?: string;
  youtubeId?: string;
  price: number;
  features: string[];
  documentation?: string;
  demoUserEmail?: string;
  demoUserPassword?: string;
  demoAdminEmail?: string;
  demoAdminPassword?: string;
}

export const projects: Project[] = [
  {
    id: 'nextgen-dash',
    title: 'NextGen Dashboard',
    price: 49.99,
    youtubeId: 'dQw4w9WgXcQ',
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
    adminLiveUrl: 'https://demo.example.com/admin',
    repoUrl: 'https://github.com/scw/nextgen-dash',
    features: ['Real-time analytics', 'Custom widget system', 'Role-based access', 'Exportable reports'],
    documentation: '## Installation\n1. Clone the repo\n2. Run `npm install`\n3. Setup `.env`\n4. Run `npm run dev`',
    demoUserEmail: 'user@example.com',
    demoUserPassword: 'password123',
    demoAdminEmail: 'admin@example.com',
    demoAdminPassword: 'adminpassword'
  },
  {
    id: 'fitness-tracker-app',
    title: 'ProFit Mobile App',
    price: 89.00,
    youtubeId: 'dQw4w9WgXcQ',
    shortDescription: 'Complete fitness tracking solution with social features.',
    fullDescription: 'A comprehensive mobile application built with React Native for fitness enthusiasts. Includes workout planning, calorie tracking, and a social feed for sharing progress.',
    thumbnail: PlaceHolderImages.find(img => img.id === 'project-2')?.imageUrl || '',
    images: [
      PlaceHolderImages.find(img => img.id === 'project-2')?.imageUrl || '',
      PlaceHolderImages.find(img => img.id === 'project-3')?.imageUrl || ''
    ],
    screenshots: [
      "https://picsum.photos/seed/mobile1/400/800",
      "https://picsum.photos/seed/mobile2/400/800",
      "https://picsum.photos/seed/mobile3/400/800"
    ],
    technologies: ['React Native', 'Firebase', 'Redux', 'NativeWind'],
    category: 'Mobile',
    downloadApkUrl: 'https://example.com/download/profit.apk',
    repoUrl: 'https://github.com/scw/profit-app',
    features: ['Activity tracking', 'Custom workout builder', 'Meal logging', 'Friend system'],
    documentation: '## Mobile Setup\n1. Install React Native CLI\n2. Run `npm install`\n3. Configure Firebase in `google-services.json`\n4. Run `npx react-native run-android`',
    demoUserEmail: 'tester@profit.com',
    demoUserPassword: 'testpassword',
    demoAdminEmail: 'admin@profit.com',
    demoAdminPassword: 'adminpassword'
  },
  {
    id: 'ecommerce-portal',
    title: 'Modern E-shop',
    price: 65.00,
    youtubeId: 'dQw4w9WgXcQ',
    shortDescription: 'Full-stack e-commerce solution with Stripe integration.',
    fullDescription: 'A fast, SEO-friendly e-commerce platform with a powerful admin panel. Perfect for small to medium businesses looking to launch their online store quickly.',
    thumbnail: PlaceHolderImages.find(img => img.id === 'project-4')?.imageUrl || '',
    images: [
      PlaceHolderImages.find(img => img.id === 'project-4')?.imageUrl || '',
      PlaceHolderImages.find(img => img.id === 'project-1')?.imageUrl || ''
    ],
    technologies: ['Next.js', 'Prisma', 'Stripe', 'PostgreSQL'],
    category: 'Web',
    liveUrl: 'https://shop.example.com',
    adminLiveUrl: 'https://shop.example.com/admin',
    repoUrl: 'https://github.com/scw/eshop',
    features: ['Stripe Checkout', 'Inventory Management', 'Order Tracking', 'SEO Optimized'],
    documentation: '## Deployment\n- Deploy to Vercel\n- Setup database on Supabase\n- Configure Stripe Webhooks',
    demoUserEmail: 'customer@eshop.com',
    demoUserPassword: 'password',
    demoAdminEmail: 'shop-admin@test.com',
    demoAdminPassword: 'admin-password-123'
  }
];
