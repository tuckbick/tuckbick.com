import React from 'react';
import './SectionListItem.css';

type SectionListItemProps = React.PropsWithChildren<{
    tabindex?: number;
}>;

export default function SectionListItem({ children, tabindex = 0 }: SectionListItemProps) {
    return (
        <li className="section-listitem">
            <div className="section-listitem-inner" tabIndex={tabindex}>
                {children}
            </div>
        </li>
    )
}