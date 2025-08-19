import "./contact.css";

function ContactSection() {
    return (
        <div className="contactSection">
            <div className="contact-content">
                <div className="contact-section">
                    <h3>Contact Us</h3>
                    <p>123 Main St, Anytown, USA</p>
                    <p>Email: info@littlelemon.com</p>
                </div> 
                <div className="contact-section">
                    <h3>Follow Us</h3>
                    <p>Facebook</p>
                    <p>Instagram</p>
                    <p>Twitter</p>
                </div>
            </div>
        </div>
    )
}

export default ContactSection;