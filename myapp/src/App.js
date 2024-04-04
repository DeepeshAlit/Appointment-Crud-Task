import 'bootstrap/dist/css/bootstrap.min.css';
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
function App() {
  return (
    <div className='d-flex'>
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/doctor" element={<DoctorList/>} />
            <Route path="/specialty" element={<SpecialtyList/>} />
            <Route path="/item" element={<ItemList/>} />
            <Route path="/appointment" element={<AppointmentList/>} />
            <Route path="/receipt" element={<ReceiptList/>} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;