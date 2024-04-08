import 'bootstrap/dist/css/bootstrap.min.css';
import './dark-theme.css';
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Navigation from './components/Navigation';
import Home from './components/Home';
import DoctorList from './components/DoctorList';
import SpecialtyList from './components/SpecialtyList';
import ItemList from './components/ItemList';
import AppointmentList from './components/AppointmentList';
import ReceiptList from './components/ReceiptList';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
function App() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  return (
    <div className={darkMode ? 'dark-mode' : 'light-mode'}>
    <Button onClick={toggleDarkMode}>{darkMode?"Light Mode":"Dark Mode"}</Button>
    <div className='d-flex '>
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/doctor" element={<DoctorList darkMode={darkMode}/>} />
            <Route path="/specialty" element={<SpecialtyList darkMode={darkMode}/>} />
            <Route path="/item" element={<ItemList darkMode={darkMode}/>} />
            <Route path="/appointment" element={<AppointmentList darkMode={darkMode}/>} />
            <Route path="/receipt" element={<ReceiptList darkMode={darkMode}/>} />
          </Routes>
        </BrowserRouter>
    </div>
    </div>
  );
}

export default App;