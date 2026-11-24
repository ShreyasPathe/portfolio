/** Base curve from the design system. Never ease, linear or ease-in-out. */
export const EASE = [0.22, 1, 0.36, 1] as const;

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const top = id === 'hero' ? 0 : el.getBoundingClientRect().top + window.scrollY - 64;
  window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' });
}

export function openPalette() { window.dispatchEvent(new Event('open-cmdk')); }
