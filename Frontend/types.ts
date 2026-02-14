
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

export interface Service {
  id: string;
  title: string;
  description: string;
  price?: string;
  features?: string[];
  tagline?: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}
