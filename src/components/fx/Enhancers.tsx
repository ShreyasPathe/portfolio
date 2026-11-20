import { useEffect, useState, useRef, type ReactNode } from 'react';
import Lenis from 'lenis';
import { motion, useScroll, useSpring, useTransform, AnimatePresence, type MotionValue } from 'framer-motion';
import { Search, ArrowRight, Github, Linkedin, Mail, Hash } from 'lucide-react';
import { NAV_ITEMS, SOCIAL_LINKS } from '../../constants';

let lenisRef: Lenis | null = null;

export function scrollToId(id: string) {
  const lenis = lenisRef;
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: id === 'hero' ? 0 : -40, duration: 1.2 });
  else el.scrollIntoView({ behavior: 'smooth' });
}

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ lerp: 0.1 });
    lenisRef = lenis;
    let id = 0;
    const raf = (t: number) => { lenis.raf(t); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); lenis.destroy(); lenisRef = null; };
  }, []);
  return null;
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return <motion.div style={{ scaleX }} className="fixed top-0 inset-x-0 h-[2px] origin-left z-[60] bg-accent" />;
}

export function Backdrop() {
  const glow = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const move = (e: PointerEvent) => {
      glow.current?.style.setProperty('--x', `${e.clientX}px`);
      glow.current?.style.setProperty('--y', `${e.clientY}px`);
    };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, []);
  return (
    <>
      <div ref={glow} aria-hidden className="pointer-events-none fixed inset-0 z-0 hidden md:block"
        style={{ background: 'radial-gradient(500px circle at var(--x,50%) var(--y,50%), rgba(200,255,77,0.045), transparent 40%)' }} />
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[70] grain" />
    </>
  );
}

/* ---------- Section primitives ---------- */

export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className}
      initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

export function SectionHeader({ index, label, title }: { index: string; label: string; title: ReactNode }) {
  return (
    <div className="mb-14 md:mb-20">
      <Reveal>
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
          <span className="text-accent">{index}</span>
          <span className="h-px w-8 bg-line" />
          <span>{label}</span>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-5 text-5xl md:text-7xl lg:text-8xl font-semibold tracking-[-0.04em] leading-[0.95] text-fg">{title}</h2>
      </Reveal>
    </div>
  );
}

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return <motion.span style={{ opacity }} className="inline-block mr-[0.25em]">{children}</motion.span>;
}

/** Words light up as the paragraph scrolls through the viewport. */
export function ScrollWords({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
  const words = text.split(' ');
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>{w}</Word>
      ))}
    </p>
  );
}

/** Letters rise from a mask, staggered. */
export function SplitReveal({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) {
  return (
    <span className={`inline-flex overflow-hidden pb-[0.08em] ${className}`} aria-label={text}>
      {text.split('').map((ch, i) => (
        <motion.span key={i} aria-hidden className="inline-block"
          initial={{ y: '105%' }} animate={{ y: 0 }}
          transition={{ duration: 0.9, delay: delay + i * 0.035, ease: [0.22, 1, 0.36, 1] }}>
          {ch === ' ' ? ' ' : ch}
        </motion.span>
      ))}
    </span>
  );
}

export function Tilt({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateX(${-py * 5}deg) rotateY(${px * 5}deg)`;
  };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={() => { if (ref.current) ref.current.style.transform = ''; }}
      className={`transition-transform duration-300 ease-out will-change-transform ${className}`}>
      {children}
    </div>
  );
}

export function Marquee({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div className={`flex w-max gap-3 py-1.5 ${reverse ? 'animate-marquee-rev' : 'animate-marquee'} hover:[animation-play-state:paused]`}>
        {row.map((s, i) => (
          <span key={i} className="whitespace-nowrap rounded-full border border-line bg-white/[0.02] px-4 py-2 font-mono text-xs text-muted">{s}</span>
        ))}
      </div>
    </div>
  );
}

/* ---------- Command palette ---------- */

type Cmd = { label: string; hint: string; icon: typeof Hash; run: () => void };

export function openPalette() { window.dispatchEvent(new Event('open-cmdk')); }

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setOpen(o => !o); }
      if (e.key === 'Escape') setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener('open-cmdk', onOpen);
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('open-cmdk', onOpen); };
  }, []);
  useEffect(() => {
    const lenis = lenisRef;
    if (open) { setQ(''); setActive(0); lenis?.stop(); } else lenis?.start();
  }, [open]);

  const cmds: Cmd[] = [
    ...NAV_ITEMS.map(n => ({ label: n.label, hint: 'Section', icon: Hash, run: () => scrollToId(n.to) })),
    { label: 'GitHub', hint: 'Link', icon: Github, run: () => window.open(SOCIAL_LINKS.github, '_blank') },
    { label: 'LinkedIn', hint: 'Link', icon: Linkedin, run: () => window.open(SOCIAL_LINKS.linkedin, '_blank') },
    { label: 'Send Email', hint: 'Link', icon: Mail, run: () => window.open(SOCIAL_LINKS.email, '_blank') },
  ];
  const list = cmds.filter(c => c.label.toLowerCase().includes(q.toLowerCase()));
  const exec = (c?: Cmd) => { if (!c) return; setOpen(false); setTimeout(c.run, 50); };

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[80] flex items-start justify-center pt-[18vh] px-4 bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}>
          <motion.div role="dialog" aria-label="Command palette"
            initial={{ scale: 0.96, y: -8 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: -8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            onClick={e => e.stopPropagation()}
            className="w-full max-w-lg rounded-2xl border border-line bg-panel shadow-2xl overflow-hidden">
            <div className="flex items-center gap-3 px-4 border-b border-line">
              <Search className="w-4 h-4 text-muted" />
              <input autoFocus value={q}
                onChange={e => { setQ(e.target.value); setActive(0); }}
                onKeyDown={e => {
                  if (e.key === 'ArrowDown') { e.preventDefault(); setActive(a => Math.min(a + 1, list.length - 1)); }
                  if (e.key === 'ArrowUp') { e.preventDefault(); setActive(a => Math.max(a - 1, 0)); }
                  if (e.key === 'Enter') exec(list[active]);
                }}
                placeholder="Type a command or search…"
                className="w-full bg-transparent py-4 text-sm text-fg placeholder:text-muted outline-none" />
              <kbd className="font-mono text-[10px] text-muted border border-line rounded px-1.5 py-0.5">ESC</kbd>
            </div>
            <ul className="max-h-80 overflow-y-auto p-2">
              {list.length === 0 && <li className="px-3 py-6 text-center text-sm text-muted">No results.</li>}
              {list.map((c, i) => (
                <li key={c.label}>
                  <button onMouseEnter={() => setActive(i)} onClick={() => exec(c)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-left transition-colors ${i === active ? 'bg-accent-dim text-fg' : 'text-muted'}`}>
                    <c.icon className="w-4 h-4" />
                    <span className="flex-1">{c.label}</span>
                    <span className="text-[10px] font-mono uppercase opacity-60">{c.hint}</span>
                    {i === active && <ArrowRight className="w-3.5 h-3.5 text-accent" />}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
