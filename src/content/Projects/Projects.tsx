import Icon from "../../components/Icon/Icon";
import Section from "../../components/Section/Section";
import SectionList from "../../components/SectionList/SectionList";
import SectionListItem from "../../components/SectionListItem/SectionListItem";
import Link from "../../components/Link/Link";

import formatDuration from "../../util/formatDuration";

import data from './data';

import './Projects.css';

export default function Projects() {
    return (
        <Section id="projects" title="Projects">
            <SectionList>
                {data.map(({ name, role, duration, links, description }, index) => {
                    const displayDuration = formatDuration(duration);
                    const displayRole = role ? <><span className="del"> — </span><em>{role}</em></> : null;

                    return (
                        <SectionListItem key={index}>
                            <h3 className="role">{name}{displayRole}</h3>
                            <div className="subtitle">{displayDuration}</div>
                            {description && description.map((paragraph, idx) => (
                                <p key={idx} className="project-description">{paragraph}</p>
                            ))}
                            {links && links.length > 0 && (
                                <div className="project-links">
                                    {links.map(({ href, label, platform }, idx) => (
                                        <Link
                                            key={idx}
                                            href={href}
                                            inline
                                        >
                                            <Icon name={platform as any} size="sm" /> {label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </SectionListItem>
                    )
                })}
            </SectionList>
        </Section>
    )
}