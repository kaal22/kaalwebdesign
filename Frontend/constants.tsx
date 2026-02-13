
import { Project, Testimonial, Service, ProcessStep } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Nexus SaaS',
    category: 'Product Strategy & Design',
    result: '+142% Conversion',
    image: 'https://picsum.photos/seed/nexus/1200/800',
    description: 'Reimagining the workflow for enterprise data scientists.'
  },
  {
    id: '2',
    title: 'Aura Fintech',
    category: 'Visual Identity & Web',
    result: '$4M Seed Raised',
    image: 'https://picsum.photos/seed/aura/1200/800',
    description: 'A cinematic brand reveal for the future of digital banking.'
  },
  {
    id: '3',
    title: 'Vortex Studio',
    category: 'Interactive Experience',
    result: '45k Monthly Users',
    image: 'https://picsum.photos/seed/vortex/1200/800',
    description: 'Pushing the boundaries of 3D web interaction.'
  },
  {
    id: '4',
    title: 'Kinetik AI',
    category: 'Full Cycle Development',
    result: 'Top 10 AI Tools',
    image: 'https://picsum.photos/seed/kinetik/1200/800',
    description: 'From concept to code: Scaling an AI powerhouse.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Daniel Reed',
    role: 'Founder, Nexus',
    content: "Kaal didn't just redesign our site; they rebuilt our authority. Our conversion metrics jumped immediately after launch.",
    avatar: 'https://picsum.photos/seed/person1/100/100'
  },
  {
    id: '2',
    name: 'Sarah Chen',
    role: 'CEO, Aura',
    content: "The level of intentionality in every pixel is insane. They understand the intersection of beauty and business.",
    avatar: 'https://picsum.photos/seed/person2/100/100'
  },
  {
    id: '3',
    name: 'Marcus Thorne',
    role: 'Product Lead, Vortex',
    content: "Best creative partner we've ever worked with. They challenged our assumptions and delivered something truly cinematic.",
    avatar: 'https://picsum.photos/seed/person3/100/100'
  }
];

export const SERVICES: Service[] = [
  {
    id: 'launch-sprint',
    title: 'Launch Sprint',
    description: 'High-impact 4-week site for startups needing to launch fast without compromising premium design.',
    price: 'Starting from $6k'
  },
  {
    id: 'redesign-reposition',
    title: 'Redesign & Reposition',
    description: 'A deep-dive strategic overhaul for established brands ready to scale to the next tier.',
    price: 'Starting from $12k'
  },
  {
    id: 'design-partner',
    title: 'Design Partner',
    description: 'Monthly collaboration for growing teams who need high-level design direction on tap.',
    price: 'Fixed monthly retainer'
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  { number: '01', title: 'Discover', description: 'We strip away the noise to find your brand’s unique narrative and core business goals.' },
  { number: '02', title: 'Narrative', description: 'Mapping out the user journey as a cinematic experience with controlled pacing.' },
  { number: '03', title: 'Design System', description: 'Building a scalable visual language that communicates credibility instantly.' },
  { number: '04', title: 'Build', description: 'Engineering pixel-perfect, high-performance web experiences using modern tech.' },
  { number: '05', title: 'Launch', description: 'Deploying your new digital home and optimizing for maximum conversion impact.' }
];
