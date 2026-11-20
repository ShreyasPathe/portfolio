import React from 'react';
import { motion } from 'framer-motion';
import { Blocks, Bot, Code2, ShoppingBag, Database, Cloud, ShieldCheck, Wrench } from 'lucide-react';
import { SKILLS_DATA } from '../constants';
import { ScrollHeader, VelocityMarquee } from './fx/Scroll';

const Icons = [Blocks, Bot, Code2, ShoppingBag, Database, Cloud, ShieldCheck, Wrench];
const spans = ['lg:col-span-2', 'lg:col-span-2', '', '', 'lg:col-span-2', 'lg:col-span-2', '', ''];

const Skills: React.FC = () => {
  const all = SKILLS_DATA.flatMap(c => c.skills);
  const half = Math.ceil(all.length / 2);
  return (
    <section id="skills" className="relative overflow-hidden py-28 md:py-40 border-t border-line">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <ScrollHeader index="04" label="Toolkit" title={<>Technical <span className="font-serif italic font-normal text-muted">Arsenal</span></>} />
      </div>

      <div className="mb-20 -rotate-2 space-y-1 border-y border-line bg-panel/60 py-5 backdrop-blur">
        <VelocityMarquee items={all.slice(0, half)} base={3} className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] text-fg" />
        <VelocityMarquee items={all.slice(half)} base={-3} className="text-3xl md:text-5xl font-serif italic text-muted" />
      </div>

      <div className="mx-auto max-w-7xl px-5 md:px-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SKILLS_DATA.map((cat, i) => {
          const Icon = Icons[i % Icons.length];
          return (
            <motion.div key={cat.title} className={spans[i]}
              initial={{ opacity: 0, y: 60, rotateX: -25 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformPerspective: 900 }}>
              <div className="group card h-full p-6 overflow-hidden">
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/0 blur-3xl transition-colors duration-500 group-hover:bg-accent/20" />
                <div className="flex items-start justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-white/[0.03] text-accent transition-transform duration-500 group-hover:rotate-[360deg]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-[11px] text-white/25">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="mt-6 text-lg font-semibold tracking-tight text-fg">{cat.title}</h3>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {cat.skills.map(s => (
                    <span key={s} className="rounded-md bg-white/[0.04] px-2.5 py-1 text-xs text-muted transition-colors hover:bg-accent hover:text-ink">{s}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;
