import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useCookieConsent } from './CookieContext';

const CookieConsent: React.FC = () => {
  const { hasConsented, acceptAll, rejectAll } = useCookieConsent();

  if (hasConsented) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 32 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-[400px] z-50"
      >
        <div className="bg-surface border border-white/10 rounded-lg p-5 shadow-2xl">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-sm font-semibold text-textMain">Datenschutz</h3>
            <button
              onClick={rejectAll}
              className="text-textMuted hover:text-textMain transition-colors"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>
          
          <p className="text-xs text-textMuted mb-4 leading-relaxed">
            Ich verwende Vercel Analytics, um zu verstehen, wie diese Seite genutzt wird. 
            Weitere Infos findest du auf der{' '}
            <a href="/datenschutz" className="text-textMain underline hover:no-underline underline-offset-2">
              Datenschutz-Seite
            </a>.
          </p>

          <div className="flex gap-3">
            <button
              onClick={acceptAll}
              className="flex-1 bg-textMain text-background px-4 py-2 rounded-md text-xs font-medium hover:bg-white transition-colors"
            >
              Akzeptieren
            </button>
            <button
              onClick={rejectAll}
              className="flex-1 px-4 py-2 rounded-md text-xs font-medium text-textMuted hover:text-textMain hover:bg-white/5 transition-colors border border-transparent hover:border-white/5"
            >
              Ablehnen
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CookieConsent;
