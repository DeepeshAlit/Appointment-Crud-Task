import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import loginImage from "../assests/scanning.png"
import { Button } from 'react-bootstrap';

const Login = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false)


  useEffect(() => {
    if (token) {
      navigate("/home")
    }
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      userName: email,
      password: password
    };

    try {
      const response = await fetch('https://localhost:7137/api/Authenticate/Post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const responseData = await response.json();
      localStorage.setItem('token', responseData.AuthenticateToken);

      console.log(responseData);
      navigate("/home")

    } catch (error) {
      setError(true)
      console.error('Error:', error);
    }
  };

  return (
    <div className='container vh-100 align-content-center'>
      <div className="  d-flex justify-content-evenly border w-75 mx-auto">
        <div>
          <img src={loginImage} alt="image" style={{ width: "100px", height: "100px" }} className='mt-4' />
        </div>
        <div className='mt-2'>
          <h2 className='d-flex justify-content-center'>Login</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email:</label>
              <input className='mx-5 border rounded'
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(false);
                }}
              />
            </div>
            <div className='mt-2'>
              <label htmlFor="password">Password:</label>
              <input style={{ marginLeft: "20px" }} className='border rounded'
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(false); }}
              />
            </div>
            {<p style={{ fontSize: "x-small", color: "red", marginLeft: "125px" }}>{error ? "Invalid Credential" : ""}</p>}
            <Button type="submit" style={{ marginLeft: "135px" }} className='my-2'>Login</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
