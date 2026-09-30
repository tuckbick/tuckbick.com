import useFavicon from './useFavicon';

import './Header.css';

export default function Header() {
    useFavicon();

    return (
        <header className="header">
            <h1>Tucker Bickler</h1>
            <nav aria-label="main navigation">
                <ul>
                    <li><a href="#projects">projects</a></li>
                    <li><a href="#work">work</a></li>
                    <li><a href="#contact">contact</a></li>
                </ul>
            </nav>
        </header>
    );
}
