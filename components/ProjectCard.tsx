import * as React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../types';
import GlassCard from './GlassCard';

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
      transition={{ delay: index * 0.05, duration: 0.4, ease: "easeOut" }}
      className="group block h-full"
    >
      <GlassCard className="h-full flex flex-col transition-all duration-300 group-hover:bg-white/[0.07] group-hover:border-white/[0.1] border border-transparent">
        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-medium text-textMain tracking-tight group-hover:text-white transition-colors">
              {project.title}
            </h3>
            <span className="text-xs font-mono text-textMuted/60">{project.year}</span>
          </div>
          <ArrowUpRight 
            size={18} 
            className="text-textMuted opacity-0 -translate-y-1 translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 group-hover:text-textMain"
          />
        </div>

        <p className="text-sm text-textMuted leading-relaxed mb-6 flex-grow">
          {project.description}
        </p>

        {project.notHostedMessage && (
          <div className="mb-4 p-2 bg-yellow-500/10 border border-yellow-500/20 rounded text-xs text-yellow-500/80">
            {project.notHostedMessage}
          </div>
        )}

        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.map(tag => (
            <span 
              key={tag} 
              className="
                text-[10px] uppercase tracking-wider font-medium 
                px-2 py-1 rounded-md
                bg-white/[0.02] border border-white/[0.06]
                text-textMuted/80
                transition-colors
                group-hover:border-white/[0.12] group-hover:text-textMuted
              "
            >
              {tag}
            </span>
          ))}
        </div>
      </GlassCard>
    </motion.a>
  );
};

export default ProjectCard;
