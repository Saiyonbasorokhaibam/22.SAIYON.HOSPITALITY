import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
    return (
        <div className="home">
            <section className="hero">
                <div className="container">
                    <div className="hero-content fade-in">
                        <h1 className="hero-title">
                            Welcome to <span className="text-gradient">Saiyon Hospitality</span>
                        </h1>
                        <p className="hero-subtitle">
                            Streamline your hotel or hospital operations with our modern, intuitive management system
                        </p>
                        <div className="hero-actions">
                            <Link to="/booking" className="btn btn-primary">
                                <i className="fas fa-calendar-plus"></i>
                                Create New Booking
                            </Link>
                            <Link to="/dashboard" className="btn btn-secondary">
                                <i className="fas fa-chart-line"></i>
                                View Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="features">
                <div className="container">
                    <h2 className="section-title text-center">Key Features</h2>
                    <div className="grid grid-3">
                        <div className="feature-card card slide-in">
                            <div className="feature-icon">
                                <i className="fas fa-calendar-check"></i>
                            </div>
                            <h3 className="feature-title">Easy Booking</h3>
                            <p className="feature-description">
                                Manage reservations and appointments with our intuitive booking system
                            </p>
                        </div>

                        <div className="feature-card card slide-in" style={{ animationDelay: '0.1s' }}>
                            <div className="feature-icon">
                                <i className="fas fa-users"></i>
                            </div>
                            <h3 className="feature-title">Guest Management</h3>
                            <p className="feature-description">
                                Keep track of all your guests and their preferences in one place
                            </p>
                        </div>

                        <div className="feature-card card slide-in" style={{ animationDelay: '0.2s' }}>
                            <div className="feature-icon">
                                <i className="fas fa-chart-pie"></i>
                            </div>
                            <h3 className="feature-title">Analytics Dashboard</h3>
                            <p className="feature-description">
                                Get insights into your operations with real-time analytics and reports
                            </p>
                        </div>

                        <div className="feature-card card slide-in" style={{ animationDelay: '0.3s' }}>
                            <div className="feature-icon">
                                <i className="fas fa-cloud"></i>
                            </div>
                            <h3 className="feature-title">Cloud Storage</h3>
                            <p className="feature-description">
                                All data securely stored in Google Sheets for easy access anywhere
                            </p>
                        </div>

                        <div className="feature-card card slide-in" style={{ animationDelay: '0.4s' }}>
                            <div className="feature-icon">
                                <i className="fas fa-mobile-alt"></i>
                            </div>
                            <h3 className="feature-title">Responsive Design</h3>
                            <p className="feature-description">
                                Access your management system from any device, anywhere
                            </p>
                        </div>

                        <div className="feature-card card slide-in" style={{ animationDelay: '0.5s' }}>
                            <div className="feature-icon">
                                <i className="fas fa-shield-alt"></i>
                            </div>
                            <h3 className="feature-title">Secure & Reliable</h3>
                            <p className="feature-description">
                                Your data is protected with industry-standard security measures
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="cta">
                <div className="container">
                    <div className="cta-content">
                        <h2 className="cta-title">Ready to Get Started?</h2>
                        <p className="cta-text">
                            Transform your hospitality management today
                        </p>
                        <Link to="/booking" className="btn btn-primary btn-lg">
                            <i className="fas fa-rocket"></i>
                            Start Managing Now
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home
