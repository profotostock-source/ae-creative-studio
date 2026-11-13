import manifest from './portfolio-manifest.json';

export type CategoryKey = 'beauty' | 'furniture' | 'decor' | 'food';
export type Lang = 'en' | 'ua';
type L = Record<Lang, string>;

export interface Brand {
  id: string; // matches manifest "category"
  name: string;
  category: CategoryKey;
  summary: L;
}

export interface PortfolioItem {
  id: string;
  brand: Brand;
  src: string; // original PNG (fallback)
  webp640: string;
  webp1280: string;
  width: number;
  height: number;
  title: L;
  description: L;
}

export const brands: Record<string, Brand> = {
  velora: {
    id: 'velora',
    name: 'VÉLORA',
    category: 'beauty',
    summary: {
      en: 'Skincare & beauty concept: warm travertine, silk and soft daylight for a quiet-luxury product story.',
      ua: 'Концепція для догляду та косметики: теплий травертин, шовк і м’яке денне світло для історії тихої розкоші.',
    },
  },
  norden_living: {
    id: 'norden_living',
    name: 'NORDEN LIVING',
    category: 'furniture',
    summary: {
      en: 'Scandinavian furniture concept: natural textures, calm palettes and lifestyle room sets.',
      ua: 'Концепція скандинавських меблів: природні фактури, спокійна палітра та інтер’єрні сцени.',
    },
  },
  maison_elle: {
    id: 'maison_elle',
    name: 'MAISON ELLE',
    category: 'decor',
    summary: {
      en: 'Home decor concept: candles, ceramics and textiles staged in golden-hour interiors.',
      ua: 'Концепція декору для дому: свічки, кераміка й текстиль у теплому вечірньому світлі.',
    },
  },
  terra_bistro: {
    id: 'terra_bistro',
    name: 'TERRA BISTRO',
    category: 'food',
    summary: {
      en: 'Bistro concept: appetising menu visuals with warm, atmospheric restaurant lighting.',
      ua: 'Концепція для бістро: апетитні візуали для меню з теплим атмосферним світлом ресторану.',
    },
  },
};

// Localised copy per file. Titles describe what each image actually shows.
const copy: Record<string, { title: L; description: L }> = {
  '01_radiant_serum.png': {
    title: { en: 'Radiant Repair Serum', ua: 'Відновлювальна сироватка' },
    description: { en: 'Dropper bottle on travertine with soft botanical shadows.', ua: 'Флакон із піпеткою на травертині з м’якими тінями рослин.' },
  },
  '02_fleur_ivoire.png': {
    title: { en: 'Fleur d’Ivoire fragrance', ua: 'Парфум Fleur d’Ivoire' },
    description: { en: 'Fragrance hero shot framed by peonies and warm light.', ua: 'Головний кадр аромату в обрамленні півоній і теплого світла.' },
  },
  '03_hydra_cream.png': {
    title: { en: 'Hydra Restore Cream', ua: 'Зволожувальний крем' },
    description: { en: 'Fresh, dewy jar shot with jasmine and glossy leaves.', ua: 'Свіжий кадр баночки з жасмином і глянцевим листям.' },
  },
  '04_lipstick.png': {
    title: { en: 'Nude lipstick', ua: 'Помада нюдового відтінку' },
    description: { en: 'Gold-cased lipstick on stone with satin drapery.', ua: 'Помада в золотому футлярі на камені з атласною драпіровкою.' },
  },
  '05_cleansing_gel.png': {
    title: { en: 'Purifying Cleansing Gel', ua: 'Очищувальний гель' },
    description: { en: 'Tube packshot on flowing ivory silk.', ua: 'Пекшот тюбика на хвилях слонового шовку.' },
  },
  '01_armchair.png': {
    title: { en: 'Collection overview', ua: 'Огляд колекції' },
    description: { en: 'Lookbook board: lounge chair, sofa, dining, side table and lighting scenes.', ua: 'Лукбук: крісло, диван, обідня зона, приставний столик і світло.' },
  },
  '02_sofa.png': {
    title: { en: 'Scandinavian living room', ua: 'Скандинавська вітальня' },
    description: { en: 'Bouclé sofa and stone coffee table in a lakeside room set.', ua: 'Диван із букле та кам’яний столик в інтер’єрі з видом на озеро.' },
  },
  '03_dining.png': {
    title: { en: 'Dining table and chairs', ua: 'Обідній стіл і стільці' },
    description: { en: 'Pedestal oak table with woven chairs under a soft pendant.', ua: 'Дубовий стіл на опорі та плетені стільці під м’яким світильником.' },
  },
  '04_side_table.png': {
    title: { en: 'Travertine side table', ua: 'Приставний столик із травертину' },
    description: { en: 'Sculptural side table styled next to a bouclé armchair.', ua: 'Скульптурний столик поруч із кріслом із букле.' },
  },
  '05_lighting.png': {
    title: { en: 'Pendant lighting', ua: 'Підвісне світло' },
    description: { en: 'Pendant lamp over a round dining table, calm daylight.', ua: 'Підвісна лампа над круглим столом у спокійному денному світлі.' },
  },
  '01_candles.png': {
    title: { en: 'Scented candles', ua: 'Ароматичні свічки' },
    description: { en: 'Glowing candles on marble with olive branches.', ua: 'Свічки на мармурі з оливковими гілками.' },
  },
  '02_ceramics.png': {
    title: { en: 'Ceramics and vases', ua: 'Кераміка та вази' },
    description: { en: 'Matte ivory vessels in a minimal still life.', ua: 'Матові вази кольору слонової кістки в мінімалістичному натюрморті.' },
  },
  '03_diffuser.png': {
    title: { en: 'Hydrangeas & candle styling', ua: 'Гортензії та свічка' },
    description: { en: 'Fresh hydrangeas, candle and books on a stone table.', ua: 'Свіжі гортензії, свічка та книжки на кам’яному столі.' },
  },
  '04_bedding.png': {
    title: { en: 'Soft bedroom textiles', ua: 'М’який текстиль для спальні' },
    description: { en: 'Layered linen bedding and knit throw at golden hour.', ua: 'Лляна постіль і в’язаний плед у золотому світлі.' },
  },
  '05_table_styling.png': {
    title: { en: 'Diffuser & tray styling', ua: 'Дифузор і декоративна таця' },
    description: { en: 'Reed diffuser and candle arranged on a rattan tray.', ua: 'Дифузор із паличками та свічка на ротанговій таці.' },
  },
  '01_pasta.png': {
    title: { en: 'Prosciutto pizza & menu', ua: 'Піца з прошуто та меню' },
    description: { en: 'Wood-fired pizza with rocket, styled with the bistro menu.', ua: 'Піца з печі з руколою разом із меню бістро.' },
  },
  '02_burger.png': {
    title: { en: 'Burger and fries', ua: 'Бургер і картопля фрі' },
    description: { en: 'Glossy brioche burger with fries in moody evening light.', ua: 'Бургер на бріоші з фрі у вечірньому світлі.' },
  },
  '03_pizza.png': {
    title: { en: 'Artisan pizza', ua: 'Авторська піца' },
    description: { en: 'Overhead-angle pizza with fresh ingredients around it.', ua: 'Піца з високого ракурсу зі свіжими інгредієнтами довкола.' },
  },
  '04_cheesecake.png': {
    title: { en: 'Berry cheesecake', ua: 'Ягідний чизкейк' },
    description: { en: 'Dessert close-up with berry coulis and cappuccino.', ua: 'Десерт крупним планом з ягідним соусом і капучино.' },
  },
  '05_brunch.png': {
    title: { en: 'Avocado toast brunch', ua: 'Бранч із тостом з авокадо' },
    description: { en: 'Poached-egg avocado toast with juice and coffee.', ua: 'Тост з авокадо та яйцем пашот, сік і кава.' },
  },
};

const LANDSCAPE = new Set(['/portfolio/terra_bistro/03_pizza.png']);

export const portfolio: PortfolioItem[] = manifest.map((m) => {
  // Relative to the deployed base (works at a domain root or in a sub-folder)
  const rel = import.meta.env.BASE_URL + m.src.replace(/^\//, '');
  const base = rel.replace(/\.png$/, '');
  const c = copy[m.filename];
  const landscape = LANDSCAPE.has(m.src);
  return {
    id: m.src,
    brand: brands[m.category],
    src: rel,
    webp640: `${base}-640.webp`,
    webp1280: `${base}-1280.webp`,
    width: landscape ? 1536 : 1122,
    height: landscape ? 1024 : 1402,
    title: c?.title ?? { en: m.title, ua: m.title },
    description: c?.description ?? { en: '', ua: '' },
  };
});

export const brandOrder = ['velora', 'norden_living', 'maison_elle', 'terra_bistro'];
