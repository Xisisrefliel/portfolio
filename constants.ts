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
    tags: ['React', 'Next.js'],
    link: 'https://takip-xi.vercel.app/',
    year: '2024'
  },
];

export const POSTS: Post[] = [
  {
    id: '1',
    title: 'What do i think of coding with AI?',
    date: 'Dec 7, 2025',
    readTime: '7 min',
    slug: 'coding-with-ai'
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
    id: '1',
    title: 'What do i think of coding with AI?',
    date: 'Dec 7, 2025',
    readTime: '7 min',
    slug: 'coding-with-ai',
    dek: 'AI is a multiplier. Without expertise, there is nothing to amplify.',
    sections: [
      {
        body: 'AI is a multiplier, not a replacement. Without expertise, there is nothing to amplify.'
      },
      {
        heading: 'The Chauffeur Problem',
        body: "After winning his Nobel Prize, Max Planck toured Germany giving the same lecture. His chauffeur memorized it and once delivered it perfectly, until a question stumped him. He didn't have real knowledge, just surface-level recitation.\n\nAI is that chauffeur. It's sophisticated pattern-matching, not deep understanding. It can generate code that looks right but fails under scrutiny because it doesn't grasp the why behind your architecture, constraints, or edge cases."
      },
      {
        heading: 'Five Mental Models',
        body: 'Use these to keep agency while coding with AI.'
      },
      {
        heading: '1. High-IQ Intern',
        body: 'AI is brilliant but has zero context. Don\'t ask "fix this bug." Instead:\n\n- Paste the function, error, and relevant code\n- Specify constraints: "Use our existing patterns, follow our style guide"\n- Review everything. It doesn\'t know your legacy system'
      },
      {
        heading: '2. Prep Cook, Not Chef',
        body: "AI can chop onions. Prep ingredients. Start the sauce. It saves time on grunt work.\n\nBut it can't design the menu. Can't judge the seasoning. Can't cook a great meal. You're still the chef."
      },
      {
        heading: '3. Sophisticated Search',
        body: 'You\'re not pair programming. You\'re searching a massive code pattern database. Keywords matter. "Idempotent webhook handler with exactly-once semantics" beats "make this work."\n\nEvery prompt is a search query. Vague queries return vague results.'
      },
      {
        heading: '4. Roguelikes: Restart Often',
        body: 'Each chat session is a fresh run. Context rot is real. Performance degrades as sessions grow.\n\nDon\'t: One 200-message session building everything.\nDo: 20 focused sessions: one for API design, one for tests, one for refactoring.\n\nWhen you hit a dead end, restart. Take the good code, edit your prompt, begin fresh. Context bloat confuses the model.'
      },
      {
        heading: '5. Context Is King',
        body: 'Your inputs are grounded (real code, logs, requirements). AI outputs are ungrounded guesses.\n\nGround the AI: Paste actual error messages, function signatures, config files.\nValidate everything: That npm install command? Verify it. That SQL query? Explain it first.\nQuality follows a sigmoid curve: Small context improvements yield big gains, up to a point. Then diminishing returns hit. Know when to stop.'
      },
      {
        heading: 'The Wrong Optimization',
        body: 'Stop learning "prompt engineering." Start building expertise.\n\nThe skill isn\'t prompting. It\'s judgment. Judgment to spot SQL injection vulnerabilities, circular dependencies, or violations of team conventions.\n\nThe developers winning with AI aren\'t memorizing magic phrases. They\'re the ones who can look at generated code and know it\'s wrong because they understand the domain. They can guide the AI because they know what good looks like.'
      }
    ],
    outro: 'I don\'t love calling LLMs "AI", as they\'re a small part of a much broader field. But that\'s how most people talk about them now so for clarity, "AI" means large language models like GPT, Claude, and Gemini in this post.'
  },
];