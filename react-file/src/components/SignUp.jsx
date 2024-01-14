import React from 'react';
import url from '../assets/password.png';
import file from '../assets/signUp.png';
import { Navigate } from "react-router-dom";
import { useState } from 'react';


import { useNavigate } from "react-router-dom";



const SignUp = (props) => {
    let navigate = useNavigate();

// useEffect(() => {
//    if (LoggedIn){
//       return navigate("/");
//    }
// },[LoggedIn]);
    

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleRegistration = async (event) => {
        // Get the user input (replace these with your actual values)
        event.preventDefault();
      
        try {
          // Make a POST request to the server
          const response = await fetch('http://localhost:8000/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, username, password }),
          });
      
          // Parse the response as JSON
          const data = await response.json();
      
          // Check the response from the server
          if (data.message === "Successful") {
            // Redirect to another page upon successful registration
            console.log("Bhai chal gaya..");
            return navigate("/");
          } 
          else {
            console.error(data.message);
            alert(data.message)
            // Handle registration failure (show an error message, etc.)
          }
        } catch (error) {
          console.error('An error occurred during registration:', error);
          // Handle other errors (network issues, server not reachable, etc.)
        }
      };
    return (
      
        <div className="container col-xl-10 col-xxl-8 px-4 py-5" data-aos="zoom-in"  data-aos-duration="3000">
          <div className="row align-items-center g-lg-5 py-5">
            <div className="col-lg-7 text-center text-lg-start" >
              <img src={file} style={{ height: '400px', width:'400px'}} className='mb-4' />
            </div>
            <div className="col-md-10 mx-auto col-lg-5">
            <form className="p-4 p-md-5" onSubmit={handleRegistration}>
                <div className="form-floating mb-3">
                  <input
                    required type="text"
                    className="form-control"
                    id="floatingInput"
                    placeholder="Rudhra"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <label htmlFor="floatingInput">Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    required type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label htmlFor="floatingInput">Email address</label>
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
                
                
                <button className="w-100 btn btn-lg btn-dark mt-2" style={{ height: '70px' }}  type="submit">
                  Sign up <img src={url} style={{ height: '30px' }}  />
                </button>
               
              </form>
            </div>
          </div>
        </div>
      );
}

export default SignUp;
