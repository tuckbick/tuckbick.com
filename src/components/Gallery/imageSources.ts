/**
 * Derives the generated image URLs (see scripts/make-images.mjs) from a gallery
 * image's `src`, which points at the 640px JPEG (e.g. `images/projects/marlo/project0.jpg`).
 */
export function imageSources(src: string) {
    const base = `/${src.replace(/\.jpe?g$/i, '')}`;
    return {
        thumb: { webp: `${base}.thumb.webp`, jpg: `${base}.thumb.jpg` },
        jpg: `${base}.jpg`,
        webpSrcSet: `${base}.webp 640w, ${base}@2x.webp 1280w`,
        jpgSrcSet: `${base}.jpg 640w, ${base}@2x.jpg 1280w`,
    };
}
