import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';
import Homepage from './components/Homepage/Homepage';
import ReservationForm from './components/ReservationForm/ReservationForm';
import Footer from './components/Footer/Footer';
import Menu from './components/Menu/Menu';
import ContactSection from './components/Contact/Contact';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav/>
        <Header/>
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/reserve" element={<ReservationForm/>} />
          <Route path="/menu" element={<Menu/>} />
          <Route path="/contact" element={<ContactSection/>} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
