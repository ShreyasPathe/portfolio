import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Linkedin, Mail } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';
import { Reveal } from './fx/Enhancers';

const Contact: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.6, 1]);
  const spread = useTransform(scrollYProgress, [0, 1], ['-0.02em', '-0.055em']);
  const glow = useTransform(scrollYProgress, [0, 1], [0.2, 1]);
  return (
  <section ref={ref} id="contact" className="relative overflow-hidden px-5 md:px-10 py-28 md:py-40 border-t border-line">
    <motion.div style={{ opacity: glow }} aria-hidden className="absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[160px]" />
    <div className="relative mx-auto max-w-7xl text-center">
      <Reveal>
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-muted">
          <span className="text-accent">06.</span> What's Next?
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <motion.h2 style={{ scale, letterSpacing: spread }} className="mt-8 font-semibold leading-[0.9] text-fg text-[clamp(3.5rem,12vw,11rem)]">
          Get In <span className="font-serif italic font-normal text-accent">Touch</span>
        </motion.h2>
      </Reveal>
      <Reveal delay={0.16}>
        <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-muted">
          I'm currently open to new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>
      </Reveal>
      <Reveal delay={0.24} className="mt-12 flex flex-col sm:flex-row justify-center gap-3">
        <a href={SOCIAL_LINKS.email} target="_blank" rel="noreferrer"
          className="group inline-flex items-center justify-center gap-3 rounded-full bg-accent px-8 py-4 font-medium text-ink transition-transform hover:scale-[1.03]">
          <Mail className="h-5 w-5" /> Send Email <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
        </a>
        <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer"
          className="group inline-flex items-center justify-center gap-3 rounded-full border border-line bg-white/[0.03] px-8 py-4 font-medium text-fg transition-colors hover:border-white/30">
          <Linkedin className="h-5 w-5" /> Connect on LinkedIn <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
        </a>
      </Reveal>
    </div>
  </section>
  );
};

export default Contact;
