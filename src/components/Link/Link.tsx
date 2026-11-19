import './Link.css'

// Own sites should receive referrer info; everything else is opened with noreferrer.
const isOwnSite = (href: string) => {
    try {
        const { hostname } = new URL(href);
        return hostname === 'tuckbick.com' || hostname.endsWith('.tuckbick.com');
    } catch {
        return false;
    }
}

export default function Link({
    href,
    target,
    rel,
    inline = false,
    children,
}: {
    href: string,
    target?: string,
    rel?: string,
    inline?: boolean,
    children: React.ReactNode,
}) {
    return (
        <a
            className={inline ? 'link link--inline' : 'link'}
            href={href}
            target={target ?? "_blank"}
            rel={rel ?? (isOwnSite(href) ? "noopener" : "noopener noreferrer")}
        >
            {children}
        </a>
    )
}