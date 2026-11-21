/**
 * Displayed width of the modal image: the dialog content box is at most 640px wide,
 * and on narrow screens it is the viewport minus the dialog's 2 x 38px padding.
 * Keep in sync with `.modal` in Modal.css.
 */
export const MODAL_IMAGE_SIZES = '(min-width: 716px) 640px, calc(100vw - 76px)';

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

const prefetched = new Set<string>();

/**
 * Starts downloading the modal-size image so it is cached before the modal opens.
 * Uses the same srcset/sizes as the modal, so the browser picks the same candidate.
 * Call only from event handlers (never during render; SSR has no `Image`).
 */
export function prefetchModalImage(src: string) {
    if (prefetched.has(src)) return;
    prefetched.add(src);
    const img = new Image();
    img.sizes = MODAL_IMAGE_SIZES; // set before srcset so selection uses it
    img.srcset = imageSources(src).webpSrcSet;
}
