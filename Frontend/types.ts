
export interface Project {
  id: string;
  title: string;
  category: string;
  result: string;
  image: string;
  description: string;
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
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}
