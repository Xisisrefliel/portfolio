import * as React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { BlogPostDetail } from '../types';

interface BlogPostPageProps {
  post?: BlogPostDetail | null;
  onBack?: () => void;
}

const BlogPostPage: React.FC<BlogPostPageProps> = ({ post, onBack }) => {
  const handleBackClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (onBack) {
      event.preventDefault();
      onBack();
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-background text-textMain">
        <div className="fixed top-0 left-0 w-full h-[520px] bg-gradient-to-b from-white/[0.04] via-white/[0.02] to-transparent pointer-events-none" />
        <main className="relative max-w-3xl mx-auto px-6 pt-16">
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
    <div className="min-h-screen bg-background text-textMain">
      <div className="fixed top-0 left-0 w-full h-[520px] bg-gradient-to-b from-white/[0.04] via-white/[0.02] to-transparent pointer-events-none" />
      <main className="relative max-w-3xl mx-auto px-6 pb-24 pt-14">
        <div className="flex items-center justify-between">
          <a
            href="/"
            onClick={handleBackClick}
            className="inline-flex items-center gap-2 text-sm text-textMuted hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
            Back
          </a>
          <span className="text-[11px] uppercase tracking-[0.22em] text-textMuted/70">
            Journal
          </span>
        </div>

        <div className="mt-10 space-y-3">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-textMuted">
            <span className="px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.04] text-[11px]">
              {post.date}
            </span>
            <span className="h-[1px] w-6 bg-white/10" />
            <span className="text-textMuted/80">{post.readTime} read</span>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="font-serif text-4xl sm:text-5xl leading-[1.1] text-textMain"
          >
            {post.title}
          </motion.h1>
          {post.dek && (
            <p className="text-lg text-textMuted/80 leading-relaxed max-w-2xl border-l border-white/10 pl-4 mt-8">
              {post.dek}
            </p>
          )}
        </div>

        <div className="mt-12 space-y-10 text-lg leading-[1.8] text-textMuted">
          {post.sections.map((section, idx) => (
            <div key={idx} className="space-y-3">
              {section.heading && (
                <h3 className="text-textMain text-lg font-semibold tracking-tight">
                  {section.heading}
                </h3>
              )}
              <p className="text-[15px] sm:text-[16px] leading-[1.85] text-textMuted">
                {section.body}
              </p>
            </div>
          ))}
        </div>

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
