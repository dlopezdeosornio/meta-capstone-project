import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Menu from './components/Menu/Menu';
import Homepage from './Pages/Homepage';
import TableReservation from './Pages/TableReservation';
import ReservationConfirm from './Pages/ReservationConfirm';
import Contact from './Pages/Contact';

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
            {/* <Route path="/about" element={<AboutUs/>} /> */}
            <Route path="/reserve" element={<TableReservation/>} />
            <Route path="/booking-confirmation" element={<ReservationConfirm/>} />
            <Route path="/menu" element={<Menu/>} />
            <Route path="/contact" element={<Contact/>} />
          </Routes>
        </main>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
