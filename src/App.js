import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';
import Homepage from './components/Homepage/Homepage';
import ReservationForm from './components/ReservationForm/ReservationForm';
import BookingConfirmation from './components/BookingConfirmation/BookingConfirmation';
import Footer from './components/Footer/Footer';
import Menu from './components/Menu/Menu';
import ContactSection from './components/Contact/Contact';

function App() {
  return (
    <Router>
      <div className="App" role="application">
        {/* Skip link for keyboard users */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        
        <Nav/>
        <Header/>
        <main id="main-content">
          <Routes>
            <Route path="/" element={<Homepage/>} />
            <Route path="/reserve" element={<ReservationForm/>} />
            <Route path="/booking-confirmation" element={<BookingConfirmation/>} />
            <Route path="/menu" element={<Menu/>} />
            <Route path="/contact" element={<ContactSection/>} />
          </Routes>
        </main>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
