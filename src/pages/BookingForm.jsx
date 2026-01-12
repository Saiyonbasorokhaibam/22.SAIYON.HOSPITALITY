import { useState } from 'react'
import './BookingForm.css'

function BookingForm() {
    const [formData, setFormData] = useState({
        guestName: '',
        email: '',
        phone: '',
        checkInDate: '',
        checkOutDate: '',
        roomType: '',
        numberOfGuests: '1',
        specialRequests: ''
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState(null)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus(null)

        try {
            // TODO: Implement Google Sheets API integration
            // For now, simulating API call
            await new Promise(resolve => setTimeout(resolve, 1500))

            console.log('Booking submitted:', formData)
            setSubmitStatus('success')

            // Reset form
            setFormData({
                guestName: '',
                email: '',
                phone: '',
                checkInDate: '',
                checkOutDate: '',
                roomType: '',
                numberOfGuests: '1',
                specialRequests: ''
            })
        } catch (error) {
            console.error('Error submitting booking:', error)
            setSubmitStatus('error')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="booking-form-page">
            <div className="container">
                <div className="booking-header fade-in">
                    <h1>
                        <i className="fas fa-calendar-plus"></i>
                        New Booking
                    </h1>
                    <p className="booking-subtitle">Fill in the details to create a new reservation</p>
                </div>

                <div className="form-container">
                    <form onSubmit={handleSubmit} className="booking-form card slide-in">
                        <div className="form-section">
                            <h3 className="form-section-title">
                                <i className="fas fa-user"></i>
                                Guest Information
                            </h3>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="guestName" className="form-label">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="guestName"
                                        name="guestName"
                                        className="form-input"
                                        value={formData.guestName}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter guest name"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email" className="form-label">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-input"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="guest@example.com"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone" className="form-label">
                                    Phone Number *
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    className="form-input"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    placeholder="+1 (555) 123-4567"
                                />
                            </div>
                        </div>

                        <div className="form-section">
                            <h3 className="form-section-title">
                                <i className="fas fa-bed"></i>
                                Booking Details
                            </h3>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="checkInDate" className="form-label">
                                        Check-in Date *
                                    </label>
                                    <input
                                        type="date"
                                        id="checkInDate"
                                        name="checkInDate"
                                        className="form-input"
                                        value={formData.checkInDate}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="checkOutDate" className="form-label">
                                        Check-out Date *
                                    </label>
                                    <input
                                        type="date"
                                        id="checkOutDate"
                                        name="checkOutDate"
                                        className="form-input"
                                        value={formData.checkOutDate}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="roomType" className="form-label">
                                        Room Type *
                                    </label>
                                    <select
                                        id="roomType"
                                        name="roomType"
                                        className="form-select"
                                        value={formData.roomType}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select room type</option>
                                        <option value="standard">Standard Room</option>
                                        <option value="deluxe">Deluxe Room</option>
                                        <option value="suite">Suite</option>
                                        <option value="presidential">Presidential Suite</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="numberOfGuests" className="form-label">
                                        Number of Guests *
                                    </label>
                                    <input
                                        type="number"
                                        id="numberOfGuests"
                                        name="numberOfGuests"
                                        className="form-input"
                                        value={formData.numberOfGuests}
                                        onChange={handleChange}
                                        min="1"
                                        max="10"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="specialRequests" className="form-label">
                                    Special Requests
                                </label>
                                <textarea
                                    id="specialRequests"
                                    name="specialRequests"
                                    className="form-textarea"
                                    value={formData.specialRequests}
                                    onChange={handleChange}
                                    placeholder="Any special requirements or requests..."
                                />
                            </div>
                        </div>

                        {submitStatus === 'success' && (
                            <div className="alert alert-success">
                                <i className="fas fa-check-circle"></i>
                                Booking created successfully!
                            </div>
                        )}

                        {submitStatus === 'error' && (
                            <div className="alert alert-error">
                                <i className="fas fa-exclamation-circle"></i>
                                Failed to create booking. Please try again.
                            </div>
                        )}

                        <div className="form-actions">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <i className="fas fa-spinner fa-spin"></i>
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-check"></i>
                                        Create Booking
                                    </>
                                )}
                            </button>
                            <button
                                type="button"
                                className="btn btn-ghost"
                                onClick={() => window.history.back()}
                            >
                                <i className="fas fa-times"></i>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default BookingForm
