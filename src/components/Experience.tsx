import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { EXPERIENCE_DATA } from '../constants';
import type { ExperienceItem } from '../types';
import { ScrollHeader } from './fx/Scroll';

function Card({ exp, i, n, progress, pinned }: { exp: ExperienceItem; i: number; n: number; progress: MotionValue<number>; pinned: boolean }) {
  const scale = useTransform(progress, [i / n, 1], [1, 1 - (n - 1 - i) * 0.05]);
  const dim = useTransform(progress, [i / n, Math.min((i + 1) / n, 1)], [0, i === n - 1 ? 0 : 0.55]);
  return (
    <div className="mb-6 md:mb-0 md:sticky md:top-0 md:h-screen flex items-start md:pt-[var(--pt)]"
      style={{ ['--pt' as string]: `calc(6.5rem + ${i * 28}px)` }}>
      <motion.article style={pinned ? { scale } : undefined} className="relative w-full origin-top overflow-hidden rounded-3xl border border-line bg-panel">
        <motion.div style={{ opacity: pinned ? dim : 0 }} className="pointer-events-none absolute inset-0 z-10 bg-ink" />
        <div className="grid md:grid-cols-12">
          <div className="md:col-span-4 border-b md:border-b-0 md:border-r border-line p-6 md:p-10 flex flex-col">
            <span className="font-mono text-[11px] text-white/30">{String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</span>
            <div className="mt-6 flex items-center gap-3">
              {exp.image && <img src={exp.image} alt={exp.company} className="h-12 w-12 rounded-xl object-cover ring-1 ring-line" />}
              <span className="text-2xl font-semibold tracking-tight text-fg">{exp.company}</span>
            </div>
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.15em] text-accent">{exp.period}</p>
            {exp.location && <p className="mt-2 flex items-center gap-1.5 text-sm text-muted"><MapPin className="h-3.5 w-3.5" />{exp.location}</p>}
            {exp.type && <span className="mt-4 self-start rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted">{exp.type}</span>}
          </div>
          <div className="md:col-span-8 p-6 md:p-10">
            <h3 className="text-3xl md:text-5xl font-semibold tracking-[-0.035em] text-fg">{exp.title}</h3>
            <ul className="mt-8 space-y-4">
              {exp.description.map((d, j) => (
                <li key={j} className="grid grid-cols-[auto_1fr] gap-4 text-sm md:text-base text-muted leading-relaxed">
                  <span className="mt-1 font-mono text-[11px] text-accent">{String(j + 1).padStart(2, '0')}</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

/** Each role pins and the next one stacks over it. */
const Experience: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const n = EXPERIENCE_DATA.length;
  const [pinned, setPinned] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const set = () => setPinned(mq.matches);
    set(); mq.addEventListener('change', set);
    return () => mq.removeEventListener('change', set);
  }, []);
  return (
    <section id="experience" className="relative px-5 md:px-10 pt-28 md:pt-40 border-t border-line">
      <div className="mx-auto max-w-7xl">
        <ScrollHeader index="02" label="Career" align="right" title={<>Experi<span className="font-serif italic font-normal text-muted">ence</span></>} />
        <div ref={ref} className="relative">
          {EXPERIENCE_DATA.map((exp, i) => <Card key={i} exp={exp} i={i} n={n} progress={scrollYProgress} pinned={pinned} />)}
        </div>
      </div>
    </section>
  );
};

export default Experience;
