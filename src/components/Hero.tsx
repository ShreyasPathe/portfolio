import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from '@phosphor-icons/react';
import { EXPERIENCE_DATA } from '../constants';
import { EASE, scrollToId } from '../lib/motion';
import GradientWaves from './bits/GradientWaves';

const NAME = ['Shreyas', 'Pathe'];
const NAME_END_SCALE = 0.42;

/**
 * Scroll story (progress of the pinned hero, 0..1):
 *   0.00–0.08  the line, role, company and actions step aside
 *   0.00–0.19  the name glides up, and "Hi there, I'm" sits to its left
 *   0.12–0.18  the greeting and pitch appear around the name
 *   0.17–0.80  the pitch lights up word by word
 *   0.84–1.00  the sea dims and About follows
 */

/** Name letters rising out of a soft blur, one after another. */
function Letters({ word, offset }: { word: string; offset: number }) {
  const reduce = useReducedMotion();
  return (
    <span className="inline-block pb-3 align-top">
      {word.split('').map((ch, i) => (
        <motion.span
          key={i}
          className="hero-name inline-block"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: '35%', filter: 'blur(14px)' }}
          animate={{ opacity: 1, y: '0%', filter: 'blur(0px)' }}
          transition={{ duration: 1.1, delay: 0.35 + (offset + i) * 0.05, ease: EASE }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

/** One word of the pitch; brightens as scroll passes its slot. */
function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.22, 1]);
  const y = useTransform(progress, range, [8, 0]);
  return <motion.span style={{ opacity, y }} className="inline-block">{children}&nbsp;</motion.span>;
}

export default function Hero() {
  const reduce = useReducedMotion();
  const current = EXPERIENCE_DATA[0];
  const sectionRef = useRef<HTMLElement>(null);
  const nameWrapRef = useRef<HTMLDivElement>(null);
  const greetRef = useRef<HTMLParagraphElement>(null);

  // The greeting is pinned to the name's left edge. The pitch starts under that line.
  const [layout, setLayout] = useState({ lift: 0, scale: NAME_END_SCALE, shift: 0, pitchTop: 180 });
  useEffect(() => {
    const measure = () => {
      const el = nameWrapRef.current;
      const greet = greetRef.current;
      if (!el || !greet) return;
      const available = el.closest('.container-x')?.clientWidth ?? window.innerWidth - 32;
      const scale = Math.min(NAME_END_SCALE, Math.max(0.2, (available - 4) / (greet.offsetWidth + el.offsetWidth)));
      const landTop = 156;
      const visualTop = el.offsetTop + el.offsetHeight * (1 - scale); // scale is anchored bottom-left
      const height = el.offsetHeight * scale;
      setLayout({
        lift: Math.max(0, visualTop - landTop),
        scale,
        shift: greet.offsetWidth * scale,
        pitchTop: landTop + height + 40,
      });
    };
    measure();
    window.addEventListener('resize', measure);
    let alive = true;
    document.fonts?.ready.then(() => { if (alive) measure(); });
    return () => {
      alive = false;
      window.removeEventListener('resize', measure);
    };
  }, []);

  const { scrollYProgress: p } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });

  const nameY = useTransform(p, [0, 0.19], [0, -layout.lift]);
  const nameX = useTransform(p, [0, 0.19], [0, layout.shift]);
  const nameScale = useTransform(p, [0, 0.19], [1, layout.scale]);
  const quoteOpacity = useTransform(p, [0, 0.08], [1, 0]);
  const quoteY = useTransform(p, [0, 0.08], [0, -16]);
  const factsOpacity = useTransform(p, [0, 0.08], [1, 0]);
  const factsY = useTransform(p, [0, 0.08], [0, 24]);
  const factsPointer = useTransform(factsOpacity, v => (v > 0.5 ? 'auto' : 'none'));
  const pitchOpacity = useTransform(p, [0.12, 0.18], [0, 1]);
  const veil = useTransform(p, [0.12, 0.22], [0, 0.45]); // darken the sea behind the pitch
  const seaOpacity = useTransform(p, [0.84, 1], [1, 0.35]);

  const pitch = `If it isn't figured out yet, that's the work I want. Adept and always open, I thrive in fast-paced environments and live by continuous learning. I build Shopify storefronts and web apps at ${current.company}. With AI, the possibilities are limitless, and I believe I can build anything.`.split(' ');
  const wStart = 0.17, wEnd = 0.8, step = (wEnd - wStart) / pitch.length;

  const facts = [
    { k: 'Role', v: 'Full stack engineer' },
    { k: 'Currently', v: current.company, img: current.image },
    { k: 'Focus', v: 'Shopify, MERN, LLM products' },
  ];

  const intro = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 14, filter: 'blur(8px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: { duration: 0.9, delay: reduce ? 0 : delay, ease: EASE },
  });

  return (
    <section id="hero" ref={sectionRef} className="relative h-[320svh]">
      <div className="sticky top-0 isolate h-[100svh] overflow-hidden bg-ink">
        {/* Night sky behind the sea's horizon haze */}
        <div className="absolute inset-0 -z-30" style={{ background: 'linear-gradient(180deg, #03050F 0%, #080D28 25%, #161D52 40%, #0A0F2C 100%)' }} />

        {/* The sea (React Bits GradientWaves) */}
        <motion.div className="absolute inset-0 -z-20" style={{ opacity: seaOpacity }}>
          <GradientWaves
            horizonColor="#1C2263"
            waveColor="#0E6E96"
            crestColor="#B8F7FF"
            backgroundColor="transparent"
            speed={0.32}
            amplitude={1.3}
            waveScale={1.7}
            waveRatio={0.75}
            turbulence={34}
            swell={22}
            tilt={72}
            fogDepth={14}
            lightAngle={110}
            sheen={1}
            brightness={1.15}
            grain={0.12}
            quality="medium"
            dpr={1.25}
          />
        </motion.div>

        {/* Legibility: soft shade under the text, deeper while the pitch is up */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[45%] bg-gradient-to-t from-ink/80 via-ink/40 to-transparent" />
        <motion.div className="pointer-events-none absolute inset-0 -z-10 bg-ink" style={{ opacity: veil }} />

        <motion.div style={{ opacity: quoteOpacity, y: quoteY }} className="absolute inset-x-0 top-32 z-10 px-4 sm:top-36 sm:px-8">
          <div className="container-x">
            <motion.figure {...intro(0.15)} className="max-w-2xl">
              <blockquote className="text-sm leading-relaxed text-muted sm:text-base">
                Empty your mind. Be formless, shapeless, like water. You put water into a cup, it becomes the cup. You put water into a bottle, it becomes the bottle. You put it in a teapot, it becomes the teapot. Now water can flow or it can crash. Be water, my friend.
              </blockquote>
              <figcaption className="mt-4 text-sm text-subtle">- Bruce Lee</figcaption>
            </motion.figure>
          </div>
        </motion.div>

        <div className="relative flex h-full flex-col justify-end px-4 pb-12 pt-32 sm:px-8">
          <div className="container-x">
            <motion.div ref={nameWrapRef} style={{ x: nameX, y: nameY, scale: nameScale }} className="relative w-max origin-bottom-left will-change-transform">
              <motion.p
                ref={greetRef}
                aria-hidden
                style={{ opacity: pitchOpacity }}
                className="hero-name absolute bottom-0 right-full whitespace-nowrap pb-3 pr-[0.35em] text-[clamp(2.75rem,10vw,8rem)] font-semibold leading-none tracking-tighter"
              >
                Hi there, I'm
              </motion.p>
              <h1 aria-label="Hi there, I'm Shreyas Pathe" className="relative whitespace-nowrap text-[clamp(2.75rem,10vw,8rem)] font-semibold leading-none tracking-tighter">
                <span aria-hidden className="flex flex-row items-baseline gap-[0.22em]">
                  <Letters word={NAME[0]} offset={0} />
                  <Letters word={NAME[1]} offset={NAME[0].length} />
                </span>
                {/* One light sheen across the name once it has landed */}
                <span aria-hidden className="pointer-events-none absolute inset-0 flex flex-row items-baseline gap-[0.22em]">
                  {NAME.map(w => <span key={w} className="hero-sheen inline-block pb-3">{w}</span>)}
                </span>
              </h1>
            </motion.div>

            <motion.div style={{ opacity: factsOpacity, y: factsY, pointerEvents: factsPointer }}>
              <div className="relative mt-10 grid grid-cols-2 gap-6 pt-6 md:mt-12 md:grid-cols-[1fr_1fr_1fr_auto] md:items-center md:gap-8 md:pt-8">
                {/* Divider draws in from the left */}
                <motion.span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-foam/40 via-line-strong to-transparent"
                  initial={{ scaleX: reduce ? 1 : 0 }} animate={{ scaleX: 1 }}
                  transition={{ duration: 1.2, delay: reduce ? 0 : 1, ease: EASE }}
                />
                {facts.map((f, i) => (
                  <motion.div key={f.k} {...intro(1.15 + i * 0.1)}>
                    <div className="caption text-foam/70">{f.k}</div>
                    <div className="title-3 mt-2 flex items-center gap-2 text-fg">
                      {f.img && <img src={f.img} alt="" className="h-5 w-5 rounded-md object-cover" />}
                      {f.v}
                    </div>
                  </motion.div>
                ))}
                <motion.div {...intro(1.45)} className="flex flex-col items-start gap-3 md:flex-row md:flex-wrap">
                  <button onClick={() => scrollToId('projects')} className="btn-primary">
                    View projects <ArrowDown size={14} />
                  </button>
                  <button onClick={() => scrollToId('contact')} className="btn-ghost">
                    Contact <ArrowUpRight size={14} />
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div style={{ opacity: pitchOpacity, top: layout.pitchTop }} className="pointer-events-none absolute inset-x-0 px-4 sm:px-8">
          <p className="container-x max-w-4xl text-base font-medium leading-relaxed text-fg sm:text-4xl sm:font-semibold sm:leading-normal sm:tracking-tight">
            {pitch.map((w, i) => (
              <Word key={i} progress={p} range={[wStart + i * step, wStart + (i + 1) * step]}>{w}</Word>
            ))}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
