import React from 'react';
import { useState, useEffect } from 'react';
import calculateDistance from '../../utils/getDistanceWaypoints';
import GetTimeWaypoints from '../../utils/GetTimeWaypoints';
import getFuelWaypoints from '../../utils/GetFuelWaypoints';
import '../../style/systemwp.css';
import RouteDetails from './RouteDetails';

const SystemWaypoints = ({systemSymbol, status, shipSymbol, shipX, shipY, flightMode, speed}) => {

  const [waypointsList, setWaypointsList] = useState([]);
  const token = localStorage.getItem("token");
  const theShipSymbol = shipSymbol;
  const flight =flightMode;
  const [error, setError] = useState(null);
  const [isTransitionning, setIsTransitionning] = useState(null);

  
  useEffect(() => {
      const fetchData = async () => {
      const options = {
        endpoint: `systems/${systemSymbol}/waypoints?limit=20`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      };
      try {
        const response = await fetch(`https://api.spacetraders.io/v2/${options.endpoint}`, options);
        const data = await response.json();
        if (data.error) {
          setError(data.error.message);
        }
        setWaypointsList(data.data);
      } catch (error) {
        console.error('Error fetching system waypoints info:', error);
      }
    };
    

    fetchData();
  }, [systemSymbol, status, setError, token]);

  const handleError = () => {
    setError(null);
  }

  
  const waypointsDisplay = waypointsList.map((waypoints) =>{
    let distance = calculateDistance(shipX, shipY, waypoints.x, waypoints.y );
    return (
      <div  key={waypoints.symbol} className='sysWp' >
      {
        waypoints.traits ? 
        <div className='sysWp__container'>
          <div className='sysWp__id'>
            <p className='sysWp__title'>{ waypoints.symbol }</p>
            <GetTimeWaypoints speed={speed} flight={flight} dist={ distance } />
          </div>
          <p className='sysWp__type'>{ waypoints.type }</p>
          <p className='sysWp__dist'>dist : { distance }</p>
          <p className='sysWp__fuelCost'>Fuel : -{ getFuelWaypoints(flight, distance) } fuel</p>

          {waypoints.traits.map(trait => (
            <p className='sysWp__traits' key={trait.symbol}>
              {trait.symbol}
            </p>
          ))}
          <button onClick={()=>navigate(waypoints.symbol)} className='sysWp__cta' >Navigate to the waypoint →</button>
        </div>
        :
        <p>
        scanning waypoints...
        </p>
      }
      </div>
    );
    })

    const navigate = async (symbol) => {
      const options = {
        endpoint: `my/ships/${theShipSymbol}/navigate`,
        method: 'POST',
        body: JSON.stringify({
          "waypointSymbol": symbol,
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };
      try {
        const response = await fetch(`https://api.spacetraders.io/v2/${options.endpoint}`, options);
        const data = await response.json();
        if (data.error) {
          setError(data.error.message);
        }else{
          setIsTransitionning(data.data);
        }
      } catch (error) {
        console.error('Error fetching navigate info:', error);
      }
    }


    return (
      <>
       {waypointsList ? (
        <>
          <div className='system__infos' >You can only extract resources in : ASTEROID, ENGINEERED_ASTEROID and ASTEROID_BASE</div>
          {error && <p className='fetch__error notif' onClick={handleError}>{error}</p>}
          {isTransitionning && <RouteDetails nav={isTransitionning} /> }
          <div className='system__list'>{waypointsDisplay}</div>
        </>
        ) : (
          <p>Scanning the galaxy...</p>
        )
      }
        </>
    );
};

export default SystemWaypoints;
