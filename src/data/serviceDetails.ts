export interface ServiceCapability {
  title: string;
  copy: string;
}

export interface ServiceProcessStep {
  title: string;
  copy: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceDetail {
  slug: string;
  number: string;
  icon: 'code' | 'smartphone' | 'workflow' | 'layers' | 'palette';
  title: string;
  tagline: string;
  overview: string;
  tags: string[];
  capabilities: ServiceCapability[];
  process: ServiceProcessStep[];
  stack: string[];
  deliverables: string[];
  faqs: ServiceFaq[];
}

export const SERVICE_DETAILS: ServiceDetail[] = [
  {
    slug: 'web-development',
    number: '01',
    icon: 'code',
    title: 'Web Development',
    tagline: 'High-performance websites and web applications shaped around how your business works.',
    overview:
      'We design and engineer websites and web applications that are fast, accessible, and built to hold up under real traffic. Every build starts with how your business actually operates — the workflows, the data, the edge cases — not a generic template stretched to fit.',
    tags: ['Responsive builds', 'API integrations', 'Performance tuning'],
    capabilities: [
      { title: 'Marketing & product sites', copy: 'Conversion-focused sites with clean information architecture, fast load times, and CMS-backed content teams can update without a developer.' },
      { title: 'Web applications', copy: 'Multi-user dashboards, internal tools, and customer-facing portals built on React with typed, maintainable codebases.' },
      { title: 'API & systems integration', copy: 'Connecting your site to payment processors, CRMs, analytics, and internal APIs with proper error handling and monitoring.' },
      { title: 'Performance engineering', copy: 'Core Web Vitals audits, bundle optimization, image pipelines, and caching strategy so pages stay fast as they grow.' }
    ],
    process: [
      { title: 'Audit & scope', copy: 'We review your current site or requirements, map the technical constraints, and agree on a build plan and timeline.' },
      { title: 'Architecture', copy: 'We choose the stack, data model, and integration points before writing feature code, so the foundation holds as scope grows.' },
      { title: 'Build in increments', copy: 'Features ship in reviewable slices with staging environments, so you see real progress every week, not just at the end.' },
      { title: 'Launch & harden', copy: 'Pre-launch performance and accessibility passes, then monitoring and a short support window after go-live.' }
    ],
    stack: ['React', 'TypeScript', 'Node.js', 'Vite', 'Tailwind CSS', 'PostgreSQL', 'REST & GraphQL APIs'],
    deliverables: ['Production-ready codebase with documentation', 'Responsive design across breakpoints', 'CI-friendly build & deploy setup', 'Performance and accessibility report'],
    faqs: [
      { question: 'Do you work with an existing codebase?', answer: 'Yes — we regularly take over and extend existing sites and applications. We start with a short audit before committing to a timeline.' },
      { question: 'Can you handle the hosting and deployment too?', answer: 'We can set up deployment on your platform of choice (Vercel, Netlify, your own infrastructure) and hand over access, or manage it long-term.' }
    ]
  },
  {
    slug: 'mobile-apps',
    number: '02',
    icon: 'smartphone',
    title: 'Mobile Apps',
    tagline: 'Reliable mobile applications that help your customers and teams get more done.',
    overview:
      'We build mobile applications that people actually keep on their home screen — responsive under real network conditions, clear in their interactions, and stable across the device fragmentation that ships every app to production faster than expected.',
    tags: ['iOS & Android', 'Offline-ready', 'Push notifications'],
    capabilities: [
      { title: 'Cross-platform apps', copy: 'A single codebase targeting iOS and Android where it makes sense, keeping engineering cost and maintenance burden down.' },
      { title: 'Offline-first data', copy: 'Local persistence and sync strategies so the app stays usable on flaky connections and reconciles cleanly when back online.' },
      { title: 'Push & in-app messaging', copy: 'Notification infrastructure that respects user attention — segmented, timed, and tied to real triggers in your product.' },
      { title: 'App store readiness', copy: 'Store listing assets, review-compliant flows, and release management so submissions don’t stall on avoidable rejections.' }
    ],
    process: [
      { title: 'Define the core flow', copy: 'We identify the two or three journeys the app must nail on day one and design around those first.' },
      { title: 'Prototype & test', copy: 'Interactive prototypes validated with real users before full engineering begins, catching UX issues while they’re still cheap to fix.' },
      { title: 'Build & QA on real devices', copy: 'Development and testing across a spread of physical devices and OS versions, not just simulators.' },
      { title: 'Ship & iterate', copy: 'Store submission, crash monitoring, and a release cadence for updates based on real usage data.' }
    ],
    stack: ['React Native', 'Swift', 'Kotlin', 'Firebase', 'REST & GraphQL APIs', 'App Store & Play Console'],
    deliverables: ['Submitted, store-ready builds for iOS and Android', 'Crash and analytics instrumentation', 'Release notes and versioning process', 'Post-launch support window'],
    faqs: [
      { question: 'Native or cross-platform?', answer: 'We recommend based on your requirements — cross-platform for most product apps, native when you need deep hardware or performance access.' },
      { question: 'Who owns the app store accounts?', answer: 'You do. We publish under your developer accounts so you retain full ownership and control.' }
    ]
  },
  {
    slug: 'digital-transformation',
    number: '03',
    icon: 'workflow',
    title: 'Digital Transformation',
    tagline: 'Practical roadmaps that modernize operations, systems, and customer experiences.',
    overview:
      'We help organizations move off spreadsheets, disconnected tools, and manual handoffs onto systems that actually reflect how the work gets done. This is less about buzzwords and more about removing the friction that slows your team down every day.',
    tags: ['Process audits', 'Systems integration', 'Change rollout'],
    capabilities: [
      { title: 'Process audits', copy: 'We map current workflows end to end, identify where time and accuracy are being lost, and quantify the cost of the status quo.' },
      { title: 'Systems integration', copy: 'Connecting the tools you already use — or replacing the ones holding you back — so data moves without manual re-entry.' },
      { title: 'Legacy modernization', copy: 'Incrementally replacing brittle legacy systems without disrupting operations mid-transition.' },
      { title: 'Change rollout', copy: 'Training, documentation, and phased adoption plans so new systems get used, not resisted.' }
    ],
    process: [
      { title: 'Assess', copy: 'We interview stakeholders and shadow the actual workflows to understand what’s really happening versus the org chart version.' },
      { title: 'Roadmap', copy: 'A prioritized plan sequencing quick wins against larger structural changes, with clear cost and risk trade-offs.' },
      { title: 'Implement in phases', copy: 'Changes roll out in stages that keep the business running, with rollback plans at each step.' },
      { title: 'Measure & adjust', copy: 'We track the metrics that mattered in the original audit to confirm the transformation actually moved them.' }
    ],
    stack: ['Systems audits', 'Workflow automation', 'API integrations', 'Data migration', 'Internal tooling'],
    deliverables: ['Current-state process map', 'Prioritized transformation roadmap', 'Integrated or modernized systems', 'Team training and documentation'],
    faqs: [
      { question: 'Do we need to replace all our existing tools?', answer: 'Rarely. Most transformations succeed by integrating and streamlining what you already have, replacing only what’s genuinely holding you back.' },
      { question: 'How disruptive is this to daily operations?', answer: 'We phase every rollout specifically to avoid disruption — changes are staged and reversible, never a single high-risk cutover.' }
    ]
  },
  {
    slug: 'custom-software',
    number: '04',
    icon: 'layers',
    title: 'Custom Software',
    tagline: 'Purpose-built software designed to become the operating core of your business.',
    overview:
      'When off-the-shelf software forces your business to bend around its assumptions, we build the alternative: internal tools and platforms shaped precisely around your data, your roles, and how your team actually needs to work.',
    tags: ['Internal tools', 'Automation', 'Scalable architecture'],
    capabilities: [
      { title: 'Internal tools & dashboards', copy: 'Purpose-built interfaces for the operational data your team checks every day — inventory, scheduling, reporting, and more.' },
      { title: 'Workflow automation', copy: 'Replacing manual, repetitive processes with systems that handle the routine work reliably and flag exceptions for a human.' },
      { title: 'Multi-tenant & role-based systems', copy: 'Software that scales across departments, clients, or locations with proper access control from day one.' },
      { title: 'Scalable architecture', copy: 'Systems designed to grow with your data and user count without a costly rewrite twelve months in.' }
    ],
    process: [
      { title: 'Understand the operation', copy: 'We learn the actual business logic and edge cases before designing schemas or screens.' },
      { title: 'Design the data model', copy: 'A solid data model and architecture that reflects real business rules, built to be extended rather than patched.' },
      { title: 'Build in usable increments', copy: 'Your team gets working modules to test early, so course corrections happen during the build, not after.' },
      { title: 'Deploy & support', copy: 'Rollout with training, plus an ongoing relationship for the inevitable next set of requirements.' }
    ],
    stack: ['React', 'Node.js', 'PostgreSQL', 'Supabase', 'Role-based access control', 'Automation pipelines'],
    deliverables: ['Custom platform matched to your operations', 'Role-based access and permissions', 'Admin tooling for your team to self-manage', 'Documentation and handover support'],
    faqs: [
      { question: 'How is this different from buying SaaS software?', answer: 'SaaS tools fit the average customer. Custom software fits your actual process — no workarounds for the 20% that doesn’t match the template.' },
      { question: 'What happens after launch?', answer: 'We offer ongoing support and iteration, since internal software requirements evolve as your business does.' }
    ]
  },
  {
    slug: 'ui-ux-design',
    number: '05',
    icon: 'palette',
    title: 'UI/UX Design',
    tagline: 'Clear interface systems that make complex products easier to understand and use.',
    overview:
      'Good design work disappears — it makes complex products feel obvious. We design interface systems grounded in real user research and consistent design tokens, so your product looks considered and scales cleanly as new features are added.',
    tags: ['Design systems', 'Prototyping', 'User research'],
    capabilities: [
      { title: 'User research', copy: 'Interviews, usability testing, and behavioral data to ground design decisions in how people actually use the product.' },
      { title: 'Design systems', copy: 'Reusable component libraries and token systems that keep new screens consistent without redesigning from scratch each time.' },
      { title: 'Interactive prototyping', copy: 'High-fidelity, clickable prototypes to validate flows and get stakeholder buy-in before engineering starts.' },
      { title: 'Interface & interaction design', copy: 'Screen-level design for web and mobile that balances visual clarity with the density complex products often need.' }
    ],
    process: [
      { title: 'Research', copy: 'We talk to real users and stakeholders to understand goals, pain points, and the constraints design has to work within.' },
      { title: 'Structure the experience', copy: 'Information architecture and user flows mapped out before any visual design begins.' },
      { title: 'Design & prototype', copy: 'High-fidelity screens and interactive prototypes, tested and iterated with real feedback loops.' },
      { title: 'Systemize & hand off', copy: 'A documented design system and developer-ready specs so engineering can build without guesswork.' }
    ],
    stack: ['Figma', 'Design tokens', 'Component libraries', 'Usability testing', 'Accessibility audits (WCAG)'],
    deliverables: ['User research findings', 'Documented design system', 'High-fidelity, interactive prototypes', 'Developer-ready handoff specs'],
    faqs: [
      { question: 'Do you also build what you design?', answer: 'Yes — our design and engineering teams work together, so handoff friction and inconsistent implementation aren’t a risk.' },
      { question: 'Can you redesign an existing product incrementally?', answer: 'Yes, we regularly work within an existing product, introducing a design system gradually rather than requiring a full rebuild.' }
    ]
  }
];

export function getServiceDetail(slug: string | undefined): ServiceDetail | undefined {
  return SERVICE_DETAILS.find((service) => service.slug === slug);
}
