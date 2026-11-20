import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';

const Footer: React.FC = () => (
  <footer className="relative overflow-hidden border-t border-line px-5 md:px-10 pt-12">
    <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="font-mono text-xs text-muted">Designed &amp; Built by Shreyas Pathe</p>
      <div className="flex items-center gap-5 text-muted">
        <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-accent transition-colors"><Github className="h-4 w-4" /></a>
        <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-accent transition-colors"><Linkedin className="h-4 w-4" /></a>
        <a href={SOCIAL_LINKS.email} target="_blank" rel="noreferrer" aria-label="Email" className="hover:text-accent transition-colors"><Mail className="h-4 w-4" /></a>
        <span className="h-4 w-px bg-line" />
        <span className="font-mono text-xs">© {new Date().getFullYear()}</span>
      </div>
    </div>
    <p aria-hidden className="text-outline select-none text-center font-semibold tracking-[-0.06em] leading-[0.8] text-[22vw] mt-10 -mb-[3vw]">
      SHREYAS
    </p>
  </footer>
);

export default Footer;
