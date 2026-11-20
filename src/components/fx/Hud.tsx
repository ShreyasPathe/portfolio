import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { NAV_ITEMS } from '../../constants';

export const LOADER_MS = 1300;

/** One digit that rolls vertically to its value (odometer). */
function Digit({ value, duration = 0.6 }: { value: number; duration?: number }) {
  return (
    <span className="relative inline-block h-[1em] w-[0.62em] overflow-hidden leading-none tabular-nums">
      <motion.span className="absolute inset-x-0 top-0 flex flex-col"
        animate={{ y: `-${value * 10}%` }} transition={{ duration, ease: [0.22, 1, 0.36, 1] }}>
        {Array.from({ length: 10 }, (_, i) => <span key={i} className="h-[1em]">{i}</span>)}
      </motion.span>
    </span>
  );
}

export function RollingNumber({ value, digits = 2, duration }: { value: number; digits?: number; duration?: number }) {
  const s = String(value).padStart(digits, '0');
  return <span className="inline-flex">{s.split('').map((d, i) => <Digit key={i} value={+d} duration={duration} />)}</span>;
}

/** Intro: counter rolls 000 → 100, then the curtain lifts. */
export function Loader() {
  const [n, setN] = useState(0);
  const [done, setDone] = useState(false);
  useEffect(() => {
    const start = performance.now();
    let id = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / (LOADER_MS - 300), 1);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) id = requestAnimationFrame(tick); else setTimeout(() => setDone(true), 200);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, []);
  return (
    <AnimatePresence>
      {!done && (
        <motion.div className="fixed inset-0 z-[100] flex items-end justify-between bg-ink p-6 md:p-10"
          exit={{ clipPath: 'inset(0 0 100% 0)' }} initial={{ clipPath: 'inset(0 0 0% 0)' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Shreyas Pathe — Portfolio</span>
          <span className="font-semibold tracking-[-0.06em] text-fg text-[clamp(5rem,18vw,16rem)] leading-[0.8]">
            <RollingNumber value={n} digits={3} duration={0.25} /><span className="text-accent">%</span>
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const SECTIONS = [{ label: 'Intro', to: 'hero' }, ...NAV_ITEMS];

/** Fixed glass HUD: section counter, progress ruler, scroll cue. */
export function Hud() {
  const [idx, setIdx] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const fill = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    const obs = new IntersectionObserver(
      es => es.forEach(e => e.isIntersecting && setIdx(SECTIONS.findIndex(s => s.to === e.target.id))),
      { rootMargin: '-45% 0px -50% 0px' });
    SECTIONS.forEach(s => { const el = document.getElementById(s.to); if (el) obs.observe(el); });
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { obs.disconnect(); window.removeEventListener('scroll', onScroll); };
  }, []);

  return (
    <>
      <div className="glass fixed bottom-5 left-5 z-40 hidden md:flex items-center gap-3 rounded-2xl px-4 py-3">
        <span className="font-mono text-2xl font-medium text-fg"><RollingNumber value={idx} /></span>
        <span className="h-6 w-px bg-white/15" />
        <div className="leading-tight">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">/ {String(SECTIONS.length - 1).padStart(2, '0')}</p>
          <AnimatePresence mode="wait">
            <motion.p key={idx} initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -8, opacity: 0 }}
              className="text-sm font-medium text-fg">{SECTIONS[idx]?.label}</motion.p>
          </AnimatePresence>
        </div>
      </div>

      <div className="fixed right-5 top-1/2 z-40 hidden md:flex -translate-y-1/2 flex-col items-center gap-3">
        <div className="relative h-48 w-px bg-white/10">
          <motion.div style={{ height: fill }} className="absolute inset-x-0 top-0 bg-accent shadow-[0_0_12px_#c8ff4d]" />
        </div>
        <div className="flex flex-col gap-2">
          {SECTIONS.map((s, i) => (
            <span key={s.to} title={s.label}
              className={`block h-1.5 w-1.5 rounded-full transition-all duration-500 ${i === idx ? 'bg-accent scale-150' : 'bg-white/20'}`} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {!scrolled && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0, transition: { delay: LOADER_MS / 1000 + 1.6 } }} exit={{ opacity: 0, y: 10 }}
            className="pointer-events-none fixed inset-x-0 bottom-5 z-40 flex justify-center">
            <span className="glass flex items-center gap-2 rounded-full px-4 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-bob" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-fg">Scroll</span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
