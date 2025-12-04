import * as React from 'react';
import { useEffect, useState } from 'react';
import { Home, PenTool, Mail, Command } from 'lucide-react';

const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const sectionsRef = React.useRef<HTMLElement[]>([]);
  const viewportHeightRef = React.useRef<number>(typeof window !== 'undefined' ? window.innerHeight : 0);

  useEffect(() => {
    const refreshSections = () => {
      sectionsRef.current = ['home', 'cmd', 'writing', 'contact']
        .map((id) => document.getElementById(id) as HTMLElement | null)
        .filter((el): el is HTMLElement => Boolean(el));
      viewportHeightRef.current = window.innerHeight;
    };

    let ticking = false;
    const updateActiveSection = () => {
      ticking = false;

      const scrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const viewportHeight = viewportHeightRef.current;

      // Prefer a passive, rAF-throttled read to avoid Safari stutter
      if (scrollY + viewportHeight >= scrollHeight - 40) {
        setActiveSection((prev) => (prev === 'contact' ? prev : 'contact'));
        return;
      }

      if (scrollY < 80) {
        setActiveSection((prev) => (prev === 'home' ? prev : 'home'));
        return;
      }

      const probe = scrollY + viewportHeight * 0.45; // slightly biased upward feels smoother
      let nextActive = 'home';

      for (const sectionEl of sectionsRef.current) {
        const { top, height } = sectionEl.getBoundingClientRect();
        const absoluteTop = top + scrollY;
        if (probe >= absoluteTop && probe < absoluteTop + height) {
          nextActive = sectionEl.id;
          break;
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
      const offset = 80; // Offset for navbar
      const elementPosition = element.getBoundingClientRect().top;
      let offsetPosition = elementPosition + window.pageYOffset - offset;

      // For Writing section, leave scroll room so Contact can be activated
      if (sectionId === 'writing') {
        const scrollRoom = 250; // Leave 250px of scroll room below
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        offsetPosition = Math.min(offsetPosition, maxScroll - scrollRoom);
      }

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
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
        <div className="w-px h-6 bg-white/10 mx-1"></div>
        <NavItem 
          icon={<Mail size={18} />} 
          label="Contact" 
          active={activeSection === 'contact'}
          onClick={() => scrollToSection('contact')}
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
      ${active ? 'bg-white text-black' : 'text-textMuted hover:text-textMain hover:bg-white/10'}
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