
import { Project, Testimonial, Service, ProcessStep, PrincipleCard, SystemNode } from './types';
import { Code, Zap, Building2, Rocket, Link2, TrendingUp, DollarSign, Users } from 'lucide-react';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Nexus SaaS',
    category: 'Product Strategy & Design',
    result: '+142% Conversion',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
    previewImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
    description: 'Reimagining the workflow for enterprise data scientists.',
    icon: Code,
    relatedIds: ['2'],
    status: 'completed' as const,
    energy: 100
  },
  {
    id: '2',
    title: 'Aura Fintech',
    category: 'Visual Identity & Web',
    result: '$4M Seed Raised',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
    previewImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
    description: 'A cinematic brand reveal for the future of digital banking.',
    icon: Building2,
    relatedIds: ['1', '3'],
    status: 'completed' as const,
    energy: 95
  },
  {
    id: '3',
    title: 'Vortex Studio',
    category: 'Interactive Experience',
    result: '45k Monthly Users',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=800&fit=crop',
    previewImage: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=800&fit=crop',
    description: 'Pushing the boundaries of 3D web interaction.',
    icon: Zap,
    relatedIds: ['2', '4'],
    status: 'completed' as const,
    energy: 90
  },
  {
    id: '4',
    title: 'Kinetik AI',
    category: 'Full Cycle Development',
    result: 'Top 10 AI Tools',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop',
    previewImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop',
    description: 'From concept to code: Scaling an AI powerhouse.',
    icon: Rocket,
    relatedIds: ['3', '5'],
    status: 'completed' as const,
    energy: 85
  },
  {
    id: '5',
    title: 'Lumina Health',
    category: 'Brand & Digital Product',
    result: '2x User Engagement',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=800&fit=crop',
    previewImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=800&fit=crop',
    description: 'A calming, conversion-focused experience for a telehealth leader.',
    icon: TrendingUp,
    relatedIds: ['4', '6'],
    status: 'completed' as const,
    energy: 88
  },
  {
    id: '6',
    title: 'Atlas Community',
    category: 'Platform & Community Design',
    result: '50k+ Active Members',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop',
    previewImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop',
    description: 'Building trust and connection through thoughtful UX and bold visual identity.',
    icon: Users,
    relatedIds: ['1', '5'],
    status: 'completed' as const,
    energy: 82
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Daniel Reed',
    role: 'Founder, Nexus',
    content: "Kaal didn't just redesign our site; they rebuilt our authority. Our conversion metrics jumped immediately after launch.",
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
  },
  {
    id: '2',
    name: 'Sarah Chen',
    role: 'CEO, Aura',
    content: "The level of intentionality in every pixel is insane. They understand the intersection of beauty and business.",
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
  },
  {
    id: '3',
    name: 'Marcus Thorne',
    role: 'Product Lead, Vortex',
    content: "Best creative partner we've ever worked with. They challenged our assumptions and delivered something truly cinematic.",
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
  },
  {
    id: '4',
    name: 'Elena Rodriguez',
    role: 'CTO, Kinetik AI',
    content: "From concept to launch in 4 weeks. The speed and quality they deliver is unmatched. Our user engagement doubled.",
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
  },
  {
    id: '5',
    name: 'James Park',
    role: 'Founder, TechFlow',
    content: "They transformed our brand identity completely. The new site doesn't just look premium—it converts like a machine.",
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop'
  },
  {
    id: '6',
    name: 'Amara Singh',
    role: 'Head of Design, InnovateLab',
    content: "Working with Kaal was a masterclass in design thinking. Every interaction feels intentional, every pixel purposeful.",
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop'
  }
];

export const PRINCIPLES: PrincipleCard[] = [
  {
    id: 'clarity',
    number: '01',
    title: 'Clarity',
    content: [
      'Every element earns its place.',
      'Structure before style. Message before motion.',
      'No visual noise. No confusion.'
    ]
  },
  {
    id: 'narrative',
    number: '02',
    title: 'Narrative',
    content: [
      "A website isn't pages.",
      "It's a guided experience.",
      'Attention flows intentionally — from first impression to final action.'
    ]
  },
  {
    id: 'conversion',
    number: '03',
    title: 'Conversion',
    content: [
      'Design without direction is decoration.',
      'Hierarchy, spacing, and rhythm are used to move users forward — naturally.'
    ]
  },
  {
    id: 'performance',
    number: '04',
    title: 'Performance',
    content: [
      'Fast-loading. Optimised. Clean.',
      'Built to perform technically — not just visually.'
    ]
  },
  {
    id: 'precision',
    number: '05',
    title: 'Precision',
    content: [
      'No templates. No recycled layouts. No outsourcing.',
      'Every build is hands-on.'
    ]
  },
  {
    id: 'scalability',
    number: '06',
    title: 'Scalability',
    content: [
      'Designed for growth.',
      'Expandable systems. Structured components.',
      "Built for what's next — not just launch day."
    ]
  }
];

export const SERVICES: Service[] = [
  {
    id: 'digital-gravity',
    title: 'Digital Gravity — Founding Website Experience',
    description: 'For founders who want more than a "nice-looking site." A strategy-led, fully custom website designed to attract attention — and convert it with precision.',
    price: '£1,800 – £2,200',
    tagline: 'Built independently. Delivered intentionally.',
    features: [
      'Positioning & structure refinement',
      'Homepage narrative architecture',
      '5–7 fully custom pages',
      'Responsive design across all devices',
      'Conversion-focused layout & hierarchy',
      'Performance optimisation',
      'Contact form integration',
      'Basic SEO setup',
      '2 structured revision rounds'
    ]
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  { number: '01', title: 'Discover', description: 'We define your positioning, audience, and objectives.' },
  { number: '02', title: 'Narrative', description: 'We shape your story into a structured experience.' },
  { number: '03', title: 'Design System', description: 'Bold visuals. Logical hierarchy. Scalable components.' },
  { number: '04', title: 'Build', description: 'Fast. Optimised. Clean code. Future-ready.' },
  { number: '05', title: 'Launch', description: 'Live with confidence. Measured for performance.' }
];

export const SYSTEM_NODES: SystemNode[] = [
  { id: 'typography', title: 'Typography', line1: 'Guides attention.', line2: 'Hierarchy creates clarity.' },
  { id: 'motion', title: 'Motion', line1: 'Directs focus.', line2: 'Movement with purpose — never decoration.' },
  { id: 'structure', title: 'Structure', line1: 'Drives action.', line2: 'Every section leads somewhere.' },
  { id: 'narrative', title: 'Narrative', line1: 'A guided experience.', line2: 'Not just pages — progression.' },
  { id: 'conversion', title: 'Conversion', line1: 'Designed to move users forward.', line2: 'Subtle. Intentional. Effective.' },
  { id: 'performance', title: 'Performance', line1: 'Fast. Optimised. Scalable.', line2: 'Built for real-world use.' }
];
