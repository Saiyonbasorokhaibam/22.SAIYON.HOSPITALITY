import { useState, useEffect } from 'react'
import './Dashboard.css'

function Dashboard() {
    const [stats, setStats] = useState({
        totalBookings: 0,
        activeGuests: 0,
        checkInsToday: 0,
        revenue: 0
    })

    const [recentBookings, setRecentBookings] = useState([])

    useEffect(() => {
        // Fetch data from Google Sheets
        fetchDashboardData()
    }, [])

    const fetchDashboardData = async () => {
        // TODO: Implement Google Sheets API integration
        // For now, using mock data
        setStats({
            totalBookings: 156,
            activeGuests: 42,
            checkInsToday: 8,
            revenue: 45280
        })

        setRecentBookings([
            {
                id: 1,
                guestName: 'John Smith',
                roomNumber: '101',
                checkIn: '2026-01-12',
                status: 'Confirmed'
            },
            {
                id: 2,
                guestName: 'Sarah Johnson',
                roomNumber: '205',
                checkIn: '2026-01-12',
                status: 'Checked In'
            },
            {
                id: 3,
                guestName: 'Michael Brown',
                roomNumber: '312',
                checkIn: '2026-01-13',
                status: 'Pending'
            }
        ])
    }

    return (
        <div className="dashboard">
            <div className="container">
                <div className="dashboard-header fade-in">
                    <h1>Dashboard</h1>
                    <p className="dashboard-subtitle">Overview of your hospitality operations</p>
                </div>

                <div className="stats-grid grid grid-2">
                    <div className="stat-card card slide-in">
                        <div className="stat-icon">
                            <i className="fas fa-calendar-check"></i>
                        </div>
                        <div className="stat-content">
                            <h3 className="stat-value">{stats.totalBookings}</h3>
                            <p className="stat-label">Total Bookings</p>
                        </div>
                    </div>

                    <div className="stat-card card slide-in" style={{ animationDelay: '0.1s' }}>
                        <div className="stat-icon">
                            <i className="fas fa-users"></i>
                        </div>
                        <div className="stat-content">
                            <h3 className="stat-value">{stats.activeGuests}</h3>
                            <p className="stat-label">Active Guests</p>
                        </div>
                    </div>

                    <div className="stat-card card slide-in" style={{ animationDelay: '0.2s' }}>
                        <div className="stat-icon">
                            <i className="fas fa-door-open"></i>
                        </div>
                        <div className="stat-content">
                            <h3 className="stat-value">{stats.checkInsToday}</h3>
                            <p className="stat-label">Check-ins Today</p>
                        </div>
                    </div>

                    <div className="stat-card card slide-in" style={{ animationDelay: '0.3s' }}>
                        <div className="stat-icon">
                            <i className="fas fa-dollar-sign"></i>
                        </div>
                        <div className="stat-content">
                            <h3 className="stat-value">${stats.revenue.toLocaleString()}</h3>
                            <p className="stat-label">Total Revenue</p>
                        </div>
                    </div>
                </div>

                <div className="recent-bookings card mt-3 fade-in">
                    <div className="card-header">
                        <h2 className="card-title">Recent Bookings</h2>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="bookings-table">
                                <thead>
                                    <tr>
                                        <th>Guest Name</th>
                                        <th>Room</th>
                                        <th>Check-in Date</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentBookings.map(booking => (
                                        <tr key={booking.id}>
                                            <td>
                                                <i className="fas fa-user"></i>
                                                {booking.guestName}
                                            </td>
                                            <td>
                                                <i className="fas fa-door-closed"></i>
                                                Room {booking.roomNumber}
                                            </td>
                                            <td>
                                                <i className="fas fa-calendar"></i>
                                                {booking.checkIn}
                                            </td>
                                            <td>
                                                <span className={`badge ${booking.status === 'Confirmed' ? 'badge-success' :
                                                        booking.status === 'Checked In' ? 'badge-info' :
                                                            'badge-warning'
                                                    }`}>
                                                    {booking.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
