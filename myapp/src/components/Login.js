import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  

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
      localStorage.setItem('token',responseData.AuthenticateToken);

      console.log(responseData);
      navigate("/home")

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='container vh-100 align-content-center'>
      <div className=" d-flex justify-content-evenly border w-75 mx-auto">
        <div>
          <img src="logo.png" alt="Logo" />
        </div>
        <div>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}> 
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
