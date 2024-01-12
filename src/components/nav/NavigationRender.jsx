import React from 'react';
import { useState, useEffect } from 'react';
import ShipNav from "./shipInfo/ShipNav";
import Header from "../user/Header";
import '../../style/nav.css';
import { useAuthContext } from '../auth/authContext';
import { useNavigate } from 'react-router';

const NavigationRender = () => {
  const [shipsRender, setShipsRender] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const token = localStorage.getItem("token");
  const auth = useAuthContext();
  const navigate = useNavigate();
  
  
  useEffect(() => {
    if (auth.isValid === false ) {
      navigate('/');
    }
    const fetchData = async () => {
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      };

      try {
        const response = await fetch('https://api.spacetraders.io/v2/my/ships', options);
        const data = await response.json();
        setShipsRender(data.data);
      } catch (error) {
        console.error('Error fetching ships info:', error);
      }
    };

    fetchData();
  }, [token, auth.isValid, navigate]);
    const shipsDisplay = shipsRender.map((ship, index) =>{
    return (
      <option className='selectShip__option' key={index} value={ship.symbol}>{ship.symbol}</option>
      );
  });
    const changeShip = (e)=>{
    setSelectedId(e.target.value);
    }

    return (
      <>
      
          <Header />
        <div className='content__nav container__content'>
          <div className='nav__id'>
            <h1 className='title'>Navigation Info</h1>
            <button className='refetch'>&#11118;</button>
          </div>
        {shipsRender ? (
            <div className='selectContainer'>
                <select className='selectShip' onChange={ (e)=>changeShip(e) }>
                  <option className='selectShip__option selectShip__default' value='default'>Choose a spaceship</option>
                {shipsDisplay}
                </select>
            </div>
        ) : (
            <p>Chargement des vaisseaux...</p>
        )}
        
        {selectedId && selectedId !=='default' ? <ShipNav shipSymbol={selectedId} /> : null }
        </div>
        </>
    );
};

export default NavigationRender;