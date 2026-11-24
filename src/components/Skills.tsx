import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Cube, Robot, Code, ShoppingBag, Database, Cloud, ShieldCheck, Wrench, ArrowUpRight } from '@phosphor-icons/react';
import { SKILLS_DATA, CERTIFICATIONS_DATA } from '../constants';
import type { SkillCategory } from '../types';
import { Eyebrow, Reveal } from './ui';

const ICONS = [Cube, Robot, Code, ShoppingBag, Database, Cloud, ShieldCheck, Wrench];

function SkillCard({ cat, i, compact = false }: { cat: SkillCategory; i: number; compact?: boolean }) {
  const Icon = ICONS[i % ICONS.length];
  return (
    <div className={`group h-full rounded-3xl border border-line bg-surface-1 transition-colors duration-300 hover:border-line-strong ${compact ? 'p-5' : 'p-6'}`}>
      <div className="flex items-center justify-between">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-indigo/15 text-aqua transition-transform duration-500 ease-out group-hover:-rotate-12">
          <Icon size={20} />
        </span>
        <span className="font-mono text-xs text-subtle">{String(i + 1).padStart(2, '0')}</span>
      </div>
      <h3 className="title-2 mt-6">{cat.title}</h3>
      <ul className="mt-4 flex flex-wrap gap-2">
        {cat.skills.map(s => (
          <li key={s} className="rounded-full border border-line px-3 py-1 text-sm text-muted transition-colors duration-300 group-hover:text-fg">
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Peeking snap row with dot navigation. */
function ToolkitCarousel() {
  const reduce = useReducedMotion();
  const scroller = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const go = (i: number) => {
    const el = scroller.current;
    const card = el?.children[i] as HTMLElement | undefined;
    if (!el || !card) return;
    el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: reduce ? 'auto' : 'smooth' });
    setActive(i);
  };

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setActive(i => {
        const next = (i + 1) % SKILLS_DATA.length;
        const el = scroller.current;
        const card = el?.children[next] as HTMLElement | undefined;
        if (el && card) el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: 'smooth' });
        return next;
      });
    }, 4500);
    return () => window.clearInterval(id);
  }, [reduce]);

  const onScroll = () => {
    const el = scroller.current;
    const card = el?.children[0] as HTMLElement | undefined;
    if (!el || !card || card.offsetWidth === 0) return;
    const i = Math.round(el.scrollLeft / (card.offsetWidth + 12));
    setActive(Math.min(SKILLS_DATA.length - 1, Math.max(0, i)));
  };

  return (
    <div className="min-w-0 sm:hidden">
      <div
        ref={scroller}
        onScroll={onScroll}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {SKILLS_DATA.map((cat, i) => (
          <div key={cat.title} className="w-[17.5rem] max-w-[82%] shrink-0 snap-start">
            <SkillCard cat={cat} i={i} compact />
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-center gap-2">
        {SKILLS_DATA.map((cat, i) => (
          <button
            key={cat.title}
            type="button"
            aria-label={cat.title}
            aria-current={i === active ? 'true' : undefined}
            onClick={() => go(i)}
            className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${i === active ? 'bg-aqua' : 'bg-white/25'}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section border-t border-line">
      <div className="container-x">
        <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-16 lg:grid-cols-[320px_minmax(0,1fr)]">
          <Reveal className="lg:sticky lg:top-24 lg:self-start">
            <Eyebrow index="04">Skills</Eyebrow>
            <h2 className="heading-2 text-gradient mt-6">The toolkit.</h2>
            <p className="body-1 mt-6">
              The stack I reach for, from storefront to server to model. {SKILLS_DATA.reduce((n, c) => n + c.skills.length, 0)} tools across {SKILLS_DATA.length} areas.
            </p>
          </Reveal>

          <ToolkitCarousel />
          <div className="hidden gap-4 sm:grid sm:grid-cols-2">
            {SKILLS_DATA.map((cat, i) => (
              <Reveal key={cat.title} delay={(i % 2) * 0.08}>
                <SkillCard cat={cat} i={i} />
              </Reveal>
            ))}
          </div>
        </div>

        <div id="credentials" className="mt-24 grid gap-16 lg:grid-cols-[320px_1fr]">
          <Reveal>
            <div className="caption">Credentials</div>
            <h3 className="heading-3 mt-4">Certified by the people who build the tools.</h3>
          </Reveal>
          <ul className="grid border-t border-line sm:grid-cols-2 sm:gap-x-8">
            {CERTIFICATIONS_DATA.map((c, i) => (
              <Reveal as="li" key={c.credentialUrl ?? c.name} delay={Math.min(i * 0.04, 0.3)} className="min-w-0 border-b border-line">
                <a
                  href={c.credentialUrl} target="_blank" rel="noreferrer"
                  className="group flex min-w-0 items-center gap-4 py-4"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-xl border border-line bg-surface-1 p-1">
                    <img src={c.image} alt="" loading="lazy" className="h-full w-full object-contain" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="title-3 block truncate">{c.name}</span>
                    <span className="body-3 block">{c.issuer}</span>
                  </span>
                  <ArrowUpRight size={16} className="shrink-0 text-subtle transition-[transform,color] duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
