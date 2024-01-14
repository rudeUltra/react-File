import React from 'react';

import axios from 'axios';
import {Link} from 'react-router-dom'

import url from '../assets/password.png';
import file from '../assets/file3.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const LoginForm = () => {
  let navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  


const handleLogin = async (event) => {
  event.preventDefault();
  try {
    // Make a POST request to the server
    const loginResponse = await axios.post('http://localhost:8000/login', {
      username,
      password,
    });

    console.log(loginResponse);

    // Check the response status code
    if (loginResponse.status === 200) {
      const textData = loginResponse.data;
      console.log(textData);

      if (textData === "Login Attempt was successful.") {
        return navigate("/files")
        
      } else {
        // Login attempt not successful
        
        
        alert("Wrong User | Please Sign Up or Enter correct password")
        

        //toast

      }
    } else {
      // Login API returned an error
    }
  } catch (error) {
    console.error('An error occurred during login:', error);
    // Handle other errors (network issues, server not reachable, etc.)
  }
};

  

    
    return (
    
    <div className="container col-xl-10 col-xxl-8 px-4 py-5" data-aos="fade-up"  data-aos-duration="3000">
          <div className="row align-items-center g-lg-5 py-5">
            <div className="col-lg-7 text-center text-lg-start">
              <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-5">
                React Based File Management System
              </h1>
             
              <img src={file} style={{ height: '300px', width:'400px' }} className='mb-4' />
              <p className="col-lg-10 fs-4 pt-2">
                Sign In/Up using Email Address | Upload Files | Manage Directories
              </p>
            </div>
            <div className="col-md-10 mx-auto col-lg-5">
              <form className="p-4 p-md-5" onSubmit={handleLogin}>
                <div className="form-floating mb-3">
                  <input
                    required type="text"
                    className="form-control"
                    id="floatingInput"
                    placeholder="Enter Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <label htmlFor="floatingInput">Username</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    required type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="checkbox mb-3">
                  <label>
                    <input type="checkbox" value="remember-me" /> Remember me
                  </label>
                </div>
                <button className="w-100 btn btn-lg btn-dark" type="submit">
                  LogIn
                </button>
                
                <Link to={`/signup`}>
                <button className="w-100 btn btn-lg btn-dark mt-2" style={{ height: '70px' }}  type="button" >Sign up <img src={url} style={{ height: '30px' }}  /></button>
                </Link>
                
               
              </form>
            </div>
          </div>
        </div>

          
        
      );
    

  
};

export default LoginForm;


