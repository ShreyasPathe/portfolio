import { useLayoutEffect, useRef, useState, useCallback } from 'react';
import { useScroll, useSpring, useMotionValueEvent } from 'framer-motion';
import { EXPERIENCE_DATA } from '../constants';
import { Eyebrow, Reveal } from './ui';

type Geo = { w: number; h: number; d: string; nodes: { x: number; y: number }[] };

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** Inclusive months between two month-labels. "Present" uses today's month. */
function roleDuration(period: string, now = new Date()): string {
  const [from, to] = period.split(/\s*[–—-]\s*/);
  const start = from?.trim().split(/\s+/);
  if (!start || start.length < 2) return '';
  const startM = MONTHS.indexOf(start[0]);
  const startY = Number(start[1]);
  if (startM < 0 || !startY) return '';
  const end = /present/i.test(to ?? '')
    ? { m: now.getMonth(), y: now.getFullYear() }
    : (() => {
        const parts = to?.trim().split(/\s+/) ?? [];
        return { m: MONTHS.indexOf(parts[0] ?? ''), y: Number(parts[1]) };
      })();
  if (end.m < 0 || !end.y) return '';
  const total = Math.max(1, (end.y - startY) * 12 + (end.m - startM) + 1);
  const years = Math.floor(total / 12);
  const months = total % 12;
  return [
    years ? `${years} ${years === 1 ? 'yr' : 'yrs'}` : '',
    months ? `${months} ${months === 1 ? 'mo' : 'mos'}` : '',
  ].filter(Boolean).join(' ');
}

/** Builds a wave down the page: alternating half-waves between every node, so the line snakes instead of dropping straight. */
function buildPath(w: number, h: number, nodeYs: number[], desktop: boolean): Geo {
  const cx = desktop ? w / 2 : 16;
  const amp = desktop ? Math.min(80, w * 0.07) : 10;
  const halfWave = desktop ? 240 : 140;
  const k = amp / 0.75; // control offset that yields a peak of `amp`
  const stops = [0, ...nodeYs, h];
  let side = 1;
  let d = `M ${cx} 0`;
  for (let i = 0; i < stops.length - 1; i++) {
    const a = stops[i];
    const span = stops[i + 1] - a;
    if (span <= 0) continue;
    const n = Math.max(1, Math.round(span / halfWave));
    const step = span / n;
    for (let j = 0; j < n; j++) {
      const y0 = a + j * step;
      const y1 = y0 + step;
      const x = cx + side * k;
      d += ` C ${x} ${y0 + step / 3}, ${x} ${y0 + (2 * step) / 3}, ${cx} ${y1}`;
      side *= -1;
    }
  }
  return { w, h, d, nodes: nodeYs.map(y => ({ x: cx, y })) };
}

export default function Experience() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const trackRef = useRef<SVGPathElement>(null);
  const fillRef = useRef<SVGPathElement>(null);
  const glowRef = useRef<SVGPathElement>(null);
  const headRef = useRef<SVGGElement>(null);
  const lookup = useRef<{ total: number; ys: Float32Array; ls: Float32Array } | null>(null);

  const [geo, setGeo] = useState<Geo | null>(null);
  const [lit, setLit] = useState(0);
  const [open, setOpen] = useState<Record<number, boolean>>({});

  // Measure layout, rebuild the wave on resize.
  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const measure = () => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      const desktop = w >= 720;
      const ys = itemRefs.current.flatMap(el => (el && el.offsetParent ? [el.offsetTop + 40] : []));
      setGeo(buildPath(w, h, ys, desktop));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [open]);

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start 65%', 'end 65%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.0005 });

  const update = useCallback((v: number) => {
    const lk = lookup.current;
    const path = trackRef.current;
    if (!lk || !geo || !path) return;
    const targetY = Math.max(0, Math.min(1, v)) * geo.h;
    // y is monotonic along this path, so binary search length by y.
    let lo = 0, hi = lk.ys.length - 1;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (lk.ys[mid] < targetY) lo = mid + 1; else hi = mid;
    }
    const len = lk.ls[lo];
    const off = `${lk.total - len}`;
    if (fillRef.current) fillRef.current.style.strokeDashoffset = off;
    if (glowRef.current) glowRef.current.style.strokeDashoffset = off;
    const pt = path.getPointAtLength(len);
    if (headRef.current) {
      headRef.current.style.transform = `translate(${pt.x}px, ${pt.y}px)`;
      headRef.current.style.opacity = v > 0.001 && v < 0.999 ? '1' : '0';
    }
    const count = geo.nodes.filter(n => n.y <= targetY + 1).length;
    setLit(c => (c === count ? c : count));
  }, [geo]);

  // Sample the path once per geometry so scroll updates are a binary search, not a layout read.
  useLayoutEffect(() => {
    const p = trackRef.current;
    if (!p || !geo) return;
    const total = p.getTotalLength();
    const N = 600;
    const ys = new Float32Array(N + 1);
    const ls = new Float32Array(N + 1);
    for (let i = 0; i <= N; i++) {
      const l = (total * i) / N;
      ls[i] = l;
      ys[i] = p.getPointAtLength(l).y;
    }
    lookup.current = { total, ys, ls };
    [fillRef.current, glowRef.current].forEach(el => {
      if (!el) return;
      el.style.strokeDasharray = `${total}`;
      el.style.strokeDashoffset = `${total}`;
    });
    update(progress.get());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geo]);

  useMotionValueEvent(progress, 'change', update);

  return (
    <section id="experience" className="section">
      <div className="container-x">
        <Reveal>
          <Eyebrow index="02">Experience</Eyebrow>
          <h2 className="heading-2 text-gradient mt-6 max-w-prose">Where I have been building.</h2>
          <p className="body-1 mt-6 max-w-prose">Four roles across agencies and startups, from Mumbai to Ghent.</p>
        </Reveal>

        <div ref={wrapRef} className="relative mt-16">
          {geo && (
            <svg
              aria-hidden
              className="pointer-events-none absolute left-0 top-0 overflow-visible"
              width={geo.w} height={geo.h} viewBox={`0 0 ${geo.w} ${geo.h}`}
            >
              <defs>
                <linearGradient id="exp-fill" x1="0" y1="0" x2="0" y2={geo.h} gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#7C8CFF" />
                  <stop offset="1" stopColor="#5FE1F0" />
                </linearGradient>
              </defs>
              <path ref={trackRef} d={geo.d} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={1.5} />
              <path ref={glowRef} d={geo.d} fill="none" stroke="#5FE1F0" strokeOpacity={0.18} strokeWidth={10} strokeLinecap="round" />
              <path ref={fillRef} d={geo.d} fill="none" stroke="url(#exp-fill)" strokeWidth={2} strokeLinecap="round" />
              {geo.nodes.map((n, i) => (
                <g key={i} transform={`translate(${n.x} ${n.y})`}>
                  <circle
                    r={14} fill="#5FE1F0"
                    style={{ opacity: i < lit ? 0.12 : 0, transform: `scale(${i < lit ? 1 : 0.4})`, transition: 'opacity 500ms cubic-bezier(0.22,1,0.36,1), transform 500ms cubic-bezier(0.22,1,0.36,1)' }}
                  />
                  <circle
                    r={6} strokeWidth={1.5}
                    fill={i < lit ? '#5FE1F0' : '#070A1F'}
                    stroke={i < lit ? '#5FE1F0' : 'rgba(255,255,255,0.3)'}
                    style={{ transition: 'fill 300ms, stroke 300ms' }}
                  />
                </g>
              ))}
              <g ref={headRef} style={{ opacity: 0 }}>
                <circle r={4} fill="#FFFFFF" style={{ filter: 'drop-shadow(0 0 8px rgba(95,225,240,0.95))' }} />
              </g>
            </svg>
          )}

          {EXPERIENCE_DATA.map((item, i) => {
            const right = i % 2 === 1;
            const on = i < lit;
            return (
              <div
                key={`${item.company}-${item.period}`}
                ref={el => { itemRefs.current[i] = el; }}
                className="relative grid pb-24 pl-12 last:pb-0 min-[720px]:grid-cols-2 min-[720px]:gap-x-48 min-[720px]:pl-0"
              >
                <article
                  className={`rounded-3xl border bg-surface-1 p-6 transition-[opacity,border-color,transform] duration-500 ease-out sm:p-8 ${
                    right ? 'min-[720px]:col-start-2' : 'min-[720px]:col-start-1'
                  } ${on ? 'border-line-strong opacity-100' : 'border-line opacity-40 min-[720px]:translate-y-2'}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex items-center gap-3">
                      {item.image && <img src={item.image} alt="" className="h-10 w-10 rounded-xl object-cover" loading="lazy" />}
                      <div>
                        <div className="title-3">{item.company}</div>
                        <div className="body-3">{item.location}</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <span className="caption">{item.period}</span>
                    <span className="caption text-foam/70">{roleDuration(item.period)}</span>
                  </div>
                  <h3 className="heading-4 mt-2">{item.title}</h3>
                  <ul className="mt-6 space-y-3">
                    {item.description.map((d, j) => (
                      <li key={j} className={`body-3 flex gap-3 leading-relaxed ${j > 0 && !open[i] ? 'hidden' : ''}`}>
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-subtle" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                  {item.description.length > 1 && (
                    <button
                      type="button"
                      aria-expanded={!!open[i]}
                      onClick={() => setOpen(s => ({ ...s, [i]: !s[i] }))}
                      className="mt-4 text-sm font-medium text-foam/80 underline-offset-4 transition-colors hover:text-fg hover:underline"
                    >
                      {open[i] ? 'Read less' : 'Read more'}
                    </button>
                  )}
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
