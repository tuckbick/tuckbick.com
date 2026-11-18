import { useRef } from 'react';
import Modal from '../../components/Modal/Modal';
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
                {data.map((job, idx) => <WorkItem key={idx} job={job} />)}
            </SectionList>

        </Section>
    )
}

function WorkItem({ job: { company, role, duration, location, description } }: { job: (typeof data)[number] }) {
    const triggerRef = useRef<HTMLButtonElement>(null);
    const displayDuration = formatDuration(duration);

    return (
        <SectionListItem>
            <button ref={triggerRef} className="focusable">
                <div className="work-trigger-content">
                    <h3 className="role">{company} <span className="del"> — </span><em>{role}</em></h3>
                    <div className="subtitle">{displayDuration}<span className="del"> | </span>{location.join(' → ')}</div>
                </div>
                <div className="work-trigger-arrow">〉</div>
            </button>
            <Modal triggerRef={triggerRef}>{description.map((paragraph, idx) => <p key={idx}>{paragraph}</p>)}</Modal>
        </SectionListItem>
    )
}