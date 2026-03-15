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
    price: 1999,
    youtubeId: 'dQw4w9WgXcQ',
    shortDescription: 'Professional forex trading platform with MT4/MT5 integration.',
    fullDescription: 'A complete forex trading solution featuring real-time charts, technical indicators, and seamless broker integration. Built for performance and reliability in the high-stakes trading environment.',
    thumbnail: PlaceHolderImages.find(img => img.id === 'project-1')?.imageUrl || '',
    images: [PlaceHolderImages.find(img => img.id === 'project-1')?.imageUrl || ''],
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
      'PAMM / MAMM setup',
      'IB management',
      'A book / B book setup',
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
    youtubeId: 'dQw4w9WgXcQ',
    shortDescription: 'Automated copy-trading platform for master and follower accounts.',
    fullDescription: 'Enable users to follow professional traders automatically. This setup includes master account management, follower synchronization, and detailed performance analytics.',
    thumbnail: PlaceHolderImages.find(img => img.id === 'project-5')?.imageUrl || '',
    images: [PlaceHolderImages.find(img => img.id === 'project-5')?.imageUrl || ''],
    technologies: ['Next.js', 'Prisma', 'PostgreSQL', 'Redis'],
    category: 'Web',
    liveUrl: 'https://allinone.sourcecodewala.store/login',
    adminLiveUrl: 'https://allinone.sourcecodewala.store/admin',
    repoUrl: 'https://github.com/scw/copytrading',
    features: [
      'Professional trading terminal',
      'Copy trading',
      'Funded challenges',
      'Prop firm setup',
      'PAMM / MAMM setup',
      'IB management',
      'A book / B book setup',
      'LP connectivity'
    ],
    documentation: '## Copytrading Setup\n1. Connect master API\n2. Setup Redis for fast execution\n3. Configure your database\n4. Deploy to a high-performance server.',
    demoUserEmail: 'testuser@gmail.com',
    demoUserPassword: 'Test@123456',
    demoAdminEmail: 'admin@test1gmail.com',
    demoAdminPassword: 'Admin@54321'
  },
  {
    id: 'funded-forex',
    title: 'funded forex compelete setup',
    price: 1999,
    youtubeId: 'dQw4w9WgXcQ',
    shortDescription: 'Prop firm management platform with evaluation tracking.',
    fullDescription: 'Launch your own prop firm with this funded account management system. Includes challenge tracking, drawdown monitoring, and automated payout management.',
    thumbnail: PlaceHolderImages.find(img => img.id === 'project-3')?.imageUrl || '',
    images: [PlaceHolderImages.find(img => img.id === 'project-3')?.imageUrl || ''],
    technologies: ['Next.js', 'Firebase', 'Chart.js', 'Zod'],
    category: 'Web',
    liveUrl: 'https://allinone.sourcecodewala.store/login',
    adminLiveUrl: 'https://allinone.sourcecodewala.store/admin',
    repoUrl: 'https://github.com/scw/funded-forex',
    features: [
      'Professional trading terminal',
      'Copy trading',
      'Funded challenges',
      'Prop firm setup',
      'PAMM / MAMM setup',
      'IB management',
      'A book / B book setup',
      'LP connectivity'
    ],
    documentation: '## Funded Firm Setup\n1. Define your challenge parameters\n2. Setup Firebase for user data\n3. Configure payout methods\n4. Customize the branding.',
    demoUserEmail: 'testuser@gmail.com',
    demoUserPassword: 'Test@123456',
    demoAdminEmail: 'admin@test1gmail.com',
    demoAdminPassword: 'Admin@54321'
  },
  {
    id: 'quotex-clone',
    title: 'quotex clone complete setup',
    price: 1999,
    youtubeId: 'dQw4w9WgXcQ',
    shortDescription: 'Binary options trading platform with instant execution.',
    fullDescription: 'A high-speed binary options trading platform clone. Features OTC market simulation, high/low trading options, and an advanced admin panel for signal management.',
    thumbnail: PlaceHolderImages.find(img => img.id === 'project-6')?.imageUrl || '',
    images: [PlaceHolderImages.find(img => img.id === 'project-6')?.imageUrl || ''],
    technologies: ['Next.js', 'WebSockets', 'Tailwind CSS', 'Node.js'],
    category: 'Web',
    liveUrl: 'https://binary.sourcecodewala.store/',
    adminLiveUrl: 'https://binaryadmin.sourcecodewala.store/',
    repoUrl: 'https://github.com/scw/quotex-clone',
    features: ['Instant trade execution', 'Demo/Real balance', 'Signal management', 'Mobile-responsive UI'],
    documentation: '## Quotex Clone Setup\n1. Setup WebSocket server\n2. Configure market data feeds\n3. Deploy the admin dashboard\n4. Connect to your payment gateway.',
    demoUserEmail: 'testuser@gmail.com',
    demoUserPassword: 'Test@123456',
    demoAdminEmail: 'trustfx',
    demoAdminPassword: 'Algo@54321'
  },
  {
    id: 'lp-connection',
    title: 'lp connection a book complelet setup',
    price: 1999,
    shortDescription: 'Direct liquidity provider connection with A-Book risk management.',
    fullDescription: 'Establish a direct bridge between your trading platform and top-tier liquidity providers. This A-Book setup ensures high-speed execution, minimal slippage, and professional-grade risk management for serious brokerage operations.',
    thumbnail: PlaceHolderImages.find(img => img.id === 'project-7')?.imageUrl || '',
    images: [PlaceHolderImages.find(img => img.id === 'project-7')?.imageUrl || ''],
    technologies: ['Node.js', 'FIX Protocol', 'Redis', 'TypeScript'],
    category: 'Web',
    liveUrl: 'https://lp.sourcecodewala.store/login',
    adminLiveUrl: 'https://lp.sourcecodewala.store/admin-login',
    repoUrl: 'https://github.com/scw/lp-connection',
    features: [
      'Professional trading terminal',
      'Copy trading',
      'Funded challenges',
      'Prop firm setup',
      'PAMM / MAMM setup',
      'IB management',
      'A book / B book setup',
      'LP connectivity'
    ],
    documentation: '## LP Connection Setup\n1. Secure FIX credentials from your LP\n2. Configure the bridge server\n3. Set up Redis for order caching\n4. Map trading symbols.',
    demoUserEmail: 'demo@broker.com',
    demoUserPassword: 'Demo@123456',
    demoAdminEmail: 'admin@lpplatform.com',
    demoAdminPassword: 'Admin@123456'
  },
  {
    id: 'indian-paper-trading',
    title: 'Indian Market Paper Trading Complete Setup',
    price: 1999,
    shortDescription: 'Realistic paper trading platform for the Indian stock market (NSE/BSE).',
    fullDescription: 'Practice trading in the Indian stock market without real capital. This setup includes real-time data simulation for NSE/BSE stocks, virtual portfolio tracking, and performance analytics tailored for the Indian trading ecosystem.',
    thumbnail: PlaceHolderImages.find(img => img.id === 'project-8')?.imageUrl || '',
    images: [PlaceHolderImages.find(img => img.id === 'project-8')?.imageUrl || ''],
    technologies: ['Next.js', 'Node.js', 'MongoDB', 'Chart.js', 'Tailwind CSS'],
    category: 'Web',
    liveUrl: 'https://indianpaper.sourcecodewala.store/login',
    adminLiveUrl: 'https://indianpaper.sourcecodewala.store/admin/login',
    repoUrl: 'https://github.com/scw/indian-paper-trading',
    features: ['NSE/BSE Data Simulation', 'Virtual Portfolio Management', 'Order History & Reports', 'Market News Feed'],
    documentation: '## Indian Paper Trading Setup\n1. Secure Indian market data API credentials\n2. Configure MongoDB for user accounts\n3. Set up the virtual matching engine\n4. Deploy to a production environment.',
    demoUserEmail: 'testuser@gmail.com',
    demoUserPassword: 'Test@123456',
    demoAdminEmail: 'admin@test1gmail.com',
    demoAdminPassword: 'Admin@54321'
  },

  // MOBILE PROJECTS (REORDERED)
  {
    id: 'forex-trading-app',
    title: 'Forex Trading App',
    price: 1999,
    youtubeId: 'dQw4w9WgXcQ',
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
    demoUserPassword: 'password123',
    demoAdminEmail: 'appadmin@trading.com',
    demoAdminPassword: 'adminpassword'
  },
  {
    id: 'indian-market-trading-app',
    title: 'Indian Market Trading App',
    price: 1999,
    youtubeId: 'dQw4w9WgXcQ',
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
    demoUserPassword: 'password123',
    demoAdminEmail: 'admin@india-app.com',
    demoAdminPassword: 'adminpassword'
  },
  {
    id: 'binary-trading-app',
    title: 'Binary Trading App',
    price: 1999,
    youtubeId: 'dQw4w9WgXcQ',
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
    demoUserPassword: 'password123',
    demoAdminEmail: 'binaryadmin@test.com',
    demoAdminPassword: 'adminpassword'
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
  },
  {
    id: 'octafx-app-clone',
    title: 'OctaFX App Clone',
    price: 1999,
    shortDescription: 'Popular forex trading mobile app with copy-trading integration.',
    fullDescription: 'A feature-rich clone of the OctaFX mobile platform. Includes built-in copy-trading features, daily analysis feeds, and a highly intuitive user interface designed for mass-market adoption.',
    thumbnail: PlaceHolderImages.find(img => img.id === 'project-1')?.imageUrl || '',
    images: [PlaceHolderImages.find(img => img.id === 'project-1')?.imageUrl || ''],
    screenshots: [
      "https://picsum.photos/seed/octafx1/400/800",
      "https://picsum.photos/seed/octafx2/400/800",
      "https://picsum.photos/seed/octafx3/400/800"
    ],
    technologies: ['React Native', 'Firebase', 'NativeWind', 'Zustand'],
    category: 'Mobile',
    downloadApkUrl: 'https://example.com/download/octafx-clone.apk',
    features: ['Integrated Copytrading', 'Bonus & Promotion Engine', 'Real-time Push Alerts', 'Economic Calendar'],
    documentation: '## OctaFX Clone Setup\n1. Setup React Native & Firebase\n2. Configure Copytrading backend logic\n3. Setup push notification keys\n4. Build and distribute.',
    demoUserEmail: 'trader@octafx.com',
    demoUserPassword: 'password123'
  },
  {
    id: 'mt5-app-clone',
    title: 'MT5 App Clone',
    price: 1999,
    shortDescription: 'Advanced multi-asset mobile terminal for modern brokers.',
    fullDescription: 'A professional-grade mobile terminal clone of MetaTrader 5 (MT5). Supports hedging, netting, and advanced order types. Designed for brokers who want to offer a familiar yet branded trading experience.',
    thumbnail: PlaceHolderImages.find(img => img.id === 'project-3')?.imageUrl || '',
    images: [PlaceHolderImages.find(img => img.id === 'project-3')?.imageUrl || ''],
    screenshots: [
      "https://picsum.photos/seed/mt5_1/400/800",
      "https://picsum.photos/seed/mt5_2/400/800",
      "https://picsum.photos/seed/mt5_3/400/800"
    ],
    technologies: ['React Native', 'C++', 'Node.js', 'Socket.io'],
    category: 'Mobile',
    downloadApkUrl: 'https://example.com/download/mt5-clone.apk',
    features: ['Hedging & Netting Support', 'Advanced Depth of Market', 'Automated Trading Alerts', 'Cloud Synchronization'],
    documentation: '## MT5 Clone Setup\n1. Configure MT5 Server API keys\n2. Setup WebSocket bridge for data streaming\n3. Build mobile apps with native bridges\n4. Deploy.',
    demoUserEmail: 'admin@mt5.com',
    demoUserPassword: 'password123'
  },
  {
    id: 'mt4-app-clone',
    title: 'MT4 App Clone',
    price: 1999,
    shortDescription: 'Classic forex trading terminal for mobile devices.',
    fullDescription: 'A classic mobile terminal clone of MetaTrader 4 (MT4). Optimized for simple, fast execution and legacy system compatibility. The world\'s most popular choice for mobile forex traders.',
    thumbnail: PlaceHolderImages.find(img => img.id === 'project-6')?.imageUrl || '',
    images: [PlaceHolderImages.find(img => img.id === 'project-6')?.imageUrl || ''],
    screenshots: [
      "https://picsum.photos/seed/mt4_1/400/800",
      "https://picsum.photos/seed/mt4_2/400/800",
      "https://picsum.photos/seed/mt4_3/400/800"
    ],
    technologies: ['Flutter', 'Node.js', 'Redis', 'WebSockets'],
    category: 'Mobile',
    downloadApkUrl: 'https://example.com/download/mt4-clone.apk',
    features: ['Classic Charting Interface', 'Standard Technical Indicators', 'Stable Execution Core', 'Multi-Language Support'],
    documentation: '## MT4 Clone Setup\n1. Connect MT4 Manager API\n2. Setup Redis for caching market data\n3. Build and test mobile apps\n4. Publish to stores.',
    demoUserEmail: 'trader@mt4.com',
    demoUserPassword: 'password123'
  },
  {
    id: 'profit-mobile-app',
    title: 'ProFit Mobile App',
    price: 1999,
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
    price: 1999,
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
    price: 1999,
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
    price: 1999,
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
