import { Project, Post, Social, Experience, BlogPostDetail } from './types';

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

export const BLOG_POSTS: BlogPostDetail[] = [
  {
    id: '3',
    title: 'Why I Bet on WebAssembly',
    date: 'Aug 15, 2024',
    readTime: '5 min',
    slug: 'wasm-bet',
    dek: 'JavaScript has eaten the world. WebAssembly lets the browser breathe again.',
    sections: [
      {
        body: "JavaScript has eaten the world. It runs on servers, phones, robots, and refrigerators. But for computationally heavy tasks—image processing, physics simulations, complex audio synthesis—it still hits a ceiling."
      },
      {
        heading: 'Breaking the Sound Barrier',
        body: "Working on Mono Editor, we needed to parse massive markdown files and render syntax highlighting in real-time without blocking the UI thread. JS struggled. Rust, compiled to WASM, didn't even blink."
      },
      {
        heading: 'The Hybrid Future',
        body: "I don't see WASM replacing JS. I see them as the perfect duo. JavaScript handles the UI, the glue, the interactivity. WebAssembly handles the heavy lifting. This hybrid architecture is where the next generation of web apps will be built."
      }
    ],
    outro: 'Thanks for reading. If you enjoyed this, feel free to say hi on Twitter.'
  },
  {
    id: '1',
    title: 'The Art of Invisible Design',
    date: 'Oct 12, 2024',
    readTime: '4 min',
    slug: 'invisible-design',
    dek: 'Interfaces should whisper, not shout. Good design stays out of the way.',
    sections: [
      {
        body: 'I love products that disappear. No loading spinners. No pop-ups. Just flow. The best UI gives you confidence without asking for attention.'
      },
      {
        heading: 'Edges and Silence',
        body: 'Every interface decision has a cost. I trim friction with generous whitespace, steady rhythms, and typography that feels like a deep breath.'
      },
      {
        heading: 'Small, Honest Details',
        body: 'Micro-interactions are my favorite honesty tests. If the little things feel intentional, users trust the big things.'
      }
    ],
    outro: 'Invisible design is not empty design—it is respectful design.'
  },
  {
    id: '2',
    title: 'Migrating from CSS-in-JS to Tailwind',
    date: 'Sep 28, 2024',
    readTime: '6 min',
    slug: 'css-migration',
    dek: 'I traded bespoke CSS-in-JS setups for a disciplined utility system.',
    sections: [
      {
        body: 'CSS-in-JS gave me flexibility, but at scale it hurt: runtime overhead, tangled theme objects, and drift between components.'
      },
      {
        heading: 'Constraints as a Feature',
        body: 'Tailwind forced consistency. Tokens turned into muscle memory. Shipping was faster because the design language was baked into the utilities.'
      },
      {
        heading: 'Outcome',
        body: 'Bundle size shrank, PRs read cleaner, and theming got simpler. Sometimes constraints are the shortcut.'
      }
    ],
    outro: 'Utilities are not a silver bullet, but they’re a sharp one.'
  }
];