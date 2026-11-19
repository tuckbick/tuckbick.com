import formatDuration from './formatDuration'

import intro from '../content/Intro/data'
import projects from '../content/Projects/data'
import work from '../content/Work/data'
import contact from '../content/Contact/data'

export const SITE_URL = 'https://tuckbick.com'

/** Plain Markdown rendition of the whole site, built from the same data files as the React components. */
export function generateMarkdown(): string {
    const lines: string[] = [
        '# Tucker Bickler',
        '',
        ...intro.summary.flatMap(paragraph => [paragraph, '']),
        '## Projects',
        '',
    ]

    for (const project of projects) {
        const role = 'role' in project && project.role ? ` — ${project.role}` : ''
        lines.push(`### ${project.name}${role}`, '')
        if (project.duration) lines.push(`_${formatDuration(project.duration)}_`, '')
        for (const paragraph of project.description ?? []) lines.push(paragraph, '')
        const images = 'images' in project ? project.images : undefined
        for (const image of images ?? []) lines.push(`![${image.alt}](${SITE_URL}/${image.src})`)
        if (images?.length) lines.push('')
        for (const link of project.links ?? []) lines.push(`- [${project.name} ${link.label}](${link.href})`)
        lines.push('')
    }

    lines.push('## Work Experience', '')
    for (const job of work) {
        lines.push(`### ${job.company} — ${job.role}`, '')
        lines.push(`_${formatDuration(job.duration)} | ${job.location.join(' → ')}_`, '')
        for (const item of job.description) lines.push(`- ${item}`)
        lines.push('')
    }

    lines.push('## Contact', '')
    for (const item of contact) {
        lines.push(`- ${item.platform}: [${item.text}](${item.href.split('?')[0]})`)
    }

    return lines.join('\n') + '\n'
}

/** llms.txt per https://llmstxt.org */
export function generateLlmsTxt(): string {
    const projectLinks = projects.flatMap(p => (p.links ?? []).map(l => `- [${p.name} ${l.label}](${l.href})`))
    return [
        '# Tucker Bickler',
        '',
        `> ${intro.summary.join(' ')}`,
        '',
        '## Site',
        '',
        `- [Full site as Markdown](${SITE_URL}/index.md): bio, projects, work history, and contact details`,
        `- [Website](${SITE_URL}/): the same content as HTML`,
        '',
        '## Projects',
        '',
        ...projectLinks,
        '',
    ].join('\n')
}

export function generateSitemap(): string {
    const lastmod = new Date().toISOString().slice(0, 10)
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${lastmod}</lastmod>
  </url>
</urlset>
`
}
