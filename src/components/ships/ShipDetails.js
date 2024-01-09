// import { useState } from 'react';
import { Link } from 'react-router-dom';
// import Fuel from './Fuel';
import Cargo from './Cargo';

const ShipDetails = ({ship}) => {

    // const [cargoShown, setCargoShown] = useState(true);
    let fuelPercentage = 0;
    if (ship.fuel.capacity === 0 ) {
      fuelPercentage = 'undefined'; 
    }else{
      fuelPercentage = Math.round((ship.fuel.current * 100) / ship.fuel.capacity); 
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
                    <p className='fleetTable__details__cargo'> Cargo : {ship.cargo.units}/{ship.cargo.capacity}</p>
                    <p className='fleetTable__details__fuel'>Fuel : {ship.fuel.current}/{ship.fuel.capacity}
                    { fuelPercentage !== 'undefined' ?
                      `(${fuelPercentage} %)` 
                    : null }
                    </p>
                  </div>
                  <p>Current Waypoint : </p> 
                  <p>{ship.nav.route.destination.type} ✼ {ship.nav.route.destination.symbol}</p>
                  <Link className='link' to={('/navigation')}>Go to navigation →</Link>
                </div>
            </td>
              <Cargo stuff={ship.cargo} />
              {/* <Fuel fuel={ship.fuel} /> */}
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