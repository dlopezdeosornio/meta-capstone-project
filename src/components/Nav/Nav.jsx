import "./nav.css";
import { Link } from 'react-router-dom';

function Nav() {
    return (
        <div className="nav">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li>Menu</li>
                <li><Link to="/reserve">Reserve a table</Link></li>
                <li>Contact</li>
            </ul>
        </div>
    )
}

export default Nav;