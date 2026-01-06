# Personal Portfolio

A minimalist portfolio website built with React, TypeScript, and Tailwind CSS. Features smooth animations and a clean dark-mode design.

## Tech Stack

- **React 19** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons

## Features

- Dark aesthetic design with glassmorphism effects
- Smooth page transitions and micro-interactions
- Project showcase with hover effects
- Blog section for writing
- Fully responsive layout
- Optimized images with lazy loading
- Privacy-focused (no tracking, no cookies)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) runtime (v1.0 or higher recommended)

### Installation

```bash
bun install
```

### Development

```bash
bun dev
```

Open http://localhost:5173 to view the site.

### Build

```bash
bun build
```

Output will be in the `dist` folder.

### Preview Production Build

```bash
bun preview
```

## Project Structure

```
src/
├── components/      # React components (Hero, ProjectCard, BlogPostPage, etc.)
├── constants.ts     # Static data (projects, blog posts, social links)
├── types.ts         # TypeScript interfaces
├── App.tsx          # Main app component
├── index.tsx        # Entry point
└── main.tsx         # React DOM rendering
```

## Customization

- Edit `constants.ts` to update projects, blog posts, and social links
- Modify `tailwind.config.ts` for theme customization
- Replace `/public/profile-optimized.jpeg` with your own photo

## Deployment

Deploy to Vercel for automatic deployments.
