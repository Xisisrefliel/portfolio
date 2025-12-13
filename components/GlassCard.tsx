import * as React from 'react';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className, ...props }) => {
  return (
    <div 
      className={`
        relative overflow-hidden rounded-3xl 
        bg-gradient-to-br from-white/[0.05] via-white/[0.03] to-transparent 
        px-6 py-8 
        shadow-[0_26px_90px_-70px_rgba(0,0,0,0.85)]
        ${className || ''}
      `}
      {...props}
    >
      <div className="pointer-events-none absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_34%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.06),transparent_30%)]" />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GlassCard;
