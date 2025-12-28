import * as React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Server, Activity } from 'lucide-react';
import GlassCard from './GlassCard';

const Datenschutz: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const handleBackClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onBack();
  };

  return (
    <div className="min-h-screen text-textMain">
      <main role="main" className="relative mx-auto px-6 pb-24 pt-14 max-w-[880px] lg:max-w-[940px]">
        <div className="flex items-center justify-between">
          <a
            href="/"
            onClick={handleBackClick}
            className="inline-flex items-center gap-2 text-sm text-textMuted hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
            Zurück
          </a>
          <span className="text-[11px] uppercase tracking-[0.22em] text-textMain/80">
            Datenschutz
          </span>
        </div>

        <GlassCard className="mt-10">
          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="font-serif text-4xl sm:text-5xl leading-[1.08] text-textMain"
            >
              Datenschutz
            </motion.h1>
            <p className="text-base sm:text-lg text-textMuted/85 leading-relaxed max-w-2xl border-l border-white/10 pl-4">
              Letzte Aktualisierung: Dezember 2025
            </p>
          </div>
        </GlassCard>

        <article className="mt-12 space-y-10 text-[16px] leading-[1.85] text-textMuted">
          <div className="space-y-3">
            <h3 className="text-textMain text-xl font-semibold tracking-tight">
              Hosting
            </h3>
            <p className="space-y-3">
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
          </div>

          <div className="space-y-3">
            <h3 className="text-textMain text-xl font-semibold tracking-tight">
              Analytics
            </h3>
            <p>
              Ich verwende Vercel Analytics, um die Nutzung dieser Website zu analysieren. 
              Folgende Daten werden erfasst:
            </p>
            <ul className="space-y-2 ml-6 list-disc">
              <li>Anonymisierte IP-Adressen</li>
              <li>Browser-Typ und -Version</li>
              <li>Betriebssystem</li>
              <li>Besuchte Seiten und Verweildauer</li>
              <li>Referrer-Quelle</li>
            </ul>
            <p>
              Alle Daten werden in einem anonymisierten Format gespeichert und können 
              nicht direkt einer Person zugeordnet werden. Es werden keine Cookies für 
              Analysezwecke verwendet.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-textMain text-xl font-semibold tracking-tight">
              Sicherheit & Technologie
            </h3>
            <p className="space-y-3">
              Um deine Privatsphäre bestmöglich zu schützen, verwendet diese Website folgende Maßnahmen:
            </p>
            <ul className="space-y-2 ml-6 list-disc">
              <li><strong>Selbstgehostete Schriftarten:</strong> Alle Fonts werden lokal bereitgestellt, nicht über externe Dienste wie Google Fonts.</li>
              <li><strong>Keine externen Tracking-Skripte:</strong> Es werden keine Drittanbieter-Tracking-Tools außer Vercel Analytics verwendet.</li>
              <li><strong>Content-Hashed Dateinamen:</strong> JavaScript-Dateinamen werden automatisch bei jedem Build geändert und enthalten Content-Hashes.</li>
              <li><strong>Statische Website:</strong> Keine serverseitige Datenbanken oder Benutzerauthentifizierung.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-textMain text-xl font-semibold tracking-tight">
              Deine Rechte
            </h3>
            <p>
              Du hast jederzeit das Recht:
            </p>
            <ul className="space-y-2 ml-6 list-disc">
              <li>Informationen über deine gespeicherten Daten zu erhalten</li>
              <li>Unrichtige Daten berichtigen zu lassen</li>
              <li>Löschung deiner Daten zu verlangen</li>
              <li>Der Datenverarbeitung zu widersprechen</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-textMain text-xl font-semibold tracking-tight">
              Kontakt
            </h3>
            <p>
              Bei Fragen zum Datenschutz kannst du mich per{' '}
              <a
                href="mailto:feherlofia@icloud.com"
                className="text-textMain underline hover:no-underline underline-offset-2"
              >
                E-Mail
              </a>{' '}
              kontaktieren.
            </p>
          </div>
        </article>
      </main>
    </div>
  );
};

export default Datenschutz;
