import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight } from 'lucide-react';
import { useCookieConsent } from './CookieContext';
import GlassCard from './GlassCard';

interface CookieConsentProps {
  onNavigateToDatenschutz?: () => void;
}

const CookieConsent: React.FC<CookieConsentProps> = ({ onNavigateToDatenschutz }) => {
  const { hasConsented, acceptAll, rejectAll } = useCookieConsent();

  if (hasConsented) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-[420px] z-50"
      >
        <GlassCard className="!px-6 !py-6 !from-surface !via-surface !to-surface !bg-surface border border-transparent hover:border-white/[0.08] transition-all duration-300">
          <button
            onClick={rejectAll}
            className="absolute top-3 right-3 text-textMuted/60 hover:text-textMain transition-colors"
            aria-label="Close"
          >
            <X size={16} />
          </button>

          <div className="flex flex-col gap-1 mb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-textMuted/60">Datenschutz</span>
            <h3 className="text-lg font-medium text-textMain tracking-tight">
              Privatsphäre & Analytics
            </h3>
          </div>

          <p className="text-sm text-textMuted leading-relaxed mb-6">
            Ich verwende Vercel Analytics, um zu verstehen, wie diese Seite genutzt wird. 
            Alle Daten werden anonymisiert verarbeitet.
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateToDatenschutz}
              className="flex items-center gap-1.5 text-xs text-textMuted hover:text-textMain transition-colors group"
            >
              Mehr erfahren
              <ArrowUpRight 
                size={12} 
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </button>
            <div className="flex-1" />
            <button
              onClick={rejectAll}
              className="px-4 py-2 text-xs font-medium text-textMuted hover:text-textMain hover:bg-white/[0.05] rounded-full border border-transparent hover:border-white/[0.08] transition-all duration-300"
            >
              Ablehnen
            </button>
            <button
              onClick={acceptAll}
              className="px-4 py-2 text-xs font-medium bg-textMain text-background rounded-full hover:bg-white transition-colors shadow-[0_0_12px_rgba(255,255,255,0.2)] hover:shadow-[0_0_16px_rgba(255,255,255,0.3)] hdr:shadow-[0_0_15px_rgba(255,255,255,0.25)] hdr:hover:shadow-[0_0_20px_rgba(255,255,255,0.35)] transition-all duration-300"
            >
              Akzeptieren
            </button>
          </div>
        </GlassCard>
      </motion.div>
    </AnimatePresence>
  );
};

export default CookieConsent;
