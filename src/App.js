import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';
import Homepage from './components/Homepage/Homepage';
import ReserveATable from './components/Reserve a table/ReserveATable';
import Footer from './components/Footer/Footer';
import Menu from './components/Menu/Menu';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav/>
        <Header/>
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/reserve" element={<ReserveATable/>} />
          <Route path="/menu" element={<Menu/>} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
