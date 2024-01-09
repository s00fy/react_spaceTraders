import { useState, useEffect } from 'react';
import ShipNav from "./ShipNav";
import Header from "../user/Header";
import '../../style/nav.css';

const NavigationRender = () => {
  const [shipsRender, setShipsRender] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  //const [chosenShip, setChosenShip] = useState([]);
  const token = localStorage.getItem("token");
  let chosenShip = [];


  useEffect(() => {
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
  }, []); // This runs once when the component mounts
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
        <h1 className='title'>Navigation Info</h1>
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