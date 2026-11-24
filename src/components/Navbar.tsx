import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Command, List } from '@phosphor-icons/react';
import { NAV_ITEMS } from '../constants';
import { EASE, scrollToId, openPalette } from '../lib/motion';

export default function Navbar() {
  const [active, setActive] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    ['hero', ...NAV_ITEMS.map(n => n.to)].forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    // Passive, cheap: only flips a boolean once past the top.
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { obs.disconnect(); window.removeEventListener('scroll', onScroll); };
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 px-4 pt-4 text-fg`}>
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border px-2 py-2 transition-[background-color,border-color] duration-500 ease-out ${
          scrolled ? 'border-line bg-surface-1/80 backdrop-blur-xl' : 'border-transparent bg-transparent'
        }`}
      >
        <button onClick={() => scrollToId('hero')} className="flex items-center gap-3 rounded-full px-2 py-1" aria-label="Back to top">
          <img src="/images/profile-image.png" alt="" className="h-8 w-8 rounded-full object-cover ring-1 ring-line" />
          <span className="title-3 hidden sm:inline">Shreyas Pathe</span>
        </button>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV_ITEMS.map((item, i) => (
            <motion.button
              key={item.to}
              onClick={() => scrollToId(item.to)}
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: Math.min(0.2 + i * 0.06, 0.4), ease: EASE }}
              className={`relative rounded-full px-4 py-2 text-sm transition-colors duration-300 ${active === item.to ? 'text-fg' : 'text-muted hover:text-fg'}`}
            >
              {active === item.to && (
                <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-surface-3" transition={{ duration: 0.5, ease: EASE }} />
              )}
              <span className="relative">{item.label}</span>
            </motion.button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
        <button onClick={openPalette} aria-label="Open command menu" className="btn-ghost">
          <Command size={14} className="hidden md:block" />
          <List size={14} className="md:hidden" />
          <span className="hidden font-mono md:inline">K</span>
          <span className="md:hidden">Menu</span>
        </button>
        </div>
      </div>
    </header>
  );
}
