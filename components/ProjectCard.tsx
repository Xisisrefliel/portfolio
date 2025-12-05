import * as React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group block relative p-6 rounded-2xl bg-surface hover:bg-surfaceHighlight border border-white/5 hover:border-white/10 transition-all duration-300"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-black/40 rounded-lg border border-white/5 text-textMain">
           {/* Abstract icon based on index to give variety */}
           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-80">
             {index % 3 === 0 && <circle cx="12" cy="12" r="10" />}
             {index % 3 === 1 && <rect x="3" y="3" width="18" height="18" rx="2" />}
             {index % 3 === 2 && <path d="M12 2L2 22h20L12 2z" />}
           </svg>
        </div>
        <span className="text-xs font-mono text-textMuted bg-white/5 px-2 py-1 rounded-md">{project.year}</span>
      </div>
      
      <h3 className="text-lg font-semibold text-textMain mb-2 group-hover:text-white transition-colors flex items-center gap-2">
        {project.title}
        <ArrowUpRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-textMuted" />
      </h3>
      
      <p className="text-sm text-textMuted mb-6 line-clamp-2 leading-relaxed">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mt-auto">
        {project.tags.map(tag => (
          <span key={tag} className="text-[10px] uppercase tracking-wider font-semibold text-textMuted bg-white/5 px-2 py-1 rounded border border-white/5">
            {tag}
          </span>
        ))}
      </div>
    </motion.a>
  );
};

export default ProjectCard;