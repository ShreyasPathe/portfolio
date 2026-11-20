import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDownRight, Github, Linkedin } from 'lucide-react';
import { SOCIAL_LINKS, EXPERIENCE_DATA } from '../constants';
import { SplitReveal, scrollToId } from './fx/Enhancers';
import { LOADER_MS } from './fx/Hud';

const D = LOADER_MS / 1000;
const fade = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay: D + delay, ease: [0.22, 1, 0.36, 1] as const },
});

/** Pinned for 1 extra screen: the name zooms past the camera while details fall away. */
const Hero: React.FC = () => {
  const current = EXPERIENCE_DATA[0];
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 2.6]);
  const nameY = useTransform(scrollYProgress, [0, 0.6], ['0%', '-30%']);
  const nameOpacity = useTransform(scrollYProgress, [0.25, 0.6], [1, 0]);
  const blur = useTransform(scrollYProgress, [0.2, 0.6], ['blur(0px)', 'blur(12px)']);
  const detailsY = useTransform(scrollYProgress, [0, 0.4], ['0%', '60%']);
  const detailsOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const auroraScale = useTransform(scrollYProgress, [0, 1], [1, 1.6]);

  return (
    <section id="hero" ref={ref} className="relative h-[200svh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden flex flex-col justify-end px-5 md:px-10 pt-32 pb-10">
        <motion.div aria-hidden style={{ scale: auroraScale }} className="absolute inset-0">
          <div className="absolute -top-40 left-[5%] h-[520px] w-[520px] rounded-full bg-accent/[0.12] blur-[140px] animate-aurora" />
          <div className="absolute top-[5%] right-[0%] h-[480px] w-[480px] rounded-full bg-violet-600/20 blur-[140px] animate-aurora [animation-delay:-6s]" />
          <div className="absolute bottom-[-10%] left-[30%] h-[400px] w-[600px] rounded-full bg-sky-500/10 blur-[150px] animate-aurora [animation-delay:-12s]" />
        </motion.div>

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <motion.div {...fade(0.1)} className="mb-8 flex flex-wrap items-center gap-3">
            <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-xs text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot" /> Hello World
            </span>
            <span className="font-mono text-xs text-muted">
              Currently — {current.title} @ <span className="text-fg">{current.company}</span>
            </span>
          </motion.div>

          <motion.h1 style={{ scale, y: nameY, opacity: nameOpacity, filter: blur }}
            className="origin-[30%_70%] font-semibold tracking-[-0.055em] leading-[0.85] text-fg text-[clamp(4rem,14.5vw,15rem)]">
            <span className="block font-serif italic font-normal tracking-normal text-muted text-[0.3em] leading-none mb-3 ml-1">
              <SplitReveal text="I am" delay={D + 0.1} />
            </span>
            <SplitReveal text="Shreyas" delay={D + 0.2} />
            <br className="md:hidden" />
            <span className="hidden md:inline">&nbsp;</span>
            <SplitReveal text="Pathe" delay={D + 0.45} className="text-accent" />
          </motion.h1>

          <motion.div style={{ y: detailsY, opacity: detailsOpacity }}
            className="mt-12 grid gap-8 border-t border-line pt-8 md:grid-cols-12 md:items-end">
            <motion.div {...fade(0.8)} className="md:col-span-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted mb-2">Role</p>
              <h2 className="text-xl md:text-2xl text-fg">IT Engineer <span className="text-muted">/</span> Full Stack Developer</h2>
            </motion.div>
            <motion.p {...fade(0.9)} className="md:col-span-4 text-muted leading-relaxed">
              Building secure, scalable, and majestic digital experiences.
            </motion.p>
            <motion.div {...fade(1)} className="md:col-span-3 flex items-center gap-2 md:justify-end">
              <button onClick={() => scrollToId('projects')}
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-ink transition-transform hover:scale-[1.03]">
                View Work <ArrowDownRight className="h-4 w-4 transition-transform group-hover:-rotate-45" />
              </button>
              <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" aria-label="GitHub"
                className="glass grid h-11 w-11 place-items-center rounded-full text-muted hover:text-fg transition-colors"><Github className="h-4 w-4" /></a>
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"
                className="glass grid h-11 w-11 place-items-center rounded-full text-muted hover:text-fg transition-colors"><Linkedin className="h-4 w-4" /></a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
