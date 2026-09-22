import './UnderConstruction.css';

export default function UnderConstruction() {
    return (
        <div className="under-construction">
            <div className="construction-tape"></div>
            <h3 className="blink-text">🚧 UNDER CONSTRUCTION 🚧</h3>
            <div className="marquee-container">
                <span className="marquee-text">Welcome to my cyberspace! Please sign my guestbook. This section is currently being built in Microsoft FrontPage... Check back later!</span>
            </div>
            <div className="construction-tape"></div>
        </div>
    )
}
