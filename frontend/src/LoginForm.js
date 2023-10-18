import React, { useState } from 'react';
import axios from 'axios';
import ChessDp from './Icons/ChessDp.png';
import Header from './components/Header';

const LoginForm = ({ onRoleChange }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Role, setRole] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Make an HTTP request to fetch all users
      const response = await axios.get('http://localhost:8060/User/');

      // Assuming the response contains an array of user objects
      const users = response.data;

      // Filter users based on the provided email
      const user = users.find((user) => user.email === email);

      if (user) {
        const userRole = user.role;
        setRole(userRole);
        setShowAlert(true);

        // Pass the Role state to the parent component
        onRoleChange(userRole);
      } else {
        console.error('User not found or invalid role');
      }
    } catch (error) {
      console.error('Error fetching user role:', error);
    }
  };

  return (
    <div>
        <div>
            <Header/>
        </div>
        <div style={{backgroundImage: `url(${ChessDp})`,backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  height: '85.8vh',
  overflow: 'hidden',

  }}>
          <div style={{ display: 'flex', height: '86vh', overflow: 'hidden' }}>
              <div style={{ flex: '1', display: 'flex', alignItems: 'center'}}>
                  <div style={{position: 'absolute', top: '60%', left: '50%' ,transform: 'translate(-100%, -50%)', zIndex: '1', textAlign: 'center', color: 'black' }}>
                      <h1 style={{fontSize:'20px', fontWeight:'bold',padding:'15px'}}>
                          Welcome to our Chess Player
                          Management Platform! Whether you're
                          a novice or a grandmaster, our web
                          page is your destination for chess
                          excellence. Join us now to access
                          tutorials, connect with players, and
                          get expert guidance. Your journey to
                          becoming a better chess player begins
                          here!
                      </h1>
                      <div className="container mt-5" style={{background:'black', width:'240px', height:'40px',borderRadius:'20px',boxShadow:'5px 5px 20px 5px'}}>
                          <h1 style={{fontSize:'26px', color:'white'}}>Join as a coach</h1>
                      </div>
                  </div>
              </div>
              <div style={{ flex: '1', display: 'flex', alignItems: 'center', justifyContent: 'center',paddingBottom:'100px'}}>
                  <div className="container mt-5" style={{ backgroundImage:'linear-gradient(#50d959, #168c1e)', minHeight: '420px', maxHeight: '420px', width: '320px', borderRadius: '20px', boxShadow: '10px 10px 20px 10px black',opacity:'90%'}}>
                  <h1 className="text-center mb-4" style={{ padding: '20px', fontWeight: 'Bold',opacity:'100%' }}>Sign in</h1>
                  <div className="row justify-content-center">
                      <div className="col-md-6" style={{ width: '300px',opacity:'100%' }}>
                      <form onSubmit={handleLogin}>
                          <div className="mb-3">
                          <label htmlFor="email" className="form-label">Email</label>
                          <input
                              type="email"
                              className="form-control"
                              id="email"
                              placeholder="Enter your email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                          />
                          </div>
                          <div className="mb-3">
                          <label htmlFor="password" className="form-label">Password</label>
                          <input
                              type="password"
                              className="form-control"
                              id="password"
                              placeholder="Enter your password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                          />
                          </div>
                          <div className="text-center" style={{margin:'80px 0px 10px 210px'}}>
                          <button type="submit" className="btn btn-primary" style={{backgroundColor:'#98ebeb',color:'black'}}>Login</button>
                          </div>
                      </form>
                      {showAlert && (
                          <div className="alert alert-success mt-3">
                          Your role is: {Role}
                          </div>
                      )}
                      </div>
                  </div>
                  </div>
              </div>
          </div>
        </div>
    </div>
  );
};

export default LoginForm;
