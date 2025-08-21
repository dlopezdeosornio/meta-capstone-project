import "./nav.css";
import { Link } from 'react-router-dom';

function Nav() {
    return (
        <nav className="nav" role="navigation" aria-label="Main navigation">
            <ul>
                <li><Link to="/" aria-label="Go to homepage">Home</Link></li>
                <li><Link to="/menu" aria-label="View our menu">Menu</Link></li>
                <li><Link to="/reserve" aria-label="Reserve a table">Reserve a table</Link></li>
                <li><Link to="/contact" aria-label="Contact us">Contact</Link></li>
            </ul>
        </nav>
    )
}

export default Nav;