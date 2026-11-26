import { useEffect, useRef } from 'react';
import { useLang } from '../LangContext';

const base = import.meta.env.BASE_URL;

type Item = {
  id: string;
  kind: 'video' | 'image';
  shape: 'portrait' | 'reel' | 'wide' | 'landscape';
  cat: { en: string; ua: string } | null;
  title: { en: string; ua: string };
  description: { en: string; ua: string };
};

const ads = { en: 'Product ad', ua: 'Реклама товару' };
const realEstate = { en: 'Real estate', ua: 'Нерухомість' };

const clips: Item[] = [
  {
    id: 'product-ad-reel',
    kind: 'video',
    shape: 'wide',
    cat: ads,
    title: { en: 'Product ad promo', ua: 'Рекламне промо товару' },
    description: { en: 'A 16-second ad with a scroll-stopping hook, before and after, and a clear call to action — for Facebook, Instagram and TikTok ads.', ua: '16-секундна реклама з чіпляючим початком, порівнянням «до і після» та закликом до дії — для реклами у Facebook, Instagram і TikTok.' },
  },
  {
    id: 'ad-sneaker',
    kind: 'video',
    shape: 'landscape',
    cat: ads,
    title: { en: 'Sneaker splash', ua: 'Кросівок у бризках' },
    description: { en: 'A slow-motion splash on wet asphalt — an attention-grabbing opener for a shoe ad.', ua: 'Сповільнений сплеск на мокрому асфальті — яскравий початок для реклами взуття.' },
  },
  {
    id: 'ad-headphones',
    kind: 'video',
    shape: 'landscape',
    cat: ads,
    title: { en: 'Headphones hero shot', ua: 'Навушники: головний кадр' },
    description: { en: 'A sleek rotating packshot with moody light — made for tech product pages.', ua: 'Стильне обертання товару в атмосферному світлі — для сторінок техніки.' },
  },
  {
    id: 'ad-vegetables',
    kind: 'video',
    shape: 'landscape',
    cat: ads,
    title: { en: 'Fresh produce in motion', ua: 'Свіжі овочі в русі' },
    description: { en: 'Sliced vegetables falling onto the board — a lively shot for food and kitchenware brands.', ua: 'Нарізані овочі падають на дошку — живий кадр для брендів їжі та кухонного посуду.' },
  },
  {
    id: 'ad-coffee',
    kind: 'video',
    shape: 'landscape',
    cat: ads,
    title: { en: 'Coffee pour', ua: 'Кава наливається' },
    description: { en: 'An espresso pour into a glass cup — perfect for coffee machines, cups and cafés.', ua: 'Еспресо наливається у скляну чашку — для кавоварок, посуду й кав’ярень.' },
  },
  {
    id: 'ad-couple-kitchen',
    kind: 'video',
    shape: 'wide',
    cat: ads,
    title: { en: 'Lifestyle scene with people', ua: 'Лайфстайл-сцена з людьми' },
    description: { en: 'A couple cooking together in a bright kitchen — real-life context for home and kitchen products, no photoshoot needed.', ua: 'Пара готує разом у світлій кухні — живий контекст для товарів для дому й кухні без фотосесії.' },
  },
  {
    id: 'real-estate-reel',
    kind: 'video',
    shape: 'wide',
    cat: realEstate,
    title: { en: 'Property promo from renders', ua: 'Промо нерухомості з рендерів' },
    description: { en: 'Static 3D renders brought to life with smooth camera moves — for developer sites, YouTube and ads.', ua: 'Статичні 3D-рендери оживають завдяки плавному руху камери — для сайтів забудовників, YouTube і реклами.' },
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
    <figure className={clip.shape === 'wide' ? 'sm:col-span-2' : undefined}>
      <div className={`relative ${clip.shape === 'reel' ? 'aspect-[9/16]' : clip.shape === 'wide' || clip.shape === 'landscape' ? 'aspect-video' : 'aspect-[4/5]'} overflow-hidden bg-paper-2`}>
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
        <p className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-amber">{clip.cat ? clip.cat[lang] : t.motion.food}</p>
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
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:col-span-8">
          {clips.map((c) => <Clip key={c.id} clip={c} />)}
        </div>
      </div>
    </section>
  );
}
