
import { LucideIcon } from 'lucide-react';

export interface Project {
  id: string;
  title: string;
  category: string;
  result: string;
  image: string;
  previewImage?: string;
  description: string;
  icon?: LucideIcon;
  relatedIds?: string[];
  status?: 'completed' | 'in-progress' | 'pending';
  energy?: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export interface PrincipleCard {
  id: string;
  number: string;
  title: string;
  content: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price?: string;
  delivery?: string;
  features?: string[];
  tagline?: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface SystemNode {
  id: string;
  title: string;
  line1: string;
  line2: string;
}
