import * as React from 'react';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Github, Twitter, Mail, Link as LinkIcon, ArrowUpRight } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
import Hero from './components/Hero';
import ProjectCard from './components/ProjectCard';
import WritingList from './components/WritingList';
import ExperienceList from './components/ExperienceList';
import BlogPostPage from './components/BlogPostPage';
import Datenschutz from './components/Datenschutz';
import CookieConsent from './components/CookieConsent';
import { CookieProvider, useCookieConsent } from './components/CookieContext';
import { PROJECTS, POSTS, EXPERIENCE, SOCIALS, BLOG_POSTS } from './constants';

const getSlugFromPath = () => {
  if (typeof window === 'undefined') return null;

  if (window.location.pathname === '/datenschutz') {
    return 'datenschutz';
  }

  const match = window.location.pathname.match(/^\/blog\/([^/]+)/);
  return match ? match[1] : null;
};

const icons = { Twitter, Github, Mail };

const AppContent: React.FC = () => {
  const [currentSlug, setCurrentSlug] = useState<string | null>(() => getSlugFromPath());

  useEffect(() => {
    const handlePopState = () => {
      setCurrentSlug(getSlugFromPath());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigateTo = useCallback((path: string) => {
    if (path === '/') {
      window.history.pushState({}, '', '/');
      setCurrentSlug(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.history.pushState({}, '', path);
      setCurrentSlug(path === '/datenschutz' ? 'datenschutz' : path.replace('/blog/', ''));
    }
  }, []);

  const handleSelectPost = useCallback((slug: string) => {
    handleNavigateTo(`/blog/${slug}`);
  }, [handleNavigateTo]);

  const handleBackHome = useCallback(() => {
    handleNavigateTo('/');
  }, [handleNavigateTo]);

  const handleNavigateDatenschutz = useCallback(() => {
    handleNavigateTo('/datenschutz');
  }, [handleNavigateTo]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const targetPath = currentSlug === 'datenschutz' ? '/datenschutz' : currentSlug ? `/blog/${currentSlug}` : '/';

    if (window.location.pathname !== targetPath) {
      window.history.replaceState({}, '', targetPath);
    }

    window.scrollTo({ top: 0, behavior: currentSlug ? 'auto' : 'smooth' });
  }, [currentSlug]);

  const post = useMemo(() => {
    return currentSlug && currentSlug !== 'datenschutz'
      ? BLOG_POSTS.find((p) => p.slug === currentSlug) || null
      : null;
  }, [currentSlug]);

  const { consent } = useCookieConsent();

  return (
    <>
      {consent.analytics && <Analytics />}
      
      <div className="relative min-h-screen bg-background text-textMain">
        <AnimatePresence mode="wait" initial={false}>
          {currentSlug === 'datenschutz' ? (
            <motion.div
              key="datenschutz"
              initial={{ opacity: 0, y: 32, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.985 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="min-h-screen"
            >
              <Datenschutz onBack={handleBackHome} />
            </motion.div>
          ) : currentSlug ? (
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
              <main role="main" className="relative z-10 max-w-[1100px] mx-auto px-6 pb-20">
                <section id="home" className="pt-12 mb-10">
                  <Hero />
                </section>

                <section id="projects" className="mb-8">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-textMuted mb-4 pl-0.5">Projects</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {PROJECTS.map((project, index) => (
                      <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                  </div>
                </section>

                <section id="experience" className="mb-8">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-textMuted mb-4 pl-0.5">Experience</h2>
                  <ExperienceList experiences={EXPERIENCE} />
                </section>

                <section id="writing" className="mb-8 border-t border-white/10 pt-6">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-textMuted mb-4 pl-0.5">Writing</h2>
                  <WritingList posts={POSTS} onSelectPost={handleSelectPost} />
                </section>

                <section id="contact" className="mb-6 border-t border-white/10 pt-6">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-textMuted mb-4 pl-0.5">Connect</h2>
                    <div className="flex flex-wrap gap-2">
                      {SOCIALS.map((social) => {
                        const Icon = icons[social.icon as keyof typeof icons] || LinkIcon;
                        return (
                          <a
                            key={social.name}
                            href={social.url}
                            className="flex items-center gap-2 text-xs text-textMuted hover:text-textMain transition-colors px-2.5 py-1.5 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/5"
                          >
                            <Icon size={14} />
                            {social.name}
                          </a>
                        );
                      })}
                    </div>
                </section>
                
                <footer className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-white/10 text-[10px] text-textMuted/70">
                  <p className="mt-1 sm:mt-0 text-textMain/80">Built with React & Tailwind</p>
                  <button
                    onClick={handleNavigateDatenschutz}
                    className="mt-1 sm:mt-0 flex items-center gap-1 text-textMuted/70 hover:text-textMain transition-colors"
                  >
                    Datenschutz
                    <ArrowUpRight size={10} />
                  </button>
                </footer>
              </main>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <CookieConsent onNavigateToDatenschutz={handleNavigateDatenschutz} />
    </>
  );
};

const App: React.FC = () => {
  return (
    <CookieProvider>
      <AppContent />
    </CookieProvider>
  );
};

export default App;
