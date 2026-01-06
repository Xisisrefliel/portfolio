import * as React from 'react';
import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { Post } from '../types';

interface WritingListProps {
  posts: Post[];
  onSelectPost?: (slug: string) => void;
}

const WritingList: React.FC<WritingListProps> = ({ posts, onSelectPost }) => {
  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    if (onSelectPost) {
      e.preventDefault();
      onSelectPost(slug);
    }
  }, [onSelectPost]);

  return (
    <div className="flex flex-col gap-1">
      {posts.map((post, i) => (
        <motion.a
          key={post.id}
          href={`/blog/${post.slug}`}
          onClick={(e) => handleClick(e, post.slug)}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="group flex flex-row items-center justify-between py-2.5 px-3 -mx-3 rounded-lg hover:bg-surfaceHighlight transition-colors cursor-pointer"
        >
          <h3 className="text-sm text-textMain font-medium group-hover:text-white transition-colors">
            {post.title}
          </h3>
          <div className="flex items-center gap-3">
             <span className="text-[10px] text-textMuted font-mono hidden sm:block border border-white/10 px-1.5 py-0.5 rounded">{post.readTime}</span>
             <span className="text-xs text-textMuted tabular-nums">{post.date}</span>
          </div>
        </motion.a>
      ))}
    </div>
  );
};

export default WritingList;
