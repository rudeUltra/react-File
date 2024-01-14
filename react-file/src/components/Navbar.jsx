import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";


function Navbar() {
    let navigate=useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
      const fetchProfile = async () => {
        try {
            // Make a GET request to the server
            axios.defaults.withCredentials = true;
            const profileResponse = await axios.get('http://localhost:8000/profile', {
              withCredentials: true, // Include credentials for session handling
              headers: {
                'Content-Type': 'application/json',
              },
            });
            
  
            console.log('Profile Response status:', profileResponse.status);
  
            // Parse the response as JSON
            const data = profileResponse.data;
  
            console.log('Profile Response data:', data);
  
            if (profileResponse.status === 200) {
              // Check the response from the server
              if (data.message === 'You made it to the secured profile') {
                console.log('User Verified');
                setUser(data.user)
                console.log('User:', data.user);
              } else {
                console.error('Not authenticated');
                // Redirect to "/" if not authenticated
                return navigate("/");
              }
            } else {
              console.error('Server returned an error:', profileResponse.status);
              // Handle other HTTP errors (non-2xx status codes)
            }
          } catch (error) {
            console.error('An error occurred during profile fetch:', error);
            // Handle other errors (network issues, server not reachable, etc.)
          }
      };
  
      fetchProfile();
    }, []); // The empty dependency array ensures that this effect runs once, similar to componentDidMount



    const handleSignout = async () => {
        console.log("clicked");
      
        try {
          // Make a GET request to the server
        //   axios.defaults.withCredentials = true;
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:8000/logout', {}, {withCredentials: true})
        // const response = await axios.get('http://localhost:8000/logout', {
        //   withCredentials: true, // Include credentials for session handling
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        // });

        const response= await axios.get('http://localhost:8000/logout', {}, {withCredentials: true})
      
          const textData=response.statusText;
          console.log(response)
      
          if (textData === "OK") {
            console.log("logged out");
            return navigate("/");
          }
        } catch (error) {
          console.error('An error occurred during logout:', error);
          // Handle other errors (network issues, server not reachable, etc.)
        }
      };
      
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-dark px-0 py-3 text-light">
      <div class="container-xl">
        <Link class="navbar-brand text-light" to="/">
          {user} 🧐
        </Link>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarCollapse">
          <div class="navbar-nav mx-lg-auto">
            <Link class="nav-item nav-link active" to="/" aria-current="page">
              
            </Link>
            <Link class="nav-item nav-link" to="">
              
            </Link>
            <Link class="nav-item nav-link" to="">
              
            </Link>
            <Link class="nav-item nav-link" to="">
              
            </Link>
            
          </div>

          {/* <div class="navbar-nav ms-lg-4">
        <Link class="nav-item nav-link" to="#">Sign in</Link>
      </div> */}

          <div class="d-flex align-items-lg-center mt-3 mt-lg-0">
            {/* <Link
              to="/login"
              class="btn btn1 btn-sm btn-primary w-full w-lg-auto"
            >
              {isLoggedIn ? user : "Login"}
            </Link> */}
            
              <button
                class="btn btn2 btn-sm btn-primary w-full w-lg-auto "
                onClick={handleSignout}
              >
                SignOut
              </button>
            
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
