import { useEffect, useRef } from 'react';
import type { PortfolioItem } from '../data/portfolio';
import { useLang } from '../LangContext';

interface Props {
  items: PortfolioItem[];
  index: number;
  onClose: () => void;
  onIndex: (i: number) => void;
}

export default function Lightbox({ items, index, onClose, onIndex }: Props) {
  const { t, lang } = useLang();
  const item = items[index];
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const prev = () => onIndex((index - 1 + items.length) % items.length);
  const next = () => onIndex((index + 1) % items.length);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
      opener?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'Tab' && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>('button');
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  });

  // Preload neighbours for snappy navigation
  useEffect(() => {
    [items[(index + 1) % items.length], items[(index - 1 + items.length) % items.length]].forEach((it) => {
      const img = new Image();
      img.src = it.webp1280;
    });
  }, [index, items]);

  const btn = 'grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20';

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.brand.name} — ${item.title[lang]}`}
      className="fade-in fixed inset-0 z-50 flex flex-col bg-ink/95"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="flex items-center justify-between px-4 py-3 text-paper md:px-6">
        <p className="text-xs uppercase tracking-[0.2em] text-paper/70" aria-live="polite">
          {index + 1} {t.lightbox.of} {items.length}
        </p>
        <button ref={closeRef} type="button" onClick={onClose} aria-label={t.lightbox.close} className={btn}>
          <svg aria-hidden width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 3l12 12M15 3L3 15" /></svg>
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 md:px-20" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <img
          key={item.id}
          src={item.webp1280}
          onError={(e) => { (e.currentTarget as HTMLImageElement).src = item.src; }}
          alt={`${item.brand.name} — ${item.title[lang]}. ${item.description[lang]}`}
          className="fade-in max-h-full max-w-full object-contain shadow-2xl"
        />
        <button type="button" onClick={prev} aria-label={t.lightbox.prev} className={`${btn} absolute left-3 top-1/2 -translate-y-1/2 md:left-6`}>
          <svg aria-hidden width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M11 3L5 9l6 6" /></svg>
        </button>
        <button type="button" onClick={next} aria-label={t.lightbox.next} className={`${btn} absolute right-3 top-1/2 -translate-y-1/2 md:right-6`}>
          <svg aria-hidden width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 3l6 6-6 6" /></svg>
        </button>
      </div>

      <div className="px-5 py-4 text-center text-paper md:py-5">
        <p className="text-[0.7rem] uppercase tracking-[0.2em] text-amber">{item.brand.name} · {t.work.label}</p>
        <p className="mt-1 font-serif text-xl">{item.title[lang]}</p>
        <p className="mt-0.5 text-sm text-paper/70">{item.description[lang]}</p>
      </div>
    </div>
  );
}
