import "./nav.css";
import { Link } from 'react-router-dom';

function Nav() {
    return (
        <div className="nav">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/menu">Menu</Link></li>
                <li><Link to="/reserve">Reserve a table</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>
        </div>
    )
}

export default Nav;