import manifest from './portfolio-manifest.json';

export type CategoryKey = 'fragrance' | 'watches' | 'jewelry' | 'leather';
export type Lang = 'en' | 'ua';
type L = Record<Lang, string>;

export interface Brand {
  id: string; // matches the folder name in public/portfolio
  name: string;
  category: CategoryKey;
  summary: L;
}

export interface PortfolioItem {
  id: string;
  brand: Brand;
  src: string; // original photo (fallback)
  webp640: string;
  webp1280: string;
  width: number;
  height: number;
  title: L;
  description: L;
}

// All brands are fictional concept brands created by the studio.
export const brands: Record<string, Brand> = {
  aurelle: {
    id: 'aurelle',
    name: 'AURELLE',
    category: 'fragrance',
    summary: {
      en: 'Haute parfumerie concept: faceted crystal, liquid gold and amber light for an evening fragrance launch.',
      ua: 'Концепція нішевої парфумерії: гранований кришталь, рідке золото й бурштинове світло для запуску вечірнього аромату.',
    },
  },
  cassian: {
    id: 'cassian',
    name: 'CASSIAN',
    category: 'watches',
    summary: {
      en: 'Swiss watchmaking concept: midnight-blue guilloché, polished steel and old-money interiors.',
      ua: 'Концепція швейцарського годинникового дому: темно-синій гільош, полірована сталь і класичні інтер’єри.',
    },
  },
  ostrea: {
    id: 'ostrea',
    name: 'OSTREA',
    category: 'jewelry',
    summary: {
      en: 'Fine jewellery concept: diamonds, South Sea pearls and soft champagne light.',
      ua: 'Концепція ювелірного дому: діаманти, перли й м’яке світло кольору шампань.',
    },
  },
  varenne: {
    id: 'varenne',
    name: 'VARENNE',
    category: 'leather',
    summary: {
      en: 'Leather goods concept: cognac calfskin, gold hardware and Mediterranean sunlight.',
      ua: 'Концепція шкіряних аксесуарів: коньячна теляча шкіра, золота фурнітура й середземноморське сонце.',
    },
  },
};

export const brandOrder = ['aurelle', 'cassian', 'ostrea', 'varenne'];

// Localised copy per photo (file name without extension).
const copy: Record<string, { title: L; description: L }> = {
  'aurelle-1': {
    title: { en: 'Ambre Nocturne, hero shot', ua: 'Ambre Nocturne, головний кадр' },
    description: { en: 'Crystal flacon on black obsidian, lit through with amber light.', ua: 'Кришталевий флакон на чорному обсидіані в бурштиновому світлі.' },
  },
  'aurelle-2': {
    title: { en: 'Liquid gold splash', ua: 'Сплеск рідкого золота' },
    description: { en: 'High-speed splash frozen around the bottle.', ua: 'Застиглий сплеск навколо флакона, швидкісна зйомка.' },
  },
  'aurelle-3': {
    title: { en: 'Flacon & gift box', ua: 'Флакон і подарункова коробка' },
    description: { en: 'E-commerce packshot with the matte black box and gold foil.', ua: 'Пекшот для магазину з матовою чорною коробкою та золотим тисненням.' },
  },
  'aurelle-4': {
    title: { en: 'Parisian vanity', ua: 'Паризький будуар' },
    description: { en: 'Lifestyle scene on a marble vanity at dusk.', ua: 'Лайфстайл-сцена на мармуровому туалетному столику ввечері.' },
  },
  'aurelle-5': {
    title: { en: 'The scent notes', ua: 'Ноти аромату' },
    description: { en: 'Oud, amber, saffron and black rose around the flacon.', ua: 'Уд, бурштин, шафран і чорна троянда навколо флакона.' },
  },
  'cassian-1': {
    title: { en: 'Blue guilloché, hero shot', ua: 'Синій гільош, головний кадр' },
    description: { en: 'Steel dress watch floating above dark slate.', ua: 'Сталевий класичний годинник над темним сланцем.' },
  },
  'cassian-2': {
    title: { en: 'On the wrist', ua: 'На зап’ясті' },
    description: { en: 'Evening lifestyle shot with a suit cuff and city lights.', ua: 'Вечірній лайфстайл-кадр із манжетом костюма та вогнями міста.' },
  },
  'cassian-3': {
    title: { en: 'Presentation box', ua: 'Подарунковий футляр' },
    description: { en: 'Walnut box with navy velvet, ready for the product page.', ua: 'Горіховий футляр із темно-синім оксамитом для сторінки товару.' },
  },
  'cassian-4': {
    title: { en: 'The movement', ua: 'Механізм' },
    description: { en: 'Macro through the sapphire caseback.', ua: 'Макрозйомка крізь сапфірову задню кришку.' },
  },
  'cassian-5': {
    title: { en: 'The library desk', ua: 'Письмовий стіл у бібліотеці' },
    description: { en: 'Still life with a fountain pen, a leather book and whisky.', ua: 'Натюрморт із пір’яною ручкою, шкіряною книгою та віскі.' },
  },
  'ostrea-1': {
    title: { en: 'Solitaire, hero shot', ua: 'Каблучка-солітер, головний кадр' },
    description: { en: 'Brilliant-cut diamond on raw rose quartz.', ua: 'Діамант круглої огранки на необробленому рожевому кварці.' },
  },
  'ostrea-2': {
    title: { en: 'South Sea pearls', ua: 'Перлове намисто' },
    description: { en: 'Pearl strand draped over ivory silk.', ua: 'Нитка перлів на шовку кольору слонової кістки.' },
  },
  'ostrea-3': {
    title: { en: 'Campaign portrait', ua: 'Рекламний портрет' },
    description: { en: 'Pearl and diamond drop earrings on the model.', ua: 'Сережки з перлиною та діамантом на моделі.' },
  },
  'ostrea-4': {
    title: { en: 'Tennis bracelet', ua: 'Тенісний браслет' },
    description: { en: 'Diamond line bracelet on Carrara marble.', ua: 'Браслет із доріжкою діамантів на мармурі Каррара.' },
  },
  'ostrea-5': {
    title: { en: 'Gift box', ua: 'Футляр для подарунка' },
    description: { en: 'Ivory leather box with cream velvet and satin ribbon.', ua: 'Шкіряний футляр кольору слонової кістки з оксамитом і атласною стрічкою.' },
  },
  'varenne-1': {
    title: { en: 'Top-handle bag, hero shot', ua: 'Сумка з ручкою, головний кадр' },
    description: { en: 'Cognac calfskin on a travertine plinth in hard sunlight.', ua: 'Коньячна шкіра на травертиновому постаменті під яскравим сонцем.' },
  },
  'varenne-2': {
    title: { en: 'Riviera street', ua: 'Вулиця на Рив’єрі' },
    description: { en: 'Campaign shot on a sunlit stone street.', ua: 'Рекламний кадр на сонячній кам’яній вулиці.' },
  },
  'varenne-3': {
    title: { en: 'Craftsmanship detail', ua: 'Деталі ручної роботи' },
    description: { en: 'Saddle stitching, painted edges and the engraved clasp.', ua: 'Сідельний шов, пофарбовані краї та гравійована застібка.' },
  },
  'varenne-4': {
    title: { en: 'Small leather goods', ua: 'Дрібна шкіргалантерея' },
    description: { en: 'Catalogue flat lay: card holder, wallet, key ring and belt.', ua: 'Флетлей для каталогу: кардхолдер, гаманець, брелок і ремінь.' },
  },
  'varenne-5': {
    title: { en: 'On deck', ua: 'На палубі' },
    description: { en: 'Summer lifestyle scene on a classic teak yacht.', ua: 'Літня лайфстайл-сцена на класичній яхті з тиком.' },
  },
};

export const portfolio: PortfolioItem[] = manifest
  .filter((m) => brands[m.category])
  .map((m) => {
    // Relative to the deployed base (works at a domain root or in a sub-folder)
    const rel = import.meta.env.BASE_URL + m.src.replace(/^\//, '');
    const base = rel.replace(/\.(png|jpe?g)$/i, '');
    const c = copy[m.filename.replace(/\.(png|jpe?g)$/i, '')];
    return {
      id: m.src,
      brand: brands[m.category],
      src: rel,
      webp640: `${base}-640.webp`,
      webp1280: `${base}-1280.webp`,
      width: m.width,
      height: m.height,
      title: c?.title ?? { en: '', ua: '' },
      description: c?.description ?? { en: '', ua: '' },
    };
  });

/** Find a photo by brand + number, falling back to the first photo. */
export const pick = (brand: string, n: number) =>
  portfolio.find((p) => p.brand.id === brand && /-(\d+)\.\w+$/.exec(p.src)?.[1] === String(n)) ?? portfolio[0];
