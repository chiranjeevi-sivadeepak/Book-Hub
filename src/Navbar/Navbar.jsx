import React from 'react'

import { useNavigate, useParams } from 'react-router-dom';
import bookHubLogo from '/assets/Group7731.png'
import './Navbar.css'



function Navbar() {
    const navigate = useNavigate();
    
    const LogoutButton=()=>{
      navigate('/login');
    }
    const homeSection=()=>{
        navigate('/home');
    }
    const aboutSection=()=>{
        navigate('/about')
    }
    const bookShelves=()=>{
        navigate('/bookshelves');
    }
  return (
    <div>
      <div className='HomePage-container'>
            <div className='Navbar-container bg-white-600 flex justify-between items-center h-screen'>
              <img src={bookHubLogo} alt="BookHubLogo"style={{ height: "40px", marginLeft: "40px"}}/>
              <ul className='flex m-[10px] items-center'>
                <li className='sections' onClick={homeSection}>Home</li>
                <li className='sections' onClick={bookShelves}>Book Shelves</li>
                <li className='sections' onClick={aboutSection}>About</li>
                <li className='sections'><button className='bg-blue-500 logout-btn' onClick={LogoutButton}>Logout</button></li>
              </ul>
            </div>
    </div>
    </div>
  )
}

export default Navbar
