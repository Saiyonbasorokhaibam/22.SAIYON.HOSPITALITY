import { Link, useLocation } from 'react-router-dom'
import './Header.css'

function Header() {
    const location = useLocation()

    const isActive = (path) => {
        return location.pathname === path ? 'active' : ''
    }

    return (
        <header className="header">
            <div className="container">
                <div className="header-content">
                    <Link to="/" className="logo">
                        <i className="fas fa-hotel"></i>
                        <span className="logo-text">Hospitality Manager</span>
                    </Link>

                    <nav className="nav">
                        <Link to="/" className={`nav-link ${isActive('/')}`}>
                            <i className="fas fa-home"></i>
                            <span>Home</span>
                        </Link>
                        <Link to="/dashboard" className={`nav-link ${isActive('/dashboard')}`}>
                            <i className="fas fa-chart-line"></i>
                            <span>Dashboard</span>
                        </Link>
                        <Link to="/booking" className={`nav-link ${isActive('/booking')}`}>
                            <i className="fas fa-calendar-plus"></i>
                            <span>New Booking</span>
                        </Link>
                        <Link to="/guests" className={`nav-link ${isActive('/guests')}`}>
                            <i className="fas fa-users"></i>
                            <span>Guests</span>
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header
