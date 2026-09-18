import React from 'react';
import './SectionList.css';

type SectionListProps = React.PropsWithChildren;

export default function SectionList({ children }: SectionListProps) {
    return (
        <ul className="section-list">
            {children}
        </ul>
    )
}