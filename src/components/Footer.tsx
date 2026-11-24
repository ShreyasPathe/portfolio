import { useEffect, useState } from 'react';
import { ArrowUp, GithubLogo, LinkedinLogo } from '@phosphor-icons/react';
import { SOCIAL_LINKS } from '../constants';
import { scrollToId } from '../lib/motion';

export default function Footer() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' }));
    tick();
    const t = setInterval(tick, 30_000);
    return () => clearInterval(t);
  }, []);

  return (
    <footer className="mt-24">
      <div className="container-x flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p className="text-2xl font-semibold tracking-tight sm:text-3xl">
            See you <span className="text-aurora">around.</span>
          </p>
          <p className="body-3 mt-3">© {new Date().getFullYear()} Shreyas Pathe.</p>
        </div>
        <div className="flex items-center gap-4">
          <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-subtle transition-colors duration-300 hover:text-fg">
            <LinkedinLogo size={22} />
          </a>
          <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-subtle transition-colors duration-300 hover:text-fg">
            <GithubLogo size={22} />
          </a>
          <span className="font-mono text-xs text-subtle">IST {time}</span>
          <button onClick={() => scrollToId('hero')} className="btn-ghost">
            Back to top <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
