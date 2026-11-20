import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CERTIFICATIONS_DATA } from '../constants';
import { Reveal } from './fx/Enhancers';
import { ScrollHeader } from './fx/Scroll';

const Certifications: React.FC = () => (
  <section id="certifications" className="relative px-5 md:px-10 py-28 md:py-40 border-t border-line">
    <div className="mx-auto max-w-7xl">
      <ScrollHeader index="05" label="Credentials" align="right" title={<>Certifi<span className="font-serif italic font-normal text-muted">cations</span></>} />

      <div className="border-t border-line">
        {CERTIFICATIONS_DATA.map((c, i) => (
          <Reveal key={c.name} delay={(i % 3) * 0.05}>
            <a href={c.credentialUrl} target="_blank" rel="noreferrer"
              className="group relative grid grid-cols-[auto_1fr_auto] md:grid-cols-[3rem_auto_1fr_14rem_auto] items-center gap-4 md:gap-6 border-b border-line py-5 md:py-6 overflow-hidden">
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-y-100" />
              <span className="relative hidden md:block font-mono text-xs text-muted group-hover:text-ink">{String(i + 1).padStart(2, '0')}</span>
              <span className="relative grid h-11 w-11 place-items-center rounded-xl p-2" style={{ background: c.logoBgColor }}>
                <img src={c.image} alt={c.issuer} loading="lazy" className="max-h-full max-w-full object-contain" />
              </span>
              <span className="relative text-lg md:text-2xl font-medium tracking-tight text-fg group-hover:text-ink transition-colors">
                {c.name}
                <span className="block md:hidden mt-0.5 font-mono text-[11px] text-muted group-hover:text-ink/70">{c.issuer}</span>
              </span>
              <span className="relative hidden md:block font-mono text-xs uppercase tracking-wider text-muted group-hover:text-ink/70">{c.issuer}</span>
              <ArrowUpRight className="relative h-5 w-5 text-muted transition-transform group-hover:text-ink group-hover:rotate-45" />
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Certifications;
