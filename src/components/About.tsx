import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { EXPERIENCE_DATA } from '../constants';
import { Eyebrow, Reveal } from './ui';

/** One fact at a time, only below the sm breakpoint. Desktop keeps the grid. */
function FactCarousel({ facts }: { facts: { k: string; v: string }[] }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setIndex(i => (i + 1) % facts.length), 3800);
    return () => window.clearInterval(id);
  }, [reduce, facts.length]);

  const fact = facts[index];

  return (
    <div className="mt-12 sm:hidden">
      <div className="border-t border-b border-line py-6">
        <div className="caption">{fact.k}</div>
        <div className="title-2 mt-2">{fact.v}</div>
      </div>
      <div className="mt-4 flex items-center justify-center gap-2">
        {facts.map((f, i) => (
          <button
            key={f.k}
            type="button"
            aria-label={`Show ${f.k}`}
            aria-current={i === index ? 'true' : undefined}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? 'w-4 bg-aqua' : 'w-1.5 bg-white/25'}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function About() {
  const current = EXPERIENCE_DATA[0];
  const firstYear = Math.min(...EXPERIENCE_DATA.map(e => Number(e.period.match(/\d{4}/)?.[0] ?? 9999)));

  const facts = [
    { k: 'Currently', v: `${current.title}, ${current.company}` },
    { k: 'Experience', v: `${EXPERIENCE_DATA.length} roles since ${firstYear}` },
    { k: 'Works with', v: 'Shopify, React, Node, Next.js, LLM APIs' },
    { k: 'Open to', v: 'New opportunities and hard problems' },
  ];

  return (
    <section id="about" className="section border-t border-line">
      <div className="container-x grid gap-16 lg:grid-cols-[320px_minmax(0,1fr)] lg:items-start">
        <Reveal className="w-full max-w-xs lg:sticky lg:top-24 lg:max-w-none">
          <figure className="overflow-hidden rounded-3xl border border-line bg-surface-1">
            <img src="/images/profile-image.png" alt="Portrait of Shreyas Pathe" className="aspect-[4/5] w-full object-cover" loading="lazy" />
          </figure>
        </Reveal>

        <div className="min-w-0">
          <Reveal>
            <Eyebrow index="01">About</Eyebrow>
            <h2 className="heading-2 text-gradient mt-6 max-w-prose">
              From idea to production,
              <br />
              the whole way.
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-8 max-w-prose space-y-4">
              <p className="body-1 leading-relaxed">
                I'm a full stack engineer who enjoys owning the entire path, from the first sketch to the live deploy.
                Today I build Shopify storefronts at <span className="text-fg">{current.company}</span>. Before that I was the
                first engineer at ITAGO, taking an LLM compliance platform from zero to one.
              </p>
              <p className="body-1 leading-relaxed">
                I care about fast pages, clean systems and products people actually use.
              </p>
            </div>
          </Reveal>

          <FactCarousel facts={facts} />
          <dl className="mt-12 hidden border-t border-line sm:grid sm:grid-cols-2">
            {facts.map((f, i) => (
              <Reveal key={f.k} delay={0.12 + i * 0.06} className={`border-b border-line py-6 ${i % 2 === 0 ? 'sm:pr-8' : 'sm:border-l sm:pl-8'}`}>
                <dt className="caption">{f.k}</dt>
                <dd className="title-2 mt-2">{f.v}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
