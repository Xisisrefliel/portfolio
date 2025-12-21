import * as React from 'react';
import { motion } from 'framer-motion';
import { Post } from '../types';

interface WritingListProps {
  posts: Post[];
  onSelectPost?: (slug: string) => void;
}

const WritingList: React.FC<WritingListProps> = ({ posts, onSelectPost }) => {
  return (
    <div className="flex flex-col gap-2">
      {posts.map((post, i) => (
        <motion.a
          key={post.id}
          href={`/blog/${post.slug}`}
          onClick={(e) => {
            if (onSelectPost) {
              e.preventDefault();
              onSelectPost(post.slug);
            }
          }}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="group flex flex-col sm:flex-row sm:items-baseline justify-between py-4 px-4 -mx-4 rounded-xl hover:bg-surfaceHighlight transition-colors cursor-pointer"
        >
          <h3 className="text-base text-textMain font-medium group-hover:text-white transition-colors">
            {post.title}
          </h3>
          <div className="flex items-center gap-4 mt-1 sm:mt-0">
             <span className="text-xs text-textMuted font-mono hidden sm:block border border-white/10 px-1.5 py-0.5 rounded">{post.readTime}</span>
             <span className="text-sm text-textMuted tabular-nums">{post.date}</span>
          </div>
        </motion.a>
      ))}
    </div>
  );
};

export default WritingList;
