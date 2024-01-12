import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Fuel from './Fuel';
import Cargo from './Cargo';
import React from 'react';

const ShipDetails = ({ship}) => {
    const cargoRef = useRef(null);
    const fuelRef = useRef(null);
    const [cargoShown, setCargoShown] = useState(true);
    let fuelPercentage = 0;

    if (ship.fuel.capacity === 0 ) {
      fuelPercentage = 'undefined'; 
    }else{
      fuelPercentage = Math.round((ship.fuel.current * 100) / ship.fuel.capacity); 
    }
    
    const handleDisplayCargo = (btnRef) => {
      if(btnRef === cargoRef){
        setCargoShown(true);
      }else{
        setCargoShown(false);
      }
    }

    return (
      <>
      {ship.symbol ? (
        <table className='fleetTable__nested'>
          <tbody>
            <tr>
              <td className='fleetTable__detailsContainer'>
                <div className='fleetTable__details__idColumn'>
                  <p className='fleetTable__details__id'><span className='fleetTable__details__symbol'>{ship.symbol}</span> ✼ <span className='fleetTable__details__shipType'>{ship.frame.name}</span></p>
                  <div className='fleetTable__details__status'>
                    <p className='fleetTable__details__statusInfo'>{ship.nav.status}</p>
                  </div>
                  <div className='fleetTable__details__stock'>
                    <p ref={cargoRef} onClick={()=>handleDisplayCargo(cargoRef)} className='fleetTable__details__cargo'> Cargo : {ship.cargo.units}/{ship.cargo.capacity}</p>
                    <p ref={fuelRef} onClick={()=>handleDisplayCargo(fuelRef)} className='fleetTable__details__fuel'>Fuel : {ship.fuel.current}/{ship.fuel.capacity} { fuelPercentage !== 'undefined' ?
                      `(${fuelPercentage} %)` 
                    : null }
                    </p>
                  </div>
                  <p>Current Waypoint : </p> 
                  <p>{ship.nav.route.destination.type} ✼ {ship.nav.route.destination.symbol}</p>
                  <Link className='link' to={('/navigation')}>Go to navigation →</Link>
                </div>
            </td>
            {
              cargoShown ?
                <td className='cargoCard__column'>
                <Cargo stuff={ship.cargo} />
              </td>
              :
              <td className='fuelCard__column'>
                <Fuel fuel={ship.fuel} shipSymbol={ship.symbol} />
              </td>              
            }
          </tr>
        </tbody>
      </table>
        ) : (
          <td>ships loading...</td>
        )
      }
        </>
    );
};

export default ShipDetails;