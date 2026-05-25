import type { FolderId, FolderMeta, Project, MenuItem } from '../types';
import { AIRPORT_CYBERCULTURE_CONTENT } from './projects/airport-cyberculture';
import { ORANGE_BUSINESS_CONTENT } from './projects/orange-business';
import { DELOITTE_CONTENT } from './projects/deloitte';

export const MENU_ITEMS: MenuItem[] = [
  { label: 'PALLAVI OS', isBold: true },
  {
    label: 'ARCHIVE',
    items: ['All projects', 'Featured work', 'Studio work', 'Experiments'],
  },
  {
    label: 'NETWORK',
    items: ['Collaborations', 'Contact', 'Socials', 'Clients', 'Studios'],
  },
  {
    label: 'SIGNALS',
    items: [
      'Music Compositions',
      'Sound design',
      'Generative visuals',
      'Motion tests',
      'Audio experiments',
    ],
  },
  {
    label: 'MEMORY',
    items: [
      'About',
      'Resume',
      'Journey',
      'Logs',
      'Inspirations',
      'Writings',
    ],
  },
];

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

export const DESIGN_FOLDERS: FolderMeta[] = [
  {
    id: 'emerging-media',
    label: 'INTERACTIVE & EMERGING',
    icon: 'gesture',
    description: 'TouchDesigner · installations · immersive',
  },
  {
    id: 'digital-interfaces',
    label: 'UX & DIGITAL',
    icon: 'interface',
    description: 'Interfaces · systems · interaction design',
  },
  {
    id: 'sound',
    label: 'SOUND.EXE',
    icon: 'doc',
    description: 'Music · sonic storytelling · signals',
  },
  {
    id: 'experiments',
    label: 'AI EXPERIMENTS',
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
    id: 'branding-strategy',
    label: 'BRANDING & STRATEGY',
    icon: 'palette',
    description: 'Visual identity · brand systems · strategy',
  },
  {
    id: 'information-graphics',
    label: 'INFORMATION GRAPHICS',
    icon: 'chart',
    description: 'Data visualization · narratives · infographics',
  },
  {
    id: 'spatial-design',
    label: 'INDUSTRIAL & SPATIAL',
    icon: 'cube',
    description: 'Physical design · environments · objects',
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

export const SOUND_FOLDERS: FolderMeta[] = [
  {
    id: 'albums',
    label: 'ALBUMS',
    icon: 'doc',
    description: 'Full-length releases',
  },
  {
    id: 'singles',
    label: 'SINGLES',
    icon: 'doc',
    description: 'EPs and individual tracks',
  },
  {
    id: 'sound',
    label: 'DESIGN.EXE',
    icon: 'interface',
    description: 'Switch to Design Mode',
  },
  {
    id: 'press',
    label: 'PRESS',
    icon: 'info',
    description: 'Features and interviews',
  },
  {
    id: 'dj-mixes',
    label: 'DJ MIXES',
    icon: 'doc',
    description: 'Live sets and curation',
  },
  {
    id: 'film-score',
    label: 'FILM SCORE',
    icon: 'gesture',
    description: 'Compositions for motion picture',
  },
  {
    id: 'playground',
    label: 'PLAYGROUND',
    icon: 'folder',
    description: 'Sonic experiments',
  },
  {
    id: 'about',
    label: 'ABOUT',
    icon: 'info',
    description: 'Artist profile',
  },
  {
    id: 'trash',
    label: 'TRASH',
    icon: 'trash',
    description: 'Discarded sounds',
  },
];

export const ALL_FOLDERS: FolderMeta[] = [...DESIGN_FOLDERS, ...SOUND_FOLDERS];
export const FOLDERS = ALL_FOLDERS;

export const PROJECTS: Project[] = [
  {
    id: 'orange-business',
    folderId: 'digital-interfaces',
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
    sections: ORANGE_BUSINESS_CONTENT,
  },
  {
    id: 'deloitte',
    folderId: 'digital-interfaces',
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
    sections: DELOITTE_CONTENT,
  },
  {
    id: 'room-booking',
    folderId: 'digital-interfaces',
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
    folderId: 'digital-interfaces',
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
    folderId: 'digital-interfaces',
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
    folderId: 'emerging-media',
    title: 'CYBERCULTURE IN AIRPORTS',
    subtitle: 'Immersive terminal installation',
    year: '2023',
    tags: ['INSTALLATION', 'TOUCHDESIGNER', 'CYBER'],
    summary:
      'Large-scale ambient media for transit space — glitch aesthetics, passenger flow reactivity, and sonic layers tied to movement data.',
    role: 'Creative technologist · designer',
    tools: ['TouchDesigner', 'Ableton', 'Projection mapping'],
    outcomes: ['Site-specific narrative across 3 zones'],
    image:
      'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80',
    sections: AIRPORT_CYBERCULTURE_CONTENT,
  },
  {
    id: 'renewable-energy',
    folderId: 'emerging-media',
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
    folderId: 'emerging-media',
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
    folderId: 'emerging-media',
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
    folderId: 'playground',
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
    folderId: 'playground',
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
  {
    id: 'gestural-navigation',
    folderId: 'emerging-media',
    title: 'GESTURAL NAVIGATION',
    subtitle: 'Hand-tracking spatial interface',
    year: '2024',
    tags: ['GESTURE', 'SPATIAL', 'INTERACTION'],
    summary:
      'Three-dimensional gesture recognition systems for immersive environments — volumetric menus, haptic feedback, embodied navigation.',
    role: 'Interaction designer',
    tools: ['Leap Motion', 'Unity', 'Custom tracking'],
    outcomes: ['Patent-pending gesture vocabulary'],
    image:
      'https://images.unsplash.com/photo-1518709268805-4e9042af9a83?w=800&q=80',
  },
  {
    id: 'holographic-display',
    folderId: 'emerging-media',
    title: 'HOLOGRAPHIC DISPLAY',
    subtitle: 'AR data visualization layer',
    year: '2024',
    tags: ['AR', 'SPATIAL', 'DISPLAY'],
    summary:
      'Spatial computing interface for real-time data overlay — volumetric typography, gesture-based interaction, multi-user collaboration.',
    role: 'Experience designer',
    tools: ['ARKit', 'RealityKit', 'Swift'],
    outcomes: ['Live product demo at tech expo'],
    image:
      'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=800&q=80',
  },
  {
    id: 'immersive-installation',
    folderId: 'emerging-media',
    title: 'IMMERSIVE INSTALLATION',
    subtitle: 'Sensor-responsive environment',
    year: '2023',
    tags: ['INSTALLATION', 'SENSORS', 'RESPONSIVE'],
    summary:
      'Full-body tracking installation responding to movement patterns — generative audio, projection mapping, real-time feedback loops.',
    role: 'Creative technologist',
    tools: ['Kinect', 'Max/MSP', 'Projection mapping'],
    outcomes: ['Exhibited internationally'],
    image:
      'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&q=80',
  },
  {
    id: 'accessible-dashboard',
    folderId: 'digital-interfaces',
    title: 'ACCESSIBLE DASHBOARD',
    subtitle: 'Enterprise analytics platform',
    year: '2024',
    tags: ['DASHBOARD', 'ACCESSIBILITY', 'DATA'],
    summary:
      'Data-dense analytics interface with WCAG AAA compliance — keyboard navigation, screen reader optimization, high-contrast modes.',
    role: 'UX/Accessibility designer',
    tools: ['Figma', 'Testing tools', 'WCAG'],
    outcomes: ['100% accessibility compliance'],
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  },
  {
    id: 'mobile-app-redesign',
    folderId: 'digital-interfaces',
    title: 'MOBILE APP REDESIGN',
    subtitle: 'Cross-platform product UX',
    year: '2024',
    tags: ['MOBILE', 'PRODUCT', 'REDESIGN'],
    summary:
      'Comprehensive mobile-first redesign — gesture patterns, touch targets, offline-first architecture, performance optimization.',
    role: 'Senior UX designer',
    tools: ['Figma', 'Prototyping', 'User research'],
    outcomes: ['40% increase in user engagement'],
    image:
      'https://images.unsplash.com/photo-1512941691920-25bda36fda36?w=800&q=80',
  },
  {
    id: 'design-system',
    folderId: 'digital-interfaces',
    title: 'DESIGN SYSTEM',
    subtitle: 'Component library & tokens',
    year: '2023',
    tags: ['SYSTEM', 'COMPONENTS', 'TOKENS'],
    summary:
      'Unified component architecture for 12+ product teams — 200+ components, comprehensive documentation, version management.',
    role: 'Design systems lead',
    tools: ['Figma', 'Storybook', 'Token studio'],
    outcomes: ['50% faster design-to-dev handoff'],
    image:
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
  },
  {
    id: 'brand-identity',
    folderId: 'branding-strategy',
    title: 'BRAND IDENTITY',
    subtitle: 'Visual language & guidelines',
    year: '2024',
    tags: ['BRANDING', 'IDENTITY', 'STRATEGY'],
    summary:
      'Comprehensive brand system — logo variations, typography hierarchy, color palette, motion principles, asset library.',
    role: 'Brand designer',
    tools: ['Illustrator', 'Figma', 'Brand guidelines'],
    outcomes: ['Multi-award winning design'],
    image:
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
  },
  {
    id: 'marketing-campaign',
    folderId: 'branding-strategy',
    title: 'MARKETING CAMPAIGN',
    subtitle: 'Integrated brand activation',
    year: '2023',
    tags: ['CAMPAIGN', 'MARKETING', 'ACTIVATION'],
    summary:
      'Cross-channel marketing campaign — brand messaging, visual assets, social strategy, motion design, print collateral.',
    role: 'Creative director',
    tools: ['Figma', 'After Effects', 'Analytics'],
    outcomes: ['300% ROI increase'],
    image:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
  },
  {
    id: 'rebranding-project',
    folderId: 'branding-strategy',
    title: 'REBRANDING PROJECT',
    subtitle: 'Legacy system modernization',
    year: '2023',
    tags: ['REBRANDING', 'LEGACY', 'STRATEGY'],
    summary:
      'Strategic rebranding of enterprise platform — stakeholder alignment, brand architecture, rollout strategy, employee adoption.',
    role: 'Brand strategist',
    tools: ['Workshop facilitation', 'Strategy', 'Figma'],
    outcomes: ['Successful market repositioning'],
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
  },
  {
    id: 'data-visualization',
    folderId: 'information-graphics',
    title: 'DATA VISUALIZATION',
    subtitle: 'Complex financial metrics',
    year: '2024',
    tags: ['DATAVIZ', 'INFOGRAPHIC', 'FINANCIAL'],
    summary:
      'Interactive financial dashboard — multi-dimensional data, narrative flow, real-time updates, accessible color schemes.',
    role: 'Data visualization designer',
    tools: ['D3.js', 'Observable', 'Figma'],
    outcomes: ['Published visualization essay'],
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  },
  {
    id: 'infographic-series',
    folderId: 'information-graphics',
    title: 'INFOGRAPHIC SERIES',
    subtitle: 'Climate impact narrative',
    year: '2023',
    tags: ['INFOGRAPHIC', 'NARRATIVE', 'CLIMATE'],
    summary:
      'Multi-part infographic series translating research data — visual metaphors, progressive complexity, interactive web adaptation.',
    role: 'Graphic designer',
    tools: ['Illustrator', 'Figma', 'D3.js'],
    outcomes: ['30K+ social shares'],
    image:
      'https://images.unsplash.com/photo-1553481343-7183a50120c2?w=800&q=80',
  },
  {
    id: 'interactive-story',
    folderId: 'information-graphics',
    title: 'INTERACTIVE STORY',
    subtitle: 'Scrollytelling narrative',
    year: '2024',
    tags: ['INTERACTIVE', 'STORY', 'WEB'],
    summary:
      'Long-form narrative with embedded data visualization — scroll-driven animation, progressive disclosure, rich media integration.',
    role: 'Information designer',
    tools: ['Figma', 'Webflow', 'GSAP'],
    outcomes: ['Journalism award nomination'],
    image:
      'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80',
  },
  {
    id: 'furniture-design',
    folderId: 'spatial-design',
    title: 'FURNITURE DESIGN',
    subtitle: 'Modular workspace system',
    year: '2024',
    tags: ['FURNITURE', 'MODULAR', 'WORKSPACE'],
    summary:
      'Modular office furniture system — ergonomic studies, material specification, manufacturing optimization, assembly documentation.',
    role: 'Industrial designer',
    tools: ['Fusion 360', 'Rhino', 'CAD'],
    outcomes: ['Production partnership established'],
    image:
      'https://images.unsplash.com/photo-1540932239986-310128078ceb?w=800&q=80',
  },
  {
    id: 'interior-space',
    folderId: 'spatial-design',
    title: 'INTERIOR SPACE',
    subtitle: 'Tech office design',
    year: '2023',
    tags: ['INTERIOR', 'OFFICE', 'SPATIAL'],
    summary:
      'Adaptive office interior — collaboration zones, acoustic design, lighting strategy, wayfinding, sustainable materials.',
    role: 'Interior designer',
    tools: ['SketchUp', 'Enscape', 'CAD'],
    outcomes: ['LEED Platinum certification'],
    image:
      'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&q=80',
  },
  {
    id: 'packaging-design',
    folderId: 'spatial-design',
    title: 'PACKAGING DESIGN',
    subtitle: 'Sustainable product packaging',
    year: '2023',
    tags: ['PACKAGING', 'PRODUCT', 'SUSTAINABLE'],
    summary:
      'Zero-waste packaging system — material innovation, structural engineering, die-line development, environmental impact.',
    role: 'Packaging designer',
    tools: ['Illustrator', 'CAD', 'Prototyping'],
    outcomes: ['Zero waste certification'],
    image:
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
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
