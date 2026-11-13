import type { PortfolioItem } from '../data/portfolio';

interface Props {
  item: PortfolioItem;
  alt: string;
  sizes: string;
  className?: string;
  eager?: boolean;
}

/** WebP (640/1280) with the original PNG as fallback. */
export default function Picture({ item, alt, sizes, className = '', eager = false }: Props) {
  return (
    <picture>
      <source type="image/webp" srcSet={`${item.webp640} 640w, ${item.webp1280} 1280w`} sizes={sizes} />
      <img
        src={item.src}
        alt={alt}
        width={item.width}
        height={item.height}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        {...((eager ? { fetchpriority: 'high' } : {}) as Record<string, string>)}
        className={className}
      />
    </picture>
  );
}
