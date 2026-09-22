import Section from "../../components/Section/Section";
import SectionList from "../../components/SectionList/SectionList";
import SectionListItem from "../../components/SectionListItem/SectionListItem";
import Icon from "../../components/Icon/Icon";
import Link from "../../components/Link/Link";

import data from './data';
import './Contact.css';

export default function Contact() {
    return (
        <Section id="contact" title="Contact">
            <SectionList>
                {data.map(({ platform, text, href }) => {
                    return (
                        <SectionListItem key={platform}>
                            <Link
                                target={platform === 'email' ? null : undefined}
                                rel={platform === 'email' ? null : undefined}
                                href={href}
                            >
                                <Icon name={platform as any} /> {text}
                            </Link>
                        </SectionListItem>
                    )
                })}
            </SectionList>
        </Section>
    )
}