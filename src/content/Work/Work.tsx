import Section from '../../components/Section/Section';
import SectionList from '../../components/SectionList/SectionList';
import SectionListItem from '../../components/SectionListItem/SectionListItem';

import formatDuration from '../../util/formatDuration';

import data from './data';

import './Work.css';

export default function Work() {

    return (
        <Section id="work" title="Work Experience">
            <SectionList>
                {data.map(({ company, role, duration, location }, idx) => {
                    const displayDuration = formatDuration(duration);

                    return (
                        <SectionListItem key={idx} tabindex={0}>
                            <div className="work-trigger-content">
                                <h3 className="role">{company} <span className="del"> — </span><em>{role}</em></h3>
                                <div className="subtitle">{displayDuration}<span className="del"> | </span>{location.join(' → ')}</div>
                            </div>
                            <div className="work-trigger-arrow">
                                〉
                            </div>
                        </SectionListItem>
                    )
                })}
            </SectionList>
        </Section>
    )
}