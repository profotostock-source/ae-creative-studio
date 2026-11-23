import { useEffect, useRef } from 'react';
import { useLang } from '../LangContext';

const base = import.meta.env.BASE_URL;

type Item = {
  id: string;
  kind: 'video' | 'image';
  shape: 'portrait' | 'reel';
  cat: { en: string; ua: string } | null;
  title: { en: string; ua: string };
  description: { en: string; ua: string };
};

const pets = { en: 'Pet treats', ua: 'Смаколики для тварин' };

const clips: Item[] = [
  {
    id: 'dog-treats-reel',
    kind: 'video',
    shape: 'reel',
    cat: pets,
    title: { en: 'Dog bakery promo Reel', ua: 'Reel для пекарні для собак' },
    description: { en: '15-second vertical Reel with elegant on-brand titles, built from the brand’s own product photos.', ua: '15-секундний вертикальний ролик з елегантними титрами у кольорах бренду, зроблений з власних фото продукції.' },
  },
  {
    id: 'pet-bakery-reel',
    kind: 'video',
    shape: 'reel',
    cat: pets,
    title: { en: 'Festive pet bakery Reel', ua: 'Святковий Reel для пет-пекарні' },
    description: { en: 'Cosy Christmas mood for a pet treat shop — ready for Instagram and TikTok.', ua: 'Затишний різдвяний настрій для магазину смаколиків — готово для Instagram і TikTok.' },
  },
  {
    id: 'chocolate-waffle',
    kind: 'video',
    shape: 'portrait',
    cat: null,
    title: { en: 'Chocolate waffle with fruit', ua: 'Шоколадна вафля з фруктами' },
    description: { en: 'Slow push-in with a chocolate drizzle — made for menus and Reels.', ua: 'Плавний наїзд камери й шоколадний соус — для меню та Reels.' },
  },
  {
    id: 'breakfast-plate',
    kind: 'video',
    shape: 'portrait',
    cat: null,
    title: { en: 'Classic breakfast plate', ua: 'Класичний сніданок' },
    description: { en: 'Eggs, bacon and fresh coffee with gentle steam for a cosy café mood.', ua: 'Яйця, бекон і свіжа кава з легкою парою — затишний настрій кав’ярні.' },
  },
];

function Clip({ clip }: { clip: Item }) {
  const { t, lang } = useLang();
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  // Play only while visible (saves battery and data); never autoplay with reduced motion
  useEffect(() => {
    const v = ref.current;
    if (!v || reduced || clip.kind !== 'video') return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [reduced, clip.kind]);

  return (
    <figure>
      <div className={`relative ${clip.shape === 'reel' ? 'aspect-[9/16]' : 'aspect-[4/5]'} overflow-hidden bg-paper-2`}>
        {clip.kind === 'video' ? (
          <video
            ref={ref}
            className="h-full w-full object-cover"
            src={`${base}motion/${clip.id}.mp4`}
            poster={`${base}motion/${clip.id}-poster.webp`}
            muted
            loop
            playsInline
            preload="metadata"
            controls={reduced}
            aria-label={`${clip.title[lang]}. ${clip.description[lang]}`}
          />
        ) : (
          <img
            className="h-full w-full object-cover"
            src={`${base}motion/${clip.id}.webp`}
            alt={`${clip.title[lang]}. ${clip.description[lang]}`}
            loading="lazy"
            decoding="async"
          />
        )}
        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-ink/70 px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-paper">
          {clip.kind === 'video' ? t.motion.badge : t.motion.photo}
        </span>
      </div>
      <figcaption className="mt-3">
        <p className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-amber">{clip.cat ? clip.cat[lang] : t.work.cats.food}</p>
        <h3 className="mt-1 font-serif text-xl leading-tight">{clip.title[lang]}</h3>
        <p className="mt-1 text-sm text-ink-soft">{clip.description[lang]}</p>
      </figcaption>
    </figure>
  );
}

export default function Motion() {
  const { t } = useLang();
  return (
    <section id="motion" aria-labelledby="motion-title" className="border-t border-line">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:grid-cols-12 md:px-8 md:py-32">
        <div className="md:col-span-4">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-amber">{t.motion.eyebrow}</p>
          <h2 id="motion-title" className="mt-4 font-serif text-4xl leading-[1.05] md:text-5xl">{t.motion.title}</h2>
          <p className="mt-6 text-ink-soft">{t.motion.text}</p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-paper-2 px-3 py-1 text-xs text-ink-soft">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-amber" />
            {t.work.label}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:col-span-8">
          {clips.map((c) => <Clip key={c.id} clip={c} />)}
        </div>
      </div>
    </section>
  );
}
