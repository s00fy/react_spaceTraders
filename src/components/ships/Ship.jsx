import { useState } from 'react';
import ShipDetails from './ShipDetails';
import '../../style/shipDetails.css';
import React from 'react';


const Ship = ({ship}) => {
  const [isShown, setIsShown] = useState(false);
  const shipsInfo = ship;
 
  //toggle visibility of a ship Details
  const handleClick = () => {
    setIsShown((current) => !current);
  };

  return (
    <>
      {shipsInfo.symbol ? (
        <tr className={ isShown ? 'fleetTable__row__unset' : "fleetTable__row" }>
          <td className="fleetTable__rowItem">{shipsInfo.symbol}</td>
          <td className="fleetTable__rowItem">{shipsInfo.frame.name}</td>
          <td className="fleetTable__rowItem">{shipsInfo.nav.waypointSymbol}</td>
          <td className="fleetTable__rowItem">{shipsInfo.nav.status}</td>
          <td className="fleetTable__rowItem">{`${shipsInfo.cargo.units}/${shipsInfo.cargo.capacity}`}</td>
          <td className="fleetTable__rowItem">{`${shipsInfo.fuel.current}/${shipsInfo.fuel.capacity}`}</td>
          <td className="fleetTable__lastColumn">
            <button className='fleetTable__button' onClick={handleClick}>
              <img src="./img/icons/more.svg" alt="" className={isShown ? "fleetTable__more close" : "fleetTable__more"} />
            </button>
          </td>
        </tr>
      ) : (
        <tr>
          <td>
            Ships loading...
          </td>
        </tr>
      )}
  
      { isShown && (
        <ShipDetails ship={shipsInfo} />
      )}
      
    </>
  );
};

export default Ship;
