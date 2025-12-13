import * as React from 'react';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Github, Twitter, Mail, Link as LinkIcon } from 'lucide-react';
import Hero from './components/Hero';
import ProjectCard from './components/ProjectCard';
import WritingList from './components/WritingList';
import ExperienceList from './components/ExperienceList';
import BlogPostPage from './components/BlogPostPage';
import { PROJECTS, POSTS, EXPERIENCE, SOCIALS, BLOG_POSTS } from './constants';

const getSlugFromPath = () => {
  if (typeof window === 'undefined') return null;
  const match = window.location.pathname.match(/^\/blog\/([^/]+)/);
  return match ? match[1] : null;
};

const App: React.FC = () => {
  const [currentSlug, setCurrentSlug] = useState<string | null>(() => getSlugFromPath());

  useEffect(() => {
    const handlePopState = () => {
      setCurrentSlug(getSlugFromPath());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSelectPost = (slug: string) => {
    window.history.pushState({}, '', `/blog/${slug}`);
    setCurrentSlug(slug);
  };

  const handleBackHome = () => {
    window.history.pushState({}, '', `/`);
    setCurrentSlug(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const targetPath = currentSlug ? `/blog/${currentSlug}` : '/';

    if (window.location.pathname !== targetPath) {
      window.history.replaceState({}, '', targetPath);
    }

    window.scrollTo({ top: 0, behavior: currentSlug ? 'auto' : 'smooth' });
  }, [currentSlug]);

  const post = currentSlug
    ? BLOG_POSTS.find((p) => p.slug === currentSlug) || null
    : null;

  return (
    <div className="relative min-h-screen bg-background text-textMain">
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
            <main role="main" className="relative z-10 max-w-[1100px] mx-auto px-8 pb-32">
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

              <section id="writing" className="mb-8 border-t border-white/10 pt-12">
                <WritingList posts={POSTS} onSelectPost={handleSelectPost} />
              </section>

              <section id="contact" className="mb-12 border-t border-white/10 pt-12">
                  <h2 className="text-sm font-bold uppercase tracking-widest text-textMuted mb-6 pl-1">Connect</h2>
                  <div className="flex flex-wrap gap-4">
                    {SOCIALS.map((social) => {
                      const icons = { Twitter, Github, Mail };
                      const Icon = icons[social.icon as keyof typeof icons] || LinkIcon;
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
              
              <footer className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-white/10 text-xs text-textMuted/70">
                <p className="mt-2 sm:mt-0 text-textMain/80">Built with React & Tailwind</p>
              </footer>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;