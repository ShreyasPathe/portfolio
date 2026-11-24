import { useCallback, useEffect, useRef, useState } from 'react';
import {
  motion, AnimatePresence, useInView, useMotionValue, useSpring, useTransform, useMotionTemplate, useReducedMotion,
  type PanInfo,
} from 'framer-motion';
import { ArrowUpRight, ArrowLeft, ArrowRight, GithubLogo, Globe } from '@phosphor-icons/react';
import { PROJECTS_DATA } from '../constants';
import type { ProjectItem } from '../types';
import { EASE } from '../lib/motion';
import { Eyebrow, Reveal } from './ui';

const AUTOPLAY_MS = 7000;
const pad = (n: number) => String(n).padStart(2, '0');
const isRepo = (p: ProjectItem) => p.liveUrl.includes('github.com');
const host = (url: string) => { try { return new URL(url).host.replace(/^www\./, ''); } catch { return url; } };

/** Title whose letters rise in one by one whenever the project changes. */
function SplitTitle({ text }: { text: string }) {
  const reduce = useReducedMotion();
  const words = text.split(' ');
  return (
    <h3 className="heading-2 text-gradient" aria-label={text}>
      {words.map((word, wi) => {
        const offset = words.slice(0, wi).join(' ').length;
        return (
          <span key={wi} aria-hidden className="inline-block overflow-hidden pb-2 align-top">
            {word.split('').map((ch, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ y: reduce ? 0 : '110%', opacity: reduce ? 0 : 1 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.1 + (offset + i) * 0.025, ease: EASE }}
              >
                {ch}
              </motion.span>
            ))}
            {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
          </span>
        );
      })}
    </h3>
  );
}

/** Browser frame that tilts toward the cursor, with a moving glare and a wipe between screenshots. */
function Stage({ index, dir, onSwipe }: { index: number; dir: 1 | -1; onSwipe: (d: 1 | -1) => void }) {
  const p = PROJECTS_DATA[index];
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const hover = useMotionValue(0);
  const rx = useSpring(useTransform(py, [0, 1], [6, -6]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(px, [0, 1], [-8, 8]), { stiffness: 150, damping: 18 });
  const glareOpacity = useSpring(hover, { stiffness: 120, damping: 20 });
  const gx = useTransform(px, v => `${v * 100}%`);
  const gy = useTransform(py, v => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(600px circle at ${gx} ${gy}, rgba(255,255,255,0.14), transparent 45%)`;

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
    hover.set(1);
  };
  const onLeave = () => { px.set(0.5); py.set(0.5); hover.set(0); };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60 || info.velocity.x < -400) onSwipe(1);
    else if (info.offset.x > 60 || info.velocity.x > 400) onSwipe(-1);
  };

  return (
    <div className="relative [perspective:1400px]" onPointerMove={onMove} onPointerLeave={onLeave}>
      {/* Ambient glow sampled from the screenshot itself */}
      <div aria-hidden className="pointer-events-none absolute -inset-8 -z-10 sm:-inset-12">
        <AnimatePresence initial={false}>
          <motion.img
            key={p.image}
            src={p.image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover blur-3xl saturate-150"
            initial={{ opacity: 0 }} animate={{ opacity: 0.35 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          />
        </AnimatePresence>
      </div>

      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        className="relative overflow-hidden rounded-2xl border border-line-strong bg-surface-1 shadow-2xl"
      >
        <div className="flex items-center gap-3 border-b border-line bg-surface-2 px-4 py-3">
          <span className="flex gap-2">
            <span className="h-3 w-3 rounded-full bg-aqua/80" />
            <span className="h-3 w-3 rounded-full bg-indigo/80" />
            <span className="h-3 w-3 rounded-full bg-foam/70" />
          </span>
          <a
            href={p.liveUrl} target="_blank" rel="noreferrer"
            className="mx-auto flex min-w-0 max-w-xs flex-1 items-center justify-center gap-2 rounded-lg bg-surface-1 px-3 py-1 font-mono text-xs text-muted transition-colors duration-300 hover:text-fg"
          >
            {isRepo(p) ? <GithubLogo size={12} /> : <Globe size={12} />}
            <span className="truncate">{host(p.liveUrl)}</span>
          </a>
          <span className="w-12" />
        </div>

        <motion.div
          className="relative aspect-[1900/870] w-full cursor-grab touch-pan-y overflow-hidden bg-surface-2 active:cursor-grabbing"
          drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.15} onDragEnd={onDragEnd}
        >
          <AnimatePresence initial={false} custom={dir}>
            <motion.img
              key={p.image}
              src={p.image}
              alt={`${p.title} screenshot`}
              draggable={false}
              custom={dir}
              className="absolute inset-0 h-full w-full select-none object-cover object-top"
              variants={{
                enter: (d: number) => ({ clipPath: d > 0 ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)', scale: reduce ? 1 : 1.15, zIndex: 2 }),
                center: { clipPath: 'inset(0 0% 0 0%)', scale: 1, zIndex: 2 },
                exit: (d: number) => ({ scale: reduce ? 1 : 0.92, x: reduce ? 0 : d * -60, opacity: 0.3, zIndex: 1 }),
              }}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.9, ease: EASE }}
            />
          </AnimatePresence>
        </motion.div>

        <motion.div aria-hidden className="pointer-events-none absolute inset-0 z-10" style={{ background: glare, opacity: glareOpacity }} />
      </motion.div>
    </div>
  );
}

export default function Projects() {
  const [[index, dir], setState] = useState<[number, 1 | -1]>([0, 1]);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { margin: '-20% 0px -20% 0px' });
  const reduce = useReducedMotion();
  const p = PROJECTS_DATA[index];
  const n = PROJECTS_DATA.length;

  const go = useCallback((d: 1 | -1) => setState(([i]) => [(i + d + n) % n, d]), [n]);
  const select = (i: number) => setState(([cur]) => [i, i >= cur ? 1 : -1]);

  useEffect(() => {
    if (!inView) return;
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('input, textarea, [role=dialog]')) return;
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [inView, go]);

  const playing = inView && !paused && !reduce;

  return (
    <section
      id="projects" ref={sectionRef} className="section"
      onPointerEnter={e => e.pointerType === 'mouse' && setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setPaused(false); }}
    >
      <div className="container-x">
        <Reveal className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <Eyebrow index="03">Projects</Eyebrow>
            <h2 className="heading-2 text-gradient mt-6">Selected work.</h2>
          </div>
          <p className="body-2 max-w-sm">
            Storefronts, SaaS and AI products, shipped for clients and for myself. Pick one, swipe, or use the arrow keys.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-16">
          {/* Project index */}
          <Reveal className="hidden lg:block">
            <ol role="tablist" aria-label="Projects">
              {PROJECTS_DATA.map((proj, i) => {
                const active = i === index;
                return (
                  <li key={proj.title}>
                    <button
                      role="tab" aria-selected={active} aria-controls="project-stage"
                      onClick={() => select(i)}
                      className={`group relative flex w-full items-center gap-4 overflow-hidden rounded-xl px-4 py-3 text-left transition-colors duration-300 ${
                        active ? 'text-fg' : 'text-subtle hover:text-fg'
                      }`}
                    >
                      {active && (
                        <motion.span layoutId="project-tab" className="absolute inset-0 rounded-xl bg-surface-1" transition={{ duration: 0.5, ease: EASE }} />
                      )}
                      <span className="relative font-mono text-xs">{pad(i + 1)}</span>
                      <span className="relative flex-1 truncate text-base font-medium transition-transform duration-500 ease-out group-hover:translate-x-1">
                        {proj.title}
                      </span>
                      {active && (
                        <span className="absolute inset-x-4 bottom-0 h-px overflow-hidden bg-line">
                          <span
                            key={index}
                            className="block h-full origin-left bg-gradient-to-r from-indigo to-aqua"
                            style={{
                              animation: reduce ? 'none' : `project-progress ${AUTOPLAY_MS}ms linear forwards`,
                              animationPlayState: playing ? 'running' : 'paused',
                              transform: reduce ? 'scaleX(0)' : undefined,
                            }}
                            onAnimationEnd={() => go(1)}
                          />
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ol>
          </Reveal>

          {/* Stage and details */}
          <Reveal delay={0.1} className="min-w-0">
            <div id="project-stage" role="tabpanel">
              <Stage index={index} dir={dir} onSwipe={go} />

              <div className="mt-12 grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
                <div key={p.title} className="min-w-0" aria-live="polite">
                  <div className="caption flex items-center gap-3">
                    <span className="text-fg">{pad(index + 1)}</span>
                    <span>{p.category}</span>
                  </div>
                  <div className="mt-4"><SplitTitle text={p.title} /></div>
                  <motion.p
                    className="body-1 mt-6 max-w-prose leading-relaxed"
                    initial={{ opacity: 0, y: reduce ? 0 : 16 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
                  >
                    {p.description}
                  </motion.p>
                  <motion.ul
                    className="mt-6 flex flex-wrap gap-2"
                    initial="hidden" animate="show"
                    transition={{ staggerChildren: 0.05, delayChildren: 0.35 }}
                  >
                    {p.tags.map(t => (
                      <motion.li
                        key={t}
                        variants={{ hidden: { opacity: 0, y: reduce ? 0 : 8 }, show: { opacity: 1, y: 0 } }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className="rounded-full border border-line bg-surface-1 px-3 py-1 text-sm text-muted"
                      >
                        {t}
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>

                <div className="flex flex-wrap items-center gap-3 md:flex-col md:items-end">
                  <a href={p.liveUrl} target="_blank" rel="noreferrer" className="btn-primary px-6 py-3">
                    {isRepo(p) ? <><GithubLogo size={16} /> View source</> : <>Visit live site <ArrowUpRight size={16} /></>}
                  </a>
                  <div className="flex items-center gap-2">
                    <button onClick={() => go(-1)} className="btn-ghost px-3" aria-label="Previous project"><ArrowLeft size={14} /></button>
                    <span className="w-16 text-center font-mono text-sm text-muted">
                      <span className="text-fg">{pad(index + 1)}</span> / {pad(n)}
                    </span>
                    <button onClick={() => go(1)} className="btn-ghost px-3" aria-label="Next project"><ArrowRight size={14} /></button>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
