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
  // WEB PROJECTS
  {
    id: 'nextgen-dash',
    title: 'NextGen Dashboard',
    price: 49.99,
    youtubeId: 'dQw4w9WgXcQ',
    shortDescription: 'High-performance analytics dashboard for SaaS companies.',
    fullDescription: 'NextGen Dashboard provides deep insights into business metrics with real-time data streaming. Built with performance and scalability in mind, it features advanced data visualization and customizable reporting tools.',
    thumbnail: PlaceHolderImages.find(img => img.id === 'project-1')?.imageUrl || '',
    images: [PlaceHolderImages.find(img => img.id === 'project-1')?.imageUrl || ''],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Recharts'],
    category: 'Web',
    liveUrl: 'https://demo.example.com',
    adminLiveUrl: 'https://demo.example.com/admin',
    repoUrl: 'https://github.com/scw/nextgen-dash',
    features: ['Real-time analytics', 'Custom widget system', 'Role-based access', 'Exportable reports'],
    documentation: '## Web Installation\n1. Clone the repo\n2. Run `npm install`\n3. Setup `.env` with your DB credentials\n4. Run `npm run dev` to start the server.',
    demoUserEmail: 'user@example.com',
    demoUserPassword: 'password123',
    demoAdminEmail: 'admin@example.com',
    demoAdminPassword: 'adminpassword'
  },
  {
    id: 'ecommerce-portal',
    title: 'Modern E-shop',
    price: 65.00,
    youtubeId: 'dQw4w9WgXcQ',
    shortDescription: 'Full-stack e-commerce solution with Stripe integration.',
    fullDescription: 'A fast, SEO-friendly e-commerce platform with a powerful admin panel. Perfect for small to medium businesses looking to launch their online store quickly.',
    thumbnail: PlaceHolderImages.find(img => img.id === 'project-5')?.imageUrl || '',
    images: [PlaceHolderImages.find(img => img.id === 'project-5')?.imageUrl || ''],
    technologies: ['Next.js', 'Prisma', 'Stripe', 'PostgreSQL'],
    category: 'Web',
    liveUrl: 'https://shop.example.com',
    adminLiveUrl: 'https://shop.example.com/admin',
    repoUrl: 'https://github.com/scw/eshop',
    features: ['Stripe Checkout', 'Inventory Management', 'Order Tracking', 'SEO Optimized'],
    documentation: '## E-commerce Setup\n1. Install dependencies\n2. Connect to a PostgreSQL database\n3. Setup Stripe API keys in .env\n4. Run `npx prisma db push`',
    demoUserEmail: 'customer@eshop.com',
    demoUserPassword: 'password',
    demoAdminEmail: 'shop-admin@test.com',
    demoAdminPassword: 'admin-password-123'
  },
  {
    id: 'ai-portfolio-builder',
    title: 'AI Portfolio Builder',
    price: 39.00,
    youtubeId: 'dQw4w9WgXcQ',
    shortDescription: 'Create stunning developer portfolios using AI agents.',
    fullDescription: 'A specialized platform that uses Genkit and Gemini to automatically generate portfolio content, summaries, and tech stacks from a GitHub profile or raw description.',
    thumbnail: PlaceHolderImages.find(img => img.id === 'project-3')?.imageUrl || '',
    images: [PlaceHolderImages.find(img => img.id === 'project-3')?.imageUrl || ''],
    technologies: ['Next.js', 'Genkit', 'Gemini AI', 'Zod'],
    category: 'Web',
    liveUrl: 'https://ai-portfolio.example.com',
    adminLiveUrl: 'https://ai-portfolio.example.com/admin',
    repoUrl: 'https://github.com/scw/ai-portfolio',
    features: ['AI Copywriting', 'Dynamic themes', 'GitHub integration', 'One-click deploy'],
    documentation: '## AI Tool Setup\n1. Obtain a Google AI API Key\n2. Configure your Genkit plugins\n3. Run `npm run genkit:dev` for testing.',
    demoUserEmail: 'dev@portfolio.ai',
    demoUserPassword: 'password123',
    demoAdminEmail: 'admin@portfolio.ai',
    demoAdminPassword: 'adminpassword'
  },
  {
    id: 'real-estate-cloud',
    title: 'Real Estate Cloud',
    price: 120.00,
    youtubeId: 'dQw4w9WgXcQ',
    shortDescription: 'Premium property listing and management platform.',
    fullDescription: 'A comprehensive solution for real estate agencies. Includes interactive maps, property CRM, agent dashboards, and automated lead generation.',
    thumbnail: PlaceHolderImages.find(img => img.id === 'project-6')?.imageUrl || '',
    images: [PlaceHolderImages.find(img => img.id === 'project-6')?.imageUrl || ''],
    technologies: ['Next.js', 'Google Maps API', 'Firebase', 'Cloudinary'],
    category: 'Web',
    liveUrl: 'https://re-cloud.example.com',
    adminLiveUrl: 'https://re-cloud.example.com/admin',
    repoUrl: 'https://github.com/scw/re-cloud',
    features: ['Map search', 'Agent CRM', '3D property tours', 'Lead tracking'],
    documentation: '## Agency Setup\n1. Setup Firebase Project\n2. Enable Google Maps SDK\n3. Deploy to Vercel for best performance.',
    demoUserEmail: 'buyer@re.com',
    demoUserPassword: 'password',
    demoAdminEmail: 'agent@re.com',
    demoAdminPassword: 'agentpassword'
  },

  // MOBILE PROJECTS
  {
    id: 'profit-mobile-app',
    title: 'ProFit Mobile App',
    price: 89.00,
    youtubeId: 'dQw4w9WgXcQ',
    shortDescription: 'Complete fitness tracking solution with social features.',
    fullDescription: 'A comprehensive mobile application built for fitness enthusiasts. Includes workout planning, calorie tracking, and a social feed for sharing progress.',
    thumbnail: PlaceHolderImages.find(img => img.id === 'project-2')?.imageUrl || '',
    images: [PlaceHolderImages.find(img => img.id === 'project-2')?.imageUrl || ''],
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
    documentation: '## Mobile Setup\n1. Install React Native CLI\n2. Run `npm install`\n3. Configure Firebase in `google-services.json`\n4. Run `npx react-native run-android` or `run-ios`.',
    demoUserEmail: 'tester@profit.com',
    demoUserPassword: 'testpassword',
    demoAdminEmail: 'admin@profit.com',
    demoAdminPassword: 'adminpassword'
  },
  {
    id: 'quickbite-delivery',
    title: 'QuickBite Delivery',
    price: 99.00,
    youtubeId: 'dQw4w9WgXcQ',
    shortDescription: 'On-demand food delivery app with driver tracking.',
    fullDescription: 'A dual-app food delivery solution. Features real-time GPS tracking for customers, orders management for restaurants, and a dedicated app for drivers.',
    thumbnail: PlaceHolderImages.find(img => img.id === 'project-4')?.imageUrl || '',
    images: [PlaceHolderImages.find(img => img.id === 'project-4')?.imageUrl || ''],
    screenshots: [
      "https://picsum.photos/seed/food1/400/800",
      "https://picsum.photos/seed/food2/400/800",
      "https://picsum.photos/seed/food3/400/800"
    ],
    technologies: ['Flutter', 'Node.js', 'MongoDB', 'Socket.io'],
    category: 'Mobile',
    downloadApkUrl: 'https://example.com/download/quickbite.apk',
    repoUrl: 'https://github.com/scw/quickbite',
    features: ['Real-time tracking', 'Multi-restaurant system', 'In-app chat', 'Wallet & Payments'],
    documentation: '## Flutter Installation\n1. Install Flutter SDK\n2. Run `flutter pub get`\n3. Setup your Node.js backend URL in `config.dart`\n4. Build with `flutter build apk`.',
    demoUserEmail: 'hungry@bite.com',
    demoUserPassword: 'password123',
    demoAdminEmail: 'manager@bite.com',
    demoAdminPassword: 'managerpassword'
  },
  {
    id: 'walletx-crypto',
    title: 'WalletX Crypto',
    price: 150.00,
    youtubeId: 'dQw4w9WgXcQ',
    shortDescription: 'Secure cryptocurrency wallet with Web3 integration.',
    fullDescription: 'A secure, non-custodial crypto wallet supporting multiple blockchains. Integrated with Web3 for DeFi swaps and NFT viewing.',
    thumbnail: PlaceHolderImages.find(img => img.id === 'project-7')?.imageUrl || '',
    images: [PlaceHolderImages.find(img => img.id === 'project-7')?.imageUrl || ''],
    screenshots: [
      "https://picsum.photos/seed/crypto1/400/800",
      "https://picsum.photos/seed/crypto2/400/800",
      "https://picsum.photos/seed/crypto3/400/800"
    ],
    technologies: ['React Native', 'Ether.js', 'Web3.js', 'Solidity'],
    category: 'Mobile',
    downloadApkUrl: 'https://example.com/download/walletx.apk',
    repoUrl: 'https://github.com/scw/walletx',
    features: ['Multi-chain support', 'Biometric security', 'NFT Gallery', 'DEX integration'],
    documentation: '## Crypto App Setup\n1. Install dependencies\n2. Setup Infura/Alchemy API keys\n3. Run `npm start` and use Expo Go or local build.',
    demoUserEmail: 'holder@wallet.com',
    demoUserPassword: 'password123',
    demoAdminEmail: 'admin@wallet.com',
    demoAdminPassword: 'adminpassword'
  },
  {
    id: 'studysphere-edu',
    title: 'StudySphere Pro',
    price: 79.00,
    youtubeId: 'dQw4w9WgXcQ',
    shortDescription: 'LMS mobile app for online courses and quizzes.',
    fullDescription: 'A complete Learning Management System in your pocket. Supports video lessons, interactive quizzes, student progress tracking, and offline learning.',
    thumbnail: PlaceHolderImages.find(img => img.id === 'project-8')?.imageUrl || '',
    images: [PlaceHolderImages.find(img => img.id === 'project-8')?.imageUrl || ''],
    screenshots: [
      "https://picsum.photos/seed/edu1/400/800",
      "https://picsum.photos/seed/edu2/400/800",
      "https://picsum.photos/seed/edu3/400/800"
    ],
    technologies: ['React Native', 'Firebase Storage', 'Vimeo SDK', 'Zustand'],
    category: 'Mobile',
    downloadApkUrl: 'https://example.com/download/studysphere.apk',
    repoUrl: 'https://github.com/scw/studysphere',
    features: ['Offline video access', 'Quiz engine', 'Certificate generator', 'Push notifications'],
    documentation: '## EDU App Setup\n1. Connect to Firebase for user data\n2. Setup Vimeo/YouTube API for video content\n3. Build with `npx react-native run-android`.',
    demoUserEmail: 'student@study.com',
    demoUserPassword: 'password123',
    demoAdminEmail: 'teacher@study.com',
    demoAdminPassword: 'teacherpassword'
  }
];