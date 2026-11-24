import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EASE } from '../lib/motion';

/** One-time rise and fade when the element enters the viewport. Not tied to scroll position. */
export function Reveal({ children, delay = 0, className = '', as = 'div' }: {
  children: ReactNode; delay?: number; className?: string; as?: 'div' | 'li' | 'section';
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

/** Section label used above every section heading. */
export function Eyebrow({ index, children }: { index: string; children: ReactNode }) {
  return (
    <div className="caption flex items-center gap-3">
      <span className="text-aqua">{index}</span>
      <span>{children}</span>
    </div>
  );
}
