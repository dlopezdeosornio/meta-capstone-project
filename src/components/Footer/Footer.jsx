import "./footer.css";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import BarImg from "../../assets/Restaurant/Bar.jpeg"
import { Link, useLocation, useNavigate } from 'react-router-dom';



function Footer() {

        const location = useLocation();
        const navigate = useNavigate();
        
        const isActive = (path) => {
            if (path === '/') {
                return location.pathname === '/';
            }
            return location.pathname.startsWith(path);
        };
    

    return (
        <footer className="footer" role="contentinfo">
            <div className="footer-content">
                <div className="footer-image">
                    <img src={BarImg} alt="Little Lemon Restaurant Bar" />
                </div>
                <div className="footer-nav">
                    <nav>
                        <ul className="nav-links">
                            <li><Link to="/" className={isActive('/') ? 'active' : ''} aria-label="Go to homepage">Home</Link></li>
                            <li><Link to="/menu" className={isActive('/menu') ? 'active' : ''} aria-label="View our menu">Menu</Link></li>
                            <li><Link to="/reserve" className={isActive('/reserve') ? 'active' : ''} aria-label="Reserve a table">Reservations</Link></li>
                            <li><Link to="/order" className={isActive('/order') ? 'active' : ''} aria-label="Order Online">Order Online</Link></li>
                            <li><Link to="/contact" className={isActive('/contact') ? 'active' : ''} aria-label="Contact us">Contact</Link></li>
                        </ul>
                    </nav>
                </div>
                <div className="footer-section">
                    <h3>Contact Us</h3>
                    <address>
                        <p>123 Main St, Anytown, USA</p>
                        <p>Email: <a href="mailto:info@littlelemon.com" aria-label="Send email to info@littlelemon.com">info@littlelemon.com</a></p>
                        <p>Phone: <a href="tel:+1234567890" aria-label="Call us at +1234567890">+1234567890</a></p>
                    </address>
                </div> 
                <div className="footer-section">
                    <h3>Follow Us</h3>
                    <div className="social-links-footer" role="navigation" aria-label="Social media links">
                        <a href="#" className="social-link-footer facebook" aria-label="Follow us on Facebook"><FaFacebook />Facebook</a>
                        <a href="#" className="social-link-footer instagram" aria-label="Follow us on Instagram"><FaInstagram />Instagram</a>
                        <a href="#" className="social-link-footer twitter" aria-label="Follow us on Twitter"><FaTwitter />Twitter</a>
                    </div>
                </div>
            </div>
            <div className="copyright-section">
                <p>Copyright © 2025 Little Lemon. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer;