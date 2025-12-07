import * as React from 'react';
import { useEffect, useState } from 'react';
import { Home, PenTool, Command } from 'lucide-react';

const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const sectionsRef = React.useRef<HTMLElement[]>([]);
  const viewportHeightRef = React.useRef<number>(typeof window !== 'undefined' ? window.innerHeight : 0);
  const suppressScrollHighlightRef = React.useRef(false);

  useEffect(() => {
    const refreshSections = () => {
      sectionsRef.current = ['home', 'cmd', 'writing']
        .map((id) => document.getElementById(id) as HTMLElement | null)
        .filter((el): el is HTMLElement => Boolean(el));
      viewportHeightRef.current = window.innerHeight;
    };

    let ticking = false;
    const updateActiveSection = () => {
      ticking = false;

      if (suppressScrollHighlightRef.current) return;

      const scrollY = window.scrollY;
      const viewportHeight = viewportHeightRef.current;
      const viewportCenter = scrollY + viewportHeight / 2;

      // Prefer a passive, rAF-throttled read to avoid Safari stutter
      if (scrollY < 80) {
        setActiveSection((prev) => (prev === 'home' ? prev : 'home'));
        return;
      }

      if (sectionsRef.current.length === 0) return;

      let nextActive = sectionsRef.current[0].id;
      let closestDistance = Number.POSITIVE_INFINITY;

      for (const sectionEl of sectionsRef.current) {
        const { top, height } = sectionEl.getBoundingClientRect();
        const absoluteTop = top + scrollY;
        const absoluteBottom = absoluteTop + height;
        const withinSection = viewportCenter >= absoluteTop && viewportCenter <= absoluteBottom;

        if (withinSection) {
          nextActive = sectionEl.id;
          closestDistance = 0;
          break;
        }

        const distance = Math.min(Math.abs(viewportCenter - absoluteTop), Math.abs(viewportCenter - absoluteBottom));
        if (distance < closestDistance) {
          closestDistance = distance;
          nextActive = sectionEl.id;
        }
      }

      setActiveSection((prev) => (prev === nextActive ? prev : nextActive));
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateActiveSection);
      }
    };

    const onResize = () => {
      refreshSections();
      updateActiveSection();
    };

    refreshSections();
    updateActiveSection();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      suppressScrollHighlightRef.current = true;
      setActiveSection(sectionId);

      const { top, height } = element.getBoundingClientRect();
      const target = top + window.pageYOffset + height / 2 - window.innerHeight / 2;
      window.scrollTo({ top: Math.max(target, 0), behavior: 'smooth' });

      window.setTimeout(() => {
        suppressScrollHighlightRef.current = false;
      }, 650);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
      <nav className="flex items-center gap-1 p-1.5 rounded-full border border-white/10 bg-[#111111]/80 backdrop-blur-md shadow-2xl shadow-black/50">
        <NavItem 
          icon={<Home size={18} />} 
          label="Home" 
          active={activeSection === 'home'}
          onClick={scrollToTop}
        />
        <NavItem 
          icon={<Command size={18} />} 
          label="Cmd" 
          active={activeSection === 'cmd'}
          onClick={() => scrollToSection('cmd')}
        />
        <NavItem 
          icon={<PenTool size={18} />} 
          label="Writing" 
          active={activeSection === 'writing'}
          onClick={() => scrollToSection('writing')}
        />
      </nav>
    </div>
  );
};

const NavItem: React.FC<{ 
  icon: React.ReactNode; 
  label: string; 
  active?: boolean;
  onClick: () => void;
}> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`
      relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 group
      ${active 
        ? 'bg-white text-black shadow-[0_0_12px_rgba(255,255,255,0.4)]' 
        : 'text-textMuted hover:text-textMain hover:bg-white/5'}
    `}
    aria-label={label}
  >
    {icon}
    {/* Tooltip */}
    <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-surfaceHighlight border border-white/10 rounded text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
      {label}
    </span>
  </button>
);

export default Navbar;