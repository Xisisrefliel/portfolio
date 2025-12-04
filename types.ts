export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link: string;
  image?: string; // Placeholder for project image
  year: string;
}

export interface Post {
  id: string;
  title: string;
  date: string;
  readTime: string;
  slug: string;
}

export interface Social {
  name: string;
  url: string;
  icon: string; // Icon name from lucide-react
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
}