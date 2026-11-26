// Generates WebP variants next to the original photos and rebuilds the manifest:
//   public/portfolio/<brand>/<name>-640.webp   (grid)
//   public/portfolio/<brand>/<name>-1280.webp  (lightbox / hero)
//   src/data/portfolio-manifest.json           (brand, file, real width/height)
// Originals (.png/.jpg/.jpeg) are kept and used as <img> fallback.
// Brand folders listed in BRAND_ORDER come first; files are sorted by name.
// Run: npm run optimize-images   (only needed when you add/replace photos)
import sharp from 'sharp';
import { readdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = new URL('../public/portfolio/', import.meta.url).pathname;
const out = new URL('../src/data/portfolio-manifest.json', import.meta.url).pathname;
const widths = [640, 1280];
const isPhoto = (f) => /\.(png|jpe?g)$/i.test(f);

const manifest = [];
for (const brand of (await readdir(root)).sort()) {
  const dir = join(root, brand);
  for (const file of (await readdir(dir)).filter(isPhoto).sort()) {
    const base = file.replace(/\.(png|jpe?g)$/i, '');
    const { width, height } = await sharp(join(dir, file)).metadata();
    for (const w of widths) {
      await sharp(join(dir, file))
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: 82 })
        .toFile(join(dir, `${base}-${w}.webp`));
    }
    manifest.push({ category: brand, filename: file, src: `/portfolio/${brand}/${file}`, width, height });
    console.log('✓', brand, file, `${width}x${height}`);
  }
}
await writeFile(out, JSON.stringify(manifest, null, 2) + '\n');
console.log(`manifest: ${manifest.length} images`);
