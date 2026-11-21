// Generates the gallery image derivatives from high-resolution sources.
//
// Usage: node scripts/make-images.mjs [sourceDir]
//   sourceDir defaults to public/images/projects/source and must contain
//   <project>/<name>.<jpg|jpeg|png|webp|heic> files.
//
// For each source it writes to public/images/projects/<project>/:
//   <name>.thumb.webp / .thumb.jpg   256px wide  (gallery thumbnail, 2x of 128px)
//   <name>.webp / .jpg               640px wide  (modal 1x; the .jpg is what data.ts references)
//   <name>@2x.webp / @2x.jpg        1280px wide  (modal 2x)

import { execFileSync } from 'node:child_process';
import { mkdtempSync, readdirSync, rmSync, statSync } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { basename, extname, join, resolve } from 'node:path';
import sharp from 'sharp';

const SOURCE_DIR = resolve(process.argv[2] ?? 'public/images/projects/source');
const OUT_DIR = resolve('public/images/projects');
const INPUT_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.heic']);

// The 2x variant only displays on high-DPR screens, where compression artifacts are
// half the size, so it uses a lower quality to keep the largest files in check.
const VARIANTS = [
    { suffix: '.thumb', width: 256, quality: 80 },
    { suffix: '', width: 640, quality: 80 },
    { suffix: '@2x', width: 1280, quality: 70 },
];

const kb = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;

// sharp's prebuilt libheif only decodes AVIF, so convert HEIC with macOS `sips` first.
function heicToJpeg(file, tmp) {
    if (process.platform !== 'darwin') {
        throw new Error(`${file}: HEIC needs macOS \`sips\` to convert; convert it to JPEG manually.`);
    }
    const out = join(tmp, `${basename(file, extname(file))}.jpg`);
    execFileSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '100', file, '--out', out], { stdio: 'ignore' });
    return out;
}

async function processImage(project, file, tmp) {
    const name = basename(file, extname(file));
    const input = extname(file).toLowerCase() === '.heic' ? heicToJpeg(file, tmp) : file;
    const outDir = join(OUT_DIR, project);
    await mkdir(outDir, { recursive: true });

    // Rotate once into a buffer so every variant shares the EXIF-corrected orientation.
    const { data, info } = await sharp(input).rotate().toBuffer({ resolveWithObject: true });
    if (info.width < 1280) console.warn(`  ! ${project}/${name}: source is only ${info.width}px wide`);

    const report = [];
    let size640;
    for (const { suffix, width, quality } of VARIANTS) {
        const resized = sharp(data).resize({ width, withoutEnlargement: true });
        const webp = await resized.clone().webp({ quality, effort: 6 })
            .toFile(join(outDir, `${name}${suffix}.webp`));
        const jpg = await resized.clone().flatten({ background: '#ffffff' })
            .jpeg({ quality, mozjpeg: true, progressive: true })
            .toFile(join(outDir, `${name}${suffix}.jpg`));
        if (width === 640) size640 = webp;
        report.push(`${width}w webp ${kb(webp.size)} / jpg ${kb(jpg.size)}`);
    }

    console.log(`${project}/${name}: source ${info.width}x${info.height} -> data.ts width: ${size640.width}, height: ${size640.height}`);
    for (const line of report) console.log(`    ${line}`);
}

const tmp = mkdtempSync(join(tmpdir(), 'make-images-'));
try {
    for (const project of readdirSync(SOURCE_DIR)) {
        const projectDir = join(SOURCE_DIR, project);
        if (!statSync(projectDir).isDirectory()) continue;
        for (const entry of readdirSync(projectDir).sort()) {
            if (!INPUT_EXTS.has(extname(entry).toLowerCase())) continue;
            await processImage(project, join(projectDir, entry), tmp);
        }
    }
} finally {
    rmSync(tmp, { recursive: true, force: true });
}
