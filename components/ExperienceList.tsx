import * as React from 'react';
import { motion } from 'framer-motion';
import { Experience } from '../types';

interface ExperienceListProps {
  experiences: Experience[];
}

const ExperienceList: React.FC<ExperienceListProps> = ({ experiences }) => {
  return (
    <div className="relative border-l border-white/10 ml-2.5 space-y-6">
      {experiences.map((exp, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="relative pl-6"
        >
          <div className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-surface border border-white/20 group-hover:border-white/50 transition-colors"></div>
          
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
            <h3 className="text-sm font-semibold text-textMain">{exp.company}</h3>
            <span className="text-[10px] mt-1 text-textMuted font-mono bg-white/5 px-1.5 py-0.5 rounded border border-white/5 w-fit">{exp.period}</span>
          </div>
          <p className="text-xs text-white/70 mb-1 font-medium">{exp.role}</p>
          <p className="text-xs text-textMuted leading-relaxed max-w-xl">
            {exp.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default ExperienceList;
