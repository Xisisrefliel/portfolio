import * as React from 'react';
import { useEffect, useState } from 'react';
import Hero from './components/Hero';
import ProjectCard from './components/ProjectCard';
import WritingList from './components/WritingList';
import ExperienceList from './components/ExperienceList';
import Navbar from './components/Navbar';
import { PROJECTS, POSTS, EXPERIENCE, SOCIALS } from './constants';
import * as LucideIcons from 'lucide-react';

const App: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen font-sans selection:bg-white/20 selection:text-white">
      
      {/* Dynamic Background Gradient */}
      <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

      <main className="max-w-2xl mx-auto px-6 pb-32 relative z-10">
        
        {/* Header / Top Nav area could go here, but we use bottom nav for 'ymo' feel */}
        <div className="h-4"></div>

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
          <WritingList posts={POSTS} />
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
      
    </div>
  );
};

export default App;