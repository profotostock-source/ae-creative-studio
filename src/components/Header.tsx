import { useEffect, useState } from 'react';
import { useLang } from '../LangContext';
import type { Lang } from '../data/portfolio';

export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`font-serif text-[1.35rem] leading-none tracking-tight ${className}`}>
      A<span className="italic text-amber">&amp;</span>E <span className="font-sans text-[0.68rem] font-medium uppercase tracking-[0.22em] align-middle">Creative Studio</span>
    </span>
  );
}

export function LangToggle() {
  const { lang, setLang, t } = useLang();
  const opts: { v: Lang; label: string }[] = [
    { v: 'en', label: 'EN' },
    { v: 'ua', label: 'UA' },
  ];
  return (
    <div role="group" aria-label={t.nav.lang} className="flex rounded-full border border-line p-0.5 text-xs font-medium">
      {opts.map((o) => (
        <button
          key={o.v}
          type="button"
          aria-pressed={lang === o.v}
          onClick={() => setLang(o.v)}
          className={`rounded-full px-2.5 py-1 transition-colors ${lang === o.v ? 'bg-ink text-paper' : 'text-ink-soft hover:text-ink'}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export default function Header() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const links = [
    ['#work', t.nav.work],
    ['#services', t.nav.services],
    ['#process', t.nav.process],
    ['#about', t.nav.about],
    ['#contact', t.nav.contact],
  ] as const;

  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${scrolled || open ? 'bg-paper/90 backdrop-blur border-b border-line' : 'bg-transparent border-b border-transparent'}`}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded focus:bg-ink focus:px-3 focus:py-2 focus:text-paper">
        {t.nav.skip}
      </a>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        <a href="#top" aria-label="A&E Creative Studio — home"><Logo /></a>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {links.map(([href, label]) => (
            <a key={href} href={href} className="text-sm text-ink-soft transition-colors hover:text-ink">{label}</a>
          ))}
          <LangToggle />
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <LangToggle />
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.close : t.nav.menu}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-line"
          >
            <span aria-hidden className="relative block h-3 w-4">
              <span className={`absolute left-0 h-px w-4 bg-ink transition-transform ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 top-1.5 h-px w-4 bg-ink transition-opacity ${open ? 'opacity-0' : ''}`} />
              <span className={`absolute left-0 h-px w-4 bg-ink transition-transform ${open ? 'top-1.5 -rotate-45' : 'top-3'}`} />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="fade-in border-t border-line bg-paper px-5 pb-6 md:hidden">
          <ul className="flex flex-col">
            {links.map(([href, label]) => (
              <li key={href}>
                <a href={href} onClick={() => setOpen(false)} className="block border-b border-line py-4 font-serif text-2xl">{label}</a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
