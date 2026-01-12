import './Footer.css'

function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3 className="footer-title">
                            <i className="fas fa-hotel"></i>
                            Hospitality Manager
                        </h3>
                        <p className="footer-text">
                            Modern solution for hotel and hospital management
                        </p>
                    </div>

                    <div className="footer-section">
                        <h4 className="footer-heading">Quick Links</h4>
                        <ul className="footer-links">
                            <li><a href="/"><i className="fas fa-home"></i> Home</a></li>
                            <li><a href="/dashboard"><i className="fas fa-chart-line"></i> Dashboard</a></li>
                            <li><a href="/booking"><i className="fas fa-calendar-plus"></i> New Booking</a></li>
                            <li><a href="/guests"><i className="fas fa-users"></i> Guests</a></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4 className="footer-heading">Contact</h4>
                        <ul className="footer-contact">
                            <li><i className="fas fa-envelope"></i> info@hospitalitymanager.com</li>
                            <li><i className="fas fa-phone"></i> +1 (555) 123-4567</li>
                            <li><i className="fas fa-map-marker-alt"></i> 123 Hospitality St.</li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {currentYear} Hospitality Manager. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
