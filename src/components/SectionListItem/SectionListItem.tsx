import React from 'react';
import './SectionListItem.css';

export default function SectionListItem({ children }: React.PropsWithChildren) {
    return (
        <li className="section-listitem">
            <div className="section-listitem-inner">
                {children}
            </div>
        </li>
    )
}