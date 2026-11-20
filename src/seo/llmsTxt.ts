import intro from '../content/Intro/data'
import projects from '../content/Projects/data'

import { SITE_URL } from './siteUrl'

/** llms.txt per https://llmstxt.org */
export default function generateLlmsTxt(): string {
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
