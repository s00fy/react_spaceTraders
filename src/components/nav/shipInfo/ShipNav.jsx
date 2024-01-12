import { useState, useEffect } from 'react';
import ShipStatus from './ShipStatus';
import SystemWaypoints from '../SystemWaypoints';
import Waypoint from '../../waypoint/Waypoint';
import Cargo from '../../ships/Cargo';
import Fuel from '../../ships/Fuel';
import '../../../style/shipNav.css';

const ShipNav = (props) => {
    const [ship, setShip] = useState([]);
    const token = localStorage.getItem('token');
    const [ shown, setShown] = useState(false);
    const [ flightMode, setFlightMode] = useState([]);
    const [ justMined, setJustMined ] = useState(null);
    const [ miningYield, setMiningYield] = useState(null);
    const [ updateCargo, setUpdateCargo ] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        const options = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };
  
        try {
          const response = await fetch(
            `https://api.spacetraders.io/v2/my/ships/${props.shipSymbol}`,
            options
          );
          const data = await response.json();
          setShip(data.data);
          setFlightMode(data.data.nav);
          setUpdateCargo(data.data.cargo);
        } catch (error) {
          console.error('Error fetching ships info:', error);
        }
      };
  
      fetchData();
    }, [props.shipSymbol, token]);

    const handleClickWaypointsList = () => {
     setShown((current) => !current);

    }

    const clickHandlerFlightMode= async (e)=>{
      const newFlightMode = e.target.innerHTML;
      const options = {
        method: "PATCH",
        endpoint: `my/ships/${ship.symbol}/nav`,
        headers: {
          "Content-Type": "application/json",
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          "flightMode": `${newFlightMode}`,
        }),
      };
      try {
        const response = await fetch(`https://api.spacetraders.io/v2/${options.endpoint}`, options);
        const data = await response.json();
        setFlightMode(data.data);
      } catch (error) {
        console.error('Error fetching flightMode info:', error);
      }
    };

    const handleMining = async () => {
      const options = {
        method: "POST",
        endpoint: `my/ships/${ship.symbol}/extract`,
        headers: {
          "Content-Type": "application/json",
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const response = await fetch(`https://api.spacetraders.io/v2/${options.endpoint}`, options);
        const data = await response.json();
        console.log(data);
        if (data.error) {
          setJustMined(null);
          setMiningYield(null);
          setError(data.error.message);
        }else if (data.data.extraction){
          setError(null);
          setJustMined(data.data);
          setMiningYield(data.data.extraction.yield);
          setUpdateCargo(data.data.cargo);
        }
      } catch (error) {
        console.error('Error fetching flightMode info:', error);
      }
    };

    const handleError = () => {
      setError(null);
      setJustMined(null);
      setMiningYield(null);
    }

    return (
      <>
        {ship.symbol ? (
          <>
        <div className='nav__content'>
          <div className='nav'>
            <div className='nav__idColumn'>
              <div className='nav__idColumn__firstRow'>
                <div className='nav__idColumn__name'>
                  <img src="./img/icons/spaceship.svg" className='nav__shipIcon'/>
                  <p className='nav__id'>{ship.symbol} ✼ {ship.frame.name}</p>
                </div>
                <div className='nav__status'>
                  <ShipStatus shipSymbol={ship.symbol} shipNav={ship.nav}></ShipStatus>
                <div className='shipInfos__fm'>
                  <p className='shipInfos__fm__txtCurrent'>Your current flight Mode : {flightMode.flightMode} </p>
                  <p className='shipInfos__fm__txtChange'>Change flight Mode to : </p>
                  <div className='shipInfos__fm__btns'>
                    <div className='drift'>
                      <button className='flightMode__option' onClick={(e)=>clickHandlerFlightMode(e)}>DRIFT</button>
                      <span className="flightMode__tooltip drift__tooltip"> consumes little fuel but goes quite slow </span>
                    </div>

                    <div className='stealth'>
                      <button className='flightMode__option' onClick={(e)=>clickHandlerFlightMode(e)}>STEALTH</button>
                      <span className="flightMode__tooltip stealth__tooltip"> consumes some fuel but lower speed in order to be difficult to be detect by others </span>
                    </div>
                    <div className='burn'>
                      <button className='flightMode__option' onClick={(e)=>clickHandlerFlightMode(e)}>BURN</button>
                      <span className="flightMode__tooltip burn__tooltip"> consumes lot of fuel but goes very fast </span>
                    </div>
                    <div className='cruise'>
                      <button className='flightMode__option cruise' onClick={(e)=>clickHandlerFlightMode(e)}>CRUISE</button>
                      <span className="flightMode__tooltip cruise__tooltip"> default mode, consumes some fuel and goes normal speed </span>
                    </div>
                  </div>
                </div>
                </div>
              </div>
              <div className='shipInfos'>
                <div className="shipInfos__stuff">
                  <Cargo stuff={updateCargo} />
                  <Fuel fuel={ship.fuel} shipSymbol={ship.symbol} />
                </div>
              </div>
            </div>
          </div>
          <div className='nav'>
            <div className='nav__btns'>
              <button onClick={handleMining} className='nav__extractBtn' >Extract resources </button>
              {error &&
                <p className='fetch__error' onClick={handleError}>{error}</p>
              }
              { justMined ? 
              <>
                <p className='fetch__error' onClick={handleError}>You just mined {miningYield.units} {miningYield.symbol}</p>
                <p className='fetch__error' onClick={handleError}>You have to wait {justMined.cooldown.totalSeconds}s to mine again.</p>
              </>:null
              }

            </div>
            <div className='nav__txt'>
              <Waypoint wpSymbol={ship.nav.waypointSymbol} shipCargo={updateCargo} systemSymbol={ship.nav.systemSymbol} shipSymbol={ship.symbol} />            
            </div>
              <button className='nav__btn__wp' onClick={handleClickWaypointsList}>Scan nearby waypoints ↓</button>
            </div>
            </div>
            {shown ? (
              <SystemWaypoints systemSymbol={ship.nav.systemSymbol} speed={ship.engine.speed} flightMode={flightMode.flightMode} shipSymbol={ship.symbol} shipY={ship.nav.route.destination.y} shipX={ship.nav.route.destination.x} status={ship.nav.status} />
            ) : (null)}
          </>
        ) : (
          <p>Ships loading...</p>
        )}        
      </>
    );
}

export default ShipNav;