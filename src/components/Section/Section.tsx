import React from 'react';
import './Section.css'

type SectionProps = React.PropsWithChildren<{
    id: string;
    title?: string
}>;

export default function Section({
    id,
    title,
    children
}: SectionProps) {
    return (
        <section className="section" id={id}>
            {title && <h2 className="section-title">{title}</h2>}
            <div className="section-inner">
                {children}
            </div>
        </section>
    )
}