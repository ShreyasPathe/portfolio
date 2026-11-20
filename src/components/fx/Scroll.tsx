import { useRef, type ReactNode } from 'react';
import {
  motion, useScroll, useTransform, useSpring, useVelocity, useMotionValue, useAnimationFrame, wrap,
} from 'framer-motion';

/** Section header whose label slides in and title drifts sideways with scroll. */
export function ScrollHeader({ index, label, title, align = 'left' }: { index: string; label: string; title: ReactNode; align?: 'left' | 'right' }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const dir = align === 'left' ? 1 : -1;
  const x = useTransform(scrollYProgress, [0, 1], [`${-8 * dir}%`, `${8 * dir}%`]);
  const lineScale = useTransform(scrollYProgress, [0.1, 0.45], [0, 1]);
  const clip = useTransform(scrollYProgress, [0.05, 0.35], ['inset(0 100% 0 0)', 'inset(0 0% 0 0)']);
  return (
    <div ref={ref} className={`mb-14 md:mb-24 ${align === 'right' ? 'text-right' : ''}`}>
      <div className={`flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted ${align === 'right' ? 'justify-end' : ''}`}>
        <span className="text-accent">{index}</span>
        <motion.span style={{ scaleX: lineScale }} className="h-px w-16 origin-left bg-accent" />
        <span>{label}</span>
      </div>
      <motion.h2 style={{ x, clipPath: clip }}
        className="mt-5 whitespace-nowrap text-[clamp(3.5rem,11vw,10rem)] font-semibold tracking-[-0.05em] leading-[0.9] text-fg">
        {title}
      </motion.h2>
    </div>
  );
}

/** Marquee whose speed and direction follow scroll velocity (reactbits ScrollVelocity-style). */
export function VelocityMarquee({ items, base = 2, className = '' }: { items: string[]; base?: number; className?: string }) {
  const x = useMotionValue(0);
  const { scrollY } = useScroll();
  const vel = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(vel, [0, 1000], [0, 5], { clamp: false });
  const dirRef = useRef(1);
  const xp = useTransform(x, v => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    let move = dirRef.current * base * (delta / 1000);
    const f = factor.get();
    if (f < 0) dirRef.current = -1; else if (f > 0) dirRef.current = 1;
    move += dirRef.current * move * Math.abs(f);
    x.set(x.get() + move);
  });

  const row = [...items, ...items];
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div style={{ x: xp }} className={`flex w-max ${className}`}>
        {row.map((s, i) => (
          <span key={i} className="flex items-center">
            <span className="px-6">{s}</span>
            <span className="text-accent">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
