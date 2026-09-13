export type FounderType = 'All' | 'Nithin Selvaraj' | 'Kranti .P.A' | 'Vivin .S' | 'DEV STUDIOS';

export interface Project {
  id: string;
  num: string;
  name: string;
  builder: 'DEV STUDIOS' | 'Nithin Selvaraj' | 'Kranti .P.A' | 'Vivin .S';
  category: 'Aerospace & Simulation' | 'AI & Systems' | 'Design & Editorial' | 'WebGL & 3D' | 'Dev Tools & SaaS';
  domain: string;
  liveUrl: string;
  githubUrl?: string;
  highlights: string[];
  description: string;
  featured: boolean;
  badge?: string;
  rating: number;
  previewImage: string;
  authGated?: boolean;
  supportsResponsivePreview?: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: 'buildit',
    num: '01',
    name: 'BuildIt',
    builder: 'DEV STUDIOS',
    category: 'Dev Tools & SaaS',
    domain: 'Construction & Contractor Suite',
    liveUrl: 'https://elegant-chimera-87a499.netlify.app/',
    highlights: [
      'Construction workflow & contractor operations',
      'Live material cost estimation & BOQ calculation',
      'Interactive project timeline & scheduling engine',
      'High-density dashboard with multi-tier role access'
    ],
    description: 'Full-featured construction and contractor management platform offering instant project estimation, live bill-of-quantities calculation, and crew task scheduling.',
    featured: true,
    badge: 'DEV STUDIOS Flagship',
    rating: 5.0,
    previewImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'library-assistant',
    num: '02',
    name: 'Library Assistant',
    builder: 'DEV STUDIOS',
    category: 'AI & Systems',
    domain: 'School Library & Reading Hub',
    liveUrl: 'https://superb-croissant-437d00.netlify.app/#login',
    highlights: [
      'Automated book cataloging & circulation tracker',
      'Student reading logs & gamified achievement badges',
      'Fine calculation & automated overdue notifications',
      'Instant search & ISBN catalog query engine'
    ],
    description: 'Comprehensive school library management ecosystem streamlining book circulation, reading progress analytics, and cataloging for modern institutions.',
    featured: true,
    badge: 'DEV STUDIOS Flagship',
    rating: 5.0,
    previewImage: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'lab-assistant',
    num: '03',
    name: 'Lab Assistant',
    builder: 'DEV STUDIOS',
    category: 'Dev Tools & SaaS',
    domain: 'Science Lab & Inventory Hub',
    liveUrl: 'https://dynamic-gaufre-e0fac6.netlify.app/',
    highlights: [
      'Chemical reagent & apparatus inventory tracking',
      'Safety compliance logs & hazard mitigation protocols',
      'Lab experiment equipment reservation system',
      'Real-time consumable restocking telemetry'
    ],
    description: 'Institutional science laboratory inventory and safety management platform monitoring apparatus stock, experiment schedules, and chemical safety protocols.',
    featured: true,
    badge: 'DEV STUDIOS Flagship',
    rating: 5.0,
    previewImage: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'stem-infrastructure',
    num: '04',
    name: 'STEM Infrastructure',
    builder: 'Kranti .P.A',
    category: 'Dev Tools & SaaS',
    domain: 'STEM Education & Infrastructure',
    liveUrl: 'https://stem-infrastructure.vercel.app/',
    githubUrl: 'https://github.com/Krtx-dev',
    highlights: [
      'STEM institutional infrastructure & resource allocation',
      'Real-time equipment reservation & maintenance logging',
      'Interactive scientific curriculum workflow engine',
      'Engineered by Kranti .P.A on high-performance Vercel Edge'
    ],
    description: 'Advanced STEM infrastructure management suite designed by Kranti .P.A to organize institutional laboratory hardware, technical curriculum assets, and academic research workflows.',
    featured: true,
    badge: 'Kranti .P.A',
    rating: 5.0,
    previewImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'mental-wellbeing',
    num: '05',
    name: 'Mental Well-Being Platform',
    builder: 'Vivin .S',
    category: 'WebGL & 3D',
    domain: 'Mental Health & Wellness',
    liveUrl: 'https://mental-well-being-website.vercel.app/',
    githubUrl: 'https://github.com/vivins2009-droid/Mental-well-being-website',
    highlights: [
      'Goal decomposition into 5-15 minute daily micro-steps',
      '3D dashboard with habit streaks & reflection log',
      'Date-smart habit scheduling & rewards/level system',
      'Engineered by Vivin .S with modern web architecture'
    ],
    description: 'A personal goal-builder and habit tracker engineered by Vivin .S — breaks down big ambitions into mindful daily micro-steps inside a 3D productivity interface.',
    featured: true,
    badge: 'Vivin .S',
    rating: 5.0,
    previewImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=85',
    authGated: true
  },
  {
    id: 'mission-control',
    num: '06',
    name: 'Mission Control',
    builder: 'Nithin Selvaraj',
    category: 'Aerospace & Simulation',
    domain: 'Aerospace / Physics Simulation',
    liveUrl: 'https://loquacious-dango-5e5843.netlify.app/',
    githubUrl: 'https://github.com/Nithinfgs',
    highlights: [
      'Real-time orbital mechanics simulation',
      'Runge-Kutta 4th Order (RK4) numerical integration',
      'High-frequency telemetry visualization canvas',
      'Orbital trajectory prediction & velocity vectors'
    ],
    description: 'High-precision real-time spaceflight and orbital mechanics simulation engine engineered with RK4 numerical integration and live telemetry scopes.',
    featured: true,
    badge: 'Nithin Selvaraj',
    rating: 5.0,
    previewImage: 'https://images.unsplash.com/photo-1517976487541-067645009bf6?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'haven',
    num: '07',
    name: 'Haven',
    builder: 'Nithin Selvaraj',
    category: 'AI & Systems',
    domain: 'AI / Mental Health Community',
    liveUrl: 'https://thunderous-alpaca-64b564.netlify.app/',
    githubUrl: 'https://github.com/Nithinfgs',
    highlights: [
      'Real-time empathetic conversation engine',
      'Reactive sentiment state machine',
      'Ambient calming audio/visual synthesizer',
      'Adaptive therapeutic guidance paths'
    ],
    description: 'Empathetic AI companion and mental wellness ecosystem featuring responsive emotional sentiment analysis and ambient generative soundscapes.',
    featured: false,
    badge: 'Nithin Selvaraj',
    rating: 4.9,
    previewImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'eonet-tracker',
    num: '08',
    name: 'EONET Planetary Tracker',
    builder: 'Nithin Selvaraj',
    category: 'Aerospace & Simulation',
    domain: 'NASA Geospatial & Satellite',
    liveUrl: 'https://silver-youtiao-dcbc70.netlify.app/',
    githubUrl: 'https://github.com/Nithinfgs',
    highlights: [
      'Live NASA EONET v3 REST API integration',
      'NASA GIBS true-color satellite tile composites',
      'Wildfire, volcano & storm global point clustering',
      'Temporal event scrubbing and geospatial telemetry'
    ],
    description: 'Planetary natural event intelligence dashboard connecting directly to NASA satellite sensors and real-time Earth observatory feeds.',
    featured: true,
    badge: 'Nithin Selvaraj',
    rating: 5.0,
    previewImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'cosmocrypt',
    num: '09',
    name: 'CosmoCrypt Terminal',
    builder: 'Nithin Selvaraj',
    category: 'AI & Systems',
    domain: 'Steganography & Cyberdeck',
    liveUrl: 'https://cheery-starlight-5fd4e8.netlify.app/',
    githubUrl: 'https://github.com/Nithinfgs',
    highlights: [
      'Bit-plane (LSB) image payload injection & extraction',
      'NASA APOD carrier image ingestion pipeline',
      'Web Audio acoustic frequency spectrogram scopes',
      'Military-grade cryptographic encoding interface'
    ],
    description: 'Cyberdeck steganography suite embedding encrypted binary payloads inside deep space imagery using bit-plane manipulation and acoustic analysis.',
    featured: false,
    badge: 'Nithin Selvaraj',
    rating: 4.9,
    previewImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'arthur-vance-dossier',
    num: '10',
    name: 'Dr. Arthur Vance Dossier',
    builder: 'Nithin Selvaraj',
    category: 'Design & Editorial',
    domain: 'Design Systems & Editorial',
    liveUrl: 'https://glowing-melba-3c1d2b.netlify.app/',
    githubUrl: 'https://github.com/Nithinfgs',
    highlights: [
      '5-Portal interactive navigation index',
      'Architectural pedagogy diagrams & systems',
      'Socratic inquiry models & design critique',
      'Executive leadership dossier typography'
    ],
    description: 'Monolithic academic archive and pedagogical system combining Swiss typographic grids with interactive philosophical inquiry models.',
    featured: false,
    badge: 'Nithin Selvaraj',
    rating: 4.8,
    previewImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'arthur-sterling-neo-brutalist',
    num: '11',
    name: 'Dr. Arthur Sterling Neo-Brutalist',
    builder: 'Nithin Selvaraj',
    category: 'Design & Editorial',
    domain: 'Design Systems & Neo-Brutalism',
    liveUrl: 'https://leafy-shortbread-42d062.netlify.app/',
    githubUrl: 'https://github.com/Nithinfgs',
    highlights: [
      'High-contrast neo-brutalist token architecture',
      'Strategic Package A/B variant switcher',
      '3-Step institutional curriculum flow',
      'Transdisciplinary design matrix'
    ],
    description: 'Radical neo-brutalist editorial and institutional identity system engineered with raw typography, rigid grids, and live token customization.',
    featured: false,
    badge: 'Nithin Selvaraj',
    rating: 4.8,
    previewImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'apex-aerospace',
    num: '12',
    name: 'Apex Aerospace Studio',
    builder: 'Nithin Selvaraj',
    category: 'Aerospace & Simulation',
    domain: 'Aerospace & Flight Dynamics',
    liveUrl: 'https://celebrated-duckanoo-9a3b66.netlify.app/',
    githubUrl: 'https://github.com/Nithinfgs',
    highlights: [
      'Sounding rocket aerodynamics & Mach curves',
      'Haack & Von Kármán nose cone profile optimizer',
      'Interactive flight failure exploration tree',
      'Custom vector mission patch design studio'
    ],
    description: 'Computational rocketry engineering suite featuring supersonic aerodynamic profile optimization and launch vehicle flight dynamics.',
    featured: true,
    badge: 'Nithin Selvaraj',
    rating: 5.0,
    previewImage: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'nexus-os',
    num: '13',
    name: 'NexusOS Digital Garden',
    builder: 'Nithin Selvaraj',
    category: 'AI & Systems',
    domain: 'Web OS & Systems',
    liveUrl: 'https://sparkling-mandazi-577a0d.netlify.app/',
    githubUrl: 'https://github.com/Nithinfgs',
    highlights: [
      'Multi-window coordinate manager with z-index stacking',
      'Global Command Palette (Cmd+K) quick launcher',
      'Spatial ambient generative soundscapes',
      'Modular digital garden workspace ecosystem'
    ],
    description: 'Fully browser-native windowing operating system featuring draggable windows, global spotlight command palette, and spatial digital gardening.',
    featured: false,
    badge: 'Nithin Selvaraj',
    rating: 4.9,
    previewImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'nike-airmax-3d',
    num: '14',
    name: 'Nike Air Max 3D Case Study',
    builder: 'Nithin Selvaraj',
    category: 'WebGL & 3D',
    domain: 'Creative WebGL / 3D Motion',
    liveUrl: 'https://moonlit-klepon-15fd61.netlify.app/',
    githubUrl: 'https://github.com/Nithinfgs',
    highlights: [
      'Scroll-driven 3D camera Euler pathing',
      'Kinetic typography layering with WebGL',
      'Momentum scrolling with lerp physics damping',
      'Dynamic lighting & material reflectance'
    ],
    description: 'Immersive 3D product showcase navigating an intricate footwear model along an Euler camera path synchronized to scroll velocity.',
    featured: false,
    badge: 'Nithin Selvaraj',
    rating: 5.0,
    previewImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'frictionless-toolkit',
    num: '15',
    name: 'Frictionless Toolkit',
    builder: 'Nithin Selvaraj',
    category: 'Dev Tools & SaaS',
    domain: 'Developer Tools & Productivity',
    liveUrl: 'https://astonishing-souffle-d55679.netlify.app/',
    githubUrl: 'https://github.com/Nithinfgs',
    highlights: [
      'Sub-millisecond regex text transformation engine',
      '15-Item rolling local clipboard memory stream',
      'Multi-unit scientific & cryptographic converter',
      'Offline-first keyboard-centric developer utilities'
    ],
    description: 'Ultra-fast developer productivity suite providing instant regex transforms, rolling clipboard buffers, and multi-format encoders.',
    featured: false,
    badge: 'Nithin Selvaraj',
    rating: 4.7,
    previewImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'lumina-shaders',
    num: '16',
    name: 'LUMINA Beyond Perception',
    builder: 'Nithin Selvaraj',
    category: 'WebGL & 3D',
    domain: 'WebGL / Shaders & Art',
    liveUrl: 'https://transcendent-boba-36e192.netlify.app/',
    githubUrl: 'https://github.com/Nithinfgs',
    highlights: [
      'Procedural GLSL fragment shaders',
      'Chromatic aberration vector field distortion',
      'Dark-luxe spatial luxury aesthetics',
      'Audio-reactive shader uniforms'
    ],
    description: 'Generative shader art installation utilizing procedural GLSL fragment calculations to produce fluid chromatic caustics.',
    featured: false,
    badge: 'Nithin Selvaraj',
    rating: 4.9,
    previewImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'forma-studio',
    num: '17',
    name: 'Forma Modern Studio',
    builder: 'Nithin Selvaraj',
    category: 'Dev Tools & SaaS',
    domain: 'SaaS & Component Architecture',
    liveUrl: 'https://vocal-cactus-593190.netlify.app/',
    githubUrl: 'https://github.com/Nithinfgs',
    highlights: [
      'Strict design token architecture & CSS variables',
      'Zero layout shift guaranteed (CLS = 0.00)',
      'Accessible WCAG AAA semantic components',
      'Modular SaaS design pattern library'
    ],
    description: 'Architectural component system built with rigorous mathematical scaling, zero cumulative layout shift, and WCAG AAA compliance.',
    featured: false,
    badge: 'Nithin Selvaraj',
    rating: 4.8,
    previewImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'nike-justdoit-2026',
    num: '18',
    name: 'Nike Just Do It 2026',
    builder: 'Nithin Selvaraj',
    category: 'Dev Tools & SaaS',
    domain: 'E-Commerce Flagship Store',
    liveUrl: 'https://golden-kashata-fda09f.netlify.app/',
    githubUrl: 'https://github.com/Nithinfgs',
    highlights: [
      'Reducer-based global shopping bag state machine',
      'Optimistic cart animations and micro-interactions',
      'Responsive multi-tier product catalogue',
      'Instant frictionless checkout mockup'
    ],
    description: 'High-energy flagship digital commerce flagship with instant filter pipelines, optimistic cart updates, and editorial lookbooks.',
    featured: false,
    badge: 'Nithin Selvaraj',
    rating: 4.9,
    previewImage: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'nithin-biohub',
    num: '19',
    name: 'DEV STUDIOS Hub & Archive',
    builder: 'Nithin Selvaraj',
    category: 'Design & Editorial',
    domain: 'Engineering Collective Hub',
    liveUrl: 'https://lucent-pika-c20d8a.netlify.app/',
    githubUrl: 'https://github.com/Nithinfgs',
    highlights: [
      'Multidisciplinary engineering collective matrix',
      'Aerospace modeling & computational physics projects',
      'Creative frontend engineering showcases',
      'Interactive skill topology and research logs'
    ],
    description: 'Engineering and design collective hub documenting research in aerospace systems, mechanical dynamics, and high-fidelity web applications.',
    featured: false,
    badge: 'Nithin Selvaraj',
    rating: 5.0,
    previewImage: 'https://images.unsplash.com/photo-1534972195531-a756b1126f24?auto=format&fit=crop&w=1200&q=85'
  }
];
