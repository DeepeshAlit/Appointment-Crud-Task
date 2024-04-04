import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import menuIcon from "../assests/menu.png"
import { Button } from 'react-bootstrap';

const Navigation = () => {
  const navigate = useNavigate();
  const [isToken, setIsToken] = useState(false);
  const[showNavigation,setShowNavigation] = useState(false)
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      setIsToken(true);
    } else {
      setIsToken(false);
    }
  }, [token]);


  const handleToLogout = () => {
    localStorage.removeItem("token");
    setIsToken(false);
    navigate("/");
  };
  
  return (
    <div>
      {isToken && <div className="container-fluid">
      <div className="row">
        <Button className='d-md-none' onClick={()=>setShowNavigation(!showNavigation)} ><img src={menuIcon} alt="image" style={{ width: "10px", height: "10px" }}  /></Button>
        <nav className={`col-md-2 d-md-block bg-light sidebar ${showNavigation ? 'd-block' : 'd-none'}`}>

          <div className="sidebar-sticky">
            <ul className="nav flex-column">
              <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to="/home">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to="/appointment">
                  Appointments
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to="/receipt">
                  Receipts
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to="/item">
                  Items
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to="/specialty">
                  Specialties
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to="/doctor">
                  Doctors
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to="/" onClick={handleToLogout}>
                  Logout 
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>}
    </div>
  );
}

export default Navigation;
