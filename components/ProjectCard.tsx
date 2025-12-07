import * as React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Film, Code2, Layers, Sparkles } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const accents = [
  { color: '#ff6b6b', gradient: 'from-rose-500/20 via-orange-500/10' },
  { color: '#4ecdc4', gradient: 'from-teal-500/20 via-cyan-500/10' },
  { color: '#a78bfa', gradient: 'from-violet-500/20 via-purple-500/10' },
  { color: '#fbbf24', gradient: 'from-amber-500/20 via-yellow-500/10' },
];

const icons = [Film, Code2, Layers, Sparkles];

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const accent = accents[index % accents.length];
  const Icon = icons[index % icons.length];
  
  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group block relative overflow-hidden"
    >
      <div className="relative p-6 rounded-2xl overflow-hidden bg-gradient-to-br from-white/[0.04] to-transparent border border-white/[0.06] backdrop-blur-sm transition-all duration-500 group-hover:border-white/[0.12] group-hover:from-white/[0.06]">
        
        <div 
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: `radial-gradient(ellipse at 0% 0%, ${accent.color}12, transparent 50%)`,
          }}
        />
        
        <div 
          className="absolute -top-24 -right-24 w-48 h-48 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl"
          style={{ background: accent.color, opacity: 0.06 }}
        />

        <div className="relative z-10">
          <div className="flex justify-between items-start mb-5">
            <div 
              className="flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 group-hover:scale-110"
              style={{
                background: `linear-gradient(135deg, ${accent.color}25, ${accent.color}08)`,
                boxShadow: `0 0 24px ${accent.color}20`,
              }}
            >
              <Icon size={18} style={{ color: accent.color }} className="opacity-90" />
            </div>
            <span className="text-[11px] font-mono text-textMuted/70 tracking-wider">{project.year}</span>
          </div>
          
          <h3 className="text-xl font-semibold text-textMain mb-2 tracking-tight group-hover:text-white transition-colors duration-300 flex items-center gap-2">
            {project.title}
            <ArrowUpRight 
              size={16} 
              className="opacity-0 -translate-x-1 -translate-y-1 group-hover:opacity-70 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" 
              style={{ color: accent.color }}
            />
          </h3>
          
          <p className="text-sm text-textMuted/80 mb-6 leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <span 
                key={tag} 
                className="text-[10px] uppercase tracking-widest font-medium px-2.5 py-1 rounded-full border transition-all duration-300 group-hover:border-white/[0.12]"
                style={{
                  color: `${accent.color}cc`,
                  borderColor: `${accent.color}20`,
                  background: `${accent.color}08`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div 
          className="absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-50 transition-opacity duration-500"
          style={{
            background: `linear-gradient(90deg, transparent, ${accent.color}, transparent)`,
          }}
        />
      </div>
    </motion.a>
  );
};

export default ProjectCard;