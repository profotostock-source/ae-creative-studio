import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Lang } from './data/portfolio';
import { dictionaries, type Dict } from './i18n';

const KEY = 'ae-lang';
const Ctx = createContext<{ lang: Lang; t: Dict; setLang: (l: Lang) => void } | null>(null);

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === 'en' || saved === 'ua') return saved;
  } catch { /* storage unavailable */ }
  return 'en';
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang);
  useEffect(() => {
    try { localStorage.setItem(KEY, lang); } catch { /* ignore */ }
    document.documentElement.lang = lang === 'ua' ? 'uk' : 'en';
  }, [lang]);
  return <Ctx.Provider value={{ lang, t: dictionaries[lang], setLang }}>{children}</Ctx.Provider>;
}

export function useLang() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useLang outside provider');
  return v;
}
