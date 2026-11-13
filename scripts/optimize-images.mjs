// Generates WebP variants next to the original PNGs:
//   public/portfolio/<brand>/<name>-640.webp   (grid)
//   public/portfolio/<brand>/<name>-1280.webp  (lightbox / hero)
// Originals are kept untouched and used as <img> fallback.
// Run: npm run optimize-images   (only needed when you add/replace photos)
import sharp from 'sharp';
import { readdir } from 'node:fs/promises';
import { join } from 'node:path';

const root = new URL('../public/portfolio/', import.meta.url).pathname;
const widths = [640, 1280];

for (const brand of await readdir(root)) {
  const dir = join(root, brand);
  for (const file of (await readdir(dir)).filter((f) => f.endsWith('.png'))) {
    const base = file.replace(/\.png$/, '');
    for (const w of widths) {
      await sharp(join(dir, file))
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(join(dir, `${base}-${w}.webp`));
    }
    console.log('✓', brand, file);
  }
}
