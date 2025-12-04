import { Project, Post, Social, Experience } from './types';

export const SOCIALS: Social[] = [
  { name: 'Twitter', url: 'https://x.com/Xisisrefliel', icon: 'Twitter' },
  { name: 'GitHub', url: 'https://github.com/Xisisrefliel', icon: 'Github' },
  { name: 'Mail', url: 'mailto:feherlofia@icloud.com', icon: 'Mail' },
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Lumina Interface',
    description: 'A design system for light-based user interfaces focused on ray-tracing aesthetics.',
    tags: ['React', 'Three.js', 'WebGL'],
    link: '#',
    year: '2024'
  },
  {
    id: '2',
    title: 'Vercel Analytics Clone',
    description: 'Real-time privacy-friendly analytics dashboard rebuilt from scratch.',
    tags: ['Next.js', 'Clickhouse', 'Tremor'],
    link: '#',
    year: '2023'
  },
  {
    id: '3',
    title: 'Mono Editor',
    description: 'A distraction-free markdown editor for technical writers.',
    tags: ['Tauri', 'Rust', 'React'],
    link: '#',
    year: '2023'
  },
  {
    id: '4',
    title: 'Chronos',
    description: 'Experimental time-tracking for creative flow states.',
    tags: ['Swift', 'SwiftUI'],
    link: '#',
    year: '2022'
  }
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
    role: 'Azubi',
    company: 'Main-Netz Media',
    period: '2023 - ...',
    description: '3 Years of Apprenticeship in the field of Web Development'
  }
];