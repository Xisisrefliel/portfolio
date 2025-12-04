import * as React from 'react';
import { motion } from 'framer-motion';
import { Experience } from '../types';

interface ExperienceListProps {
  experiences: Experience[];
}

const ExperienceList: React.FC<ExperienceListProps> = ({ experiences }) => {
  return (
    <section className="mb-20">
      <h2 className="text-sm font-bold uppercase tracking-widest text-textMuted mb-8 pl-1">Experience</h2>
      <div className="relative border-l border-white/10 ml-3 space-y-12">
        {experiences.map((exp, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative pl-8"
          >
            {/* Timeline dot */}
            <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-surface border border-white/20 group-hover:border-white/50 transition-colors"></div>
            
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
              <h3 className="text-base font-semibold text-textMain">{exp.company}</h3>
              <span className="text-xs text-textMuted font-mono bg-white/5 px-2 py-0.5 rounded border border-white/5">{exp.period}</span>
            </div>
            <p className="text-sm text-white/70 mb-2 font-medium">{exp.role}</p>
            <p className="text-sm text-textMuted leading-relaxed max-w-xl">
              {exp.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceList;