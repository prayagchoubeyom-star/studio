
import { PlaceHolderImages } from './placeholder-images';

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  thumbnail: string;
  images: string[];
  screenshots: string[];
  technologies: string[];
  category: 'Web' | 'Mobile';
  liveUrl?: string;
  adminLiveUrl?: string;
  repoUrl?: string;
  downloadApkUrl?: string;
  videoUrl?: string;
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
    price: 1999,
    shortDescription: 'Professional forex trading platform with MT4/MT5 integration.',
    fullDescription: 'A complete forex trading solution featuring real-time charts, technical indicators, and seamless broker integration. Built for performance and reliability in the high-stakes trading environment.',
    thumbnail: PlaceHolderImages.find(img => img.id === 'project-1')?.imageUrl || '',
    images: [PlaceHolderImages.find(img => img.id === 'project-1')?.imageUrl || ''],
    screenshots: [
      "https://picsum.photos/seed/fxweb1/1200/800",
      "https://picsum.photos/seed/fxweb2/1200/800",
      "https://picsum.photos/seed/fxweb3/1200/800"
    ],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Socket.io'],
    category: 'Web',
    liveUrl: 'https://allinone.sourcecodewala.store/login',
    adminLiveUrl: 'https://allinone.sourcecodewala.store/admin',
    repoUrl: 'https://github.com/scw/forex-trading',
    features: [
      'Professional trading terminal',
      'Copy trading',
      'Funded challenges',
      'Prop firm setup',
      'PAM/MAM setup',
      'IB management',
      'A-Book & B-Book setup',
      'LP connectivity'
    ],
    documentation: '## Forex Setup Guide\n1. Clone the repository\n2. Configure your MT4/MT5 API keys\n3. Set up environment variables\n4. Run `npm install` and `npm run dev`.',
    demoUserEmail: 'testuser@gmail.com',
    demoUserPassword: 'Test@123456',
    demoAdminEmail: 'admin@test1gmail.com',
    demoAdminPassword: 'Admin@54321'
  },
  {
    id: 'copytrading-setup',
    title: 'copytrading complete setup',
    price: 1999,
    shortDescription: 'Automated copy-trading platform for master and follower accounts.',
    fullDescription: 'Enable users to follow professional traders automatically. This setup includes master account management, follower synchronization, and detailed performance analytics.',
    thumbnail: PlaceHolderImages.find(img => img.id === 'project-5')?.imageUrl || '',
    images: [PlaceHolderImages.find(img => img.id === 'project-5')?.imageUrl || ''],
    screenshots: [
      "https://picsum.photos/seed/copy1/1200/800",
      "https://picsum.photos/seed/copy2/1200/800",
      "https://picsum.photos/seed/copy3/1200/800"
    ],
    technologies: ['Next.js', 'Prisma', 'PostgreSQL', 'Redis'],
    category: 'Web',
    liveUrl: 'https://allinone.sourcecodewala.store/login',
    adminLiveUrl: 'https://allinone.sourcecodewala.store/admin',
    repoUrl: 'https://github.com/scw/copytrading',
    features: [
      'Automated trade copying',
      'Latency-optimized execution',
      'Multi-broker support',
      'Advanced risk filters'
    ],
    documentation: '## Copytrading Setup\n1. Connect master API\n2. Setup Redis for fast execution\n3. Configure your database\n4. Deploy to a high-performance server.',
    demoUserEmail: 'testuser@gmail.com',
    demoUserPassword: 'Test@123456',
    demoAdminEmail: 'admin@test1gmail.com',
    demoAdminPassword: 'Admin@54321'
  },
  {
    id: 'funded-forex',
    title: 'funded forex complete setup',
    price: 1999,
    shortDescription: 'Prop firm management platform with evaluation tracking.',
    fullDescription: 'Launch your own prop firm with this funded account management system. Includes challenge tracking, drawdown monitoring, and automated payout management.',
    thumbnail: PlaceHolderImages.find(img => img.id === 'project-3')?.imageUrl || '',
    images: [PlaceHolderImages.find(img => img.id === 'project-3')?.imageUrl || ''],
    screenshots: [
      "https://picsum.photos/seed/funded1/1200/800",
      "https://picsum.photos/seed/funded2/1200/800",
      "https://picsum.photos/seed/funded3/1200/800"
    ],
    technologies: ['Next.js', 'Firebase', 'Chart.js', 'Zod'],
    category: 'Web',
    liveUrl: 'https://allinone.sourcecodewala.store/login',
    adminLiveUrl: 'https://allinone.sourcecodewala.store/admin',
    repoUrl: 'https://github.com/scw/funded-forex',
    features: [
      'Challenge management',
      'Drawdown logic engines',
      'Automated user dashboard',
      'Integrated payment solutions'
    ],
    documentation: '## Funded Firm Setup\n1. Define your challenge parameters\n2. Setup Firebase for user data\n3. Configure payout methods\n4. Customize the branding.',
    demoUserEmail: 'testuser@gmail.com',
    demoUserPassword: 'Test@123456'
  },
  {
    id: 'quotex-clone',
    title: 'quotex clone complete setup',
    price: 1999,
    shortDescription: 'Binary options trading platform with instant execution.',
    fullDescription: 'A high-speed binary options trading platform clone. Features OTC market simulation, high/low trading options, and an advanced admin panel for signal management.',
    thumbnail: PlaceHolderImages.find(img => img.id === 'project-6')?.imageUrl || '',
    images: [PlaceHolderImages.find(img => img.id === 'project-6')?.imageUrl || ''],
    screenshots: [
      "https://picsum.photos/seed/qx1/1200/800",
      "https://picsum.photos/seed/qx2/1200/800",
      "https://picsum.photos/seed/qx3/1200/800"
    ],
    technologies: ['Next.js', 'WebSockets', 'Tailwind CSS', 'Node.js'],
    category: 'Web',
    liveUrl: 'https://binary.sourcecodewala.store/',
    adminLiveUrl: 'https://binaryadmin.sourcecodewala.store/',
    repoUrl: 'https://github.com/scw/quotex-clone',
    features: ['Instant trade execution', 'Demo/Real balance', 'Signal management', 'Mobile-responsive UI'],
    documentation: '## Quotex Clone Setup\n1. Setup WebSocket server\n2. Configure market data feeds\n3. Deploy the admin dashboard\n4. Connect to your payment gateway.',
    demoUserEmail: 'testuser@gmail.com',
    demoUserPassword: 'Test@123456',
    demoAdminEmail: 'admin@test1gmail.com',
    demoAdminPassword: 'Admin@54321'
  },
  {
    id: 'lp-connection',
    title: 'lp connection a book complete setup',
    price: 1999,
    shortDescription: 'Direct liquidity provider connection with A-Book risk management.',
    fullDescription: 'Establish a direct bridge between your trading platform and top-tier liquidity providers. This A-Book setup ensures high-speed execution, minimal slippage, and professional-grade risk management for serious brokerage operations.',
    thumbnail: PlaceHolderImages.find(img => img.id === 'project-7')?.imageUrl || '',
    images: [PlaceHolderImages.find(img => img.id === 'project-7')?.imageUrl || ''],
    screenshots: [
      "https://picsum.photos/seed/lp1/1200/800",
      "https://picsum.photos/seed/lp2/1200/800",
      "https://picsum.photos/seed/lp3/1200/800"
    ],
    technologies: ['Node.js', 'FIX Protocol', 'Redis', 'TypeScript'],
    category: 'Web',
    liveUrl: 'https://lp.sourcecodewala.store/login',
    adminLiveUrl: 'https://lp.sourcecodewala.store/admin-login',
    repoUrl: 'https://github.com/scw/lp-connection',
    features: [
      'Direct FIX API bridging',
      'Real-time order routing',
      'Deep liquidity access',
      'Full risk control panel'
    ],
    documentation: '## LP Connection Setup\n1. Secure FIX credentials from your LP\n2. Configure the bridge server\n3. Set up Redis for order caching\n4. Map trading symbols.',
    demoUserEmail: 'demo@broker.com',
    demoUserPassword: 'Demo@123456',
    demoAdminEmail: 'admin@test1gmail.com',
    demoAdminPassword: 'Admin@54321'
  },
  {
    id: 'indian-paper-trading',
    title: 'Indian Market Paper Trading Complete Setup',
    price: 1999,
    shortDescription: 'Realistic paper trading platform for the Indian stock market (NSE/BSE).',
    fullDescription: 'Practice trading in the Indian stock market without real capital. This setup includes real-time data simulation for NSE/BSE stocks, virtual portfolio tracking, and performance analytics tailored for the Indian trading ecosystem.',
    thumbnail: PlaceHolderImages.find(img => img.id === 'project-8')?.imageUrl || '',
    images: [PlaceHolderImages.find(img => img.id === 'project-8')?.imageUrl || ''],
    screenshots: [
      "https://picsum.photos/seed/ind1/1200/800",
      "https://picsum.photos/seed/ind2/1200/800",
      "https://picsum.photos/seed/ind3/1200/800"
    ],
    technologies: ['Next.js', 'Node.js', 'MongoDB', 'Chart.js', 'Tailwind CSS'],
    category: 'Web',
    liveUrl: 'https://indianpaper.sourcecodewala.store/login',
    adminLiveUrl: 'https://indianpaper.sourcecodewala.store/admin/login',
    repoUrl: 'https://github.com/scw/indian-paper-trading',
    features: ['NSE/BSE Data Simulation', 'Virtual Portfolio Management', 'Order History & Reports', 'Market News Feed'],
    documentation: '## Indian Paper Trading Setup\n1. Secure Indian market data API credentials\n2. Configure MongoDB for user accounts\n3. Set up the virtual matching engine\n4. Deploy to a production environment.',
    demoUserEmail: 'testuser@gmail.com',
    demoUserPassword: 'Test@123456'
  },

  // MOBILE PROJECTS
  {
    id: 'forex-trading-app',
    title: 'Forex Trading App',
    price: 1999,
    shortDescription: 'Advanced mobile application for real-time forex trading.',
    fullDescription: 'A full-featured mobile app designed for forex traders. It includes real-time price feeds, advanced charting tools, and high-security trading features. Built with React Native for high performance.',
    thumbnail: PlaceHolderImages.find(img => img.id === 'project-1')?.imageUrl || '',
    images: [PlaceHolderImages.find(img => img.id === 'project-1')?.imageUrl || ''],
    screenshots: [
      "https://picsum.photos/seed/fxapp1/400/800",
      "https://picsum.photos/seed/fxapp2/400/800",
      "https://picsum.photos/seed/fxapp3/400/800"
    ],
    technologies: ['React Native', 'Firebase', 'Socket.io', 'TypeScript'],
    category: 'Mobile',
    downloadApkUrl: 'https://example.com/download/forex-app.apk',
    repoUrl: 'https://github.com/scw/forex-app',
    features: ['Real-time charts', 'Secure wallet', 'Push alerts', 'Multiple account support'],
    documentation: '## Forex App Setup\n1. Install React Native environment\n2. Configure Socket.io server URL\n3. Connect Firebase project\n4. Build and deploy to stores.',
    demoUserEmail: 'apptrader@test.com',
    demoUserPassword: 'password123'
  },
  {
    id: 'indian-market-trading-app',
    title: 'Indian Market Trading App',
    price: 1999,
    shortDescription: 'Comprehensive mobile app for the Indian Stock Market.',
    fullDescription: 'Manage your Indian stock market portfolio on the go. This app provides direct access to NSE/BSE data, intraday charts, and advanced order types specifically for the Indian market ecosystem.',
    thumbnail: PlaceHolderImages.find(img => img.id === 'project-8')?.imageUrl || '',
    images: [PlaceHolderImages.find(img => img.id === 'project-8')?.imageUrl || ''],
    screenshots: [
      "https://picsum.photos/seed/indiaapp1/400/800",
      "https://picsum.photos/seed/indiaapp2/400/800",
      "https://picsum.photos/seed/indiaapp3/400/800"
    ],
    technologies: ['React Native', 'Node.js', 'Redux', 'Chart.js'],
    category: 'Mobile',
    downloadApkUrl: 'https://example.com/download/india-trade.apk',
    repoUrl: 'https://github.com/scw/india-trade-app',
    features: ['NSE/BSE Watchlist', 'Portfolio tracking', 'Live market news', 'Biometric login'],
    documentation: '## India Trade App Setup\n1. Setup NSE/BSE Data API keys\n2. Configure the React Native project\n3. Setup secure storage for credentials\n4. Build for Android/iOS.',
    demoUserEmail: 'trader@india-app.com',
    demoUserPassword: 'password123'
  },
  {
    id: 'binary-trading-app',
    title: 'Binary Trading App',
    price: 1999,
    shortDescription: 'Binary options mobile app for high-speed trading.',
    fullDescription: 'A specialized mobile application for binary options trading. Features instant trade execution, profit/loss calculators, and a seamless user experience optimized for mobile interaction.',
    thumbnail: PlaceHolderImages.find(img => img.id === 'project-6')?.imageUrl || '',
    images: [PlaceHolderImages.find(img => img.id === 'project-6')?.imageUrl || ''],
    screenshots: [
      "https://picsum.photos/seed/binary1/400/800",
      "https://picsum.photos/seed/binary2/400/800",
      "https://picsum.photos/seed/binary3/400/800"
    ],
    technologies: ['Flutter', 'Node.js', 'WebSocket', 'Dart'],
    category: 'Mobile',
    downloadApkUrl: 'https://example.com/download/binary-app.apk',
    repoUrl: 'https://github.com/scw/binary-app',
    features: ['High/Low trading', 'Instant deposit', 'Signal history', 'Demo mode'],
    documentation: '## Binary App Setup\n1. Install Flutter SDK\n2. Configure backend API in config file\n3. Run `flutter build apk`\n4. Set up push notification keys.',
    demoUserEmail: 'binaryuser@test.com',
    demoUserPassword: 'password123'
  },
  {
    id: 'binance-app-clone',
    title: 'Binance App Clone',
    price: 1999,
    shortDescription: 'Premium cryptocurrency exchange mobile app with spot and futures trading.',
    fullDescription: 'A comprehensive mobile application clone of Binance. Includes a sophisticated trading engine, real-time price tickers, multi-asset wallet integration, and advanced charting. Built for high performance and security.',
    thumbnail: PlaceHolderImages.find(img => img.id === 'project-7')?.imageUrl || '',
    images: [PlaceHolderImages.find(img => img.id === 'project-7')?.imageUrl || ''],
    screenshots: [
      "https://picsum.photos/seed/binance1/400/800",
      "https://picsum.photos/seed/binance2/400/800",
      "https://picsum.photos/seed/binance3/400/800"
    ],
    technologies: ['React Native', 'TypeScript', 'Redux', 'WebSockets'],
    category: 'Mobile',
    downloadApkUrl: 'https://example.com/download/binance-clone.apk',
    features: ['Spot & Futures Trading', 'P2P Marketplace', 'Fiat-to-Crypto Bridge', 'Advanced Charting Indicators'],
    documentation: '## Binance Clone Setup\n1. Initialize React Native app\n2. Connect to the exchange backend via WebSockets\n3. Setup secure wallet keys storage\n4. Build and deploy.',
    demoUserEmail: 'crypto@binance.com',
    demoUserPassword: 'password123'
  },
  {
    id: 'exness-app-clone',
    title: 'Exness App Clone',
    price: 1999,
    shortDescription: 'Professional multi-asset brokerage mobile app for mobile trading.',
    fullDescription: 'A high-fidelity clone of the Exness mobile trading app. Optimized for low-latency execution and high-security user management. Features a seamless interface for forex, commodities, and stocks.',
    thumbnail: PlaceHolderImages.find(img => img.id === 'project-5')?.imageUrl || '',
    images: [PlaceHolderImages.find(img => img.id === 'project-5')?.imageUrl || ''],
    screenshots: [
      "https://picsum.photos/seed/exness1/400/800",
      "https://picsum.photos/seed/exness2/400/800",
      "https://picsum.photos/seed/exness3/400/800"
    ],
    technologies: ['Flutter', 'Dart', 'Node.js', 'PostgreSQL'],
    category: 'Mobile',
    downloadApkUrl: 'https://example.com/download/exness-clone.apk',
    features: ['One-click trading', 'Instant deposits/withdrawals', 'Technical analysis tools', 'Personalized watchlists'],
    documentation: '## Exness Clone Setup\n1. Setup Flutter environment\n2. Configure backend API endpoints\n3. Integrate payment gateways\n4. Build APK/IPA.',
    demoUserEmail: 'trader@exness.com',
    demoUserPassword: 'password123'
  }
];
