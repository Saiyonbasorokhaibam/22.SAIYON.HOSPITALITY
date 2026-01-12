import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import BookingForm from './pages/BookingForm'
import GuestList from './pages/GuestList'

function App() {
    return (
        <Router>
            <div className="page-wrapper">
                <Header />
                <main className="content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/booking" element={<BookingForm />} />
                        <Route path="/guests" element={<GuestList />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    )
}

export default App
