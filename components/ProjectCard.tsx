import * as React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
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
        <div className="flex justify-between items-start mb-2">
          <div className="flex flex-col gap-0.5">
            <h3 className="text-base font-medium text-textMain tracking-tight group-hover:text-white transition-colors">
              {project.title}
            </h3>
            <span className="text-[10px] font-mono text-textMuted/60">{project.year}</span>
          </div>
          <ArrowUpRight
            size={16}
            className="text-textMuted opacity-0 -translate-y-1 translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 group-hover:text-textMain"
          />
        </div>

        <p className="text-xs text-textMuted leading-relaxed mb-3 flex-grow">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.tags.map(tag => (
            <span
              key={tag}
              className="
                text-[9px] uppercase tracking-wider font-medium 
                px-1.5 py-0.5 rounded
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

        {project.notHostedMessage && (
          <div className="absolute inset-0 -m-4 bg-black/60 backdrop-blur-md rounded-[inherit] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex items-center justify-center z-20">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-textMuted tracking-widest uppercase">Not Hosted, See Repo on GitHub</span>
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="relative">
                <Github size={32} className="text-textMuted" />
                <ArrowUpRight
                  size={16}
                  className="absolute -top-3 -right-3 text-textMuted"
                />
              </a>
            </div>
          </div>
        )}
      </GlassCard>
    </motion.a>
  );
};

export default ProjectCard;
