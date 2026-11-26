import { useMemo, useState } from 'react';
import { brandOrder, brands, portfolio, type CategoryKey, type PortfolioItem } from '../data/portfolio';
import { useLang } from '../LangContext';
import Picture from './Picture';
import Lightbox from './Lightbox';

type Filter = 'all' | CategoryKey;
const FILTERS: Filter[] = ['all', 'fragrance', 'watches', 'jewelry', 'leather'];

// 6-column layout: two large cards, then three smaller ones
const SPAN = ['col-span-2 md:col-span-3', 'md:col-span-3', 'md:col-span-2', 'md:col-span-2', 'md:col-span-2'];
const SIZES = [
  '(min-width: 768px) 50vw, 100vw',
  '(min-width: 768px) 50vw, 50vw',
  '(min-width: 768px) 33vw, 50vw',
  '(min-width: 768px) 33vw, 50vw',
  '(min-width: 768px) 33vw, 50vw',
];

function Card({ item, i, onOpen }: { item: PortfolioItem; i: number; onOpen: () => void }) {
  const { t, lang } = useLang();
  const landscape = item.width > item.height;
  return (
    <li className={SPAN[i] ?? 'md:col-span-2'}>
      <button
        type="button"
        onClick={onOpen}
        aria-label={`${t.work.open}: ${item.brand.name} — ${item.title[lang]}`}
        className="group block w-full text-left"
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-paper-2">
          {landscape && (
            <img src={item.webp640} alt="" aria-hidden className="absolute inset-0 h-full w-full scale-110 object-cover opacity-60 blur-2xl" loading="lazy" />
          )}
          <Picture
            item={item}
            alt={`${item.brand.name} — ${item.title[lang]}. ${item.description[lang]}`}
            sizes={SIZES[i] ?? '33vw'}
            className={`absolute inset-0 h-full w-full transition duration-700 ease-out group-hover:scale-[1.025] ${landscape ? 'object-contain' : 'object-cover'}`}
          />
          <span className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/5" />
        </div>
        <div className="mt-3 flex items-baseline justify-between gap-3">
          <p className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-amber">{t.work.cats[item.brand.category]}</p>
          <p className="text-[0.68rem] uppercase tracking-[0.18em] text-ink-soft">{item.brand.name}</p>
        </div>
        <h4 className="mt-1 font-serif text-xl leading-tight">{item.title[lang]}</h4>
        <p className="mt-1 text-sm text-ink-soft">{item.description[lang]}</p>
      </button>
    </li>
  );
}

export default function Portfolio() {
  const { t, lang } = useLang();
  const [filter, setFilter] = useState<Filter>('all');
  const [open, setOpen] = useState<number | null>(null);

  const visibleBrands = useMemo(
    () => brandOrder.filter((b) => filter === 'all' || brands[b].category === filter),
    [filter],
  );
  const visibleItems = useMemo(
    () => visibleBrands.flatMap((b) => portfolio.filter((p) => p.brand.id === b)),
    [visibleBrands],
  );

  return (
    <section id="work" aria-labelledby="work-title" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <div className="grid gap-6 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-amber">{t.work.eyebrow}</p>
          <h2 id="work-title" className="mt-4 font-serif text-4xl leading-[1.05] md:text-6xl">{t.work.title}</h2>
        </div>
        <p className="text-ink-soft md:col-span-5">{t.work.text}</p>
      </div>

      <div role="group" aria-label={t.work.filtersLabel} className="mt-10 -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-wrap md:px-0">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm transition-colors ${
              filter === f ? 'border-ink bg-ink text-paper' : 'border-line text-ink-soft hover:border-ink hover:text-ink'
            }`}
          >
            {f === 'all' ? t.work.all : t.work.cats[f]}
          </button>
        ))}
      </div>

      <div className="mt-14 space-y-24">
        {visibleBrands.map((b) => {
          const brand = brands[b];
          const items = portfolio.filter((p) => p.brand.id === b);
          return (
            <article key={`${b}-${filter}`} aria-labelledby={`brand-${b}`} className="fade-up">
              <header className="mb-8 grid gap-4 border-t border-line pt-6 md:grid-cols-12">
                <div className="md:col-span-5">
                  <h3 id={`brand-${b}`} className="font-serif text-3xl tracking-wide md:text-4xl">{brand.name}</h3>
                  <p className="mt-1 text-sm text-ink-soft">{t.work.cats[brand.category]} · {items.length} {t.work.images}</p>
                </div>
                <div className="md:col-span-7">
                  <p className="text-ink-soft">{brand.summary[lang]}</p>
                </div>
              </header>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-6 md:gap-x-6">
                {items.map((item, i) => (
                  <Card key={item.id} item={item} i={i} onOpen={() => setOpen(visibleItems.indexOf(item))} />
                ))}
              </ul>
            </article>
          );
        })}
      </div>

      {open !== null && (
        <Lightbox items={visibleItems} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />
      )}
    </section>
  );
}
