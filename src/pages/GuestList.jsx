import { useState, useEffect } from 'react'
import './GuestList.css'

function GuestList() {
    const [guests, setGuests] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [filterStatus, setFilterStatus] = useState('all')

    useEffect(() => {
        fetchGuests()
    }, [])

    const fetchGuests = async () => {
        // TODO: Implement Google Sheets API integration
        // For now, using mock data
        const mockGuests = [
            {
                id: 1,
                name: 'Milan Thongbam',
                email: 'john.smith@example.com',
                phone: '+1 (555) 123-4567',
                roomNumber: '101',
                checkIn: '2026-01-10',
                checkOut: '2026-01-15',
                status: 'Checked In'
            },
            {
                id: 2,
                name: 'Sarah Johnson',
                email: 'sarah.j@example.com',
                phone: '+1 (555) 234-5678',
                roomNumber: '205',
                checkIn: '2026-01-12',
                checkOut: '2026-01-16',
                status: 'Checked In'
            },
            {
                id: 3,
                name: 'Michael Brown',
                email: 'mbrown@example.com',
                phone: '+1 (555) 345-6789',
                roomNumber: '312',
                checkIn: '2026-01-13',
                checkOut: '2026-01-18',
                status: 'Confirmed'
            },
            {
                id: 4,
                name: 'Emily Davis',
                email: 'emily.davis@example.com',
                phone: '+1 (555) 456-7890',
                roomNumber: '108',
                checkIn: '2026-01-08',
                checkOut: '2026-01-12',
                status: 'Checked Out'
            },
            {
                id: 5,
                name: 'David Wilson',
                email: 'dwilson@example.com',
                phone: '+1 (555) 567-8901',
                roomNumber: '420',
                checkIn: '2026-01-14',
                checkOut: '2026-01-20',
                status: 'Pending'
            }
        ]
        setGuests(mockGuests)
    }

    const filteredGuests = guests.filter(guest => {
        const matchesSearch = guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            guest.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            guest.roomNumber.includes(searchTerm)

        const matchesFilter = filterStatus === 'all' || guest.status === filterStatus

        return matchesSearch && matchesFilter
    })

    return (
        <div className="guest-list-page">
            <div className="container">
                <div className="guest-header fade-in">
                    <h1>
                        <i className="fas fa-users"></i>
                        Guest List
                    </h1>
                    <p className="guest-subtitle">Manage and view all your guests</p>
                </div>

                <div className="guest-controls card slide-in">
                    <div className="search-box">
                        <i className="fas fa-search"></i>
                        <input
                            type="text"
                            placeholder="Search by name, email, or room number..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                    </div>

                    <div className="filter-group">
                        <label className="filter-label">Filter by Status:</label>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="filter-select"
                        >
                            <option value="all">All Guests</option>
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Checked In">Checked In</option>
                            <option value="Checked Out">Checked Out</option>
                        </select>
                    </div>
                </div>

                <div className="guests-grid">
                    {filteredGuests.length > 0 ? (
                        filteredGuests.map((guest, index) => (
                            <div
                                key={guest.id}
                                className="guest-card card slide-in"
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                <div className="guest-card-header">
                                    <div className="guest-avatar">
                                        <i className="fas fa-user"></i>
                                    </div>
                                    <div className="guest-info">
                                        <h3 className="guest-name">{guest.name}</h3>
                                        <span className={`badge ${guest.status === 'Checked In' ? 'badge-success' :
                                                guest.status === 'Confirmed' ? 'badge-info' :
                                                    guest.status === 'Pending' ? 'badge-warning' :
                                                        'badge-info'
                                            }`}>
                                            {guest.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="guest-details">
                                    <div className="detail-item">
                                        <i className="fas fa-envelope"></i>
                                        <span>{guest.email}</span>
                                    </div>
                                    <div className="detail-item">
                                        <i className="fas fa-phone"></i>
                                        <span>{guest.phone}</span>
                                    </div>
                                    <div className="detail-item">
                                        <i className="fas fa-door-closed"></i>
                                        <span>Room {guest.roomNumber}</span>
                                    </div>
                                    <div className="detail-item">
                                        <i className="fas fa-calendar-alt"></i>
                                        <span>{guest.checkIn} to {guest.checkOut}</span>
                                    </div>
                                </div>

                                <div className="guest-actions">
                                    <button className="btn-icon" title="View Details">
                                        <i className="fas fa-eye"></i>
                                    </button>
                                    <button className="btn-icon" title="Edit">
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button className="btn-icon" title="Delete">
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-results card">
                            <i className="fas fa-search"></i>
                            <h3>No guests found</h3>
                            <p>Try adjusting your search or filter criteria</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default GuestList
