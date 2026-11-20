import React, { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { ABOUT_TEXT } from '../constants';
import { ScrollHeader } from './fx/Scroll';

function Word({ w, progress, range }: { w: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const y = useTransform(progress, range, [8, 0]);
  return <motion.span style={{ opacity, y }} className="inline-block mr-[0.25em]">{w}</motion.span>;
}

/** Pinned: the paragraph lights up word by word while the portrait un-masks. */
const About: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const words = ABOUT_TEXT.split(' ');
  const text = useTransform(scrollYProgress, [0.05, 0.85], [0, 1]);
  const clip = useTransform(scrollYProgress, [0, 0.5], ['inset(50% 50% 50% 50% round 24px)', 'inset(0% 0% 0% 0% round 24px)']);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.4, 1]);
  const gray = useTransform(scrollYProgress, [0.4, 0.9], ['grayscale(1)', 'grayscale(0)']);

  return (
    <section id="about" className="relative px-5 md:px-10 pt-28 md:pt-40">
      <div className="mx-auto max-w-7xl">
        <ScrollHeader index="01" label="About" title={<>About <span className="font-serif italic font-normal text-muted">me</span></>} />
      </div>
      <div ref={ref} className="relative h-[260vh]">
        <div className="sticky top-0 flex h-screen items-center">
          <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <p className="lg:col-span-8 text-[1.35rem] md:text-[2rem] leading-[1.35] tracking-[-0.02em] text-fg">
              {words.map((w, i) => (
                <Word key={i} w={w} progress={text} range={[i / words.length, Math.min((i + 3) / words.length, 1)]} />
              ))}
            </p>
            <motion.figure style={{ clipPath: clip }} className="relative hidden lg:block lg:col-span-4 aspect-[4/5] overflow-hidden">
              <motion.img style={{ scale: imgScale, filter: gray }} src="/images/profile-image.jpg" alt="Shreyas Pathe"
                className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent" />
              <figcaption className="absolute bottom-4 left-4">
                <p className="text-lg font-semibold text-fg">Shreyas Pathe</p>
                <p className="font-mono text-xs text-accent">Full Stack Developer</p>
              </figcaption>
            </motion.figure>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
