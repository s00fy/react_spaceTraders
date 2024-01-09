import { useState, useEffect } from 'react';
import ShipStatus from './ShipStatus';
import SystemWaypoints from './SystemWaypoints';
import Waypoint from './Waypoint';
import Cargo from '../ships/Cargo';
import Fuel from '../ships/Fuel';
import '../../style/shipNav.css';

const ShipNav = (props) => {
    const [navInfo, setNavInfo] = useState([]);
    const token = localStorage.getItem('token');
    const [ shown, setShown] = useState(false);
    const [ flightMode, setFlightMode] = useState([]);
  
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
          setNavInfo(data.data);
          setFlightMode(data.data.nav);
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
        endpoint: `my/ships/${navInfo.symbol}/nav`,
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
    }

    const clickHandlerRefuel = async () => {
      const options = {
        method: "POST",
        endpoint: `my/ships/${navInfo.symbol}/refuel`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        await fetch(`https://api.spacetraders.io/v2/${options.endpoint}`, options);
      } catch (error) {
        console.error('Error fetching Refuel info:', error);
      }
    }

    return (
      <>
        {navInfo.symbol ? (
          <>
        <div className='nav__content'>
          <div className='nav'>
            <div className='nav__idColumn'>
              <div className='nav__idColumn__firstRow'>
                <div className='nav__idColumn__name'>
                  <img src="./img/icons/spaceship.svg" className='nav__shipIcon'/>
                  <p className='nav__id'>{navInfo.symbol} ✼ {navInfo.frame.name}</p>
                </div>
                <div className='nav__status'>
                  <ShipStatus shipSymbol={navInfo.symbol} shipNav={navInfo.nav}></ShipStatus>
                </div>
              </div>
              <div className='shipInfos'>
                <div className="shipInfos__stuff">
                  <Cargo stuff={navInfo.cargo} />
                  <Fuel fuel={navInfo.fuel} />
                </div>
                <p>Fuel :  {`${navInfo.fuel.current}/${navInfo.fuel.capacity}`}</p>
                <button onClick={clickHandlerRefuel}>Refuel</button>
                <p className='tooltip'>You need to be in a marketplace in order to be able to refuel</p>
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
          </div>
          <div className='nav'>
            <div className='nav__btns'>
              <button /* onClick={handleWaypointSpec} */ >Waypoint</button>
              <button>Marketplace</button>
              <button>Shipyard</button>
              <button>Mine</button>
            </div>
            <div className='nav__txt'>
              <Waypoint wpSymbol={navInfo.nav.waypointSymbol} systemSymbol={navInfo.nav.systemSymbol} shipSymbol={navInfo.symbol} />            
            </div>
              <button onClick={handleClickWaypointsList}>Scan nearby waypoints</button>
            </div>
            </div>
            {shown ? (
              <SystemWaypoints shipLocation={navInfo.waypointSymbol} systemSymbol={navInfo.nav.systemSymbol} speed={navInfo.engine.speed} flightMode={flightMode.flightMode} shipSymbol={props.shipSymbol} shipY={navInfo.nav.route.origin.y} shipX={navInfo.nav.route.origin.x} status={navInfo.nav.status} />
            ) : (null)}
          </>
        ) : (
          <p>Ships loading...</p>
        )}        
      </>
    );
}

export default ShipNav;