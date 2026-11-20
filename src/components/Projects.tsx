import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS_DATA } from '../constants';
import type { ProjectItem } from '../types';
import { ScrollHeader } from './fx/Scroll';
import { RollingNumber } from './fx/Hud';

function Card({ p, i }: { p: ProjectItem; i: number }) {
  return (
    <a href={p.liveUrl} target="_blank" rel="noopener noreferrer"
      className="group relative block w-full lg:w-[44vw] lg:max-w-[720px] shrink-0">
      <article className="card overflow-hidden p-2">
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-white/[0.03]">
          <img src={p.image} alt={p.title} loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-top transition duration-[1.2s] ease-out group-hover:scale-[1.06]" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
          <span className="glass absolute left-3 top-3 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-fg">{p.category}</span>
          <span className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-accent text-ink scale-0 group-hover:scale-100 transition-transform duration-300">
            <ArrowUpRight className="h-4 w-4" />
          </span>
          <span className="absolute bottom-2 right-4 font-semibold tracking-[-0.06em] text-[5rem] leading-none text-white/10">{String(i + 1).padStart(2, '0')}</span>
        </div>
        <div className="p-4 md:p-6">
          <h3 className="text-2xl md:text-3xl font-semibold tracking-[-0.03em] text-fg group-hover:text-accent transition-colors">{p.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-3">{p.description}</p>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {p.tags.map(t => <span key={t} className="rounded-md border border-line px-2 py-0.5 font-mono text-[10px] text-muted">{t}</span>)}
          </div>
        </div>
      </article>
    </a>
  );
}

/** Desktop: section pins and the cards travel horizontally with vertical scroll. */
const Projects: React.FC = () => {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const [desktop, setDesktop] = useState(false);
  const [idx, setIdx] = useState(1);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const measure = () => {
      setDesktop(mq.matches);
      requestAnimationFrame(() => { if (track.current) setDist(Math.max(track.current.scrollWidth - window.innerWidth, 0)); });
    };
    measure();
    window.addEventListener('resize', measure);
    mq.addEventListener('change', measure);
    return () => { window.removeEventListener('resize', measure); mq.removeEventListener('change', measure); };
  }, []);
  useEffect(() => { if (track.current) setDist(Math.max(track.current.scrollWidth - window.innerWidth, 0)); }, [desktop]);

  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start start', 'end end'] });
  const x = useSpring(useTransform(scrollYProgress, [0, 1], [0, -dist]), { stiffness: 120, damping: 30, mass: 0.4 });
  const bar = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  useEffect(() => scrollYProgress.on('change', v => setIdx(Math.min(PROJECTS_DATA.length, Math.floor(v * PROJECTS_DATA.length) + 1))), [scrollYProgress]);

  return (
    <section id="projects" className="relative pt-28 md:pt-40 border-t border-line">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <ScrollHeader index="03" label="Selected work" title={<>Pro<span className="font-serif italic font-normal text-muted">jects</span></>} />
      </div>

      {desktop ? (
        <div ref={wrap} style={{ height: `calc(100vh + ${dist}px)` }} className="relative">
          <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
            <motion.div ref={track} style={{ x }} className="flex gap-6 pl-10 pr-[10vw] will-change-transform">
              {PROJECTS_DATA.map((p, i) => <Card key={p.title} p={p} i={i} />)}
            </motion.div>
            <div className="mx-10 mt-10 flex items-center gap-6">
              <span className="font-mono text-sm text-fg"><RollingNumber value={idx} /> <span className="text-muted">/ {String(PROJECTS_DATA.length).padStart(2, '0')}</span></span>
              <div className="relative h-px flex-1 bg-line"><motion.div style={{ width: bar }} className="absolute inset-y-0 left-0 bg-accent" /></div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Scroll →</span>
            </div>
          </div>
        </div>
      ) : (
        <div ref={wrap} className="space-y-6 px-5 md:px-10 pb-10">
          {PROJECTS_DATA.map((p, i) => (
            <motion.div key={p.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <Card p={p} i={i} />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Projects;
