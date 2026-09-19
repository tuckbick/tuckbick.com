import Section from "../../components/Section/Section";
import SectionList from "../../components/SectionList/SectionList";
import SectionListItem from "../../components/SectionListItem/SectionListItem";
import data from './data';
import './Contact.css';

export default function Contact() {
    return (
        <Section id="contact" title="Contact">
            <SectionList>
                {data.map(({ platform, text, href, icon: Icon }) => {
                    return (
                        <SectionListItem key={platform}>
                            <a 
                                className="contact-link" 
                                href={href} 
                                target={platform === 'email' ? undefined : "_blank"} 
                                rel={platform === 'email' ? undefined : "noreferrer"}
                            >
                                {Icon && <Icon />} {text}
                            </a>
                        </SectionListItem>
                    )
                })}
            </SectionList>
        </Section>
    )
}