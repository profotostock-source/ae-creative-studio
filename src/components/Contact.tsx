import { useState, type FormEvent } from 'react';
import { contactConfig, isConfigured } from '../config';
import { useLang } from '../LangContext';

type Status = 'idle' | 'sending' | 'sent' | 'opened' | 'error' | 'invalid' | 'unconfigured';

const field =
  'mt-2 block w-full rounded-none border-0 border-b border-line bg-transparent px-0 py-3 text-base text-ink placeholder:text-ink-soft/60 focus:border-ink focus:outline-none focus:ring-0';

export default function Contact() {
  const { t } = useLang();
  const c = t.contact;
  const [status, setStatus] = useState<Status>('idle');
  const hasEmail = isConfigured(contactConfig.email);
  const hasEndpoint = isConfigured(contactConfig.formEndpoint);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = {
      name: String(fd.get('name') ?? '').trim(),
      email: String(fd.get('email') ?? '').trim(),
      business: String(fd.get('business') ?? '').trim(),
      message: String(fd.get('message') ?? '').trim(),
    };
    if (!data.name || !/^\S+@\S+\.\S+$/.test(data.email) || !data.message) {
      setStatus('invalid');
      return;
    }

    if (hasEndpoint) {
      setStatus('sending');
      try {
        const res = await fetch(contactConfig.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(String(res.status));
        setStatus('sent');
        form.reset();
      } catch {
        setStatus('error');
      }
      return;
    }

    if (!hasEmail) {
      setStatus('unconfigured');
      return;
    }

    const subject = `${c.subject} — ${data.name}${data.business ? ` (${data.business})` : ''}`;
    const body = [
      `${c.name}: ${data.name}`,
      `${c.email}: ${data.email}`,
      `${c.business}: ${data.business || '—'}`,
      '',
      `${c.message}:`,
      data.message,
    ].join('\n');
    window.location.href = `mailto:${contactConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus('opened');
  }

  const channels = [
    { label: 'Telegram', value: contactConfig.telegram, href: `https://t.me/${contactConfig.telegram.replace(/^@/, '')}` },
    { label: 'WhatsApp', value: contactConfig.whatsapp, href: `https://wa.me/${contactConfig.whatsapp.replace(/\D/g, '')}` },
    { label: c.emailLabel, value: contactConfig.email, href: `mailto:${contactConfig.email}` },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-ink text-paper">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 md:grid-cols-12 md:px-8 md:py-32">
        <div className="md:col-span-5">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-amber">{c.eyebrow}</p>
          <h2 id="contact-title" className="mt-4 font-serif text-4xl leading-[1.05] md:text-6xl">{c.title}</h2>
          <p className="mt-6 max-w-md text-paper/75">{c.text}</p>

          <div className="mt-12">
            <p className="text-xs uppercase tracking-[0.2em] text-paper/50">{c.channels}</p>
            <ul className="mt-4 space-y-3">
              {channels.map((ch) => (
                <li key={ch.label} className="flex items-baseline gap-3">
                  <span className="w-24 shrink-0 text-sm text-paper/50">{ch.label}</span>
                  {isConfigured(ch.value) ? (
                    <a href={ch.href} target={ch.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="border-b border-amber/60 pb-0.5 transition-colors hover:border-amber hover:text-amber">
                      {ch.label === 'Telegram' ? `@${ch.value.replace(/^@/, '')}` : ch.value}
                    </a>
                  ) : (
                    <span className="text-sm italic text-paper/40">{c.channelMissing}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <form onSubmit={onSubmit} noValidate className="md:col-span-7 md:pl-8" aria-describedby="form-note">
          <div className="rounded-sm bg-paper p-6 text-ink md:p-10">
            {!hasEmail && !hasEndpoint && (
              <p role="note" className="mb-6 border border-dashed border-amber bg-amber/10 px-4 py-3 text-sm text-amber-dark">
                ⚙ {c.notConfigured}
              </p>
            )}
            <div className="grid gap-6 md:grid-cols-2">
              <label className="block text-sm text-ink-soft">
                {c.name} *
                <input name="name" required autoComplete="name" className={field} />
              </label>
              <label className="block text-sm text-ink-soft">
                {c.email} *
                <input name="email" type="email" required autoComplete="email" className={field} />
              </label>
            </div>
            <label className="mt-6 block text-sm text-ink-soft">
              {c.business}
              <select name="business" defaultValue="" className={`${field} cursor-pointer`}>
                <option value="">{c.choose}</option>
                {c.businessOptions.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </label>
            <label className="mt-6 block text-sm text-ink-soft">
              {c.message} *
              <textarea name="message" required rows={5} placeholder={c.messagePh} className={`${field} resize-y`} />
            </label>

            <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <p id="form-note" className="max-w-xs text-xs text-ink-soft">{hasEndpoint ? c.endpointNote : c.mailtoNote}</p>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-amber-dark disabled:opacity-60"
              >
                {c.submit} →
              </button>
            </div>

            <div aria-live="polite" className="text-sm">
              {status === 'invalid' && <p className="mt-4 text-red-700">{c.required}</p>}
              {status === 'unconfigured' && <p className="mt-4 text-amber-dark">{c.notConfigured}</p>}
              {status === 'error' && <p className="mt-4 text-red-700">{c.error}</p>}
              {status === 'sent' && <p className="mt-4 text-green-800">{c.sent}</p>}
              {status === 'opened' && (
                <p className="mt-4 text-ink-soft">
                  {c.opened} <a className="underline" href={`mailto:${contactConfig.email}`}>{contactConfig.email}</a>.
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
