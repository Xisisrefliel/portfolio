import { Project, Post, Social, Experience } from './types';

export const SOCIALS: Social[] = [
  { name: 'Twitter', url: 'https://x.com/Xisisrefliel', icon: 'Twitter' },
  { name: 'GitHub', url: 'https://github.com/Xisisrefliel', icon: 'Github' },
  { name: 'Mail', url: 'mailto:feherlofia@icloud.com', icon: 'Mail' },
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Takip',
    description: 'A web app to track Movies and TV Shows',
    tags: ['React', 'Laravel'],
    link: 'https://takip.cloud',
    year: '2024'
  },
];

export const POSTS: Post[] = [
  {
    id: '1',
    title: 'The Art of Invisible Design',
    date: 'Oct 12, 2024',
    readTime: '4 min',
    slug: 'invisible-design'
  },
  {
    id: '2',
    title: 'Migrating from CSS-in-JS to Tailwind',
    date: 'Sep 28, 2024',
    readTime: '6 min',
    slug: 'css-migration'
  },
  {
    id: '3',
    title: 'Why I Bet on WebAssembly',
    date: 'Aug 15, 2024',
    readTime: '5 min',
    slug: 'wasm-bet'
  }
];

export const EXPERIENCE: Experience[] = [
  {
    role: 'Ausbildung als Anwendungsentwickler',
    company: 'Main-Netz Media',
    period: '2023 - present',
    description: '3 Years of Apprenticeship in Web Development with main focus on Laravel'
  }
];