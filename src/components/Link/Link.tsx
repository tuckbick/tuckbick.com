import './Link.css'

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
            className={`link ${inline && 'link--inline'}`}
            href={href}
            target={target ?? "_blank"}
            rel={rel ?? "noreferrer"}
        >
            {children}
        </a>
    )
}