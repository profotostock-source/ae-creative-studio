import { LangProvider, useLang } from './LangContext';
import Header, { Logo } from './components/Header';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Picture from './components/Picture';
import Motion from './components/Motion';
import Pricing from './components/Pricing';
import { portfolio } from './data/portfolio';

const heroItem = portfolio.find((p) => p.src.endsWith('02_fleur_ivoire.png'))!;

function Eyebrow({ children }: { children: string }) {
  return <p className="text-xs font-medium uppercase tracking-[0.22em] text-amber">{children}</p>;
}

function Hero() {
  const { t, lang } = useLang();
  return (
    <section id="top" aria-labelledby="hero-title" className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 pt-28 md:grid-cols-12 md:gap-12 md:px-8 md:pb-24 md:pt-36">
      <div className="fade-up md:col-span-6 lg:col-span-6">
        <Eyebrow>{t.hero.eyebrow}</Eyebrow>
        <p className="mt-6 font-serif text-2xl italic text-ink-soft md:text-3xl">{t.hero.tagline}</p>
        <h1 id="hero-title" className="mt-3 text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.03em] md:text-6xl lg:text-[4.25rem]">
          {t.hero.title}
        </h1>
        <p className="mt-7 max-w-lg text-lg leading-relaxed text-ink-soft">{t.hero.text}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a href="#contact" className="rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-amber-dark">
            {t.hero.cta} →
          </a>
          <a href="#work" className="rounded-full border border-ink/25 px-7 py-3.5 text-sm font-medium transition-colors hover:border-ink">
            {t.hero.cta2}
          </a>
        </div>
      </div>
      <figure className="fade-up md:col-span-6 lg:col-span-5 lg:col-start-8">
        <div className="relative aspect-[4/5] overflow-hidden bg-paper-2 shadow-[0_30px_60px_-30px_rgba(28,27,25,0.35)]">
          <Picture item={heroItem} eager alt={`${heroItem.brand.name} — ${heroItem.title[lang]}`} sizes="(min-width: 768px) 45vw, 100vw" className="h-full w-full object-cover" />
        </div>
        <figcaption className="mt-3 text-xs uppercase tracking-[0.18em] text-ink-soft">{t.hero.caption}</figcaption>
      </figure>
    </section>
  );
}

function Services() {
  const { t } = useLang();
  return (
    <section id="services" aria-labelledby="services-title" className="border-y border-line bg-paper-2/60">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <div className="grid gap-6 md:grid-cols-12">
          <div className="md:col-span-5">
            <Eyebrow>{t.services.eyebrow}</Eyebrow>
            <h2 id="services-title" className="mt-4 font-serif text-4xl leading-[1.05] md:text-6xl">{t.services.title}</h2>
          </div>
          <p className="text-ink-soft md:col-span-6 md:col-start-7">{t.services.intro}</p>
        </div>
        <ol className="mt-14 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {t.services.items.map((s, i) => (
            <li key={s.t} className="bg-paper p-7 md:p-9">
              <span className="font-serif text-lg text-amber">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-6 text-xl font-semibold tracking-tight">{s.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{s.d}</p>
            </li>
          ))}
          <li className="flex flex-col justify-between bg-ink p-7 text-paper md:p-9">
            <p className="font-serif text-2xl leading-snug">{t.services.pricing}</p>
            <a href="#contact" className="mt-8 text-sm font-medium text-amber hover:text-paper">{t.hero.cta} →</a>
          </li>
        </ol>
      </div>
    </section>
  );
}

function Process() {
  const { t } = useLang();
  return (
    <section id="process" aria-labelledby="process-title" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <Eyebrow>{t.process.eyebrow}</Eyebrow>
      <h2 id="process-title" className="mt-4 font-serif text-4xl leading-[1.05] md:text-6xl">{t.process.title}</h2>
      <ol className="mt-14 grid gap-10 md:grid-cols-4 md:gap-8">
        {t.process.steps.map((s, i) => (
          <li key={s.t} className="border-t border-ink pt-6">
            <span className="font-serif text-5xl text-amber/80">{i + 1}</span>
            <h3 className="mt-4 text-lg font-semibold tracking-tight">{s.t}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.d}</p>
          </li>
        ))}
      </ol>
      <p className="mt-12 text-sm text-ink-soft">{t.process.note}</p>
    </section>
  );
}

function About() {
  const { t, lang } = useLang();
  const img = portfolio.find((p) => p.src.endsWith('maison_elle/04_bedding.png'))!;
  return (
    <section id="about" aria-labelledby="about-title" className="border-t border-line">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 md:grid-cols-12 md:px-8 md:py-32">
        <div className="md:col-span-5">
          <div className="aspect-[4/5] overflow-hidden bg-paper-2">
            <Picture item={img} alt={`${img.brand.name} — ${img.title[lang]}`} sizes="(min-width: 768px) 40vw, 100vw" className="h-full w-full object-cover" />
          </div>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <Eyebrow>{t.about.eyebrow}</Eyebrow>
          <h2 id="about-title" className="mt-4 font-serif text-4xl leading-[1.05] md:text-5xl">{t.about.title}</h2>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">{t.about.p1}</p>
          <p className="mt-4 leading-relaxed text-ink-soft">{t.about.p2}</p>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const { t } = useLang();
  return (
    <section id="faq" aria-labelledby="faq-title" className="border-t border-line bg-paper-2/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-24 md:grid-cols-12 md:px-8 md:py-32">
        <div className="md:col-span-4">
          <Eyebrow>{t.faq.eyebrow}</Eyebrow>
          <h2 id="faq-title" className="mt-4 font-serif text-4xl leading-[1.05] md:text-5xl">{t.faq.title}</h2>
        </div>
        <div className="md:col-span-8">
          {t.faq.items.map((f) => (
            <details key={f.q} className="group border-b border-line py-5 first:border-t">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-amber transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 max-w-2xl leading-relaxed text-ink-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const { t } = useLang();
  const links = [['#work', t.nav.work], ['#services', t.nav.services], ['#pricing', t.nav.pricing], ['#process', t.nav.process], ['#about', t.nav.about], ['#contact', t.nav.contact]] as const;
  return (
    <footer className="bg-ink text-paper/70">
      <div className="mx-auto max-w-7xl border-t border-paper/10 px-5 py-12 md:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <Logo className="text-paper" />
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {links.map(([h, l]) => <li key={h}><a href={h} className="hover:text-paper">{l}</a></li>)}
            </ul>
          </nav>
        </div>
        <p className="mt-10 max-w-2xl text-xs leading-relaxed text-paper/50">{t.footer.disclosure}</p>
        <p className="mt-3 text-xs text-paper/40">© {new Date().getFullYear()} A&amp;E Creative Studio. {t.footer.rights}</p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <LangProvider>
      <Header />
      <main id="main">
        <Hero />
        <Portfolio />
        <Motion />
        <Services />
        <Pricing />
        <Process />
        <About />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </LangProvider>
  );
}
