import * as React from 'react';
import { useEffect, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Hero from './components/Hero';
import ProjectCard from './components/ProjectCard';
import WritingList from './components/WritingList';
import ExperienceList from './components/ExperienceList';
import Navbar from './components/Navbar';
import BlogPostPage from './components/BlogPostPage';
import { PROJECTS, POSTS, EXPERIENCE, SOCIALS, BLOG_POSTS } from './constants';
import * as LucideIcons from 'lucide-react';

const App: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [currentSlug, setCurrentSlug] = useState<string | null>(null);

  const syncFromPath = useCallback(() => {
    const path = window.location.pathname;
    const match = path.match(/^\/blog\/([^/]+)/);
    setCurrentSlug(match ? match[1] : null);
  }, []);

  useEffect(() => {
    setMounted(true);
    syncFromPath();

    const handlePopState = () => {
      syncFromPath();
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [syncFromPath]);

  const handleSelectPost = (slug: string) => {
    window.history.pushState({}, '', `/blog/${slug}`);
    setCurrentSlug(slug);
  };

  const handleBackHome = () => {
    window.history.pushState({}, '', `/`);
    setCurrentSlug(null);
  };

  if (!mounted) return null;

  const post = currentSlug
    ? BLOG_POSTS.find((p) => p.slug === currentSlug) || null
    : null;

  return (
    <div className="relative min-h-screen bg-background text-textMain">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-[520px] bg-gradient-to-b from-white/[0.035] via-white/[0.02] to-transparent" />
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {currentSlug ? (
          <motion.div
            key={`post-${currentSlug}`}
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.985 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="min-h-screen"
          >
            <BlogPostPage post={post} onBack={handleBackHome} />
          </motion.div>
        ) : (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="min-h-screen font-sans selection:bg-white/20 selection:text-white"
          >
            <main className="relative z-10 max-w-2xl mx-auto px-6 pb-32">
            <div className="pointer-events-none absolute inset-x-0 top-1 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent blur-sm opacity-90" />
              <section id="home">
                <Hero />
              </section>

              <section id="cmd" className="mb-24">
                <h2 className="text-sm font-bold uppercase tracking-widest text-textMuted mb-8 pl-1">Selected Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {PROJECTS.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                  ))}
                </div>
              </section>

              <ExperienceList experiences={EXPERIENCE} />

              <section id="writing" className="mb-24">
                <WritingList posts={POSTS} onSelectPost={handleSelectPost} />
              </section>

              <section id="contact" className="mb-12 border-t border-white/10 pt-12">
                  <h2 className="text-sm font-bold uppercase tracking-widest text-textMuted mb-6 pl-1">Connect</h2>
                  <div className="flex flex-wrap gap-4">
                    {SOCIALS.map((social) => {
                      const Icon = (LucideIcons as any)[social.icon] || LucideIcons.Link;
                      return (
                        <a
                          key={social.name}
                          href={social.url}
                          className="flex items-center gap-2 text-sm text-textMuted hover:text-textMain transition-colors px-3 py-2 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/5"
                        >
                          <Icon size={16} />
                          {social.name}
                        </a>
                      );
                    })}
                  </div>
              </section>
              
              <footer className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-white/5 text-xs text-textMuted/50">
                <p className="mt-2 sm:mt-0">Built with React & Tailwind</p>
              </footer>

            </main>

            <Navbar />
            
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;