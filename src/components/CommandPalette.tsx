import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlass, ArrowRight, GithubLogo, LinkedinLogo, EnvelopeSimple, Hash } from '@phosphor-icons/react';
import { NAV_ITEMS, SOCIAL_LINKS } from '../constants';
import { EASE, scrollToId } from '../lib/motion';

type Cmd = { label: string; hint: string; icon: typeof Hash; run: () => void };

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);

  useEffect(() => {
    const show = () => { setQ(''); setActive(0); setOpen(true); };
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(o => { if (!o) { setQ(''); setActive(0); } return !o; });
      }
      if (e.key === 'Escape') setOpen(false);
    };
    const onOpen = show;
    window.addEventListener('keydown', onKey);
    window.addEventListener('open-cmdk', onOpen);
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('open-cmdk', onOpen); };
  }, []);

  const cmds: Cmd[] = [
    { label: 'Home', hint: 'Section', icon: Hash, run: () => scrollToId('hero') },
    ...NAV_ITEMS.map(n => ({ label: n.label, hint: 'Section', icon: Hash, run: () => scrollToId(n.to) })),
    { label: 'GitHub', hint: 'Link', icon: GithubLogo, run: () => window.open(SOCIAL_LINKS.github, '_blank') },
    { label: 'LinkedIn', hint: 'Link', icon: LinkedinLogo, run: () => window.open(SOCIAL_LINKS.linkedin, '_blank') },
    { label: 'Send email', hint: 'Link', icon: EnvelopeSimple, run: () => window.open(SOCIAL_LINKS.email, '_blank') },
  ];
  // Rank: label starts with query > a word starts with it > contains it anywhere.
  const needle = q.trim().toLowerCase();
  const rank = (label: string) => {
    const l = label.toLowerCase();
    if (l.startsWith(needle)) return 0;
    if (l.split(/\s+/).some(w => w.startsWith(needle))) return 1;
    return l.includes(needle) ? 2 : -1;
  };
  const list = needle
    ? cmds.map(c => ({ c, r: rank(c.label) })).filter(x => x.r >= 0).sort((a, b) => a.r - b.r).map(x => x.c)
    : cmds;
  const exec = (c?: Cmd) => { if (!c) return; setOpen(false); setTimeout(c.run, 60); };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center bg-ink/70 px-4 pt-24 backdrop-blur-sm"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            role="dialog" aria-modal="true" aria-label="Command menu"
            initial={{ opacity: 0, y: -8, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.3, ease: EASE }}
            onClick={e => e.stopPropagation()}
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-surface-1 shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <MagnifyingGlass size={16} className="text-muted" />
              <input
                autoFocus value={q} aria-label="Search commands"
                onChange={e => { setQ(e.target.value); setActive(0); }}
                onKeyDown={e => {
                  if (e.key === 'ArrowDown') { e.preventDefault(); setActive(a => Math.min(a + 1, list.length - 1)); }
                  if (e.key === 'ArrowUp') { e.preventDefault(); setActive(a => Math.max(a - 1, 0)); }
                  if (e.key === 'Enter') exec(list[active]);
                }}
                placeholder="Jump to a section or link"
                className="body-3 w-full bg-transparent py-4 text-fg placeholder:text-subtle outline-none"
              />
              <kbd className="rounded-md border border-line px-2 py-0.5 font-mono text-xs text-subtle">esc</kbd>
            </div>
            <ul className="max-h-80 overflow-y-auto p-2">
              {list.length === 0 && <li className="body-3 px-3 py-6 text-center">No matches. Try “projects” or “email”.</li>}
              {list.map((c, i) => (
                <li key={c.label}>
                  <button
                    onMouseEnter={() => setActive(i)} onClick={() => exec(c)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors duration-300 ${i === active ? 'bg-surface-3 text-fg' : 'text-muted'}`}
                  >
                    <c.icon size={16} />
                    <span className="flex-1">{c.label}</span>
                    <span className="font-mono text-xs text-subtle">{c.hint}</span>
                    {i === active && <ArrowRight size={14} />}
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
