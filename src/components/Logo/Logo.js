import React, { useEffect } from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo = ({ onRouteChange }) => {
    useEffect(()=>{
        if(!localStorage.getItem('token')){
            onRouteChange('signin');
        }
    },[])

    return (
       <div className='ma4 mt0'>
            <Tilt className="Tilt br2 shadow-2" style={{ height: 150, width: 150, opacity: 0.5 }} >
                <div className="Tilt-inner pa3"> 
                    <img src={brain} alt='logo'/>
                </div>
            </Tilt>
       </div>
    );
}

export default Logo;