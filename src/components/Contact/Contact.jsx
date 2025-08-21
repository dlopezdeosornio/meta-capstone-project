import "./contact.css";

function ContactSection() {
    return (
        <section className="contactSection" role="region" aria-labelledby="contact-heading">
            <div className="contact-content">
                <div className="contact-section">
                    <h3 id="contact-heading">Contact Us</h3>
                    <address>
                        <p>123 Main St, Anytown, USA</p>
                        <p>Email: <a href="mailto:info@littlelemon.com" aria-label="Send email to info@littlelemon.com">info@littlelemon.com</a></p>
                    </address>
                </div> 
                <div className="contact-section">
                    <h3>Follow Us</h3>
                    <div className="social-links" role="navigation" aria-label="Social media links">
                        <a href="#" className="social-link facebook" aria-label="Follow us on Facebook">Facebook</a>
                        <a href="#" className="social-link instagram" aria-label="Follow us on Instagram">Instagram</a>
                        <a href="#" className="social-link twitter" aria-label="Follow us on Twitter">Twitter</a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactSection;