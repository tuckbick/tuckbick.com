import './Link.css'

export default function Link({
    href,
    target,
    rel,
    inline = false,
    children,
}: {
    href: string,
    target?: string | null,
    rel?: string | null,
    inline?: boolean,
    children: React.ReactNode,
}) {
    return (
        <a
            className={`link ${inline && 'link-inline'}`}
            href={href}
            target={typeof target !== "undefined" ? target : "_blank"}
            rel={typeof rel !== "undefined" ? rel : "noreferrer"}
        >
            {children}
        </a>
    )
}