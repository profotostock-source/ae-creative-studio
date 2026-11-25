import { useLang } from '../LangContext';
import { contactConfig } from '../config';

export default function Pricing() {
  const { t } = useLang();
  const p = t.plans;
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <div className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-amber">{p.eyebrow}</p>
          <h2 id="pricing-title" className="mt-4 font-serif text-4xl leading-[1.05] md:text-6xl">{p.title}</h2>
        </div>
        <p className="text-ink-soft md:col-span-6 md:col-start-7">{p.intro}</p>
      </div>
      <ul className="mt-14 grid gap-6 lg:grid-cols-3">
        {p.items.map((plan, i) => {
          const featured = i === 1;
          const href = `mailto:${contactConfig.email}?subject=${encodeURIComponent(`${p.subject}: ${plan.name}`)}`;
          return (
            <li
              key={plan.name}
              className={`relative flex flex-col border p-7 md:p-9 ${featured ? 'border-ink bg-ink text-paper' : 'border-line bg-paper'}`}
            >
              {featured && (
                <span className="absolute right-6 top-6 rounded-full bg-amber px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-paper">
                  {p.popular}
                </span>
              )}
              <h3 className="font-serif text-2xl">{plan.name}</h3>
              <p className={`mt-2 text-sm ${featured ? 'text-paper/70' : 'text-ink-soft'}`}>{plan.for}</p>
              <p className="mt-8 flex items-baseline gap-2">
                <span className="text-5xl font-semibold tracking-tight">{plan.price}</span>
                <span className={`text-sm ${featured ? 'text-paper/70' : 'text-ink-soft'}`}>{p.perMonth}</span>
              </p>
              <ul className="mt-8 flex-1 space-y-3 text-sm">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <span aria-hidden className="text-amber">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href={href}
                className={`mt-10 rounded-full px-7 py-3.5 text-center text-sm font-medium transition-colors ${
                  featured ? 'bg-paper text-ink hover:bg-amber hover:text-paper' : 'bg-ink text-paper hover:bg-amber-dark'
                }`}
              >
                {p.cta} →
              </a>
            </li>
          );
        })}
      </ul>
      <p className="mt-10 text-sm text-ink-soft">{p.note}</p>
    </section>
  );
}
