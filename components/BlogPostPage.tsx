import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import { BlogPostDetail } from '../types';
import GlassCard from './GlassCard';

interface BlogPostPageProps {
  post?: BlogPostDetail | null;
  onBack?: () => void;
}

const CopyButton: React.FC<{ text: string }> = ({ text }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    const lines = text.split('\n');
    const processedLines = lines.map(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('**GET** | ')) {
        return trimmed.slice(10);
      }
      if (trimmed.startsWith('GET ')) {
        return trimmed.slice(4);
      }
      return line;
    });
    const textToCopy = processedLines.join('\n');
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute right-3 top-3 z-10 rounded-lg border border-white/10 bg-white/5 p-1.5 text-textMuted transition-all hover:bg-white/10 hover:text-textMain sm:opacity-0 sm:group-hover:opacity-100"
      title="Copy to clipboard"
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.div
            key="check"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
          >
            <Check size={14} className="text-emerald-400" />
          </motion.div>
        ) : (
          <motion.div
            key="copy"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
          >
            <Copy size={14} />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

const ClickableParam: React.FC<{ value: string }> = ({ value }) => {
  const [copied, setCopied] = React.useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <span
      onClick={handleClick}
      className={`relative inline-block cursor-pointer rounded transition-all duration-200 ${
        copied
          ? 'bg-emerald-400/20 text-emerald-400 ring-1 ring-emerald-400/30'
          : 'hover:bg-white/10 hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]'
      }`}
      title={`Click to copy: ${value}`}
    >
      {value}
      <AnimatePresence>
        {copied && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute -top-8 left-1/2 -translate-x-1/2 z-20 rounded bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-black whitespace-nowrap"
          >
            COPIED
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
};

const BlogPostPage: React.FC<BlogPostPageProps> = ({ post, onBack }) => {
  const renderCodeLine = (line: string, lineIdx: number) => {
    // Handle bold markdown at the start (e.g., **GET** |)
    const boldMatch = line.match(/^\*\*([^*]+)\*\*\s*\|\s*(.*)$/);
    if (boldMatch) {
      const [, boldText, restOfLine] = boldMatch;
      const components = [<strong key="bold" className="font-semibold text-textMain">{boldText}</strong>, <span key="pipe"> | </span>];
      
      // Process the rest of the line with the existing regex
      const regex = /([a-z0-9_]+)=([^&\s\n]+)|([:/])([A-Z_]{2,})(?=[/.:\s\n]|$)/g;
      let lastIndex = 0;
      let match;

      while ((match = regex.exec(restOfLine)) !== null) {
        if (match.index > lastIndex) {
          components.push(<span key={`text-${lastIndex}`}>{restOfLine.slice(lastIndex, match.index)}</span>);
        }

        if (match[1] && match[2]) {
          const key = match[1];
          const value = match[2];
          const isAction = key === 'action';
          
          components.push(
            <React.Fragment key={`kv-${match.index}`}>
              {isAction ? (
                <>
                  <span>{key}</span>
                  <span>=</span>
                  <ClickableParam value={value} />
                </>
              ) : (
                <>
                  <ClickableParam value={key} />
                  <span>=</span>
                  <span>{value}</span>
                </>
              )}
            </React.Fragment>
          );
        } else if (match[3] && match[4]) {
          const sep = match[3];
          const placeholder = match[4];
          components.push(
            <React.Fragment key={`ph-${match.index}`}>
              <span>{sep}</span>
              <ClickableParam value={placeholder} />
            </React.Fragment>
          );
        }

        lastIndex = regex.lastIndex;
      }

      if (lastIndex < restOfLine.length) {
        components.push(<span key={`text-${lastIndex}`}>{restOfLine.slice(lastIndex)}</span>);
      }

      return (
        <div key={lineIdx} className="min-h-[1.5em] text-textMain/80">
          {components}
        </div>
      );
    }

    // Original regex for:
    // 1. key=value (match[1]=key, match[2]=value)
    // 2. /PLACEHOLDER or :PLACEHOLDER (match[3]=separator, match[4]=placeholder)
    const regex = /([a-z0-9_]+)=([^&\s\n]+)|([:/])([A-Z_]{2,})(?=[/.:\s\n]|$)/g;
    const components = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        components.push(<span key={`text-${lastIndex}`}>{line.slice(lastIndex, match.index)}</span>);
      }

      if (match[1] && match[2]) {
        const key = match[1];
        const value = match[2];
        const isAction = key === 'action';
        
        components.push(
          <React.Fragment key={`kv-${match.index}`}>
            {isAction ? (
              <>
                <span>{key}</span>
                <span>=</span>
                <ClickableParam value={value} />
              </>
            ) : (
              <>
                <ClickableParam value={key} />
                <span>=</span>
                <span>{value}</span>
              </>
            )}
          </React.Fragment>
        );
      } else if (match[3] && match[4]) {
        const sep = match[3];
        const placeholder = match[4];
        components.push(
          <React.Fragment key={`ph-${match.index}`}>
            <span>{sep}</span>
            <ClickableParam value={placeholder} />
          </React.Fragment>
        );
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < line.length) {
      components.push(<span key={`text-${lastIndex}`}>{line.slice(lastIndex)}</span>);
    }

    return (
      <div key={lineIdx} className="min-h-[1.5em] text-textMain/80">
        {components.length > 0 ? components : line}
      </div>
    );
  };

  const renderBody = (body: string) => {
    // Split by code blocks first
    const parts = body.split(/(```[\s\S]*?```)/);
    
    return parts.map((part, idx) => {
      const trimmedPart = part.trim();
      if (!trimmedPart) return null;

      // Code blocks
      if (trimmedPart.startsWith('```')) {
        const lines = trimmedPart.split('\n');
        // Remove the ```lang and the final ```
        const content = lines.slice(1, -1).join('\n');
        return (
          <div key={idx} className="group relative my-6">
            <pre className="overflow-x-auto whitespace-pre-wrap break-all rounded-xl bg-white/[0.03] p-4 pr-12 text-sm font-mono ring-1 ring-white/10">
              <code className="text-textMain/90">
                {content.split('\n').map((line, lIdx) => renderCodeLine(line, lIdx))}
              </code>
            </pre>
            <CopyButton text={content} />
          </div>
        );
      }

      // Split remaining part by double newlines for paragraphs and tables
      const subBlocks = trimmedPart.split(/\n\n+/);
      
      return subBlocks.map((block, bIdx) => {
        const trimmedBlock = block.trim();
        if (!trimmedBlock) return null;

        // Tables
        if (trimmedBlock.startsWith('|')) {
          const rows = trimmedBlock.split('\n').filter(row => row.trim() && !row.includes('|---'));
          return (
            <div key={`${idx}-${bIdx}`} className="my-6 overflow-x-auto rounded-xl border border-white/10 bg-white/[0.01]">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-white/10 bg-white/[0.03] text-textMain">
                  <tr>
                    {rows[0].split('|').filter(cell => cell.trim()).map((cell, cIdx) => (
                      <th key={cIdx} className="px-4 py-3 font-semibold">{cell.trim()}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-textMuted">
                  {rows.slice(1).map((row, rIdx) => (
                    <tr key={rIdx}>
                      {row.split('|').filter(cell => cell.trim()).map((cell, cIdx) => (
                        <td key={cIdx} className="px-4 py-3">{cell.trim()}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        // Normal paragraphs with inline code/bold
        return (
          <p key={`${idx}-${bIdx}`} className="text-[15px] sm:text-[16px] leading-[1.85] text-textMuted mb-6 last:mb-0">
            {trimmedBlock.split('\n').map((line, lineIdx) => {
              const parts = line.split(/(\*\*.*?\*\*|`.*?`)/);
              return (
                <React.Fragment key={lineIdx}>
                  {parts.map((part, pIdx) => {
                    if (part.startsWith('**') && part.endsWith('**')) {
                      return <strong key={pIdx} className="font-semibold text-textMain">{part.slice(2, -2)}</strong>;
                    }
                    if (part.startsWith('`') && part.endsWith('`')) {
                      return <code key={pIdx} className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-sm text-textMain">{part.slice(1, -1)}</code>;
                    }
                    return part;
                  })}
                  {lineIdx < trimmedBlock.split('\n').length - 1 && <br />}
                </React.Fragment>
              );
            })}
          </p>
        );
      });
    });
  };

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
                        <div className="min-w-0 flex-1 space-y-2">
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
