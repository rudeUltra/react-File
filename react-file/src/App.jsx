
import './App.css'
import LoginForm from './components/login'
import AOS from "aos";
import "aos/dist/aos.css";
import SignUp from './components/SignUp';

import File from './file';
import Navbar from './components/Navbar';
import { useNavigate } from 'react-router-dom';

AOS.init();
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { useState,useEffect } from 'react';


function App() {
  // const [isLoggedIn, setLoggedIn] = useState(false);
  // const [logout, setLogOut] = useState(false);

    

  //   const handleLogOut = () => {
  //       setLogOut(true);
  //   }

  //   useEffect(() => {
  //       if (logout) {
  //           localStorage.removeItem("user");
  //           setLoggedIn(false);
  //           setUser("");
  //       }
  //   }, [logout]);
  
  
  
  
const router = createBrowserRouter([
  {
    path: "/",
    element: <div style={{height:'100vh',backgroundColor:'#dbf26e',backgroundImage:'linear-gradient(319deg, #dbf26e 0%, #61fa74 37%, #1cfdd6 100%)'}} className='d-flex align-items-center justify-content-center'>
    <LoginForm/>
  </div> ,
    
  },
  {
    path:"/signup",
    element:<div style={{height:'100vh',backgroundColor:'#dbf26e',backgroundImage:'linear-gradient(319deg, #dbf26e 0%, #61fa74 37%, #1cfdd6 100%)'}} className='d-flex align-items-center justify-content-center'>
    <SignUp/>
  </div> 
  },
  {
    path:"/files",
    element:<div className='' style={{marginTop:'200px'}}>
    <Navbar/>
    <File/>

    </div>
    
  }
]);
  

  return (
    <RouterProvider router={router} />
  )
}

export default App
