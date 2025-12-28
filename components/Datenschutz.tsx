import * as React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Server, Activity } from 'lucide-react';

const Datenschutz: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -16, scale: 0.985 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen"
    >
      <main role="main" className="relative z-10 max-w-[1100px] mx-auto px-8 pb-32">
        <div className="pt-20 mb-12">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-textMuted hover:text-textMain transition-colors mb-8 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            Zurück
          </button>

          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-textMain mb-6">
              Datenschutz
            </h1>
            <p className="text-lg text-textMuted mb-12 leading-relaxed">
              Letzte Aktualisierung: Dezember 2025
            </p>

            <div className="space-y-8">
              <section className="bg-surface border border-white/5 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Server size={20} className="text-textMain" />
                  <h2 className="text-xl font-semibold text-textMain">Hosting</h2>
                </div>
                <p className="text-sm text-textMuted leading-relaxed">
                  Diese Website wird von Vercel Inc. gehostet. Vercel ist ein Anbieter aus den USA, 
                  der sich zur Einhaltung des EU-US Privacy Framework verpflichtet hat. 
                  Weitere Informationen findest du in der{' '}
                  <a 
                    href="https://vercel.com/legal/privacy-policy" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-textMain underline hover:no-underline underline-offset-2"
                  >
                    Vercel-Datenschutzerklärung
                  </a>.
                </p>
              </section>

              <section className="bg-surface border border-white/5 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Activity size={20} className="text-textMain" />
                  <h2 className="text-xl font-semibold text-textMain">Analytics</h2>
                </div>
                <p className="text-sm text-textMuted leading-relaxed mb-4">
                  Ich verwende Vercel Analytics, um die Nutzung dieser Website zu analysieren. 
                  Folgende Daten werden erfasst:
                </p>
                <ul className="text-sm text-textMuted leading-relaxed space-y-2 mb-4 ml-4 list-disc">
                  <li>Anonymisierte IP-Adressen</li>
                  <li>Browser-Typ und -Version</li>
                  <li>Betriebssystem</li>
                  <li>Besuchte Seiten und Verweildauer</li>
                  <li>Referrer-Quelle</li>
                </ul>
                <p className="text-sm text-textMuted leading-relaxed">
                  Alle Daten werden in einem anonymisierten Format gespeichert und können 
                  nicht direkt einer Person zugeordnet werden. Es werden keine Cookies für 
                  Analysezwecke verwendet.
                </p>
              </section>

              <section className="bg-surface border border-white/5 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield size={20} className="text-textMain" />
                  <h2 className="text-xl font-semibold text-textMain">Deine Rechte</h2>
                </div>
                <p className="text-sm text-textMuted leading-relaxed mb-4">
                  Du hast jederzeit das Recht:
                </p>
                <ul className="text-sm text-textMuted leading-relaxed space-y-2 ml-4 list-disc">
                  <li>Informationen über deine gespeicherten Daten zu erhalten</li>
                  <li>Unrichtige Daten berichtigen zu lassen</li>
                  <li>Löschung deiner Daten zu verlangen</li>
                  <li>Der Datenverarbeitung zu widersprechen</li>
                </ul>
              </section>

              <section className="bg-surface border border-white/5 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-textMain mb-4">Kontakt</h2>
                <p className="text-sm text-textMuted leading-relaxed">
                  Bei Fragen zum Datenschutz kannst du mich per{' '}
                  <a 
                    href="mailto:feherlofia@icloud.com" 
                    className="text-textMain underline hover:no-underline underline-offset-2"
                  >
                    E-Mail
                  </a>{' '}
                  kontaktieren.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
    </motion.div>
  );
};

export default Datenschutz;
