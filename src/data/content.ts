import type { FolderId, FolderMeta, Project } from '../types';

export const MENU_ITEMS = [
  'PALLAVI OS',
  'ARCHIVE',
  'NETWORK',
  'SIGNAL',
  'MEMORY',
] as const;

export const SLIDESHOW_IMAGES = [
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=88',
  'https://images.unsplash.com/photo-1470071459604-3b21adcf929e?w=1920&q=88',
  'https://images.unsplash.com/photo-1501785888041-7a1cec8796b7?w=1920&q=88',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=88',
  'https://images.unsplash.com/photo-1493246507139-91e62dca55bd?w=1920&q=88',
  'https://images.unsplash.com/photo-1480714378408-67cf0d7bc263?w=1920&q=88',
  'https://images.unsplash.com/photo-1514565131-5a3d84509f8e?w=1920&q=88',
  'https://images.unsplash.com/photo-1519501025264-65ba3770bf71?w=1920&q=88',
];

export const FOLDERS: FolderMeta[] = [
  {
    id: 'ux-systems',
    label: 'UX SYSTEMS',
    icon: 'folder',
    description: 'Telecom · dashboards · enterprise UX',
  },
  {
    id: 'interactive-media',
    label: 'INTERACTIVE MEDIA',
    icon: 'folder',
    description: 'TouchDesigner · installations · immersive',
  },
  {
    id: 'sound',
    label: 'SOUND.EXE',
    icon: 'doc',
    description: 'Music · sonic storytelling · signals',
  },
  {
    id: 'experiments',
    label: 'EXPERIMENTS',
    icon: 'folder',
    description: 'Systems · prototypes · speculative UI',
  },
  {
    id: 'playground',
    label: 'PLAYGROUND',
    icon: 'folder',
    description: 'Motion · AI · generative visuals',
  },
  {
    id: 'about',
    label: 'ABOUT',
    icon: 'info',
    description: 'Operator profile · contact',
  },
  {
    id: 'trash',
    label: 'TRASH',
    icon: 'trash',
    description: 'Discarded drafts',
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'orange-business',
    folderId: 'ux-systems',
    title: 'ORANGE BUSINESS',
    subtitle: 'Enterprise telecom experience',
    year: '2024',
    tags: ['ENTERPRISE', 'TELECOM', 'DASHBOARD'],
    summary:
      'End-to-end UX for B2B telecom workflows — service configuration, account hierarchy, and operational dashboards tuned for high-stakes enterprise users.',
    role: 'Lead interaction designer',
    tools: ['Figma', 'Design systems', 'Workshop facilitation'],
    outcomes: [
      'Reduced task completion time across core flows',
      'Unified component language across product lines',
    ],
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  },
  {
    id: 'deloitte',
    folderId: 'ux-systems',
    title: 'DELOITTE',
    subtitle: 'Consulting platform UX',
    year: '2023',
    tags: ['ENTERPRISE', 'DATA', 'WORKFLOW'],
    summary:
      'Complex data-heavy interfaces for consulting teams — balancing density, clarity, and role-based access across multi-step engagements.',
    role: 'UX designer',
    tools: ['Figma', 'Prototyping', 'Stakeholder research'],
    outcomes: [
      'Modular patterns for repeatable engagement types',
      'Accessibility-aligned data visualization',
    ],
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  },
  {
    id: 'room-booking',
    folderId: 'ux-systems',
    title: 'ROOM BOOKING SYSTEM',
    subtitle: 'Workplace resource UX',
    year: '2023',
    tags: ['PRODUCT', 'MOBILE', 'WORKPLACE'],
    summary:
      'Spatial booking and occupancy UX for hybrid workplaces — floor plans, availability states, and frictionless reservation flows.',
    role: 'Interaction designer',
    tools: ['Figma', 'User testing', 'Service blueprint'],
    outcomes: ['Clear mental model for desk vs room booking'],
    image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
  },
  {
    id: 'supply-chain',
    folderId: 'ux-systems',
    title: 'SUPPLY CHAIN',
    subtitle: 'Logistics visibility dashboard',
    year: '2022',
    tags: ['DASHBOARD', 'IoT', 'ENTERPRISE'],
    summary:
      'Real-time supply chain monitoring — exception handling, shipment timelines, and alert hierarchies for operations teams.',
    role: 'UX / UI designer',
    tools: ['Figma', 'Journey mapping', 'Design tokens'],
    outcomes: ['Exception-first dashboard hierarchy'],
    image:
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
  },
  {
    id: 'iot-journey',
    folderId: 'ux-systems',
    title: 'IoT JOURNEY',
    subtitle: 'Connected device onboarding',
    year: '2022',
    tags: ['IoT', 'ONBOARDING', 'SYSTEM'],
    summary:
      'Multi-touchpoint onboarding for IoT deployments — pairing flows, status surfaces, and admin tooling for field technicians.',
    role: 'Interaction designer',
    tools: ['Figma', 'Flow diagrams', 'Usability testing'],
    outcomes: ['Reduced setup failure rate in pilot'],
    image:
      'https://images.unsplash.com/photo-1558346490-a53ccb5be9b0?w=800&q=80',
  },
  {
    id: 'airport-cyberculture',
    folderId: 'interactive-media',
    title: 'AIRPORT CYBERCULTURE',
    subtitle: 'Immersive terminal installation',
    year: '2024',
    tags: ['INSTALLATION', 'TOUCHDESIGNER', 'CYBER'],
    summary:
      'Large-scale ambient media for transit space — glitch aesthetics, passenger flow reactivity, and sonic layers tied to movement data.',
    role: 'Creative technologist · designer',
    tools: ['TouchDesigner', 'Ableton', 'Projection mapping'],
    outcomes: ['Site-specific narrative across 3 zones'],
    image:
      'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80',
  },
  {
    id: 'renewable-energy',
    folderId: 'interactive-media',
    title: 'RENEWABLE ENERGY',
    subtitle: 'Data-driven installation',
    year: '2023',
    tags: ['INSTALLATION', 'DATA', 'IMMERSIVE'],
    summary:
      'Generative visuals driven by live energy metrics — translating sustainability data into visceral, public-facing spectacle.',
    role: 'Interaction · media designer',
    tools: ['TouchDesigner', 'Python', 'Sensors'],
    outcomes: ['Real-time data binding to visual grammar'],
    image:
      'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80',
  },
  {
    id: 'noise-cluster',
    folderId: 'interactive-media',
    title: 'NOISE CLUSTER',
    subtitle: 'Audio-visual performance system',
    year: '2023',
    tags: ['PERFORMANCE', 'SOUND', 'GENERATIVE'],
    summary:
      'Live AV system where noise profiles drive particle fields and typographic rupture — cyberculture meets club acoustics.',
    role: 'Designer · performer',
    tools: ['TouchDesigner', 'Max/MSP', 'Custom shaders'],
    outcomes: ['Tour-ready modular performance patch'],
    image:
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80',
  },
  {
    id: 'leap-motion',
    folderId: 'interactive-media',
    title: 'LEAP MOTION',
    subtitle: 'Gestural interface experiments',
    year: '2022',
    tags: ['GESTURE', 'PROTOTYPE', '3D'],
    summary:
      'Hand-tracking prototypes exploring spatial UI — volumetric menus, sonic feedback, and embodied navigation metaphors.',
    role: 'Interaction designer',
    tools: ['Unity', 'Leap SDK', 'Blender'],
    outcomes: ['Gesture vocabulary for spatial apps'],
    image:
      'https://images.unsplash.com/photo-1518709268805-4e9042af9a83?w=800&q=80',
  },
  {
    id: 'going-places',
    folderId: 'sound',
    title: 'GOING PLACES EP',
    subtitle: 'Ambient electronica release',
    year: '2024',
    tags: ['MUSIC', 'RELEASE', 'AMBIENT'],
    summary:
      'Four-track EP blending field recordings, modular synthesis, and narrative interludes — travel as sonic architecture.',
    role: 'Composer · producer',
    tools: ['Ableton', 'Modular', 'Field recorders'],
    outcomes: ['Independent release · live sets'],
    image:
      'https://images.unsplash.com/photo-1511379934375-5072dc137fd0?w=800&q=80',
  },
  {
    id: 'ambient-electronica',
    folderId: 'sound',
    title: 'AMBIENT ELECTRONICA',
    subtitle: 'Long-form listening pieces',
    year: '2023',
    tags: ['AMBIENT', 'SOUNDSCAPE', 'EXPERIMENTAL'],
    summary:
      'Slow-evolving textures for installation backdrops and focus environments — designed for loop-safe spatial playback.',
    role: 'Sound designer',
    tools: ['Ableton', 'Reaktor', 'Convolution reverb'],
    outcomes: ['Licensed for installation use'],
    image:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
  },
  {
    id: 'sound-design',
    folderId: 'sound',
    title: 'SOUND DESIGN',
    subtitle: 'UI · brand · motion sonic layer',
    year: '2022',
    tags: ['SFX', 'BRAND', 'PRODUCT'],
    summary:
      'Micro-interaction sound libraries for digital products — tactile clicks, ambient beds, and alert hierarchies.',
    role: 'Sound designer',
    tools: ['Ableton', 'Foley', 'Web Audio'],
    outcomes: ['Cross-platform sonic design system'],
    image:
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80',
  },
  {
    id: 'speculative-ui',
    folderId: 'experiments',
    title: 'SPECULATIVE UI',
    subtitle: 'Future workstation concepts',
    year: '2024',
    tags: ['SPECULATIVE', 'UI', 'SYSTEM'],
    summary:
      'Explorations in post-screen interfaces — memory palaces, signal-based navigation, and OS metaphors as design fiction.',
    role: 'Designer · researcher',
    tools: ['Figma', 'Writing', 'Prototyping'],
    outcomes: ['Exhibited in graduate showcase'],
    image:
      'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80',
  },
  {
    id: 'signal-garden',
    folderId: 'experiments',
    title: 'SIGNAL GARDEN',
    subtitle: 'Network visualization lab',
    year: '2023',
    tags: ['DATA VIZ', 'NETWORK', 'GENERATIVE'],
    summary:
      'Real-time graph aesthetics for ambient displays — nodes breathe with traffic, edges pulse with latency.',
    role: 'Creative coder',
    tools: ['p5.js', 'D3', 'WebSockets'],
    outcomes: ['Open-source sketch library'],
    image:
      'https://images.unsplash.com/photo-1550751827-4bd374c1f58b?w=800&q=80',
  },
  {
    id: 'motion-tests',
    folderId: 'playground',
    title: 'MOTION TESTS',
    subtitle: 'Kinetic type · UI choreography',
    year: '2024',
    tags: ['MOTION', 'TYPOGRAPHY', 'UI'],
    summary:
      'Rapid motion studies for interface transitions — elastic grids, brutalist eases, and monospace rhythm.',
    role: 'Motion designer',
    tools: ['After Effects', 'Rive', 'CSS'],
    outcomes: ['Reusable motion primitives'],
    image:
      'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80',
  },
  {
    id: 'ai-explorations',
    folderId: 'playground',
    title: 'AI EXPLORATIONS',
    subtitle: 'Generative design workflows',
    year: '2024',
    tags: ['AI', 'GENERATIVE', 'WORKFLOW'],
    summary:
      'Human-in-the-loop pipelines for concept generation — moodboards, layout variants, and critique loops with models.',
    role: 'Designer · experimenter',
    tools: ['ComfyUI', 'Figma', 'Custom prompts'],
    outcomes: ['Studio workflow documentation'],
    image:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
  },
  {
    id: 'typography-systems',
    folderId: 'playground',
    title: 'TYPOGRAPHY SYSTEMS',
    subtitle: 'Grid-native type scales',
    year: '2023',
    tags: ['TYPE', 'SYSTEM', 'BRUTALIST'],
    summary:
      'Modular type systems for brutalist interfaces — pixel-aligned caps, mono body, and strict baseline grids.',
    role: 'Visual designer',
    tools: ['Glyphs', 'Figma', 'CSS'],
    outcomes: ['Open type specimen microsite'],
    image:
      'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80',
  },
  {
    id: 'generative-visuals',
    folderId: 'playground',
    title: 'GENERATIVE VISUALS',
    subtitle: 'Shader · particle studies',
    year: '2023',
    tags: ['GENERATIVE', 'GLSL', 'VISUAL'],
    summary:
      'Fragment shader experiments and particle fields — cyber/ambient palettes, scanlines, and analog artifacting.',
    role: 'Creative technologist',
    tools: ['TouchDesigner', 'GLSL', 'p5.js'],
    outcomes: ['Visual toolkit for live sets'],
    image:
      'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80',
  },
];

export function getProjectsByFolder(folderId: FolderId): Project[] {
  return PROJECTS.filter((p) => p.folderId === folderId);
}

export function getProject(id: string): Project | undefined {
  return PROJECTS.find((p) => p.id === id);
}

export function getFolderTags(folderId: FolderId): string[] {
  const tags = new Set<string>();
  getProjectsByFolder(folderId).forEach((p) =>
    p.tags.forEach((t) => tags.add(t)),
  );
  return ['ALL', ...Array.from(tags)];
}
