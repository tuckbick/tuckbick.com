import './Work.css';
import Section from '../../components/Section/Section';
import SectionList from '../../components/SectionList/SectionList';
import data from './data';
import SectionListItem from '../../components/SectionListItem/SectionListItem';

export default function Work() {

    const formatDate = (date: string) => {
        const d = new Date(date)
        return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).replace(',', '')
    }

    return (
        <Section id="work" title="Work Experience">
            <SectionList>
                {data.map(({ company, role, duration, location }, idx) => {
                    const start = formatDate(duration.start)
                    const end = duration.end ? formatDate(duration.end) : 'Present'

                    return (
                        <SectionListItem key={idx} tabindex={0}>
                            <div className="work-trigger-content">
                                <h3 className="role">{company} <span className="del"> — </span><em>{role}</em></h3>
                                <div className="duration">{start} - {end}<span className="del"> | </span>{location.join(' → ')}</div>
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