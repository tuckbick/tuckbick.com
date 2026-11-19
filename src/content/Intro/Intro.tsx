import data from './data';

import './Intro.css';

export default function Intro() {
    return (
        <section className="intro" aria-label="Introduction">
            {data.summary.map((content, idx) => <p key={idx}>{content}</p>)}
        </section>
    );
}
