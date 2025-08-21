import "./footer.css";

function Footer() {
    return (
        <footer className="footer" role="contentinfo">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>Contact Us</h3>
                    <address>
                        <p>123 Main St, Anytown, USA</p>
                        <p>Email: <a href="mailto:info@littlelemon.com" aria-label="Send email to info@littlelemon.com">info@littlelemon.com</a></p>
                    </address>
                </div> 
                <div className="footer-section">
                    <h3>Follow Us</h3>
                    <div className="social-links-footer" role="navigation" aria-label="Social media links">
                        <a href="#" className="social-link-footer facebook" aria-label="Follow us on Facebook">Facebook</a>
                        <a href="#" className="social-link-footer instagram" aria-label="Follow us on Instagram">Instagram</a>
                        <a href="#" className="social-link-footer twitter" aria-label="Follow us on Twitter">Twitter</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;