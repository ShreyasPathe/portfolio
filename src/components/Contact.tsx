import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Copy, Check } from '@phosphor-icons/react';
import { SOCIAL_LINKS, EMAIL } from '../constants';
import { EASE } from '../lib/motion';
import { Eyebrow, Reveal } from './ui';
import Lightfall from './bits/Lightfall';
import Footer from './Footer';

type CopyState = 'idle' | 'copied' | 'error';

export default function Contact() {
  const [state, setState] = useState<CopyState>('idle');

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setState('copied');
    } catch {
      setState('error');
    }
    setTimeout(() => setState('idle'), 2000);
  };

  const label = { idle: 'Copy email', copied: 'Copied', error: 'Copy failed, select it instead' }[state];

  return (
    <section id="contact" className="section isolate overflow-hidden border-t border-line">
      {/* React Bits Lightfall, faded in from the section above */}
      <div aria-hidden className="absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,transparent,black_35%)]">
        <Lightfall
          colors={['#7C8CFF', '#5FE1F0', '#B8F7FF']}
          backgroundColor="#0E1A4A"
          dpr={1.25}
          speed={0.25}
          opacity={0.9}
          mouseInteraction
        />
      </div>
      <div className="container-x">
        <Reveal>
          <Eyebrow index="05">Contact</Eyebrow>
        </Reveal>

        <div className="mt-12">
          <Reveal delay={0.08}>
            <h2 className="text-gradient text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
              Let's build
              <br />
              <span className="text-aurora">something good.</span>
            </h2>
            <p className="body-1 mt-8 max-w-prose">
              Open to new opportunities and interesting problems. Questions, ideas or just a hello, I reply to everything.
            </p>

            <div className="mt-12 flex flex-wrap items-center gap-3">
              <a href={SOCIAL_LINKS.email} target="_blank" rel="noreferrer" className="btn-primary">
                {EMAIL} <ArrowUpRight size={14} />
              </a>
              <button onClick={copy} className="btn-ghost min-w-32 justify-center" aria-live="polite">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={state}
                    className="inline-flex items-center gap-2"
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2, ease: EASE }}
                  >
                    {state === 'copied' ? <Check size={14} /> : <Copy size={14} />} {label}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
          </Reveal>
        </div>
      </div>
      <Footer />
    </section>
  );
}
