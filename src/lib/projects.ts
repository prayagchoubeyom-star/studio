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
    id: 'forex-setup',
    title: 'Forex trading complete setup',
    price: 49.99,
    youtubeId: 'dQw4w9WgXcQ',
    shortDescription: 'Professional forex trading platform with MT4/MT5 integration.',
    fullDescription: 'A complete forex trading solution featuring real-time charts, technical indicators, and seamless broker integration. Built for performance and reliability in the high-stakes trading environment.',
    thumbnail: PlaceHolderImages.find(img => img.id === 'project-1')?.imageUrl || '',
    images: [PlaceHolderImages.find(img => img.id === 'project-1')?.imageUrl || ''],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Socket.io'],
    category: 'Web',
    liveUrl: 'https://demo.example.com',
    adminLiveUrl: 'https://demo.example.com/admin',
    repoUrl: 'https://github.com/scw/forex-trading',
    features: ['Real-time data streaming', 'Multiple currency pairs', 'Risk management tools', 'User dashboard'],
    documentation: '## Forex Setup Guide\n1. Clone the repository\n2. Configure your MT4/MT5 API keys\n3. Set up environment variables\n4. Run `npm install` and `npm run dev`.',
    demoUserEmail: 'trader@example.com',
    demoUserPassword: 'password123',
    demoAdminEmail: 'admin@trading.com',
    demoAdminPassword: 'adminpassword'
  },
  {
    id: 'copytrading-setup',
    title: 'copytrading complete setup',
    price: 65.00,
    youtubeId: 'dQw4w9WgXcQ',
    shortDescription: 'Automated copy-trading platform for master and follower accounts.',
    fullDescription: 'Enable users to follow professional traders automatically. This setup includes master account management, follower synchronization, and detailed performance analytics.',
    thumbnail: PlaceHolderImages.find(img => img.id === 'project-5')?.imageUrl || '',
    images: [PlaceHolderImages.find(img => img.id === 'project-5')?.imageUrl || ''],
    technologies: ['Next.js', 'Prisma', 'PostgreSQL', 'Redis'],
    category: 'Web',
    liveUrl: 'https://copy.example.com',
    adminLiveUrl: 'https://copy.example.com/admin',
    repoUrl: 'https://github.com/scw/copytrading',
    features: ['Auto-copy execution', 'Trader leaderboard', 'Profit sharing system', 'Secure API keys'],
    documentation: '## Copytrading Setup\n1. Connect master API\n2. Setup Redis for fast execution\n3. Configure your database\n4. Deploy to a high-performance server.',
    demoUserEmail: 'follower@test.com',
    demoUserPassword: 'password',
    demoAdminEmail: 'master@test.com',
    demoAdminPassword: 'masterpassword'
  },
  {
    id: 'funded-forex',
    title: 'funded forex compelete setup',
    price: 39.00,
    youtubeId: 'dQw4w9WgXcQ',
    shortDescription: 'Prop firm management platform with evaluation tracking.',
    fullDescription: 'Launch your own prop firm with this funded account management system. Includes challenge tracking, drawdown monitoring, and automated payout management.',
    thumbnail: PlaceHolderImages.find(img => img.id === 'project-3')?.imageUrl || '',
    images: [PlaceHolderImages.find(img => img.id === 'project-3')?.imageUrl || ''],
    technologies: ['Next.js', 'Firebase', 'Chart.js', 'Zod'],
    category: 'Web',
    liveUrl: 'https://funded.example.com',
    adminLiveUrl: 'https://funded.example.com/admin',
    repoUrl: 'https://github.com/scw/funded-forex',
    features: ['Challenge dashboards', 'Daily drawdown alerts', 'Automated KYC', 'Payout processing'],
    documentation: '## Funded Firm Setup\n1. Define your challenge parameters\n2. Setup Firebase for user data\n3. Configure payout methods\n4. Customize the branding.',
    demoUserEmail: 'candidate@prop.com',
    demoUserPassword: 'password123',
    demoAdminEmail: 'manager@prop.com',
    demoAdminPassword: 'managerpassword'
  },
  {
    id: 'quotex-clone',
    title: 'quotex clone complete setup',
    price: 120.00,
    youtubeId: 'dQw4w9WgXcQ',
    shortDescription: 'Binary options trading platform with instant execution.',
    fullDescription: 'A high-speed binary options trading platform clone. Features OTC market simulation, high/low trading options, and an advanced admin panel for signal management.',
    thumbnail: PlaceHolderImages.find(img => img.id === 'project-6')?.imageUrl || '',
    images: [PlaceHolderImages.find(img => img.id === 'project-6')?.imageUrl || ''],
    technologies: ['Next.js', 'WebSockets', 'Tailwind CSS', 'Node.js'],
    category: 'Web',
    liveUrl: 'https://quotex-clone.example.com',
    adminLiveUrl: 'https://quotex-clone.example.com/admin',
    repoUrl: 'https://github.com/scw/quotex-clone',
    features: ['Instant trade execution', 'Demo/Real balance', 'Signal management', 'Mobile-responsive UI'],
    documentation: '## Quotex Clone Setup\n1. Setup WebSocket server\n2. Configure market data feeds\n3. Deploy the admin dashboard\n4. Connect to your payment gateway.',
    demoUserEmail: 'trader@demo.com',
    demoUserPassword: 'password',
    demoAdminEmail: 'operator@test.com',
    demoAdminPassword: 'operatorpassword'
  },
  {
    id: 'lp-connection',
    title: 'lp connection a book complelet setup',
    price: 150.00,
    shortDescription: 'Direct liquidity provider connection with A-Book risk management.',
    fullDescription: 'Establish a direct bridge between your trading platform and top-tier liquidity providers. This A-Book setup ensures high-speed execution, minimal slippage, and professional-grade risk management for serious brokerage operations.',
    thumbnail: PlaceHolderImages.find(img => img.id === 'project-7')?.imageUrl || '',
    images: [PlaceHolderImages.find(img => img.id === 'project-7')?.imageUrl || ''],
    technologies: ['Node.js', 'FIX Protocol', 'Redis', 'TypeScript'],
    category: 'Web',
    liveUrl: 'https://lp.example.com',
    adminLiveUrl: 'https://lp.example.com/admin',
    repoUrl: 'https://github.com/scw/lp-connection',
    features: ['FIX API Integration', 'Order routing engine', 'Low-latency bridge', 'A-Book risk controls'],
    documentation: '## LP Connection Setup\n1. Secure FIX credentials from your LP\n2. Configure the bridge server\n3. Set up Redis for order caching\n4. Map trading symbols.',
    demoUserEmail: 'broker@test.com',
    demoUserPassword: 'password123',
    demoAdminEmail: 'admin@liquidity.com',
    demoAdminPassword: 'adminpassword'
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