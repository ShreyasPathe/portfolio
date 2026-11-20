import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Command, Menu } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import { scrollToId, openPalette } from './fx/Enhancers';

const Navbar: React.FC = () => {
  const [active, setActive] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    ['hero', ...NAV_ITEMS.map(n => n.to)].forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    const tick = () => setTime(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' }));
    tick();
    const t = setInterval(tick, 30_000);
    return () => { obs.disconnect(); clearInterval(t); };
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-4 inset-x-0 z-50 px-4"
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
        <button onClick={() => scrollToId('hero')}
          className="flex items-center gap-2 rounded-full border border-line bg-ink/70 backdrop-blur-xl px-4 py-2.5 text-sm font-medium text-fg">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-accent text-[9px] font-bold text-ink">SP</span>
          <span className="hidden sm:inline">Shreyas Pathe</span>
        </button>

        <nav className="hidden lg:flex items-center gap-1 rounded-full border border-line bg-ink/70 backdrop-blur-xl p-1.5">
          {NAV_ITEMS.map(item => (
            <button key={item.to} onClick={() => scrollToId(item.to)}
              className={`relative rounded-full px-4 py-1.5 text-sm transition-colors ${active === item.to ? 'text-ink' : 'text-muted hover:text-fg'}`}>
              {active === item.to && (
                <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-accent"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
              )}
              <span className="relative">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2 rounded-full border border-line bg-ink/70 backdrop-blur-xl p-1.5">
          <span className="hidden md:inline pl-3 pr-1 font-mono text-xs text-muted">IST {time}</span>
          <button onClick={openPalette} aria-label="Open command palette"
            className="flex items-center gap-1.5 rounded-full bg-white/[0.06] px-3 py-1.5 text-xs text-fg hover:bg-white/10 transition-colors">
            <Command className="h-3.5 w-3.5 hidden lg:block" />
            <Menu className="h-3.5 w-3.5 lg:hidden" />
            <span className="font-mono hidden lg:inline">K</span>
            <span className="lg:hidden">Menu</span>
          </button>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
