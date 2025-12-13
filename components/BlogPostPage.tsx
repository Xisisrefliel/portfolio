import * as React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { BlogPostDetail } from '../types';
import GlassCard from './GlassCard';

interface BlogPostPageProps {
  post?: BlogPostDetail | null;
  onBack?: () => void;
}

const BlogPostPage: React.FC<BlogPostPageProps> = ({ post, onBack }) => {
  const renderBody = (body: string) =>
    body.split(/\n\n+/).map((paragraph, idx) => {
      const lines = paragraph.split('\n');
      return (
        <p key={idx} className="text-[15px] sm:text-[16px] leading-[1.85] text-textMuted">
          {lines.map((line, lineIdx) => (
            <React.Fragment key={lineIdx}>
              {line}
              {lineIdx < lines.length - 1 && <br />}
            </React.Fragment>
          ))}
        </p>
      );
    });

  const handleBackClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (onBack) {
      event.preventDefault();
      onBack();
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen text-textMain">
        <main role="main" className="relative mx-auto px-6 pt-16 max-w-[880px] lg:max-w-[940px]">
          <a
            href="/"
            onClick={handleBackClick}
            className="inline-flex items-center gap-2 text-sm text-textMuted hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
            Back home
          </a>
          <div className="mt-10 rounded-2xl border border-white/5 bg-white/[0.02] px-6 py-8">
            <p className="text-lg font-medium text-textMain">Post not found</p>
            <p className="text-sm text-textMuted mt-2">
              The article you are looking for does not exist. Please head back to the main page.
            </p>
          </div>
        </main>
      </div>
    );
  }

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
            Back
          </a>
          <span className="text-[11px] uppercase tracking-[0.22em] text-textMain/80">
            Journal
          </span>
        </div>

        <GlassCard className="mt-10">
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-textMuted">
              <span className="px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.06] text-[11px] text-textMain">
                {post.date}
              </span>
              <span className="h-[1px] w-6 bg-white/10" />
              <span className="text-textMain/85">{post.readTime} read</span>
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="font-serif text-4xl sm:text-5xl leading-[1.08] text-textMain"
            >
              {post.title}
            </motion.h1>
            {post.dek && (
              <p className="text-base sm:text-lg text-textMuted/85 leading-relaxed max-w-2xl border-l border-white/10 pl-4">
                {post.dek}
              </p>
            )}
          </div>
        </GlassCard>

        <article className="mt-12 space-y-10 text-[16px] leading-[1.85] text-textMuted">
          {post.sections.map((section, idx) => (
            <div key={idx} className="space-y-3">
              {(() => {
                const modelMatch = section.heading?.match(/^(\d)\.\s*(.*)$/);
                if (modelMatch) {
                  return (
                    <div className="relative overflow-hidden rounded-2xl bg-white/[0.02] px-5 py-4 sm:px-6 sm:py-5 ring-1 ring-white/5 shadow-[0_18px_60px_-70px_rgba(0,0,0,0.9)]">
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/[0.03] via-transparent to-white/[0.02] opacity-60" />
                      <div className="relative flex items-start gap-4">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.08] text-sm font-semibold text-textMain">
                          {modelMatch[1]}
                        </span>
                        <div className="space-y-2">
                          <h3 className="text-textMain text-lg font-semibold tracking-tight">
                            {modelMatch[2]}
                          </h3>
                          <div className="space-y-2">{renderBody(section.body)}</div>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <>
                    {section.heading && (
                      <h3 className="text-textMain text-xl font-semibold tracking-tight">
                        {section.heading}
                      </h3>
                    )}
                    <div className="space-y-3">{renderBody(section.body)}</div>
                  </>
                );
              })()}
            </div>
          ))}
        </article>

        {post.outro && (
          <div className="mt-14 border-t border-white/5 pt-8 text-sm text-textMuted/80">
            <p className="italic">{post.outro}</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default BlogPostPage;
